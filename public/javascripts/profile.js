const dpInput = document.getElementById('dpInput');
  const dpForm = document.getElementById('dpForm');

  dpInput.addEventListener('change', () => {
    dpForm.submit();
  });
 function toggleBioEdit() {
    const box = document.getElementById("bioEditBox");
    const input = document.getElementById("bioInput");

    if (box.style.display === "none") {
      input.value = document.getElementById("userBio").innerText;
      box.style.display = "block";
    } else {
      box.style.display = "none";
    }
  }

  async function saveBio() {
    const newBio = document.getElementById("bioInput").value;

    const response = await fetch("/update-bio", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ bio: newBio }),
    });

    const result = await response.json();

    if (result.success) {
      document.getElementById("userBio").innerText = newBio;
      toggleBioEdit();
    } else {
      alert("Error updating bio");
    }
  }