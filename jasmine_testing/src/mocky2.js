(function(exports) {
	
	var mockyList = createMatcher;
	mockyList.createMatcher = createMatcher;
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
			
			if (anyPattern)
			{
				return returnFunctionOrPrim(anyPattern);
			}
			
			else if (paramExist) {	
				var tmp = paramExist;
				return tmp(n);
				
			}
			
			else {
				throw "non exhaustive pattern matching";
			}
		 }
		

	}
	
	function returnFunctionOrPrim(v) {
		if (typeof(v) === "function") {
			return v();
		}
		else {
			return v;
		}
	}
	
	
})(this);

