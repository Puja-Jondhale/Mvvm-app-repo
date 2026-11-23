
import React from "react";
import { BrowserRouter, Routes, Route, Navigate,} from "react-router-dom";

import Login from "./component/Login";
import Dashboard from "./component/Dashboard";
import MyDashboard from "./component/MyDashboard";
import InviteVisitors from "./component/InviteVisitors";
import PlanInternalMeeting from "./component/PlanInternalMeeting";
import MasterData from "./component/MasterData";
import Reports from "./component/Reports";
import BlacklistedVisitors from "./component/BlacklistedVisitors";
import VisitorHistory from "./component/VisitorHistory";
import CompanyDetails from "./component/CompanyDetails";
import BranchList from "./component/BranchList";
import EmployeeList from "./component/EmployeeList";
import DepartmentList from "./component/DepartmentList";
import DesignationList from "./component/DesignationList";
import VisitorCategoryList from "./component/VisitorCategoryList";
import PurposeList from "./component/PurposeList";
import AccessPointList from "./component/AccessPointList";
import DeviceList from "./component/DeviceList";
import MeetingVenueList from "./component/MeetingVenueList";
import GateList from "./component/GateList";
import ApprovalSettingMaster from "./component/ApprovalSettingMaster";
const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Navigate to="/login" replace />} />
        <Route path="/login" element={<Login />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/my-dashboard" element={<MyDashboard />} />
        <Route path="/invite-visitor" element={<InviteVisitors />} />
        <Route path="/plan-internal-meeting" element={<PlanInternalMeeting />}/>
        <Route path="/master-data" element={<MasterData />} />
        <Route path="/reports" element={<Reports />} />
        <Route path="/blacklisted-visitors" element={<BlacklistedVisitors />}/>
        <Route path="/visitor-history" element={<VisitorHistory />}/>
        <Route path="/company-details" element={<CompanyDetails />}/>
        <Route path="/branch-master-list" element={<BranchList />}/>
        <Route path="/employee-list" element={<EmployeeList />}/>
        <Route path="/department-master-list" element={<DepartmentList />}/>
        <Route path="/designation-master-list" element={<DesignationList />}/>
        <Route path="/visitor-category-master-list" element={<VisitorCategoryList />}/>
        <Route path="/purpose-master-list" element={<PurposeList />}/>
        <Route path="/access-point-master-list" element={<AccessPointList />}/>
        <Route path="/device-master-list" element={<DeviceList />}/>
        <Route path="/meeting-venue-list" element={<MeetingVenueList />}/>
        <Route path="/gate-master-list" element={<GateList />}/>
        <Route path="/approval-setting-master" element={<ApprovalSettingMaster />}/>
        <Route path="*" element={<Navigate to="/login" replace />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
