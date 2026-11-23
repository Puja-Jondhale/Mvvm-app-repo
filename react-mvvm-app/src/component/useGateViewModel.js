
import { useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import GateModel from "./gateModel";

const useGateViewModel = () => {

  const navigate = useNavigate();

  const [gates, setGates] = useState(
    () => GateModel.getGates()
  );

  const [search, setSearch] = useState("");

  const [showModal, setShowModal] = useState(false);

  const [editingGate, setEditingGate] = useState(null);

  const [branchName, setBranchName] = useState("");
  const [gateName, setGateName] = useState("");

  const [error, setError] = useState("");

  // SEARCH GATES
  const filteredGates = useMemo(() => {

    const value = search.trim().toLowerCase();

    return gates.filter(gate =>
      gate.branchName.toLowerCase().includes(value) ||
      gate.gateName.toLowerCase().includes(value)
    );

  }, [gates, search]);

  // RESET FORM
  const resetForm = () => {
    setBranchName("");
    setGateName("");
    setError("");
  };

  // OPEN ADD MODAL
  const openAddModal = () => {

    setEditingGate(null);
    resetForm();
    setShowModal(true);

  };

  // OPEN EDIT MODAL
  const openEditModal = (gate) => {

    setEditingGate(gate);

    setBranchName(gate.branchName);
    setGateName(gate.gateName);

    setError("");
    setShowModal(true);

  };

  // CLOSE MODAL
  const closeModal = () => {

    setShowModal(false);
    setEditingGate(null);
    resetForm();

  };

  // SAVE GATE
  const saveGate = (event) => {

    event.preventDefault();

    const branch = branchName.trim();
    const name = gateName.trim();

    if (!branch || !name) {
      setError("Please fill all required fields.");
      return;
    }

    // DUPLICATE VALIDATION
    const duplicate = gates.some(gate =>
      gate.branchName.toLowerCase() === branch.toLowerCase() &&
      gate.gateName.toLowerCase() === name.toLowerCase() &&
      gate.id !== editingGate?.id
    );

    if (duplicate) {
      setError("This gate already exists for the selected branch.");
      return;
    }

    const gateData = {
      branchName: branch,
      gateName: name
    };

    if (editingGate) {

      setGates(previous =>
        GateModel.updateGate(
          previous,
          editingGate.id,
          gateData
        )
      );

    } else {

      setGates(previous =>
        GateModel.addGate(previous, gateData)
      );

    }

    closeModal();

  };

  // DELETE GATE
  const deleteGate = (id) => {

    const confirmed = window.confirm(
      "Are you sure you want to delete this gate?"
    );

    if (!confirmed) return;

    setGates(previous =>
      GateModel.deleteGate(previous, id)
    );

  };

  // BACK BUTTON
  const goBack = () => {
    navigate(-1);
  };

  // NEXT BUTTON
  const goNext = () => {
    navigate("/auth/masters/conference-master-list");
  };

  return {

    gates,
    filteredGates,

    search,
    setSearch,

    showModal,
    editingGate,
    error,

    branchName,
    setBranchName,

    gateName,
    setGateName,

    openAddModal,
    openEditModal,
    closeModal,

    saveGate,
    deleteGate,

    goBack,
    goNext

  };

};

export default useGateViewModel;
