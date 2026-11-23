
import { useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import inviteVisitorsModel from "./inviteVisitorsModel";

const useInviteVisitorsViewModel = () => {
  const navigate = useNavigate();

  const [visitors, setVisitors] = useState(() =>
    inviteVisitorsModel.getVisitors()
  );

  const [searchText, setSearchText] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [modalType, setModalType] = useState("");
  const [selectedVisitor, setSelectedVisitor] = useState(null);
  const [message, setMessage] = useState("");

  const pageSize = 10;

  const filteredVisitors = useMemo(
    () => inviteVisitorsModel.searchVisitors(visitors, searchText),
    [visitors, searchText]
  );

  const totalPages = Math.max(
    1,
    Math.ceil(filteredVisitors.length / pageSize)
  );

  const currentVisitors = filteredVisitors.slice(
    (currentPage - 1) * pageSize,
    currentPage * pageSize
  );

  const handleSearch = (value) => {
    setSearchText(value);
    setCurrentPage(1);
  };

  const changePage = (page) => {
    setCurrentPage(Math.max(1, Math.min(page, totalPages)));
  };

  const openAddModal = () => {
    setSelectedVisitor(null);
    setModalType("add");
  };

  const openViewModal = (visitor) => {
    setSelectedVisitor(visitor);
    setModalType("view");
  };

  const openEditModal = (visitor) => {
    setSelectedVisitor(visitor);
    setModalType("edit");
  };

  const closeModal = () => {
    setModalType("");
    setSelectedVisitor(null);
  };

  const saveVisitor = (formData) => {
    if (modalType === "edit" && selectedVisitor) {
      setVisitors(previous =>
        previous.map(visitor =>
          visitor.id === selectedVisitor.id
            ? { ...visitor, ...formData }
            : visitor
        )
      );
      setMessage("Visitor updated successfully.");
    } else {
      setVisitors(previous =>
        inviteVisitorsModel.addVisitor(previous, formData)
      );
      setMessage("Visitor added successfully.");
      setCurrentPage(1);
    }

    closeModal();
  };

  const deleteVisitor = (visitor) => {
    const confirmed = window.confirm(
      `Are you sure you want to delete ${visitor.visitor}?`
    );

    if (!confirmed) return;

    setVisitors(previous =>
      inviteVisitorsModel.deleteVisitor(previous, visitor.id)
    );

    setMessage("Visitor deleted successfully.");
  };

  const updateStatus = (visitor, status) => {
    setVisitors(previous =>
      inviteVisitorsModel.updateVisitorStatus(
        previous,
        visitor.id,
        status
      )
    );

    setMessage(`Visitor status changed to ${status}.`);
  };

  const handleBulkUpload = (event) => {
    const file = event.target.files?.[0];

    if (!file) return;

    if (!file.name.toLowerCase().endsWith(".csv")) {
      setMessage("Please upload a CSV file.");
      event.target.value = "";
      return;
    }

    const reader = new FileReader();

    reader.onload = (loadEvent) => {
      const text = String(loadEvent.target.result || "");
      const lines = text.trim().split(/\r?\n/);

      const imported = lines.slice(1)
        .filter(Boolean)
        .map((line, index) => {
          const [
            appNo,
            visitor,
            company,
            phone,
            host,
            department,
            visitDate,
            time,
            status
          ] = line.split(",").map(value =>
            value.trim().replace(/^"|"$/g, "")
          );

          return {
            id: Date.now() + index,
            appNo,
            visitor,
            company,
            phone,
            host,
            department,
            visitDate,
            time,
            status: status || "Pending"
          };
        })
        .filter(item => item.visitor);

      setVisitors(previous => [...imported, ...previous]);
      setCurrentPage(1);
      setMessage(`${imported.length} visitors imported.`);
      event.target.value = "";
    };

    reader.readAsText(file);
  };

  const navigateTo = (path) => {
    navigate(path);
  };

  const closeMessage = () => {
    setMessage("");
  };

  const handleLogout = () => {
    sessionStorage.removeItem("isLoggedIn");
    sessionStorage.removeItem("loggedInUser");
    navigate("/login");
  };

  return {
    visitors,
    filteredVisitors,
    currentVisitors,
    searchText,
    currentPage,
    totalPages,
    modalType,
    selectedVisitor,
    message,
    handleSearch,
    changePage,
    openAddModal,
    openViewModal,
    openEditModal,
    closeModal,
    saveVisitor,
    deleteVisitor,
    updateStatus,
    handleBulkUpload,
    navigateTo,
    closeMessage,
    handleLogout
  };
};

export default useInviteVisitorsViewModel;
