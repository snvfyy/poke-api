import { HttpHandler, HttpResponse, http } from "msw";
import { worker } from "./mocks/browser.ts";
import { enableMocking } from "./mocks/index.ts";
import {
  CustomRequestHandler,
  CustomResponse,
  Method,
} from "./mocks/request.interface.ts";
import { loadAndShowModal } from "./msw/modal/modal.ts";
import { displayPokemon } from "./pages/pokemon.ts";

async function enableMswButton() {
  const showModalButton = document.createElement("button");
  showModalButton.textContent = "MSW";
  showModalButton.classList.add(
    "fixed",
    "bottom-4",
    "right-4",
    "bg-blue-500",
    "hover:bg-blue-700",
    "text-white",
    "font-bold",
    "py-2",
    "px-4",
    "rounded",
    "shadow"
  );

  showModalButton.addEventListener("click", loadAndShowModal);

  document.body.appendChild(showModalButton);
}

enableMocking().then(async () => {
  await initApp();
});

async function initApp() {
  await loadMswInterceptors();
  await enableMswButton();

  await displayPokemon("pikachu");
}

async function loadMswInterceptors() {
  const requestsResponse = await fetch("/src/mocks/requests/requests.json");
  const requests: CustomRequestHandler[] = await requestsResponse.json();
  const handlers: HttpHandler[] = [];

  requests.forEach((request: CustomRequestHandler) => {
    const { method, baseURL, endpoint, responses } = request;
    responses.forEach((response: CustomResponse) => {
      const { status, body, default: isDefault } = response;

      if (isDefault) {
        const handler = createHandler(
          method,
          `${baseURL}${endpoint}`,
          status,
          body
        );
        handlers.push(handler);
      }
    });
  });

  worker.use(...handlers);
}

function createHandler(
  method: Method,
  endpoint: string,
  status: number,
  body: any
): HttpHandler {
  return http[method](endpoint, ({}) => {
    return HttpResponse.json(body, { status });
  });
}
