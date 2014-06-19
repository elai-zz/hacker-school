(function(exports) {
	
	var mocky = createMatcher;
	mocky.createMatcher = createMatcher;
	mocky.arrayMatch = arrayMatch;
	exports.mocky = mocky;
	
	mocky.any = (function () {
		function Any() {}
		return new Any();
	})();
	
	mocky.param = (function () {
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
				
				if (patterns[i][0] == mocky.any) {
					anyPattern = patterns[i][1];
				}
				
				else if (patterns[i][0] == mocky.param) {
					paramExist = patterns[i][1];
				}
				newObj = {"k": patterns[i][0], "v" : patterns[i][1]};		
				patternsL.push(newObj); 	
						
			}

			if (anyPattern && paramExist) {
				throw "ambiguous pattern any and param";
			}
			
			/* now breaking it up to different cases */
			
			if (n instanceof Array) {
				return arrayMatch(n, patternsL);
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
			var paramMatch = undefined;
			
			if (currPatternKey[j] == mocky.any || 
				currPatternKey[j] == mocky.param) {
					
				if (currPatternKey.length == 1){
					// we see a [_] or a [$]
					return returnFuncOrAtom(currPatternVal, n);

				} 
				
				else if (currPatternKey[j] == mocky.param) {
					// we are seeing something like [$,_]
					if (currPatternKey[1] == mocky.any) {
						return returnFuncOrAtom(currPatternVal, n[1]);
					}
					
					else {
						var nextToken = currPatternKey[1]; 
						var ind = n.indexOf(nextToken);
						paramMatch = n.slice(0,ind);
						currPatternKey = currPatternKey.slice(1);
						n = n.slice(ind);
					}
					
				}
				
				else {
					// we are seeing something like [_,$]
					if (currPatternKey[1] == mocky.param) {
						paramMatch = n.slice(1); //we have a param
						return returnFuncOrAtom(currPatternVal, paramMatch);
					}
					
					else if (currPatternKey[1] != mocky.any) {
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
						while (currPatternKey[1] == mocky.any) {
							currPatternKey = currPatternKey.slice(1);
							n = n.slice(1);
						}

						// // we are seeing something like [_,_,$]
						// while (currPatternKey[1] == mocky.any) {
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
				currPatternKey[j] == mocky.any || 
				currPatternKey[j] == mocky.param)) {
					
				if (currPatternKey[j] == mocky.param) {
					// as soon as we see a param, we need to see whether it's still going. 
					// we haven't seen a param at this point yet
					paramMatch = [n[j]];
					
					// $ is at the end now, so we can just return with 
					// everything unseen in input as $
					if (j+1 == currPatternKey.length) {
						return returnFuncOrAtom(currPatternVal, n.slice(j));
					}
				}
					
				else if (currPatternKey[j] == mocky.any) {
					// we have seen a param before this so we should return it
					if (paramMatch) {
						return returnFuncOrAtom(currPatternVal, paramMatch);
					}
					else if (j+1 == currPatternKey.length) {
						return returnFuncOrAtom(currPatternVal, n);
					} // return now because all is matched
				}

				j++;
			}
			
			// exact match found
			if (currPatternKey.length == j && n.length == j) {
				if (paramMatch) {
					return returnFuncOrAtom(currPatternVal, paramMatch);
				}
				else return returnFuncOrAtom(currPatternVal, n);
			}
			
			n = copyN;
			
		}
		throw "non exhaustive pattern matching";
	}
	
})(this);
