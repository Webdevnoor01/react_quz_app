import { BrowserRouter, Route, Routes } from "react-router-dom";
import { AuthProvider } from "../context/AuthContext";
import "../styles/App.css";
import Layout from "./Layout";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Quiz from "./pages/Quiz";
import Result from "./pages/Result";
import Singup from "./pages/Singup";
import PrivateOutlate from "./PrivateOutlate";
import PublicOutlet from "./PublicOutlet";
function App() {
  return (
    <div className="App">
    <BrowserRouter>
      <AuthProvider>
        <Layout>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/*" element={<PublicOutlet />}>
              <Route path="singup" element={<Singup />} />
              <Route path="login" element={<Login />} />
            </Route>
            <Route path="/*" element={<PrivateOutlate />}>
              <Route path="quiz/:id" element={<Quiz />} />
              <Route path="result/:id" element={<Result />} />
            </Route>
          </Routes>
        </Layout>
      </AuthProvider>
    </BrowserRouter>
    </div>
  );
}
export default App;
