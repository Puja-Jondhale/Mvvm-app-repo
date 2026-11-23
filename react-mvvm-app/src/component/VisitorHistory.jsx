
import React from "react";
import {
  LayoutDashboard,
  CalendarClock,
  CalendarDays,
  Users,
  FileText,
  ClipboardList,
  UserRound,
  Bell,
  Mail,
  History,
  Ban
} from "lucide-react";

import useVisitorHistoryViewModel from "./useVisitorHistoryViewModel";
import "./VisitorHistory.css";

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

const VisitorHistory = () => {
  const vm = useVisitorHistoryViewModel();

  return (
    <div className="vh-page">

      {/* SIDEBAR */}
      <aside className="vh-sidebar">

        <div className="vh-logo-area">
          <div className="access360-security">

            <img
              src="/logo.webp"
              alt="Access360 Security Logo"
              className="access360-main-logo"
            />

          </div>
        </div>

        <nav className="vh-sidebar-nav">
          {sidebarItems.map(item => {
            const Icon = item.icon;

            return (
              <button
                key={item.label}
                type="button"
                className={`vh-sidebar-link ${
                  item.label === "Visitor History" ? "active" : ""
                }`}
                onClick={() => window.location.hash = `#${item.path}`}
              >
                <Icon size={20} />
                <span>{item.label}</span>
              </button>
            );
          })}
        </nav>
      </aside>

      {/* MAIN */}
      <div className="vh-main">

        {/* HEADER */}
        <header className="vh-header">

          <div className="vh-company">
            <h1>Sentorixx global solution pvt ltd</h1>
            <span>Baner</span>
          </div>

          <div className="vh-header-right">
            <span className="vh-welcome">
              Welcome Sentorixx
            </span>

            <div className="vh-header-icons">
              <button type="button" title="Messages">
                <Mail size={21} />
              </button>

              <button type="button" title="Notifications">
                <Bell size={21} />
                <span className="vh-notification-count">0</span>
              </button>

              <button type="button" title="Profile">
                <UserRound size={21} />
              </button>
            </div>
          </div>
        </header>

        {/* CONTENT */}
        <main className="vh-content">

          <section className="vh-card">

            {/* GREEN TITLE */}
            <div className="vh-title-bar">
              <h2>Visitor History</h2>
            </div>

            {/* FORM */}
            <form
              className="vh-form"
              onSubmit={vm.handleCheckDetails}
            >

              <div className="vh-fields-grid">

                {/* VISITED DATE */}
                <div className="vh-field">
                  <label htmlFor="visitedDate">
                    Visited Date
                  </label>

                  <input
                    id="visitedDate"
                    type="date"
                    value={vm.form.visitedDate}
                    onChange={event =>
                      vm.handleChange("visitedDate", event.target.value)
                    }
                    className={vm.errors.visitedDate ? "vh-invalid" : ""}
                  />

                  {vm.errors.visitedDate && (
                    <span className="vh-error">
                      {vm.errors.visitedDate}
                    </span>
                  )}
                </div>

                {/* CONTACT NUMBER */}
                <div className="vh-field">
                  <label htmlFor="contactNo">
                    Contact No.
                  </label>

                  <input
                    id="contactNo"
                    type="tel"
                    maxLength="10"
                    value={vm.form.contactNo}
                    onChange={event =>
                      vm.handleChange(
                        "contactNo",
                        event.target.value.replace(/\D/g, "")
                      )
                    }
                    className={vm.errors.contactNo ? "vh-invalid" : ""}
                  />

                  {vm.errors.contactNo && (
                    <span className="vh-error">
                      {vm.errors.contactNo}
                    </span>
                  )}
                </div>

                {/* VISITOR LIST */}
                <div className="vh-field">
                  <label htmlFor="visitorId">
                    Visitor List
                  </label>

                  <select
                    id="visitorId"
                    value={vm.form.visitorId}
                    onChange={event =>
                      vm.handleChange("visitorId", event.target.value)
                    }
                    className={vm.errors.visitorId ? "vh-invalid" : ""}
                  >
                    <option value="">-- Select --</option>

                    {vm.visitorList.map(visitor => (
                      <option key={visitor.id} value={visitor.id}>
                        {visitor.name}
                      </option>
                    ))}
                  </select>

                  {vm.errors.visitorId && (
                    <span className="vh-error">
                      {vm.errors.visitorId}
                    </span>
                  )}
                </div>

              </div>

              {/* BUTTON */}
              <div className="vh-form-actions">
                <button type="submit" className="vh-submit-button">
                  Check Details
                </button>
              </div>

            </form>

            {/* RESULT */}
            {vm.submitted && (
              <div className="vh-result">

                <h3>Visitor History Details</h3>

                {vm.history.length > 0 ? (
                  <div className="vh-result-table-wrapper">
                    <table className="vh-result-table">
                      <thead>
                        <tr>
                          <th>SR.NO</th>
                          <th>VISITOR NAME</th>
                          <th>VISITED DATE</th>
                          <th>CONTACT NO.</th>
                        </tr>
                      </thead>

                      <tbody>
                        {vm.history.map((item, index) => (
                          <tr key={item.id}>
                            <td>{index + 1}</td>
                            <td>{item.visitorName}</td>
                            <td>{item.visitedDate}</td>
                            <td>{item.contactNo || "—"}</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                ) : (
                  <p>No visitor history found.</p>
                )}

                <button
                  type="button"
                  className="vh-reset-button"
                  onClick={vm.handleReset}
                >
                  Clear
                </button>

              </div>
            )}

          </section>
        </main>
      </div>
    </div>
  );
};

export default VisitorHistory;
