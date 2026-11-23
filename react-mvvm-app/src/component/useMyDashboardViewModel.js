
import { useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import myDashboardModel from "./myDashboardModel";

const useMyDashboardViewModel = () => {
  const navigate = useNavigate();

  const [dashboardData] = useState(() =>
    myDashboardModel.getDashboardData()
  );

  const [locationIndex, setLocationIndex] = useState(0);
  const [language, setLanguage] = useState("D");
  const [approvalEnabled, setApprovalEnabled] = useState(false);
  const [message, setMessage] = useState("");

  const locations = ["Baner", "Pune", "Mumbai"];

  const totalVisitors = useMemo(
    () => myDashboardModel.getTotalVisitors(dashboardData.statistics),
    [dashboardData.statistics]
  );

  const meetingPercentages = useMemo(
    () => myDashboardModel.getVisitPercentages(dashboardData.meetingTypes),
    [dashboardData.meetingTypes]
  );

  const reasonMaximum = useMemo(
    () => myDashboardModel.getReasonMaximum(dashboardData.reasonsForVisits),
    [dashboardData.reasonsForVisits]
  );

  const selectedLocation = locations[locationIndex];

  const changeLocation = (direction) => {
    setLocationIndex(current => {
      if (direction === "next") {
        return (current + 1) % locations.length;
      }

      return (current - 1 + locations.length) % locations.length;
    });
  };

  const handleLanguageChange = (value) => {
    setLanguage(value);
  };

  const navigateTo = (path) => {
    navigate(path);
  };

  const handleScheduleMeeting = () => {
    navigate("/plan-internal-meeting");
  };

  const handleExternalAppointments = () => {
    navigate("/invite-visitor");
  };

  const handleApprovalToggle = () => {
    setApprovalEnabled(current => !current);
  };

  const handleNotifications = () => {
    setMessage(
      dashboardData.notifications.length
        ? "Opening notifications."
        : "No new notifications"
    );
  };

  const handleMessages = () => {
    navigate("/messages");
  };

  const handleProfile = () => {
    setMessage("Profile selected");
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
    dashboardData,
    locations,
    selectedLocation,
    language,
    approvalEnabled,
    message,
    totalVisitors,
    meetingPercentages,
    reasonMaximum,
    changeLocation,
    handleLanguageChange,
    navigateTo,
    handleScheduleMeeting,
    handleExternalAppointments,
    handleApprovalToggle,
    handleNotifications,
    handleMessages,
    handleProfile,
    handleLogout,
    closeMessage
  };
};

export default useMyDashboardViewModel;
