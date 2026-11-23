
const initialDevices = [
  {
    id: 1,
    deviceNumber: "1",
    deviceName: "Test",
    location: "daccess office",
    branchName: "Baner",
    ioType: "IN",
    machineType: "In Device"
  }
];

const DeviceListModel = {

  getDevices() {
    return initialDevices.map(device => ({ ...device }));
  },

  addDevice(data, device) {
    return [
      ...data,
      {
        ...device,
        id: Date.now()
      }
    ];
  },

  updateDevice(data, id, updatedDevice) {
    return data.map(device =>
      device.id === id
        ? { ...device, ...updatedDevice }
        : device
    );
  },

  deleteDevice(data, id) {
    return data.filter(device => device.id !== id);
  }

};

export default DeviceListModel;
