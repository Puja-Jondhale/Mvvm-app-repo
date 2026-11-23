
import { useState, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import EmployeeListModel from "./employeeListModel";

const initialForm = {
  employeeId: "",
  employeeName: "",
  branch: "Baner",
  department: "",
  role: "User",
  active: true
};

const useEmployeeListViewModel = () => {
  const navigate = useNavigate();

  const [employees, setEmployees] = useState(
    () => EmployeeListModel.getEmployees()
  );

  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState("All");
  const [activeOnly, setActiveOnly] = useState(true);

  const [currentPage, setCurrentPage] = useState(1);
  const pageSize = 10;

  const [showModal, setShowModal] = useState(false);
  const [editingEmployee, setEditingEmployee] = useState(null);
  const [form, setForm] = useState(initialForm);
  const [error, setError] = useState("");

  const [uploadMessage, setUploadMessage] = useState("");

  // FILTER AND SEARCH
  const filteredEmployees = useMemo(() => {
    return employees.filter(employee => {
      const searchValue = search.toLowerCase().trim();

      const matchesSearch = [
        employee.employeeId,
        employee.employeeName,
        employee.branch,
        employee.department,
        employee.role
      ].some(value =>
        String(value).toLowerCase().includes(searchValue)
      );

      const matchesFilter =
        filter === "All" ||
        (filter === "Active" && employee.active) ||
        (filter === "Inactive" && !employee.active);

      const matchesActive = !activeOnly || employee.active;

      return matchesSearch && matchesFilter && matchesActive;
    });
  }, [employees, search, filter, activeOnly]);

  // PAGINATION
  const totalPages = Math.max(
    1,
    Math.ceil(filteredEmployees.length / pageSize)
  );

  const safePage = Math.min(currentPage, totalPages);

  const paginatedEmployees = filteredEmployees.slice(
    (safePage - 1) * pageSize,
    safePage * pageSize
  );

  // SEARCH
  const handleSearch = value => {
    setSearch(value);
    setCurrentPage(1);
  };

  const handleFilter = value => {
    setFilter(value);
    setCurrentPage(1);
  };

  const handleActiveToggle = value => {
    setActiveOnly(value);
    setCurrentPage(1);
  };

  // ADD EMPLOYEE
  const openAddModal = () => {
    setEditingEmployee(null);
    setForm({ ...initialForm });
    setError("");
    setShowModal(true);
  };

  // EDIT EMPLOYEE
  const openEditModal = employee => {
    setEditingEmployee(employee);
    setForm({
      employeeId: employee.employeeId,
      employeeName: employee.employeeName,
      branch: employee.branch,
      department: employee.department,
      role: employee.role,
      active: employee.active
    });
    setError("");
    setShowModal(true);
  };

  const handleFormChange = (field, value) => {
    setForm(previous => ({
      ...previous,
      [field]: value
    }));
  };

  // SAVE EMPLOYEE
  const saveEmployee = event => {
    event.preventDefault();

    const employeeId = form.employeeId.trim();
    const employeeName = form.employeeName.trim();

    if (!employeeId || !employeeName || !form.department.trim()) {
      setError("Please fill all required fields.");
      return;
    }

    const duplicate = employees.some(employee =>
      employee.employeeId.toLowerCase() === employeeId.toLowerCase() &&
      employee.id !== editingEmployee?.id
    );

    if (duplicate) {
      setError("Employee ID already exists.");
      return;
    }

    const employeeData = {
      ...form,
      employeeId,
      employeeName,
      branch: form.branch.trim(),
      department: form.department.trim()
    };

    if (editingEmployee) {
      setEmployees(previous =>
        EmployeeListModel.updateEmployee(
          previous,
          editingEmployee.id,
          employeeData
        )
      );
    } else {
      setEmployees(previous =>
        EmployeeListModel.addEmployee(previous, employeeData)
      );
    }

    closeModal();
  };

  const closeModal = () => {
    setShowModal(false);
    setEditingEmployee(null);
    setForm({ ...initialForm });
    setError("");
  };

  // ACTIVATE / DEACTIVATE
  const toggleEmployee = id => {
    setEmployees(previous =>
      EmployeeListModel.toggleEmployeeStatus(previous, id)
    );
  };

  // CSV BULK UPLOAD
  const handleBulkUpload = async event => {
    const file = event.target.files?.[0];

    if (!file) return;

    setUploadMessage("");

    try {
      if (!file.name.toLowerCase().endsWith(".csv")) {
        throw new Error("Please select a CSV file.");
      }

      const text = await file.text();
      const lines = text.split(/\r?\n/).filter(line => line.trim());

      if (lines.length < 2) {
        throw new Error("CSV file has no employee records.");
      }

      const headers = lines[0]
        .split(",")
        .map(value => value.trim().toLowerCase());

      const required = [
        "employeeid",
        "employeename",
        "branch",
        "department",
        "role"
      ];

      const indexes = required.map(header => headers.indexOf(header));

      if (indexes.some(index => index === -1)) {
        throw new Error(
          "CSV headers must be: employeeId, employeeName, branch, department, role"
        );
      }

      const imported = lines.slice(1).map((line, index) => {
        const columns = line.split(",").map(value => value.trim());

        return {
          id: Date.now() + index,
          employeeId: columns[indexes[0]] || "",
          employeeName: columns[indexes[1]] || "",
          branch: columns[indexes[2]] || "",
          department: columns[indexes[3]] || "",
          role: columns[indexes[4]] || "User",
          active: true
        };
      }).filter(employee =>
        employee.employeeId &&
        employee.employeeName &&
        employee.department
      );

      const existingIds = new Set(
        employees.map(employee => employee.employeeId.toLowerCase())
      );

      const uniqueEmployees = imported.filter(employee => {
        const key = employee.employeeId.toLowerCase();

        if (existingIds.has(key)) return false;

        existingIds.add(key);
        return true;
      });

      if (uniqueEmployees.length === 0) {
        throw new Error("No new valid employee records found.");
      }

      setEmployees(previous =>
        EmployeeListModel.importEmployees(previous, uniqueEmployees)
      );

      setSearch("");
      setFilter("All");
      setActiveOnly(false);
      setCurrentPage(1);

      setUploadMessage(
        `${uniqueEmployees.length} employees imported successfully.`
      );

    } catch (error) {
      setUploadMessage(error.message);
    } finally {
      event.target.value = "";
    }
  };

  // NAVIGATION
  const goBack = () => {
    navigate("/branch-master-list");
  };

  const goNext = () => {
    navigate("/master-data");
  };

  const goToPage = page => {
    setCurrentPage(Math.max(1, Math.min(page, totalPages)));
  };

  return {
    employees,
    filteredEmployees,
    paginatedEmployees,
    search,
    filter,
    activeOnly,
    currentPage: safePage,
    totalPages,
    pageSize,
    showModal,
    editingEmployee,
    form,
    error,
    uploadMessage,

    handleSearch,
    handleFilter,
    handleActiveToggle,
    openAddModal,
    openEditModal,
    handleFormChange,
    saveEmployee,
    closeModal,
    toggleEmployee,
    handleBulkUpload,
    goBack,
    goNext,
    goToPage
  };
};

export default useEmployeeListViewModel;
