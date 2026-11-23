
import { useState, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import BranchListModel from "./branchListModel";

const useBranchListViewModel = () => {
  const navigate = useNavigate();

  const [branches, setBranches] = useState(
    () => BranchListModel.getBranches()
  );

  const [search, setSearch] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [editingBranch, setEditingBranch] = useState(null);
  const [branchName, setBranchName] = useState("");
  const [error, setError] = useState("");

  // Search functionality
  const filteredBranches = useMemo(() => {
    return branches.filter((branch) =>
      branch.branchName
        .toLowerCase()
        .includes(search.trim().toLowerCase())
    );
  }, [branches, search]);

  // Open Add Branch popup
  const openAddModal = () => {
    setEditingBranch(null);
    setBranchName("");
    setError("");
    setShowModal(true);
  };

  // Open Edit Branch popup
  const openEditModal = (branch) => {
    setEditingBranch(branch);
    setBranchName(branch.branchName);
    setError("");
    setShowModal(true);
  };

  // Close popup
  const closeModal = () => {
    setShowModal(false);
    setEditingBranch(null);
    setBranchName("");
    setError("");
  };

  // Save branch
  const saveBranch = (event) => {
    event.preventDefault();

    const name = branchName.trim();

    if (!name) {
      setError("Please enter branch name.");
      return;
    }

    const duplicate = branches.some(
      (branch) =>
        branch.branchName.toLowerCase() === name.toLowerCase() &&
        branch.id !== editingBranch?.id
    );

    if (duplicate) {
      setError("This branch already exists.");
      return;
    }

    if (editingBranch) {
      setBranches((previous) =>
        BranchListModel.updateBranch(
          previous,
          editingBranch.id,
          name
        )
      );
    } else {
      setBranches((previous) =>
        BranchListModel.addBranch(previous, name)
      );
    }

    closeModal();
  };

  // Delete branch
  const deleteBranch = (id) => {
    const confirmed = window.confirm(
      "Are you sure you want to delete this branch?"
    );

    if (!confirmed) return;

    setBranches((previous) =>
      BranchListModel.deleteBranch(previous, id)
    );
  };

  // Navigation
  const goBack = () => {
    navigate("/master-data");
  };

  const goNext = () => {
    navigate("/employee-master-list");
  };

  return {
    branches,
    filteredBranches,
    search,
    setSearch,
    showModal,
    editingBranch,
    branchName,
    setBranchName,
    error,
    openAddModal,
    openEditModal,
    closeModal,
    saveBranch,
    deleteBranch,
    goBack,
    goNext
  };
};

export default useBranchListViewModel;
