{
	let iframe = document.querySelector("iframe");
	if (iframe && iframe.hasAttribute("src")) {
		let modifiedSrc = iframe
			.getAttribute("src")
			.replace(/tgWebAppPlatform=[^&]* /, "tgWebAppPlatform=android");
		window.location.href = modifiedSrc;
	} else console.log("Unable to retrieve the game or iframe.");

}
