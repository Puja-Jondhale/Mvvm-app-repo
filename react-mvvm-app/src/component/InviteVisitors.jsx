
import React from "react";
import { LayoutDashboard, CalendarClock, CalendarDays, Users, FileText,ClipboardList,Ban,History,
  Bell, UserRound, Mail, Search,Plus,Upload,CornerUpLeft,RotateCcw,Eye,Pencil,Trash2,X,Clock3,ShieldCheck
} from "lucide-react";

import useInviteVisitorsViewModel from "./useInviteVisitorsViewModel";
import "./InviteVisitors.css";

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

const InviteVisitors = () => {
  const vm = useInviteVisitorsViewModel();

  const [formData, setFormData] = React.useState({
    appNo: "",
    visitor: "",
    company: "",
    phone: "",
    host: "",
    department: "IT",
    visitDate: "",
    time: ""
  });

  const updateField = (event) => {
    setFormData(previous => ({
      ...previous,
      [event.target.name]: event.target.value
    }));
  };

  const submitForm = (event) => {
    event.preventDefault();

    if (
      !formData.visitor.trim() ||
      !formData.host.trim() ||
      !formData.appNo.trim()
    ) {
      return;
    }

    vm.saveVisitor(formData);

    setFormData({
      appNo: "",
      visitor: "",
      company: "",
      phone: "",
      host: "",
      department: "IT",
      visitDate: "",
      time: ""
    });
  };

  const openEdit = (visitor) => {
    setFormData({
      appNo: visitor.appNo,
      visitor: visitor.visitor,
      company: visitor.company,
      phone: visitor.phone,
      host: visitor.host,
      department: visitor.department,
      visitDate: visitor.visitDate,
      time: visitor.time
    });

    vm.openEditModal(visitor);
  };

  const closeModal = () => {
    vm.closeModal();

    setFormData({
      appNo: "",
      visitor: "",
      company: "",
      phone: "",
      host: "",
      department: "IT",
      visitDate: "",
      time: ""
    });
  };

  const handleAdd = () => {
    setFormData({
      appNo: "",
      visitor: "",
      company: "",
      phone: "",
      host: "",
      department: "IT",
      visitDate: "",
      time: ""
    });

    vm.openAddModal();
  };

  const renderActionButtons = (visitor) => {
    const isApproved = visitor.status === "Approved";
    const noApproval = visitor.status === "No Approval";

    return (
      <div className="invite-action-buttons">
        {!noApproval && (
          <button
            className="action-reply"
            title="Approve"
            disabled={isApproved}
            onClick={() => vm.updateStatus(visitor, "Approved")}
          >
            <CornerUpLeft size={20} fill="currentColor" />
          </button>
        )}

        <button
          className="action-history"
          title="Reset to pending"
          onClick={() => vm.updateStatus(visitor, "Pending")}
        >
          <RotateCcw size={19} />
        </button>

        <button
          className="action-view"
          title="View visitor"
          onClick={() => vm.openViewModal(visitor)}
        >
          <Eye size={19} />
        </button>

        <button
          className="action-edit"
          title="Edit visitor"
          onClick={() => openEdit(visitor)}
        >
          <Pencil size={19} fill="currentColor" />
        </button>

        <button
          className="action-delete"
          title="Delete visitor"
          onClick={() => vm.deleteVisitor(visitor)}
        >
          <Trash2 size={18} fill="currentColor" />
        </button>
      </div>
    );
  };

  return (
    <div className="invite-page">

      {/* SIDEBAR */}
      <aside className="invite-sidebar">
        <div className="invite-logo-area">
          <div className="access360-security">

            <img
              src="/logo.webp"
              alt="Access360 Security Logo"
              className="access360-main-logo"
            />

          </div>
        </div>

        <nav className="invite-sidebar-nav">
          {sidebarItems.map(item => {
            const Icon = item.icon;

            return (
              <button
                key={item.label}
                className={`invite-sidebar-link ${
                  item.label === "Invite Visitor" ? "active" : ""
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
      <div className="invite-main">

        {/* HEADER */}
        <header className="invite-header">
          <div className="invite-company">
            <h1>Sentorixx global solution pvt ltd</h1>
            <span>Baner</span>
          </div>

          <div className="invite-header-right">
            <span className="invite-welcome">Welcome Sentorixx</span>

            <div className="invite-header-icons">
              <button title="Messages" onClick={() => vm.navigateTo("/messages")}>
                <Mail size={21} />
              </button>

              <button title="Notifications">
                <Bell size={21} />
                <span className="invite-notification-count">0</span>
              </button>

              <button title="Profile">
                <UserRound size={21} />
              </button>
            </div>
          </div>
        </header>

        {/* PAGE BODY */}
        <main className="invite-content">

          {/* PAGE TITLE AND TOOLBAR */}
          <div className="invite-toolbar">
            <h2>Invited Visitor's List</h2>

            <div className="invite-toolbar-actions">

              <div className="invite-search-box">
                <Search size={18} />
                <input
                  type="text"
                  placeholder="Search visitors..."
                  value={vm.searchText}
                  onChange={event => vm.handleSearch(event.target.value)}
                />
              </div>

              <button className="invite-add-button" onClick={handleAdd}>
                <Plus size={18} />
                Add New
              </button>

              <label className="invite-upload-button">
                <Upload size={16} />
                Bulk Upload
                <input
                  type="file"
                  accept=".csv"
                  onChange={vm.handleBulkUpload}
                />
              </label>

            </div>
          </div>

          {/* VISITOR TABLE */}
          <section className="invite-table-card">
            <div className="invite-table-scroll">
              <table className="invite-table">
                <thead>
                  <tr>
                    <th>SR.NO</th>
                    <th>APP_NO</th>
                    <th>VISITOR DETAILS</th>
                    <th>HOST DETAILS</th>
                    <th>VISIT DATE</th>
                    <th>STATUS</th>
                    <th>ACTION</th>
                  </tr>
                </thead>

                <tbody>
                  {vm.currentVisitors.length > 0 ? (
                    vm.currentVisitors.map((visitor, index) => (
                      <tr key={visitor.id}>
                        <td className="invite-serial">
                          {(vm.currentPage - 1) * 10 + index + 1}
                        </td>

                        <td className="invite-app-number">
                          {visitor.appNo}
                        </td>

                        <td>
                          <div className="invite-person-details">
                            <strong>{visitor.visitor}</strong>
                            <span>{visitor.company}</span>
                            <small>
                              <span className="phone-symbol">☎</span>
                              {visitor.phone}
                            </small>
                          </div>
                        </td>

                        <td>
                          <div className="invite-host-details">
                            <strong>{visitor.host}</strong>
                            <span>{visitor.department}</span>
                          </div>
                        </td>

                        <td>
                          <div className="invite-date-details">
                            <strong>{visitor.visitDate}</strong>
                            {visitor.time && (
                              <small>
                                <Clock3 size={12} />
                                {visitor.time}
                              </small>
                            )}
                          </div>
                        </td>

                        <td>
                          <span
                            className={`invite-status status-${visitor.status
                              .toLowerCase()
                              .replace(/\s+/g, "-")}`}
                          >
                            {visitor.status}
                          </span>
                        </td>

                        <td>{renderActionButtons(visitor)}</td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td colSpan="7" className="invite-no-records">
                        No visitors found
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>

            {/* PAGINATION */}
            <div className="invite-pagination">
              <button
                disabled={vm.currentPage === 1}
                onClick={() => vm.changePage(vm.currentPage - 1)}
              >
                « &nbsp;Previous
              </button>

              {Array.from(
                { length: vm.totalPages },
                (_, index) => index + 1
              ).map(page => (
                <button
                  key={page}
                  className={vm.currentPage === page ? "selected" : ""}
                  onClick={() => vm.changePage(page)}
                >
                  {page}
                </button>
              ))}

              <button
                disabled={vm.currentPage === vm.totalPages}
                onClick={() => vm.changePage(vm.currentPage + 1)}
              >
                Next &nbsp;»
              </button>
            </div>
          </section>
        </main>
      </div>

      {/* ADD / EDIT / VIEW MODAL */}
      {vm.modalType && (
        <div className="invite-modal-overlay" onClick={closeModal}>
          <div
            className="invite-modal"
            onClick={event => event.stopPropagation()}
          >
            <div className="invite-modal-heading">
              <h2>
                {vm.modalType === "add"
                  ? "Add New Visitor"
                  : vm.modalType === "edit"
                    ? "Edit Visitor"
                    : "Visitor Details"}
              </h2>

              <button onClick={closeModal}>
                <X size={21} />
              </button>
            </div>

            {vm.modalType === "view" ? (
              <div className="invite-view-details">
                {Object.entries({
                  "Application No": vm.selectedVisitor?.appNo,
                  "Visitor Name": vm.selectedVisitor?.visitor,
                  Company: vm.selectedVisitor?.company,
                  Phone: vm.selectedVisitor?.phone,
                  Host: vm.selectedVisitor?.host,
                  Department: vm.selectedVisitor?.department,
                  "Visit Date": vm.selectedVisitor?.visitDate,
                  Time: vm.selectedVisitor?.time,
                  Status: vm.selectedVisitor?.status
                }).map(([label, value]) => (
                  <div key={label}>
                    <span>{label}</span>
                    <strong>{value || "-"}</strong>
                  </div>
                ))}
              </div>
            ) : (
              <form onSubmit={submitForm} className="invite-form">
                <label>
                  Application Number *
                  <input
                    name="appNo"
                    value={formData.appNo}
                    onChange={updateField}
                    required
                  />
                </label>

                <label>
                  Visitor Name *
                  <input
                    name="visitor"
                    value={formData.visitor}
                    onChange={updateField}
                    required
                  />
                </label>

                <label>
                  Company
                  <input
                    name="company"
                    value={formData.company}
                    onChange={updateField}
                  />
                </label>

                <label>
                  Phone Number
                  <input
                    name="phone"
                    value={formData.phone}
                    onChange={updateField}
                  />
                </label>

                <label>
                  Host Name *
                  <input
                    name="host"
                    value={formData.host}
                    onChange={updateField}
                    required
                  />
                </label>

                <label>
                  Department
                  <input
                    name="department"
                    value={formData.department}
                    onChange={updateField}
                  />
                </label>

                <label>
                  Visit Date
                  <input
                    name="visitDate"
                    value={formData.visitDate}
                    onChange={updateField}
                    placeholder="e.g. 18 Nov 2026"
                  />
                </label>

                <label>
                  Visit Time
                  <input
                    name="time"
                    value={formData.time}
                    onChange={updateField}
                    placeholder="e.g. 10:00 AM to 11:00 AM"
                  />
                </label>

                <div className="invite-form-actions">
                  <button type="button" onClick={closeModal}>
                    Cancel
                  </button>

                  <button type="submit">
                    Save Visitor
                  </button>
                </div>
              </form>
            )}
          </div>
        </div>
      )}

      {vm.message && (
        <div className="invite-toast">
          {vm.message}
          <button onClick={vm.closeMessage}>×</button>
        </div>
      )}

    </div>
  );
};

export default InviteVisitors;
