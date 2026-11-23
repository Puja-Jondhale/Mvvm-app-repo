
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

import useVisitorCategoryListViewModel from "./useVisitorCategoryListViewModel";

import "./VisitorCategoryList.css";

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

const VisitorCategoryList = () => {

  const vm = useVisitorCategoryListViewModel();

  return (

    <div className="visitor-category-page">

      {/* SIDEBAR */}

      <aside className="visitor-category-sidebar">

        <div className="visitor-category-logo-area">

          <div className="access360-security">

            <img
              src="/logo.webp"
              alt="Access360 Security Logo"
              className="access360-main-logo"
            />

          </div>

        </div>

        <nav className="visitor-category-sidebar-nav">

          {sidebarItems.map(item => {

            const Icon = item.icon;

            return (

              <button
                key={item.label}
                className={`visitor-category-sidebar-link ${
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

      <div className="visitor-category-main">

        {/* HEADER */}

        <header className="visitor-category-header">

          <div className="visitor-category-company">

            <h1>Sentorixx global solution pvt ltd</h1>

            <span>Baner</span>

          </div>

          <div className="visitor-category-header-right">

            <span className="visitor-category-welcome">
              Welcome Sentorixx
            </span>

            <div className="visitor-category-header-icons">

              <button title="Messages">
                <Mail size={21} />
              </button>

              <button title="Notifications">

                <Bell size={21} />

                <span className="visitor-category-notification-count">
                  0
                </span>

              </button>

              <button title="Profile">
                <UserRound size={21} />
              </button>

            </div>

          </div>

        </header>

        {/* CONTENT */}

        <main className="visitor-category-content">

          <section className="visitor-category-card">

            {/* TOOLBAR */}

            <div className="visitor-category-toolbar">

              <div className="visitor-category-title">

                <button
                  className="visitor-category-back-button"
                  onClick={vm.goBack}
                  title="Back"
                >

                  <ArrowLeft size={15} />

                </button>

                <h2>Visitor Category List</h2>

              </div>

              <div className="visitor-category-toolbar-actions">

                {/* SEARCH */}

                <div className="visitor-category-search">

                  <Search size={18} />

                  <input
                    type="text"
                    placeholder="Search categories..."
                    value={vm.search}
                    onChange={e =>
                      vm.handleSearch(e.target.value)
                    }
                  />

                  {vm.search && (

                    <button
                      type="button"
                      onClick={() => vm.handleSearch("")}
                      title="Clear search"
                    >

                      <X size={15} />

                    </button>

                  )}

                </div>

                {/* ADD NEW */}

                <button
                  className="visitor-category-add-button"
                  onClick={vm.openAddModal}
                >

                  <Plus size={17} />

                  Add New

                </button>

              </div>

            </div>

            {/* TABLE */}

            <div className="visitor-category-table-wrapper">

              <table className="visitor-category-table">

                <thead>

                  <tr>

                    <th className="visitor-category-sr-heading">
                      SR.NO
                    </th>

                    <th className="visitor-category-name-heading">
                      VISITOR CATEGORY
                    </th>

                    <th className="visitor-category-approval-heading">
                      REQUIRED APPROVALS
                    </th>

                    <th className="visitor-category-action-heading">
                      ACTIONS
                    </th>

                  </tr>

                </thead>

                <tbody>

                  {vm.paginatedCategories.length > 0 ? (

                    vm.paginatedCategories.map((category, index) => (

                      <tr key={category.id}>

                        {/* SERIAL NUMBER */}

                        <td className="visitor-category-serial">

                          {(vm.currentPage - 1) * vm.pageSize + index + 1}

                        </td>

                        {/* CATEGORY NAME */}

                        <td className="visitor-category-name">

                          {category.categoryName}

                        </td>

                        {/* REQUIRED APPROVALS */}

                        <td>

                          <span className="visitor-category-approval-badge">

                            {category.requiredApprovals}

                          </span>

                        </td>

                        {/* ACTIONS */}

                        <td>

                          <div className="visitor-category-actions">

                            <button
                              className="visitor-category-edit-button"
                              title="Edit Category"
                              onClick={() =>
                                vm.openEditModal(category)
                              }
                            >

                              <Pencil size={16} />

                            </button>

                            <button
                              className="visitor-category-delete-button"
                              title="Delete Category"
                              onClick={() =>
                                vm.deleteCategory(category.id)
                              }
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
                        colSpan="4"
                        className="visitor-category-empty"
                      >

                        No visitor categories found.

                      </td>

                    </tr>

                  )}

                </tbody>

              </table>

            </div>

            {/* PAGINATION */}

            {vm.totalPages > 1 && (

              <div className="visitor-category-pagination">

                <button
                  disabled={vm.currentPage === 1}
                  onClick={() =>
                    vm.goToPage(vm.currentPage - 1)
                  }
                >

                  « &nbsp; Previous

                </button>

                {Array.from(
                  { length: vm.totalPages },
                  (_, index) => index + 1
                ).map(page => (

                  <button
                    key={page}
                    className={
                      vm.currentPage === page
                        ? "selected"
                        : ""
                    }
                    onClick={() => vm.goToPage(page)}
                  >

                    {page}

                  </button>

                ))}

                <button
                  disabled={vm.currentPage === vm.totalPages}
                  onClick={() =>
                    vm.goToPage(vm.currentPage + 1)
                  }
                >

                  Next &nbsp; »

                </button>

              </div>

            )}

          </section>

          {/* BOTTOM NEXT BUTTON */}

          <div className="visitor-category-bottom-next">

            <button onClick={vm.goNext}>

              Next

              <ChevronRight size={17} />

            </button>

          </div>

        </main>

      </div>

      {/* ADD / EDIT MODAL */}

      {vm.showModal && (

        <div className="visitor-category-modal-overlay">

          <div className="visitor-category-modal">

            <div className="visitor-category-modal-header">

              <h3>

                {vm.editingCategory
                  ? "Edit Visitor Category"
                  : "Add New Visitor Category"}

              </h3>

              <button
                type="button"
                onClick={vm.closeModal}
                title="Close"
              >

                <X size={21} />

              </button>

            </div>

            <form onSubmit={vm.saveCategory}>

              <div className="visitor-category-modal-body">

                <label htmlFor="categoryName">
                  Visitor Category *
                </label>

                <input
                  id="categoryName"
                  type="text"
                  placeholder="Enter visitor category"
                  value={vm.categoryName}
                  onChange={e =>
                    vm.setCategoryName(e.target.value)
                  }
                />

                <label htmlFor="requiredApprovals">
                  Required Approvals *
                </label>

                <select
                  id="requiredApprovals"
                  value={vm.requiredApprovals}
                  onChange={e =>
                    vm.setRequiredApprovals(e.target.value)
                  }
                >

                  <option value="No">No</option>

                  <option value="Yes">Yes</option>

                </select>

                {vm.error && (

                  <p className="visitor-category-error">
                    {vm.error}
                  </p>

                )}

              </div>

              <div className="visitor-category-modal-footer">

                <button
                  type="button"
                  className="visitor-category-cancel-button"
                  onClick={vm.closeModal}
                >

                  Cancel

                </button>

                <button
                  type="submit"
                  className="visitor-category-save-button"
                >

                  {vm.editingCategory ? "Update" : "Save"}

                </button>

              </div>

            </form>

          </div>

        </div>

      )}

    </div>

  );

};

export default VisitorCategoryList;
