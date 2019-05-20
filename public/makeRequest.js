"strict mode";

// Create the XHR object.
function createRequest(method, url) {
  let xhr = new XMLHttpRequest();
  xhr.open(method, url, true);  // call its open method
  return xhr;
}

function saveRequest(engPhrase, hinPhrase){
  //let url = `store?engPhrase=${engPhrase}&hinPhrase=${hinPhrase}`;
  let url = `store?engPhrase=${engPhrase}&hinPhrase=${hinPhrase}`;
  let xhr = createRequest('POST', url);
  return makeRequest(xhr);
}

function translateRequest(phrase){
  let url = `query?phrase=${phrase}`;
  let xhr = createRequest('GET', url);
  return makeRequest(xhr);
}



// Make the actual CORS request.
function makeRequest(xhr) {


  // checking if browser does CORS
  if (!xhr) {
    alert('error making request');
    return;
  }

  // Load some functions into response handlers.
  xhr.onload = function() {
      //console.log(xhr);
      //let responseStr = xhr.response;  // get the JSON string 
      //let object = JSON.parse(responseStr);  // turn it into an object
      //console.log(JSON.stringify(object, undefined, 2));  // print it out as a string, nicely formatted
  };

  xhr.onerror = function() {
    alert('Woops, there was an error making the request.');
  };

  // Actually send request to server
  xhr.send();

  return xhr;
}

