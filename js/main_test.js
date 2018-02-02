// From https://davidwalsh.name/javascript-debounce-function.
function debounce(func, wait, immediate) {
	var timeout;
	return function() {
		var context = this, args = arguments;
		var later = function() {
			timeout = null;
			if (!immediate) func.apply(context, args);
		};
		var callNow = immediate && !timeout;
		clearTimeout(timeout);
		timeout = setTimeout(later, wait);
		if (callNow) func.apply(context, args);
	};
};

$(function(){

	// //CSS Changes: 
	// //
	// //
	// let projectWidth = $('#project-list').width();
	// let sortWidth = $('#sort-options').width();
	// let windowWidth = $(window).width(); 
	// let projectContentWidth = windowWidth - sortWidth - projectWidth; 
	// console.log(projectContentWidth);

	// $('#project-content').width(projectContentWidth); 


    //Mustache: 
	//
	//
	console.log("About to start Mustache"); 
	
	//Project List: 
	var projectList  =$('#project-list-template').html();
	Mustache.parse(projectList);
	var rendered = Mustache.render(projectList, workCases);
	$('#project-list').html(rendered);

	//Project Content:
	console.log("About to start Mustache"); 
	var projectContent  =$('#project-content-template').html();
	Mustache.parse(projectContent);
	var rendered = Mustache.render(projectContent, workCases);
	$('.project-content-container').html(rendered);


	//Charming: 
	//
	//
	$('.project-content-item .project-title h1').lettering('words');

	
	//Scrolling behavior: 
	//
	let projectScrollAnimation = new TimelineMax(); 

	//Overall movement of the container
	let numOfProjects = $('.project-content-item').length; 
	let stepLength = 100/numOfProjects; 
	let yMove = 0,
		timelineMove = stepLength;  
	//let tweenAnimations = []; 

	function sectionExit(currClass){
		return [
			new TweenMax.staggerTo(currClass + ' .project-title h1.title span', .8, {opacity: 0, y: "-100%", ease:Expo.easeOut}, .08),
			new TweenLite.to(currClass + ' .role', .8, {opacity: 0, y: "-100%", ease:Expo.easeOut}, "-=.8"),
			new TweenLite.to(currClass + ' .type-of-project', .4, {opacity: 0, y: "-100%", ease:Expo.easeOut}, "-=.8"),
			new TweenLite.to(currClass + ' .subheading p', .4, {opacity: 0, y: "-10%", ease:Expo.easeOut}, "-=.8"),
			new TweenLite.to(currClass + ' img', .2, {opacity: 0, y: "-40%", ease:Expo.easeOut}, "-=.8"),
		];
	// tweenAnimations.push(new TweenLite.to(currClass + ' img', .2, {opacity: 0, y: "-40%", ease:Expo.easeOut}, "-=.8"))
	}

	function sectionEnter(nextClass){
		return [
			new TweenLite.from(nextClass + ' img', .3, {opacity: 0, y: "20%", ease:Expo.easeOut}),
			new TweenMax.staggerFrom(nextClass + ' .project-title h1.title span', .8, {opacity: 0, y: "100%", ease:Expo.easeOut}, .08),
			//new TweenLite.from(nextClass + ' .project-title h1.title span', .8, {opacity: 0, y: "100%", ease:Expo.easeOut}, "-=.7"),
			new TweenLite.from(nextClass + ' .type-of-project', .3, {opacity: 0, y: "100%", ease:Expo.easeOut}),
			new TweenLite.from(nextClass + ' .role', .3, {opacity: 0, y: "100%", ease:Expo.easeOut}),
			new TweenLite.from(nextClass + ' .subheading p', .4, {opacity: 0, y: "40%", ease:Expo.easeOut}),
		];
	 }

	//div id: 
	let contentItemIds = $('.project-content-item').map(function(index,dom){return dom.id})

	for(let i = 0; i < numOfProjects -1; i++){
		console.log("Build Timeline - yMove: " + yMove); 
		yMove += stepLength;
		timelineMove += stepLength;
		let currClass = "#" + contentItemIds[i].trim();
		let nextClass = "#" + contentItemIds[i+1].trim();
		projectScrollAnimation.add(sectionExit(currClass), "+=.01", "start", .01);
		projectScrollAnimation.to(".project-content-container", .2, {y: "-" + yMove + "%"}, "-=.5"); 
		projectScrollAnimation.to("#project-timeline", .3, {height: timelineMove + "%"}, "-=.8");
		projectScrollAnimation.add(sectionEnter(nextClass), "-=.3", "start", .01);
		projectScrollAnimation.set({}, {}, "+=1");
		//projectScrollAnimation.addCallback(completeAnimation, null, [nextClass]);

		//tweenAnimations.push(new TweenLite.to(nextClass, 2, {opacity: 1}, "-=.01")); 
		//ADD A DELAY HERE:

		//tweenAnimations.push(new TweenLite.to(".project-content-container", .5, {y: "-" + yMove + "%"})); 
	}

	function completeAnimation(nextClass){
		console.log("The Class " + nextClass + " Completed Section: " + scrollController.scrollPos());
	}
	console.log(projectScrollAnimation);
	//projectScrollAnimation.add(tweenAnimations, ".2", "start", .05);
	//console.log("Tween Animations: " + tweenAnimations);
	console.log("Duration is: " + projectScrollAnimation.totalDuration());

	let scrollController = new ScrollMagic.Controller();

	let scrollMagicScene = new ScrollMagic.Scene({
			triggerElement: "#layout", 
			triggerHook: "onLeave", 
			duration: "1190%",
	    })
		.setPin('#project-content')
		.setTween(projectScrollAnimation)
		.addIndicators()
		.addTo(scrollController); 

    scrollController.scrollTo(function (newpos) {
    	console.log(newpos);
		TweenMax.to(window, 0.7, {scrollTo: { y: newpos}});
	});


	//Timeline Clicks: 
	//
	//
	$('.project-timeline-link').on("click", function(e){
		var id = $(this).attr("href"); 
		if($(id).length > 0){
			e.preventDefault(); 
			console.log("The id place: " + id);
			console.log("The position place: " + $(id).offset().top);
			TweenMax.to(window, 0.7, {scrollTo: { y: id}});
			//scrollController.scrollTo(id); 
		}
	});

});


 