Document all concepts and your implementation decisions.


#Flow of the program
1. Initialize the webpage
2. Get Data from one of various sources
3. Display Data
4. Step 2 Loop


#Concepts
For every concept the following items:
- short description
- code example
- reference to mandatory documentation
- reference to alternative documentation (authoritive and authentic)

###Objects, including object creation and inheritance

Single Object Creation
```
var animal = { type: “Cat”, legCount: 4};
var animal = new Object(); animal.type = "Cat"; animal.legCount = 4;
```
The Factory Pattern
```
function createAnimal(type, legCount, color){
    var o = new Object();
    o.type = type;
    o.legCount = legCount;
    o.color = color;
    o.sayType = function(){
        alert(this.type);
    };
    return o;
}
var animal = createAnimal(“Cat”, 4, “Orange”);
```
Constructor Pattern
```
function Animal(type, legCount, color){
    this.type = type;
    this.legCount = legCount;
    this.color = color;
    this.sayType = function(){
        alert(this.type);
    };
}
var animal = new Animal(“Cat”, 4, “Orange”);
```
Prototype Pattern
```
function Animal(){
}
Animal.prototype.type = “Cat”;
Animal.prototype.legCount = 4;
Animal.prototype.color = “Orange”;
Animal.prototype.sayType = function(){
    alert(this.type);
};
var animal = new Animal();
animal.sayType(); //”Cat”
```
Alternative Notation
```
function Animal(){
}
Animal.prototype = {type : "Cat", legCount : 4, color : "Orange",
    sayType : function () { alert(this.type);}
};
```
Inheritance Function
```
Animal(){ this.property = true; }
Animal.prototype.getSuperValue = function(){ return this.property; };
function Cat(){ this.subproperty = false; } //inherit from Animal
Cat.prototype = new Animal();
Cat.prototype.getSubValue = function (){ return this.subproperty; };
var instance = new Cat(); alert(instance.getSuperValue()); //true
```

Professional JavaScript for Web Developers, Nicholas C. Zakas, Chapter 6: Object Oriented Programming. Introduction to Object-Oriented JavaScript
https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/create

###websockets

WebSockets is a technology, based on the ws protocol, that makes it possible to establish a continuous full-duplex connection stream between a client and a server.
A typical websocket client would be a user's browser, but the protocol is platform independent.

```
window.app={
    socket : io("http://server7.tezzt.nl:1333"),
    getRealtimeData: function () {
        app.socket.on("stockquotes", function (data) {
            app.parseData(data.query.results.row);
        });
    }
}
```

Professional JavaScript for Web Developers, Nicholas C. Zakas, Chapter 21: Ajax and Comet. Introduction to Object-Oriented JavaScript
https://developer.mozilla.org/en/docs/WebSockets/Writing_WebSocket_client_applications

###XMLHttpRequest
XMLHttpRequest is a JavaScript object that was designed by Microsoft and adopted by Mozilla, Apple, and Google. It's now being standardized in the W3C.
It provides an easy way to retrieve data from a URL without having to do a full page refresh.

```
var myRequest = new XMLHttpRequest();
```

Professional JavaScript for Web Developers, Nicholas C. Zakas, Chapter 21: Ajax and Comet. Introduction to Object-Oriented JavaScript
https://developer.mozilla.org/en-US/docs/Web/API/XMLHttpRequest

###AJAX

AJAX stands for Asynchronous JavaScript and XML. In a nutshell, it is the use of the XMLHttpRequest object to communicate with server-side scripts.
Make requests to the server without reloading the page.
Receive and work with data from the server.

```
var httpRequest;
if (window.XMLHttpRequest) { // Mozilla, Safari, IE7+ ...
    httpRequest = new XMLHttpRequest();
} else if (window.ActiveXObject) { // IE 6 and older
    httpRequest = new ActiveXObject("Microsoft.XMLHTTP");
}
```

Professional JavaScript for Web Developers, Nicholas C. Zakas, Chapter 21: Ajax and Comet. Introduction to Object-Oriented JavaScript
https://developer.mozilla.org/en-US/docs/AJAX/Getting_Started

###Callbacks

The callback is the function that should be called on the page when the response has been received.
Typically the name of the callback is specified as part of the request.

```
function handleWord(word) {
  alert(word);
}
var stringParser = /* get a reference to the parser somehow */
stringParser.addObserver(handleWord);
stringParser.parse("pay no attention to the man behind the curtain");
```

Professional JavaScript for Web Developers, Nicholas C. Zakas, Chapter 21: Ajax and Comet. Introduction to Object-Oriented JavaScript
https://developer.mozilla.org/en/docs/Creating_JavaScript_callbacks_in_components

###How to write testable code for unit-tests

Jasmine: http://jasmine.github.io/2.2/introduction.html
Karma: http://karma-runner.github.io/0.12/index.html
Unit Testing: https://developer.mozilla.org/en-US/Add-ons/SDK/Tutorials/Unit_testing

