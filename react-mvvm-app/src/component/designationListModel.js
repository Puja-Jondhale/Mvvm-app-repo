
const initialDesignations = [
  { id: 1, designationName: "Service Manager" },
  { id: 2, designationName: "Purchase Executive" },
  { id: 3, designationName: "Accounts Assitant" },
  { id: 4, designationName: "Dot Net Developer" },
  { id: 5, designationName: "Sales Coordinator & Telecalling Executive" },
  { id: 6, designationName: "Safety Officer" },
  { id: 7, designationName: "Store Assitant" },
  { id: 8, designationName: "Software Developer Intern" },
  { id: 9, designationName: "Jr Software Tester" },
  { id: 10, designationName: "QC & Repair Engineer" }
];

const DesignationListModel = {

  getDesignations() {
    return initialDesignations.map(item => ({ ...item }));
  },

  addDesignation(designations, designationName) {
    return [
      ...designations,
      {
        id: Date.now(),
        designationName
      }
    ];
  },

  updateDesignation(designations, id, designationName) {
    return designations.map(item =>
      item.id === id
        ? { ...item, designationName }
        : item
    );
  },

  deleteDesignation(designations, id) {
    return designations.filter(item => item.id !== id);
  }

};

export default DesignationListModel;
