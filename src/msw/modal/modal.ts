export async function createModal(
  modalId: string,
  modalContentUrl: string
): Promise<HTMLElement> {
  const modalContainer = document.createElement("div");
  modalContainer.id = modalId;
  const response = await fetch(modalContentUrl);
  const content = await response.text();
  modalContainer.innerHTML = content;
  return modalContainer;
}

export function showModal(modalContainer: HTMLElement): void {
  document.body.appendChild(modalContainer);
}

export function hideModal(modalContainer: HTMLElement): void {
  modalContainer.remove();
}
