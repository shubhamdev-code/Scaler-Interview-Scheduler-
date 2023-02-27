import { Route, Routes } from "react-router-dom";
import Home from "./components/Home";

import InterviewEdit from "./components/interviewEdit";

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/interview-edit/:id" element={<InterviewEdit />} />
      </Routes>
    </>
  );
}

export default App;
