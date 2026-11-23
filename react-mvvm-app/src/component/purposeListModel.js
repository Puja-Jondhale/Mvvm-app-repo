
const initialPurposes = [
  { id: 1, purposeName: "Personal Work" },
  { id: 2, purposeName: "Official" },
  { id: 3, purposeName: "Meeting" },
  { id: 4, purposeName: "Maintenance Work" }
];

const PurposeListModel = {

  getPurposes() {
    return initialPurposes.map(item => ({ ...item }));
  },

  addPurpose(purposes, purposeName) {
    return [
      ...purposes,
      {
        id: Date.now(),
        purposeName
      }
    ];
  },

  updatePurpose(purposes, id, purposeName) {
    return purposes.map(item =>
      item.id === id
        ? { ...item, purposeName }
        : item
    );
  },

  deletePurpose(purposes, id) {
    return purposes.filter(item => item.id !== id);
  }

};

export default PurposeListModel;
