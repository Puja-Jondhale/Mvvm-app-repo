
import { useState } from "react";
import visitorHistoryModel from "./visitorHistoryModel";

const initialForm = {
  visitedDate: "",
  contactNo: "",
  visitorId: ""
};

const useVisitorHistoryViewModel = () => {
  const [form, setForm] = useState(initialForm);
  const [errors, setErrors] = useState({});
  const [history, setHistory] = useState([]);
  const [submitted, setSubmitted] = useState(false);

  const visitorList = visitorHistoryModel.getVisitorList();

  const handleChange = (field, value) => {
    setForm(previous => ({
      ...previous,
      [field]: value
    }));

    setErrors(previous => ({
      ...previous,
      [field]: ""
    }));

    setSubmitted(false);
  };

  const handleCheckDetails = event => {
    event.preventDefault();

    const validationErrors =
      visitorHistoryModel.validateForm(form);

    setErrors(validationErrors);

    if (Object.keys(validationErrors).length > 0) {
      setHistory([]);
      setSubmitted(false);
      return;
    }

    const result = visitorHistoryModel.getHistory(
      form,
      visitorList
    );

    setHistory(result);
    setSubmitted(true);
  };

  const handleReset = () => {
    setForm(initialForm);
    setErrors({});
    setHistory([]);
    setSubmitted(false);
  };

  return {
    form,
    errors,
    visitorList,
    history,
    submitted,
    handleChange,
    handleCheckDetails,
    handleReset
  };
};

export default useVisitorHistoryViewModel;
