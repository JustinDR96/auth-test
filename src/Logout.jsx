// src/Logout.js
import React from "react";
import supabase from "./utils/supabaseClient";

const Logout = () => {
  const handleLogout = async () => {
    const { error } = await supabase.auth.signOut();
    if (error) {
      console.error("Error logging out:", error);
    } else {
      localStorage.removeItem("token");
      console.log("User logged out");
    }
  };

  return <button onClick={handleLogout}>Logout</button>;
};

export default Logout;
