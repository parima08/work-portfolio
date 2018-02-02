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
	let tweenAnimations = []; 

	function sectionExit(currClass){
		tweenAnimations.push(new TweenMax.staggerTo(currClass + ' .project-title h1.title span', .8, {opacity: 0, y: "-100%", ease:Expo.easeOut}, .07))
		tweenAnimations.push(new TweenLite.to(currClass + ' .role', .8, {opacity: 0, y: "-100%", ease:Expo.easeOut}, "-=.8"))
		tweenAnimations.push(new TweenLite.to(currClass + ' .type-of-project', .4, {opacity: 0, y: "-100%", ease:Expo.easeOut}, "-=.8"))
		tweenAnimations.push(new TweenLite.to(currClass + ' .subheading p', .4, {opacity: 0, y: "-10%", ease:Expo.easeOut}, "-=.8"))
		tweenAnimations.push(new TweenLite.to(currClass + ' img', .2, {opacity: 0, y: "-40%", ease:Expo.easeOut}, "-=.8"))
	}

	function sectionEnter(nextClass){
		tweenAnimations.push(new TweenLite.from(nextClass + ' img', .1, {opacity: 0, y: "20%", ease:Expo.easeOut}, "-=.7"));
		tweenAnimations.push(new TweenLite.from(nextClass + ' .project-title h1.title span', .8, {opacity: 0, y: "100%", ease:Expo.easeOut}, "-=.7")); 
		//tweenAnimations.push(new TweenMax.staggerFrom(nextClass + ' .project-title h1.title span', .8, {opacity: 0, y: "100%", ease:Expo.easeOut}, .07, "-=.7"));
		tweenAnimations.push(new TweenLite.from(nextClass + ' .type-of-project', .2, {opacity: 0, y: "100%", ease:Expo.easeOut}, "-=.7"));
		tweenAnimations.push(new TweenLite.from(nextClass + ' .role', .2, {opacity: 0, y: "100%", ease:Expo.easeOut}, "-=.5"));
		tweenAnimations.push(new TweenLite.from(nextClass + ' .subheading p', .2, {opacity: 0, y: "40%", ease:Expo.easeOut},"-=.5"))
		//tweenAminmations.push(new TweenLite.)
	}

	//div id: 
	let contentItemIds = $('.project-content-item').map(function(index,dom){return dom.id})

	for(let i = 0; i < numOfProjects -1; i++){
		console.log("Build Timeline - yMove: " + yMove); 
		yMove += stepLength;
		timelineMove += stepLength;
		let currClass = "#" + contentItemIds[i].trim();
		let nextClass = "#" + contentItemIds[i+1].trim();
		sectionExit(currClass);
		tweenAnimations.push(new TweenLite.to(".project-content-container", .01, {y: "-" + yMove + "%"}, "+=.1")); 
		tweenAnimations.push(new TweenLite.to("#project-timeline", .3, {height: timelineMove + "%"}, "-=.8"));
		sectionEnter(nextClass);

		//tweenAnimations.push(new TweenLite.to(".project-content-container", .5, {y: "-" + yMove + "%"})); 
	}
	projectScrollAnimation.add(tweenAnimations, ".2", "start", .05);
	console.log("Tween Animations: " + tweenAnimations);
	console.log("Duration is: " + projectScrollAnimation.totalDuration());

	let scrollController = new ScrollMagic.Controller();

	let scrollMagicScene = new ScrollMagic.Scene({
			triggerElement: "#layout", 
			triggerHook: "onLeave", 
			duration: $('.project-content-container').height() + 600,
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
			scrollController.scrollTo(id); 
		}
	});

});

	// projectScrollAnimation
	// 	.staggerTo('.project-content-item.active .project-title h1.title span', .8, {opacity: 0, y: "-100%", ease:Expo.easeOut}, .07)
	// 	.to('.project-content-item.active .type-of-project', .4, {opacity: 0, y: "-100%", ease:Expo.easeOut}, 0)
	// 	.to('.project-content-item.active .role', .8, {opacity: 0, y: "-100%", ease:Expo.easeOut}, 0)
	// 	.to('.project-content-item.active .subheading p', .4, {opacity: 0, y: "-10%", ease:Expo.easeOut}, 0)
	// 	.to('.project-content-item.active img', .2, {opacity: 0, y: "-40%", ease:Expo.easeOut}, 0)
	// 	.to(".project-content-container", .01, {y: "-9%"}, .5)
	// 	.from('.project-content-item.next img', .5, {opacity: 0, y: "20%", ease:Expo.easeOut}, .5)
	// 	.staggerFrom('.project-content-item.next .project-title h1.title span', .3, {opacity: 0, y: "100%", ease:Expo.easeOut}, .07, .65)
	// 	.from('.project-content-item.next .type-of-project', .2, {opacity: 0, y: "100%", ease:Expo.easeOut}, .8 )
	// 	.from('.project-content-item.next .role', .4, {opacity: 0, y: "100%", ease:Expo.easeOut}, .65)
	// 	.from('.project-content-item.next .subheading p', .2, {opacity: 0, y: "40%", ease:Expo.easeOut}, .7)


/*
//Scrolling behavior: 
	//
	//

	let typeOfProject = $('.active.project-content-item .type-of-project'), 
		projectTitle = $('.active.project-content-item  .project-title'),
		subheading = $('.active.project-content-item  .subheading'), 
		role = $('.active.project-content-item .role');

	let typeOfProjectOffset = typeOfProject.offset().top + typeOfProject.height(),
		projectTitleOffset = projectTitle.offset().top + projectTitle.height(), 
		subheadingOffset = subheading.offset().top + subheading.height() + 20, 
		roleOffset = role.offset().top + role.height(); 

	let typeOfProjectOffsetBttm = $(window).height() - (typeOfProject.offset().top - typeOfProject.height()),
		projectTitleOffsetBttm = $(window).height() - (projectTitle.offset().top - projectTitle.height()), 
		subheadingOffsetBttm = $(window).height() - (subheading.offset().top - subheading.height() - 20), 
		roleOffsetBttm = $(window).height() - (role.offset().top - role.height()); 

	console.log("Offsets: typeOfProjectOffset: " + typeOfProjectOffset);
	console.log("Offsets: typeOfProjectOffset: " + typeOfProjectOffsetBttm);


	var projectScrollAnimation = new TimelineMax()
		.to('.active.project-content-item .type-of-project', .8, {y: "-" + typeOfProjectOffset + "px"})
		.to('.active.project-content-item .project-title', 1.2, {y: "-" + projectTitleOffset + "px"}, "0.4") 
		.to('.active.project-content-item .subheading', .4, {y: "-" + subheadingOffset + "px"}, "0.52") 
		.to('.active.project-content-item .role', .48, {y: "-" + roleOffset + "px"}, "0.6")
		.to(".project-content-container", .1, {y: "-9%"}, "1")
		.from('.next.project-content-item .type-of-project', .5, {y: typeOfProjectOffsetBttm + "px"}, "1.2")
		.from('.next.project-content-item .project-title', .8, {y: projectTitleOffsetBttm + "px"}, "1") 
		.from('.next.project-content-item .subheading', .4, {y: subheadingOffsetBttm + "px"}, "1.4") 
		.from('.next.project-content-item .role', .48, {y: roleOffsetBttm + "px"}, "1.3")


	//Overall movement of the container
	let numOfProjects = $('.project-content-item').length; 
	let stepLength = 100/numOfProjects; 
	let yMove = 0; 
	let tweenAnimations = []; 

	//class names: 
	let pc_classnames = $.map($('.project-content-item'), function(el){ 
		let classes = el.className; 
		let css_class = classes.substring(classes.lastIndexOf("pc"));
		return css_class
	});

	console.log("pc_classnames: " + pc_classnames);

	for(let i = 0; i < numOfProjects; i++){
		console.log("Build Timeline - yMove: " + yMove); 
		yMove += stepLength;
		tweenAnimations.push(new TweenLite.to(".project-content-container", .5, {y: "-" + yMove + "%"})); 
	}
	projectScrollAnimation.add(tweenAnimations, "1.2", "sequence", 1.5);

	var scrollController = new ScrollMagic.Controller();

	var scrollMagicScene = new ScrollMagic.Scene({
			triggerElement: "#layout", 
			triggerHook: "onLeave", 
			duration: $('.project-content-container').height(),
	    })
		.setPin('#project-content')
		.setTween(projectScrollAnimation)
		.addIndicators()
		.addTo(scrollController); 
*/


 