import { Route, Routes } from "react-router-dom";
import HomePage from "@/features/home";
import EditorPage from "@/features/editor";


export default function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/editor" element={<EditorPage />} />
    </Routes>
  )
}