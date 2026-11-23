
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
  Search,
  Plus,
  Pencil,
  Trash2,
  X
} from "lucide-react";

import usePlanMeetingViewModel from "./usePlanMeetingViewModel";
import planMeetingModel from "./planMeetingModel";
import "./PlanInternalMeeting.css";

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

const PlanInternalMeeting = () => {
  const vm = usePlanMeetingViewModel();

  return (
    <div className="plan-meeting-page">

      {/* SIDEBAR */}
      <aside className="plan-sidebar">
        <div className="plan-logo-area">
          <div className="access360-security">

            <img
              src="/logo.webp"
              alt="Access360 Security Logo"
              className="access360-main-logo"
            />

          </div>
        </div>

        <nav className="plan-sidebar-nav">
          {sidebarItems.map(item => {
            const Icon = item.icon;

            return (
              <button
                key={item.label}
                className={`plan-sidebar-link ${
                  item.label === "Plan Internal Meeting" ? "active" : ""
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
      <div className="plan-main">

        {/* HEADER */}
        <header className="plan-header">
          <div className="plan-company">
            <h1>Sentorixx global solution pvt ltd</h1>
            <span>Baner</span>
          </div>

          <div className="plan-header-right">
            <span className="plan-welcome">Welcome Sentorixx</span>

            <div className="plan-header-icons">
              <button
                title="Messages"
                onClick={() => vm.navigateTo("/messages")}
              >
                <Mail size={21} />
              </button>

              <button title="Notifications">
                <Bell size={21} />
                <span className="plan-notification-count">0</span>
              </button>

              <button title="Profile">
                <UserRound size={21} />
              </button>
            </div>
          </div>
        </header>

        {/* PAGE CONTENT */}
        <main className="plan-content">

          <section className="plan-meeting-card">

            {/* TITLE AND ACTIONS */}
            <div className="plan-toolbar">
              <h2>Planned Internal Meetings</h2>

              <div className="plan-toolbar-actions">
                <div className="plan-search">
                  <Search size={19} />
                  <input
                    type="text"
                    placeholder="Search meetings..."
                    value={vm.searchText}
                    onChange={event =>
                      vm.handleSearch(event.target.value)
                    }
                  />
                </div>

                <button
                  className="plan-add-button"
                  onClick={vm.openAddModal}
                >
                  <Plus size={19} />
                  Add New
                </button>
              </div>
            </div>

            {/* MEETINGS TABLE */}
            <div className="plan-table-scroll">
              <table className="plan-table">
                <thead>
                  <tr>
                    <th>SR.NO</th>
                    <th>MEETING TITLE</th>
                    <th>MEETING DATE</th>
                    <th>FROM TIME</th>
                    <th>TO TIME</th>
                    <th>EDIT</th>
                    <th>DELETE</th>
                  </tr>
                </thead>

                <tbody>
                  {vm.meetings.length > 0 ? (
                    vm.meetings.map((meeting, index) => (
                      <tr key={meeting.id}>
                        <td className="plan-serial">
                          {index + 1}
                        </td>

                        <td className="plan-title-cell">
                          {meeting.title}
                        </td>

                        <td>
                          <span className="plan-date-badge">
                            {planMeetingModel.formatDate(meeting.date)}
                          </span>
                        </td>

                        <td className="plan-time-cell">
                          {meeting.fromTime}
                        </td>

                        <td className="plan-time-cell">
                          {meeting.toTime}
                        </td>

                        <td className="plan-action-cell">
                          <button
                            className="plan-edit-button"
                            title="Edit meeting"
                            onClick={() => vm.openEditModal(meeting)}
                          >
                            <Pencil size={19} fill="currentColor" />
                          </button>
                        </td>

                        <td className="plan-action-cell">
                          <button
                            className="plan-delete-button"
                            title="Delete meeting"
                            onClick={() => vm.deleteMeeting(meeting)}
                          >
                            <Trash2 size={18} fill="currentColor" />
                          </button>
                        </td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td colSpan="7" className="plan-empty-row">
                        No meetings found
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
      {vm.modalOpen && (
        <div
          className="plan-modal-overlay"
          onClick={vm.closeModal}
        >
          <div
            className="plan-modal"
            onClick={event => event.stopPropagation()}
          >
            <div className="plan-modal-header">
              <h2>
                {vm.editingMeeting
                  ? "Edit Internal Meeting"
                  : "Add Internal Meeting"}
              </h2>

              <button onClick={vm.closeModal}>
                <X size={21} />
              </button>
            </div>

            <form
              className="plan-meeting-form"
              onSubmit={vm.saveMeeting}
            >
              <label>
                Meeting Title *
                <input
                  type="text"
                  value={vm.formData.title}
                  onChange={event =>
                    vm.handleFormChange("title", event.target.value)
                  }
                  placeholder="Enter meeting title"
                  required
                />
              </label>

              <label>
                Meeting Date *
                <input
                  type="date"
                  value={vm.formData.date}
                  onChange={event =>
                    vm.handleFormChange("date", event.target.value)
                  }
                  required
                />
              </label>

              <label>
                From Time *
                <input
                  type="time"
                  value={vm.formData.fromTime}
                  onChange={event =>
                    vm.handleFormChange(
                      "fromTime",
                      event.target.value
                    )
                  }
                  required
                />
              </label>

              <label>
                To Time *
                <input
                  type="time"
                  value={vm.formData.toTime}
                  onChange={event =>
                    vm.handleFormChange("toTime", event.target.value)
                  }
                  required
                />
              </label>

              <div className="plan-form-actions">
                <button
                  type="button"
                  className="plan-cancel-button"
                  onClick={vm.closeModal}
                >
                  Cancel
                </button>

                <button
                  type="submit"
                  className="plan-save-button"
                >
                  {vm.editingMeeting ? "Update Meeting" : "Save Meeting"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* MESSAGE */}
      {vm.message && (
        <div className="plan-toast">
          {vm.message}
          <button onClick={vm.closeMessage}>×</button>
        </div>
      )}
    </div>
  );
};

export default PlanInternalMeeting;
