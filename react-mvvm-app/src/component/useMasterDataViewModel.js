
import { useNavigate } from "react-router-dom";

const useMasterDataViewModel = () => {

  const navigate = useNavigate();

  const masterDataItems = [
    {
      id: "company",
      title: "Company",
      description: "Manage company details and configurations",
      icon: "building",
      color: "blue"
    },
    {
      id: "branch",
      title: "Branch",
      description: "Manage branch locations and details",
      icon: "grid",
      color: "purple"
    },
    {
      id: "employee",
      title: "Employee",
      description: "Manage employee information",
      icon: "user",
      color: "green"
    },
    {
      id: "department",
      title: "Department",
      description: "Manage departments and structure",
      icon: "users",
      color: "orange"
    },
    {
      id: "designation",
      title: "Designation",
      description: "Manage designation details",
      icon: "star",
      color: "blue"
    },
    {
      id: "visitor-category",
      title: "Visitor Category",
      description: "Manage visitor categories",
      icon: "qr",
      color: "pink"
    },
    {
      id: "purpose",
      title: "Purpose",
      description: "Manage visit purposes",
      icon: "target",
      color: "red"
    },
    {
      id: "access-point",
      title: "Access Point",
      description: "Manage access points",
      icon: "door",
      color: "cyan"
    },
    {
      id: "device",
      title: "Device",
      description: "Manage devices and equipment",
      icon: "device",
      color: "blue"
    },
    {
      id: "meeting-venue",
      title: "Meeting Venue",
      description: "Manage meeting venues",
      icon: "venue",
      color: "blue"
    },
    {
      id: "gate",
      title: "Gate",
      description: "Manage entry and exit gates",
      icon: "gate",
      color: "green"
    },
    {
      id: "approval",
      title: "Approval Setting",
      description: "Manage approval workflows",
      icon: "approval",
      color: "orange"
    }
  ];

  // NAVIGATION BUSINESS LOGIC

  const navigateTo = (path) => {
    navigate(path);
  };

  // OTHER MASTER DATA NAVIGATION

  const openMasterData = (item) => {
    if (item.id === "company") {
      navigate("/company-details");
      return;
    }
    if (item.id === "branch") {
      navigate("/branch-master-list");
      return;
    }
    if (item.id === "employee"){
      navigate("/employee-list");
      return;
    }
    if (item.id === "department"){
      navigate("/department-master-list");
      return;
    }
    if( item.id === "designation"){
      navigate("/designation-master-list");
      return;
    }
    if(item.id === "visitor-category"){
      navigate("/visitor-category-master-list");
      return;
    }
    if( item.id === "purpose"){
      navigate("/purpose-master-list");
      return;
    }
    if(item.id ==="access-point"){
      navigate("/access-point-master-list");
      return;
    }
    if(item.id ==="device"){
      navigate("/device-master-list");
      return;
    }
    if(item.id ==="meeting-venue"){
      navigate("/meeting-venue-list");
      return;
    }
    if(item.id ==="gate"){
      navigate("/gate-master-list");
      return;
    }
    if (item.id === "approval-setting-master") {
      navigate("/approval-setting-master");
      return;
    }
    

    const routes = {
      branch: "/branch",
      employee: "/employee",
      department: "/department",
      designation: "/designation",
      "visitor-category": "/visitor-category",
      purpose: "/purpose",
      "access-point": "/access-point",
      device: "/device",
      "meeting-venue": "/meeting-venue",
      gate: "/gate",
      approval: "/approval-setting-master"
    };

    const path = routes[item.id];

    if (path) {
      navigate(path);
    }
  };

  return {
    masterDataItems,
    navigateTo,
    openMasterData
  };
};

export default useMasterDataViewModel;
