
const blacklistedVisitorModel = {
  getVisitors() {
    return [];
  },

  searchVisitors(visitors, searchText) {
    const search = searchText.trim().toLowerCase();

    if (!search) return visitors;

    return visitors.filter(visitor =>
      [
        visitor.name,
        visitor.firm,
        visitor.contact,
        visitor.visitedDate
      ]
        .join(" ")
        .toLowerCase()
        .includes(search)
    );
  },

  exportVisitors(visitors) {
    const headers = [
      "Sr No",
      "Visitor Name",
      "Visitor Firm",
      "Visitor Contact",
      "Visited Date",
      "Whitelist"
    ];

    const rows = visitors.map((visitor, index) => [
      index + 1,
      visitor.name,
      visitor.firm,
      visitor.contact,
      visitor.visitedDate,
      visitor.whitelisted ? "Yes" : "No"
    ]);

    const escapeCsv = value =>
      `"${String(value ?? "").replace(/"/g, '""')}"`;

    return [
      headers.map(escapeCsv).join(","),
      ...rows.map(row => row.map(escapeCsv).join(","))
    ].join("\n");
  }
};

export default blacklistedVisitorModel;
