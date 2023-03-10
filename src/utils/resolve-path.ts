import { resolve } from 'path';
import { cwd } from 'process';
// console.log(join(process.cwd(), 'dist', 'client', `index.html`),)
/**
 * resolve client file path
 * @param pathSegments relative path of file in client
 * @returns absolute path of file
 */
export const resolveClientPath = (...pathSegments: string[]) =>
  resolve(cwd(), 'client', ...pathSegments);
/**
 * resolve dist file path
 * @param pathSegments relative path of file in dist
 * @returns absolute path of file
 */
export const resolveDistPath = (...pathSegments: string[]) =>
  resolve(cwd(), 'dist', 'client', ...pathSegments);
