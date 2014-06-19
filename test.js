var _ = mocky.any;
var $ = mocky.param;

function foo() {
	alert('hi');
}

function writeOut(call, res) {
	
	var string = call + " gives you " + res;
	document.getElementById("test_res").innerHTML += (string+'<br><br>');
	
} 

var c = mocky(
	[2,3], 
	[1,2],
	["apple", function (n) { return "I like " + n}],
	[_, "wow!"]
);

var d = mocky(
	[[1, _, 3] , "a list begins with 1 and ends with 3."],
	[[$,1,2,3,"a"],function(boo){return boo;}], 
	[[_], "a list that I don't understand."]
);

var fact = mocky(
	[0 , 1],
	[$ , function(n) {return n * fact(n-1)}]
);

var fib = mocky(
	[0 , 0],
	[1 , 1],
	[2 , 1],
	[$ , function(n) {return fib(n-1) + fib (n-2)}]
);

// writeOut("c(2)", c(2));
// writeOut("c('apple')", c("apple"));
// writeOut("c('foobar')", c("foobar!"));
// writeOut("fact(3)", fact(3));
// writeOut("fib(10)", fib(10)); // starting 0, 1, 1, 2, 3 ...
// writeOut("d(['bear', 'dog'])", d(['bear', 'dog']) );
// writeOut("d(['bear', 'dog', 1, 2, 3, 'a'])", d(['bear', 'dog',1, 2, 3, 'a']) );
// writeOut("d([1, 2, 'cat', 'elephant', 3])", d([1, 2, 'cat', 'elephant', 3]) );
// writeOut("d([1, 'cat', 3])", d([1, 'cat', 3]) );
