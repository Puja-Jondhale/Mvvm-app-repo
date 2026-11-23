
import React from "react";
import { LayoutDashboard, CalendarClock, CalendarDays, Users, FileText, ClipboardList, Ban, History,
   Bell,UserRound,Mail,Search,Download,ArrowLeft,UserRoundX} from "lucide-react";

import useBlacklistedVisitorViewModel from "./useBlacklistedVisitorViewModel";
import "./BlacklistedVisitors.css";

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

const BlacklistedVisitors = () => {
  const vm = useBlacklistedVisitorViewModel();

  return (
    <div className="blacklist-page">

      {/* SIDEBAR */}
      <aside className="blacklist-sidebar">

        <div className="blacklist-logo-area">
          <div className="access360-security">

            <img
              src="/logo.webp"
              alt="Access360 Security Logo"
              className="access360-main-logo"
            />

          </div>
        </div>

        <nav className="blacklist-sidebar-nav">
          {sidebarItems.map(item => {
            const Icon = item.icon;

            return (
              <button
                type="button"
                key={item.label}
                className={`blacklist-sidebar-link ${
                  item.label === "Blacklisted Visitors" ? "active" : ""
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

      {/* MAIN AREA */}
      <div className="blacklist-main">

        {/* HEADER */}
        <header className="blacklist-header">

          <div className="blacklist-company">
            <h1>Sentorixx global solution pvt ltd</h1>
            <span>Baner</span>
          </div>

          <div className="blacklist-header-right">

            <span className="blacklist-welcome">
              Welcome Sentorixx
            </span>

            <div className="blacklist-header-icons">

              <button
                type="button"
                title="Messages"
                onClick={() => vm.navigateTo("/messages")}
              >
                <Mail size={21} />
              </button>

              <button type="button" title="Notifications">
                <Bell size={21} />
                <span className="blacklist-notification-count">0</span>
              </button>

              <button type="button" title="Profile">
                <UserRound size={21} />
              </button>

            </div>
          </div>
        </header>

        {/* CONTENT */}
        <main className="blacklist-content">

          <section className="blacklist-card">

            {/* TITLE AND ACTIONS */}
            <div className="blacklist-toolbar">

              <h2>Blacklisted Visitor</h2>

              <div className="blacklist-toolbar-actions">

                <div className="blacklist-search">
                  <Search size={19} />

                  <input
                    type="text"
                    placeholder="Search..."
                    value={vm.searchText}
                    onChange={event =>
                      vm.handleSearch(event.target.value)
                    }
                    aria-label="Search blacklisted visitors"
                  />
                </div>

                <button
                  type="button"
                  className="blacklist-icon-button"
                  title="Export visitors to CSV"
                  onClick={vm.handleExport}
                >
                  <Download size={15} />
                </button>

                <button
                  type="button"
                  className="blacklist-icon-button"
                  title="Back to dashboard"
                  onClick={() => vm.navigateTo("/dashboard")}
                >
                  <ArrowLeft size={15} />
                </button>

              </div>
            </div>

            {/* TABLE */}
            <div className="blacklist-table-wrapper">
              <table className="blacklist-table">

                <thead>
                  <tr>
                    <th>SR.NO</th>
                    <th>VISITOR NAME</th>
                    <th>VISITOR FIRM</th>
                    <th>VISITOR CONTACT</th>
                    <th>VISITED DATE</th>
                    <th>WHITELIST</th>
                  </tr>
                </thead>

                <tbody>
                  {vm.visitors.length > 0 ? (
                    vm.visitors.map((visitor, index) => (
                      <tr key={visitor.id}>
                        <td>{index + 1}</td>
                        <td className="blacklist-visitor-name">
                          {visitor.name}
                        </td>
                        <td>{visitor.firm}</td>
                        <td>{visitor.contact}</td>
                        <td>{visitor.visitedDate}</td>
                        <td>
                          <button
                            type="button"
                            className={`blacklist-whitelist-button ${
                              visitor.whitelisted ? "whitelisted" : ""
                            }`}
                            onClick={() => vm.handleWhitelist(visitor.id)}
                            title={
                              visitor.whitelisted
                                ? "Remove from whitelist"
                                : "Add to whitelist"
                            }
                          >
                            {visitor.whitelisted ? "Whitelisted" : "Whitelist"}
                          </button>
                        </td>
                      </tr>
                    ))
                  ) : (
                    vm.searchText ? (
                      <tr>
                        <td colSpan="6" className="blacklist-empty">
                          No matching visitors found
                        </td>
                      </tr>
                    ) : null
                  )}
                </tbody>

              </table>
            </div>

          </section>
        </main>
      </div>
    </div>
  );
};

export default BlacklistedVisitors;
