export function openModal(modal) {
  modal.classList.add("is-active")
}

export function closeModal(modal: HTMLDivElement) {
  modal.classList.remove("is-active")
}

export function closeModalListener() {
  const modals = document.querySelectorAll<HTMLDivElement>(".modal")

  modals.forEach(function (modal) {
    modal.querySelectorAll(".close-modal").forEach((btn) => {
      btn.addEventListener("click", () => {
        closeModal(modal)
      })
    })
  })
}
