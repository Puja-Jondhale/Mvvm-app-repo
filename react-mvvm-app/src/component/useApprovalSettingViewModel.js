
import { useState } from "react";
import { useNavigate } from "react-router-dom";

import ApprovalSettingModel from "./approvalSettingModel";

const useApprovalSettingViewModel = () => {

  const navigate = useNavigate();

  const [settings, setSettings] = useState(
    () => ApprovalSettingModel.getSettings()
  );

  const [message, setMessage] = useState("");

  // UPDATE SETTINGS
  const handleChange = (field, value) => {

    setSettings(previous => ({
      ...previous,
      [field]: value
    }));

    setMessage("");

  };

  // SCHEDULED VISITOR APPROVAL
  const handleScheduledApproval = (value) => {

    setSettings(previous => ({
      ...previous,
      scheduledApproval: value
    }));

    setMessage("");

  };

  // APPROVAL TYPE
  const handleApprovalType = (value) => {

    setSettings(previous => ({
      ...previous,
      approvalType: value
    }));

  };

  // WALK-IN VISITORS
  const handleWalkInVisitors = (value) => {

    setSettings(previous => ({
      ...previous,
      walkInVisitors: value,
      walkInApproval: value
        ? previous.walkInApproval
        : false
    }));

    setMessage("");

  };

  // WALK-IN APPROVAL
  const handleWalkInApproval = (value) => {

    setSettings(previous => ({
      ...previous,
      walkInApproval: value
    }));

    setMessage("");

  };

  // UPDATE BUTTON
  const handleUpdate = () => {

    ApprovalSettingModel.updateSettings(settings);

    setMessage("Approval settings updated successfully.");

  };

  // CANCEL BUTTON
  const handleCancel = () => {

    setSettings(ApprovalSettingModel.getSettings());

    setMessage("");

  };

  // BACK BUTTON
  const handleBack = () => {

    navigate(-1);

  };

  // NEXT BUTTON
  const handleNext = () => {

    navigate("/auth/masters/branch-master-list");

  };

  return {

    settings,
    message,

    handleChange,
    handleScheduledApproval,
    handleApprovalType,
    handleWalkInVisitors,
    handleWalkInApproval,

    handleUpdate,
    handleCancel,
    handleBack,
    handleNext

  };

};

export default useApprovalSettingViewModel;
