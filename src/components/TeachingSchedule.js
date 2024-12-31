import React, { useState } from "react";
import './TeachingSchedule.css'; // Gaya untuk laman jadwal mengajar

const TeachingSchedule = () => {
  const [scheduleType, setScheduleType] = useState("default");
  const [customSchedule, setCustomSchedule] = useState("");
  const [appliedSchedule, setAppliedSchedule] = useState(""); // Untuk menyimpan jadwal yang diterapkan

  const handleScheduleTypeChange = (event) => {
    setScheduleType(event.target.value);
  };

  const handleCustomScheduleChange = (event) => {
    setCustomSchedule(event.target.value);
  };

  const handleApplyClick = () => {
    setAppliedSchedule(customSchedule); // Menyimpan jadwal yang diterapkan
    setCustomSchedule(""); // Mengosongkan textarea
  };

  const handleEnterKey = (event) => {
    if (event.key === "Enter" && !event.shiftKey) { // Mendeteksi tombol Enter (tanpa shift)
      event.preventDefault(); // Mencegah form submit
      handleApplyClick(); // Terapkan jadwal jika Enter ditekan
    }
  };

  return (
    <div className="teaching-schedule-container">
      <h1 className="schedule-header">Jadwal Mengajar</h1>
      
      <div className="schedule-selection">
        <label>
          <input
            type="radio"
            value="default"
            checked={scheduleType === "default"}
            onChange={handleScheduleTypeChange}
          />
          Jadwal Default
        </label>
        <label>
          <input
            type="radio"
            value="custom"
            checked={scheduleType === "custom"}
            onChange={handleScheduleTypeChange}
          />
          Jadwal Kustom
        </label>
      </div>

      {scheduleType === "custom" && (
        <div className="custom-schedule">
          <h3>Masukkan Jadwal Mengajar Anda</h3>
          <textarea
            value={customSchedule}
            onChange={handleCustomScheduleChange}
            onKeyDown={handleEnterKey} // Menambahkan event listener untuk tombol Enter
            placeholder="Masukkan jadwal mengajar Anda di sini (misalnya: Senin 09:00 - 11:00)"
            rows="5"
            cols="50"
          />
          <button className="apply-button" onClick={handleApplyClick}>
            Terapkan
          </button>
        </div>
      )}

      <div className="schedule-display">
        <h3>Jadwal Mengajar Anda:</h3>
        <p>{scheduleType === "default" ? "Jadwal Default akan ditampilkan di sini." : appliedSchedule || "Tidak ada jadwal yang disediakan."}</p>
      </div>
    </div>
  );
};

export default TeachingSchedule;
