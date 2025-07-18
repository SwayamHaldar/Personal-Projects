document
  .getElementById("SubjectForm")
  .addEventListener("submit", async function func(R) {
    R.preventDefault();
    const ID = document.getElementById("UID").value;
    const Subject = document.getElementById("Subject").value;

    const payload = { ID: ID, subjects: Subject };

    try {
      const res = await fetch("http://localhost:3000/Enroll/add", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      });
      const data = await res.json();
      if (res.ok) {
        alert("Registered: " + data.message);
        document.getElementById("SubjectForm").reset();
      } else {
        alert("Couldn't Register: " + data.error);
      }
    } catch (err) {
      alert("Backend not responding");
      console.error("Request failed: ", err);
    }
  });
/**road.post("/add", async (req, res) => {
  const { ID, subjects } = req.body;
  if (!ID || !subjects) {
    return res.status(400).json({ error: "ID and subjects are required." });
  }

  try {
    const existingStudent = await Student.findOne({ where: { ID: ID } });

    if (!existingStudent) {
      return res.status(404).json({ error: "Student not registered." });
    }

    const subject = await Enrolled.create({
      StudentID: ID,
      Subject: subjects,
    });
  } catch (err) {
    console.error("cant add student.");
    return res.status(500).json("Internal server error.");
  }
}); 


app.use("/Enroll", road);*/
