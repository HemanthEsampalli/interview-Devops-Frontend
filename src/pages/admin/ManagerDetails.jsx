// src/pages/admin/ManagerDetails.jsx
import { useParams, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import ManagerActionTabs from "../../components/admin/ManagerActionTabs";

export default function ManagerDetails() {
  const { managerId } = useParams();
  const navigate = useNavigate();

  const manager = useSelector((state) =>
    state.userLists.managers.find((m) => String(m.id) === managerId)
  );

  if (!manager) {
    return <div className="p-6 text-red-600">Manager not found</div>;
  }

  return (
    <div className="space-y-6">
      <ManagerActionTabs />

      <div className="p-6 space-y-6">
        <Header title="Manager Profile" onBack={() => navigate(-1)} />

        <Card>
          <Detail label="Name">
            {manager.firstName} {manager.lastName}
          </Detail>
          <Detail label="Email">{manager.email}</Detail>
          <Detail label="Mobile">{manager.mobile}</Detail>
          <Detail label="Department">{manager.department}</Detail>
          <Detail label="Joining Date">{manager.joiningDate}</Detail>
        </Card>
      </div>
    </div>
  );
}

/* ================= UI HELPERS ================= */

function Header({ title, onBack }) {
  return (
    <div className="flex justify-between items-center">
      <h2 className="text-2xl font-semibold">{title}</h2>
      <button
        onClick={onBack}
        className="text-sm text-blue-600 hover:underline"
      >
        ← Back
      </button>
    </div>
  );
}

function Card({ children }) {
  return (
    <div className="bg-white rounded-lg shadow p-6 grid grid-cols-2 gap-6">
      {children}
    </div>
  );
}

function Detail({ label, children }) {
  return (
    <div>
      <p className="text-sm text-gray-500">{label}</p>
      <p className="font-medium">{children}</p>
    </div>
  );
}
