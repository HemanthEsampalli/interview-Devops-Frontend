// src/pages/admin/AddEmployeeBankDetails.jsx
import { useParams, useNavigate } from "react-router-dom";
import { useRef } from "react";
// later you can connect redux/api

export default function AddEmployeeBankDetails() {
  const { employeeId } = useParams();
  const navigate = useNavigate();
  const formRef = useRef(null);

  const handleSubmit = (e) => {
    e.preventDefault();

    const payload = {
      employeeId: Number(employeeId),
      bankAccountNumber: e.target.bankAccountNumber.value,
      ifscCode: e.target.ifscCode.value,
      bankName: e.target.bankName.value,
      pfNumber: e.target.pfNumber.value,
      panNumber: e.target.panNumber.value,
      uanNumber: e.target.uanNumber.value,
      epsNumber: e.target.epsNumber.value,
      esiNumber: e.target.esiNumber.value,
    };

    console.log("Employee Bank Details Payload:", payload);

    // later:
    // dispatch(addEmployeeBankDetails(payload));

    navigate(-1);
  };

  return (
    <div className="p-6 max-w-4xl space-y-6">
      {/* HEADER */}
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-semibold">
          Add Bank & Compliance Details
        </h2>
        <button
          onClick={() => navigate(-1)}
          className="text-sm text-blue-600 hover:underline"
        >
          ← Back
        </button>
      </div>

      {/* FORM */}
      <form
        ref={formRef}
        onSubmit={handleSubmit}
        className="bg-white p-6 rounded-lg shadow space-y-6"
      >
        {/* ================= BANK DETAILS ================= */}
        <Section title="Bank Details">
          <div className="grid grid-cols-2 gap-6">
            <Input label="Bank Name *">
              <input
                name="bankName"
                required
                className="input-base"
                placeholder="HDFC Bank"
              />
            </Input>

            <Input label="Bank Account Number *">
              <input
                name="bankAccountNumber"
                required
                className="input-base"
                placeholder="XXXXXXXXXX"
              />
            </Input>

            <Input label="IFSC Code *">
              <input
                name="ifscCode"
                required
                className="input-base"
                placeholder="HDFC0000123"
              />
            </Input>
          </div>
        </Section>

        {/* ================= COMPLIANCE DETAILS ================= */}
        <Section title="Compliance Details">
          <div className="grid grid-cols-2 gap-6">
            <Input label="PF Number">
              <input
                name="pfNumber"
                className="input-base"
                placeholder="PFXXXXXXXX"
              />
            </Input>

            <Input label="PAN Number">
              <input
                name="panNumber"
                className="input-base"
                placeholder="ABCDE1234F"
              />
            </Input>

            <Input label="UAN Number">
              <input
                name="uanNumber"
                className="input-base"
                placeholder="XXXXXXXXXXXX"
              />
            </Input>

            <Input label="EPS Number">
              <input
                name="epsNumber"
                className="input-base"
                placeholder="EPSXXXXXXXX"
              />
            </Input>

            <Input label="ESI Number">
              <input
                name="esiNumber"
                className="input-base"
                placeholder="ESIXXXXXXXX"
              />
            </Input>
          </div>
        </Section>

        {/* ACTION */}
        <div className="flex justify-end pt-4 border-t">
          <button
            type="submit"
            className="px-6 py-2 bg-pink-600 text-white rounded hover:bg-pink-700"
          >
            Save Bank Details
          </button>
        </div>
      </form>
    </div>
  );
}

/* ================= REUSABLE UI ================= */

function Section({ title, children }) {
  return (
    <div>
      <h4 className="text-[13px] font-semibold text-gray-800 uppercase">
        {title}
      </h4>
      <div className="border-b mt-2 mb-6" />
      {children}
    </div>
  );
}

function Input({ label, children }) {
  return (
    <div className="space-y-1">
      <label className="text-sm font-medium text-gray-700">{label}</label>
      {children}
    </div>
  );
}
