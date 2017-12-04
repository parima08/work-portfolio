$(function(){
	var controller = new ScrollMagic.Controller();
 // 	var window_height = $(window).height();

 // 	var scrollAnimation = new TimelineMax().
 // 		.to('section.intro', 0.5, {z: -150}); 

 // 	var scrollMagicScene = new ScrollMagic.Scene({
 //            triggerElement: "#pinContainer",
 //            triggerHook: "onLeave",
 //            duration: "1000%"
 //          })
 //          .setPin("#pinContainer")
 //          .setTween(scrollAnimation)
 //          .addIndicators() // add indicators (requires plugin)
 //          .addTo(controller);

 var wipeAnimation = new TimelineMax()
			// animate to second panel
			.to("#slideContainer", 0.5, {z: -150})		// move back in 3D space
			.to("#slideContainer", 1,   {x: "-25%"})	// move in to first panel
			.to("#slideContainer", 0.5, {z: 0})				// move back to origin in 3D space
			// animate to third panel
			.to("#slideContainer", 0.5, {z: -150, delay: 1})
			.to("#slideContainer", 1,   {x: "-50%"})
			.to("#slideContainer", 0.5, {z: 0})
			// animate to forth panel
			.to("#slideContainer", 0.5, {z: -150, delay: 1})
			.to("#slideContainer", 1,   {x: "-75%"})
			.to("#slideContainer", 0.5, {z: 0});

		// create scene to pin and link animation
		new ScrollMagic.Scene({
				triggerElement: "#pinContainer",
				triggerHook: "onLeave",
				duration: "500%"
			})
			.setPin("#pinContainer")
			.setTween(wipeAnimation)
			.addIndicators() // add indicators (requires plugin)
			.addTo(controller);
});

 