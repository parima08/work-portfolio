var idx = 1; 
var workCases = { 
	"workCases": [
		{
			index: 1,
			name: "IoT Piggybank", 
			type: "Case Study/Ciklum",
			role: "Lead Android Developer",
			class: "active",
			skill_set: "mobile-application cloud ui-design",
			industries: "iot",
			subheading: "For this client, I architected an extensible, flexible Mobile solution (application and library) for an IoT Piggybank. The solution would complete wifi provisioning, registration, solutions for offline scenarios, etc." , 
			image: "img/project-bg/iot-piggybank-grad.png", 
			readMore: true,
			case_study_link: "work-cases/iot-piggybank.html",
			case_study_subheading: "internet of things", 
			technologies: "Android, Photon Development, Javascript",
			skills: "Software Architecture, Mobile Development", 
			case_study_image: "img/project-bg/iot-piggybank.png", 
			bg_color: "#F7D0B8",
		}, 
		{
			index: 2,
			name: "Smart Lock",
			subheading: "Our client was developing a smart lock that needed a secure, flexible, and extensible back end system. We designed and built a RESTful JSON API interfacing with both mobile and embedded devices. In addition, worked on designing and employing a DevOps continuous integration pipeline for our client.", 
			type: "Case Study/Room 5", 
			role: "Integration Server Lead",
			class: "next",
			skill_set: "full-stack-dev cloud",
			industries: "iot",
			image: "img/project-bg/smart-lock-grad.png", 
			case_study_image: "img/project-bg/smart-lock.png",
			readMore: true,
			case_study_link: "work-cases/smart-lock.html",
			case_study_subheading: "internet of things",
			technologies: "Ruby on Rails,  AWS, Heroku",
			skills: "Full Stack Development, Cloud Services", 
			bg_color: "#DDC2E4",
		},
		{
			index: 3,
			name: "Cybersecurity Dashboard", 
			subheading: "For this project, I built the user facing system of a protocol that protects against DDoS attacks. For this project, I wrote a scrubber that grabbed data from the back end system, a configurable metrics dashboard that plugged into the system, and a set of extensible visualization tools that exposed the protocol to non-technical users. ", 
			type: "Case Study/Room 5",
			role: "Lead Full Stack Developer",
			skill_set: "full-stack-dev ui-design",
			industries: "cybersecurity",
			image: "img/project-bg/cybersecurity-dashboard-grad.png", 
			readMore: true, 
			case_study_link: "work-cases/cybersecurity-dashboard.html", 
			case_study_subheading: "cybersecurity", 
			technologies: "Ruby on Rails, SNMP, SSE (Server Sent Events), HTTP, Git, Jenkins, Gerrit",
			skills: "Full Stack Development, Design", 
			case_study_image: "img/project-bg/cybersecurity-dashboard.png", 
			bg_color: "#D5E4F7"
			
		},
		{
			index: 4,
			name: "Network Visualization", 
			subheading: "I developed a web-based visual tool that would allow non-technical users to clearly see what occurs during DDoS attacks and view the protective effects of a cybersecurity protocol implemented at the ISP level. ", 
			type: "Case Study/Room 5",
			role: "Lead Full Stack Developer",
			skill_set: "full-stack-dev ui-design",
			industries: "cybersecurity",
			image: "img/project-bg/network-visualization-grad.png", 
			readMore: true, 
			case_study_link: "work-cases/network-visualization.html", 
			case_study_subheading: "data visualization",
			technologies: "Ruby on Rails, d3.js, Git, Jenkins, Gerrit",
			skills: "Full Stack Development, Design", 
			case_study_image: "img/project-bg/network-visualization.png",
			bg_color: "rgba(177,177,81,0.6)"
			//bg_color: "linear-gradient(-180deg, rgba(177,177,81,0.93) 0%, rgba(185,65,25,0.91) 100%);"
			
		},
		{
			index: 5,
			name: "Micron Developer Portal",
			image: "img/project-bg/micron-grad.png", 
			skill_set: "full-stack-dev ui-design",
			type: "Case Study/Ciklum",
			role: "Lead Full Stack Developer",
			readMore: true,
			case_study_link: "work-cases/developer-portal.html",
			subheading: "With the release of their revolutionary product, the Automata Processor, Micron needed an equally revolutionary system to introduce the product to the world and monitor and manage their audience’s response. I developed a developer portal for Micron.",
			skills: "Project Management, UI, Design, Full Stack Development, Testing",
			technologies: "Ruby on Rails, Selinum, Git, Agile, Flexeria and Nalperion Licensing APIs, SDK Distribution and Licensing",
			case_study_image: "img/project-bg/micron.png",
			bg_color: "#C6EBA1"
		},
		{
			index: 6,
			name: 'Verifone',
			image: "img/project-bg/verifone-grad.png",
			skill_set: "full-stack-dev project-management",
			role: "Interaction Designer and Front End Developer",
			subheading: "Verifone needed help in developing a UI toolkit for their Point-of-Sale terminal devices. They had two tiers of their terminal devices that had to be supported with their new designs. Older devices ran using a language called Direct GUI which runs a proprietary  stripped down version of HTML. The other tier used webkit. I create and implemented a new, modern UI toolkit and introduced animation into the constraints of Direct GUI.", 
		},
		{
			index: 7,
			name: 'SR Love and Care',
			image: "img/project-bg/srlc-grad.png",
			skill_set: "full-stack-dev  project-management ui-design cloud",
			industries: "non-profit"
		}, 
		{
			index: 8,
			name: 'Net Zero Enterprises',
			image: "img/project-bg/net-zero-grad.png",
			skill_set: "project-management cms ui-design",
			role: "Consultant and Wordpress Developer", 
			subheading: "This start up brought me in to consult them on their existing Wordpress site. I cleaned up their code base, optimized their solution, automated tasks, improved the company DevOps, and expanded their commerce module. The site can be found here. "
		},
		{
			index: 9,
			name: 'Neurohacker',
			skill_set: "project-management cms",
			image: "img/project-bg/neurohacker-grad.png",
		}, 
		{
			index: 10,
			name: 'Rural India - Workshop',
			skill_set: "project-management",
			image: "img/project-bg/engineering-workshop.png",
			industries: "non-profit"
		},
		{
			index: 11,
			name: 'L7 Partnership', 
			skill_set: "project-management cms",
			image: "img/project-bg/l7-partnership-grad.png",
			
		}, 
		{
			index: 12,
			name: 'Other Projects', 
		}
		
	],
	"idx": function() {
	    return idx++;
	}, 
	"css_class": function(){
		return "pc_" + this.name.toLowerCase().replace(/'()/g, "_").replace(/ /g, "_");
	},
}; 