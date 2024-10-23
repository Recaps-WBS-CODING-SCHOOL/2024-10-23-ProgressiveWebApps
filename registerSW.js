if ('serviceWorker' in navigator) {
  navigator.serviceWorker.register('./serviceworker.js');
}

let installPrompt;

const installBtn = document.getElementById('pwa-install-btn');

const disableInAppInstallPrompt = function () {
  installPrompt = null;
  installButton.setAttribute('hidden', '');
};

window.addEventListener(
  'beforeinstallprompt',
  (event) => {
    console.log('ready to install!');
    installPrompt = event;
    installBtn.removeAttribute('hidden');
  },
  { once: true }
);

installBtn.addEventListener('click', async () => {
  if (!installPrompt) return;

  const result = await installPrompt.prompt();
  console.log('install prompt was: ', result.outcome);
  disableInAppInstallPrompt();
});

window.addEventListener('appinstalled', disableInAppInstallPrompt, { once: true });
