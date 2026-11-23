
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

import usePurposeListViewModel from "./usePurposeListViewModel";
import "./PurposeList.css";

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

const PurposeList = () => {

  const vm = usePurposeListViewModel();

  return (
    <div className="purpose-page">

      {/* SIDEBAR */}

      <aside className="purpose-sidebar">

        <div className="purpose-logo-area">
          <div className="access360-security">

            <img
              src="/logo.webp"
              alt="Access360 Security Logo"
              className="access360-main-logo"
            />

          </div>
        </div>

        <nav className="purpose-sidebar-nav">

          {sidebarItems.map(item => {

            const Icon = item.icon;

            return (
              <button
                key={item.label}
                className={`purpose-sidebar-link ${
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

      <div className="purpose-main">

        {/* HEADER */}

        <header className="purpose-header">

          <div className="purpose-company">

            <h1>Sentorixx global solution pvt ltd</h1>

            <span>Baner</span>

          </div>

          <div className="purpose-header-right">

            <span className="purpose-welcome">
              Welcome Sentorixx
            </span>

            <div className="purpose-header-icons">

              <button title="Messages">
                <Mail size={21} />
              </button>

              <button title="Notifications">

                <Bell size={21} />

                <span className="purpose-notification-count">
                  0
                </span>

              </button>

              <button title="Profile">
                <UserRound size={21} />
              </button>

            </div>

          </div>

        </header>

        {/* PAGE CONTENT */}

        <main className="purpose-content">

          <section className="purpose-card">

            {/* TOOLBAR */}

            <div className="purpose-toolbar">

              <div className="purpose-title">

                <button
                  className="purpose-back-button"
                  onClick={vm.goBack}
                  title="Back"
                >

                  <ArrowLeft size={13} />

                </button>

                <h2>Purpose List</h2>

              </div>

              <div className="purpose-toolbar-actions">

                {/* SEARCH */}

                <div className="purpose-search">

                  <Search size={18} />

                  <input
                    type="text"
                    placeholder="Search purpose..."
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
                  className="purpose-add-button"
                  onClick={vm.openAddModal}
                >

                  <Plus size={17} />

                  Add New

                </button>

              </div>

            </div>

            {/* PURPOSE TABLE */}

            <div className="purpose-table-wrapper">

              <table className="purpose-table">

                <thead>

                  <tr>

                    <th className="purpose-sr-heading">
                      SR.NO
                    </th>

                    <th className="purpose-name-heading">
                      PURPOSE NAME
                    </th>

                    <th className="purpose-action-heading">
                      ACTIONS
                    </th>

                  </tr>

                </thead>

                <tbody>

                  {vm.paginatedPurposes.length > 0 ? (

                    vm.paginatedPurposes.map((purpose, index) => (

                      <tr key={purpose.id}>

                        <td className="purpose-serial">

                          {(vm.currentPage - 1) *
                            vm.pageSize + index + 1}

                        </td>

                        <td className="purpose-name">

                          {purpose.purposeName}

                        </td>

                        <td>

                          <div className="purpose-actions">

                            {/* EDIT */}

                            <button
                              className="purpose-edit-button"
                              title="Edit Purpose"
                              onClick={() =>
                                vm.openEditModal(purpose)
                              }
                            >

                              <Pencil size={16} />

                            </button>

                            {/* DELETE */}

                            <button
                              className="purpose-delete-button"
                              title="Delete Purpose"
                              onClick={() =>
                                vm.deletePurpose(purpose.id)
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

                      <td
                        colSpan="3"
                        className="purpose-empty"
                      >

                        No purpose found.

                      </td>

                    </tr>

                  )}

                </tbody>

              </table>

            </div>

            {/* PAGINATION */}

            {vm.totalPages > 1 && (

              <div className="purpose-pagination">

                <button
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
                        ? "selected"
                        : ""
                    }
                    onClick={() => vm.goToPage(page)}
                  >

                    {page}

                  </button>

                ))}

                <button
                  disabled={vm.currentPage === vm.totalPages}
                  onClick={() =>
                    vm.goToPage(vm.currentPage + 1)
                  }
                >

                  Next &nbsp; »

                </button>

              </div>

            )}

          </section>

          {/* BOTTOM NEXT BUTTON */}

          <div className="purpose-bottom-next">

            <button onClick={vm.goNext}>

              Next

              <ChevronRight size={17} />

            </button>

          </div>

        </main>

      </div>

      {/* ADD / EDIT MODAL */}

      {vm.showModal && (

        <div className="purpose-modal-overlay">

          <div className="purpose-modal">

            <div className="purpose-modal-header">

              <h3>

                {vm.editingPurpose
                  ? "Edit Purpose"
                  : "Add New Purpose"}

              </h3>

              <button
                type="button"
                onClick={vm.closeModal}
                title="Close"
              >

                <X size={21} />

              </button>

            </div>

            <form onSubmit={vm.savePurpose}>

              <div className="purpose-modal-body">

                <label htmlFor="purposeName">
                  Purpose Name *
                </label>

                <input
                  id="purposeName"
                  type="text"
                  placeholder="Enter purpose name"
                  value={vm.purposeName}
                  onChange={e =>
                    vm.setPurposeName(e.target.value)
                  }
                  autoFocus
                />

                {vm.error && (

                  <p className="purpose-error">
                    {vm.error}
                  </p>

                )}

              </div>

              <div className="purpose-modal-footer">

                <button
                  type="button"
                  className="purpose-cancel-button"
                  onClick={vm.closeModal}
                >

                  Cancel

                </button>

                <button
                  type="submit"
                  className="purpose-save-button"
                >

                  {vm.editingPurpose ? "Update" : "Save"}

                </button>

              </div>

            </form>

          </div>

        </div>

      )}

    </div>
  );

};

export default PurposeList;
