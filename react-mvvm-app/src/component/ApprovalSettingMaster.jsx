
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
  Shield,
  X,
  Save,
  ChevronRight
} from "lucide-react";

import useApprovalSettingViewModel
  from "./useApprovalSettingViewModel";

import "./ApprovalSettingMaster.css";

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

const YesNoButtons = ({ value, onChange }) => (

  <div className="approval-yes-no">

    <button
      type="button"
      className={value ? "selected" : ""}
      onClick={() => onChange(true)}
    >
      Yes
    </button>

    <button
      type="button"
      className={!value ? "selected" : ""}
      onClick={() => onChange(false)}
    >
      No
    </button>

  </div>

);

const ApprovalSettingMaster = () => {

  const vm = useApprovalSettingViewModel();

  return (

    <div className="approval-page">

      {/* SIDEBAR */}

      <aside className="approval-sidebar">

        <div className="approval-logo-area">

          <div className="access360-security">

            <img
              src="/logo.webp"
              alt="Access360 Security Logo"
              className="access360-main-logo"
            />

          </div>

        </div>

        <nav className="approval-sidebar-nav">

          {sidebarItems.map(item => {

            const Icon = item.icon;

            return (

              <button
                type="button"
                key={item.label}
                className={`approval-sidebar-link ${
                  item.label === "Master Data" ? "active" : ""
                }`}
              >

                <Icon size={20} />

                <span>{item.label}</span>

              </button>

            );

          })}

        </nav>

      </aside>

      {/* MAIN AREA */}

      <div className="approval-main">

        {/* HEADER */}

        <header className="approval-header">

          <div className="approval-company">

            <h1>
              Sentorixx global solution pvt ltd
            </h1>

            <span>Baner</span>

          </div>

          <div className="approval-header-right">

            <span className="approval-welcome">
              Welcome Sentorixx
            </span>

            <div className="approval-header-icons">

              <button type="button" title="Messages">
                <Mail size={21} />
              </button>

              <button type="button" title="Notifications">

                <Bell size={21} />

                <span className="approval-notification">0</span>

              </button>

              <button type="button" title="Profile">
                <UserRound size={21} />
              </button>

            </div>

          </div>

        </header>

        {/* CONTENT */}

        <main className="approval-content">

          <section className="approval-card">

            {/* GREEN TITLE HEADER */}

            <div className="approval-card-header">

              <button
                type="button"
                className="approval-back"
                onClick={vm.handleBack}
                title="Back"
              >

                <ArrowLeft size={13} />

              </button>

              <div className="approval-heading-text">

                <h2>Approval Setting Master</h2>

                <p>
                  Configure your visitor approval workflows
                </p>

              </div>

              <div className="approval-shield">

                <Shield size={19} />

              </div>

            </div>

            {/* SETTINGS BODY */}

            <div className="approval-body">

              {/* SCHEDULED VISITORS */}

              <div className="approval-setting-box">

                <div className="approval-question-row">

                  <h3>
                    Do You require approval process for
                    Scheduled Visitors? <span>*</span>
                  </h3>

                  <YesNoButtons
                    value={vm.settings.scheduledApproval}
                    onChange={vm.handleScheduledApproval}
                  />

                </div>

                {/* APPROVAL TYPE */}

                {vm.settings.scheduledApproval && (

                  <div className="approval-radio-options">

                    <label className="approval-radio-label">

                      <input
                        type="radio"
                        name="scheduledApprovalType"
                        value="employee"
                        checked={
                          vm.settings.approvalType === "employee"
                        }
                        onChange={() =>
                          vm.handleApprovalType("employee")
                        }
                      />

                      <span>
                        Employee Specific Approval
                      </span>

                    </label>

                    <label className="approval-radio-label">

                      <input
                        type="radio"
                        name="scheduledApprovalType"
                        value="category"
                        checked={
                          vm.settings.approvalType === "category"
                        }
                        onChange={() =>
                          vm.handleApprovalType("category")
                        }
                      />

                      <span>
                        Visitor Category Specific Approval
                      </span>

                    </label>

                  </div>

                )}

              </div>

              {/* WALK-IN VISITORS */}

              <div className="approval-setting-box">

                <div className="approval-question-row">

                  <h3>
                    Will you be accepting walk-in visitors?
                    <span> *</span>
                  </h3>

                  <YesNoButtons
                    value={vm.settings.walkInVisitors}
                    onChange={vm.handleWalkInVisitors}
                  />

                </div>

              </div>

              {/* WALK-IN APPROVAL */}

              <div className="approval-setting-box">

                <div className="approval-question-row">

                  <h3>
                    Do You require approval process for
                    Walk-in Visitors?
                  </h3>

                  <YesNoButtons
                    value={vm.settings.walkInApproval}
                    onChange={vm.handleWalkInApproval}
                  />

                </div>

              </div>

              {/* STATUS MESSAGE */}

              {vm.message && (

                <div className="approval-success-message">
                  {vm.message}
                </div>

              )}

            </div>

            {/* FOOTER BUTTONS */}

            <div className="approval-footer">

              <button
                type="button"
                className="approval-cancel-button"
                onClick={vm.handleCancel}
              >

                <X size={15} />

                Cancel

              </button>

              <button
                type="button"
                className="approval-update-button"
                onClick={vm.handleUpdate}
              >

                <Save size={15} />

                Update

              </button>

              <div className="approval-footer-divider"></div>

              <button
                type="button"
                className="approval-next-button"
                onClick={vm.handleNext}
              >

                Next

                <ChevronRight size={16} />

              </button>

            </div>

          </section>

        </main>

      </div>

    </div>

  );

};

export default ApprovalSettingMaster;
