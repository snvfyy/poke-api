/**
 * Initializes event listeners for modal interactions.
 * @param modalContainer - The main container element of the modal.
 */
export function initModalEventHandlers(modalContainer: HTMLElement): void {
  const closeModalButton = modalContainer.querySelector(".close-modal-button");
  closeModalButton?.addEventListener("click", () =>
    modalContainer.classList.add("hidden")
  );

  const createButton = modalContainer.querySelector("#createButton");
  createButton?.addEventListener("click", () => {
    const requestsListContainer = modalContainer.querySelector(
      "#requestsListContainer"
    );
    const createFormContainer = modalContainer.querySelector(
      "#createFormContainer"
    );
    requestsListContainer?.classList.add("hidden");
    createFormContainer?.classList.remove("hidden");
  });

  const goBackIcon = modalContainer.querySelector("#goBackIcon");
  goBackIcon?.addEventListener("click", () => {
    const requestsListContainer = modalContainer.querySelector(
      "#requestsListContainer"
    );
    const createFormContainer = modalContainer.querySelector(
      "#createFormContainer"
    );
    createFormContainer?.classList.add("hidden");
    requestsListContainer?.classList.remove("hidden");
  });
}
