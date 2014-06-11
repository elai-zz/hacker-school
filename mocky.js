var Mocky = (function(patterns) {
	
	var f = function(n) {

		if (patterns[n] == undefined)
		{
			if (patterns["$"] != undefined) return give("$", n);
			
			else if (patterns["_"] != undefined) return give("_");
			
			else {
				throw "non exhaustive pattern matching";
			}
		}
		
		else { 
			return give(n);
		}

	}
	
	var give = function(sym, n) {
		
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
	
	return f;
	
});

