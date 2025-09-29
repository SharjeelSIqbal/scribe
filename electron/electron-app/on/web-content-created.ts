import { app, shell } from 'electron';

// In this file you can include the rest of your app's specific main process
// code. You can also put them in separate files and import them here.

// Open links in the user's default browser, not in the app window.

app.on('web-contents-created', (_, contents) => {
  contents.setWindowOpenHandler(({ url }) => {
    // open new windows/targets externally
    shell.openExternal(url);
    return { action: 'deny' };
  });

  contents.on('will-navigate', (event, url) => {
    const currentUrl = contents.getURL();
    if (url !== currentUrl) {
      event.preventDefault();
      shell.openExternal(url);
    }
  });
});
