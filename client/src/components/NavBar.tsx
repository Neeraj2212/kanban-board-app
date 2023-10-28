import { useContext } from "react";
import { UserContext } from "@src/contexts/UserContext";
import { useNavigate } from "react-router-dom";

export default function NavBar() {
  const { user, logout } = useContext(UserContext);
  const navigate = useNavigate();

  return (
    <nav className="flex gap-x-4 bg-secondary justify-between items-center p-5 text-lg">
      <div className="text-lg">
        <p>Welcome {user?.username}</p>
      </div>
      <div className="flex items-center justify-center">
        <button
          className="bg-primary px-4 py-2 rounded-md font-bold"
          onClick={() => {
            logout();
            navigate("/login");
          }}
        >
          Logout
        </button>
      </div>
    </nav>
  );
}
