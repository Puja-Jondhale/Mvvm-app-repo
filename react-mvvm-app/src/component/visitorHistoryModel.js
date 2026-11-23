
const visitorHistoryModel = {
  getVisitorList() {
    // Replace this sample list with your visitor API response.
    return [
      { id: 1, name: "Shweta" },
      { id: 2, name: "Ashutosh" },
      { id: 3, name: "Smita" },
      { id: 4, name: "Shyam" }
    ];
  },

  validateForm(form) {
    const errors = {};

    if (!form.visitedDate) {
      errors.visitedDate = "Please select visited date.";
    }

    if (
      form.contactNo &&
      !/^[0-9]{10}$/.test(form.contactNo)
    ) {
      errors.contactNo = "Enter a valid 10-digit contact number.";
    }

    if (!form.visitorId) {
      errors.visitorId = "Please select a visitor.";
    }

    return errors;
  },

  getHistory(form, visitorList) {
    const visitor = visitorList.find(
      item => String(item.id) === String(form.visitorId)
    );

    if (!visitor) return [];

    // Replace with API call using visitedDate, contactNo and visitorId.
    return [
      {
        id: visitor.id,
        visitorName: visitor.name,
        visitedDate: form.visitedDate,
        contactNo: form.contactNo
      }
    ];
  }
};

export default visitorHistoryModel;
