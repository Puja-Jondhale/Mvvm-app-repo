
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
  Search,
  Plus,
  Pencil,
  Trash2,
  ArrowRight,
  X
} from "lucide-react";

import useBranchListViewModel from "./useBranchListViewModel";
import "./BranchList.css";

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

const BranchList = () => {
  const vm = useBranchListViewModel();

  return (
    <div className="branch-page">

      {/* SIDEBAR */}
      <aside className="branch-sidebar">

        <div className="branch-logo-area">
          <div className="access360-security">

            <img
              src="/logo.webp"
              alt="Access360 Security Logo"
              className="access360-main-logo"
            />

          </div>
        </div>

        <nav className="branch-sidebar-nav">

          {sidebarItems.map((item) => {
            const Icon = item.icon;

            return (
              <button
                key={item.label}
                className={`branch-sidebar-link ${
                  item.label === "Master Data" ? "active" : ""
                }`}
                onClick={() => vm.goBack() === undefined &&
                  item.label !== "Master Data" &&
                  window.location.assign(
                    `${window.location.pathname}#${item.path}`
                  )}
              >
                <Icon size={20} />
                <span>{item.label}</span>
              </button>
            );
          })}

        </nav>
      </aside>

      {/* MAIN SECTION */}
      <div className="branch-main">

        {/* HEADER */}
        <header className="branch-header">

          <div className="branch-company">
            <h1>Sentorixx global solution pvt ltd</h1>
            <span>Baner</span>
          </div>

          <div className="branch-header-right">

            <span className="branch-welcome">
              Welcome Sentorixx
            </span>

            <div className="branch-header-icons">

              <button title="Messages">
                <Mail size={21} />
              </button>

              <button title="Notifications">
                <Bell size={21} />
                <span className="branch-notification-count">0</span>
              </button>

              <button title="Profile">
                <UserRound size={21} />
              </button>

            </div>
          </div>
        </header>

        {/* PAGE CONTENT */}
        <main className="branch-content">

          {/* BRANCH LIST CARD */}
          <section className="branch-list-card">

            {/* CARD HEADER */}
            <div className="branch-list-toolbar">

              <div className="branch-list-title">

                <button
                  className="branch-back-button"
                  onClick={vm.goBack}
                  title="Back to Master Data"
                >
                  <ChevronLeft size={16} />
                </button>

                <h2>Branch List</h2>

              </div>

              <div className="branch-toolbar-actions">

                <div className="branch-search-box">
                  <Search size={18} />

                  <input
                    type="text"
                    placeholder="Search"
                    value={vm.search}
                    onChange={(e) => vm.setSearch(e.target.value)}
                  />
                </div>

                <button
                  className="branch-add-button"
                  onClick={vm.openAddModal}
                >
                  <Plus size={17} />
                  Add New
                </button>

              </div>

            </div>

            {/* TABLE */}
            <div className="branch-table-wrapper">

              <table className="branch-table">

                <thead>
                  <tr>
                    <th>SR.NO</th>
                    <th>BRANCH NAME</th>
                    <th>ACTION</th>
                  </tr>
                </thead>

                <tbody>

                  {vm.filteredBranches.length > 0 ? (

                    vm.filteredBranches.map((branch, index) => (

                      <tr key={branch.id}>

                        <td className="branch-sr">
                          {index + 1}
                        </td>

                        <td>
                          <div className="branch-name-cell">

                            <div className="branch-avatar">
                              {branch.branchName.charAt(0).toUpperCase()}
                            </div>

                            <span>{branch.branchName}</span>

                          </div>
                        </td>

                        <td>
                          <div className="branch-action-buttons">

                            <button
                              className="branch-edit-button"
                              title="Edit Branch"
                              onClick={() => vm.openEditModal(branch)}
                            >
                              <Pencil size={16} />
                            </button>

                            <button
                              className="branch-delete-button"
                              title="Delete Branch"
                              onClick={() => vm.deleteBranch(branch.id)}
                            >
                              <Trash2 size={16} />
                            </button>

                          </div>
                        </td>

                      </tr>

                    ))

                  ) : (

                    <tr>
                      <td colSpan="3" className="branch-empty">
                        No branches found.
                      </td>
                    </tr>

                  )}

                </tbody>

              </table>

            </div>

            <div className="branch-table-bottom"></div>

          </section>

          {/* NEXT BUTTON */}
          <div className="branch-next-container">

            <button
              className="branch-next-button"
              onClick={vm.goNext}
            >
              Next
              <ArrowRight size={17} />
            </button>

          </div>

        </main>

      </div>

      {/* ADD / EDIT MODAL */}
      {vm.showModal && (

        <div className="branch-modal-overlay">

          <div className="branch-modal">

            <div className="branch-modal-header">

              <h3>
                {vm.editingBranch ? "Edit Branch" : "Add New Branch"}
              </h3>

              <button
                onClick={vm.closeModal}
                className="branch-modal-close"
              >
                <X size={20} />
              </button>

            </div>

            <form onSubmit={vm.saveBranch}>

              <div className="branch-modal-body">

                <label>Branch Name</label>

                <input
                  type="text"
                  placeholder="Enter branch name"
                  value={vm.branchName}
                  onChange={(e) => vm.setBranchName(e.target.value)}
                  autoFocus
                />

                {vm.error && (
                  <p className="branch-form-error">
                    {vm.error}
                  </p>
                )}

              </div>

              <div className="branch-modal-footer">

                <button
                  type="button"
                  className="branch-cancel-button"
                  onClick={vm.closeModal}
                >
                  Cancel
                </button>

                <button
                  type="submit"
                  className="branch-save-button"
                >
                  {vm.editingBranch ? "Update" : "Save"}
                </button>

              </div>

            </form>

          </div>

        </div>

      )}

    </div>
  );
};

export default BranchList;
