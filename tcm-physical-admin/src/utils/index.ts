/**
 *  @description 防抖函数
 * @param func 函数
 * @param wait 等待时间，单位毫秒
 * @returns 防抖后的函数
 */
//eslint-disable-next-line @typescript-eslint/no-explicit-any
export function debounce<T extends (...args: any[]) => void>(
  func: T,
  wait: number,
) {
  let timeout: NodeJS.Timeout;
  return function (this: unknown, ...args: Parameters<T>) {
    clearTimeout(timeout);
    timeout = setTimeout(() => {
      func.apply(this, args);
    }, wait);
  };
}
