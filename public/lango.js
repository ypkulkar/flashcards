const submit_button = document.querySelector("#submit-button");
const save_button = document.querySelector("#save-button");
const input = document.querySelector("#phrase");
const output = document.querySelector("#translation");

submit_button.addEventListener("click",function(){
	var phrase = input.value;
	xhr = translateRequest(phrase);
	xhr.onreadystatechange = orscFunction;
});

save_button.addEventListener("click",function(){
	var engPhrase = input.value;
	var hinPhrase = output.textContent;
	xhr = saveRequest(engPhrase,hinPhrase);
	input.value = "";
	output.textContent = "";	
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
