
 const boxes = document.querySelectorAll('.box img');
    const popup = document.getElementById('popup');
    const popupImg = document.getElementById('popupImg');

    boxes.forEach(img => {
      img.addEventListener('click', e => {
        e.preventDefault();
        popup.style.display = 'flex';
        popupImg.src = img.src;
      });
    });

    function closePopup() {
      popup.style.display = 'none';
    }

const modal = document.getElementById("imageModal");
const modalImg = document.getElementById("modalImg");
const downloadBtn = document.getElementById("downloadBtn");
const closeBtn = document.querySelector(".close");

document.querySelectorAll(".clickable-img").forEach(img => {
  img.addEventListener("click", function () {
    modal.style.display = "block";
    modalImg.src = this.dataset.src;
    downloadBtn.href = this.dataset.src; // Set download link
  });
});

closeBtn.onclick = function () {
  modal.style.display = "none";
};

window.onclick = function (e) {
  if (e.target === modal) {
    modal.style.display = "none";
  }
};
	
