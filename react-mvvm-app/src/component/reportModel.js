
const reportModel = {
  getInitialForm() {
    const today = new Date().toISOString().split("T")[0];

    return {
      reportType: "",
      branch: "",
      startDate: today,
      endDate: today,
      visitorType: "",
      department: ""
    };
  },

  getReportTypes() {
    return [
      { value: "visitor-visited", label: "Visitor Visited Report" },
      { value: "planned-visitor", label: "Planned Visitor Report" },
      { value: "walk-in-visitor", label: "Walk-in Visitor Report" },
      { value: "visitor-history", label: "Visitor History Report" },
      { value: "visitor-checkin", label: "Visitor Check-in Report" },
      { value: "visitor-checkout", label: "Visitor Check-out Report" },
      { value: "overstay", label: "Overstay Report" }
    ];
  },

  getBranches() {
    return [
      { value: "baner", label: "Baner" },
      { value: "pune", label: "Pune" },
      { value: "mumbai", label: "Mumbai" },
      { value: "nashik", label: "Nashik" }
    ];
  },

  getVisitorTypes() {
    return [
      { value: "planned", label: "Planned Visitor" },
      { value: "walk-in", label: "Walk-in Visitor" },
      { value: "employee", label: "Employee" },
      { value: "vendor", label: "Vendor" },
      { value: "guest", label: "Guest" }
    ];
  },

  getDepartments() {
    return [
      { value: "IT", label: "IT" },
      { value: "HR", label: "HR" },
      { value: "Admin", label: "Admin" },
      { value: "Finance", label: "Finance" },
      { value: "Sales", label: "Sales" },
      { value: "Operations", label: "Operations" }
    ];
  },

  validateForm(form) {
    const errors = {};

    if (!form.reportType) {
      errors.reportType = "Please select a report.";
    }

    if (!form.branch) {
      errors.branch = "Please select a branch.";
    }

    if (!form.startDate) {
      errors.startDate = "Please select start date.";
    }

    if (!form.endDate) {
      errors.endDate = "Please select end date.";
    }

    if (
      form.startDate &&
      form.endDate &&
      form.endDate < form.startDate
    ) {
      errors.endDate = "End date cannot be before start date.";
    }

    if (!form.visitorType) {
      errors.visitorType = "Please select visitor type.";
    }

    if (!form.department) {
      errors.department = "Please select department.";
    }

    return errors;
  },

  createReportPayload(form) {
    return {
      reportType: form.reportType,
      branch: form.branch,
      startDate: form.startDate,
      endDate: form.endDate,
      visitorType: form.visitorType,
      department: form.department
    };
  }
};

export default reportModel;
