
const myDashboardModel = {
  getDashboardData() {
    return {
      companyName: "Sentorixx global solution pvt ltd",
      location: "Baner",
      welcomeText: "Welcome Sentorixx",

      statistics: [
        { id: 1, title: "Planned", value: 0, type: "planned", icon: "calendar" },
        { id: 2, title: "Walk-in", value: 0, type: "walkin", icon: "walking" },
        { id: 3, title: "Checked in", value: 0, type: "checkedin", icon: "checkin" },
        { id: 4, title: "Checked out", value: 0, type: "checkedout", icon: "checkout" },
        { id: 5, title: "Overstay", value: 0, type: "overstay", icon: "overstay" }
      ],

      externalAppointments: [],

      internalAppointments: [],

      actionNeeded: [],

      feedback: [
        { id: 1, name: "Ravi M.", rating: 5 },
        { id: 2, name: "Priya S.", rating: 4 },
        { id: 3, name: "Aman K.", rating: 3 }
      ],

      notifications: [],

      meetingTypes: [
        { name: "Planned Visitors", value: 0, color: "#78d84c" },
        { name: "Walk-in Visitors", value: 0, color: "#72e8d1" }
      ],

      reasonsForVisits: [
        { name: "Business Meeting", value: 0 },
        { name: "Interview", value: 0 },
        { name: "Delivery", value: 0 },
        { name: "Other", value: 0 }
      ],

      approvals: []
    };
  },

  getTotalVisitors(statistics) {
    return statistics.reduce(
      (total, item) => total + Number(item.value || 0),
      0
    );
  },

  getVisitPercentages(meetingTypes) {
    const total = meetingTypes.reduce(
      (sum, item) => sum + Number(item.value || 0),
      0
    );

    return meetingTypes.map(item => ({
      ...item,
      percentage: total
        ? Math.round((item.value / total) * 100)
        : 0
    }));
  },

  getReasonMaximum(reasons) {
    return Math.max(
      1,
      ...reasons.map(item => Number(item.value || 0))
    );
  }
};

export default myDashboardModel;
