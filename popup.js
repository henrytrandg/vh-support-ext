
document.getElementById("btnIFrameUrl").onclick = function() {getIFrameUrl()};

document.getElementById("btnStart").onclick = function() {loadGameInIFrame()};

document.getElementById("btnIframeFix").onclick = function() {fixIFrame()};

document.getElementById("btnBlumQuery").onclick = function() {getBlumQuery()};

document.getElementById("btnHamsterToken").onclick = function() {getHamsterToken()};

async function getCurrentTab() {
    let queryOptions = { active: true, currentWindow: true };
    let activeTab = await chrome.tabs.query(queryOptions);
    return activeTab.id == undefined? activeTab[0]:activeTab;
  }
  
async function execScript(fScript) {
	var activeTab = await getCurrentTab();

	await chrome.storage.local.set({ tabId: activeTab.id});

	// Execute script in the current tab
	await chrome.scripting.executeScript({
		target: { tabId: activeTab.id },
		files : [ fScript ]
	})
}

async function getIFrameUrl() {	
	await execScript("getIframeUrl.js");
  var flag = false;
  for(var i = 0; i<5; i++) {
    await delay(500);
    chrome.storage.local.get(["iframeUrl"]).then((result) => {
      if(result.iframeUrl == undefined) {
        //
      } else {
        alertInfoF(result.iframeUrl);
        copyTextToClipboard(result.iframeUrl);
        alertF("Iframe Url Copied");
        flag = true;
      }
      
    });
    
    if(flag) break;
  }
}

async function loadGameInIFrame() {	
	await execScript("startapp.js");
}

async function fixIFrame() {	
  console.log("FIX IFRAME");
	await execScript("fixIFrame.js");
}

async function getHamsterToken() {
	
	chrome.storage.local.get(["hamsterToken"]).then((result) => {
    if(result.hamsterToken == undefined) {
      alertF("Cannot copy Hamster token. Please restart the game and try again.");
    } else {
      alertInfoF(result.hamsterToken.substring(7));
      copyTextToClipboard(result.hamsterToken.substring(7));
      alertF("Hamster Token Copied");
    }
		
	});
	
}

async function getBlumQuery() {
	chrome.storage.local.set({getBlumQueryNow: true});
}

function alertF(text) {
	
	document.querySelector(".message-area").innerHTML  = text;
	
}

function alertInfoF(text) {
	
	document.querySelector(".message2").innerHTML  = text;
	
}

async function delay(ms) {
	return new Promise(resolve => setTimeout(resolve, ms));
}


function copyTextToClipboard(text) {
  //Create a textbox field where we can insert text to. 
  var copyFrom = document.createElement("textarea");

  //Set the text content to be the text you wished to copy.
  copyFrom.textContent = text;

  //Append the textbox field into the body as a child. 
  //"execCommand()" only works when there exists selected text, and the text is inside 
  //document.body (meaning the text is part of a valid rendered HTML element).
  document.body.appendChild(copyFrom);

  //Select all the text!
  copyFrom.select();

  //Execute command
  document.execCommand('copy');

  //(Optional) De-select the text using blur(). 
  copyFrom.blur();

  //Remove the textbox field from the document.body, so no other JavaScript nor 
  //other elements can get access to this.
  document.body.removeChild(copyFrom);
}
