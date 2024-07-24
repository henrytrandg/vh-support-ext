/** CRE: vonhoa.org@gmail.com */

const keepAlive = () => setInterval(chrome.runtime.getPlatformInfo, 20e3);
chrome.runtime.onStartup.addListener(keepAlive);
keepAlive();
console.log("KEEP-ALIVE");
chrome.storage.local.set({getBlumQueryNow: false}); //reset flag
//getBlumQuery();

chrome.runtime.onInstalled.addListener(async ({ reason }) => {
    //await doRefCat();
});

async function getBlumQuery() {
    chrome.storage.local.set({getBlumQueryNow: false}); //reset flag
    await delay(200);
    await execScript("startfs.js");
    await delay(3000);
    await execScript("getQueryValue.js");    
}

async function bypassPixel() {  
  await delay(200);
  await execScript("pixeltap-web.user.js");    
}


async function getCurrentTab() {
    //let queryOptions = { active: true, currentWindow: true };
    let queryOptions = {};
    let activeTab = await chrome.tabs.query(queryOptions);
    if(activeTab != undefined) return activeTab[0];
    else {console.log("Can not get the tab information!"); return null;}
  }
  

chrome.storage.onChanged.addListener(async(changes, namespace) => {
  for (let [key, { oldValue, newValue }] of Object.entries(changes)) {
    
    if(key == "getBlumQueryNow") {
      if(newValue == true) {
        await getBlumQuery();
      }
    }

  }
});

chrome.tabs.onUpdated.addListener(async function () {
  //console.log("TAB UPDATED")
  getCurrentTab().then(async url => {
      if(url.url != undefined) {
        /*if(url.url.includes("6759489228") || url.url.includes("@pixelversexyzbot")) {   
          console.log("PIXEL BYPASS START");
          await bypassPixel();
        }*/
      }      
  })
});


chrome.webRequest.onBeforeRequest.addListener(
  function(details) {
    //CEX AUTHDATA
    if(details.url.includes("getUserInfo")) {
        let postedString = String.fromCharCode.apply(null, new Uint8Array(details.requestBody.raw[0].bytes));
        chrome.storage.local.set({ cexAuthData: postedString });
    }
  },{
    urls: ["<all_urls>"]},
    ["requestBody"]
  
);



async function execScript(fScript) {
	var activeTab = await getCurrentTab();

	await chrome.storage.local.set({ tabId: activeTab.id});

	// Execute script in the current tab
	await chrome.scripting.executeScript({
		target: { tabId: activeTab.id },
		files : [ fScript ]
	})
}

async function delay(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

chrome.webRequest.onBeforeSendHeaders.addListener(
  function(details) {
    //console.log("before request");
    //console.log(details);
    //HAMSTER TOKEN
    if(details.url.includes("api.hamsterkombat.io/auth/me-telegram")) {
        //let postedString = String.fromCharCode.apply(null, new Uint8Array(details.requestBody.raw[0].bytes));
        console.log(details);
        for (var rItem of details.requestHeaders) {
            if(rItem.name == "Authorization") {
                copyToken = rItem.value;
            }
        }
      chrome.storage.local.set({    hamsterToken: copyToken  });
    }
  },{
    urls: ["<all_urls>"]},
    ["requestHeaders", "extraHeaders"]
  
);