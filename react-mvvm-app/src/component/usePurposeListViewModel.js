
import { useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import PurposeListModel from "./purposeListModel";

const usePurposeListViewModel = () => {

  const navigate = useNavigate();

  const [purposes, setPurposes] = useState(
    () => PurposeListModel.getPurposes()
  );

  const [search, setSearch] = useState("");
  const [currentPage, setCurrentPage] = useState(1);

  const [showModal, setShowModal] = useState(false);
  const [editingPurpose, setEditingPurpose] = useState(null);

  const [purposeName, setPurposeName] = useState("");
  const [error, setError] = useState("");

  const pageSize = 10;

  // SEARCH
  const filteredPurposes = useMemo(() => {
    return purposes.filter(item =>
      item.purposeName
        .toLowerCase()
        .includes(search.trim().toLowerCase())
    );
  }, [purposes, search]);

  // PAGINATION
  const totalPages = Math.max(
    1,
    Math.ceil(filteredPurposes.length / pageSize)
  );

  const safePage = Math.min(currentPage, totalPages);

  const paginatedPurposes = filteredPurposes.slice(
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
    setEditingPurpose(null);
    setPurposeName("");
    setError("");
    setShowModal(true);
  };

  // OPEN EDIT MODAL
  const openEditModal = purpose => {
    setEditingPurpose(purpose);
    setPurposeName(purpose.purposeName);
    setError("");
    setShowModal(true);
  };

  // CLOSE MODAL
  const closeModal = () => {
    setShowModal(false);
    setEditingPurpose(null);
    setPurposeName("");
    setError("");
  };

  // SAVE PURPOSE
  const savePurpose = event => {
    event.preventDefault();

    const name = purposeName.trim();

    if (!name) {
      setError("Please enter purpose name.");
      return;
    }

    const duplicate = purposes.some(item =>
      item.purposeName.toLowerCase() === name.toLowerCase() &&
      item.id !== editingPurpose?.id
    );

    if (duplicate) {
      setError("Purpose name already exists.");
      return;
    }

    if (editingPurpose) {

      setPurposes(previous =>
        PurposeListModel.updatePurpose(
          previous,
          editingPurpose.id,
          name
        )
      );

    } else {

      setPurposes(previous =>
        PurposeListModel.addPurpose(previous, name)
      );

      setSearch("");
      setCurrentPage(1);
    }

    closeModal();
  };

  // DELETE PURPOSE
  const deletePurpose = id => {

    const confirmed = window.confirm(
      "Are you sure you want to delete this purpose?"
    );

    if (!confirmed) return;

    setPurposes(previous =>
      PurposeListModel.deletePurpose(previous, id)
    );
  };

  // PAGE NAVIGATION
  const goToPage = page => {
    setCurrentPage(
      Math.max(1, Math.min(page, totalPages))
    );
  };

  // BACK
  const goBack = () => {
    navigate("/visitor-category-master-list");
  };

  // NEXT
  const goNext = () => {
    navigate("/access-point-master-list");
  };

  // SIDEBAR NAVIGATION
  const navigateTo = path => {
    navigate(path);
  };

  return {
    purposes,
    filteredPurposes,
    paginatedPurposes,

    search,
    currentPage: safePage,
    totalPages,
    pageSize,

    showModal,
    editingPurpose,
    purposeName,
    error,

    setPurposeName,

    handleSearch,
    openAddModal,
    openEditModal,
    closeModal,
    savePurpose,
    deletePurpose,

    goToPage,
    goBack,
    goNext,
    navigateTo
  };

};

export default usePurposeListViewModel;
