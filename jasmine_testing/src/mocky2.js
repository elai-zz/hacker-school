(function(exports) {
	
	var mockyList = createMatcher;
	mockyList.createMatcher = createMatcher;
	exports.mockyList = mockyList;
	
	function createMatcher() {
		patterns = arguments;
		
		return function(n) {
			
			patternsL = [];
			
		    for (var i = 0; i < patterns.length; i++) {
				newObj = {"k": patterns[i][0], "v" : patterns[i][1]};		
				patternsL.push(newObj); 			
			}
			
			for (var i = 0; i < patternsL.length; i++) {
				
				if (patternsL[i]["k"] == n)
				{
					if (typeof(patternsL[i]["v"]) === "function"){
						
						fxn = String(patternsL[i]["v"]);
						
						if ((fxn.split("("))[1][0] != ")")
						{
							return patternsL[i]["v"](n);
						}
						else
						{
							var temp = patternsL[i]["v"];
							return temp();
					
						}
					}
					else {
						return patternsL[i]["v"];
					}
				}
			}
			
			throw "non exhaustive pattern matching";
		
		 }
		

	}
	
	
})(this);

