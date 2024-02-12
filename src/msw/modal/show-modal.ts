import { initModalEventHandlers } from "./event-handlers";
import { setupFormSubmission } from "./form-manager";
import { createModal, hideModal, showModal } from "./modal";
import { loadRequestsIntoModal } from "./request-list";

export async function loadAndShowModal(): Promise<void> {
  const modalContainer = await createModal(
    "modal-container",
    "/src/msw/modal/modal.html"
  );
  await loadRequestsIntoModal(
    modalContainer,
    "/src/mocks/requests/requests.json"
  );

  initModalEventHandlers(modalContainer);

  const modalBackdrop = modalContainer.querySelector("#modal-backdrop");
  const closeModalButton = modalContainer.querySelector(".close-modal-button");

  modalBackdrop?.addEventListener("click", () => hideModal(modalContainer));
  closeModalButton?.addEventListener("click", () => hideModal(modalContainer));

  showModal(modalContainer);

  setupFormSubmission("#createForm", (formData) => {
    console.log("Form Data:", formData);
  });
}
