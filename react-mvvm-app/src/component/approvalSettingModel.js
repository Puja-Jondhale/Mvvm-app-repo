
const defaultSettings = {
  scheduledApproval: true,
  approvalType: "employee",
  walkInVisitors: true,
  walkInApproval: false
};

const ApprovalSettingModel = {

  getSettings() {
    const saved = localStorage.getItem("approvalSettings");

    if (saved) {
      try {
        return {
          ...defaultSettings,
          ...JSON.parse(saved)
        };
      } catch {
        return { ...defaultSettings };
      }
    }

    return { ...defaultSettings };
  },

  updateSettings(settings) {
    localStorage.setItem(
      "approvalSettings",
      JSON.stringify(settings)
    );

    return settings;
  },

  resetSettings() {
    localStorage.removeItem("approvalSettings");

    return { ...defaultSettings };
  }

};

export default ApprovalSettingModel;
