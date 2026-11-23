
const initialGates = [
  {
    id: 1,
    branchName: "Baner",
    gateName: "Main Entry Gate"
  }
];

const GateModel = {

  getGates() {
    return initialGates.map(gate => ({ ...gate }));
  },

  addGate(gates, gateData) {
    return [
      ...gates,
      {
        ...gateData,
        id: Date.now()
      }
    ];
  },

  updateGate(gates, id, gateData) {
    return gates.map(gate =>
      gate.id === id
        ? { ...gate, ...gateData }
        : gate
    );
  },

  deleteGate(gates, id) {
    return gates.filter(gate => gate.id !== id);
  }

};

export default GateModel;
