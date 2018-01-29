$(function(){

	var white  = "#FFF"
	  	lightGrey = "#4A4A4A",
	   	yellow = "#F8E71C",
	  	darkGrey = "#222121", 
	  	descriptionTextGrey = "rgba(158, 158, 158, 1)", 
	  	darkGreyText= "#3A3A3A"; 


	//SCROLL ANIMATION: 

	var controller = new ScrollMagic.Controller();

	var animateWorkCaseIn = function(numberScroller){
		console.log("Animating");
		var workCaseAnimation = new TimelineMax()
			.fromTo(".work-case-container.active .letter", .2, {rotationZ: -90}, {rotationZ: 0, fontSize: "5em", color: white}) 
			.to('.work-number-scroller', .2, {y: numberScroller}, 0)
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
			.to('.work-number-scroller', .2, {y: numberScroller}, 0)
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

	   //need an initalize function for on refreshes!!

	   scrollMagicScene.on("progress", function(e){
	   		var shouldBeActive = $('.work-case-container').filter(checkActiveCase); 
	   		if(shouldBeActive.length>1){
	   			shouldBeActive = shouldBeActive[-1]; 
	   		}
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
	   			findWorkDetails(); 
	   			previousActivatedEl = null;
	   			previousActivatedEl = shouldBeActive;  
	   		}
	   }); 
	};

	function findWorkDetails(){
		var index = $('.work-case-container.active').data('index');
		console.log("index: " + index ); 
		var currentWC = workCases["workCases"][index];
		var activeTech = currentWC["technology"][0];
		console.log("activeTech: " + activeTech.toString()); 
		//remove all active Classes
		$('.technologies  .work-list').children().removeClass("active")
		$('.technologies  .work-list').children().remove("ul")
		$.each(activeTech, function(key,value) {
		  $('#' + key).addClass("active"); 
		  var list = '<ul class="work-list-subcategory"><li>' + 
		  			value.join('</a></li><li>') + 
		  			'</li></ul>';
		  $("#" + key).after(list); 
		}); 
	}

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
 		.fromTo("section.work", .4, {y: "100%"}, {y: "0%"}, .25)
 		.from(".work-title", 0.2, {x: "100%"}, .37)
 		.fromTo(".work-details-column", 0.2, {transformStyle:"preserve-3d", rotationY: 90, transformOrigin:" center top", transformPerspective: 2300 }, {rotationY: 0}, .5)
 		.fromTo(".work-cases-scroll", 1.2, {y: "80%"} , {y: "-130%"}, .55) 
 		.addCallback(animateWorkCases, .6);


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


    //based on the active work-case, we'll get the data 

     //Mustache: 
	console.log(workCases);
	console.log("About to start Mustache"); 
	var template =$('#template').html();
	Mustache.parse(template);
	//TODO: add index and letter to workcases dynamically
	var rendered = Mustache.render(template, workCases);
	$('.work-cases-scroll').html(rendered);

    //MODAL: 

 	$('[data-type="modal-trigger"]').on('click', function(){
 		console.log("Clicked this!");
		var actionBtn = $(this),
			modalBg = actionBtn.siblings('.work-case-modal-bg'), 
			scaleValue = retrieveScale(modalBg);
		modalBg.addClass('is-visible'); 
		animateLayer(modalBg, scaleValue, true);

		//if browser doesn't support transitions...
		//if(actionBtn.parents('.no-csstransitions').length > 0 ) animateLayer(actionBtn.next('.cd-modal-bg'), scaleValue, true);
	});

 	function retrieveScale(btn) {
		console.log("Getting the scale");
		var btnRadius = btn.width()/2,
			left = btn.offset().left + btnRadius,
			top = btn.offset().top + btnRadius - $(window).scrollTop(),
			scale = scaleValue(top, left, btnRadius, $(window).height(), $(window).width());
		console.log(scale);
		return scale;
	}

	function scaleValue( topValue, leftValue, radiusValue, windowW, windowH) {
		var maxDistHor = ( leftValue > windowW/2) ? leftValue : (windowW - leftValue),
			maxDistVert = ( topValue > windowH/2) ? topValue : (windowH - topValue);
		return Math.ceil(Math.sqrt( Math.pow(maxDistHor, 2) + Math.pow(maxDistVert, 2) )/radiusValue);
	}

	$('.modal-close').on("click", function(){
		var parent = $('.modal-close').parent('.work-case-modal'); 
		var animateLayerAnimation = new TimelineMax()
			.set(".work-case-modal.is-visible", {className:"-=is-visible"})
			.to('.is-visible.work-case-modal-bg', .3, {scale: 1}, "0")
			.set('body', {className: "-=no-scroll"}, 0)
			.set('.is-visible.work-case-modal-bg', {className:"-=is-visible"}, 1.5)
			; 
	});

	function animateLayer(layer, scaleVal, bool) {
		console.log("In Animate Layer- animating");
		console.log(layer);
		var animateLayerAnimation = new TimelineMax()
			.to(layer, .3, {scale: scaleVal,})
			.set('body', {className: "+=no-scroll"}, 0)
			.set(".work-case-modal", {className:"+=is-visible"}, "+=.6")
			.to([".work-case-modal"], .4, { backgroundColor: white }, ".6"); 
	}

	 //    //Handlebars: 
 // 	console.log("About to start Handlebars"); 
 //    var template =$('#template').html();
	// var compiled_template = Handlebars.compile(template);
	// var rendered = compiled_template({title: "Parima"});
	// $('#work-cases-container').html(rendered);


 	
});



 