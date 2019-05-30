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
      this.state = { engPhrase: "", hinPhrase: "" };
	  this.nextFunc = this.nextFunc.bind(this);
  }

  render() {return (
      <main>
      <Header>
            <p id="title">Lango!</p>
            <button id="add" className="upper_buttons">Add</button>
      </Header>
      <div id="middle">
      <Card>
 	<Txt id="inputEng" phrase={this.state.engPhrase}  />
      </Card>
      
      <Card>
 	<Txt id="outputEng" phrase={this.state.hinPhrase} /> 
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
/*
		let engPhrase = document.getElementById("inputEng");
		if(engPhrase.value == "" || this.state.opinion == ""){
			return;	
		}
		saveRequest(engPhrase.value,this.state.opinion);
		engPhrase.value = "";
		this.setState({opinion: ""});
*/
	}


  } // end of class

ReactDOM.render(
    <CreateCardMain />,
    document.getElementById('root')
);
