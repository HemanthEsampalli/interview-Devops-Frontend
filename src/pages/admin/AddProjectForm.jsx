// src/pages/admin/AddProjectForm.jsx
import { useDispatch, useSelector } from "react-redux";
import { useParams, useNavigate } from "react-router-dom";
import { useRef, useEffect } from "react";
import { addProject, clearProjectStatus } from "../../store/projectSlice";
import ClientActionTabs from "./ClientActionTabs";

export default function AddProjectForm() {
  const { clientId } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const formRef = useRef(null);

  const { loading, success, error } = useSelector((s) => s.project);

  /* ================= SUBMIT ================= */
  const handleSubmit = async (e) => {
    e.preventDefault();

    const data = {
      clientId: Number(clientId),
      projectName: e.target.projectName.value,
      projectCode: e.target.projectCode.value,
      projectType: e.target.projectType.value,
      description: e.target.description.value,
      startDate: e.target.startDate.value,
      expectedEndDate: e.target.expectedEndDate.value,
      priority: e.target.priority.value,
      budget: Number(e.target.budget.value),
      riskLevel: e.target.riskLevel.value,
      tags: e.target.tags.value,
    };

    const files = {
      quotation: e.target.quotation.files[0],
      requirement: e.target.requirement.files[0],
      contract: e.target.contract.files[0],
    };

    dispatch(addProject({ data, files }));
  };

  /* ================= SUCCESS REDIRECT ================= */
  useEffect(() => {
    if (success) {
      const timer = setTimeout(() => {
        dispatch(clearProjectStatus());
        navigate(`/admin/user-lists/clients/${clientId}/projects`);
      }, 1200); // show success message before redirect

      return () => clearTimeout(timer);
    }
  }, [success, clientId, dispatch, navigate]);

  /* ================= BACK ================= */
  const handleBack = () => {
    dispatch(clearProjectStatus());
    navigate(-1);
  };

  return (
    <div className="space-y-8">
      {/* KEEP CLIENT TABS */}
      <ClientActionTabs />

      <div className="p-6 max-w-5xl space-y-6">
        {/* HEADER */}
        <div className="flex justify-between items-center">
          <h2 className="text-2xl font-semibold">Add Project</h2>
          <button onClick={handleBack} className="text-blue-600 text-sm">
            ← Back
          </button>
        </div>

        {/* FORM */}
        <form
          ref={formRef}
          onSubmit={handleSubmit}
          className="bg-white p-6 rounded-lg shadow space-y-8"
        >
          {/* ================= PROJECT INFO ================= */}
          <Section title="Project Information">
            <div className="grid grid-cols-2 gap-6">
              <Input label="Project Name *">
                <input name="projectName" className="input-base" required />
              </Input>

              <Input label="Project Code *">
                <input name="projectCode" className="input-base" required />
              </Input>

              <Input label="Project Type">
                <select name="projectType" className="input-base">
                  <option value="">Select</option>
                  <option value="WEB_APP">Web Application</option>
                  <option value="MOBILE_APP">Mobile Application</option>
                  <option value="WEB_MOBILE">Web + Mobile</option>
                  <option value="SAAS">SaaS</option>
                  <option value="MAINTENANCE">Maintenance</option>
                </select>
              </Input>

              <Input label="Priority">
                <select name="priority" className="input-base">
                  <option value="">Select</option>
                  <option value="LOW">Low</option>
                  <option value="MEDIUM">Medium</option>
                  <option value="HIGH">High</option>
                  <option value="CRITICAL">Critical</option>
                </select>
              </Input>
            </div>

            <Input label="Description">
              <textarea name="description" className="input-base" />
            </Input>
          </Section>

          {/* ================= TIMELINE ================= */}
          <Section title="Timeline">
            <div className="grid grid-cols-2 gap-6">
              <Input label="Start Date">
                <input type="date" name="startDate" className="input-base" />
              </Input>

              <Input label="Expected End Date">
                <input
                  type="date"
                  name="expectedEndDate"
                  className="input-base"
                />
              </Input>
            </div>
          </Section>

          {/* ================= RISK & BUDGET ================= */}
          <Section title="Risk & Budget">
            <div className="grid grid-cols-3 gap-6">
              <Input label="Budget">
                <input type="number" name="budget" className="input-base" />
              </Input>

              <Input label="Risk Level">
                <select name="riskLevel" className="input-base">
                  <option value="">Select</option>
                  <option value="LOW">Low</option>
                  <option value="MEDIUM">Medium</option>
                  <option value="HIGH">High</option>
                </select>
              </Input>

              <Input label="Tags">
                <input
                  name="tags"
                  className="input-base"
                  placeholder="comma separated"
                />
              </Input>
            </div>
          </Section>

          {/* ================= DOCUMENTS ================= */}
          <Section title="Project Documents">
            <div className="grid grid-cols-3 gap-6">
              <Input label="Quotation *">
                <input type="file" name="quotation" required />
              </Input>

              <Input label="Requirement *">
                <input type="file" name="requirement" required />
              </Input>

              <Input label="Contract *">
                <input type="file" name="contract" required />
              </Input>
            </div>
          </Section>

          {/* ================= ACTION ================= */}
          <div className="flex justify-end pt-6 border-t">
            <button
              disabled={loading}
              className="px-8 py-2.5 bg-pink-600 text-white rounded hover:bg-pink-700 disabled:opacity-60"
            >
              {loading ? "Saving..." : "Add Project"}
            </button>
          </div>

          {/* ================= STATUS ================= */}
          {error && (
            <div className="p-3 bg-red-100 text-red-700 rounded text-sm">
              ❌ {error}
            </div>
          )}

          {success && (
            <div className="p-3 bg-green-100 text-green-700 rounded text-sm">
              ✅ Project added successfully. Redirecting to project list...
            </div>
          )}
        </form>
      </div>
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
