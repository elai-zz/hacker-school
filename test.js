/*
Sample Usage:

var sample = new mocky(
{
	0 : 1,
	1 : 2,
});

Open test.html and examine result in your browser console
*/

function foo() {
	alert('hi');
}

var a = mocky({
	0 : 1,
	1 : 2,
	3 : function() {console.log("b")},
	5 : function() {
		foo();
		console.log("c");
	},
	_ : 10 // magic key "_" but not a good way to implement this
});

var fact = mocky({
	0 : 1,
	"$" : function(n) {return n * fact(n-1)}
});
console.log(fact(3));