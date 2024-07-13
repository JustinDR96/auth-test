import React, { useEffect, useState } from "react";
import supabase from "./utils/supabaseClient";
import { useNavigate } from "react-router-dom"; // Assurez-vous d'importer useNavigate si vous utilisez React Router pour la navigation

const Dashboard = () => {
  const [data, setData] = useState(null);
  const navigate = useNavigate(); // Utilisez useNavigate pour la redirection après déconnexion

  useEffect(() => {
    const fetchData = async () => {
      const token = localStorage.getItem("token");
      const response = await fetch(
        "https://ljnwqsjqhyxxwndbyble.supabase.co/rest/v1/users?select=*",
        {
          headers: {
            apikey: import.meta.env.VITE_SUPABASE_ANON_KEY,
            Authorization: `Bearer ${token}`,
          },
        }
      );
      const result = await response.json();
      setData(result);
    };

    fetchData();
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("token");
    supabase.auth.signOut();
    navigate("/login");
  };

  if (!data) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <h1>Protected Data</h1>
      <pre>{JSON.stringify(data, null, 2)}</pre>
      <button onClick={handleLogout}>Logout</button>{" "}
      {/* Bouton de déconnexion */}
    </div>
  );
};

export default Dashboard;
