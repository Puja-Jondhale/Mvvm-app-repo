
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
  ChevronLeft,
  ChevronRight,
  ArrowLeft,
  Pencil,
  Trash2,
  Plus,
  X,
  Search
} from "lucide-react";

import useDepartmentListViewModel from "./useDepartmentListViewModel";
import "./DepartmentList.css";

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

const DepartmentList = () => {
  const vm = useDepartmentListViewModel();

  return (
    <div className="department-page">

      {/* SIDEBAR */}
      <aside className="department-sidebar">

        <div className="department-logo-area">
          <div className="access360-security">

            <img
              src="/logo.webp"
              alt="Access360 Security Logo"
              className="access360-main-logo"
            />

          </div>
        </div>

        <nav className="department-sidebar-nav">

          {sidebarItems.map(item => {
            const Icon = item.icon;

            return (
              <button
                key={item.label}
                className={`department-sidebar-link ${
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
      <div className="department-main">

        {/* HEADER */}
        <header className="department-header">

          <div className="department-company">
            <h1>Sentorixx global solution pvt ltd</h1>
            <span>Baner</span>
          </div>

          <div className="department-header-right">

            <span className="department-welcome">
              Welcome Sentorixx
            </span>

            <div className="department-header-icons">

              <button title="Messages">
                <Mail size={21} />
              </button>

              <button title="Notifications">
                <Bell size={21} />
                <span className="department-notification-count">0</span>
              </button>

              <button title="Profile">
                <UserRound size={21} />
              </button>

            </div>

          </div>

        </header>

        {/* CONTENT */}
        <main className="department-content">

          <section className="department-card">

            {/* TOOLBAR */}
            <div className="department-toolbar">

              <div className="department-title">

                <button
                  className="department-back-button"
                  onClick={vm.goBack}
                  title="Back"
                >
                  <ArrowLeft size={15} />
                </button>

                <h2>Department List</h2>

              </div>

              <div className="department-toolbar-actions">

                <div className="department-search">

                  <Search size={18} />

                  <input
                    type="text"
                    placeholder="Search"
                    value={vm.search}
                    onChange={e => vm.handleSearch(e.target.value)}
                  />

                  {vm.search && (
                    <button
                      type="button"
                      onClick={() => vm.handleSearch("")}
                      title="Clear search"
                    >
                      <X size={15} />
                    </button>
                  )}

                </div>

                <button
                  className="department-add-button"
                  onClick={vm.openAddModal}
                >
                  <Plus size={17} />
                  Add New
                </button>

              </div>

            </div>

            {/* TABLE */}
            <div className="department-table-wrapper">

              <table className="department-table">

                <thead>
                  <tr>
                    <th className="department-sr-heading">SR.NO</th>
                    <th>DEPARTMENT NAME</th>
                    <th className="department-action-heading">ACTION</th>
                  </tr>
                </thead>

                <tbody>

                  {vm.paginatedDepartments.length > 0 ? (

                    vm.paginatedDepartments.map((department, index) => (

                      <tr key={department.id}>

                        <td className="department-serial">
                          {(vm.currentPage - 1) * vm.pageSize + index + 1}
                        </td>

                        <td>
                          <div className="department-name-cell">

                            <div className="department-initial">
                              {department.departmentName
                                .charAt(0)
                                .toUpperCase()}
                            </div>

                            <span>{department.departmentName}</span>

                          </div>
                        </td>

                        <td>
                          <div className="department-actions">

                            <button
                              className="department-edit-button"
                              title="Edit Department"
                              onClick={() =>
                                vm.openEditModal(department)
                              }
                            >
                              <Pencil size={16} />
                            </button>

                            <button
                              className="department-delete-button"
                              title="Delete Department"
                              onClick={() =>
                                vm.deleteDepartment(department.id)
                              }
                            >
                              <Trash2 size={16} />
                            </button>

                          </div>
                        </td>

                      </tr>

                    ))

                  ) : (

                    <tr>
                      <td colSpan="3" className="department-empty">
                        No departments found.
                      </td>
                    </tr>

                  )}

                </tbody>

              </table>

            </div>

            {/* PAGINATION */}
            <div className="department-pagination">

              <button
                className="department-pagination-text"
                disabled={vm.currentPage === 1}
                onClick={() => vm.goToPage(vm.currentPage - 1)}
              >
                « &nbsp; Previous
              </button>

              {Array.from(
                { length: vm.totalPages },
                (_, index) => index + 1
              ).map(page => (

                <button
                  key={page}
                  className={
                    vm.currentPage === page
                      ? "department-page-number selected"
                      : "department-page-number"
                  }
                  onClick={() => vm.goToPage(page)}
                >
                  {page}
                </button>

              ))}

              <button
                className="department-pagination-text"
                disabled={vm.currentPage === vm.totalPages}
                onClick={() => vm.goToPage(vm.currentPage + 1)}
              >
                Next &nbsp; »
              </button>

            </div>

          </section>

          {/* NEXT BUTTON */}
          <div className="department-bottom-next">

            <button onClick={vm.goNext}>
              Next <ChevronRight size={17} />
            </button>

          </div>

        </main>

      </div>

      {/* ADD / EDIT MODAL */}
      {vm.showModal && (

        <div className="department-modal-overlay">

          <div className="department-modal">

            <div className="department-modal-header">

              <h3>
                {vm.editingDepartment
                  ? "Edit Department"
                  : "Add New Department"}
              </h3>

              <button onClick={vm.closeModal} title="Close">
                <X size={21} />
              </button>

            </div>

            <form onSubmit={vm.saveDepartment}>

              <div className="department-modal-body">

                <label htmlFor="departmentName">
                  Department Name *
                </label>

                <input
                  id="departmentName"
                  type="text"
                  placeholder="Enter department name"
                  value={vm.departmentName}
                  onChange={e =>
                    vm.setDepartmentName(e.target.value)
                  }
                  autoFocus
                />

                {vm.error && (
                  <p className="department-error">
                    {vm.error}
                  </p>
                )}

              </div>

              <div className="department-modal-footer">

                <button
                  type="button"
                  className="department-cancel-button"
                  onClick={vm.closeModal}
                >
                  Cancel
                </button>

                <button
                  type="submit"
                  className="department-save-button"
                >
                  {vm.editingDepartment ? "Update" : "Save"}
                </button>

              </div>

            </form>

          </div>

        </div>

      )}

    </div>
  );
};

export default DepartmentList;
