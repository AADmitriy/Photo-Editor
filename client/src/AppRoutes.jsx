import { Route, Routes } from "react-router-dom";
import HomePage from "@/pages/Home/HomePage";
import EditorPage from "@/pages/Editor/EditorPage";


export default function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/editor" element={<EditorPage />} />
    </Routes>
  )
}