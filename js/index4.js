$(function(){
	var controller = new ScrollMagic.Controller();
	
	var animateCases = function(){
		
	}
	var workScrollAnimation = new TimelineMax()
		.fromTo([".work-cases-scroll"], .4, {y: "100%"}, {y: "-100%"})
		.addCallback(animateCases, 0)

	 var workCase = $('.work-case-container')[0];
     var workCaseScene = new ScrollMagic.Scene({
    		duration: "100%",
    	})
    	.setPin("section.work")
    	.setTween(workScrollAnimation)
    	.addIndicators()
    	.addTo(controller);
}); 