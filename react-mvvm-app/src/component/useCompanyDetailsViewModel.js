
import { useNavigate } from "react-router-dom";
import CompanyDetailsModel from "./companyDetailsModel";

const useCompanyDetailsViewModel = () => {
  const navigate = useNavigate();

  const company = CompanyDetailsModel.getCompanyDetails();

  const information = [
    {
      label: "COMPANY NAME",
      value: company.companyName
    },
    {
      label: "USER NAME/EMAIL ID",
      value: company.email
    },
    {
      label: "PO NO.",
      value: company.poNumber
    },
    {
      label: "INVOICE NO.",
      value: company.invoiceNumber
    },
    {
      label: "GST NO",
      value: company.gstNumber
    },
    {
      label: "SUBSCRIPTION DURATION",
      value: company.subscriptionDuration
    },
    {
      label: "BRANCHES / GATES",
      value: `${company.branches} / ${company.gates}`
    },
    {
      label: "WHATSAPP CREDITS (TOTAL/USED)",
      value: `${company.whatsappTotal} / ${company.whatsappUsed}`
    },
    {
      label: "SMS CREDITS (TOTAL/USED)",
      value: `${company.smsTotal} / ${company.smsUsed}`
    }
  ];

  const goBack = () => {
    navigate("/master-data");
  };

  const goNext = () => {
    // Add the next workflow route here when it is available.
  };

  return {
    company,
    information,
    goBack,
    goNext
  };
};

export default useCompanyDetailsViewModel;
