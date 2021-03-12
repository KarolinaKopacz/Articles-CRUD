export function openModal(modal) {
  modal.classList.add("is-active")
}

export function closeModal(modal) {
  modal.classList.remove("is-active")
  console.log(modal)
}

export function closeModalListener() {
  const modals = document.querySelectorAll(".modal")

  modals.forEach(function (modal) {
    modal.querySelectorAll(".close-modal").forEach((btn) => {
      btn.addEventListener("click", () => {
        closeModal(modal)
      })
    })
  })
}
