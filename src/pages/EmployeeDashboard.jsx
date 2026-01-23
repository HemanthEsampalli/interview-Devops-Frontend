//src/pages/EmployeeDashboard.jsx
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchEmployeeProfile } from "../store/employeeSlice";
import AttendanceCard from "../components/AttendanceCard";
import DailyReportSubmit from "../components/reports/DailyReportSubmit";

export default function EmployeeDashboard() {
  const dispatch = useDispatch();
  const { profile, loading, error } = useSelector((state) => state.employee);
  const [showReport, setShowReport] = useState(false);

  // Fetch profile only once
  useEffect(() => {
    dispatch(fetchEmployeeProfile());
  }, [dispatch]);

  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      <h1 className="text-2xl font-bold mb-4">Employee Dashboard</h1>

      {/* STATUS */}
      {loading && <p>Loading...</p>}
      {error && <p className="text-red-600">{error}</p>}

      {/* PROFILE */}
      {profile && (
        <>
          <div className="p-4 bg-white shadow rounded-lg grid grid-cols-2 gap-4">
            <p><b>Name:</b> {profile.firstName} {profile.lastName}</p>
            <p><b>Email:</b> {profile.email}</p>
            <p><b>Designation:</b> {profile.designation}</p>
            <p><b>Department:</b> {profile.department}</p>
            <p><b>Phone:</b> {profile.mobile}</p>
          </div>

          {/* DAILY REPORT BUTTON */}
          <div className="mt-4">
            <button
              onClick={() => setShowReport(true)}
              className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
            >
              Submit Daily Report
            </button>
          </div>

          {/* ATTENDANCE */}
          {profile?.id && (
            <div className="mt-6">
              <AttendanceCard employeeId={profile.id} />
            </div>
          )}
        </>
      )}

      {/* DAILY REPORT MODAL */}
      {showReport && (
        <DailyReportSubmit onClose={() => setShowReport(false)} />
      )}
    </div>
  );
}
