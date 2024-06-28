import Topbar from "./Components/topbar/TopBar";
import Home from "./pages/home/Home";
import Single from "./pages/single/Single";
import Write from "./pages/write/Write";
import Settings from "./pages/settings/Settings";
import Login from "./pages/login/Login";
import Register from "./pages/register/Register";
import NotFound from "./pages/notFound/NotFound";
import { Routes, Route } from "react-router-dom";
import { useContext } from "react";
import { Context } from "./context/Context";
import Subscribe from "./pages/subscribe/Subscribe";
import Admin from "./pages/admin/Admin";

function App() {
  const {user} = useContext(Context);
  return (
    <>
      <Topbar />
      <Routes>
        <Route>
          <Route path="/" element={<Home />} />
          <Route path="/post" element={<Home />} />
          <Route path="/subscribe" element={<Subscribe />} />
          <Route path="/register" element={user ? <Home /> : <Register />} />
          <Route path="/login" element={user ? <Home /> : <Login />} />
          <Route path="/post/:id" element={<Single />} />
          <Route path="/write" element={user ? <Write /> : <Login />} />
          <Route path="/settings" element={user ? <Settings /> : <Login />} />
          <Route path="/admin" element={user ? <Admin /> : <Login />} />
          <Route path="*" element={<NotFound />} />
        </Route>
      </Routes>
    </>
  );
}

export default App;