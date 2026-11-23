
const dashboardModel = {
  getDashboardData() {
    return {
      companyName: "Sentorixx global solution pvt ltd",
      location: "Baner",
      welcomeText: "Welcome Sentorixx",

      statistics: [
        { id: 1, title: "Planned visitors", value: 0, type: "planned" },
        { id: 2, title: "Walk-in visitors", value: 0, type: "walkin" },
        { id: 3, title: "Checked in", value: 0, type: "checkedin" },
        { id: 4, title: "Checked out", value: 0, type: "checkedout" },
        { id: 5, title: "Overstay alerts", value: 0, type: "overstay" }
      ],

      approvals: [],

      quickActions: [
        { id: 1, title: "Pending approvals", value: "0 waiting", action: "approvals" },
        { id: 2, title: "Peak visiting hours", value: "View", action: "peak-hours" },
        { id: 3, title: "Blacklisted visitors", value: "0 active", action: "blacklisted" },
        { id: 4, title: "Export today's data", value: "CSV", action: "export" }
      ],

      visitPurposes: [
        { name: "Business Meeting", count: 0 },
        { name: "Interview", count: 0 },
        { name: "Delivery", count: 0 },
        { name: "Other", count: 0 }
      ]
    };
  },

  exportVisitors(statistics) {
    const headers = ["Visitor Type", "Count"];

    const rows = statistics.map(item =>
      `"${item.title}",${item.value}`
    );

    const csv = [headers.join(","), ...rows].join("\n");
    const blob = new Blob([csv], {
      type: "text/csv;charset=utf-8;"
    });

    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");

    link.href = url;
    link.download = "access360-dashboard.csv";
    link.click();

    URL.revokeObjectURL(url);

    return "Dashboard data exported successfully";
  }
};

export default dashboardModel;
