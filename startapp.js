

{
	const iframe = document.querySelector("iframe");
	
	if (iframe) {
		const src = iframe.getAttribute("src");
		const newSrc = src.replace(
			/tgWebAppPlatform=[^&]*/,
			"tgWebAppPlatform=android"
		);
		iframe.setAttribute("src", newSrc);
		if(document.querySelector(".MenuItem:first-child") != undefined) {
			document.querySelector(".MenuItem:first-child").click();
		} else {
			document.querySelector(".popup .btn-menu-toggle").click();
			setTimeout(function(){document.querySelector(".popup .btn-menu-toggle .btn-menu-item:first-child").click();}, 2500);

			/*delay(1500);
			let failMess = document.querySelector(".popupCoinCount");
			if(failMess != undefined && failMess.innerHTML == 'Failed to authorise') {
				window.location.reload();
			}*/

		}
		
	}


	function delay(ms) {
		return new Promise(resolve => setTimeout(resolve, ms));
	}

}

/*
{
let iframe = document.querySelector("iframe");
if (iframe && iframe.hasAttribute("src")) {
    let modifiedSrc = iframe
        .getAttribute("src")
        .replace(/tgWebAppPlatform=[^&]* /, "tgWebAppPlatform=android");
    window.location.href = modifiedSrc;
} else console.log("Unable to retrieve the game or iframe.");

}
*/