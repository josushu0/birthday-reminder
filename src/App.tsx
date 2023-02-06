import { Route, Routes } from "react-router-dom"
import Home from "./pages/Home"
import NewBirthday from "./pages/NewBirthday"

function App() {
  return (
    <Routes>
      <Route path="/" element={ <Home/> } />
      <Route path="/new" element={ <NewBirthday/> } />
    </Routes>
  )
}

export default App
