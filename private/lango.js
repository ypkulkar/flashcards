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

    _this.state = { opinion: "" };
    _this.checkReturn = _this.checkReturn.bind(_this);
    _this.saveFunc = _this.saveFunc.bind(_this);
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
            { id: "review", className: "upper_buttons", href: "review.html" },
            "Review"
          )
        ),
        React.createElement(
          "div",
          { id: "middle" },
          React.createElement(
            Card,
            null,
            React.createElement("textarea", { id: "inputEng", onKeyPress: this.checkReturn })
          ),
          React.createElement(
            Card,
            null,
            React.createElement(Txt, { id: "outputEng", phrase: this.state.opinion })
          ),
          React.createElement(
            "div",
            { id: "buttonbox" },
            React.createElement(
              "button",
              { id: "save", className: "lower_buttons", onClick: this.saveFunc },
              "Save"
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

    // onKeyPress function for the textarea element
    // When the charCode is 13, the user has hit the return key

  }, {
    key: "checkReturn",
    value: function checkReturn(event) {
      if (event.charCode == 13) {
        var newPhrase = document.getElementById("inputEng").value;
        document.getElementById("inputEng").value = newPhrase.slice(0, newPhrase.length);
        var _xhr = translateRequest(newPhrase);
        var that = this;
        _xhr.onreadystatechange = function () {

          if (_xhr.readyState == 4) {
            if (_xhr.status == 200) {
              var object = JSON.parse(_xhr.responseText);
              that.setState({ opinion: object.translation });
            }

            if (_xhr.status == 404) {
              console.log("Error 404: File not found");
            }
          }
        };
        event.preventDefault();
      }
    }
  }, {
    key: "saveFunc",
    value: function saveFunc(event) {
      var engPhrase = document.getElementById("inputEng");
      if (engPhrase.value == "" || this.state.opinion == "") {
        return;
      }
      saveRequest(engPhrase.value, this.state.opinion);
      engPhrase.value = "";
      this.setState({ opinion: "" });
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
    document.getElementById("username").textContent = object.username;
  }
};

