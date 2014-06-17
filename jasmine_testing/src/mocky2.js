(function(exports) {
	
	var mockyList = createMatcher;
	mockyList.createMatcher = createMatcher;
	mockyList.arrayMatch = arrayMatch;
	exports.mockyList = mockyList;
	
	mockyList.any = (function () {
		function Any() {}
		return new Any();
	})();
	
	mockyList.param = (function () {
		function Param() {}
		return new Param();
	})();
	
	function createMatcher() {
		var patterns = arguments;
		
		return function(n) {
			
			var patternsL = [];
			var anyPattern;
			var paramExist = false; // set it to false at the beginning as assumption
			
		    for (var i = 0; i < patterns.length; i++) {
				
				if (patterns[i][0] == mockyList.any) {
					anyPattern = patterns[i][1];
				}
				
				else {
					if (patterns[i][0] == mockyList.param) {
						paramExist = patterns[i][1];
					}
					newObj = {"k": patterns[i][0], "v" : patterns[i][1]};		
					patternsL.push(newObj); 	
				}		
			}
			
			if (anyPattern && paramExist) {
				throw "ambiguous pattern any and param";
			}
			
			/* now breaking it up to different cases */
			
			if (n.isArray) {
				var arrayRes = arrayMatch(n, patternsL);
				if (arrayRes) {
					return arrayRes();
				}
			}
			
			else {
				for (var i = 0; i < patternsL.length; i++) {
				
					if (patternsL[i]["k"] == n)
					{
						if (typeof(patternsL[i]["v"]) === "function"){
						
							return patternsL[i]["v"](n);
						}
						else {
							return patternsL[i]["v"];
						}
					}
				}
			
			}
			
			if (anyPattern)
			{
				if (typeof(anyPattern) === "function") {
					return anyPattern();
				}
				else {
					return anyPattern;
				}
			}
			
			else if (paramExist) {	
				var tmp = paramExist;
				return tmp(n);
			
			}
		
			// throwing an error
			else {
				throw "non exhaustive pattern matching";
			} 
		}
	}
	
	function arrayMatch(n, p) {
		for (var i = 0; i < p.length; i++) {
			var currPatternKey = p[i]["k"];
			var currPatternVal = p[i]["v"];
			var j = 0;
			
			if (currPatternKey[j] == mockyList.any || currPatternKey[j] == mockyList.param) {
				return 5; // we see a [_] or a [$]
			}
			
			// we assume that the input is going to be same or longer than pattern key
			// while j is within range, otherwise, we can get undefined === undefined
			while (j < currPatternKey.length && (currPatternKey[j] === n[j] || 
				currPatternKey[j] == mockyList.any || currPatternKey[j] == mockyList.param)) {
					
				if (currPatternKey[j] != n[j]) {
					if (j+1 == currPatternKey.length) return 5; // return now because all is matched
				}
	
				j++;
			}

			// exact match found
			if (currPatternKey.length == j && n.length == j) {
				return 1;
			}
			
		}
		return null;
	}
	
	
})(this);

