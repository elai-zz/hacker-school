/*
Sample Usage:

var sample = new mocky(
{
	0 : 1,
	1 : 2,
});

Open test.html and examine result in your browser console
*/

var _ = mockyList.any;
var $ = mockyList.param;

function foo() {
	alert('hi');
}

function foo1() {
	return 1;
}

var c = mockyList(
	[2,3], 
	[1,2],
	[3 , function() {
		a = foo1();
		return "b" + 1}],
	["apple", function (n) { return "I like " + n}],
	[_, "wow!"]
);

var d = mockyList(
	[$, function(n) {
	return n+n}]);

describe("calling d(66)", function() {
    it("param token", function() {
        expect(d(66)).toEqual(132);
	});
});

describe("calling c(66)", function() {
    it("to return wow!", function() {
        expect(c(66)).toEqual("wow!");
	});
});

describe("Calling c(_)", function() {
    it("should be wow!", function() {
        expect(c(_)).toEqual("wow!");
	});
});

describe("Calling c(2)", function() {
    it("should be 3", function() {
        expect(c(2)).toEqual(3);
	});
});

describe("Calling c(3)", function() {
    it("should be b1", function() {
        expect(c(3)).toEqual("b1");
	});
});

describe("Calling c('apple')", function() {
    it("should be 'I like apple'", function() {
        expect(c("apple")).toEqual("I like apple");
	});
});


// var a = mocky({
// 	0 : 1,
// 	1 : 2,
// 	3 : function() {console.log("b")},
// 	5 : function() {
// 		foo();
// 		console.log("c");
// 	},
// 	_ : 10 // magic key "_" but not a good way to implement this
// });
// 
// var fact = mocky({
// 	0 : 1,
// 	"$" : function(n) {return n * fact(n-1)}
// });
// 
// 
// describe("Calling a()", function() {
//     it("matches patterns", function() {
//         expect(a(0)).toEqual(1);
//     });
// });
// 
// describe("Calling fact()", function() {
//     it("Returns factorial", function() {
//         expect(fact(3)).toEqual(6);
//     });
// });
// 
// var fact = mockyList(
// 	[0 : 1],
// 	["$" : function(n) {return n * fact(n-1)}]
// );

