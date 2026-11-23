
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

import useAccessPointListViewModel from "./useAccessPointListViewModel";
import "./AccessPointList.css";

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

const AccessPointList = () => {

  const vm = useAccessPointListViewModel();

  return (
    <div className="access-point-page">

      {/* SIDEBAR */}

      <aside className="access-point-sidebar">

        <div className="access-point-logo-area">
          <div className="access360-security">

            <img
              src="/logo.webp"
              alt="Access360 Security Logo"
              className="access360-main-logo"
            />

          </div>
          {/*<div className="access-point-logo">

            <svg viewBox="0 0 48 48" aria-hidden="true">

              <circle
                cx="24"
                cy="24"
                r="19"
                fill="none"
                stroke="#08752b"
                strokeWidth="3"
              />

              <path
                d="M24 12 L33 16 V25 C33 31 29 35 24 38 C19 35 15 31 15 25 V16 Z"
                fill="none"
                stroke="#08752b"
                strokeWidth="2.5"
              />

              <path
                d="M25 18 L20 26 H24 L22 32 L29 23 H25 Z"
                fill="#08752b"
              />

            </svg>

          </div>*/}

        </div>

        <nav className="access-point-sidebar-nav">

          {sidebarItems.map(item => {

            const Icon = item.icon;

            return (

              <button
                key={item.label}
                className={`access-point-sidebar-link ${
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

      <div className="access-point-main">

        {/* HEADER */}

        <header className="access-point-header">

          <div className="access-point-company">

            <h1>Sentorixx global solution pvt ltd</h1>

            <span>Baner</span>

          </div>

          <div className="access-point-header-right">

            <span className="access-point-welcome">
              Welcome Sentorixx
            </span>

            <div className="access-point-header-icons">

              <button title="Messages">
                <Mail size={21} />
              </button>

              <button title="Notifications">

                <Bell size={21} />

                <span className="access-point-notification">
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

        <main className="access-point-content">

          <section className="access-point-card">

            {/* TOOLBAR */}

            <div className="access-point-toolbar">

              <div className="access-point-title">

                <button
                  className="access-point-back"
                  onClick={vm.goBack}
                  title="Back"
                >

                  <ArrowLeft size={13} />

                </button>

                <h2>Access Point List</h2>

              </div>

              <div className="access-point-toolbar-actions">

                {/* SEARCH */}

                <div className="access-point-search">

                  <Search size={18} />

                  <input
                    type="text"
                    placeholder="Search access points..."
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

                {/* ADD NEW */}

                <button
                  className="access-point-add"
                  onClick={vm.openAddModal}
                >

                  <Plus size={17} />

                  Add New

                </button>

              </div>

            </div>

            {/* TABLE */}

            <div className="access-point-table-wrapper">

              <table className="access-point-table">

                <thead>

                  <tr>

                    <th className="access-point-sr">
                      SR.NO
                    </th>

                    <th className="access-point-branch">
                      BRANCH NAME
                    </th>

                    <th className="access-point-name">
                      ACCESS POINTS
                    </th>

                    <th className="access-point-actions-heading">
                      ACTIONS
                    </th>

                  </tr>

                </thead>

                <tbody>

                  {vm.paginatedAccessPoints.length > 0 ? (

                    vm.paginatedAccessPoints.map((item, index) => (

                      <tr key={item.id}>

                        <td className="access-point-serial">

                          {(vm.currentPage - 1) *
                            vm.pageSize + index + 1}

                        </td>

                        <td className="access-point-branch-name">

                          {item.branchName}

                        </td>

                        <td className="access-point-value">

                          {item.accessPoint}

                        </td>

                        <td>

                          <div className="access-point-action-buttons">

                            {/* EDIT */}

                            <button
                              className="access-point-edit"
                              title="Edit"
                              onClick={() => vm.openEditModal(item)}
                            >

                              <Pencil size={16} />

                            </button>

                            {/* DELETE */}

                            <button
                              className="access-point-delete"
                              title="Delete"
                              onClick={() => vm.deleteAccessPoint(item.id)}
                            >

                              <Trash2 size={16} />

                            </button>

                          </div>

                        </td>

                      </tr>

                    ))

                  ) : (

                    <tr>

                      <td colSpan="4" className="access-point-empty">

                        No access points found.

                      </td>

                    </tr>

                  )}

                </tbody>

              </table>

            </div>

            {/* PAGINATION */}

            {vm.totalPages > 1 && (

              <div className="access-point-pagination">

                <button
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

                  Next &nbsp; »

                </button>

              </div>

            )}

          </section>

          {/* BOTTOM NEXT */}

          <div className="access-point-bottom-next">

            <button onClick={vm.goNext}>

              Next

              <ChevronRight size={17} />

            </button>

          </div>

        </main>

      </div>

      {/* ADD / EDIT MODAL */}

      {vm.showModal && (

        <div className="access-point-modal-overlay">

          <div className="access-point-modal">

            <div className="access-point-modal-header">

              <h3>

                {vm.editingItem
                  ? "Edit Access Point"
                  : "Add New Access Point"}

              </h3>

              <button
                type="button"
                onClick={vm.closeModal}
                title="Close"
              >

                <X size={21} />

              </button>

            </div>

            <form onSubmit={vm.saveAccessPoint}>

              <div className="access-point-modal-body">

                <label htmlFor="branchName">
                  Branch Name *
                </label>

                <input
                  id="branchName"
                  type="text"
                  placeholder="Enter branch name"
                  value={vm.branchName}
                  onChange={e => vm.setBranchName(e.target.value)}
                  autoFocus
                />

                <label htmlFor="accessPoint">
                  Access Point *
                </label>

                <input
                  id="accessPoint"
                  type="text"
                  placeholder="Enter access point"
                  value={vm.accessPoint}
                  onChange={e => vm.setAccessPoint(e.target.value)}
                />

                {vm.error && (

                  <p className="access-point-error">
                    {vm.error}
                  </p>

                )}

              </div>

              <div className="access-point-modal-footer">

                <button
                  type="button"
                  className="access-point-cancel"
                  onClick={vm.closeModal}
                >

                  Cancel

                </button>

                <button
                  type="submit"
                  className="access-point-save"
                >

                  {vm.editingItem ? "Update" : "Save"}

                </button>

              </div>

            </form>

          </div>

        </div>

      )}

    </div>
  );

};

export default AccessPointList;
