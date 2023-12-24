export async function sleep(timer: number) {
  return new Promise<void>((resolve) => {
    setTimeout(() => {
      resolve();
    }, timer);
  });
}
