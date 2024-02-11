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
          <p class="text-sm font-medium text-gray-900 truncate">
            ${String(request.method).toUpperCase()} ${request.endpoint}
          </p>
          <p class="text-sm text-gray-500 truncate">
            ${request.description}
          </p>
        </div>
        <div>
          <button class="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-blue-500 hover:bg-blue-600">
            Edit
          </button>
        </div>
      </div>
    </li>
  `
    )
    .join("");

  const closeModalButton = modalContainer.querySelector(".close-modal-button");
  closeModalButton?.addEventListener("click", () => {
    modalContainer?.classList.add("hidden");
  });

  const listContainer = modalContainer.querySelector("ul")!;
  listContainer.innerHTML = requestsHtml;

  return modalContainer;
}

async function showModal() {
  const modalContainer = await createModalContent();
  document.body.appendChild(modalContainer);

  const modalBackdrop = document.getElementById("modal-backdrop")!;
  modalBackdrop.addEventListener("click", hideModal);
}

function hideModal() {
  const modalContainer = document.getElementById("modal-container");
  if (modalContainer) {
    modalContainer.remove();
  }
}

export async function loadAndShowModal() {
  await showModal();

  document
    .getElementById("modal-backdrop")!
    .addEventListener("click", function () {
      hideModal();
    });
}
