// 🔑 Web App URL from Google Apps Script
const scriptURL = "https://script.google.com/macros/s/AKfycbyYOUR_URL/exec";

function saveEntry() {
  const date = document.getElementById("date").value;
  const shift1 = document.getElementById("shift1").value;
  const shift2 = document.getElementById("shift2").value;

  if (!date) return alert("Please select a date.");
  const data = { date, shift1, shift2 };

  // Save locally
  localStorage.setItem(`entry-${date}`, JSON.stringify(data));

  // Send to Google Sheet
  fetch(scriptURL, {
    method: "POST",
    body: JSON.stringify(data),
    headers: { "Content-Type": "application/json" },
  })
    .then((res) => res.text())
    .then(() => {
      alert("Entry saved and uploaded!");
      displayPreview(date);
    })
    .catch((err) => {
      console.error("Error:", err);
      alert("Saved locally, but failed to upload.");
    });
}

// (the rest of your functions: loadEntry, clearEntry, displayPreview, exportMonthToExcel ...)