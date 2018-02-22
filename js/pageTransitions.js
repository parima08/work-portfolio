function startBarba(){
	console.log("Barba is starting... ")
	Barba.Pjax.start();
	Barba.Prefetch.init();
}

function pageTransitions(){
	var lastElementClicked;
	Barba.Dispatcher.on('linkClicked', function(el) {
		lastElementClicked = el;
		console.log("Barba: Something was clicked");
	});


	var OpenCaseStudy = Barba.BaseTransition.extend({
		start: function() {
			this.originalThumb = lastElementClicked;

			Promise
			.all([this.newContainerLoading, this.scrollTop()])
			.then(this.movePages.bind(this));
		},

		scrollTop: function() {
			var deferred = Barba.Utils.deferred();
			var obj = { y: window.pageYOffset };

			TweenLite.to(obj, 0.4, {
				y: 0,
				onUpdate: function() {
					if (obj.y === 0) {
					    deferred.resolve();
					}

					window.scroll(0, obj.y);
				},
				onComplete: function() {
				  deferred.resolve();
				}
			});

			return deferred.promise;
		},

		movePages: function() {
			var _this = this;
			var goingForward = true;

			if (this.getNewPageFile() === this.oldContainer.dataset.backward) {
				goingForward = false;
			}

			TweenLite.set(this.newContainer, {
				visibility: 'visible',
				yPercent: goingForward ? 100 : -100,
				left: 0,
				top: 0,
				right: 0,
				opacity: 0
			});
			// TweenLite.set(this.newContainer, {
			// 	visibility: 'visible',
			// 	scale: 2,
			// 	left: 0,
			// 	top: 0,
			// 	right: 0,
			// 	opacity: 0
			// });

			TweenLite.set(this.oldContainer, {
				visibility: 'visible',
				overflow: 'hidden'
				
			});
			
			let transitionTimeline = new TimelineMax(); 
			
			transitionTimeline
						//.to(this.oldContainer, .4, {scale: .6})
						.to(this.oldContainer, .3, {opacity: 0, 
							onComplete: function(){
								console.log("this is done");
							 }}, 0)
						 .to(this.newContainer, .5, {yPercent: 0, 
														opacity: 1, 
							onStart: function(){ _this.done(); 	},
							onComplete: function(){
	                  						TweenLite.set('_this.newContainer', {yPercent: 0});
	                  						TweenLite.set('_this.newContainer', {clearProps: 'all'});
	                  					},
		                  	ease: Power4.easeOut}, "-=.1");	                  
		},

		getNewPageFile: function() {
			return Barba.HistoryManager.currentStatus().url.split('/').pop();
		}
	});


	var CloseCaseStudy = Barba.BaseTransition.extend({
		start: function() {
			this.originalThumb = lastElementClicked;

			Promise
			.all([this.newContainerLoading, this.scrollTop()])
			.then(this.movePages.bind(this));
		},

		scrollTop: function() {
			var deferred = Barba.Utils.deferred();
			var obj = { y: window.pageYOffset };

			TweenLite.to(obj, 0.4, {
				y: 0,
				onUpdate: function() {
					if (obj.y === 0) {
					    deferred.resolve();
					}

					window.scroll(0, obj.y);
				},
				onComplete: function() {
				  deferred.resolve();
				}
			});

			return deferred.promise;
		},

		movePages: function() {
			var _this = this;
			var goingForward = true;

			if (this.getNewPageFile() === this.oldContainer.dataset.backward) {
				goingForward = false;
			}

		
			let transitionTimeline = new TimelineMax(); 
			
			transitionTimeline
						//.to(this.oldContainer, .4, {scale: .6})
						.to(this.oldContainer, .6, {yPercent: 100, opacity: 0}, 0)
						.fromTo(this.newContainer, 1, {opacity: 0}, {opacity: 1, onStart: function(){
								console.log("This is starting");
								_this.done(); 
							},}, "+=.2")
						.set(this.oldContainer, {
							onComplete: function(){
	                  						TweenLite.set('_this.newContainer', {yPercent: 0, opacity: 1});
	                  						TweenLite.set('_this.oldContainer', {clearProps: 'all'});
	                  					}
		                  });	                  
		},

		getNewPageFile: function() {
			return Barba.HistoryManager.currentStatus().url.split('/').pop();
		}
	});


	var MovePage = Barba.BaseTransition.extend({
		start: function() {
			this.originalThumb = lastElementClicked;

			Promise
			.all([this.newContainerLoading, this.scrollTop()])
			.then(this.movePages.bind(this));
		},

		scrollTop: function() {
			var deferred = Barba.Utils.deferred();
			var obj = { y: window.pageYOffset };

			TweenLite.to(obj, 0.4, {
			y: 0,
			onUpdate: function() {
			  if (obj.y === 0) {
			    deferred.resolve();
			  }

			  window.scroll(0, obj.y);
			},
			onComplete: function() {
			  deferred.resolve();
			}
		});

		return deferred.promise;
	},

	movePages: function() {
		var _this = this;
		var goingForward = true;
		//this.updateLinks();

		console.log("old data container: " + this.oldContainer.id); 

		if (this.getNewPageFile() === this.oldContainer.dataset.backward) {
			goingForward = false;
		}


		// TweenLite.set(this.newContainer, {
		// 	visibility: 'visible',
		// 	xPercent: goingForward ? 100 : -100,
		// 	position: 'fixed',
		// 	left: 0,
		// 	top: 0,
		// 	right: 0,
		// 	opacity: 0,
		// 	scaleX: .8, 
		// 	scaleY: .8
		// });

		// let blah = new TimelineMax(); 
		// blah.to(this.oldContainer, .5, {scaleX: .8, scaleY: .8})
		// .to(this.oldContainer, .5, { xPercent: goingForward ? -100 : 100, opacity: 0 })
		// .to(this.newContainer, .6, { xPercent: 0, opacity: 1, onComplete: function() {
		// 	TweenLite.set(_this.newContainer, { clearProps: 'all' });
		// 	_this.done();
		// }}, "-=.5");
		// },

		TweenLite.set(this.newContainer, {
			visibility: 'visible',
			xPercent: goingForward ? 100 : -100,
			position: 'fixed',
			left: 0,
			top: 0,
			right: 0,
			opacity: 0
		});
		TweenLite.set('#preloader', {
			visibility: 'visible',
			xPercent: goingForward ? 100 : -100,
			position: 'fixed',
			left: 0,
			top: 0,
			right: 0,
		});
		let transitionTimeline = new TimelineMax(); 
		transitionTimeline.to(this.oldContainer, 0.6, { xPercent: goingForward ? -100 : 100, opacity: 0 })
		                  .to('#preloader', 0.6, {xPercent:0}, "-=0.6")
		                  .to(this.newContainer, 0.6, { xPercent: 0, opacity: 1, onComplete: function() {
								TweenLite.set(_this.newContainer, { clearProps: 'all' });
								_this.done();
						   }}, "-=0.6")
		                  .set({}, {}, "+=.1")
		                  .staggerTo("#preloader .uncover_slice",  1, {xPercent: goingForward ? -120 : 120, ease:Expo.easeOut,
		                   onComplete: function(){
		                  					TweenLite.set('#preloader .uncover_slice', {xPercent: 0});
		                  					TweenLite.set('#preloader', {clearProps: 'all'});
		                  					
		                  				}}, .1)
		                  //.to('#preloader', 0.6, { xPercent: goingForward ? -100 : 100})
		                  

		//TweenLite.to(this.oldContainer, 0.6, { xPercent: goingForward ? -100 : 100, opacity: 0 });
		//TweenLite.to(this.newContainer, 0.6, { xPercent: 0, opacity: 1, onComplete: function() {
		//TweenLite.set(_this.newContainer, { clearProps: 'all' });
		// 	_this.done();
		// }});
		},

		getNewPageFile: function() {
			return Barba.HistoryManager.currentStatus().url.split('/').pop();
		}
	});

	Barba.Pjax.getTransition = function() {
		let prevUrl = Barba.HistoryManager.prevStatus().url;
		console.log("prevUrl: " + prevUrl);
		let url = $(location).attr("pathname"); 
		// let prevUrl = Barba.HistorymManager.prevStatus().url;
		///onsole.log("Prev Url: " + prevUrl);
		if(url.includes('/work-cases/')){
			console.log("Using the Case study transition")
			return OpenCaseStudy;
		}
		if(prevUrl.includes('/work-cases/')){
			console.log("going back to work"); 
			return CloseCaseStudy; 
		}
		return MovePage;
	};
};

function loadPageJs(){
	let url = $(location).attr('pathname');
	console.log("URL: " + url); 

	console.log(url.includes('/work.html')); 
	switch(true){
		case (url.includes('/work.html')):
			console.log("loading work js"); 
			onWorkPageLoad(); 
			break;
		case (url.includes('/work-cases/')):
			console.log("loading work cases");
			onWorkCaseLoad(); 
			break; 
		case url.includes('/about'): 
			console.log("loading about");
			onAboutPageLoad();
			break; 
		case url.includes('/index.html'): 
		case '/':
		default:
			console.log('loading home');
			onHomepageLoad(); 
			break;
	}
}
