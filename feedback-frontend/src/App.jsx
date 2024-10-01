import React from "react";
import FeedbackForm from "./components/feedbackForm/FeedbackForm";
import NamePage from "./components/namePage/NamePage";
import useAppStore from "./components/useAppStore";
import "./App.css";

function App() {
  const { step } = useAppStore();

  return (
    <div className="App">
      {step === 1 ? (
        <NamePage />
      ) : (
        <FeedbackForm />
      )}
    </div>
  );
}

export default App;
