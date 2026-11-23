
import React from "react";
import { QRCodeSVG } from "qrcode.react";

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
  ArrowRight
} from "lucide-react";

import useCompanyDetailsViewModel from "./useCompanyDetailsViewModel";
import "./CompanyDetails.css";

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

const CompanyDetails = () => {
  const vm = useCompanyDetailsViewModel();

  return (
    <div className="company-page">

      {/* SIDEBAR */}
      <aside className="company-sidebar">

        <div className="company-logo-area">
          <div className="access360-security">

            <img
              src="/logo.webp"
              alt="Access360 Security Logo"
              className="access360-main-logo"
            />

          </div>
        </div>

        <nav className="company-sidebar-nav">
          {sidebarItems.map((item) => {
            const Icon = item.icon;

            return (
              <button
                key={item.label}
                className={`company-sidebar-link ${
                  item.label === "Master Data" ? "active" : ""
                }`}
                onClick={() => {
                  window.location.hash = item.path;
                }}
              >
                <Icon size={20} />
                <span>{item.label}</span>
              </button>
            );
          })}
        </nav>

      </aside>

      {/* MAIN CONTENT */}
      <div className="company-main">

        {/* HEADER */}
        <header className="company-header">

          <div className="company-header-title">
            <h1>Sentorixx global solution pvt ltd</h1>
            <span>Baner</span>
          </div>

          <div className="company-header-right">

            <span className="company-welcome">
              Welcome Sentorixx
            </span>

            <div className="company-header-icons">

              <button title="Messages">
                <Mail size={21} />
              </button>

              <button title="Notifications">
                <Bell size={21} />
                <span className="company-notification-count">0</span>
              </button>

              <button title="Profile">
                <UserRound size={21} />
              </button>

            </div>

          </div>

        </header>

        {/* COMPANY DETAILS */}
        <main className="company-content">

          <div className="company-details-card">

            {/* GREEN TITLE BAR */}
            <div className="company-title-bar">

              <button
                className="company-back-button"
                onClick={vm.goBack}
                title="Back to Master Data"
              >
                <ArrowLeft size={17} />
              </button>

              <h2>Company Details</h2>

            </div>

            {/* BODY */}
            <div className="company-details-body">

              {/* LEFT INFORMATION */}
              <section className="company-information">

                <h3 className="company-section-title">
                  Information
                </h3>

                <div className="company-info-grid">

                  {vm.information.map((item, index) => (
                    <div
                      className="company-info-item"
                      key={index}
                    >
                      <label>{item.label}</label>
                      <p>{item.value}</p>
                    </div>
                  ))}

                </div>

              </section>

              {/* RIGHT QR CODE */}
              <section className="company-qr-section">

                <h3>COMPANY QR CODE</h3>

                <div className="company-qr-box">
                  <QRCodeSVG
                    value={vm.company.qrValue}
                    size={130}
                    level="H"
                    includeMargin
                  />
                </div>

              </section>

            </div>

            {/* BOTTOM FOOTER */}
            <div className="company-details-footer">

              <button
                className="company-next-button"
                onClick={vm.goNext}
              >
                Next
                <ArrowRight size={17} />
              </button>

            </div>

          </div>

        </main>

      </div>

    </div>
  );
};

export default CompanyDetails;
