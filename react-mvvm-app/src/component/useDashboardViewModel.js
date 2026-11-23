
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import dashboardModel from "./dashboardModel";

const useDashboardViewModel = () => {
  const navigate = useNavigate();

  const [dashboardData] = useState(() =>
    dashboardModel.getDashboardData()
  );

  const [selectedLocation, setSelectedLocation] = useState("Baner");
  const [language, setLanguage] = useState("D");
  const [notificationCount] = useState(0);
  const [message, setMessage] = useState("");

  const locations = ["Baner", "Pune", "Mumbai"];

  const handleLocationChange = (direction) => {
    const currentIndex = locations.indexOf(selectedLocation);

    const nextIndex =
      direction === "next"
        ? (currentIndex + 1) % locations.length
        : (currentIndex - 1 + locations.length) % locations.length;

    setSelectedLocation(locations[nextIndex]);
  };

  const handleLanguageChange = (value) => {
    setLanguage(value);
  };

  const handleQuickAction = (action) => {
    switch (action) {
      case "approvals":
        navigate("/approvals");
        break;

      case "peak-hours":
        setMessage("Peak visiting hours report selected.");
        break;

      case "blacklisted":
        navigate("/blacklisted-visitors");
        break;

      case "export":
        dashboardModel.exportVisitors(dashboardData.statistics);
        setMessage("Dashboard data exported successfully.");
        break;

      default:
        setMessage("");
    }
  };

  const handleSidebarNavigation = (path) => {
    navigate(path);
  };

  const handleViewAll = () => {
    navigate("/approvals");
  };

  const handleNotifications = () => {
    setMessage("You have no new notifications.");
  };

  const handleProfile = () => {
    setMessage("Profile selected.");
  };

  const handleLogout = () => {
    sessionStorage.removeItem("isLoggedIn");
    sessionStorage.removeItem("loggedInUser");
    navigate("/login");
  };

  return {
    dashboardData,
    selectedLocation,
    language,
    notificationCount,
    message,
    handleLocationChange,
    handleLanguageChange,
    handleQuickAction,
    handleSidebarNavigation,
    handleViewAll,
    handleNotifications,
    handleProfile,
    handleLogout
  };
};

export default useDashboardViewModel;
