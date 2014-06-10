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

var a = new Mocky({
	0 : 1,
	1 : 2,
	3 : function() {console.log("b")},
	5 : function() {
		foo();
		console.log("c");
	},
	"_" : 10 // magic key "_" but not a good way to implement this
});

console.log(a(0));
a(3);
a(5);
console.log(a(4));

var fact = new Mocky({
	0 : 1,
	"$" : function(n) {return n * fact(n-1)}
});

var res = fact(3);
console.log(res);

// var c = Mocky({1:1});
// console.log(Mocky.any);


