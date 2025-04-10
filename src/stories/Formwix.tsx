import React, { useEffect } from "react";
import { TypeFormConfig } from "../components/types";
import Formwix from "../components/Formwix";
import "./formwix.css";
import "../styles.css";
export default function FormwixStory({ config }: { config: TypeFormConfig }) {
  const [defaultValues, setDefaultValues] = React.useState({});
  useEffect(() => {
    setTimeout(() => {
      setDefaultValues({
        skills: ["js", "react"],
        acceptTerms: true,
        gender: "male",
        country: "uk",
        dob: "2000-01-01",
        time: "12:00",
        appointment: "2024-01-01T12:00",
        bio: "Lorem ipsum dolor sit amet, consectetur adipiscing elit",
      });
    }, 2000);
  }, []);
  return (
    <div className="" style={{ padding: "20px" }}>
      <h1 className="text-white">Formwix</h1>
      <Formwix
        config={{
          ...config,
          defaultValues: defaultValues,
        }}
      />
    </div>
  );
}
