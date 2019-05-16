'use strict';

// An element to go into the DOM
const lango = <h1 id="logo">Lango!</h1>;


// A component - function that returns some elements 
function FirstCard() {
	 return (<div className="textCard">
	 <p>Hello, world!</p>
	 </div>);
	 }

// Another component
function FirstInputCard() {
         return (<div className="textCard">
	          <textarea onKeyPress={checkReturn} />
		  </div>);
            }
	    
// An element with some contents, including a variable
// that has to be evaluated to get an element, and some
// functions that have to be run to get elements. 
const main = (<main>
		{lango}
	      	<FirstInputCard/>
	      	<FirstCard />
	      </main>
	     );

ReactDOM.render(
    main,
    document.getElementById('root')
);

// onKeyPress function for the textarea element
// When the charCode is 13, the user has hit the return key
function checkReturn(event) {
	 console.log(event.charCode);
	 }
	 