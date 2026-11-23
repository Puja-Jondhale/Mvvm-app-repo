
import { useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import planMeetingModel from "./planMeetingModel";

const emptyForm = {
  title: "",
  date: "",
  fromTime: "",
  toTime: ""
};

const usePlanMeetingViewModel = () => {
  const navigate = useNavigate();

  const [meetings, setMeetings] = useState(() =>
    planMeetingModel.getMeetings()
  );

  const [searchText, setSearchText] = useState("");
  const [modalOpen, setModalOpen] = useState(false);
  const [editingMeeting, setEditingMeeting] = useState(null);
  const [formData, setFormData] = useState(emptyForm);
  const [message, setMessage] = useState("");

  const filteredMeetings = useMemo(
    () => planMeetingModel.searchMeetings(meetings, searchText),
    [meetings, searchText]
  );

  const handleSearch = value => {
    setSearchText(value);
  };

  const handleFormChange = (name, value) => {
    setFormData(previous => ({
      ...previous,
      [name]: value
    }));
  };

  const openAddModal = () => {
    setEditingMeeting(null);
    setFormData({ ...emptyForm });
    setModalOpen(true);
  };

  const openEditModal = meeting => {
    setEditingMeeting(meeting);
    setFormData({
      title: meeting.title,
      date: meeting.date,
      fromTime: meeting.fromTime,
      toTime: meeting.toTime
    });
    setModalOpen(true);
  };

  const closeModal = () => {
    setModalOpen(false);
    setEditingMeeting(null);
    setFormData({ ...emptyForm });
  };

  const saveMeeting = event => {
    event.preventDefault();

    if (!formData.title.trim()) {
      setMessage("Please enter meeting title.");
      return;
    }

    if (!formData.date || !formData.fromTime || !formData.toTime) {
      setMessage("Please complete all meeting details.");
      return;
    }

    if (formData.toTime <= formData.fromTime) {
      setMessage("To time must be later than From time.");
      return;
    }

    if (editingMeeting) {
      setMeetings(previous =>
        planMeetingModel.updateMeeting(
          previous,
          editingMeeting.id,
          formData
        )
      );
      setMessage("Meeting updated successfully.");
    } else {
      setMeetings(previous =>
        planMeetingModel.addMeeting(previous, formData)
      );
      setMessage("Meeting added successfully.");
    }

    closeModal();
  };

  const deleteMeeting = meeting => {
    const confirmed = window.confirm(
      `Are you sure you want to delete "${meeting.title}"?`
    );

    if (!confirmed) return;

    setMeetings(previous =>
      planMeetingModel.deleteMeeting(previous, meeting.id)
    );

    setMessage("Meeting deleted successfully.");
  };

  const navigateTo = path => {
    navigate(path);
  };

  const handleLogout = () => {
    sessionStorage.removeItem("isLoggedIn");
    sessionStorage.removeItem("loggedInUser");
    navigate("/login");
  };

  const closeMessage = () => {
    setMessage("");
  };

  return {
    meetings: filteredMeetings,
    searchText,
    modalOpen,
    editingMeeting,
    formData,
    message,
    handleSearch,
    handleFormChange,
    openAddModal,
    openEditModal,
    closeModal,
    saveMeeting,
    deleteMeeting,
    navigateTo,
    handleLogout,
    closeMessage
  };
};

export default usePlanMeetingViewModel;
