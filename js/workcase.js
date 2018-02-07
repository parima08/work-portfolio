var idx = 1; 
var workCases = { 
	"workCases": [
		{
			index: 1,
			name: "IoT Piggybank", 
			type: "Case Study/Ciklum",
			role: "Lead Android Developer",
			class: "active",
			skill_set: "full-stack-dev mobile-application cloud ui-design",
			industries: "iot",
			subheading: "We were approached by one of America’s biggest banks with the challenge to increase their accounts with children. We developed an IoT artifact for them that engaged children and taught them basic budgetting techniques." , 
			image: "../img/project-bg/iot-piggybank-grad.png"
			
		}, 
		{
			index: 2,
			name: "Smart Lock",
			subheading: "Lorem ipsum dolor sit amet, doctus facilisi recusabo mel ex. Te omittam maluisset has, mea agam graecis sensibus ut. Sonet placerat nec ea, te ius nobis dolorem efficiendi, ex omnes causae suscipit eam. No eam primis tritani, elit minimum", 
			type: "Case Study/Room 5", 
			role: "Integration Server Lead",
			class: "next",
			skill_set: "full-stack-dev cloud",
			industries: "iot",
			image: "../img/project-bg/smart-lock-grad.png"
		},
		{
			index: 3,
			name: "Network Visualization", 
			subheading: "Lorem ipsum dolor sit amet, doctus facilisi recusabo mel ex. Te omittam maluisset has, mea agam graecis sensibus ut. Sonet placerat nec ea, te ius nobis dolorem efficiendi, ex omnes causae suscipit eam. No eam primis tritani, elit minimum", 
			type: "Case Study/Room 5",
			skill_set: "full-stack-dev ui-design",
			industries: "cybersecurity",
			image: "../img/project-bg/network-visualization.png"
			
		},
		{
			index: 4,
			name: "Microns Developer Portal",
			image: "../img/project-bg/micron.png", 
			skill_set: "full-stack-dev ui-design",
		},
		{
			index: 5,
			name: 'Verifone',
			image: "../img/project-bg/verifone.png",
			skill_set: "full-stack-dev project-management",
		},
		{
			index: 6,
			name: 'SR Love and Care',
			image: "../img/project-bg/love-and-care.png",
			skill_set: "full-stack-dev  project-management ui-design",
			industries: "non-profit"
		}, 
		{
			index: 7,
			name: 'Net Zero Enterprises',
			skill_set: "project-management cms ui-design",
		},
		{
			index: 8,
			name: 'Neurohacker',
			skill_set: "project-management cms",
		}, 
		{
			index: 9,
			name: 'Rural India - Workshop',
			skill_set: "project-management",
			industries: "non-profit"
		},
		{
			index: 10,
			name: 'L7 Partnership', 
			skill_set: "project-management cms",
			
		}, 
		{
			index: 11,
			name: 'The Graveyard-Misc Projects-', 
		}
		
	],
	"idx": function() {
	    return idx++;
	}, 
	"css_class": function(){
		return "pc_" + this.name.toLowerCase().replace(/'()/g, "_").replace(/ /g, "_");
	},
}; 