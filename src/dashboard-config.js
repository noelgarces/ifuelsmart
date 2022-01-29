import { AiOutlineException } from "react-icons/ai";
import { BiPurchaseTag } from "react-icons/bi";
import { BsCreditCard } from "react-icons/bs";
import { FaMoneyBillAlt } from "react-icons/fa";
import { GiAchievement, GiRoad } from "react-icons/gi";

const dashboardConfig = {
  sk1: {
    customFeatures: [
      {
        name: "Fuel Prices",
        icon: <FaMoneyBillAlt className="flex-shrink-0 h-6 w-6 mr-3 text-gray-400" />,
        route: "/fuel-prices",
        iframeUrl:
          "https://app.powerbi.com/view?r=eyJrIjoiZTM2NmU1YmMtNDUwOS00ZmFmLTk4OWMtNjExMDk4NjNmYWM1IiwidCI6ImE2OTBjMThjLTcyNDYtNDhhNi1iMDUyLTYwMDk2MDg3ZjI2YiIsImMiOjN9",
      },
      {
        name: "Fuel Purchases",
        icon: <BiPurchaseTag className="flex-shrink-0 h-6 w-6 mr-3 text-gray-400" />,
        route: "/fuel-purchases",
        iframeUrl:
          "https://app.powerbi.com/view?r=eyJrIjoiZmViYjBiZWUtYzI5MS00ZDk2LThjOGEtMTQxOTJmOWQyYWIyIiwidCI6ImE2OTBjMThjLTcyNDYtNDhhNi1iMDUyLTYwMDk2MDg3ZjI2YiIsImMiOjN9&pageName=ReportSection",
      },
      {
        name: "Purchase Exceptions",
        icon: <AiOutlineException className="flex-shrink-0 h-6 w-6 mr-3 text-gray-400" />,
        route: "/purchase-exceptions",
        iframeUrl:
          "https://app.powerbi.com/view?r=eyJrIjoiZmViYjBiZWUtYzI5MS00ZDk2LThjOGEtMTQxOTJmOWQyYWIyIiwidCI6ImE2OTBjMThjLTcyNDYtNDhhNi1iMDUyLTYwMDk2MDg3ZjI2YiIsImMiOjN9&pageName=ReportSection85857afba7e6b5a06216",
      },
      {
        name: "Fuel Cards",
        icon: <BsCreditCard className="flex-shrink-0 h-6 w-6 mr-3 text-gray-400" />,
        route: "/fuel-cards",
        iframeUrl:
          "https://app.powerbi.com/view?r=eyJrIjoiNjMwN2Y0ZmYtZDYyZS00NDY5LWJjMzEtYTc0MGVlM2YzMzQzIiwidCI6ImE2OTBjMThjLTcyNDYtNDhhNi1iMDUyLTYwMDk2MDg3ZjI2YiIsImMiOjN9",
      },
      {
        name: "Miles Per Gallon",
        icon: <GiRoad className="flex-shrink-0 h-6 w-6 mr-3 text-gray-400" />,
        route: "/mpg",
        iframeUrl:
          "https://app.powerbi.com/view?r=eyJrIjoiNDMzNzgwNWQtN2ZmMy00MzNmLTlkYzctNzlkOTc1MWEzYjQ2IiwidCI6ImE2OTBjMThjLTcyNDYtNDhhNi1iMDUyLTYwMDk2MDg3ZjI2YiIsImMiOjN9",
      },
      {
        name: "Goals",
        icon: <GiAchievement className="flex-shrink-0 h-6 w-6 mr-3 text-gray-400" />,
        route: "/goals",
        iframeUrl:
          "https://app.powerbi.com/view?r=eyJrIjoiM2I2NmM0YjMtZDgwOC00OGQ2LWFkMGYtNjA0ZTk5ZjlkNTI2IiwidCI6ImE2OTBjMThjLTcyNDYtNDhhNi1iMDUyLTYwMDk2MDg3ZjI2YiIsImMiOjN9",
      },
    ],
  },
  demo: {
    customFeatures: [
      {
        name: "Fuel Prices",
        icon: <FaMoneyBillAlt className="flex-shrink-0 h-6 w-6 mr-3 text-gray-400" />,
        route: "/fuel-prices",
        iframeUrl:
          "https://app.powerbi.com/view?r=eyJrIjoiMzk1MTJkODQtMmQwYy00M2NmLWE3MzMtM2Y0OGE3MWU5MWY4IiwidCI6ImE2OTBjMThjLTcyNDYtNDhhNi1iMDUyLTYwMDk2MDg3ZjI2YiIsImMiOjN9",
      },
      {
        name: "Fuel Purchases",
        icon: <BiPurchaseTag className="flex-shrink-0 h-6 w-6 mr-3 text-gray-400" />,
        route: "/fuel-purchases",
        iframeUrl:
          "https://app.powerbi.com/view?r=eyJrIjoiOTY0NzQzYzQtZDdmZC00NjdkLWFjZjUtM2YxMzdlOTkxYWNhIiwidCI6ImE2OTBjMThjLTcyNDYtNDhhNi1iMDUyLTYwMDk2MDg3ZjI2YiIsImMiOjN9",
      },
      {
        name: "Purchase Exceptions",
        icon: <AiOutlineException className="flex-shrink-0 h-6 w-6 mr-3 text-gray-400" />,
        route: "/purchase-exceptions",
        iframeUrl:
          "https://app.powerbi.com/view?r=eyJrIjoiOTY0NzQzYzQtZDdmZC00NjdkLWFjZjUtM2YxMzdlOTkxYWNhIiwidCI6ImE2OTBjMThjLTcyNDYtNDhhNi1iMDUyLTYwMDk2MDg3ZjI2YiIsImMiOjN9&pageName=ReportSection85857afba7e6b5a06216",
      },
    ],
  },
};

export default dashboardConfig;
