$(function(){

	// var technology = ["Javascript": ["d3.js", "AngularJS", "jQuery"], "Ruby": { "Ruby on Rails"}, 
	// 					"Java": {"Android Studio Library"}, 
	// 					"Python", "C"]

	var workCases = { "workCases": [
		{
			name: "Micron",
			letter: "M",  
			shortDescription: "Lorem ipsum dolor sit amet, doctus facilisi recusabo mel ex. Te omittam maluisset has, mea agam graecis sensibus ut. Sonet placerat nec ea, te ius nobis dolorem efficiendi, ex omnes causae suscipit eam. No eam primis tritani, elit minimum", 
			"technology": ["jQuery", "HTML/CSS"], 
			"skill": ["Project Management", "User Experience"], 
		},
		{
			name: "NOTX", 
			letter: "N",
			shortDescription: "Cybersecurity Project, blah", 
			"technology": ["jQuery", "HTML/CSS"], 
			"skill": ["Project Management", "Development"],
			
		},
		{
			name: "Piggybank", 
			letter: "P",
			shortDescription: "Cybersecurity Project, blah", 
			"technology": ["jQuery", "HTML/CSS"], 
			"skill": ["Project Management", "Development"],
			
		}
	]}; 

	// letter: getLetter(this.name)
	// function getLetter(name){ return name.charAt(0).toUpperCase()}
	
	var white  = "#FFF"
	  	lightGrey = "#4A4A4A",
	   	yellow = "#F8E71C",
	  	darkGrey = "#222121", 
	  	descriptionTextGrey = "rgba(158, 158, 158, 1)", 
	  	darkGreyText= "#3A3A3A"; 


	//SCROLL ANIMATION: 

	var controller = new ScrollMagic.Controller();

	// var animateNumber = function{

	// }; 

	var animateWorkCaseIn = function(numberScroller){
		console.log("Animating");
		var workCaseAnimation = new TimelineMax()
			.fromTo(".work-case-container.active .letter", .2, {rotationZ: -90}, {rotationZ: 0, fontSize: "5em", color: white}) 
			.to('.work-number-scroller', .2, {y: numberScroller})
			.to(".work-case-container.active .work-case-line", .3, {width: 0}, .1)
			.fromTo(".work-case-container.active .fullName", .3, {width: 0, display: "block", opacity: 0}, {width: "100%", opacity: 1, color: white}, .1)
			.to(".work-case-container.active .letter", .1, {opacity: 0}, .4)
			.to(".work-case-container.active .fullName", .2, {top: "30%"}, .35)
			.fromTo(".work-case-container.active .description", .4, {display: "block", opacity: 0}, {opacity: 1, bottom: "40%", color: descriptionTextGrey}, .5)
			.fromTo(".work-case-container.active .yellow-circle-button", .3, {display: "block", rotationZ: "-90", opacity: "0"}, {rotationZ: 0, opacity: "1"}, .5);
	}

	var animateWorkCaseOut = function(numberScroller){
		var workCaseAnimationOut = new TimelineMax()
			.to(".work-case-container.active .description", .3, {top: "50%", opacity: 0, visibility: "none"}, 0)
			.to('.work-number-scroller', .2, {y: numberScroller})
			.to(".work-case-container.active .fullName", .3, {top: "50%", opacity: 0, visibility: "none", width: 0}, 0)
			.to(".work-case-container.active .work-case-line", .3, {width: "70%"}, .3)
			.to(".work-case-container.active .letter", .3, {opacity: 1, rotationZ: -90, fontSize: "7em", color: darkGreyText})
			.to(".work-case-container.active .yellow-circle-button", .3, {display: "none", rotationZ: "-90", opacity: "0"}, .3);
	}

	var styleCheck = function(){
		//for all work case containers get rid of the stuff
		if(".work-container-container"){}
	}

	

 	var animateWorkCases = function(){
	   var windowHeight = $(window).height();
	   var bottomActivate = (windowHeight/2) + (windowHeight/8);
	   var topActivate = (windowHeight/2) - (windowHeight/3);
	   console.log("Window Height: " + windowHeight + " Top Offset: " + topActivate
	   	 + " Bottom Activate: " + bottomActivate);
	   var workCaseContainers = $('.work-case-container');
	   var step = 0;
	   //TODO RECALCULATE THE STEP BASED ON WHERE YOU ARE.
	   var inActiveZone = false;
	   var currElementActivated = false; 
	   var scrollUp = true; 

	   function checkActiveCase(i, el){
	   		//and check if it's different from the currently active case too... 
	   		var currPos =  $(el).offset().top - $(window).scrollTop()
	   		if(currPos <= bottomActivate && currPos >= topActivate){
	   			console.log(i); 
	   			return [el, i]; 
	   		}
	   }; 
	   var previousActivatedEl; 
	   scrollMagicScene.on("progress", function(e){
	   		var shouldBeActive = $('.work-case-container').filter(checkActiveCase); 
	   		if(shouldBeActive.length>1){
	   			shouldBeActive = shouldBeActive[-1]; 
	   		}
	   		// if(shouldBeActive && shouldBeActive.length == 0 && previousActivatedEl == $('.work-case-container').last()){
	   		// 	console.log("LAST ONE HAS BEEN PASSED"); 
	   		// }
	   		if(shouldBeActive && shouldBeActive.length != 0 && !$(shouldBeActive).hasClass('active')){
	   			console.log("shouldBeActive");
	   			console.log(shouldBeActive);
	   			console.log("previousActivatedEl");
	   			console.log(previousActivatedEl)
	   			var index = shouldBeActive.index();
	   			var numberPercentage = index * -33.33; 
	   			if(previousActivatedEl){
	   				animateWorkCaseOut(numberPercentage + "%"); 
	   				turnClassOff(previousActivatedEl, "active"); 
	   			}
	   			turnClassOn(shouldBeActive, "active"); 
	   			animateWorkCaseIn(numberPercentage); 
	   			previousActivatedEl = null;
	   			previousActivatedEl = shouldBeActive;  
	   		}
	   }); 
	};

	function turnClassOn(element, className){
		el = $(element);
		if(!el.hasClass(className)){
			el.addClass(className);
		}
	}

	function turnClassOff(element, className){
		el = $(element);
		if(el.hasClass(className)){
			el.removeClass(className);
		}
	}

 	var scrollAnimation = new TimelineMax()
 		.fromTo(['section.intro'], .7, {z: -150}, {z: 100})
 		.fromTo(['section.intro'], 1, {y: "10%"}, {y: "-120%"}, "0")
 		.fromTo(["h2.in-pursuit"], 0.4, {x: "0"}, {x: "50%"}, ".1")
 		.fromTo(["h2.elegant-solutions"], 0.3, {x: "20%"}, {x: "-15%"}, ".1")
 		.from(".work-scroll", 0.2, {width: "10px"}, ".2")
 		.fromTo(['section.intro'], 0.2, {backgroundColor: white}, {backgroundColor: darkGrey}, ".3")
 		.from("section.work", 0.2, {backgroundColor: white}, .3)
 		.from("section.work", 0, {z: -150, }, .25)
 		.fromTo(".work-scroll", 0.4, {width: "350px"}, {width: "10px"}, .55)
 		.fromTo("section.work", .4, {y: "100%"}, {y: "0%"}, .3)
 		.from(".work-title", 0.2, {x: "100%"}, .37)
 		.fromTo(".work-details-column", 0.2, {transformStyle:"preserve-3d", rotationY: 90, transformOrigin:" center top", transformPerspective: 2300 }, {rotationY: 0}, .5)
 		.fromTo(".work-cases-scroll", 1.2, {y: "80%"} , {y: "-130%"}, .55) 
 		.addCallback(animateWorkCases, .6);
 	
 		//.from("hr.small-hr", 0.2, {width: "0px"}, .5);
 		// .to('section.intro', 0.5, {z: -150});

 	// function animateWorkCaseScroll(){
 	// 	return new TimelineMax()
 	// 		.fromTo('.work-cases-scroll', {y: "100%"} , {y: "-100%"},  0)
 	// }

 	// var workScrollAnimation = new TimelineMax()
 	// 	.fromTo(".work-cases-scroll", 1, {y: "100%"}, {y: "-100%"}, 1)

 	var scrollMagicScene = new ScrollMagic.Scene({
            triggerElement: "#pinContainer",
            triggerHook: "onLeave",
            duration: "380%",
            pushFollowers: false,
          })
          .setPin("#pinContainer")
          .setTween(scrollAnimation)
          .addIndicators() // add indicators (requires plugin)
          .addTo(controller);
    
   
 //    scrollMagicScene.on("progress", function (e) {
	//     var distanceFromTop = $('.work-case-container').offset().top - $(window).scrollTop()

	//     // console.log(e);
	//     // var scrolledAmount = $(".")._gsTransform.y
	//     // var active_element = Math.floor( (degree +15) /30) * -1 ;
	//     // console.log("Active Element: " + active_element);
	//     // setActiveElement(active_element);    
	// }); 

 //    var workScroll = $('.work-cases-scroll');
 //   	var workScrollWatcher = scrollMonitor.create(workScroll, -600);

	// workScrollWatcher.exitViewport(function() {
	//    console.log("Viewport Exit, but really just enetered");
	//    //$(".work-case-container").removeClass("active");
	//    // alert("exited viewport")
	// });
	// workScrollWatcher.enterViewport(function() {
	//     console.log("Viewport Entered, but really just exited");
	//    // $(".work-case-container").addClass("active");
	// });

   

 //    //Handlebars: 
 // 	console.log("About to start Handlebars"); 
 //    var template =$('#template').html();
	// var compiled_template = Handlebars.compile(template);
	// var rendered = compiled_template({title: "Parima"});
	// $('#work-cases-container').html(rendered);

	//Mustache: 
	// console.log("About to start Mustache"); 
	// var template =$('#template').html();
	// Mustache.parse(template);
	// //TODO: add index and letter to workcases dynamically
	// var rendered = Mustache.render(template, workCases);
	// $('.work-cases-scroll').html(rendered);

    //TECHNOLOGY ACTIVATIONS: 

    //TECHNOLOGY ANIMATION

   		//Display all main categories. 
   		//If there is a subcategory, display all and activate the
   		//ones listed. (add class "active") 


    //WORK CASE 
});



 