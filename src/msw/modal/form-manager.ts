/**
 * Sets up form submission handling, including validation and data processing.
 * @param formSelector - The id for the form element.
 * @param onSubmit - A callback function to execute with the form data upon submission.
 */
export function setupFormSubmission(
  formSelector: string,
  onSubmit: (formData: any) => void
): void {
  const form = document.querySelector(formSelector) as HTMLFormElement | null;

  form?.addEventListener("submit", (event) => {
    event.preventDefault();

    const formData = new FormData(form);
    const data = Object.fromEntries(formData.entries());

    onSubmit(data);
    form.reset();
  });
}
