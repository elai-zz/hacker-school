(function(exports) {
	
	var mocky = createMatcher;
	mocky.createMatcher = createMatcher;
	exports.mocky = mocky;
	
	function createMatcher(patterns) {
		return function(n) {

			if (patterns[n] == undefined)
			{
				if (patterns["$"] != undefined) return give("$", patterns, n);
			
				else if (patterns["_"] != undefined) return give("_", patterns);
			
				else {
					throw "non exhaustive pattern matching";
				}
			}
		
			else { 
				return give(n, patterns);
			}

		}

	}
	
	var give = function(sym, patterns, n) {
		
		if (typeof(patterns[sym]) === "function")
		{
			var temp = patterns[sym];
			var param = ((sym == "$") ? n : sym);
			return temp(param);
		}  
		
		// for cases like func 2 = 1
		else {
			var foo = patterns[sym];
			return foo;
		}
		
	}
	
})(this);

