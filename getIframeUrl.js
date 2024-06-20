{
    if (document.querySelector("iframe") != undefined) {
        chrome.storage.local.set({iframeUrl: document.querySelector("iframe").src}); 
    } else {
        chrome.storage.local.set({iframeUrl: ""}); 
    }

}