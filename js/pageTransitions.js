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
		return MovePage;
	};
};

function loadPageJs(){
	let url = $(location).attr('pathname');
	console.log("URL: " + url); 
	switch(url){
		case '/work.html':
			onWorkPageLoad(); 
			break;
		case '/work-cases/*':
			break; 
		case '/about': 
			break; 
		case '/home.html': 
		case '/':
		default: 
			onHomepageLoad(); 
			break;
	}
}
