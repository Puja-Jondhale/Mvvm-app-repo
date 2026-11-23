
import { useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import DeviceListModel from "./deviceListModel";

const useDeviceListViewModel = () => {

  const navigate = useNavigate();

  const [devices, setDevices] = useState(
    () => DeviceListModel.getDevices()
  );

  const [search, setSearch] = useState("");
  const [currentPage, setCurrentPage] = useState(1);

  const [showModal, setShowModal] = useState(false);
  const [editingDevice, setEditingDevice] = useState(null);

  const [deviceNumber, setDeviceNumber] = useState("");
  const [deviceName, setDeviceName] = useState("");
  const [location, setLocation] = useState("");
  const [branchName, setBranchName] = useState("");
  const [ioType, setIoType] = useState("IN");
  const [machineType, setMachineType] = useState("In Device");

  const [error, setError] = useState("");

  const pageSize = 10;

  // SEARCH
  const filteredDevices = useMemo(() => {

    const value = search.trim().toLowerCase();

    return devices.filter(device =>

      device.deviceNumber.toLowerCase().includes(value) ||
      device.deviceName.toLowerCase().includes(value) ||
      device.location.toLowerCase().includes(value) ||
      device.branchName.toLowerCase().includes(value) ||
      device.ioType.toLowerCase().includes(value) ||
      device.machineType.toLowerCase().includes(value)

    );

  }, [devices, search]);

  // PAGINATION
  const totalPages = Math.max(
    1,
    Math.ceil(filteredDevices.length / pageSize)
  );

  const safePage = Math.min(currentPage, totalPages);

  const paginatedDevices = filteredDevices.slice(
    (safePage - 1) * pageSize,
    safePage * pageSize
  );

  // SEARCH HANDLER
  const handleSearch = value => {
    setSearch(value);
    setCurrentPage(1);
  };

  // RESET FORM
  const resetForm = () => {
    setDeviceNumber("");
    setDeviceName("");
    setLocation("");
    setBranchName("");
    setIoType("IN");
    setMachineType("In Device");
    setError("");
  };

  // ADD DEVICE
  const openAddModal = () => {
    setEditingDevice(null);
    resetForm();
    setShowModal(true);
  };

  // EDIT DEVICE
  const openEditModal = device => {

    setEditingDevice(device);

    setDeviceNumber(device.deviceNumber);
    setDeviceName(device.deviceName);
    setLocation(device.location);
    setBranchName(device.branchName);
    setIoType(device.ioType);
    setMachineType(device.machineType);

    setError("");
    setShowModal(true);

  };

  // CLOSE MODAL
  const closeModal = () => {
    setShowModal(false);
    setEditingDevice(null);
    resetForm();
  };

  // SAVE DEVICE
  const saveDevice = event => {

    event.preventDefault();

    const newDevice = {
      deviceNumber: deviceNumber.trim(),
      deviceName: deviceName.trim(),
      location: location.trim(),
      branchName: branchName.trim(),
      ioType,
      machineType
    };

    if (
      !newDevice.deviceNumber ||
      !newDevice.deviceName ||
      !newDevice.location ||
      !newDevice.branchName
    ) {
      setError("Please fill all required fields.");
      return;
    }

    const duplicate = devices.some(device =>
      device.deviceNumber.toLowerCase() ===
        newDevice.deviceNumber.toLowerCase() &&
      device.id !== editingDevice?.id
    );

    if (duplicate) {
      setError("Device number already exists.");
      return;
    }

    if (editingDevice) {

      setDevices(previous =>
        DeviceListModel.updateDevice(
          previous,
          editingDevice.id,
          newDevice
        )
      );

    } else {

      setDevices(previous =>
        DeviceListModel.addDevice(
          previous,
          newDevice
        )
      );

      setSearch("");
      setCurrentPage(1);

    }

    closeModal();

  };

  // DELETE DEVICE
  const deleteDevice = id => {

    const confirmed = window.confirm(
      "Are you sure you want to delete this device?"
    );

    if (!confirmed) return;

    setDevices(previous =>
      DeviceListModel.deleteDevice(previous, id)
    );

  };

  // PAGINATION
  const goToPage = page => {

    setCurrentPage(
      Math.max(1, Math.min(page, totalPages))
    );

  };

  // BACK TO ACCESS POINT LIST
  const goBack = () => {
    navigate("/auth/masters/access-point-master-list");
  };

  // NEXT TO MEETING VENUE
  const goNext = () => {
    navigate("/auth/masters/meeting-venue-master-list");
  };

  // SIDEBAR NAVIGATION
  const navigateTo = path => {
    navigate(path);
  };

  return {

    devices,
    filteredDevices,
    paginatedDevices,

    search,
    currentPage: safePage,
    totalPages,
    pageSize,

    showModal,
    editingDevice,
    error,

    deviceNumber,
    deviceName,
    location,
    branchName,
    ioType,
    machineType,

    setDeviceNumber,
    setDeviceName,
    setLocation,
    setBranchName,
    setIoType,
    setMachineType,

    handleSearch,
    openAddModal,
    openEditModal,
    closeModal,
    saveDevice,
    deleteDevice,

    goToPage,
    goBack,
    goNext,
    navigateTo

  };

};

export default useDeviceListViewModel;
