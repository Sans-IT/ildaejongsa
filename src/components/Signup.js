import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios"; // Import axios
import "./Signup.css";

const StudentRegistrationForm = () => {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    username: "",
    password: "",
    full_name: "",
    age: "",
    address: "",
    phone: "",
    email: "",
    program: "",
    schedule: "",
    scheduleOption: "default",
    role: "student", // Default role is student
    keahlian: "", // Added for instructor expertise
    experience: "", // Added for instructor experience
  });

  const navigate = useNavigate();

  const programSchedules = {
    "Kyokushin Karate": ["Mon/Wed/Fri - 7:00 PM", "Tue/Thu - 6:00 PM"],
    "Muay Thai": ["Tue/Thu - 8:00 PM", "Sat - 10:00 AM"],
    "Krav Maga": ["Mon/Wed - 6:00 PM", "Fri - 8:00 PM"],
    "Taekwondo": ["Tue/Thu - 5:00 PM", "Sat - 12:00 PM"],
    "Gulat": ["Mon/Wed - 8:00 PM", "Fri - 6:00 PM"],
    "Boxing": ["Tue/Thu - 7:00 PM", "Sat - 2:00 PM"],
    "Aikido": ["Mon/Wed/Fri - 5:00 PM", "Sat - 11:00 AM"],
    "Wing Chun": ["Tue/Thu - 4:00 PM", "Sat - 9:00 AM"],
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleRoleChange = (e) => {
    const selectedRole = e.target.value;
    if (formData.username || formData.full_name || formData.phone || formData.email) {
      if (window.confirm("All data entered will be lost. Do you want to continue?")) {
        setFormData({
          ...formData,
          role: selectedRole,
          username: "",
          password: "",
          full_name: "",
          age: "",
          address: "",
          phone: "",
          email: "",
          program: "",
          schedule: "",
          scheduleOption: "default",
          keahlian: "",
          experience: "",
        });
      } else {
        return;
      }
    } else {
      setFormData({ ...formData, role: selectedRole });
    }
  };

  const handleNext = () => {
    if (step === 1) {
      if (!formData.username || !formData.password || !formData.email) {
        alert("Please fill out all required fields in the personal information section.");
        return;
      }
    }
    setStep(step + 1);
  };

  const handlePrevious = () => {
    if (step > 1) {
      setStep(step - 1);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      // Kirim data ke backend menggunakan axios dengan Content-Type header
      const response = await axios.post(
        "http://127.0.0.1:8000/api/signup", 
        formData,
        { headers: { "Content-Type": "application/json" } } // Menambahkan header JSON
      );

      // Cek apakah registrasi berhasil
      if (response.data.success) {
        alert("Registration Successful!");
        navigate("/"); // Navigasi ke halaman utama setelah registrasi berhasil
      } else {
        alert("Registration Failed: " + response.data.message);
      }
    } catch (error) {
      console.error("Error during registration:", error);
      alert("An error occurred during registration. Please try again.");
    }
  };

  return (
    <div className="signup-container">
      <form onSubmit={handleSubmit} className="signup-form">
        <div className="role-selection">
          <label>
            <input
              type="radio"
              name="role"
              value="student"
              checked={formData.role === "student"}
              onChange={handleRoleChange}
            />
            Daftar sebagai Siswa
          </label>
          <label>
            <input
              type="radio"
              name="role"
              value="instructor"
              checked={formData.role === "instructor"}
              onChange={handleRoleChange}
            />
            Daftar sebagai Instruktur
          </label>
        </div>

        {formData.role === "student" && (
          <>
            {step === 1 && (
              <div className="form-section">
                <h2>Student Information</h2>
                <div className="form-grid">
                  <div className="left-column">
                    <input
                      type="text"
                      name="username"
                      placeholder="Username"
                      value={formData.username}
                      onChange={handleChange}
                      required
                    />
                    <input
                      type="password"
                      name="password"
                      placeholder="Password"
                      value={formData.password}
                      onChange={handleChange}
                      required
                    />
                  </div>
                  <div className="right-column">
                    <input
                      type="text"
                      name="full_name"
                      placeholder="Full Name"
                      value={formData.full_name}
                      onChange={handleChange}
                      required
                    />
                    <input
                      type="number"
                      name="age"
                      placeholder="Age"
                      value={formData.age}
                      onChange={handleChange}
                      required
                    />
                    <input
                      type="text"
                      name="address"
                      placeholder="Address"
                      value={formData.address}
                      onChange={handleChange}
                    />
                    <input
                      type="tel"
                      name="phone"
                      placeholder="Phone Number"
                      value={formData.phone}
                      onChange={handleChange}
                    />
                    <input
                      type="email"
                      name="email"
                      placeholder="Email"
                      value={formData.email}
                      onChange={handleChange}
                      required
                    />
                  </div>
                </div>
              </div>
            )}

            {step === 2 && (
              <div className="form-section">
                <h2>Program Details</h2>
                <select
                  name="program"
                  value={formData.program}
                  onChange={handleChange}
                  required
                >
                  <option value="">Select Martial Arts Program</option>
                  {Object.keys(programSchedules).map((program) => (
                    <option key={program} value={program}>
                      {program}
                    </option>
                  ))}
                </select>

                <select
                  name="scheduleOption"
                  value={formData.scheduleOption}
                  onChange={handleChange}
                  required
                >
                  <option value="default">Default Schedule</option>
                  <option value="custom">Custom Schedule</option>
                </select>

                {formData.scheduleOption === "custom" && (
                  <input
                    type="text"
                    name="schedule"
                    placeholder="Preferred Schedule (e.g., Mon/Wed/Fri)"
                    value={formData.schedule}
                    onChange={handleChange}
                  />
                )}

                {formData.scheduleOption === "default" && formData.program && (
                  <div className="default-schedule">
                    <p><strong>{formData.program} Default Schedule:</strong></p>
                    <ul>
                      {programSchedules[formData.program].map((time, index) => (
                        <li key={index}>{time}</li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>
            )}
          </>
        )}

{formData.role === "instructor" && (
  <>
    {step === 1 && (
      <div className="form-section">
        <h2>Instructor Information</h2>
        <div className="form-grid">
          <div className="left-column">
            <input
              type="text"
              name="username"
              placeholder="Username"
              value={formData.username}
              onChange={handleChange}
              required
            />
            <input
              type="password"
              name="password"
              placeholder="Password"
              value={formData.password}
              onChange={handleChange}
              required
            />
          </div>
          <div className="right-column">
            <input
              type="text"
              name="full_name"
              placeholder="Full Name"
              value={formData.full_name}
              onChange={handleChange}
              required
            />
            <input
              type="number"
              name="age"
              placeholder="Age"
              value={formData.age}
              onChange={handleChange}
              required
            />
            <input
              type="text"
              name="address"
              placeholder="Address"
              value={formData.address}
              onChange={handleChange}
            />
            <input
              type="tel"
              name="phone"
              placeholder="Phone Number"
              value={formData.phone}
              onChange={handleChange}
            />
            <input
              type="email"
              name="email"
              placeholder="Email"
              value={formData.email}
              onChange={handleChange}
              required
            />
            <input
              type="text"
              name="keahlian"
              placeholder="Keahlian"
              value={formData.keahlian}
              onChange={handleChange}
              required
            />
            <input
              type="text"
              name="pengalaman"
              placeholder="Pengalaman"
              value={formData.pengalaman}
              onChange={handleChange}
              required
            />
          </div>
        </div>
      </div>
    )}
  </>
)}


        <div className="form-navigation">
          {step > 1 && <button type="button" onClick={handlePrevious}>Previous</button>}
          {step < 2 && <button type="button" onClick={handleNext}>Next</button>}
          {step === 2 && <button type="submit">Submit</button>}
        </div>
      </form>
    </div>
  );
};

export default StudentRegistrationForm;
