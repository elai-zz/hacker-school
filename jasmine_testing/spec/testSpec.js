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

// unit test for arrayMatch

describe("Calling arrayMatch", function() {
    it("should return null", function() {
        expect(mockyList.arrayMatch(["a","b","c"],[])).toEqual(null);
	});
});

describe("Calling arrayMatch", function() {
    it("should return 1", function() {
        expect(mockyList.arrayMatch(["a","b","c"], [{"k": ["a","b","c"], "v": 2}, {"k": ["a","b","d"], "v": 3}])).toEqual(1);
	});
});

describe("Calling arrayMatch", function() {
    it("should return 1", function() {
        expect(mockyList.arrayMatch(["a","b","c"], [{"k": ["a","b","d"], "v": 3},{"k": ["a","b","c"], "v": 2},])).toEqual(1);
	});
});

describe("Calling arrayMatch", function() {
    it("should return 1", function() {
        expect(mockyList.arrayMatch([], [{"k": [], "v": 2},{"k": ["a","b","c"], "v": 88},])).toEqual(1);
	});
});

describe("Calling arrayMatch", function() {
    it("should return null", function() {
        expect(mockyList.arrayMatch([], [{"k": ["a","b","c"], "v": 88},])).toEqual(null);
	});
});

describe("Calling arrayMatch", function() {
    it("should return null", function() {
        expect(mockyList.arrayMatch(["a","b","c"], [{"k": ["a","b","d"], "v": 3}])).toEqual(null);
	});
});

describe("Calling arrayMatch", function() {
    it("should return 5", function() {
        expect(mockyList.arrayMatch(["a","b","c"], [{"k": [_], "v": 3}])).toEqual(5);
	});
});

describe("Calling arrayMatch", function() {
 	it("should return 1", function() {
     	expect(mockyList.arrayMatch(["a","b","d","c"], [{"k": ["a",_,_,"d"], "v": 3}])).toEqual(null);
 	});
});

describe("Calling arrayMatch", function() {
 	it("should return 1", function() {
     	expect(mockyList.arrayMatch(["a","b","d","c"], [{"k": ["a",_,_,"c"], "v": 3}])).toEqual(1);
 	});
});

describe("Calling arrayMatch", function() {
 	it("should return 1", function() {
     	expect(mockyList.arrayMatch(["a","b","d","c"], [{"k": [_], "v": 4}, {"k": ["a",_,_,"c"], "v": 3}])).toEqual(5);
 	});
});



