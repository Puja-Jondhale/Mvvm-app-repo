
import React from "react";

import {
  LayoutDashboard,
  CalendarClock,
  CalendarDays,
  Users,
  FileText,
  ClipboardList,
  Ban,
  History,
  Bell,
  UserRound,
  Mail,
  ArrowLeft,
  Pencil,
  UserX,
  Plus,
  FileSpreadsheet,
  Search,
  ArrowRight,
  X,
  ChevronLeft,
  ChevronRight
} from "lucide-react";

import useEmployeeListViewModel from "./useEmployeeListViewModel";
import "./EmployeeList.css";

const sidebarItems = [
  { label: "Dashboard", icon: LayoutDashboard, path: "/dashboard" },
  { label: "My Dashboard", icon: CalendarClock, path: "/my-dashboard" },
  { label: "Invite Visitor", icon: CalendarDays, path: "/invite-visitor" },
  { label: "Plan Internal Meeting", icon: Users, path: "/plan-internal-meeting" },
  { label: "Master Data", icon: FileText, path: "/master-data" },
  { label: "Reports", icon: ClipboardList, path: "/reports" },
  { label: "Blacklisted Visitors", icon: Ban, path: "/blacklisted-visitors" },
  { label: "Visitor History", icon: History, path: "/visitor-history" }
];

const EmployeeList = () => {
  const vm = useEmployeeListViewModel();

  return (
    <div className="employee-page">

      {/* SIDEBAR */}
      <aside className="employee-sidebar">

        <div className="employee-logo-area">
          <div className="access360-security">

            <img
              src="/logo.webp"
              alt="Access360 Security Logo"
              className="access360-main-logo"
            />

          </div>
        </div>

        <nav className="employee-sidebar-nav">

          {sidebarItems.map(item => {
            const Icon = item.icon;

            return (
              <button
                key={item.label}
                className={`employee-sidebar-link ${
                  item.label === "Master Data" ? "active" : ""
                }`}
                onClick={() => vm.navigateTo(item.path)}
              >
                <Icon size={20} />
                <span>{item.label}</span>
              </button>
            );
          })}

        </nav>

      </aside>

      {/* MAIN */}
      <div className="employee-main">

        {/* HEADER */}
        <header className="employee-header">

          <div className="employee-company">
            <h1>Sentorixx global solution pvt ltd</h1>
            <span>Baner</span>
          </div>

          <div className="employee-header-right">

            <span className="employee-welcome">
              Welcome Sentorixx
            </span>

            <div className="employee-header-icons">

              <button title="Messages">
                <Mail size={21} />
              </button>

              <button title="Notifications">
                <Bell size={21} />
                <span className="employee-notification-count">0</span>
              </button>

              <button title="Profile">
                <UserRound size={21} />
              </button>

            </div>

          </div>

        </header>

        {/* CONTENT */}
        <main className="employee-content">

          <section className="employee-card">

            {/* TOOLBAR */}
            <div className="employee-toolbar">

              <div className="employee-title">

                <button
                  className="employee-back-button"
                  onClick={vm.goBack}
                  title="Back"
                >
                  <ArrowLeft size={21} />
                </button>

                <h2>Employee List</h2>

              </div>

              <div className="employee-toolbar-actions">

                {/* FILTER */}
                <select
                  className="employee-filter"
                  value={vm.filter}
                  onChange={e => vm.handleFilter(e.target.value)}
                >
                  <option value="All">All</option>
                  <option value="Active">Active</option>
                  <option value="Inactive">Inactive</option>
                </select>

                {/* SEARCH */}
                <div className="employee-search">
                  <Search size={19} />

                  <input
                    type="text"
                    placeholder="Search..."
                    value={vm.search}
                    onChange={e => vm.handleSearch(e.target.value)}
                  />
                </div>

                {/* ACTIVE TOGGLE */}
                <div className="employee-status-toggle">

                  <span>Active</span>

                  <button
                    type="button"
                    role="switch"
                    aria-checked={vm.activeOnly}
                    className={`employee-switch ${
                      vm.activeOnly ? "enabled" : ""
                    }`}
                    onClick={() =>
                      vm.handleActiveToggle(!vm.activeOnly)
                    }
                    title="Show active employees only"
                  >
                    <span />
                  </button>

                </div>

                {/* BULK UPLOAD */}
                <label
                  className="employee-bulk-button"
                  htmlFor="employee-bulk-upload"
                >
                  <FileSpreadsheet size={16} />
                  Bulk Upload
                </label>

                <input
                  id="employee-bulk-upload"
                  type="file"
                  accept=".csv"
                  hidden
                  onChange={vm.handleBulkUpload}
                />

                {/* ADD NEW */}
                <button
                  className="employee-add-button"
                  onClick={vm.openAddModal}
                >
                  <Plus size={20} />
                  Add New
                </button>

              </div>

            </div>

            {/* UPLOAD MESSAGE */}
            {vm.uploadMessage && (
              <div className="employee-upload-message">
                {vm.uploadMessage}
              </div>
            )}

            {/* TABLE */}
            <div className="employee-table-wrapper">

              <table className="employee-table">

                <thead>
                  <tr>
                    <th>SR.NO</th>
                    <th>EMPLOYEE ID</th>
                    <th>EMPLOYEE NAME</th>
                    <th>DEPARTMENT</th>
                    <th>ROLE</th>
                    <th>ACTION</th>
                  </tr>
                </thead>

                <tbody>

                  {vm.paginatedEmployees.length > 0 ? (

                    vm.paginatedEmployees.map((employee, index) => (

                      <tr key={employee.id}>

                        <td className="employee-serial">
                          {(vm.currentPage - 1) * vm.pageSize + index + 1}
                        </td>

                        <td className="employee-id">
                          {employee.employeeId}
                        </td>

                        <td>
                          <div className="employee-name-cell">

                            <strong>
                              {employee.employeeName}
                            </strong>

                            <span>{employee.branch}</span>

                          </div>
                        </td>

                        <td>{employee.department}</td>

                        <td>{employee.role}</td>

                        <td>
                          <div className="employee-actions">

                            {/* EDIT */}
                            <button
                              className="employee-edit-action"
                              title="Edit Employee"
                              onClick={() =>
                                vm.openEditModal(employee)
                              }
                            >
                              <Pencil size={19} fill="currentColor" />
                            </button>

                            {/* ACTIVATE / DEACTIVATE */}
                            <button
                              className={`employee-status-action ${
                                employee.active ? "" : "inactive"
                              }`}
                              title={
                                employee.active
                                  ? "Deactivate Employee"
                                  : "Activate Employee"
                              }
                              onClick={() =>
                                vm.toggleEmployee(employee.id)
                              }
                            >
                              <UserX size={19} />
                            </button>

                          </div>
                        </td>

                      </tr>

                    ))

                  ) : (

                    <tr>
                      <td colSpan="6" className="employee-empty">
                        No employees found.
                      </td>
                    </tr>

                  )}

                </tbody>

              </table>

            </div>

            {/* BOTTOM PAGINATION */}
            <div className="employee-footer">

              <div className="employee-pagination">

                <button
                  disabled={vm.currentPage === 1}
                  onClick={() => vm.goToPage(vm.currentPage - 1)}
                >
                  « Previous
                </button>

                {Array.from(
                  { length: vm.totalPages },
                  (_, index) => index + 1
                ).map(page => (

                  <button
                    key={page}
                    className={
                      vm.currentPage === page ? "selected" : ""
                    }
                    onClick={() => vm.goToPage(page)}
                  >
                    {page}
                  </button>

                ))}

                <button
                  disabled={vm.currentPage === vm.totalPages}
                  onClick={() => vm.goToPage(vm.currentPage + 1)}
                >
                  Next »
                </button>

              </div>

              <button
                className="employee-next-button"
                onClick={vm.goNext}
              >
                Next
              </button>

            </div>

          </section>

        </main>

      </div>

      {/* ADD / EDIT EMPLOYEE MODAL */}
      {vm.showModal && (

        <div className="employee-modal-overlay">

          <div className="employee-modal">

            <div className="employee-modal-header">

              <h3>
                {vm.editingEmployee
                  ? "Edit Employee"
                  : "Add New Employee"}
              </h3>

              <button onClick={vm.closeModal}>
                <X size={21} />
              </button>

            </div>

            <form onSubmit={vm.saveEmployee}>

              <div className="employee-modal-body">

                <div className="employee-form-grid">

                  <div className="employee-form-group">
                    <label>Employee ID *</label>
                    <input
                      value={vm.form.employeeId}
                      onChange={e =>
                        vm.handleFormChange("employeeId", e.target.value)
                      }
                      placeholder="Enter employee ID"
                    />
                  </div>

                  <div className="employee-form-group">
                    <label>Employee Name *</label>
                    <input
                      value={vm.form.employeeName}
                      onChange={e =>
                        vm.handleFormChange("employeeName", e.target.value)
                      }
                      placeholder="Enter employee name"
                    />
                  </div>

                  <div className="employee-form-group">
                    <label>Branch *</label>
                    <input
                      value={vm.form.branch}
                      onChange={e =>
                        vm.handleFormChange("branch", e.target.value)
                      }
                      placeholder="Enter branch"
                    />
                  </div>

                  <div className="employee-form-group">
                    <label>Department *</label>
                    <input
                      value={vm.form.department}
                      onChange={e =>
                        vm.handleFormChange("department", e.target.value)
                      }
                      placeholder="Enter department"
                    />
                  </div>

                  <div className="employee-form-group">
                    <label>Role</label>
                    <select
                      value={vm.form.role}
                      onChange={e =>
                        vm.handleFormChange("role", e.target.value)
                      }
                    >
                      <option value="User">User</option>
                      <option value="Admin">Admin</option>
                      <option value="Manager">Manager</option>
                    </select>
                  </div>

                  <div className="employee-form-group">
                    <label>Status</label>
                    <select
                      value={vm.form.active ? "Active" : "Inactive"}
                      onChange={e =>
                        vm.handleFormChange(
                          "active",
                          e.target.value === "Active"
                        )
                      }
                    >
                      <option value="Active">Active</option>
                      <option value="Inactive">Inactive</option>
                    </select>
                  </div>

                </div>

                {vm.error && (
                  <p className="employee-form-error">
                    {vm.error}
                  </p>
                )}

              </div>

              <div className="employee-modal-footer">

                <button
                  type="button"
                  className="employee-cancel-button"
                  onClick={vm.closeModal}
                >
                  Cancel
                </button>

                <button
                  type="submit"
                  className="employee-save-button"
                >
                  {vm.editingEmployee ? "Update" : "Save"}
                </button>

              </div>

            </form>

          </div>

        </div>

      )}

    </div>
  );
};

export default EmployeeList;
