import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import SelectionScreen from "@/components/locazen/SelectionScreen";

export default function Home() {
  const navigate = useNavigate();

  const handleSelect = (type) => {
    localStorage.setItem("locazen_visitor", type);
    navigate(`/${type}`);
  };

  return (
    <div className="bg-[#F7F5F2] min-h-screen">
      <SelectionScreen onSelect={handleSelect} />
    </div>
  );
}

