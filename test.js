/*
Sample Usage:

var sample = new mocky(
{
	0 : 1,
	1 : 2
});

Open test.html and examine result in your browser console
*/

var a = new mocky({
	0 : 1,
	1 : 2
});

console.log(a(0));
console.log(a(3));

var b = new mocky({
	"a" : 1,
	_ : 2
});

