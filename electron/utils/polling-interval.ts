import { POLLING_INTERVAL } from '../libs/constants';

export default function pollingInterval(utilFunction: () => void | Promise<void>) {
  setInterval(async () => {
    await utilFunction();
  }, POLLING_INTERVAL);
}
