
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
  X,
  CheckSquare
} from "lucide-react";

import useReportViewModel from "./useReportViewModel";
import "./Reports.css";

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

const Reports = () => {
  const vm = useReportViewModel();

  return (
    <div className="reports-page">

      {/* SIDEBAR */}
      <aside className="reports-sidebar">

        <div className="reports-logo-area">
          <div className="access360-security">

            <img
              src="/logo.webp"
              alt="Access360 Security Logo"
              className="access360-main-logo"
            />

          </div>
        </div>

        <nav className="reports-sidebar-nav">
          {sidebarItems.map(item => {
            const Icon = item.icon;

            return (
              <button
                type="button"
                key={item.label}
                className={`reports-sidebar-link ${
                  item.label === "Reports" ? "active" : ""
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
      <div className="reports-main">

        {/* HEADER */}
        <header className="reports-header">

          <div className="reports-company">
            <h1>Sentorixx global solution pvt ltd</h1>
            <span>Baner</span>
          </div>

          <div className="reports-header-right">

            <span className="reports-welcome">
              Welcome Sentorixx
            </span>

            <div className="reports-header-icons">

              <button
                type="button"
                title="Messages"
                onClick={() => vm.navigateTo("/messages")}
              >
                <Mail size={21} />
              </button>

              <button type="button" title="Notifications">
                <Bell size={21} />
                <span className="reports-notification-count">0</span>
              </button>

              <button type="button" title="Profile">
                <UserRound size={21} />
              </button>

            </div>
          </div>
        </header>

        {/* PAGE BODY */}
        <main className="reports-content">

          <section className="reports-card">

            {/* GREEN TITLE BAR */}
            <div className="reports-title-bar">

              <button
                type="button"
                className="reports-back-button"
                title="Back"
                onClick={() => vm.navigateTo("/dashboard")}
              >
                <ArrowLeft size={15} />
              </button>

              <h2>Reports</h2>
            </div>

            {/* FORM */}
            <form
              className="reports-form"
              onSubmit={vm.handleSubmit}
              noValidate
            >

              <div className="reports-fields-grid">

                {/* SELECT REPORT */}
                <div className="reports-field">
                  <label htmlFor="reportType">
                    Select Report <span>*</span>
                  </label>

                  <select
                    id="reportType"
                    value={vm.formData.reportType}
                    onChange={event =>
                      vm.handleChange("reportType", event.target.value)
                    }
                    className={vm.errors.reportType ? "invalid" : ""}
                  >
                    <option value="">-- Select --</option>

                    {vm.reportTypes.map(item => (
                      <option key={item.value} value={item.value}>
                        {item.label}
                      </option>
                    ))}
                  </select>

                  {vm.errors.reportType && (
                    <small className="reports-error">
                      {vm.errors.reportType}
                    </small>
                  )}
                </div>

                {/* SELECT BRANCH */}
                <div className="reports-field">
                  <label htmlFor="branch">
                    Select Branch <span>*</span>
                  </label>

                  <select
                    id="branch"
                    value={vm.formData.branch}
                    onChange={event =>
                      vm.handleChange("branch", event.target.value)
                    }
                    className={vm.errors.branch ? "invalid" : ""}
                  >
                    <option value="">Select</option>

                    {vm.branches.map(item => (
                      <option key={item.value} value={item.value}>
                        {item.label}
                      </option>
                    ))}
                  </select>

                  {vm.errors.branch && (
                    <small className="reports-error">
                      {vm.errors.branch}
                    </small>
                  )}
                </div>

                {/* START DATE */}
                <div className="reports-field">
                  <label htmlFor="startDate">
                    Start Date <span>*</span>
                  </label>

                  <input
                    id="startDate"
                    type="date"
                    value={vm.formData.startDate}
                    onChange={event =>
                      vm.handleChange("startDate", event.target.value)
                    }
                    className={vm.errors.startDate ? "invalid" : ""}
                  />

                  {vm.errors.startDate && (
                    <small className="reports-error">
                      {vm.errors.startDate}
                    </small>
                  )}
                </div>

                {/* END DATE */}
                <div className="reports-field">
                  <label htmlFor="endDate">
                    End Date <span>*</span>
                  </label>

                  <input
                    id="endDate"
                    type="date"
                    value={vm.formData.endDate}
                    min={vm.formData.startDate || undefined}
                    onChange={event =>
                      vm.handleChange("endDate", event.target.value)
                    }
                    className={vm.errors.endDate ? "invalid" : ""}
                  />

                  {vm.errors.endDate && (
                    <small className="reports-error">
                      {vm.errors.endDate}
                    </small>
                  )}
                </div>

                {/* VISITOR TYPE */}
                <div className="reports-field">
                  <label htmlFor="visitorType">
                    Select Visitor Type <span>*</span>
                  </label>

                  <select
                    id="visitorType"
                    value={vm.formData.visitorType}
                    onChange={event =>
                      vm.handleChange("visitorType", event.target.value)
                    }
                    className={vm.errors.visitorType ? "invalid" : ""}
                  >
                    <option value="">Select</option>

                    {vm.visitorTypes.map(item => (
                      <option key={item.value} value={item.value}>
                        {item.label}
                      </option>
                    ))}
                  </select>

                  {vm.errors.visitorType && (
                    <small className="reports-error">
                      {vm.errors.visitorType}
                    </small>
                  )}
                </div>

                {/* DEPARTMENT */}
                <div className="reports-field">
                  <label htmlFor="department">
                    Select Department <span>*</span>
                  </label>

                  <select
                    id="department"
                    value={vm.formData.department}
                    onChange={event =>
                      vm.handleChange("department", event.target.value)
                    }
                    className={vm.errors.department ? "invalid" : ""}
                  >
                    <option value="">Select</option>

                    {vm.departments.map(item => (
                      <option key={item.value} value={item.value}>
                        {item.label}
                      </option>
                    ))}
                  </select>

                  {vm.errors.department && (
                    <small className="reports-error">
                      {vm.errors.department}
                    </small>
                  )}
                </div>

              </div>

              {/* BUTTONS */}
              <div className="reports-form-actions">

                <button
                  type="button"
                  className="reports-cancel-button"
                  onClick={vm.handleCancel}
                >
                  <X size={15} />
                  Cancel
                </button>

                <button
                  type="submit"
                  className="reports-submit-button"
                  disabled={vm.isLoading}
                >
                  <CheckSquare size={15} />
                  {vm.isLoading ? "Submitting..." : "Submit"}
                </button>

              </div>

              {/* STATUS MESSAGE */}
              {vm.message && (
                <div className="reports-message" role="status">
                  {vm.message}
                  <button
                    type="button"
                    onClick={vm.closeMessage}
                    aria-label="Close message"
                  >
                    ×
                  </button>
                </div>
              )}

            </form>
          </section>
        </main>
      </div>
    </div>
  );
};

export default Reports;
