
const initialVisitors = [
  {
    id: 1,
    appNo: "JJG3",
    visitor: "Shweta",
    company: "ABC",
    phone: "1234567869",
    host: "Niketan Sayaji Minde",
    department: "IT",
    visitDate: "16 Oct 2026",
    time: "04:42 PM to 05:42 PM",
    status: "Pending"
  },
  {
    id: 2,
    appNo: "27ZU",
    visitor: "Ashutosh",
    company: "IPRO",
    phone: "1234432123",
    host: "Niketan Sayaji Minde",
    department: "IT",
    visitDate: "26 Sep 2026",
    time: "09:40 AM to 10:40 AM",
    status: "Approved"
  },
  {
    id: 3,
    appNo: "8HHS",
    visitor: "Smita",
    company: "ABCD",
    phone: "1232425678",
    host: "Niketan Sayaji Minde",
    department: "IT",
    visitDate: "26 Sep 2026",
    time: "09:36 AM to 10:36 AM",
    status: "Pending"
  },
  {
    id: 4,
    appNo: "6R59",
    visitor: "shyam",
    company: "asdsdfdadd",
    phone: "1234567890",
    host: "Sentorixx global solution",
    department: "IT",
    visitDate: "26 Sep 2026",
    time: "09:34 AM to 10:34 AM",
    status: "Approved"
  },
  {
    id: 5,
    appNo: "YAXS",
    visitor: "niketan",
    company: "sentorixx",
    phone: "7028081243",
    host: "Sentorixx global solution",
    department: "IT",
    visitDate: "21 Jul 2026",
    time: "08:58 PM to 09:58 PM",
    status: "Pending"
  },
  {
    id: 6,
    appNo: "PIVD",
    visitor: "testing",
    company: "wefwerwexyzgmailcom",
    phone: "2342242423",
    host: "Sentorixx global solution",
    department: "IT",
    visitDate: "02 Jul 2026 to 03 Jul 2026",
    time: "",
    status: "Pending"
  },
  {
    id: 7,
    appNo: "BY3Y",
    visitor: "shyam",
    company: "asdsdfdadd",
    phone: "1234567890",
    host: "Sentorixx global solution",
    department: "IT",
    visitDate: "26 Jun 2026",
    time: "05:00 PM to 06:00 PM",
    status: "Pending"
  },
  {
    id: 8,
    appNo: "FIIP",
    visitor: "AJ",
    company: "caadadada",
    phone: "3453535543",
    host: "Sentorixx global solution",
    department: "IT",
    visitDate: "26 Jun 2026",
    time: "04:31 PM to 05:31 PM",
    status: "Approved"
  },
  {
    id: 9,
    appNo: "04H4",
    visitor: "ashutosh",
    company: "Xbiz",
    phone: "7666854391",
    host: "Sentorixx global solution",
    department: "IT",
    visitDate: "26 Jun 2026",
    time: "02:15 PM to 03:15 PM",
    status: "No Approval"
  },
  {
    id: 10,
    appNo: "SMM7",
    visitor: "Ashu",
    company: "asdsfs",
    phone: "9130920045",
    host: "Sentorixx global solution",
    department: "IT",
    visitDate: "26 Jun 2026",
    time: "12:02 PM to 02:00 PM",
    status: "No Approval"
  }
];

const inviteVisitorsModel = {
  getVisitors() {
    return initialVisitors;
  },

  searchVisitors(visitors, searchText) {
    const search = searchText.trim().toLowerCase();

    if (!search) return visitors;

    return visitors.filter(visitor =>
      [
        visitor.appNo,
        visitor.visitor,
        visitor.company,
        visitor.phone,
        visitor.host,
        visitor.status
      ]
        .join(" ")
        .toLowerCase()
        .includes(search)
    );
  },

  addVisitor(visitors, visitor) {
    const newVisitor = {
      ...visitor,
      id: Date.now(),
      status: "Pending"
    };

    return [newVisitor, ...visitors];
  },

  updateVisitorStatus(visitors, id, status) {
    return visitors.map(visitor =>
      visitor.id === id
        ? { ...visitor, status }
        : visitor
    );
  },

  deleteVisitor(visitors, id) {
    return visitors.filter(visitor => visitor.id !== id);
  },

  getVisitorById(visitors, id) {
    return visitors.find(visitor => visitor.id === id);
  }
};

export default inviteVisitorsModel;
