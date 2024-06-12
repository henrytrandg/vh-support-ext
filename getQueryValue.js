

{
	const queryString = sessionStorage.__telegram__initParams;
	let result = queryString.substring(17,queryString.indexOf(","));
	//copyTextToClipboard(JSON.parse(queryString).tgWebAppData);
	copyTextToClipboard(result);

	function copyTextToClipboard(text) {
		
		prompt("Copy to clipboard: Ctrl+C, Enter", text);
	  }

}