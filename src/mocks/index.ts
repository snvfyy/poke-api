export const enableMocking = async (): Promise<
  ServiceWorkerRegistration | undefined
> => {
  if (typeof window !== "undefined") {
    const { worker } = await import("./browser");
    return worker.start();
  }
};
