function setLocalStorage(data) {
	var str = "";
	if(typeof data === "object")
		str = JSON.stringify(data);
	else if(typeof data === "string")
		str = data;
	localStorage.setItem("scorebord_data", str);
}

function getLocalStorage() {
	return JSON.parse(localStorage.getItem("scorebord_data"))
}

function createURLparam() {}