
const masterDataItems = [
  {
    id: 1,
    title: "Company",
    description: "Manage company details and configurations",
    icon: "building",
    color: "blue",
    path: "/master-data/company"
  },
  {
    id: 2,
    title: "Branch",
    description: "Manage branch locations and details",
    icon: "grid",
    color: "purple",
    path: "/master-data/branch"
  },
  {
    id: 3,
    title: "Employee",
    description: "Manage employee information",
    icon: "user",
    color: "green",
    path: "/master-data/employee"
  },
  {
    id: 4,
    title: "Department",
    description: "Manage departments and structure",
    icon: "users",
    color: "orange",
    path: "/master-data/department"
  },
  {
    id: 5,
    title: "Designation",
    description: "Manage designation details",
    icon: "star",
    color: "blue",
    path: "/master-data/designation"
  },
  {
    id: 6,
    title: "Visitor Category",
    description: "Manage visitor categories",
    icon: "qr",
    color: "pink",
    path: "/master-data/visitor-category"
  },
  {
    id: 7,
    title: "Purpose",
    description: "Manage visit purposes",
    icon: "target",
    color: "red",
    path: "/master-data/purpose"
  },
  {
    id: 8,
    title: "Access Point",
    description: "Manage access points",
    icon: "door",
    color: "cyan",
    path: "/master-data/access-point"
  },
  {
    id: 9,
    title: "Device",
    description: "Manage devices and equipment",
    icon: "device",
    color: "blue",
    path: "/master-data/device"
  },
  {
    id: 10,
    title: "Meeting Venue",
    description: "Manage meeting venues",
    icon: "venue",
    color: "blue",
    path: "/master-data/meeting-venue"
  },
  {
    id: 11,
    title: "Gate",
    description: "Manage entry and exit gates",
    icon: "gate",
    color: "green",
    path: "/master-data/gate"
  },
  {
    id: 12,
    title: "Approval Setting",
    description: "Manage approval workflows",
    icon: "approval",
    color: "orange",
    path: "/master-data/approval-setting"
  }
];

const masterDataModel = {
  getMasterDataItems() {
    return masterDataItems;
  },

  getItemById(id) {
    return masterDataItems.find(item => item.id === id);
  }
};

export default masterDataModel;
