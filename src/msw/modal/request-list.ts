import { CustomRequestHandler } from "../../mocks/request.interface";

export async function loadRequestsIntoModal(
  modalContainer: HTMLElement,
  requestsUrl: string
): Promise<void> {
  const response = await fetch(requestsUrl);
  const requests: CustomRequestHandler[] = await response.json();
  const listContainer = modalContainer.querySelector("ul");
  if (listContainer) {
    listContainer.innerHTML = requests
      .map(
        (request) => `
            <li class="py-3 sm:py-4">
                <div class="flex items-center space-x-4">
                    <div class="flex-1 min-w-0">
                        <p class="text-sm font-medium text-gray-900 truncate">${request.method.toUpperCase()} ${
          request.endpoint
        }</p>
                        <p class="text-sm text-gray-500 truncate">${
                          request.description
                        }</p>
                    </div>
                </div>
            </li>
        `
      )
      .join("");
  }
}
