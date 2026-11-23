
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
  Trash2,
  Plus,
  X,
  Search,
  ChevronRight
} from "lucide-react";

import useDesignationListViewModel from "./useDesignationListViewModel";
import "./DesignationList.css";

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

const DesignationList = () => {

  const vm = useDesignationListViewModel();

  return (

    <div className="designation-page">

      {/* SIDEBAR */}

      <aside className="designation-sidebar">

        <div className="designation-logo-area">

          <div className="access360-security">

            <img
              src="/logo.webp"
              alt="Access360 Security Logo"
              className="access360-main-logo"
            />

          </div>

        </div>

        <nav className="designation-sidebar-nav">

          {sidebarItems.map(item => {

            const Icon = item.icon;

            return (

              <button
                key={item.label}
                className={`designation-sidebar-link ${
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

      {/* MAIN SECTION */}

      <div className="designation-main">

        {/* HEADER */}

        <header className="designation-header">

          <div className="designation-company">

            <h1>Sentorixx global solution pvt ltd</h1>

            <span>Baner</span>

          </div>

          <div className="designation-header-right">

            <span className="designation-welcome">
              Welcome Sentorixx
            </span>

            <div className="designation-header-icons">

              <button title="Messages">
                <Mail size={21} />
              </button>

              <button title="Notifications">

                <Bell size={21} />

                <span className="designation-notification-count">
                  0
                </span>

              </button>

              <button title="Profile">
                <UserRound size={21} />
              </button>

            </div>

          </div>

        </header>

        {/* CONTENT */}

        <main className="designation-content">

          <section className="designation-card">

            {/* TOOLBAR */}

            <div className="designation-toolbar">

              <div className="designation-title">

                <button
                  className="designation-back-button"
                  onClick={vm.goBack}
                  title="Back"
                >
                  <ArrowLeft size={15} />
                </button>

                <h2>Designation List</h2>

              </div>

              <div className="designation-toolbar-actions">

                {/* SEARCH */}

                <div className="designation-search">

                  <Search size={18} />

                  <input
                    type="text"
                    placeholder="Search"
                    value={vm.search}
                    onChange={e =>
                      vm.handleSearch(e.target.value)
                    }
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

                {/* ADD NEW */}

                <button
                  className="designation-add-button"
                  onClick={vm.openAddModal}
                >

                  <Plus size={17} />

                  Add New

                </button>

              </div>

            </div>

            {/* DESIGNATION TABLE */}

            <div className="designation-table-wrapper">

              <table className="designation-table">

                <thead>

                  <tr>

                    <th className="designation-sr-heading">
                      SR.NO
                    </th>

                    <th>
                      DESIGNATION NAME
                    </th>

                    <th className="designation-action-heading">
                      ACTION
                    </th>

                  </tr>

                </thead>

                <tbody>

                  {vm.paginatedDesignations.length > 0 ? (

                    vm.paginatedDesignations.map((designation, index) => (

                      <tr key={designation.id}>

                        {/* SERIAL NUMBER */}

                        <td className="designation-serial">

                          {(vm.currentPage - 1) * vm.pageSize + index + 1}

                        </td>

                        {/* DESIGNATION NAME */}

                        <td>

                          <div className="designation-name-cell">

                            <div className="designation-initial">

                              {designation.designationName
                                .charAt(0)
                                .toUpperCase()}

                            </div>

                            <span>
                              {designation.designationName}
                            </span>

                          </div>

                        </td>

                        {/* ACTION BUTTONS */}

                        <td>

                          <div className="designation-actions">

                            <button
                              className="designation-edit-button"
                              title="Edit Designation"
                              onClick={() =>
                                vm.openEditModal(designation)
                              }
                            >

                              <Pencil size={16} />

                            </button>

                            <button
                              className="designation-delete-button"
                              title="Delete Designation"
                              onClick={() =>
                                vm.deleteDesignation(designation.id)
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

                      <td colSpan="3" className="designation-empty">

                        No designations found.

                      </td>

                    </tr>

                  )}

                </tbody>

              </table>

            </div>

            {/* PAGINATION */}

            <div className="designation-pagination">

              <button
                className="designation-pagination-text"
                disabled={vm.currentPage === 1}
                onClick={() =>
                  vm.goToPage(vm.currentPage - 1)
                }
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
                      ? "designation-page-number selected"
                      : "designation-page-number"
                  }
                  onClick={() => vm.goToPage(page)}
                >

                  {page}

                </button>

              ))}

              <button
                className="designation-pagination-text"
                disabled={vm.currentPage === vm.totalPages}
                onClick={() =>
                  vm.goToPage(vm.currentPage + 1)
                }
              >
                Next &nbsp; »

              </button>

            </div>

          </section>

          {/* BOTTOM NEXT BUTTON */}

          <div className="designation-bottom-next">

            <button onClick={vm.goNext}>

              Next

              <ChevronRight size={17} />

            </button>

          </div>

        </main>

      </div>

      {/* ADD / EDIT MODAL */}

      {vm.showModal && (

        <div className="designation-modal-overlay">

          <div className="designation-modal">

            <div className="designation-modal-header">

              <h3>

                {vm.editingDesignation
                  ? "Edit Designation"
                  : "Add New Designation"}

              </h3>

              <button
                onClick={vm.closeModal}
                title="Close"
              >

                <X size={21} />

              </button>

            </div>

            <form onSubmit={vm.saveDesignation}>

              <div className="designation-modal-body">

                <label htmlFor="designationName">
                  Designation Name *
                </label>

                <input
                  id="designationName"
                  type="text"
                  placeholder="Enter designation name"
                  value={vm.designationName}
                  onChange={e =>
                    vm.setDesignationName(e.target.value)
                  }
                  autoFocus
                />

                {vm.error && (

                  <p className="designation-error">
                    {vm.error}
                  </p>

                )}

              </div>

              <div className="designation-modal-footer">

                <button
                  type="button"
                  className="designation-cancel-button"
                  onClick={vm.closeModal}
                >

                  Cancel

                </button>

                <button
                  type="submit"
                  className="designation-save-button"
                >

                  {vm.editingDesignation ? "Update" : "Save"}

                </button>

              </div>

            </form>

          </div>

        </div>

      )}

    </div>

  );

};

export default DesignationList;
