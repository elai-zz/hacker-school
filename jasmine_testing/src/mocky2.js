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
				arrayMatch(n, patternsL);
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
	
	function returnFuncOrAtom(ret, ob) {
		
		if (typeof(ret) === "function") return ret(ob);
		else return ret;
		
	}
	function arrayMatch(n, p) {
		for (var i = 0; i < p.length; i++) {
			var currPatternKey = p[i]["k"];
			var currPatternVal = p[i]["v"];
			var j = 0;
			
			// we modify n in the process depending on pattern
			// this is to keep the beginning state of n
			var copyN = n; 
			
			// in case we see a param char
			var paramMatch;
			
			if (currPatternKey[j] == mockyList.any || 
				currPatternKey[j] == mockyList.param) {
					
				if (currPatternKey.length == 1){
					// we see a [_] or a [$]
					return returnFuncOrAtom(currPatternVal, n);

				} 
				
				else if (currPatternKey[j] == mockyList.param) {
					// we are seeing something like [$,_]
					if (currPatternKey[1] == mockyList.any) {
						return returnFuncOrAtom(currPatternVal, n[1]);
					}
					
				}
				
				else {
					// we are seeing something like [_,$]
					if (currPatternKey[1] == mockyList.param) {
						paramMatch = n.slice(1); //we have a param
						return returnFuncOrAtom(currPatternVal, paramMatch);
					}
					
					else if (currPatternKey[1] != mockyList.any) {
						// we also want to see something like [_,c]
						// where we need to search for the index in n
						// slice it out and process it
						var nextToken = currPatternKey[1];
						var ind = n.indexOf(nextToken);
						n = n.slice(ind);
						currPatternKey = currPatternKey.slice(1);
					}
					
					else {
						// we also want to see something like [_,_,c]
						// this we want to take off the beginning part until
						// we get just the c. 
						// this would work on [_,_,$] as well
						while (currPatternKey[1] == mockyList.any) {
							currPatternKey = currPatternKey.slice(1);
							n = n.slice(1);
						}

						// // we are seeing something like [_,_,$]
						// while (currPatternKey[1] == mockyList.any) {
						// 	n = n.slice(1);
						// 	currPatternKey = currPatternKey.slice(1);		
						// }
						// paramMatch = n;
						// return returnFuncOrAtom(currPatternVal, paramMatch);
					}	
				}
							
			}
			
			// if somehow, the current pattern is longer than n
			// then we would just break out of the iteration
			if (currPatternKey.length > n.length) {
				n = copyN;
				continue;
			}
			
			// we assume that the input is going to be same or longer than pattern key
			// while j is within range, otherwise, we can get undefined === undefined
			
			// as soon as we can see a _, we don't see more atoms. 
			// entering this while loop, we know it must be a non param, any.
			while (j < currPatternKey.length && (currPatternKey[j] === n[j] || 
				currPatternKey[j] == mockyList.any || 
				currPatternKey[j] == mockyList.param)) {
				
				if (currPatternKey[j] == mockyList.param) {
					// as soon as we see a param, we can stop and match. 
					paramMatch = n.slice(j);
					return returnFuncOrAtom(currPatternVal, paramMatch);
				}
					
				else if (currPatternKey[j] == mockyList.any) {
					if (j+1 == currPatternKey.length) {
						return returnFuncOrAtom(currPatternVal, n);
					} // return now because all is matched
				}
	
				j++;
			}

			// exact match found
			if (currPatternKey.length == j && n.length == j) {
				return returnFuncOrAtom(currPatternVal, n);
			}
			
			n = copyN;
			
		}
		
		throw "non exhaustive pattern matching";
	}
	
})(this);
