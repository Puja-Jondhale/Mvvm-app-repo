
const initialDepartments = [
  { id: 1, departmentName: "Sales&Marketing" },
  { id: 2, departmentName: "QC&Repair" },
  { id: 3, departmentName: "Driver" },
  { id: 4, departmentName: "Store" },
  { id: 5, departmentName: "Accounts" },
  { id: 6, departmentName: "Sales & Services" },
  { id: 7, departmentName: "Stores" },
  { id: 8, departmentName: "Purchase" },
  { id: 9, departmentName: "Project" },
  { id: 10, departmentName: "Service" },
  { id: 11, departmentName: "IT" },
  { id: 12, departmentName: "Administration" },
  { id: 13, departmentName: "Human Resources" },
  { id: 14, departmentName: "Operations" },
  { id: 15, departmentName: "Finance" }
];

const DepartmentListModel = {
  getDepartments() {
    return initialDepartments.map(item => ({ ...item }));
  },

  addDepartment(departments, departmentName) {
    return [
      ...departments,
      {
        id: Date.now(),
        departmentName
      }
    ];
  },

  updateDepartment(departments, id, departmentName) {
    return departments.map(item =>
      item.id === id
        ? { ...item, departmentName }
        : item
    );
  },

  deleteDepartment(departments, id) {
    return departments.filter(item => item.id !== id);
  }
};

export default DepartmentListModel;
