//src/pages/admin/AddEmployeeSalaryDetails.jsx
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { addEmployeeSalary } from "../../store/salarySlice";
import { useState } from "react";
import EmployeeActionTabs from "../../components/admin/EmployeeActionTabs";

export default function AddEmployeeSalaryDetails() {
  const { employeeId } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { loading, error } = useSelector((s) => s.salary);

  const [form, setForm] = useState({
    basicSalary: "",
    hra: "",
    allowance: "",
    deductions: "",
    netSalary: "",
    effectiveFrom: "",
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    await dispatch(
      addEmployeeSalary({
        employeeId: Number(employeeId),
        basicSalary: Number(form.basicSalary),
        hra: Number(form.hra),
        allowance: Number(form.allowance),
        deductions: Number(form.deductions),
        netSalary: Number(form.netSalary),
        effectiveFrom: form.effectiveFrom,
      })
    );

    navigate(`/admin/user-lists/employees/${employeeId}/salary`);
  };

  return (
    <div className="space-y-6">
      <EmployeeActionTabs />

      <div className="p-6 max-w-3xl">
        <h2 className="text-2xl font-semibold mb-4">Add Salary</h2>

        <form
          onSubmit={handleSubmit}
          className="bg-white p-6 rounded shadow grid grid-cols-2 gap-6"
        >
          <input
            name="basicSalary"
            placeholder="Basic Salary"
            className="input-base"
            onChange={handleChange}
            required
          />
          <input
            name="hra"
            placeholder="HRA"
            className="input-base"
            onChange={handleChange}
            required
          />
          <input
            name="allowance"
            placeholder="Allowance"
            className="input-base"
            onChange={handleChange}
          />
          <input
            name="deductions"
            placeholder="Deductions"
            className="input-base"
            onChange={handleChange}
          />
          <input
            name="netSalary"
            placeholder="Net Salary"
            className="input-base"
            onChange={handleChange}
            required
          />
          <input
            type="date"
            name="effectiveFrom"
            className="input-base"
            onChange={handleChange}
            required
          />

          <div className="col-span-2 flex justify-end gap-4">
            <button
              type="button"
              onClick={() => navigate(-1)}
              className="px-4 py-2 border rounded"
            >
              Cancel
            </button>
            <button
              disabled={loading}
              className="px-6 py-2 bg-indigo-600 text-white rounded"
            >
              {loading ? "Saving..." : "Save Salary"}
            </button>
          </div>

          {error && <p className="col-span-2 text-red-600">{error}</p>}
        </form>
      </div>
    </div>
  );
}
