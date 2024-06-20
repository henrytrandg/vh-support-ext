{
	console.log("FIX IFRAME.JS");
	const iframe = document.querySelector("iframe");
	
	if (iframe) {
		const src = iframe.getAttribute("src");
		const newSrc = src.replace(
			/tgWebAppPlatform=[^&]*/,
			"tgWebAppPlatform=android"
		);
		iframe.setAttribute("src", newSrc);
		
	}
}

