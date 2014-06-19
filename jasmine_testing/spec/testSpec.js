var _ = mocky.any;
var $ = mocky.param;

function foo() {
	alert('hi');
}

function foo1() {
	return 1;
}

var c = mocky(
	[2,3], 
	[1,2],
	[3 , function() {
		a = foo1();
		return "b" + 1}],
	["apple", function (n) { return "I like " + n}],
	[["a","b",1], 55],
	[_, "wow!"]
);

var d = mocky(
	[$, function(n) {
	return n+n}]
);

var fact = mocky(
	[0 , 1],
	[$ , function(n) {return n * fact(n-1)}]
);

/*
describe("Calling fact", function() {
    it("should return 24", function() {
        expect(fact(4)).toEqual(24);
	});
});

describe("Calling fact", function() {
    it("should return 55", function() {
        expect(c(["a","b",1])).toEqual(55);
	});
});


// unit tests with just one parameter
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

// unit test for arrayMatch, not passing functions.

// describe("Calling arrayMatch", function() {
//     it("should return null", function() {
//         expect(mocky.arrayMatch(["a","b","c"],[])).toEqual(null);
// 	});
// });

describe("Calling arrayMatch", function() {
    it("should return 2", function() {
        expect(mocky.arrayMatch(["a","b","c"], [{"k": ["a","b","c"], "v": 2}, {"k": ["a","b","d"], "v": 3}])).toEqual(2);
	});
});

describe("Calling arrayMatch", function() {
    it("should return 2", function() {
        expect(mocky.arrayMatch(["a","b","c"], [{"k": ["a","b","d"], "v": 3},{"k": ["a","b","c"], "v": 2},])).toEqual(2);
	});
});

describe("Calling arrayMatch", function() {
    it("should return 2", function() {
        expect(mocky.arrayMatch([], [{"k": [], "v": 2},{"k": ["a","b","c"], "v": 88},])).toEqual(2);
	});
});

// describe("Calling arrayMatch", function() {
//     it("should return null", function() {
//         expect(mocky.arrayMatch([], [{"k": ["a","b","c"], "v": 88},])).toEqual(null);
// 	});
// });

// describe("Calling arrayMatch", function() {
//     it("should return null", function() {
//         expect(mocky.arrayMatch(["a","b","c"], [{"k": ["a","b","d"], "v": 3}])).toEqual(null);
// 	});
// });

describe("Calling arrayMatch", function() {
    it("should return 3", function() {
        expect(mocky.arrayMatch(["a","b","c"], [{"k": [_], "v": 3}])).toEqual(3);
	});
});


describe("Calling arrayMatch", function() {
 	it("should return 4", function() {
     	expect(mocky.arrayMatch(["a","b","d","c"], [{"k": [_], "v": 4}, {"k": ["a","b","b","c"], "v": 3}])).toEqual(4);
 	});
});

describe("Calling arrayMatch with two any's at beginning", function() {
 	it("should return 4", function() {
     	expect(mocky.arrayMatch(["a","b","d","c"], [{"k": [_, "d","c"], "v": 4}])).toEqual(4);
 	});
});

describe("Calling arrayMatch with one any's at beginning", function() {
 	it("should return 4", function() {
     	expect(mocky.arrayMatch(["a","b","d","c"], [{"k": [_, "c"], "v": 4}])).toEqual(4);
 	});
});

describe("Calling arrayMatch with one any's at beginning", function() {
 	it("should return bee", function() {
     	expect(mocky.arrayMatch(["a","b","d","d","e"], [{"k": [_, "c"], "v": "busy bee"},{"k": [_, "d", _], "v": "bee"}])).toEqual("bee");
 	});
}); 

// unit test mixing any and param

describe("Calling arrayMatch with mixed param and any", function() {
 	it("should return 3", function() {
     	expect(mocky.arrayMatch(["a","b","d","d","e"], [{"k": ["c", _], "v": 4},{"k": [$, "d", _], "v": 3}])).toEqual(3);
 	});
}); 

describe("Calling arrayMatch with mixed param and any", function() {
 	it("should return 4", function() {
     	expect(mocky.arrayMatch(["a","b","d","d","e"], [{"k": [_,"c",_], "v": 2},{"k": [_, "d", $], "v": 4}])).toEqual(4);
 	});
}); 

describe("Calling arrayMatch with mixed param and any", function() {
 	it("should return 4", function() {
     	expect(mocky.arrayMatch(["a","b","d","d","e"], [{"k": [_,"e", _, _], "v": 2},{"k": [_, "d", $], "v": 4}])).toEqual(4);
 	});
}); 

describe("Calling arrayMatch with mixed param and any", function() {
 	it("should return 4", function() {
     	expect(mocky.arrayMatch(["a","b","d","d","e"], [{"k": [_,"e", $], "v": 2},{"k": [_, "d", $], "v": 4}])).toEqual(4);
 	});
}); 


	
// unit tests now using functions
describe("Calling arrayMatch", function() {
    it("should return 4", function() {
        expect(mocky.arrayMatch(["a","b","c"], [
		{"k": ["a","b","d"], "v": 2},
		{"k": ["a","b","c"], "v": function() {
			var v = 1+1;
			return v+2;}}])).toEqual(4);
	});
});

describe("Calling arrayMatch", function() {
    it("should return 2", function() {
        expect(mocky.arrayMatch(["a","b","c"], [
		{"k": ["a","c","d"], "v": 3},
		{"k": ["a", $], "v": function(n) {
			return n.length;}}])).toEqual(2);
	});
});

describe("Calling arrayMatch", function() {
    it("should return 1", function() {
        expect(mocky.arrayMatch(["a","b","c"], [
		{"k": ["a","c","d"], "v": 3},
		{"k": [_,"b", $], "v": function(n) {
			return n.length;}}])).toEqual(1);
	});
});

describe("Calling arrayMatch", function() {
    it("should return 3", function() {
        expect(mocky.arrayMatch(["a","b","c","e"], [{"k": ["a",_,"c",_], "v": 3},{"k": ["a","b","c"], "v": 2},])).toEqual(3);
	});
});

describe("Calling arrayMatch", function() {
    it("should return 3", function() {
        expect(mocky.arrayMatch(["a","b","c","e"], [{"k": [_,"b","c",_], "v": 3},{"k": ["a","b","c"], "v": 2},])).toEqual(3);
	});
}); */

// tests to care about


describe("Calling arrayMatch", function() {
    it("should return 3", function() {
        expect(mocky.arrayMatch(["a","b","c","e"], [{"k": ["a",$,"c",_], "v": function foo(n){return n;}},{"k": ["a","b","c"], "v": 2},])).toEqual(["b"]);
	});
});

describe("Calling arrayMatch", function() {
    it("should return 3", function() {
        expect(mocky.arrayMatch(["a","d","b","c","e"], [{"k": [$,"b","c",_], "v": function(n){return n;}},{"k": ["a","b","c"], "v": 2},])).toEqual(["a","d"]);
	});
});


describe("Calling arrayMatch", function() {
    it("should return everything but e", function() {
        expect(mocky.arrayMatch(["a","d","b","c","e"], [{"k": [$,"e"], "v": function(n){return n;}},{"k": ["a","b","c"], "v": 2},])).toEqual(["a","d","b","c"]);
	});
});

describe("Calling arrayMatch", function() {
    it("should return [b,c,e]", function() {
        expect(mocky.arrayMatch(["a","d","b","c","e"], [{"k": ["a",_,$], "v": function(n){return n;}},{"k": ["a","b","c"], "v": 2},])).toEqual(["b","c","e"]);
	});
});

describe("Calling arrayMatch", function() {
    it("should return ['d']", function() {
        expect(mocky.arrayMatch(["a","d","b","c","e"], [{"k": ["a",$,_], "v": function(n){return n;}},{"k": ["a","b","c"], "v": 2},])).toEqual(["d"]);
	});
});



