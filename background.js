/* global browser */

const temporary = browser.runtime.id.endsWith('@temporary-addon'); // debugging?
const manifest = browser.runtime.getManifest();
const extname = manifest.name;

function notify(title, message = "", iconUrl = "icon.png") {
    return browser.notifications.create(""+Date.now(),
        {
           "type": "basic"
            ,iconUrl
            ,title
            ,message
        }
    );
}

browser.menus.create({
  title: 'Direct Save',
  contexts: ['link','image'],
  onclick: (info,tab) => {
      const url = info.srcUrl || info.linkUrl;
      if (typeof url !== 'string' || !/^https?:\/\//.test(url) ) {
        notify(extname, 'No valid URL');
        return;
      }

      //https://developer.mozilla.org/en-US/docs/Mozilla/Add-ons/WebExtensions/API/downloads/download
      browser.downloads.download({
        url,saveAs: false
      });
  }
});

