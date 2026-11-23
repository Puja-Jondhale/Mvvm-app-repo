
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
  Search
} from "lucide-react";

import useMeetingVenueViewModel from "./useMeetingVenueViewModel";

import "./MeetingVenueList.css";

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

const MeetingVenueList = () => {

  const vm = useMeetingVenueViewModel();

  return (

    <div className="meeting-venue-page">

      {/* SIDEBAR */}

      <aside className="meeting-sidebar">

        <div className="meeting-logo-area">

          <div className="access360-security">

            <img
              src="/logo.webp"
              alt="Access360 Security Logo"
              className="access360-main-logo"
            />

          </div>

        </div>

        <nav className="meeting-sidebar-nav">

          {sidebarItems.map(item => {

            const Icon = item.icon;

            return (

              <button
                key={item.label}
                className={`meeting-sidebar-link ${
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

      {/* MAIN CONTENT */}

      <div className="meeting-main">

        {/* HEADER */}

        <header className="meeting-header">

          <div className="meeting-company">

            <h1>Sentorixx global solution pvt ltd</h1>

            <span>Baner</span>

          </div>

          <div className="meeting-header-right">

            <span className="meeting-welcome">
              Welcome Sentorixx
            </span>

            <div className="meeting-header-icons">

              <button title="Messages">
                <Mail size={21} />
              </button>

              <button title="Notifications">

                <Bell size={21} />

                <span className="meeting-notification">0</span>

              </button>

              <button title="Profile">
                <UserRound size={21} />
              </button>

            </div>

          </div>

        </header>

        {/* PAGE CONTENT */}

        <main className="meeting-content">

          <section className="meeting-card">

            {/* TOOLBAR */}

            <div className="meeting-toolbar">

              <div className="meeting-title">

                <button
                  className="meeting-back-button"
                  onClick={vm.goBack}
                  title="Back"
                >

                  <ArrowLeft size={13} />

                </button>

                <h2>Meeting Venue List</h2>

              </div>

              <div className="meeting-toolbar-actions">

                {/* SEARCH */}

                <div className="meeting-search">

                  <Search size={18} />

                  <input
                    type="text"
                    placeholder="Search venues..."
                    value={vm.search}
                    onChange={e => vm.setSearch(e.target.value)}
                  />

                  {vm.search && (

                    <button
                      onClick={() => vm.setSearch("")}
                      title="Clear search"
                    >

                      <X size={15} />

                    </button>

                  )}

                </div>

                {/* ADD NEW */}

                <button
                  className="meeting-add-button"
                  onClick={vm.openAddModal}
                >

                  <Plus size={17} />

                  Add New

                </button>

              </div>

            </div>

            {/* TABLE */}

            <div className="meeting-table-wrapper">

              <table className="meeting-table">

                <thead>

                  <tr>

                    <th className="meeting-sr-column">
                      SR.NO
                    </th>

                    <th>MEETING VENUE NAME</th>

                    <th>EXTENSION NUMBER</th>

                    <th className="meeting-capacity-heading">
                      SITTING CAPACITY
                    </th>

                    <th className="meeting-action-heading">
                      ACTIONS
                    </th>

                  </tr>

                </thead>

                <tbody>

                  {vm.filteredVenues.length > 0 ? (

                    vm.filteredVenues.map((venue, index) => (

                      <tr key={venue.id}>

                        <td className="meeting-serial">
                          {index + 1}
                        </td>

                        <td className="meeting-venue-name">
                          {venue.venueName}
                        </td>

                        <td>
                          {venue.extensionNumber}
                        </td>

                        <td className="meeting-capacity">

                          <span>
                            {venue.sittingCapacity}
                          </span>

                        </td>

                        <td>

                          <div className="meeting-actions">

                            <button
                              className="meeting-edit"
                              title="Edit"
                              onClick={() => vm.openEditModal(venue)}
                            >

                              <Pencil size={16} />

                            </button>

                            <button
                              className="meeting-delete"
                              title="Delete"
                              onClick={() => vm.deleteVenue(venue.id)}
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
                        colSpan="5"
                        className="meeting-empty"
                      >

                        No meeting venues found.

                      </td>

                    </tr>

                  )}

                </tbody>

              </table>

            </div>

          </section>

        </main>

      </div>

      {/* ADD / EDIT MODAL */}

      {vm.showModal && (

        <div className="meeting-modal-overlay">

          <div className="meeting-modal">

            <div className="meeting-modal-header">

              <h3>
                {vm.editingVenue
                  ? "Edit Meeting Venue"
                  : "Add New Meeting Venue"}
              </h3>

              <button
                type="button"
                onClick={vm.closeModal}
              >

                <X size={21} />

              </button>

            </div>

            <form onSubmit={vm.saveVenue}>

              <div className="meeting-modal-body">

                <label>Meeting Venue Name *</label>

                <input
                  type="text"
                  placeholder="Enter meeting venue name"
                  value={vm.venueName}
                  onChange={e => vm.setVenueName(e.target.value)}
                />

                <label>Extension Number *</label>

                <input
                  type="text"
                  inputMode="numeric"
                  placeholder="Enter extension number"
                  value={vm.extensionNumber}
                  onChange={e => vm.setExtensionNumber(e.target.value)}
                />

                <label>Sitting Capacity *</label>

                <input
                  type="number"
                  min="1"
                  placeholder="Enter sitting capacity"
                  value={vm.sittingCapacity}
                  onChange={e => vm.setSittingCapacity(e.target.value)}
                />

                {vm.error && (

                  <p className="meeting-error">
                    {vm.error}
                  </p>

                )}

              </div>

              <div className="meeting-modal-footer">

                <button
                  type="button"
                  className="meeting-cancel"
                  onClick={vm.closeModal}
                >

                  Cancel

                </button>

                <button
                  type="submit"
                  className="meeting-save"
                >

                  {vm.editingVenue ? "Update" : "Save"}

                </button>

              </div>

            </form>

          </div>

        </div>

      )}

    </div>

  );

};

export default MeetingVenueList;
