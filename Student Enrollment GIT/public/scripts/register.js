document
  .getElementById("StudentForm")
  .addEventListener("submit", async function func(R) {
    R.preventDefault();
    const ID = document.getElementById("UID").value;
    const Name = document.getElementById("Name").value;
    const Email = document.getElementById("Email").value;
    const Phone = document.getElementById("Phone").value;

    const payload = { ID: ID, name: Name, mail: Email, phone: Phone };

    try {
      const res = await fetch("http://localhost:3000/Student/add", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      });
      const data = await res.json();
      if (res.ok) {
        alert("Registered: " + data.message);
        document.getElementById("StudentForm").reset();
      } else {
        alert("Couldn't Register: " + data.error);
      }
    } catch (err) {
      alert("Backend not responding");
      console.error("Request failed: ", err);
    }
  });
