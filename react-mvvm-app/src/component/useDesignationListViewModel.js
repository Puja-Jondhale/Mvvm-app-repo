
import { useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import DesignationListModel from "./designationListModel";

const useDesignationListViewModel = () => {

  const navigate = useNavigate();

  const [designations, setDesignations] = useState(
    () => DesignationListModel.getDesignations()
  );

  const [search, setSearch] = useState("");
  const [currentPage, setCurrentPage] = useState(1);

  const pageSize = 10;

  const [showModal, setShowModal] = useState(false);
  const [editingDesignation, setEditingDesignation] = useState(null);
  const [designationName, setDesignationName] = useState("");
  const [error, setError] = useState("");

  // SEARCH
  const filteredDesignations = useMemo(() => {

    return designations.filter(item =>
      item.designationName
        .toLowerCase()
        .includes(search.trim().toLowerCase())
    );

  }, [designations, search]);

  // PAGINATION
  const totalPages = Math.max(
    1,
    Math.ceil(filteredDesignations.length / pageSize)
  );

  const safePage = Math.min(currentPage, totalPages);

  const paginatedDesignations = filteredDesignations.slice(
    (safePage - 1) * pageSize,
    safePage * pageSize
  );

  // SEARCH HANDLER
  const handleSearch = value => {
    setSearch(value);
    setCurrentPage(1);
  };

  // ADD DESIGNATION
  const openAddModal = () => {
    setEditingDesignation(null);
    setDesignationName("");
    setError("");
    setShowModal(true);
  };

  // EDIT DESIGNATION
  const openEditModal = designation => {
    setEditingDesignation(designation);
    setDesignationName(designation.designationName);
    setError("");
    setShowModal(true);
  };

  // CLOSE MODAL
  const closeModal = () => {
    setShowModal(false);
    setEditingDesignation(null);
    setDesignationName("");
    setError("");
  };

  // SAVE DESIGNATION
  const saveDesignation = event => {

    event.preventDefault();

    const name = designationName.trim();

    if (!name) {
      setError("Please enter designation name.");
      return;
    }

    const duplicate = designations.some(item =>
      item.designationName.toLowerCase() === name.toLowerCase() &&
      item.id !== editingDesignation?.id
    );

    if (duplicate) {
      setError("Designation already exists.");
      return;
    }

    if (editingDesignation) {

      setDesignations(previous =>
        DesignationListModel.updateDesignation(
          previous,
          editingDesignation.id,
          name
        )
      );

    } else {

      setDesignations(previous =>
        DesignationListModel.addDesignation(previous, name)
      );

      setSearch("");
      setCurrentPage(1);
    }

    closeModal();
  };

  // DELETE DESIGNATION
  const deleteDesignation = id => {

    const confirmed = window.confirm(
      "Are you sure you want to delete this designation?"
    );

    if (!confirmed) return;

    setDesignations(previous =>
      DesignationListModel.deleteDesignation(previous, id)
    );
  };

  // PAGINATION
  const goToPage = page => {

    setCurrentPage(
      Math.max(1, Math.min(page, totalPages))
    );

  };

  // BACK BUTTON
  const goBack = () => {
    navigate("/master-data");
  };

  // NEXT BUTTON
  const goNext = () => {
    navigate("/master-data");
  };

  // SIDEBAR NAVIGATION
  const navigateTo = path => {
    navigate(path);
  };

  return {

    designations,
    filteredDesignations,
    paginatedDesignations,

    search,
    currentPage: safePage,
    totalPages,
    pageSize,

    showModal,
    editingDesignation,
    designationName,
    error,

    handleSearch,
    openAddModal,
    openEditModal,
    closeModal,
    saveDesignation,
    deleteDesignation,
    setDesignationName,
    goToPage,
    goBack,
    goNext,
    navigateTo

  };

};

export default useDesignationListViewModel;
