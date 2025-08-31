const scriptURL = "https://script.google.com/macros/s/AKfycbwhJar4646CRumRin1DyHj2NlQMnqfxnl1VyDqEeo1JKUuZ8_c-cyCd_iSFwMo5xgruDw/exec";

function saveEntry() {
  const date = document.getElementById("date").value;
  const shift1 = document.getElementById("shift1").value;
  const shift2 = document.getElementById("shift2").value;

  if (!date) return alert("Please select a date.");
  const data = { date, shift1, shift2 };

  // Local save
  localStorage.setItem(`entry-${date}`, JSON.stringify(data));

  // Upload to Google Sheets
  fetch(scriptURL, {
    method: "POST",
    body: JSON.stringify(data),
    headers: { "Content-Type": "application/json" },
  })
  .then(res => res.text())
  .then(() => {
    alert("Entry saved and uploaded!");
    displayPreview(date);
  })
  .catch(err => {
    console.error(err);
    alert("Saved locally, but failed to upload.");
  });
}

function loadEntry() {
  const date = document.getElementById("date").value;
  if (!date) return alert("Please select a date.");
  const stored = localStorage.getItem(`entry-${date}`);
  if (!stored) return alert("No entry found.");
  const data = JSON.parse(stored);
  document.getElementById("shift1").value = data.shift1 || "";
  document.getElementById("shift2").value = data.shift2 || "";
  displayPreview(date);
}

function clearEntry() {
  const date = document.getElementById("date").value;
  if (!date) return alert("Please select a date.");
  localStorage.removeItem(`entry-${date}`);
  document.getElementById("shift1").value = "";
  document.getElementById("shift2").value = "";
  document.getElementById("dataPreview").textContent = "";
  alert("Entry cleared!");
}

function displayPreview(date) {
  const data = JSON.parse(localStorage.getItem(`entry-${date}`));
  if (!data) return;
  document.getElementById("dataPreview").textContent =
    `Date: ${date}\nShift 1: ${data.shift1}\nShift 2: ${data.shift2}`;
}
