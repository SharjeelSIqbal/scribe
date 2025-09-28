import { POLLING_INTERVAL } from '../libs/constants';

/**
 * @date 7/27/2025, 8:01:09 AM
 * @description - Sets polling for os-utils
 * @author siqbal
 * @param {function} utilFunction:(
 * @return {void}
 */
export default function pollingInterval(utilFunction: () => void | Promise<void>) {
  setInterval(async () => {
    await utilFunction();
  }, POLLING_INTERVAL);
}
