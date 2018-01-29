var idx = 0; 
var workCases = { 
	"workCases": [
		{
			name: "Micron",
			letter: "M",  
			shortDescription: "Lorem ipsum dolor sit amet, doctus facilisi recusabo mel ex. Te omittam maluisset has, mea agam graecis sensibus ut. Sonet placerat nec ea, te ius nobis dolorem efficiendi, ex omnes causae suscipit eam. No eam primis tritani, elit minimum", 
			technology: [{
					"javascript": ["jQuery"], 
					"ruby": ["Ruby On Rails"],
					"versionControl": ["Git", "Jenkins"]
			}], 
			"skill": ["Project Management", "User Experience"], 
		},
		{
			name: "Cybersecurity", 
			letter: "C",
			shortDescription: "Lorem ipsum dolor sit amet, doctus facilisi recusabo mel ex. Te omittam maluisset has, mea agam graecis sensibus ut. Sonet placerat nec ea, te ius nobis dolorem efficiendi, ex omnes causae suscipit eam. No eam primis tritani, elit minimum", 
			technology: [{
					"javascript": ["jQuery", "d3.js"], 
					"c" : ["SNMP"], 
					"versionControl": ["Git", "Jenkins"]
			}], 
			"skill": ["Project Management", "Development"],
			
		},
		{
			name: "Piggybank", 
			letter: "P",
			shortDescription: "Lorem ipsum dolor sit amet, doctus facilisi recusabo mel ex. Te omittam maluisset has, mea agam graecis sensibus ut. Sonet placerat nec ea, te ius nobis dolorem efficiendi, ex omnes causae suscipit eam. No eam primis tritani, elit minimum", 
			technology: [{
					"javascript": ["jQuery", "d3.js"], 
					"ruby": ["Ruby On Rails"],
					"versionControl": ["Git", "Jenkins", "AWS"]
			}], 
			"skill": ["Project Management", "Development"],
			
		}, 
	],
	"idx": function() {
	    return idx++;
	} 
}; 