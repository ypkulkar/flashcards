const button = document.querySelector("#submit-button");
const input = document.querySelector("#phrase");
const output = document.querySelector("#translation");

button.addEventListener("click",function(){
	var phrase = input.value;
	xhr = makeRequest(phrase);
	xhr.onreadystatechange = orscFunction;
});

orscFunction = function(){
	if(xhr.readyState == 4){
		if(xhr.status == 100){
			object = JSON.parse(xhr.responseText);
			output.textContent = object.translation;	
		}
		
		if(xhr.status == 404){
			console.log("Error 404: your life is fucked")
		}
	}

}; 
