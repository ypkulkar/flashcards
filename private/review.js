'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

function Header(props) {
	return React.createElement(
		"div",
		{ className: "header" },
		props.children
	);
}

function Footer(props) {
	return React.createElement(
		"div",
		{ className: "footer" },
		props.children
	);
}

function Card(props) {
	return React.createElement(
		"div",
		{ className: "textCard" },
		props.children
	);
}

function Txt(props) {
	if (props.phrase == undefined) {
		return React.createElement(
			"p",
			{ id: "translation" },
			"Text missing"
		);
	} else return React.createElement(
		"p",
		{ id: "translation" },
		props.phrase
	);
}

var CreateCardMain = function (_React$Component) {
	_inherits(CreateCardMain, _React$Component);

	function CreateCardMain(props) {
		_classCallCheck(this, CreateCardMain);

		var _this = _possibleConstructorReturn(this, (CreateCardMain.__proto__ || Object.getPrototypeOf(CreateCardMain)).call(this, props));

		_this.state = { engPhrase: "", hinPhrase: "", guessPhrase: "" };
		_this.nextFunc = _this.nextFunc.bind(_this);
		_this.checkReturn = _this.checkReturn.bind(_this);
		_this.onload_Func = _this.onload_Func.bind(_this);
		return _this;
	}

	_createClass(CreateCardMain, [{
		key: "render",
		value: function render() {
			return React.createElement(
				"main",
				null,
				React.createElement(
					Header,
					null,
					React.createElement(
						"p",
						{ id: "title" },
						"Lango!"
					),
					React.createElement(
						"a",
						{ id: "add", className: "upper_buttons", href: "lango.html" },
						"Add"
					)
				),
				React.createElement(
					"div",
					{ id: "r-middle" },
					React.createElement(
						Card,
						null,
						React.createElement(Txt, { id: "inputEng", phrase: this.state.engPhrase })
					),
					React.createElement(
						Card,
						null,
						React.createElement(Txt, { id: "outputEng", phrase: this.state.hinPhrase })
					),
					React.createElement(
						Card,
						null,
						React.createElement("textarea", { id: "guess-box", phrase: this.state.guessPhrase, onKeyPress: this.checkReturn })
					),
					React.createElement(
						"div",
						{ id: "buttonbox" },
						React.createElement(
							"button",
							{ id: "next", className: "lower_buttons", onClick: this.nextFunc },
							"Next"
						)
					)
				),
				React.createElement(
					Footer,
					null,
					React.createElement(
						"p",
						{ id: "username" },
						"Username"
					)
				)
			);
		} // end of render function 


	}, {
		key: "nextFunc",
		value: function nextFunc(event) {

			console.log("In the next function\n");

			var xhr = reviewRequest();
			xhr.onload = this.onload_Func;
		}
	}, {
		key: "checkReturn",
		value: function checkReturn(event) {
			if (event.charCode == 13) {

				var guess = document.getElementById("guess-box").value;
				console.log(document.getElementById("translation"));
				console.log(guess);

				if (guess == document.getElementById("translation").textContent) {
					console.log("you guessed correct!");
				} else {
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
		}
	}, {
		key: "onload_Func",
		value: function onload_Func(event) {
			console.log(event.target);
			var object = JSON.parse(event.target.responseText);
			this.setState({ engPhrase: object.engPhrase, hinPhrase: object.hinPhrase });
		}
	}]);

	return CreateCardMain;
}(React.Component); // end of class

ReactDOM.render(React.createElement(CreateCardMain, null), document.getElementById('root'));

var xhr = getUserName();
xhr.onreadystatechange = function () {
	if (xhr.readyState === 4 && xhr.status === 200) {
		//console.log(xhr.responseText);
		var object = JSON.parse(xhr.responseText);
		if (object.username != undefined) {
			document.getElementById("username").textContent = object.username;
		}
	}
};

