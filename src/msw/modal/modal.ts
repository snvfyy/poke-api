import { CustomRequestHandler } from "../../mocks/request.interface";

async function createModalContent() {
  const modalContainer = document.createElement("div");
  modalContainer.id = "modal-container";
  const response = await fetch("/src/msw/modal/modal.html");
  const modalHTML = await response.text();

  modalContainer.innerHTML = modalHTML;
  const requestsResponse = await fetch("/src/mocks/requests/requests.json");
  const requests: CustomRequestHandler[] = await requestsResponse.json();

  const requestsHtml = requests
    .map(
      (request) => `
    <li class="py-3 sm:py-4">
      <div class="flex items-center space-x-4">
        <div class="flex-1 min-w-0">
          <p class="text-sm font-medium text-gray-900 truncate">${request.method.toUpperCase()} ${
        request.endpoint
      }</p>
          <p class="text-sm text-gray-500 truncate">${request.description}</p>
        </div>
        <div>
          <button class="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-blue-500 hover:bg-blue-600">Edit</button>
        </div>
      </div>
    </li>
  `
    )
    .join("");

  const listContainer = modalContainer.querySelector("ul");
  if (listContainer) {
    listContainer.innerHTML = requestsHtml;
  }

  const closeModalButton = modalContainer.querySelector(".close-modal-button");
  closeModalButton?.addEventListener("click", () =>
    modalContainer.classList.add("hidden")
  );

  setupCreateButton(modalContainer);
  setupGoBackButton(modalContainer);

  return modalContainer;
}

function setupCreateButton(modalContainer: HTMLElement) {
  const createButton = modalContainer.querySelector("#createButton")!;
  createButton.addEventListener("click", () => {
    const requestsListContainer = modalContainer.querySelector(
      "#requestsListContainer"
    )!;
    const createFormContainer = modalContainer.querySelector(
      "#createFormContainer"
    )!;

    requestsListContainer.classList.add("hidden"); // Hide requests list
    createFormContainer.classList.remove("hidden"); // Show upload form
  });

  const createForm = modalContainer.querySelector("#createForm");
  createForm?.addEventListener("submit", handleFormSubmit);
}

function setupGoBackButton(modalContainer: HTMLElement) {
  const goBackIcon = modalContainer.querySelector("#goBackIcon")!;
  goBackIcon.addEventListener("click", () => {
    const requestsListContainer = modalContainer.querySelector(
      "#requestsListContainer"
    )!;
    const createFormContainer = modalContainer.querySelector(
      "#createFormContainer"
    )!;

    createFormContainer.classList.add("hidden"); // Hide upload form
    requestsListContainer.classList.remove("hidden"); // Show requests list
  });
}

function handleFormSubmit(event: Event) {
  const form = event.currentTarget as HTMLFormElement;
  form.reset();
}

async function showModal() {
  const modalContainer = await createModalContent();
  document.body.appendChild(modalContainer);

  const modalBackdrop = modalContainer.querySelector("#modal-backdrop");
  modalBackdrop?.addEventListener("click", hideModal);
}

function hideModal() {
  const modalContainer = document.getElementById("modal-container");
  modalContainer?.remove();
}

export async function loadAndShowModal() {
  await showModal();
}
