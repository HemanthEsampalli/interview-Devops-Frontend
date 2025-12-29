// src/components/admin/ManagerActionTabs.jsx
import { NavLink, useParams } from "react-router-dom";

export default function HrActionTabs() {
  const { hrId } = useParams();

  const tabs = [
    {
      label: "PROFILE",
      path: `/admin/user-lists/hrs/${hrId}`,
    },
    {
      label: "SALARY",
      path: `/admin/user-lists/hrs/${hrId}/salary`,
    },
    {
      label: "BANK",
      path: `/admin/user-lists/hrs/${hrId}/bank`,
    },
  ];

  return (
    <div className="keka-nav">
      <div className="keka-nav-inner">
        {tabs.map((tab) => (
          <NavLink
            key={tab.path}
            to={tab.path}
            className={({ isActive }) =>
              `keka-nav-item ${isActive ? "active" : ""}`
            }
          >
            {tab.label}
            <span className="keka-indicator" />
          </NavLink>
        ))}
      </div>
    </div>
  );
}
