
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import reportModel from "./reportModel";

const useReportViewModel = () => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState(() =>
    reportModel.getInitialForm()
  );

  const [errors, setErrors] = useState({});
  const [message, setMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const reportTypes = reportModel.getReportTypes();
  const branches = reportModel.getBranches();
  const visitorTypes = reportModel.getVisitorTypes();
  const departments = reportModel.getDepartments();

  const handleChange = (field, value) => {
    setFormData(previous => ({
      ...previous,
      [field]: value
    }));

    setErrors(previous => ({
      ...previous,
      [field]: ""
    }));

    setMessage("");
  };

  const handleSubmit = async event => {
    event.preventDefault();

    const validationErrors = reportModel.validateForm(formData);
    setErrors(validationErrors);

    if (Object.keys(validationErrors).length > 0) {
      setMessage("Please complete all required fields.");
      return;
    }

    const payload = reportModel.createReportPayload(formData);

    try {
      setIsLoading(true);

      // Replace this with your actual report API call.
      console.log("Report request payload:", payload);

      setMessage("Report filters submitted successfully.");
    } catch (error) {
      setMessage("Unable to submit report. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  const handleCancel = () => {
    setFormData(reportModel.getInitialForm());
    setErrors({});
    setMessage("");
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
    formData,
    errors,
    message,
    isLoading,
    reportTypes,
    branches,
    visitorTypes,
    departments,
    handleChange,
    handleSubmit,
    handleCancel,
    navigateTo,
    handleLogout,
    closeMessage
  };
};

export default useReportViewModel;
