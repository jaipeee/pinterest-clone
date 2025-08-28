const dpInput = document.getElementById('dpInput');
  const dpForm = document.getElementById('dpForm');

  dpInput.addEventListener('change', () => {
    dpForm.submit(); // Auto-submit after choosing file
  });