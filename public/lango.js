const button = document.querySelector("#submit-button");
const input = document.querySelector("#phrase");
const output = document.querySelector("#translation");

button.addEventListener("click",function(){
	var phrase = input.value;
	xhr = makeRequest(phrase);
	xhr.onreadystatechange = orscFunction;
});

orscFunction = function(){
	console.log("Ready state change");
	if(xhr.readyState == 4){
		if(xhr.status == 200){
			object = JSON.parse(xhr.responseText);
			output.textContent = object.translation;
			console.log(object.translation);	
		}
		
		if(xhr.status == 404){
			console.log("Error 404: your life is fucked")
		}
	}

}; 
