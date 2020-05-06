fetch("https://api.ouraring.com/v1/userinfo?access_token=NYBT2N2ABIMLXUAA5VOVCRTCCKDKVSBY")
.then(response => {
	console.log("yes");
	console.log(response);
})
.catch(error => {
	console.log("error");
	console.log(error);
})