var idx = 1; 
var workCases = { 
	"workCases": [
		{
			name: "IoT Piggybank", 
			subheading: "Lorem ipsum dolor sit amet, doctus facilisi recusabo mel ex. Te omittam maluisset has, mea agam graecis sensibus ut. Sonet placerat nec ea, te ius nobis dolorem efficiendi, ex omnes causae suscipit eam. No eam primis tritani, elit minimum", 
			type: "Case Study/Ciklum",
			role: "Lead Android Developer",
			class: "active",
			image: "../img/project-bg/iot-piggybank.png"
			
		}, 
		{
			name: "Smart Lock",
			subheading: "Lorem ipsum dolor sit amet, doctus facilisi recusabo mel ex. Te omittam maluisset has, mea agam graecis sensibus ut. Sonet placerat nec ea, te ius nobis dolorem efficiendi, ex omnes causae suscipit eam. No eam primis tritani, elit minimum", 
			type: "Case Study/Room 5", 
			role: "Integration Server Lead",
			class: "next",
			image: "../img/project-bg/smart-lock.png"
		},
		{
			name: "Network Visualization", 
			subheading: "Lorem ipsum dolor sit amet, doctus facilisi recusabo mel ex. Te omittam maluisset has, mea agam graecis sensibus ut. Sonet placerat nec ea, te ius nobis dolorem efficiendi, ex omnes causae suscipit eam. No eam primis tritani, elit minimum", 
			type: "Case Study/Room 5",
			image: "../img/project-bg/network-visualization.png"
			
		},
		{
			name: "Microns Developer Portal",
			image: "../img/project-bg/micron.png"
		},
		{
			name: 'Verifone'
		},
		{
			name: 'SR Love and Care'
		}, 
		{
			name: 'Net Zero Enterprises'
		},
		{
			name: 'Neurohacker'
		}, 
		{
			name: 'Rural India - Workshop'
		},
		{
			name: 'L7 Partnership'			
		}, 
		{
			name: 'The Graveyard-Misc Projects-'
		}
		
	],
	"idx": function() {
	    return idx++;
	}, 
	"css_class": function(){
		return "pc_" + this.name.toLowerCase().replace(/ /g, "_");
	},
}; 