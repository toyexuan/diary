export function delayFor(delay: number, behavior: Function = () => {}) {
  return new Promise<void>(r => {
    setTimeout(() => {
      behavior();
      r();
    }, delay);
  });
}
