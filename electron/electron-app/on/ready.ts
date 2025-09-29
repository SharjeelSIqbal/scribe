import { app } from 'electron';
import electronLog from 'electron-log';
import { baseDir, docsDir } from '../../main';
import pollingInterval from '../../utils/polling-interval';
import { getDiagnostics } from '../../utils/resource-manager';

app.on('ready', () => {
  electronLog.transports.file.level = 'info';
  electronLog.info('App starting...');
  electronLog.info('App root:', process.env.APP_ROOT);
  electronLog.info('User data path:', baseDir);
  electronLog.info('Notes directory:', docsDir);
  electronLog.info('Log file:', electronLog.transports.file.getFile().path);
  electronLog.info('Environment:', process.env.NODE_ENV);
  electronLog.info('Version:', app.getVersion());
});

app.on('ready', function () {
  pollingInterval(getDiagnostics);
});
