const scriptURL = "https://script.google.com/macros/s/AKfycbw1irenMRHo7hTt9lRlElJ4ozGgWpXo7H4hmqQScDYuxntSxER37qURv1yfbXVnWtRrWw/exec";

function saveEntry() {
  const date = document.getElementById("date").value;
  const shift1 = document.getElementById("shift1").value;
  const shift2 = document.getElementById("shift2").value;

  if (!date) return alert("Please select a date.");
  const data = { date, shift1, shift2 };

  // Save locally
  localStorage.setItem(`entry-${date}`, JSON.stringify(data));

  // Upload to Google Sheets
  fetch(scriptURL, {
    method: "POST",
    body: JSON.stringify(data),
    headers: { "Content-Type": "application/json" },
  })
  .then(res => res.text())
  .then(msg => alert("Entry saved and uploaded!"))
  .catch(err => {
    console.error(err);
    alert("Saved locally, but failed to upload.");
  });
}
