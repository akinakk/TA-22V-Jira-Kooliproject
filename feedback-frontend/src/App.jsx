import React from "react";
import FeedbackForm from "./components/feedbackForm/FeedbackForm";
import NamePage from "./components/namePage/NamePage";
import useAppStore from "./components/useAppStore";
import FeedbackPage from "./components/feedbackPage/FeedbackPage";
import "./App.css";

function App() {
  const { step, studentId } = useAppStore();

  return (
    <div className="App">
      {/* {step === 1 ? (
        <NamePage />
      ) : (
        <FeedbackForm studentId={studentId} />
      )} */}
      <FeedbackPage />
    </div>
  );
}

export default App;
