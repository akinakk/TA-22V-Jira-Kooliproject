import React, { useState } from "react";
import FeedbackForm from "./components/feedbackForm/FeedbackForm";
import NamePage from "./components/namePage/NamePage";
import { submitData } from "./services/api";
import "./App.css";

function App() {
  const [formData, setFormData] = useState({ nimi: "", rühm: "" });
  const [step, setStep] = useState(1);

  const handleNameSubmit = async (data) => {
    setFormData(data);
    await submitData(data, "students");
    setStep(2);
  };

  return (
    <div className="App">
      {step === 1 ? (
        <NamePage onSubmit={handleNameSubmit} />
      ) : (
        <FeedbackForm formData={formData} />
      )}
    </div>
  );
}

export default App;
