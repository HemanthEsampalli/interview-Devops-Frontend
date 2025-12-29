import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams, useNavigate } from "react-router-dom";
import {
  fetchClientProjects,
  setSelectedProject,
} from "../../store/projectSlice";
import ClientActionTabs from "./ClientActionTabs";
import ProjectCard from "../../components/projects/ProjectCard";

export default function ClientProjectList() {
  const { clientId } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { clientProjects, loading } = useSelector((s) => s.project);

  useEffect(() => {
    dispatch(fetchClientProjects(clientId));
  }, [clientId, dispatch]);

  return (
    <div className="space-y-8">
      {/* CLIENT TABS */}
      <ClientActionTabs />

      <div className="p-6">
        <h2 className="text-2xl font-semibold mb-4">Client Projects</h2>

        {loading && <p>Loading projects...</p>}

        {!loading && clientProjects.length === 0 && (
          <p className="text-gray-500 italic">
            No projects found for this client
          </p>
        )}

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {clientProjects.map((project) => (
            <ProjectCard
              key={project.id}
              project={project}
              onView={() => {
                dispatch(setSelectedProject(project));
                navigate(
                  `/admin/user-lists/clients/${clientId}/projects/${project.id}`
                );
              }}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
