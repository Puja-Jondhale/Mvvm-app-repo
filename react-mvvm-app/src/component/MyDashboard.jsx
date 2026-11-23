
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
  CalendarCheck,
  Footprints,
  UserCheck,
  LogOut,
  ChartNoAxesColumn,
  Menu
} from "lucide-react";

import useMyDashboardViewModel from "./useMyDashboardViewModel";
import "./MyDashboard.css";

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

const statisticIcons = {
  calendar: CalendarCheck,
  walking: Footprints,
  checkin: UserCheck,
  checkout: LogOut,
  overstay: Bell
};

const MyDashboard = () => {
  const vm = useMyDashboardViewModel();
  const data = vm.dashboardData;

  return (
    <div className="my-dashboard">

      {/* LEFT SIDEBAR */}
      <aside className="my-sidebar">

        <div className="access360-security">

            <img
              src="/logo.webp"
              alt="Access360 Security Logo"
              className="access360-main-logo"
            />

          </div>

        <nav className="my-sidebar-nav">
          {sidebarItems.map(item => {
            const Icon = item.icon;

            return (
              <button
                key={item.label}
                className={`my-sidebar-item ${
                  item.label === "My Dashboard" ? "active" : ""
                }`}
                onClick={() => vm.navigateTo(item.path)}
              >
                <Icon size={20} strokeWidth={2.5} />
                <span>{item.label}</span>
              </button>
            );
          })}
        </nav>

      </aside>

      {/* MAIN CONTENT */}
      <div className="my-main-content">

        {/* TOP HEADER */}
        <header className="my-header">
          <div className="my-company-info">
            <h1>{data.companyName}</h1>
            <span>{vm.selectedLocation}</span>
          </div>

          <div className="my-header-right">
            <span className="my-welcome">{data.welcomeText}</span>

            <div className="my-header-icons">
              <button onClick={vm.handleMessages} title="Messages">
                <Mail size={21} />
              </button>

              <button
                onClick={vm.handleNotifications}
                className="my-notification-icon"
                title="Notifications"
              >
                <Bell size={21} />
                <span>0</span>
              </button>

              <button onClick={vm.handleProfile} title="Profile">
                <UserRound size={21} />
              </button>
            </div>
          </div>
        </header>

        {/* PAGE BODY */}
        <main className="my-page-body">

          {/* STATISTICS */}
          <section className="my-statistics-grid">
            {data.statistics.map(item => {
              const Icon = statisticIcons[item.icon];

              return (
                <div
                  key={item.id}
                  className={`my-stat-card my-stat-${item.type}`}
                >
                  <div className="my-stat-icon">
                    <Icon size={19} />
                  </div>

                  <h2>{item.value}</h2>
                  <p>{item.title}</p>
                </div>
              );
            })}
          </section>

          {/* APPOINTMENTS */}
          <section className="my-appointments-grid">

            <div className="my-panel appointment-panel">
              <div className="my-panel-heading">
                <h2>External appointments</h2>

                <button onClick={vm.handleExternalAppointments}>
                  View all ›
                </button>
              </div>

              {data.externalAppointments.length > 0 ? (
                <div className="my-appointment-list">
                  {data.externalAppointments.map(item => (
                    <div key={item.id} className="my-appointment-item">
                      <strong>{item.visitor}</strong>
                      <span>{item.date}</span>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="my-empty-state">
                  No external appointments
                </div>
              )}
            </div>

            <div className="my-panel appointment-panel">
              <div className="my-panel-heading">
                <h2>Internal appointments</h2>

                <button onClick={vm.handleScheduleMeeting}>
                  View all ›
                </button>
              </div>

              {data.internalAppointments.length > 0 ? (
                <div className="my-appointment-list">
                  {data.internalAppointments.map(item => (
                    <div key={item.id} className="my-appointment-item">
                      <strong>{item.title}</strong>
                      <span>{item.date}</span>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="my-empty-state internal-empty">
                  <span>No internal meetings today</span>

                  <button onClick={vm.handleScheduleMeeting}>
                    Schedule one
                  </button>
                </div>
              )}
            </div>

          </section>

          {/* ACTION / FEEDBACK / NOTIFICATIONS */}
          <section className="my-information-grid">

            <div className="my-panel information-panel">
              <h2>Action needed</h2>

              {data.actionNeeded.length > 0 ? (
                <div className="my-simple-list">
                  {data.actionNeeded.map(item => (
                    <p key={item.id}>{item.title}</p>
                  ))}
                </div>
              ) : (
                <div className="my-empty-state">
                  No action needed
                </div>
              )}
            </div>

            <div className="my-panel information-panel feedback-panel">
              <h2>Recent feedback</h2>

              <div className="feedback-list">
                {data.feedback.map(item => (
                  <div className="feedback-row" key={item.id}>
                    <span>{item.name}</span>

                    <div className="feedback-stars" aria-label={`${item.rating} out of 5 stars`}>
                      <span>{"★".repeat(item.rating)}</span>
                      <span className="empty-stars">
                        {"★".repeat(5 - item.rating)}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="my-panel information-panel">
              <h2>Notifications</h2>

              {data.notifications.length > 0 ? (
                <div className="my-simple-list">
                  {data.notifications.map(item => (
                    <p key={item.id}>{item.title}</p>
                  ))}
                </div>
              ) : (
                <div className="my-empty-state">
                  No new notifications
                </div>
              )}
            </div>

          </section>

          {/* CHARTS */}
          <section className="my-charts-grid">

            <div className="my-panel chart-panel">
              <h2>Meeting Types Insights</h2>

              <div className="meeting-chart-area">
                <div className="meeting-chart-placeholder">
                  <span className="meeting-chart-line"></span>
                </div>

                <div className="meeting-legend">
                  {vm.meetingPercentages.map(item => (
                    <div key={item.name}>
                      <span
                        className="legend-dot"
                        style={{ background: item.color }}
                      ></span>
                      <span>
                        {item.percentage}% {item.name}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            <div className="my-panel chart-panel reasons-panel">
              <h2>Reasons for Visits</h2>

              <div className="reasons-chart">
                <div className="reason-axis">
                  <span>1</span>
                  <span>0</span>
                </div>

                <div className="reason-chart-content">
                  <div className="reason-grid-line top-line"></div>
                  <div className="reason-grid-line bottom-line"></div>

                  {data.reasonsForVisits.map(item => (
                    <div
                      className="reason-bar-column"
                      key={item.name}
                      title={`${item.name}: ${item.value}`}
                    >
                      <div
                        className="reason-bar"
                        style={{
                          height: `${(item.value / vm.reasonMaximum) * 100}%`
                        }}
                      ></div>
                      <span>{item.name}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

          </section>

          {/* APPROVAL INSIGHTS */}
          <section className="my-panel approval-insights">
            <div className="approval-insights-heading">
              <h2>Approvals Insights</h2>

              <button
                className={`approval-toggle ${
                  vm.approvalEnabled ? "enabled" : ""
                }`}
                onClick={vm.handleApprovalToggle}
                aria-label="Toggle approval insights"
              >
                <span></span>
              </button>
            </div>

            <div className="approval-status-dots">
              <span className="orange-dot"></span>
              <span className="green-dot"></span>
              <span className="red-dot"></span>
            </div>

            <div className="approval-table-wrapper">
              <table className="my-approval-table">
                <thead>
                  <tr>
                    <th>VISITOR NAME</th>
                    <th>HOST NAME</th>
                    <th>DATE</th>
                    <th>STATUS</th>
                  </tr>
                </thead>

                <tbody>
                  {data.approvals.length > 0 ? (
                    data.approvals.map((item, index) => (
                      <tr key={item.id || index}>
                        <td>{item.visitor}</td>
                        <td>{item.host}</td>
                        <td>{item.date}</td>
                        <td>{item.status}</td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td colSpan="4" className="my-empty-approval-row">
                        {vm.approvalEnabled
                          ? "No approval records available"
                          : ""}
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </section>

        </main>
      </div>

      {vm.message && (
        <div className="my-dashboard-toast">
          {vm.message}
          <button onClick={vm.closeMessage}>×</button>
        </div>
      )}

    </div>
  );
};

export default MyDashboard;
