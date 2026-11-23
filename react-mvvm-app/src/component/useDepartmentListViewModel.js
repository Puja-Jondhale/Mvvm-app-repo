
import { useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import DepartmentListModel from "./departmentListModel";

const useDepartmentListViewModel = () => {
  const navigate = useNavigate();

  const [departments, setDepartments] = useState(
    () => DepartmentListModel.getDepartments()
  );

  const [search, setSearch] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const pageSize = 10;

  const [showModal, setShowModal] = useState(false);
  const [editingDepartment, setEditingDepartment] = useState(null);
  const [departmentName, setDepartmentName] = useState("");
  const [error, setError] = useState("");

  // SEARCH
  const filteredDepartments = useMemo(() => {
    return departments.filter(item =>
      item.departmentName
        .toLowerCase()
        .includes(search.trim().toLowerCase())
    );
  }, [departments, search]);

  // PAGINATION
  const totalPages = Math.max(
    1,
    Math.ceil(filteredDepartments.length / pageSize)
  );

  const safePage = Math.min(currentPage, totalPages);

  const paginatedDepartments = filteredDepartments.slice(
    (safePage - 1) * pageSize,
    safePage * pageSize
  );

  // SEARCH HANDLER
  const handleSearch = value => {
    setSearch(value);
    setCurrentPage(1);
  };

  // OPEN ADD MODAL
  const openAddModal = () => {
    setEditingDepartment(null);
    setDepartmentName("");
    setError("");
    setShowModal(true);
  };

  // OPEN EDIT MODAL
  const openEditModal = department => {
    setEditingDepartment(department);
    setDepartmentName(department.departmentName);
    setError("");
    setShowModal(true);
  };

  // CLOSE MODAL
  const closeModal = () => {
    setShowModal(false);
    setEditingDepartment(null);
    setDepartmentName("");
    setError("");
  };

  // SAVE DEPARTMENT
  const saveDepartment = event => {
    event.preventDefault();

    const name = departmentName.trim();

    if (!name) {
      setError("Please enter department name.");
      return;
    }

    const duplicate = departments.some(item =>
      item.departmentName.toLowerCase() === name.toLowerCase() &&
      item.id !== editingDepartment?.id
    );

    if (duplicate) {
      setError("Department already exists.");
      return;
    }

    if (editingDepartment) {
      setDepartments(previous =>
        DepartmentListModel.updateDepartment(
          previous,
          editingDepartment.id,
          name
        )
      );
    } else {
      setDepartments(previous =>
        DepartmentListModel.addDepartment(previous, name)
      );

      setCurrentPage(1);
      setSearch("");
    }

    closeModal();
  };

  // DELETE DEPARTMENT
  const deleteDepartment = id => {
    const confirmed = window.confirm(
      "Are you sure you want to delete this department?"
    );

    if (!confirmed) return;

    setDepartments(previous =>
      DepartmentListModel.deleteDepartment(previous, id)
    );
  };

  // PAGINATION HANDLER
  const goToPage = page => {
    setCurrentPage(Math.max(1, Math.min(page, totalPages)));
  };

  // NAVIGATION
  const goBack = () => {
    navigate("/master-data");
  };

  const goNext = () => {
    navigate("/designation-master-list");
  };

  const navigateTo = path => {
    navigate(path);
  };

  return {
    departments,
    filteredDepartments,
    paginatedDepartments,

    search,
    currentPage: safePage,
    totalPages,
    pageSize,

    showModal,
    editingDepartment,
    departmentName,
    error,

    handleSearch,
    openAddModal,
    openEditModal,
    closeModal,
    saveDepartment,
    deleteDepartment,
    setDepartmentName,
    goToPage,
    goBack,
    goNext,
    navigateTo
  };
};

export default useDepartmentListViewModel;
