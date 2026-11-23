
import React from "react";
import { LayoutDashboard, CalendarClock, Users, FileText, ClipboardList,BarChart3, Ban, History,
  Bell, UserRound, ChevronLeft,ChevronRight,Clock3,TrendingUp,CircleSlash,Download,Mail,CalendarDays
} from "lucide-react";

import useDashboardViewModel from "./useDashboardViewModel";
import "./Dashboard.css";

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

const quickActionIcons = {
  approvals: Clock3,
  "peak-hours": TrendingUp,
  blacklisted: CircleSlash,
  export: Download
};

const Dashboard = () => {
  const {
    dashboardData,
    selectedLocation,
    language,
    notificationCount,
    message,
    handleLocationChange,
    handleLanguageChange,
    handleQuickAction,
    handleSidebarNavigation,
    handleViewAll,
    handleNotifications,
    handleProfile,
    handleLogout
  } = useDashboardViewModel();

  return (
    <div className="access-dashboard">

      {/* Sidebar */}
      <aside className="access-sidebar">
        <div className="sidebar-logo">
           <div className="access360-security">

            <img
              src="/logo.webp"
              alt="Access360 Security Logo"
              className="access360-main-logo"
            />

          </div>
          {/*<div className="logo-symbol">
            <svg viewBox="0 0 48 48" aria-hidden="true">
              <path
                d="M24 5 35 10V22C35 30 30 36 24 40 18 36 13 30 13 22V10Z"
                fill="none"
                stroke="currentColor"
                strokeWidth="2.8"
                strokeLinejoin="round"
              />
              <path
                d="M24 15 19 24H23L21 31 29 21H25L27 15Z"
                fill="currentColor"
              />
            </svg>
          </div> */}
        </div> 

        <nav className="sidebar-navigation">
          {sidebarItems.map((item) => {
            const Icon = item.icon;

            return (
              <button
                key={item.label}
                className={`sidebar-link ${
                  item.label === "Dashboard" ? "active" : ""
                }`}
                onClick={() => handleSidebarNavigation(item.path)}
              >
                <Icon size={20} strokeWidth={2.5} />
                <span>{item.label}</span>
              </button>
            );
          })}
        </nav>

        <div className="sidebar-bottom">
          <button onClick={handleLogout}>
            <History size={19} />
            <span>Logout</span>
          </button>
        </div>
      </aside>

      {/* Main area */}
      <div className="dashboard-main">

        {/* Header */}
        <header className="dashboard-header">
          <div className="company-details">
            <h1>{dashboardData.companyName}</h1>
            <span>{selectedLocation}</span>
          </div>

          <div className="header-right">
            <div className="welcome-text">
              {dashboardData.welcomeText}
            </div>

            <div className="header-actions">
              <button
                className="header-icon"
                title="Messages"
                onClick={() => handleSidebarNavigation("/messages")}
              >
                <Mail size={21} />
              </button>

              <button
                className="header-icon notification-button"
                title="Notifications"
                onClick={handleNotifications}
              >
                <Bell size={21} />
                <span className="notification-count">
                  {notificationCount}
                </span>
              </button>

              <button
                className="header-icon"
                title="Profile"
                onClick={handleProfile}
              >
                <UserRound size={21} />
              </button>
            </div>
          </div>
        </header>

        {/* Dashboard content */}
        <main className="dashboard-page-content">

          {/* Location and language */}
          <div className="dashboard-toolbar">
            <div className="location-selector">
              <button
                onClick={() => handleLocationChange("previous")}
                aria-label="Previous location"
              >
                <ChevronLeft size={21} />
              </button>

              <strong>{selectedLocation}</strong>

              <button
                onClick={() => handleLocationChange("next")}
                aria-label="Next location"
              >
                <ChevronRight size={21} />
              </button>
            </div>

            <div className="language-selector">
              <button
                className={language === "D" ? "selected" : ""}
                onClick={() => handleLanguageChange("D")}
              >
                D
              </button>

              <button
                className={language === "M" ? "selected" : ""}
                onClick={() => handleLanguageChange("M")}
              >
                M
              </button>
            </div>
          </div>

          {/* Statistics */}
          <section className="statistics-grid">
            {dashboardData.statistics.map((item) => (
              <div
                className={`stat-card stat-${item.type}`}
                key={item.id}
              >
                <span className="stat-decoration"></span>
                <h2>{item.value}</h2>
                <p>{item.title}</p>
              </div>
            ))}
          </section>

          {/* Main dashboard grid */}
          <section className="dashboard-grid">

            <div className="dashboard-left-column">

              {/* Approvals */}
              <div className="approvals-section">
                <div className="section-heading">
                  <h2>Approvals today</h2>

                  <button onClick={handleViewAll}>
                    View all ›
                  </button>
                </div>

                <div className="approvals-table-card">
                  <table className="approvals-table">
                    <thead>
                      <tr>
                        <th>#</th>
                        <th>VISITOR</th>
                        <th>HOST</th>
                        <th>DATE</th>
                        <th>FROM</th>
                        <th>STATUS</th>
                      </tr>
                    </thead>

                    <tbody>
                      {dashboardData.approvals.length > 0 ? (
                        dashboardData.approvals.map((approval, index) => (
                          <tr key={approval.id || index}>
                            <td>{index + 1}</td>
                            <td>{approval.visitor}</td>
                            <td>{approval.host}</td>
                            <td>{approval.date}</td>
                            <td>{approval.from}</td>
                            <td>{approval.status}</td>
                          </tr>
                        ))
                      ) : (
                        <tr>
                          <td colSpan="6" className="empty-approvals">
                            No approvals today
                          </td>
                        </tr>
                      )}
                    </tbody>
                  </table>
                </div>
              </div>

              {/* Visit purposes */}
              <div className="visit-purpose-card">
                <h2>Visit Purposes</h2>

                <div className="purpose-chart">
                  <div className="chart-total">
                    <strong>
                      {dashboardData.visitPurposes.reduce(
                        (total, item) => total + item.count,
                        0
                      )}
                    </strong>
                    <span>Total</span>
                  </div>

                  <div className="chart-dot"></div>
                </div>
              </div>

            </div>

            {/* Quick actions */}
            <aside className="quick-actions-card">
              <h2>Quick actions</h2>

              <div className="quick-action-list">
                {dashboardData.quickActions.map((item) => {
                  const Icon = quickActionIcons[item.action];

                  return (
                    <button
                      className="quick-action-row"
                      key={item.id}
                      onClick={() => handleQuickAction(item.action)}
                    >
                      <span className="quick-action-icon">
                        <Icon size={18} strokeWidth={2.8} />
                      </span>

                      <span className="quick-action-title">
                        {item.title}
                      </span>

                      <span
                        className={`quick-action-value action-${item.action}`}
                      >
                        {item.value}
                      </span>
                    </button>
                  );
                })}
              </div>

              <div className="gender-section">
                <h3>VISITOR GENDER SPLIT</h3>

                <div className="gender-chart">
                  <span className="gender-dot"></span>
                  <span>— 0 (0%)</span>
                </div>
              </div>
            </aside>

          </section>

          {message && (
            <div className="dashboard-message">
              {message}
              <button onClick={() => window.location.reload()}>
                ×
              </button>
            </div>
          )}

        </main>
      </div>
    </div>
  );
};

export default Dashboard;
