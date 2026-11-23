
const initialEmployees = [
  {
    id: 1,
    employeeId: "70857",
    employeeName: "Govardhan",
    branch: "Baner",
    department: "IT",
    role: "User",
    active: true
  },
  {
    id: 2,
    employeeId: "83284",
    employeeName: "check payload",
    branch: "Baner",
    department: "Service",
    role: "User",
    active: true
  },
  {
    id: 3,
    employeeId: "171717",
    employeeName: "test password",
    branch: "Baner",
    department: "IT",
    role: "User",
    active: true
  },
  {
    id: 4,
    employeeId: "70900",
    employeeName: "shrenik patil",
    branch: "Baner",
    department: "IT",
    role: "User",
    active: true
  },
  {
    id: 5,
    employeeId: "61",
    employeeName: "Vitthal Hade",
    branch: "Baner",
    department: "Service",
    role: "User",
    active: true
  },
  {
    id: 6,
    employeeId: "70000",
    employeeName: "Suraj Patil",
    branch: "Baner",
    department: "Purchase",
    role: "User",
    active: true
  },
  {
    id: 7,
    employeeId: "709100",
    employeeName: "Komal NAFade",
    branch: "Baner",
    department: "Accounts",
    role: "User",
    active: true
  },
  {
    id: 8,
    employeeId: "70999",
    employeeName: "Kiran Mane",
    branch: "Baner",
    department: "IT",
    role: "User",
    active: true
  },
  {
    id: 9,
    employeeId: "70998",
    employeeName: "Samarth Basutkar",
    branch: "Baner",
    department: "Project",
    role: "User",
    active: true
  },
  {
    id: 10,
    employeeId: "70997",
    employeeName: "Om Solse",
    branch: "Baner",
    department: "Service",
    role: "User",
    active: true
  }
];

const EmployeeListModel = {
  getEmployees() {
    return initialEmployees.map(employee => ({ ...employee }));
  },

  addEmployee(employees, employee) {
    return [
      ...employees,
      {
        ...employee,
        id: Date.now()
      }
    ];
  },

  updateEmployee(employees, id, updatedEmployee) {
    return employees.map(employee =>
      employee.id === id
        ? { ...employee, ...updatedEmployee }
        : employee
    );
  },

  toggleEmployeeStatus(employees, id) {
    return employees.map(employee =>
      employee.id === id
        ? { ...employee, active: !employee.active }
        : employee
    );
  },

  importEmployees(employees, newEmployees) {
    return [...employees, ...newEmployees];
  }
};

export default EmployeeListModel;
