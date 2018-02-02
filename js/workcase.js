var idx = 1; 
var workCases = { 
	"workCases": [
		{
			name: "IoT Piggybank", 
			subheading: "Lorem ipsum dolor sit amet, doctus facilisi recusabo mel ex. Te omittam maluisset has, mea agam graecis sensibus ut. Sonet placerat nec ea, te ius nobis dolorem efficiendi, ex omnes causae suscipit eam. No eam primis tritani, elit minimum", 
			type: "Case Study/Ciklum",
			role: "Lead Android Developer",
			class: "active",
			skill_set: "full-stack-dev mobile-application cloud ui-design",
			industries: "iot",
			image: "../img/project-bg/iot-piggybank.png"
			
		}, 
		{
			name: "Smart Lock",
			subheading: "Lorem ipsum dolor sit amet, doctus facilisi recusabo mel ex. Te omittam maluisset has, mea agam graecis sensibus ut. Sonet placerat nec ea, te ius nobis dolorem efficiendi, ex omnes causae suscipit eam. No eam primis tritani, elit minimum", 
			type: "Case Study/Room 5", 
			role: "Integration Server Lead",
			class: "next",
			skill_set: "full-stack-dev cloud",
			industries: "iot",
			image: "../img/project-bg/smart-lock.png"
		},
		{
			name: "Network Visualization", 
			subheading: "Lorem ipsum dolor sit amet, doctus facilisi recusabo mel ex. Te omittam maluisset has, mea agam graecis sensibus ut. Sonet placerat nec ea, te ius nobis dolorem efficiendi, ex omnes causae suscipit eam. No eam primis tritani, elit minimum", 
			type: "Case Study/Room 5",
			skill_set: "full-stack-dev ui-design",
			industries: "cybersecurity",
			image: "../img/project-bg/network-visualization.png"
			
		},
		{
			name: "Microns Developer Portal",
			image: "../img/project-bg/micron.png", 
			skill_set: "full-stack-dev ui-design",
		},
		{
			name: 'Verifone',
			image: "../img/project-bg/verifone.png",
			skill_set: "full-stack-dev  project-management",
		},
		{
			name: 'SR Love and Care',
			image: "../img/project-bg/love-and-care.png",
			skill_set: "full-stack-dev  project-management ui-design",
			industries: "non-profit"
		}, 
		{
			name: 'Net Zero Enterprises',
			skill_set: "project-management CMS ui-design",
		},
		{
			name: 'Neurohacker',
			skill_set: "project-management CMS",
		}, 
		{
			name: 'Rural India - Workshop',
			skill_set: "project-management",
			industries: "non-profit"
		},
		{
			name: 'L7 Partnership', 
			skill_set: "project-management CMS",
			
		}, 
		{
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