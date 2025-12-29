export default function ProjectCard({ project, onView }) {
  return (
    <div className="bg-white p-5 rounded-lg shadow border hover:shadow-md transition">
      {/* HEADER */}
      <div className="flex justify-between items-start">
        <div>
          <h3 className="text-lg font-semibold text-gray-900">
            {project.projectName}
          </h3>
          <p className="text-sm text-gray-500">Code: {project.projectCode}</p>
        </div>

        <span
          className={`px-2 py-1 text-xs rounded-full font-medium ${
            project.status === "ACTIVE"
              ? "bg-green-100 text-green-700"
              : "bg-gray-100 text-gray-600"
          }`}
        >
          {project.status}
        </span>
      </div>

      {/* DETAILS */}
      <div className="mt-3 grid grid-cols-2 gap-y-2 text-sm text-gray-700">
        <p>
          <b>Type:</b> {project.projectType}
        </p>
        <p>
          <b>Priority:</b> {project.priority}
        </p>
        <p>
          <b>Risk:</b> {project.riskLevel}
        </p>
        <p>
          <b>Budget:</b> ₹{project.budget ?? "-"}
        </p>
      </div>

      {/* ACTION */}
      <div className="mt-4 flex justify-end">
        <button
          onClick={onView}
          className="px-4 py-2 text-sm bg-blue-600 text-white rounded hover:bg-blue-700"
        >
          View
        </button>
      </div>
    </div>
  );
}
