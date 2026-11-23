
import { useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import MeetingVenueModel from "./meetingVenueModel";

const useMeetingVenueViewModel = () => {

  const navigate = useNavigate();

  const [venues, setVenues] = useState(
    () => MeetingVenueModel.getVenues()
  );

  const [search, setSearch] = useState("");

  const [showModal, setShowModal] = useState(false);
  const [editingVenue, setEditingVenue] = useState(null);

  const [venueName, setVenueName] = useState("");
  const [extensionNumber, setExtensionNumber] = useState("");
  const [sittingCapacity, setSittingCapacity] = useState("");

  const [error, setError] = useState("");

  // SEARCH
  const filteredVenues = useMemo(() => {

    const value = search.trim().toLowerCase();

    return venues.filter(venue =>
      venue.venueName.toLowerCase().includes(value) ||
      venue.extensionNumber.toLowerCase().includes(value) ||
      String(venue.sittingCapacity).includes(value)
    );

  }, [venues, search]);

  // RESET FORM
  const resetForm = () => {

    setVenueName("");
    setExtensionNumber("");
    setSittingCapacity("");
    setError("");

  };

  // OPEN ADD MODAL
  const openAddModal = () => {

    setEditingVenue(null);
    resetForm();
    setShowModal(true);

  };

  // OPEN EDIT MODAL
  const openEditModal = venue => {

    setEditingVenue(venue);

    setVenueName(venue.venueName);
    setExtensionNumber(venue.extensionNumber);
    setSittingCapacity(String(venue.sittingCapacity));

    setError("");
    setShowModal(true);

  };

  // CLOSE MODAL
  const closeModal = () => {

    setShowModal(false);
    setEditingVenue(null);
    resetForm();

  };

  // SAVE VENUE
  const saveVenue = event => {

    event.preventDefault();

    const name = venueName.trim();
    const extension = extensionNumber.trim();
    const capacity = Number(sittingCapacity);

    if (!name || !extension || !sittingCapacity.trim()) {
      setError("Please fill all required fields.");
      return;
    }

    if (!/^\d+$/.test(extension)) {
      setError("Extension number must contain digits only.");
      return;
    }

    if (!Number.isInteger(capacity) || capacity <= 0) {
      setError("Sitting capacity must be a positive whole number.");
      return;
    }

    const duplicateName = venues.some(venue =>
      venue.venueName.toLowerCase() === name.toLowerCase() &&
      venue.id !== editingVenue?.id
    );

    if (duplicateName) {
      setError("Meeting venue name already exists.");
      return;
    }

    const duplicateExtension = venues.some(venue =>
      venue.extensionNumber === extension &&
      venue.id !== editingVenue?.id
    );

    if (duplicateExtension) {
      setError("Extension number already exists.");
      return;
    }

    const venueData = {
      venueName: name,
      extensionNumber: extension,
      sittingCapacity: capacity
    };

    if (editingVenue) {

      setVenues(previous =>
        MeetingVenueModel.updateVenue(
          previous,
          editingVenue.id,
          venueData
        )
      );

    } else {

      setVenues(previous =>
        MeetingVenueModel.addVenue(previous, venueData)
      );

    }

    closeModal();

  };

  // DELETE VENUE
  const deleteVenue = id => {

    const confirmed = window.confirm(
      "Are you sure you want to delete this meeting venue?"
    );

    if (!confirmed) return;

    setVenues(previous =>
      MeetingVenueModel.deleteVenue(previous, id)
    );

  };

  // BACK NAVIGATION
  const goBack = () => {
    navigate("/auth/masters/device-master-list");
  };

  // NAVIGATION
  const navigateTo = path => {
    navigate(path);
  };

  return {

    venues,
    filteredVenues,

    search,
    setSearch,

    showModal,
    editingVenue,
    error,

    venueName,
    setVenueName,

    extensionNumber,
    setExtensionNumber,

    sittingCapacity,
    setSittingCapacity,

    openAddModal,
    openEditModal,
    closeModal,

    saveVenue,
    deleteVenue,

    goBack,
    navigateTo

  };

};

export default useMeetingVenueViewModel;
