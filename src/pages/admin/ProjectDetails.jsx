import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

export default function ProjectDetails() {
  const navigate = useNavigate();
  const project = useSelector((s) => s.project.selectedProject);

  if (!project) {
    return <p className="p-6">Project not found</p>;
  }

  return (
    <div className="p-6 max-w-4xl space-y-6">
      <button onClick={() => navigate(-1)} className="text-sm text-blue-600">
        ← Back
      </button>

      <div className="bg-white p-6 rounded-lg shadow">
        <h2 className="text-2xl font-semibold">{project.projectName}</h2>
        <p className="text-gray-500">{project.projectCode}</p>

        <div className="grid grid-cols-2 gap-6 mt-6">
          <Detail label="Type" value={project.projectType} />
          <Detail label="Priority" value={project.priority} />
          <Detail label="Risk Level" value={project.riskLevel} />
          <Detail label="Budget" value={project.budget} />
          <Detail label="Status" value={project.status} />
          <Detail label="Progress" value={`${project.progress}%`} />
        </div>

        <div className="mt-6">
          <p className="font-medium">Description</p>
          <p className="text-gray-700">{project.description}</p>
        </div>
      </div>
    </div>
  );
}

function Detail({ label, value }) {
  return (
    <div>
      <p className="text-sm text-gray-500">{label}</p>
      <p className="font-medium">{value || "-"}</p>
    </div>
  );
}
