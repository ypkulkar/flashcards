'use strict'

function Header(props) {
    return <div className="header">
    	   {props.children}
        </div>;
    }

function Footer(props) {
    return <div className="footer">
    	   {props.children}
        </div>;
    }

function Card(props) {
    return <div className="textCard guessCard">
    	   {props.children}
	</div>;
	}
	
function FlipCard1(props) {
    return <div className="textCard ftextcard faceup">
    	   {props.children}
	</div>;
	}

function FlipCard2(props) {
    return <div className="textCard ftextcard facedown">
    	   {props.children}
	</div>;
	}



function Txt(props) {
	 if (props.phrase == undefined) {
	    return <p className="translation">Text missing</p>;
	    }
	 else return <p className="translation">{props.phrase}</p>;
	 }


class CreateCardMain extends React.Component {

  constructor(props) {
      super(props);
      this.state = { engPhrase: "", hinPhrase: "" , guessPhrase: ""};
	  this.nextFunc = this.nextFunc.bind(this);
	  this.checkReturn = this.checkReturn.bind(this);
	  this.onload_Func= this.onload_Func.bind(this);
  }

  render() {return (
      <main>
      <Header>
            <p id="title">Lango!</p>
            <a id="add" className="upper_buttons" href="lango.html">Add</a>
      </Header>
      <div id="r-middle">
	  
	  <div id="flipcard">
      	<FlipCard1>
 			<Txt id="inputEng" phrase={this.state.engPhrase}  />
			<img className="flip-symbol" src="flip_symbol.svg"></img>
      	</FlipCard1>

      	<FlipCard2>
 			<Txt id="outputEng" phrase={this.state.hinPhrase} /> 
			<img className="flip-symbol" src="flip_symbol.svg"></img>
      	</FlipCard2>
	  </div>

      <Card>
 	<textarea id="guess-box" phrase={this.state.guessPhrase} onKeyPress={this.checkReturn} />
      </Card>

      <div id="buttonbox">
          <button id="next" className = "lower_buttons" onClick={this.nextFunc}>Next</button>
      </div>
      </div>
      <Footer>
           <p id="username">Username</p>
      </Footer>
      </main>
      );
    } // end of render function 


	nextFunc(event){

		console.log("In the next function\n");
		
		this.setState({engPhrase: "", hinPhrase: ""});		
		
		let f = document.querySelector("#flipcard");
		f.classList.remove('is-flipped');
			
		document.getElementById("guess-box").value = "";	
		
		var xhr = reviewRequest();
		xhr.onload = this.onload_Func;

	}

    checkReturn(event) {
	 if (event.charCode == 13) {
		let f = document.querySelector("#flipcard");
		f.classList.toggle('is-flipped');

	
		let guess = document.getElementById("guess-box").value;
		console.log(document.querySelector(".translation"));
		console.log(guess);

		if(guess == document.querySelector(".translation").textContent){
			console.log("you guessed correct!");
		}else{
			console.log("that's not correct. try again");
		}
		event.preventDefault();
	 }

	 };

	onload_Func(event){
		console.log(event.target);
		let object = JSON.parse(event.target.responseText);
		console.log(object);
		this.setState({engPhrase: object.engPhrase, hinPhrase: object.hinPhrase});		
	}

  } // end of class

ReactDOM.render(
    <CreateCardMain />,
    document.getElementById('root')
);

let xhr = getUserName();
xhr.onreadystatechange = function() {
  if(xhr.readyState === 4 && xhr.status === 200) {
    //console.log(xhr.responseText);
    let object = JSON.parse(xhr.responseText);
	if(object.username != undefined){
    		document.getElementById("username").textContent = object.username;
	}	
  }		
  
} 

let flips = document.querySelector("flip-symbol");
flips.onclick = function() {
		let f = document.querySelector("#flipcard");
		f.classList.toggle('is-flipped');
}

