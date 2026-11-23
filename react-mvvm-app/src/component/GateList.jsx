
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

import useGateViewModel from "./useGateViewModel";

import "./GateList.css";

const sidebarItems = [
  { label: "Dashboard", icon: LayoutDashboard },
  { label: "My Dashboard", icon: CalendarClock },
  { label: "Invite Visitor", icon: CalendarDays },
  { label: "Plan Internal Meeting", icon: Users },
  { label: "Master Data", icon: FileText },
  { label: "Reports", icon: ClipboardList },
  { label: "Blacklisted Visitors", icon: Ban },
  { label: "Visitor History", icon: History }
];

const GateList = () => {

  const vm = useGateViewModel();

  return (

    <div className="gate-page">

      {/* SIDEBAR */}

      <aside className="gate-sidebar">

        <div className="gate-logo-area">

          <div className="access360-security">

            <img
              src="/logo.webp"
              alt="Access360 Security Logo"
              className="access360-main-logo"
            />

          </div>

        </div>

        <nav className="gate-sidebar-nav">

          {sidebarItems.map(item => {

            const Icon = item.icon;

            return (

              <button
                key={item.label}
                className={`gate-sidebar-link ${
                  item.label === "Master Data" ? "active" : ""
                }`}
                type="button"
              >

                <Icon size={20} />

                <span>{item.label}</span>

              </button>

            );

          })}

        </nav>

      </aside>

      {/* MAIN AREA */}

      <div className="gate-main">

        {/* HEADER */}

        <header className="gate-header">

          <div className="gate-company">

            <h1>Sentorixx global solution pvt ltd</h1>

            <span>Baner</span>

          </div>

          <div className="gate-header-right">

            <span className="gate-welcome">
              Welcome Sentorixx
            </span>

            <div className="gate-header-icons">

              <button type="button" title="Messages">
                <Mail size={21} />
              </button>

              <button type="button" title="Notifications">

                <Bell size={21} />

                <span className="gate-notification">0</span>

              </button>

              <button type="button" title="Profile">
                <UserRound size={21} />
              </button>

            </div>

          </div>

        </header>

        {/* CONTENT */}

        <main className="gate-content">

          <section className="gate-card">

            {/* TOOLBAR */}

            <div className="gate-toolbar">

              <div className="gate-title">

                <button
                  className="gate-back-button"
                  type="button"
                  onClick={vm.goBack}
                  title="Back"
                >

                  <ArrowLeft size={13} />

                </button>

                <h2>Gate List</h2>

              </div>

              <div className="gate-toolbar-actions">

                {/* SEARCH */}

                <div className="gate-search">

                  <Search size={18} />

                  <input
                    type="text"
                    placeholder="Search gates..."
                    value={vm.search}
                    onChange={e => vm.setSearch(e.target.value)}
                  />

                  {vm.search && (

                    <button
                      type="button"
                      onClick={() => vm.setSearch("")}
                    >

                      <X size={15} />

                    </button>

                  )}

                </div>

                {/* ADD NEW */}

                <button
                  type="button"
                  className="gate-add-button"
                  onClick={vm.openAddModal}
                >

                  <Plus size={17} />

                  Add New

                </button>

              </div>

            </div>

            {/* TABLE */}

            <div className="gate-table-wrapper">

              <table className="gate-table">

                <thead>

                  <tr>

                    <th className="gate-sr-column">
                      SR.NO
                    </th>

                    <th>BRANCH NAME</th>

                    <th>GATE NAME</th>

                    <th className="gate-action-heading">
                      ACTIONS
                    </th>

                  </tr>

                </thead>

                <tbody>

                  {vm.filteredGates.length > 0 ? (

                    vm.filteredGates.map((gate, index) => (

                      <tr key={gate.id}>

                        <td className="gate-serial">
                          {index + 1}
                        </td>

                        <td className="gate-branch-name">
                          {gate.branchName}
                        </td>

                        <td className="gate-name">
                          {gate.gateName}
                        </td>

                        <td>

                          <div className="gate-actions">

                            {/* EDIT */}

                            <button
                              type="button"
                              className="gate-edit"
                              title="Edit"
                              onClick={() => vm.openEditModal(gate)}
                            >

                              <Pencil size={16} />

                            </button>

                            {/* DELETE */}

                            <button
                              type="button"
                              className="gate-delete"
                              title="Delete"
                              onClick={() => vm.deleteGate(gate.id)}
                            >

                              <Trash2 size={16} />

                            </button>

                          </div>

                        </td>

                      </tr>

                    ))

                  ) : (

                    <tr>

                      <td colSpan="4" className="gate-empty">
                        No gates found.
                      </td>

                    </tr>

                  )}

                </tbody>

              </table>

            </div>

            {/* TABLE FOOTER */}

            <div className="gate-table-footer">

              <button
                type="button"
                className="gate-next-button"
                onClick={vm.goNext}
              >

                Next

                <span>→</span>

              </button>

            </div>

          </section>

        </main>

      </div>

      {/* ADD / EDIT MODAL */}

      {vm.showModal && (

        <div className="gate-modal-overlay">

          <div className="gate-modal">

            <div className="gate-modal-header">

              <h3>
                {vm.editingGate
                  ? "Edit Gate"
                  : "Add New Gate"}
              </h3>

              <button
                type="button"
                onClick={vm.closeModal}
                title="Close"
              >

                <X size={21} />

              </button>

            </div>

            <form onSubmit={vm.saveGate}>

              <div className="gate-modal-body">

                <label>Branch Name *</label>

                <input
                  type="text"
                  placeholder="Enter branch name"
                  value={vm.branchName}
                  onChange={e => vm.setBranchName(e.target.value)}
                />

                <label>Gate Name *</label>

                <input
                  type="text"
                  placeholder="Enter gate name"
                  value={vm.gateName}
                  onChange={e => vm.setGateName(e.target.value)}
                />

                {vm.error && (

                  <p className="gate-error">
                    {vm.error}
                  </p>

                )}

              </div>

              <div className="gate-modal-footer">

                <button
                  type="button"
                  className="gate-cancel-button"
                  onClick={vm.closeModal}
                >

                  Cancel

                </button>

                <button
                  type="submit"
                  className="gate-save-button"
                >

                  {vm.editingGate ? "Update" : "Save"}

                </button>

              </div>

            </form>

          </div>

        </div>

      )}

    </div>

  );

};

export default GateList;
