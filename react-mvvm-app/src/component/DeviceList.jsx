
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
  Pencil,
  Trash2,
  Plus,
  X,
  Search,
  ChevronRight
} from "lucide-react";

import useDeviceListViewModel from "./useDeviceListViewModel";
import "./DeviceList.css";

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

const DeviceList = () => {

  const vm = useDeviceListViewModel();

  return (

    <div className="device-page">

      {/* SIDEBAR */}

      <aside className="device-sidebar">

        <div className="device-logo-area">

          <div className="access360-security">

            <img
              src="/logo.webp"
              alt="Access360 Security Logo"
              className="access360-main-logo"
            />

          </div>

        </div>

        <nav className="device-sidebar-nav">

          {sidebarItems.map(item => {

            const Icon = item.icon;

            return (

              <button
                key={item.label}
                className={`device-sidebar-link ${
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

      {/* MAIN CONTENT */}

      <div className="device-main">

        {/* HEADER */}

        <header className="device-header">

          <div className="device-company">

            <h1>Sentorixx global solution pvt ltd</h1>

            <span>Baner</span>

          </div>

          <div className="device-header-right">

            <span className="device-welcome">
              Welcome Sentorixx
            </span>

            <div className="device-header-icons">

              <button title="Messages">
                <Mail size={21} />
              </button>

              <button title="Notifications">

                <Bell size={21} />

                <span className="device-notification">
                  0
                </span>

              </button>

              <button title="Profile">
                <UserRound size={21} />
              </button>

            </div>

          </div>

        </header>

        {/* PAGE CONTENT */}

        <main className="device-content">

          <section className="device-card">

            {/* TOOLBAR */}

            <div className="device-toolbar">

              <div className="device-title">

                <button
                  className="device-back"
                  onClick={vm.goBack}
                  title="Back"
                >

                  <ArrowLeft size={13} />

                </button>

                <h2>Device List</h2>

              </div>

              <div className="device-toolbar-actions">

                {/* SEARCH */}

                <div className="device-search">

                  <Search size={18} />

                  <input
                    type="text"
                    placeholder="Search devices..."
                    value={vm.search}
                    onChange={e => vm.handleSearch(e.target.value)}
                  />

                  {vm.search && (

                    <button
                      onClick={() => vm.handleSearch("")}
                      title="Clear search"
                    >

                      <X size={15} />

                    </button>

                  )}

                </div>

                {/* ADD NEW */}

                <button
                  className="device-add-button"
                  onClick={vm.openAddModal}
                >

                  <Plus size={17} />

                  Add New

                </button>

              </div>

            </div>

            {/* TABLE */}

            <div className="device-table-wrapper">

              <table className="device-table">

                <thead>

                  <tr>

                    <th className="device-sr-column">
                      SR.NO
                    </th>

                    <th>DEVICE NUMBER</th>

                    <th>DEVICE NAME</th>

                    <th>LOCATION</th>

                    <th>BRANCH NAME</th>

                    <th>IO TYPE</th>

                    <th>TYPE OF MACHINE</th>

                    <th className="device-action-heading">
                      ACTIONS
                    </th>

                  </tr>

                </thead>

                <tbody>

                  {vm.paginatedDevices.length > 0 ? (

                    vm.paginatedDevices.map((device, index) => (

                      <tr key={device.id}>

                        <td className="device-serial">

                          {(vm.currentPage - 1) *
                            vm.pageSize + index + 1}

                        </td>

                        <td className="device-number">
                          {device.deviceNumber}
                        </td>

                        <td>{device.deviceName}</td>

                        <td>{device.location}</td>

                        <td>{device.branchName}</td>

                        <td>

                          <span className="device-io-badge">
                            {device.ioType}
                          </span>

                        </td>

                        <td>{device.machineType}</td>

                        <td>

                          <div className="device-action-buttons">

                            <button
                              className="device-edit-button"
                              title="Edit"
                              onClick={() => vm.openEditModal(device)}
                            >

                              <Pencil size={16} />

                            </button>

                            <button
                              className="device-delete-button"
                              title="Delete"
                              onClick={() => vm.deleteDevice(device.id)}
                            >

                              <Trash2 size={16} />

                            </button>

                          </div>

                        </td>

                      </tr>

                    ))

                  ) : (

                    <tr>

                      <td
                        colSpan="8"
                        className="device-empty"
                      >

                        No devices found.

                      </td>

                    </tr>

                  )}

                </tbody>

              </table>

            </div>

            {/* PAGINATION */}

            {vm.totalPages > 1 && (

              <div className="device-pagination">

                <button
                  disabled={vm.currentPage === 1}
                  onClick={() => vm.goToPage(vm.currentPage - 1)}
                >

                  « Previous

                </button>

                {Array.from(
                  { length: vm.totalPages },
                  (_, index) => index + 1
                ).map(page => (

                  <button
                    key={page}
                    className={
                      vm.currentPage === page ? "selected" : ""
                    }
                    onClick={() => vm.goToPage(page)}
                  >

                    {page}

                  </button>

                ))}

                <button
                  disabled={vm.currentPage === vm.totalPages}
                  onClick={() => vm.goToPage(vm.currentPage + 1)}
                >

                  Next »

                </button>

              </div>

            )}

          </section>

          {/* BOTTOM NEXT BUTTON */}

          <div className="device-bottom-next">

            <button onClick={vm.goNext}>

              Next

              <ChevronRight size={17} />

            </button>

          </div>

        </main>

      </div>

      {/* ADD / EDIT MODAL */}

      {vm.showModal && (

        <div className="device-modal-overlay">

          <div className="device-modal">

            <div className="device-modal-header">

              <h3>
                {vm.editingDevice
                  ? "Edit Device"
                  : "Add New Device"}
              </h3>

              <button
                onClick={vm.closeModal}
                type="button"
              >

                <X size={21} />

              </button>

            </div>

            <form onSubmit={vm.saveDevice}>

              <div className="device-modal-body">

                <label>Device Number *</label>

                <input
                  type="text"
                  placeholder="Enter device number"
                  value={vm.deviceNumber}
                  onChange={e => vm.setDeviceNumber(e.target.value)}
                />

                <label>Device Name *</label>

                <input
                  type="text"
                  placeholder="Enter device name"
                  value={vm.deviceName}
                  onChange={e => vm.setDeviceName(e.target.value)}
                />

                <label>Location *</label>

                <input
                  type="text"
                  placeholder="Enter location"
                  value={vm.location}
                  onChange={e => vm.setLocation(e.target.value)}
                />

                <label>Branch Name *</label>

                <input
                  type="text"
                  placeholder="Enter branch name"
                  value={vm.branchName}
                  onChange={e => vm.setBranchName(e.target.value)}
                />

                <label>IO Type *</label>

                <select
                  value={vm.ioType}
                  onChange={e => vm.setIoType(e.target.value)}
                >

                  <option value="IN">IN</option>
                  <option value="OUT">OUT</option>

                </select>

                <label>Type of Machine *</label>

                <select
                  value={vm.machineType}
                  onChange={e => vm.setMachineType(e.target.value)}
                >

                  <option value="In Device">In Device</option>
                  <option value="Out Device">Out Device</option>
                  <option value="Both">Both</option>

                </select>

                {vm.error && (

                  <p className="device-error">
                    {vm.error}
                  </p>

                )}

              </div>

              <div className="device-modal-footer">

                <button
                  type="button"
                  className="device-cancel"
                  onClick={vm.closeModal}
                >

                  Cancel

                </button>

                <button
                  type="submit"
                  className="device-save"
                >

                  {vm.editingDevice ? "Update" : "Save"}

                </button>

              </div>

            </form>

          </div>

        </div>

      )}

    </div>

  );

};

export default DeviceList;
