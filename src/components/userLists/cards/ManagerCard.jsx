// src/components/userLists/cards/ManagerCard.jsx
import { useNavigate } from "react-router-dom";

export default function ManagerCard({ manager }) {
  const navigate = useNavigate();

  return (
    <div className="bg-white border rounded-lg p-4 shadow space-y-2">
      <h3 className="text-lg font-semibold">
        {manager.firstName} {manager.lastName}
      </h3>

      <p className="text-sm text-gray-600">Department: {manager.department}</p>

      <div className="flex gap-3 pt-2">
        <button
          onClick={() => navigate(`/admin/user-lists/managers/${manager.id}`)}
          className="text-blue-600 text-sm"
        >
          View
        </button>

        <button className="text-green-600 text-sm">Update</button>
        <button className="text-red-600 text-sm">Delete</button>
      </div>
    </div>
  );
}
