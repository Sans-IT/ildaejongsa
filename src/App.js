import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Route, Routes, Link } from "react-router-dom";
import AboutUs from "./components/AboutUs";
import Gallery from "./components/Gallery";
import Profile from "./components/Profile";
import ContractList from "./components/ContractList";
import RenewContract from "./components/Renewcontract";
import Payroll from "./components/Payroll";
import Program from "./components/Program";
import Home from "./components/Home";
import Loginform from "./components/Loginform";
import SignUp from "./components/Signup";
import ProfileCoach from "./components/Profilecoach"; // Halaman Profile Coach
import CoachPayroll from "./components/CoachPayroll"; // Halaman Coach Payroll
import TeachingSchedule from "./components/TeachingSchedule"; // Halaman Teaching Schedule
import "./App.css";

function App() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(sessionStorage.getItem("isLoggedIn") === "true");
  const [userRole, setUserRole] = useState(sessionStorage.getItem("userRole") || "");

  const toggleMenu = () => setMenuOpen(!menuOpen);

  useEffect(() => {
    const lastActivityTime = parseInt(sessionStorage.getItem("lastActivityTime"), 10);
    if (lastActivityTime) {
      const currentTime = Date.now();
      if (currentTime - lastActivityTime > 10 * 60 * 1000) {
        handleLogout();
      }
    }
    const updateLastActivityTime = () => sessionStorage.setItem("lastActivityTime", Date.now().toString());
    window.addEventListener("focus", updateLastActivityTime);
    window.addEventListener("beforeunload", updateLastActivityTime);

    return () => {
      window.removeEventListener("focus", updateLastActivityTime);
      window.removeEventListener("beforeunload", updateLastActivityTime);
    };
  }, [isLoggedIn]);

  useEffect(() => {
    sessionStorage.setItem("isLoggedIn", isLoggedIn);
  }, [isLoggedIn]);

  const handleLogin = (role) => {
    setIsLoggedIn(true);
    setUserRole(role);
    sessionStorage.setItem("userRole", role);
    sessionStorage.setItem("lastActivityTime", Date.now().toString());
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
    setUserRole("");
    sessionStorage.removeItem("isLoggedIn");
    sessionStorage.removeItem("userRole");
    sessionStorage.removeItem("lastActivityTime");
  };

  return (
    <Router>
      <div className="App">
        <header className="App-header">
          <nav className={`navbar ${isScrolled ? "scrolled" : ""}`}>
            <div className="navbar-left">
              {!isLoggedIn ? (
                <Link to="/">IL DAE JONG SA</Link>
              ) : (
                <span>IL DAE JONG SA</span>
              )}
            </div>
            <div className="hamburger" onClick={toggleMenu}>
              <div></div>
              <div></div>
              <div></div>
            </div>
            <ul className={menuOpen ? "open" : ""}>
              {/* Tampilan Navbar sebelum Login */}
              {!isLoggedIn && (
                <>
                  <li><Link to="/aboutus">About Us</Link></li>
                  <li><Link to="/program">Program</Link></li>
                  <li><Link to="/gallery">Gallery</Link></li>
                  <li><Link to="/login">Login</Link></li>
                  <li><Link to="/signup">Sign Up</Link></li>
                </>
              )}

              {/* Tampilan Navbar setelah Login sebagai Siswa */}
              {isLoggedIn && userRole === "user" && (
                <>
                  <li><Link to="/profile">Profile</Link></li>
                  <li><Link to="/contractlist">Contract List</Link></li>
                  <li><Link to="/renewcontract">Renew Contract</Link></li>
                  <li><Link to="/payroll">Payroll</Link></li>
                  <li><Link to="/" onClick={handleLogout} className="logout-link">Logout</Link></li>
                </>
              )}

              {/* Tampilan Navbar setelah Login sebagai Instruktur */}
              {isLoggedIn && userRole === "instructor" && (
                <>
                  <li><Link to="/profile-coach">Profile Coach</Link></li>
                  <li><Link to="/coach-payroll">Coach Payroll</Link></li> {/* Link baru */}
                  <li><Link to="/teaching-schedule">Teaching Schedule</Link></li> {/* Link ke Teaching Schedule */}
                  <li><Link to="/" onClick={handleLogout} className="logout-link">Logout</Link></li>
                </>
              )}
            </ul>
          </nav>
        </header>
        <main>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/aboutus" element={<AboutUs />} />
            <Route path="/program" element={<Program />} />
            <Route path="/gallery" element={<Gallery />} />
            <Route path="/login" element={<Loginform onLogin={handleLogin} />} />
            <Route path="/signup" element={<SignUp />} />
            <Route path="/profile" element={isLoggedIn ? <Profile /> : <Home />} />
            <Route path="/profile-coach" element={<ProfileCoach />} />
            <Route path="/contractlist" element={isLoggedIn ? <ContractList /> : <Home />} />
            <Route path="/renewcontract" element={isLoggedIn ? <RenewContract /> : <Home />} />
            <Route path="/payroll" element={isLoggedIn ? <Payroll /> : <Home />} />
            <Route path="/coach-payroll" element={isLoggedIn && userRole === "instructor" ? <CoachPayroll /> : <Home />} />
            <Route path="/teaching-schedule" element={isLoggedIn ? <TeachingSchedule /> : <Home />} /> {/* Route untuk Teaching Schedule */}
          </Routes>
        </main>
      </div>
    </Router>
  );
}

export default App;
