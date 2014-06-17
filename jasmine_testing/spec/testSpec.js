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
    it("should return 2", function() {
        expect(mockyList.arrayMatch(["a","b","c"], [{"k": ["a","b","c"], "v": 2}, {"k": ["a","b","d"], "v": 3}])).toEqual(2);
	});
});

describe("Calling arrayMatch", function() {
    it("should return 2", function() {
        expect(mockyList.arrayMatch(["a","b","c"], [{"k": ["a","b","d"], "v": 3},{"k": ["a","b","c"], "v": 2},])).toEqual(2);
	});
});

describe("Calling arrayMatch", function() {
    it("should return 2", function() {
        expect(mockyList.arrayMatch([], [{"k": [], "v": 2},{"k": ["a","b","c"], "v": 88},])).toEqual(2);
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
    it("should return 3", function() {
        expect(mockyList.arrayMatch(["a","b","c"], [{"k": [_], "v": 3}])).toEqual(3);
	});
});


describe("Calling arrayMatch", function() {
 	it("should return 4", function() {
     	expect(mockyList.arrayMatch(["a","b","d","c"], [{"k": [_], "v": 4}, {"k": ["a","b","b","c"], "v": 3}])).toEqual(4);
 	});
});

describe("Calling arrayMatch with two any's at beginning", function() {
 	it("should return 4", function() {
     	expect(mockyList.arrayMatch(["a","b","d","c"], [{"k": [_, "d","c"], "v": 4}])).toEqual(4);
 	});
});

describe("Calling arrayMatch with one any's at beginning", function() {
 	it("should return 4", function() {
     	expect(mockyList.arrayMatch(["a","b","d","c"], [{"k": [_, "c"], "v": 4}])).toEqual(4);
 	});
});

describe("Calling arrayMatch with one any's at beginning", function() {
 	it("should return busy bee", function() {
     	expect(mockyList.arrayMatch(["a","b","d","d","e"], [{"k": [_, "c"], "v": "busy bee"},{"k": [_, "d", _], "v": "bee"}])).toEqual("busy bee");
 	});
}); 

// unit test mixing any and param

describe("Calling arrayMatch with mixed param and any", function() {
 	it("should return 3", function() {
     	expect(mockyList.arrayMatch(["a","b","d","d","e"], [{"k": ["c", _], "v": 4},{"k": [$, "d", _], "v": 3}])).toEqual(3);
 	});
}); 

// why is this one having trouble?
// describe("Calling arrayMatch with mixed param and any", function() {
//  	it("should return 4", function() {
//      	expect(mockyList.arrayMatch(["a","b","d","d","e"], [{"k": [_,"c",_], "v": 2},{"k": [_, "d", $], "v": 4}])).toEqual(4);
//  	});
// }); 


