import React from "react";
import { TypeFormConfig } from "../components/types";
import Formwix from "../components/Formwix";
import "./formwix.css";
import "../styles.css";
export default function FormwixStory({ config }: { config: TypeFormConfig }) {
  return (
    <div className="dark bg-dark" style={{ padding: "20px" }}>
      <h1 className="text-white">Formwix</h1>
      <Formwix config={config} />
    </div>
  );
}
