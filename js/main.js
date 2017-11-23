$(function()){
	var controller = new ScrollMagic.Controller();
 	var window_height = $(window).height();

 	var scrollAnimation = new TimelineMax(); 

 	var scrollMagicScene = new ScrollMagic.Scene({
            triggerElement: "#pinContainer",
            triggerHook: "onLeave",
            duration: "1200%"
          })
          .setPin("#pinContainer")
          .setTween(scrollAnimation)
          .addIndicators() // add indicators (requires plugin)
          .addTo(controller);
}); 

 