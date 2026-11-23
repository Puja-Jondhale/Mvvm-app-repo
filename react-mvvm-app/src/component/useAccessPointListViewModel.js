
import { useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import AccessPointListModel from "./accessPointListModel";

const useAccessPointListViewModel = () => {

  const navigate = useNavigate();

  const [accessPoints, setAccessPoints] = useState(
    () => AccessPointListModel.getAccessPoints()
  );

  const [search, setSearch] = useState("");
  const [currentPage, setCurrentPage] = useState(1);

  const [showModal, setShowModal] = useState(false);
  const [editingItem, setEditingItem] = useState(null);

  const [branchName, setBranchName] = useState("");
  const [accessPoint, setAccessPoint] = useState("");
  const [error, setError] = useState("");

  const pageSize = 10;

  // SEARCH
  const filteredAccessPoints = useMemo(() => {
    const value = search.trim().toLowerCase();

    return accessPoints.filter(item =>
      item.branchName.toLowerCase().includes(value) ||
      item.accessPoint.toLowerCase().includes(value)
    );
  }, [accessPoints, search]);

  // PAGINATION
  const totalPages = Math.max(
    1,
    Math.ceil(filteredAccessPoints.length / pageSize)
  );

  const safePage = Math.min(currentPage, totalPages);

  const paginatedAccessPoints = filteredAccessPoints.slice(
    (safePage - 1) * pageSize,
    safePage * pageSize
  );

  // SEARCH HANDLER
  const handleSearch = value => {
    setSearch(value);
    setCurrentPage(1);
  };

  // ADD NEW
  const openAddModal = () => {
    setEditingItem(null);
    setBranchName("");
    setAccessPoint("");
    setError("");
    setShowModal(true);
  };

  // EDIT
  const openEditModal = item => {
    setEditingItem(item);
    setBranchName(item.branchName);
    setAccessPoint(item.accessPoint);
    setError("");
    setShowModal(true);
  };

  // CLOSE MODAL
  const closeModal = () => {
    setShowModal(false);
    setEditingItem(null);
    setBranchName("");
    setAccessPoint("");
    setError("");
  };

  // SAVE
  const saveAccessPoint = event => {
    event.preventDefault();

    const branch = branchName.trim();
    const point = accessPoint.trim();

    if (!branch || !point) {
      setError("Please enter both branch name and access point.");
      return;
    }

    const duplicate = accessPoints.some(item =>
      item.branchName.toLowerCase() === branch.toLowerCase() &&
      item.accessPoint.toLowerCase() === point.toLowerCase() &&
      item.id !== editingItem?.id
    );

    if (duplicate) {
      setError("This access point already exists for this branch.");
      return;
    }

    if (editingItem) {
      setAccessPoints(previous =>
        AccessPointListModel.updateAccessPoint(
          previous,
          editingItem.id,
          branch,
          point
        )
      );
    } else {
      setAccessPoints(previous =>
        AccessPointListModel.addAccessPoint(
          previous,
          branch,
          point
        )
      );

      setSearch("");
      setCurrentPage(1);
    }

    closeModal();
  };

  // DELETE
  const deleteAccessPoint = id => {
    const confirmed = window.confirm(
      "Are you sure you want to delete this access point?"
    );

    if (!confirmed) return;

    setAccessPoints(previous =>
      AccessPointListModel.deleteAccessPoint(previous, id)
    );
  };

  // PAGINATION HANDLER
  const goToPage = page => {
    setCurrentPage(Math.max(1, Math.min(page, totalPages)));
  };

  // BACK NAVIGATION
  const goBack = () => {
    navigate("/auth/masters/purpose-master-list");
  };

  // NEXT NAVIGATION
  const goNext = () => {
    navigate("/auth/masters/branch-master-list");
  };

  // OTHER SIDEBAR NAVIGATION
  const navigateTo = path => {
    navigate(path);
  };

  return {
    accessPoints,
    filteredAccessPoints,
    paginatedAccessPoints,

    search,
    currentPage: safePage,
    totalPages,
    pageSize,

    showModal,
    editingItem,

    branchName,
    accessPoint,
    error,

    setBranchName,
    setAccessPoint,

    handleSearch,
    openAddModal,
    openEditModal,
    closeModal,
    saveAccessPoint,
    deleteAccessPoint,

    goToPage,
    goBack,
    goNext,
    navigateTo
  };

};

export default useAccessPointListViewModel;
