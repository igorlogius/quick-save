/* global browser */

const manifest = browser.runtime.getManifest();
const extname = manifest.name;

function notify(title, message = "", iconUrl = "icon.png") {
  return browser.notifications.create("" + Date.now(), {
    type: "basic",
    iconUrl,
    title,
    message,
  });
}

browser.menus.create({
  title: "Quick Save",
  contexts: ["link", "image", "video"],
  onclick: (info) => {
    const url = info.srcUrl || info.linkUrl;
    if (typeof url !== "string" || !/^https?:\/\//.test(url)) {
      notify(extname, "No valid URL");
      return;
    }

    //https://developer.mozilla.org/en-US/docs/Mozilla/Add-ons/WebExtensions/API/downloads/download
    browser.downloads.download({
      url,
      saveAs: false,
    });
  },
});
