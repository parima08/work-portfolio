    //scroll watcher: 
    //add classes to the correct elements: 
    var workCases = $($('.work-case-container')[0]).addClass("coming"); 
    var workCase = $('.work-case-container.coming'); 
	var viewPortMiddle = "2000";
	var workCaseWatcher = scrollMonitor.create(workCase); 

	workCaseWatcher.exitViewport(function() {
	   $(workCase).removeClass("active");
	   console.log("Exiting: " + workCaseWatcher.top); 
	});
	workCaseWatcher.enterViewport(function() {
	    $(workCase).addClass("active");
	    console.log("Entering: " + workCaseWatcher.top); 
	});



 //    var workScroll = $('.work-cases-scroll');
 //   	var workScrollWatcher = scrollMonitor.create(workScroll);

	// workScrollWatcher.exitViewport(function() {
	//    console.log("Scroll has left");
	//    // alert("exited viewport")
	// });
	// workScrollWatcher.enterViewport(function() {
	//     console.log("Scroll has entered");
	// });

	// var workCase = $('.work-case-container')[0]; 
	// var workCaseWatcher = scrollMonitor.create(workCase); 

	// workCaseWatcher.exitViewport(function() {
	//    $(workCase).removeClass("active");
	//    console.log("Exiting: " + workCaseWatcher.top); 
	// });
	// workCaseWatcher.enterViewport(function() {
	//     $(workCase).addClass("active");
	//     console.log("Entering: " + workCaseWatcher.top); 
	// });

	// console.log(workCaseWatcher.top); 

     // var workCaseScene = new ScrollMagic.Scene({
    	// 	triggerElement: ".work-case-scroll",
    	// 	duration: "270%"
    	// })
    	// .setPin(".work-contents")
    	// .setTween(workScrollAnimation)
    	// //.setTween("#one", 0.5, {backgroundColor: "green"})
    	// .addIndicators()
    	// .addTo(controller);



    	
	var workCase = $('.work-case-container')[0]; 
	var workCaseWatcherEnter = scrollMonitor.create(workCase, 1250); 
	var workCaseWatcherExit = scrollMonitor.create(workCase, 1350); 
	workCaseWatcherEnter.exitViewport(function() {
	 checkWorkCase(workCase);
	   
	   console.log("Viewport Exit, but really just enetered");
	   //console.log("Exiting: " + workCaseWatcher.top); 
	});
	workCaseWatcherEnter.enterViewport(function() {   
	   checkWorkCase(workCase);
	});
	workCaseWatcherExit.exitViewport(function(){
		checkWorkCase(workCase);
	});
	workCaseWatcherEnter.exitViewport(function(){
		checkWorkCase(workCase);
	});
	workCaseWatcherEnter.enterViewport(function(){
		checkWorkCase(workCase);
	});

	function checkWorkCase(workCase){
		if($(workCase).hasClass("active")){
	 		$(workCase).removeClass("active");
	 	}
	 	else{
	 		$(workCase).addClass("active");
	 	}
	}