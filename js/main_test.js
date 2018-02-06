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

	var scrollMagicScenes = []; 
	let scrollController = new ScrollMagic.Controller();
	
	//loads the templates and draws them onto the screen
	draw(workCases);

	//Filtering: 
	$('a.filter-proj').on('click', function(){
		let skillItem = this.id
		let filteredWc = workCases.workCases.filter(function(val){
			console.log(val.skill_set);
			if(val.skill_set && val.skill_set.includes(skillItem)){
				return val;
			}
		}); 
		console.log(filteredWc);
		draw({
			"workCases": filteredWc,
			"idx": workCases.idx, 
			"css_class": workCases.css_class,
		});
	});


	//draws everything onto the screen.

	function draw(filteredProjects){
		//removes all the stuff
		$('#project-list').html();
		$('.project-content-container').html();

		//rescrolls to the top of the page... 

		//TODO: preloader animation? where everything switches color

		//Mustache templates load everything!
		var projectList  =$('#project-list-template').html();
		Mustache.parse(projectList);
		var rendered = Mustache.render(projectList, filteredProjects);
		$('#project-list').html(rendered);

		//Project Content:
		console.log("About to start Mustache"); 
		var projectContent  =$('#project-content-template').html();
		Mustache.parse(projectContent);
		var rendered = Mustache.render(projectContent, filteredProjects);
		$('.project-content-container').html(rendered);


		// Charming: 
		// Seperates each "word" by putting spans around them
		//
		$('.project-content-item .project-title h1').lettering('words');

		//calculate the timeline
		//reintialize the controller
		//reintialize the scrollmagic scene
		scrollMagicCreation();
	}

	function scrollMagicCreation(){
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

		let contentItemIds = $('.project-content-item').map(function(index,dom){return dom.id})

		for(let i = 0; i < numOfProjects -1; i++){
			//console.log("Build Timeline - yMove: " + yMove); 
			yMove += stepLength;
			timelineMove += stepLength;
			let currClass = "#" + contentItemIds[i].trim();
			let nextClass = "#" + contentItemIds[i+1].trim();
			let nextProjectItem = $(".project-timeline-item[data-work-case = '" + contentItemIds[i+1].trim() + "'] .project-timeline-name"); 
			console.log(nextProjectItem);
			projectScrollAnimation.add(sectionExit(currClass), "+=.01", "start", .01);
			projectScrollAnimation.to(".project-content-container", .2, {y: "-" + yMove + "%"}, "-=.5"); 
			projectScrollAnimation.to("#project-timeline", .3, {height: timelineMove + "%"}, "-=.8");
			projectScrollAnimation.set('.project-timeline-name', {fontWeight: 400}, "-=1.1");
			projectScrollAnimation.set(nextProjectItem, {fontWeight: 600}, "-=1.1");
			highlightNextItems(nextClass); 
			projectScrollAnimation.add(sectionEnter(nextClass), "-=.3", "start", .01);
			//ADDS A DELAY of 1 second:
			projectScrollAnimation.set({}, {}, "+=1");
		}

		//console.log(projectScrollAnimation);
		//projectScrollAnimation.add(tweenAnimations, ".2", "start", .05);
		//console.log("Tween Animations: " + tweenAnimations);
		console.log("Duration is: " + projectScrollAnimation.totalDuration());

		// if(scrollController){
		// 	alert("there was a previous controller");
		// 	scrollController = scrollController.destroy(true);
		// }

		console.log("This many scenes: " + scrollMagicScenes.length); 

		if(scrollMagicScenes.length >= 1){
			console.log("Another scroll Magic Scene exits - deleting it now");
			scrollController.removeScene(scrollMagicScenes.pop());
			//scrollController.destroy(true); 
			console.log("This many scenes again: " + scrollMagicScenes.length); 
		}

		
		console.log("ScrollController--------");
		console.log(scrollController);
		let duration = numOfProjects * 100 * 1.5; 
		//let duration = numOfProjects * 100; 
		let scrollMagicScene = new ScrollMagic.Scene({
				triggerElement: "#layout", 
				triggerHook: "onLeave", 
				duration: duration + "%",
		    })
			.setPin('#project-content')
			.setTween(projectScrollAnimation)
			.addIndicators()
			.addTo(scrollController); 

		scrollMagicScenes.push(scrollMagicScene);

	    scrollController.scrollTo(function (newpos) {
	    	console.log(newpos);
			TweenMax.to(window, 0.7, {scrollTo: { y: newpos}});
		});

		//Timeline Clicks: 
		//
		//

		$('.project-timeline-link').on("click", function(e){
			alert("got clicked");
			var id = $(this).attr("href"); 
			let numOfProjects = $('.project-content-item').length; 
			if($(id).length > 0){
				e.preventDefault(); 
				console.log("The id place: " + id);
				console.log("The position place: " + $(id).offset().top);

				//TODO: Need to get this "index" value dynamically... the index
				//of the value in the array of project-content-items. 

				let indexOfId = $(this).data('index');
				//console.log(indexOfId);
				let docHeight = getDocHeight();
				let scrollToPos = (docHeight/numOfProjects) * (indexOfId - 1) * (1.03)
				//TODO: 
				//change the tween duration to calculate overall height and divide it
				//by the amount needed to scroll.
				
				//let travelSpeed = scrollToPos/docHeight * 1.2;
				//console.log("Amount to travel:" + scrollToPos/docHeight);
				TweenMax.to(window, .6, {scrollTo: { y: scrollToPos}});
			}
		});


	}

	




	
	//Scrolling behavior: 
	//
	//

	//TODO: Animation only when there is more than 1 project!


	






	//Be able to correctly calculate the positions of "paused"
	//timeline? 


	//Highlights on the correct data cases:
	function highlightNextItems(activeClass){

		//watches as the screen scrolls - highlight 
		//the various skill sets

		console.log("highlightNextItems");

		//removes all active classes 
		$('#skill-set-list li').removeClass("active"); 
		let skillSet = $(activeClass).data('skill-set');
		if(skillSet){
			skillSet = skillSet.split(" ")
			console.log("skillSet: " + skillSet);
			$.each(skillSet, function(i, v){
				$("#" + v).addClass("active");
			})
		}

	}

	function getDocHeight() {
	    var D = document;
	    return Math.max(
	        D.body.scrollHeight, D.documentElement.scrollHeight,
	        D.body.offsetHeight, D.documentElement.offsetHeight,
	        D.body.clientHeight, D.documentElement.clientHeight
	    )
	}

});


 