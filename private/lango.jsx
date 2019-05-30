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
      this.state = { opinion: "" }
      this.checkReturn = this.checkReturn.bind(this);
	  this.saveFunc = this.saveFunc.bind(this);
      }

  render() {return (
      <main>
      <Header>
            <p id="title">Lango!</p>
            <button id="review" className="upper_buttons">Review</button>
      </Header>
      <div id="middle">
      <Card>
 	<textarea id="inputEng" onKeyPress={this.checkReturn} />
      </Card>
      
      <Card>
 	<Txt id="outputEng" phrase={this.state.opinion} /> 
      </Card>
      <div id="buttonbox">
          <button id="save" className="lower_buttons" onClick={this.saveFunc}>Save</button>
      </div>
      </div>
      <Footer>
           <p id="username">Username</p>
      </Footer>
      </main>
      );
    } // end of render function 

    // onKeyPress function for the textarea element
    // When the charCode is 13, the user has hit the return key
    checkReturn(event) {
	 if (event.charCode == 13) {
	    let newPhrase = document.getElementById("inputEng").value;
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
	 }

	saveFunc(event){
		let engPhrase = document.getElementById("inputEng");
		if(engPhrase.value == "" || this.state.opinion == ""){
			return;	
		}
		saveRequest(engPhrase.value,this.state.opinion);
		engPhrase.value = "";
		this.setState({opinion: ""});
	}


  } // end of class



ReactDOM.render(
    <CreateCardMain />,
    document.getElementById('root')
);


	 