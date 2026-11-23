
const initialAccessPoints = [
  {
    id: 1,
    branchName: "Baner",
    accessPoint: "Dsspl"
  }
];

const AccessPointListModel = {

  getAccessPoints() {
    return initialAccessPoints.map(item => ({ ...item }));
  },

  addAccessPoint(data, branchName, accessPoint) {
    return [
      ...data,
      {
        id: Date.now(),
        branchName,
        accessPoint
      }
    ];
  },

  updateAccessPoint(data, id, branchName, accessPoint) {
    return data.map(item =>
      item.id === id
        ? { ...item, branchName, accessPoint }
        : item
    );
  },

  deleteAccessPoint(data, id) {
    return data.filter(item => item.id !== id);
  }

};

export default AccessPointListModel;
