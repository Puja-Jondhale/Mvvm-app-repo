
import { useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import blacklistedVisitorModel from "./blacklistedVisitorModel";

const useBlacklistedVisitorViewModel = () => {
  const navigate = useNavigate();

  const [visitors, setVisitors] = useState(() =>
    blacklistedVisitorModel.getVisitors()
  );

  const [searchText, setSearchText] = useState("");

  const filteredVisitors = useMemo(
    () => blacklistedVisitorModel.searchVisitors(visitors, searchText),
    [visitors, searchText]
  );

  const handleSearch = value => {
    setSearchText(value);
  };

  const handleWhitelist = visitorId => {
    setVisitors(previous =>
      previous.map(visitor =>
        visitor.id === visitorId
          ? { ...visitor, whitelisted: !visitor.whitelisted }
          : visitor
      )
    );
  };

  const handleExport = () => {
    const csv = blacklistedVisitorModel.exportVisitors(filteredVisitors);
    const blob = new Blob([csv], {
      type: "text/csv;charset=utf-8;"
    });

    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");

    link.href = url;
    link.download = "blacklisted-visitors.csv";
    document.body.appendChild(link);
    link.click();
    link.remove();

    URL.revokeObjectURL(url);
  };

  const navigateTo = path => {
    navigate(path);
  };

  const handleLogout = () => {
    sessionStorage.removeItem("isLoggedIn");
    sessionStorage.removeItem("loggedInUser");
    navigate("/login");
  };

  return {
    visitors: filteredVisitors,
    searchText,
    handleSearch,
    handleWhitelist,
    handleExport,
    navigateTo,
    handleLogout
  };
};

export default useBlacklistedVisitorViewModel;
