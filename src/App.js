import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import Home from "./profile/pages/Home";
import AboutMe from "./profile/pages/AboutMe";
import AllMyJob from "./profile/pages/AllMyJob";
import ServicesPage from "./profile/pages/ServicesPage";
import AdminProfile from "./admin/pages/AdminProfile";
import CustomersList from "./admin/pages/CustomersList";
import BudgetList from "./admin/pages/BudgetList";
import Budget from "./admin/pages/Budget";
import Login from "./admin/Auth/Login";
import RequireAuth from "./admin/Auth/RequireAuth";
import AdminAuth from "./admin/Auth/AdminAuth";
import AuthProvider from "./admin/Auth/AuthProvider";
import Logout from "./admin/Auth/Logout";

import Contact from "./profile/pages/Contact";
import PageEditor from "./admin/pages/PageEditor";

function App() {
  return (
    <AuthProvider>
      <div className="App">
        <main>
          <Router>
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/about-me" element={<AboutMe />} />
              <Route path="/services" element={<ServicesPage />} />
              <Route path="/all-my-job" element={<AllMyJob />} />
              <Route path="/contact" element={<Contact />} />
              <Route path="/login" element={<Login />} />

              {/* Rutas protegidas */}
              <Route
                path="/admin"
                element={
                  <AdminAuth>
                    <AdminProfile />
                  </AdminAuth>
                }
              />
              <Route
                path="/page-editor"
                element={
                  <AdminAuth>
                    <PageEditor />
                  </AdminAuth>
                }
              />
              <Route
                path="/customers-list"
                element={
                  <AdminAuth>
                    <CustomersList />
                  </AdminAuth>
                }
              />
              <Route
                path="/budget-list"
                element={
                  <AdminAuth>
                    <BudgetList />
                  </AdminAuth>
                }
              />
              <Route
                path="/budget/:id"
                element={
                  <RequireAuth>
                    <AdminAuth>
                      <Budget />
                    </AdminAuth>
                  </RequireAuth>
                }
              />
              <Route
                path="/logout"
                element={
                  <RequireAuth>
                    <AdminAuth>
                      <Logout />
                    </AdminAuth>
                  </RequireAuth>
                }
              />
              {/* Ruta de comodín */}
              <Route path="*" element={<Navigate to="/" />} />
            </Routes>
          </Router>
        </main>
      </div>
    </AuthProvider>
  );
}

export default App;
