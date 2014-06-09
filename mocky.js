var mocky = function(patterns) {
	
	patterns_str = JSON.stringify(patterns);
	patterns_json = JSON.parse(patterns_str);

	var f = function(n) {
		if (patterns_json[n] == undefined)
		{
			throw "non exhaustive pattern matching"
		}
		
		return patterns_json[n];
	}
	
	return f;
	
};


