(function(exports) {
	
	var mockyList = createMatcher;
	mockyList.createMatcher = createMatcher;
	exports.mockyList = mockyList;
	
	function createMatcher(patterns) {
		
		return function(n) {
			
			patternsL = [];
		
			for (var i = 0; i < arguments.length; i++) {
				parsed = arguments[i].split(",");
				newObj = {"k": parsed[0], "v" : parsed[1]};
			
				patterns.push(newObj);
			
			}
			
			var foo;
			
			for (var i = 0; i < patternsL.length; i++) {
				
				if (patternsL[i]["k"] == n)
				{
					return patternsL[i]["v"];
				}
			}
			
			throw "non exhaustive pattern matching";
		
		}

	}
	
	
})(this);

