
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
  Building2,
  Grid3X3,
  User,
  Star,
  QrCode,
  Target,
  DoorOpen,
  Smartphone,
  RectangleHorizontal,
  Fence,
  Check,
  ChevronRight
} from "lucide-react";

import useMasterDataViewModel from "./useMasterDataViewModel";
import "./MasterData.css";

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

const cardIcons = {
  building: Building2,
  grid: Grid3X3,
  user: User,
  users: Users,
  star: Star,
  qr: QrCode,
  target: Target,
  door: DoorOpen,
  device: Smartphone,
  venue: RectangleHorizontal,
  gate: Fence,
  approval: Check
};

const MasterData = () => {
  const vm = useMasterDataViewModel();

  return (
    <div className="master-page">

      {/* LEFT SIDEBAR */}
      <aside className="master-sidebar">

        <div className="master-logo-area">
          <div className="access360-security">

            <img
              src="/logo.webp"
              alt="Access360 Security Logo"
              className="access360-main-logo"
            />

          </div>
        </div>

        <nav className="master-sidebar-nav">
          {sidebarItems.map(item => {
            const Icon = item.icon;

            return (
              <button
                key={item.label}
                className={`master-sidebar-link ${
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

      {/* MAIN SECTION */}
      <div className="master-main">

        {/* TOP HEADER */}
        <header className="master-header">

          <div className="master-company">
            <h1>Sentorixx global solution pvt ltd</h1>
            <span>Baner</span>
          </div>

          <div className="master-header-right">

            <span className="master-welcome">
              Welcome Sentorixx
            </span>

            <div className="master-header-icons">

              <button
                title="Messages"
                onClick={() => vm.navigateTo("/messages")}
              >
                <Mail size={21} />
              </button>

              <button title="Notifications">
                <Bell size={21} />
                <span className="master-notification-count">0</span>
              </button>

              <button title="Profile">
                <UserRound size={21} />
              </button>

            </div>
          </div>
        </header>

        {/* MASTER DATA CONTENT */}
        <main className="master-content">

          <div className="master-grid">

            {vm.masterDataItems.map(item => {
              const Icon = cardIcons[item.icon];

              return (
                <button
                  type="button"
                  key={item.id}
                  className="master-card"
                  onClick={() => vm.openMasterData(item)}
                >

                  <div className="master-card-top">

                    <div className={`master-card-icon ${item.color}`}>
                      <Icon size={23} strokeWidth={2.5} />
                    </div>

                    <ChevronRight
                      className="master-card-arrow"
                      size={20}
                      strokeWidth={2.5}
                    />

                  </div>

                  <div className="master-card-details">
                    <h3>{item.title}</h3>
                    <p>{item.description}</p>
                  </div>

                </button>
              );
            })}

          </div>

          {vm.masterDataItems.length === 0 && (
            <div className="master-no-results">
              No master data found.
            </div>
          )}

        </main>
      </div>
    </div>
  );
};

export default MasterData;
