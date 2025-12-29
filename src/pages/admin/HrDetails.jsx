// src/pages/admin/HrDetails.jsx
import { useParams, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import HrActionTabs from "../../components/admin/HrActionTabs";

export default function HrDetails() {
  const { hrId } = useParams();
  const navigate = useNavigate();

  const hr = useSelector((state) =>
    state.userLists.hrs.find((h) => String(h.id) === hrId)
  );

  if (!hr) {
    return <div className="p-6 text-red-600">HR not found</div>;
  }

  return (
    <div className="space-y-6">
      <HrActionTabs />

      <div className="p-6 space-y-6">
        <Header title="HR Profile" onBack={() => navigate(-1)} />

        <Card>
          <Detail label="Name">
            {hr.firstName} {hr.lastName}
          </Detail>
          <Detail label="Email">{hr.email}</Detail>
          <Detail label="Mobile">{hr.mobile}</Detail>
          <Detail label="Department">{hr.department}</Detail>
          <Detail label="Joining Date">{hr.joiningDate}</Detail>
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
