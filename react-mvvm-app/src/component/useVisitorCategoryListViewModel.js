
import { useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";

import VisitorCategoryListModel from "./visitorCategoryListModel";

const useVisitorCategoryListViewModel = () => {

  const navigate = useNavigate();

  const [categories, setCategories] = useState(
    () => VisitorCategoryListModel.getCategories()
  );

  const [search, setSearch] = useState("");
  const [currentPage, setCurrentPage] = useState(1);

  const pageSize = 10;

  const [showModal, setShowModal] = useState(false);
  const [editingCategory, setEditingCategory] = useState(null);

  const [categoryName, setCategoryName] = useState("");
  const [requiredApprovals, setRequiredApprovals] = useState("No");

  const [error, setError] = useState("");

  // SEARCH
  const filteredCategories = useMemo(() => {

    return categories.filter(item =>
      item.categoryName
        .toLowerCase()
        .includes(search.trim().toLowerCase())
    );

  }, [categories, search]);

  // PAGINATION
  const totalPages = Math.max(
    1,
    Math.ceil(filteredCategories.length / pageSize)
  );

  const safePage = Math.min(currentPage, totalPages);

  const paginatedCategories = filteredCategories.slice(
    (safePage - 1) * pageSize,
    safePage * pageSize
  );

  // SEARCH HANDLER
  const handleSearch = value => {
    setSearch(value);
    setCurrentPage(1);
  };

  // OPEN ADD MODAL
  const openAddModal = () => {

    setEditingCategory(null);
    setCategoryName("");
    setRequiredApprovals("No");
    setError("");
    setShowModal(true);

  };

  // OPEN EDIT MODAL
  const openEditModal = category => {

    setEditingCategory(category);
    setCategoryName(category.categoryName);
    setRequiredApprovals(category.requiredApprovals);
    setError("");
    setShowModal(true);

  };

  // CLOSE MODAL
  const closeModal = () => {

    setShowModal(false);
    setEditingCategory(null);
    setCategoryName("");
    setRequiredApprovals("No");
    setError("");

  };

  // SAVE CATEGORY
  const saveCategory = event => {

    event.preventDefault();

    const name = categoryName.trim();

    if (!name) {
      setError("Please enter visitor category name.");
      return;
    }

    const duplicate = categories.some(item =>
      item.categoryName.toLowerCase() === name.toLowerCase() &&
      item.id !== editingCategory?.id
    );

    if (duplicate) {
      setError("Visitor category already exists.");
      return;
    }

    if (editingCategory) {

      setCategories(previous =>
        VisitorCategoryListModel.updateCategory(
          previous,
          editingCategory.id,
          name,
          requiredApprovals
        )
      );

    } else {

      setCategories(previous =>
        VisitorCategoryListModel.addCategory(
          previous,
          name,
          requiredApprovals
        )
      );

      setSearch("");
      setCurrentPage(1);

    }

    closeModal();

  };

  // DELETE CATEGORY
  const deleteCategory = id => {

    const confirmed = window.confirm(
      "Are you sure you want to delete this visitor category?"
    );

    if (!confirmed) return;

    setCategories(previous =>
      VisitorCategoryListModel.deleteCategory(previous, id)
    );

  };

  // PAGINATION
  const goToPage = page => {

    setCurrentPage(
      Math.max(1, Math.min(page, totalPages))
    );

  };

  // BACK NAVIGATION
  const goBack = () => {
    navigate("/master-data");
  };

  // NEXT NAVIGATION
  const goNext = () => {
    navigate("/purpose-master-list");
  };

  // SIDEBAR NAVIGATION
  const navigateTo = path => {
    navigate(path);
  };

  return {

    categories,
    filteredCategories,
    paginatedCategories,

    search,
    currentPage: safePage,
    totalPages,
    pageSize,

    showModal,
    editingCategory,

    categoryName,
    requiredApprovals,
    error,

    setCategoryName,
    setRequiredApprovals,

    handleSearch,
    openAddModal,
    openEditModal,
    closeModal,
    saveCategory,
    deleteCategory,

    goToPage,
    goBack,
    goNext,
    navigateTo

  };

};

export default useVisitorCategoryListViewModel;
