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
      this.state = { opinion: "Life is a bowl of cherries" }

      this.checkReturn = this.checkReturn.bind(this);
	  this.saveFunc = this.saveFunc.bind(this);
	  //this.orscFunction = this.orscFunction.bind(this);
      }

  render() {return (
      <main>
      <Header>
            <p id="title">Lango!</p>
            <button id="review">Review</button>
      </Header>
      <div id="middle">
      <Card>
 	<textarea id="inputEng"  onKeyPress={this.checkReturn} />
      </Card>
      
      <Card>
 	<Txt id="outputEng" phrase={this.state.opinion} /> 
      </Card>
      <div id="buttonbox">
          <button id="save" onClick={this.saveFunc}>Save</button>
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
		let xhr = translateRequest(newPhrase);
		var that = this;
		xhr.onreadystatechange = function(){

			console.log("Ready state change");
			if(xhr.readyState == 4){
				if(xhr.status == 200){
					let object = JSON.parse(xhr.responseText);
					//output.textContent = object.translation;
					console.log(object.translation);	
					that.setState({opinion: object.translation});
				}
				
				if(xhr.status == 404){
					console.log("Error 404: your life is fucked")
				}
			}
		};
		// Get the translated phrase into translated_phrase
	    //this.setState({opinion: translated_phrase} );
	    }
	 }
/*
	orscFunction(){
	
			console.log("Ready state change");
			if(xhr.readyState == 4){
				if(xhr.status == 200){
					let object = JSON.parse(xhr.responseText);
					//output.textContent = object.translation;
					console.log(object.translation);	
					this.setState({opinion: object.translation});
				}
				
				if(xhr.status == 404){
					console.log("Error 404: your life is fucked")
				}
			}
	}
*/
	saveFunc(event){
		let engPhrase = document.getElementById("inputEng").value;
		saveRequest(engPhrase,this.state.opinion);
	}


  } // end of class



ReactDOM.render(
    <CreateCardMain />,
    document.getElementById('root')
);


	 
