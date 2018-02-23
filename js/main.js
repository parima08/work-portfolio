 $(function(){
    let settings = {
        onEnter: function() {
            console.log("onEnter")
          // The new Container is ready and attached to the DOM.
        },
        onEnterCompleted: loadPageJs,
        onLeave: function() {
          // A new Transition toward a new page has just started.
        },
        //onLeaveCompleted: loadPageJs
    }
    var Homepage = Barba.BaseView.extend(
                    $.extend({
                        namespace: 'homepage',
                    }, settings)
    );
    var Work = Barba.BaseView.extend(
                    $.extend({
                        namespace: 'work',
                    }, settings)
    );
    Homepage.init();
    Work.init(); 
    startBarba(); 
    pageTransitions(); 
});


let scrollController = new ScrollMagic.Controller();

function onWorkPageLoad(){
	console.log("onWorkPageLoad"); 
	//alert("Previous URL: " + Barba.HistoryManager.prevStatus().url);
	idx = 1; 
	var scrollMagicScenes = []; 
	//loads the templates and draws them onto the screen
	scrollController = new ScrollMagic.Controller();

	draw(workCases);

	$('.skill-set a.filter-proj').on('click', function(){filterObject('skill_set', this.id); 
													$('.filter-proj').removeClass('selected');
													$(this).addClass('selected');
										   		});
	$('.industries a.filter-proj').on('click', function(){filterObject('industries', this.id);
										 			$('.filter-proj').removeClass('selected');
													$(this).addClass('selected');
										 		});
	$('#all-projects').on('click', function(){
		$('a.filter-proj').removeClass('selected').removeClass('active');
		idx = 1
		draw(workCases); 
	}); 

	function filterObject(filterTopic, skillItem){
		let filteredWc = workCases.workCases.filter(function(val){
			console.log(val[filterTopic]);
			if(val[filterTopic] && val[filterTopic].includes(skillItem)){
				return val;
			}
		}); 
		console.log(filteredWc);
		idx = 1; 

		//TODO: preloader animation? where everything switches color
		loadPreloader();
		draw({
			"workCases": filteredWc,
			"idx": workCases.idx, 
			"css_class": workCases.css_class,
		});

	}


	//draws everything onto the screen.

	function draw(filteredProjects){
		//TODO: removes all the stuff
		$('#project-list').empty();
		$('.project-content-container').empty();

		//rescrolls to the top of the page... 

		//Mustache templates load everything!
		$.get('templates.html', function(template){
			//var projectList  =$('#project-list-template').html();
			var projectList  = $(template).filter('#project-list-template').html();
			//console.log($(template).html());
			Mustache.parse(projectList);
			var rendered = Mustache.render(projectList, filteredProjects);
			$('#project-list').html(rendered);

			//Project Content:
			console.log("About to start Mustache"); 
			var projectContent  = $(template).filter('#project-content-template').html();
			//var projectContent  =$('#project-content-template').html();
			Mustache.parse(projectContent);
			var rendered = Mustache.render(projectContent, filteredProjects);
			$('.project-content-container').html(rendered);
		})
		.done(function(){
			
			//let the height of the container so that scrollmagic can work
			$("#layout").height($('.project-content-container').height() * 1.2); 

			// Charming: 
			// Seperates each "word" by putting spans around them
			//
			$('.project-content-item .project-title h1').lettering('words');
			slices('#project-content .uncover', {
				slicesTotal: 5,
				slicesColor: 'white',
				orientation: 'vertical'
			});

			//calculate the timeline
			//reintialize the controller
			//reintialize the scrollmagic scene
			scrollMagicCreation();
		}); 
	}

	function scrollMagicCreation(){
		let projectScrollAnimation = new TimelineMax(); 

		//Overall movement of the container
		let numOfProjects = $('.project-content-item').length; 
		let stepLength = 100/numOfProjects; 
		let yMove = 0,
			timelineMove = stepLength;

		let contentItemIds = $('.project-content-item').map(function(index,dom){return dom.id})
		
		//let tweenAnimations = []; 

		function initialize(){
			animateSlices('#' + $('.project-content-item')[0].id, "100%"); 
			let firstClass = "#" + contentItemIds[0]; 
			let nextItemsToHighlight = highlightNextItems(firstClass)
			$(".sort-group ul a li").removeClass("active")
			//projectScrollAnimation.set(".sort-group ul a li", {className: "-=active"}, "0")
			if(nextItemsToHighlight && nextItemsToHighlight.length != 0){
				projectScrollAnimation.set("#project-timeline", {height: timelineMove + "%"});
				projectScrollAnimation.set(nextItemsToHighlight, {className: "+=active"}, "0")
				projectScrollAnimation.set(nextItemsToHighlight, {className: "+=active"}, "0")
				projectScrollAnimation.set(".project-timeline-name:first", {fontWeight: 600, color: "#616161"}, "0")
				projectScrollAnimation.set({}, {}, "+=.5")
				//projectScrollAnimation.to(nextItemsToHighlight.toString(), .01, {fontWeight: 600, background: 'black'}, "-=.8")
			}
		}

		function sectionExit(currClass){
			return [
				new TweenMax.staggerTo(currClass + ' .project-title h1.title span', .8, {opacity: 0, y: "-140%", ease:Expo.easeOut}, .08),
				new TweenLite.to(currClass + ' .role', .8, {opacity: 0, y: "-100%", ease:Expo.easeOut}, "-=.8"),
				new TweenLite.to(currClass + ' .type-of-project', .4, {opacity: 0, y: "-100%", ease:Expo.easeOut}, "-=.8"),
				new TweenLite.to(currClass + ' .subheading p', .4, {opacity: 0, y: "-10%", ease:Expo.easeOut}, "-=.8"),
				new TweenLite.to(currClass + ' img', .4, {opacity: 0, y: "-40%", ease:Expo.easeOut}, "-=.6")
				.eventCallback("onComplete", animateSlices, [currClass, "0%"])
				.eventCallback("onComplete", setEventStatusBar, [currClass]) 
				.eventCallback("onReverseComplete", setEventStatusBar, [currClass]) 
			];
		// tweenAnimations.push(new TweenLite.to(currClass + ' img', .2, {opacity: 0, y: "-40%", ease:Expo.easeOut}, "-=.8"))
		}

		function sectionEnter(currClass, nextClass){
			return [
				new TweenLite.from(nextClass + ' img', .4, {opacity: 0, y: "20%", ease:Expo.easeOut})
				.eventCallback("onStart", animateSlices, [nextClass, "100%"])
				.eventCallback("onReverseComplete", reverseCheck, [currClass, nextClass]),
				new TweenMax.staggerFrom(nextClass + ' .project-title h1.title span', .8, {opacity: 0, y: "200%", ease:Expo.easeOut}, .08),
				//new TweenLite.from(nextClass + ' .project-title h1.title span', .8, {opacity: 0, y: "100%", ease:Expo.easeOut}, "-=.7"),
				new TweenLite.from(nextClass + ' .type-of-project', .3, {opacity: 0, y: "100%", ease:Expo.easeOut}),
				new TweenLite.from(nextClass + ' .role', .3, {opacity: 0, y: "100%", ease:Expo.easeOut}),
				new TweenLite.from(nextClass + ' .subheading p', .4, {opacity: 0, y: "40%", ease:Expo.easeOut}),
			];
		 }


		initialize(); 
		for(let i = 0; i < numOfProjects -1; i++){
			//console.log("Build Timeline - yMove: " + yMove); 
			yMove += stepLength;
			timelineMove += stepLength;
			let currClass = "#" + contentItemIds[i].trim();
			let nextClass = "#" + contentItemIds[i+1].trim();
			let nextProjectItem = $(".project-timeline-item[data-work-case = '" + contentItemIds[i+1].trim() + "'] .project-timeline-name"); 
			console.log(nextProjectItem);
			projectScrollAnimation.add(sectionExit(currClass), "+=.01", "start", .01);
			projectScrollAnimation.to(".project-content-container", .2, {y: "-" + yMove + "%", }, "-=.5"); 

			//projectScrollAnimation.to('#full-stack-dev li', .2, {fontWeight: 600, background: '#DCDCDC'}, "-=.8")
			projectScrollAnimation.add(sectionEnter(currClass, nextClass), "-=.3", "start", .01);

			projectScrollAnimation.to("#project-timeline", .3, {height: timelineMove + "%"}, "-=.8");
			projectScrollAnimation.set('.project-timeline-name', {fontWeight: 400, color: "#8F8F8F"}, "-=.8");
			projectScrollAnimation.set(nextProjectItem, {fontWeight: 600, color: "#616161"}, "-=.8");


			let nextItemsToHighlight = highlightNextItems(nextClass); 
			projectScrollAnimation.set(".sort-group ul a li", {className: "-=active"}, "-=.8")
			if(nextItemsToHighlight && nextItemsToHighlight.length != 0){
				projectScrollAnimation.set(nextItemsToHighlight, {className: "+=active"}, "-=.8")
				//projectScrollAnimation.to(nextItemsToHighlight.toString(), .01, {fontWeight: 600, background: 'black'}, "-=.8")
			}
			//ADDS A DELAY of 1 second:
			projectScrollAnimation.set({}, {}, "+=.25")

			//TODO: Add a bounce to the image
			//projectScrollAnimation.to(nextClass + ' img', .5, {y: "-20%", ease:Expo.easeOut}, "-=.5");
		}

		console.log("Duration is: " + projectScrollAnimation.totalDuration());

		console.log("This many scenes: " + scrollMagicScenes.length); 
		if(scrollMagicScenes.length >= 1){
			console.log("Another scroll Magic Scene exits - deleting it now");
			scrollController.removeScene(scrollMagicScenes.pop());
			//scrollController.destroy(true); 
			console.log("This many scenes again: " + scrollMagicScenes.length); 
			reintialize(); 

		};

		let duration = numOfProjects * 100; 
		//let duration = numOfProjects * 100; 
		let scrollMagicScene = new ScrollMagic.Scene({
				triggerElement: "#layout", 
				triggerHook: "onLeave", 
				duration: duration + "%",
				pushfollowers: true,
		    })
			.setPin('#project-content')
			.setTween(projectScrollAnimation)
			.addTo(scrollController);
			//.addIndicators(); 

		scrollMagicScenes.push(scrollMagicScene);

	    scrollController.scrollTo(function (newpos) {
	    	console.log(newpos);
			TweenMax.to(window, 0.7, {scrollTo: { y: newpos}});
		});

		//Timeline Clicks: 
		//
		//

		$('.project-timeline-link').on("click", function(e){
			//alert("got clicked");
			var id = $(this).attr("href"); 
			let numOfProjects = $('.project-content-item').length; 
			if($(id).length > 0){
				e.preventDefault(); 
				console.log("The id place: " + id);
				console.log("The position place: " + $(id).offset().top);

				//TODO: Need to get this "index" value dynamically... the index
				//of the value in the array of project-content-items. 
				$('.uncover_slice').hide();
				$(id + ' .uncover_slice').show(); 

				
				//alert($('.project-timeline-link').index(this));
				//console.log(indexOfId);
				let docHeight = getDocHeight();

				//let indexOfId = $(this).data('index');
				//let scrollToPos = (docHeight/numOfProjects) * (indexOfId - 1) * (1.03)
				//let factor; 
				let factor = (-0.02 * numOfProjects) + 1.14

				// if(numOfProjects > 10){
				// 	factor = .9
				// }
				// else{
				// 	factor = 1.04
				// }
				let indexOfId =  $('.project-timeline-link').index(this); 
				let scrollToPos = (docHeight/numOfProjects) * indexOfId * factor;

				//TODO: 
				//change the tween duration to calculate overall height and divide it
				//by the amount needed to scroll.
				
				//let travelSpeed = scrollToPos/docHeight * 1.2;
				//console.log("Amount to travel:" + scrollToPos/docHeight);
				TweenMax.to(window, .6, {scrollTo: { y: scrollToPos}})
						.eventCallback('onComplete', unhideSlices);
			}
		});

		function unhideSlices(){
			$('.uncover_slice').show(); 
		}

		function reintialize(){
			TweenMax.set('.project-content-container', {y: "0%"});
			TweenMax.to(window, .2, {scrollTo: { y: 0}})
			//TweenMax.set('#project-timeline', {height: "0%"});
		}


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
		//$('#skill-set-list a').removeClass("active"); 
		let skillSet = $(activeClass).data('skill-set');
		let industrySet = $(activeClass).data('industries');
		let skillSetClasses = skillSetToArray(skillSet) || []; 
		let industrySetClasses = skillSetToArray(industrySet)|| []; 
		
		console.log(skillSetClasses.concat(industrySetClasses));

		return skillSetClasses.concat(industrySetClasses);

	}


	function setEventStatusBar(currClass){
		let statusBarIndex = $('.status-bar .curr-index'); 
		let statusBarTotal = $('.status-bar .total');
		let currIndex = $(currClass).index() + 2; 
		console.log("The Current Index: " + currIndex + " " + currClass); 
		console.log("The Current Index: " + $(statusBarIndex).text()); 
		statusBarIndex.text(currIndex); 

	}
	

	function reverseCheck(selector, nextClass){
		console.log("Slices: Reverse Check");
		animateSlices(selector, "-100%");
		animateSlices(nextClass, "0%");
	}

	function skillSetToArray(skillSet){
		skillSet = skillSet.split(" ").filter(function(entry) { return /\S/.test(entry); });
		console.log("skillSet: " + skillSet);
		let classesToHighlight = $.map(skillSet, function(v){
			return "#" + v + " li"; 
		});
		return classesToHighlight
	}

	function loadPreloader(){
		console.log("Loading Preloader");
		$('#project-uncover.uncover').empty();
		slices('#project-uncover.uncover', {
			slicesTotal: 3,
			slicesColor: 'yellow',
			orientation: 'vertical'
		}); 
		TweenLite.set('#project-uncover.uncover .uncover_slice', {y: "-100%"}); 
		$('#project-uncover').show(); 
		animateSlices('#project-uncover', "0%", null, ()=>{animateSlices('#project-uncover', "100%", null, ()=>{$('#project-uncover').hide();})}); 
	}

	function getDocHeight() {
	    var D = document;
	    return Math.max(
	        D.body.scrollHeight, D.documentElement.scrollHeight,
	        D.body.offsetHeight, D.documentElement.offsetHeight,
	        D.body.clientHeight, D.documentElement.clientHeight
	    )
	}

	function range(start, end) {
	  return Array(end - start + 1).fill().map((_, idx) => start + idx)
	}

	function shuffle(o) {
		for(var j, x, i = o.length; i; j = parseInt(Math.random() * i), x = o[--i], o[i] = o[j], o[j] = x);
		return o;
	};

	//pageTransitions();
};

function slices(selector, options){
	this.options = options; 
	let uncoverItems = $(selector);
	console.log("slices: " + uncoverItems.length); 
	//console.log("slices: " + ); 
	$.each(uncoverItems, (i, el) => {
		console.log("slices: " + el); 
		let inner = '';
		inner += `<div class="uncover_slices uncover_slices-${this.options.orientation}">`
		for (let i = 0; i <= this.options.slicesTotal - 1; ++i) {
            inner += `<div class="uncover_slice" style="background-color:${this.options.slicesColor}"></div>`;
        }
        inner += `</div>`; 
        $(el).append(inner);
	});
}

function animateSlices(selector, yMove=null, xMove=null, cb=null){
	console.log("animateSlicesReveal: " + selector);
	let slices = $(selector + ' .uncover_slice'); 
	console.log("slices: " + slices.length);
	let sliceAnimation = new TimelineMax(); 
	//let randomSlices = shuffle(slices);
	slices.each((i, el) => {
		sliceAnimation.to(el, 
					.5, 
					{y: yMove, x: xMove}, 
					i * .07
					//Math.abs(i- Math.random(0, 2)) * .15
					//Math.random(.5, 2.5)
		);
	});
	if(cb){
		sliceAnimation.call(cb); 
	}
}

function preloaderSlices(){
	slices('#preloader', {
		slicesTotal: 6,
		slicesColor: 'yellow',
		orientation: 'horizontal'
	});
}

function onHomepageLoad(){
	scrollController.destroy(true); 
	console.log("home.js");
	particlesJS.load('particles-js', './js/particles2.json'
	 , function(){
	  	console.log("Particles Loaded");
	 });

	//preloaderSlices(); 
}

function filterWorkCasesByLink(url){
	return workCases.workCases.filter(function(val){
		//console.log(val);
		if(val['case_study_link'] &&  url.includes(val["case_study_link"])){
			return val;
		}
	}); 
}

function onAboutPageLoad(){
	scrollController.destroy(true);
	console.log("I got here");
	window.sr = ScrollReveal({ reset: true });
	sr.reveal('.about-me-pic');
	sr.reveal('.hello-container');
	sr.reveal('.about-group');
	sr.reveal('.about-group .learnt-item', {origin: "left", distance: "100px"}, 400);
	sr.reveal('.about-group.other-skills .col-6', {origin: "left", distance: "50px"}, 400);
}

function onWorkCaseLoad(){
	scrollController.destroy(true); 
	//check the URL - and then do a search in the workcases for that.. 
	let url = $(location).attr('pathname');
	console.log(url);

	let thisWorkCase = filterWorkCasesByLink(url);

	console.log(thisWorkCase);

	window.sr = ScrollReveal({ reset: true });
	console.log("onWorkCaseLoad loaded");
	$.get('../templates.html', function(template){
		//var projectList  =$('#project-list-template').html();
		var workCaseTemplate  = $(template).filter('#case-study-intro-template').html();
		Mustache.parse(workCaseTemplate);
		//console.log(workCaseTemplate);
		var rendered = Mustache.render(workCaseTemplate,  {"workCases": thisWorkCase});
		$('#work-case-intro-container').html(rendered);
	}).done(function(){
		
		sr.reveal('.title-container h1', {origin: "left", distance: "30px"});
		sr.reveal('.title-container p', {origin: "left", distance: "30px"});
		sr.reveal('.wc-details .image-container img', {delay: 500});
		sr.reveal('.work-case-details .section'); 
	}); 
}


 