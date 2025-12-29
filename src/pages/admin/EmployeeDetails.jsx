// src/pages/admin/EmployeeDetails.jsx
import { useParams, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import EmployeeActionTabs from "../../components/admin/EmployeeActionTabs";

export default function EmployeeDetails() {
  const { employeeId } = useParams();
  const navigate = useNavigate();

  const employee = useSelector((state) =>
    state.userLists.employees.find((e) => String(e.id) === String(employeeId))
  );

  if (!employee) {
    return <div className="p-6 text-red-600">Employee not found</div>;
  }

  return (
    <div className="space-y-6">
      {/* ACTION TABS */}
      <EmployeeActionTabs />

      <div className="p-6 space-y-6">
        <Header title="Employee Profile" onBack={() => navigate(-1)} />

        <Card>
          <Detail label="Name">
            {employee.firstName} {employee.lastName}
          </Detail>
          <Detail label="Email">{employee.email}</Detail>
          <Detail label="Mobile">{employee.mobile}</Detail>
          <Detail label="Gender">{employee.gender}</Detail>
          <Detail label="Designation">{employee.designation}</Detail>
          <Detail label="Department">{employee.department}</Detail>
          <Detail label="Joining Date">{employee.joiningDate}</Detail>
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
