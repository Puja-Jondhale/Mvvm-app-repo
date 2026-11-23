
const initialMeetings = [
  {
    id: 1,
    title: "Test dashboard",
    date: "2025-12-10",
    fromTime: "04:42 PM",
    toTime: "07:42 PM"
  },
  {
    id: 2,
    title: "Weekly Sales review meeting",
    date: "2026-09-26",
    fromTime: "11:00 AM",
    toTime: "12:00 PM"
  },
  {
    id: 3,
    title: "HR REVIEW",
    date: "2026-10-15",
    fromTime: "06:00 PM",
    toTime: "07:00 PM"
  }
];

const planMeetingModel = {
  getMeetings() {
    return initialMeetings;
  },

  searchMeetings(meetings, searchText) {
    const search = searchText.trim().toLowerCase();

    if (!search) return meetings;

    return meetings.filter(meeting =>
      [
        meeting.title,
        meeting.date,
        meeting.fromTime,
        meeting.toTime
      ]
        .join(" ")
        .toLowerCase()
        .includes(search)
    );
  },

  addMeeting(meetings, meeting) {
    return [
      ...meetings,
      {
        ...meeting,
        id: Date.now()
      }
    ];
  },

  updateMeeting(meetings, id, updatedMeeting) {
    return meetings.map(meeting =>
      meeting.id === id
        ? { ...meeting, ...updatedMeeting }
        : meeting
    );
  },

  deleteMeeting(meetings, id) {
    return meetings.filter(meeting => meeting.id !== id);
  },

  formatDate(dateString) {
    if (!dateString) return "";

    const date = new Date(`${dateString}T00:00:00`);

    return date.toLocaleDateString("en-GB", {
      day: "2-digit",
      month: "short",
      year: "numeric"
    });
  }
 
  
};

export default planMeetingModel;
