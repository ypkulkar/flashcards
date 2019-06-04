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
    return <div className="textCard">
    	   {props.children}
	</div>;
	}
	

function Txt(props) {
	 if (props.phrase == undefined) {
	    return <p id="translation">Text missing</p>;
	    }
	 else return <p id="translation">{props.phrase}</p>;
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
      <Card>
 	<Txt id="inputEng" phrase={this.state.engPhrase}  />
      </Card>
      
      <Card>
 	<Txt id="outputEng" phrase={this.state.hinPhrase} /> 
      </Card>

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
		
		var xhr = reviewRequest();
		xhr.onload = this.onload_Func;

	}

    checkReturn(event) {
	 if (event.charCode == 13) {
		
		let guess = document.getElementById("guess-box").value;
		console.log(document.getElementById("translation"));
		console.log(guess);

		if(guess == document.getElementById("translation").textContent){
			console.log("you guessed correct!");
		}else{
			console.log("that's not correct. try again");
		}
	 }



		/*
		document.getElementById("inputEng").value = newPhrase.slice(0, newPhrase.length);
		let xhr = translateRequest(newPhrase);
		var that = this;
		xhr.onreadystatechange = function(){

			if(xhr.readyState == 4){
				if(xhr.status == 200){
					let object = JSON.parse(xhr.responseText);
					that.setState({opinion: object.translation});
				}
				
				if(xhr.status == 404){
					console.log("Error 404: File not found")
				}
			}
		};
		event.preventDefault();
	    }
		*/
	 };

	onload_Func(event){
		console.log(event.target);
		let object = JSON.parse(event.target.responseText);
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


