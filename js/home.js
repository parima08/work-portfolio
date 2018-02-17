console.log("home.js");
particlesJS.load('particles-js', './js/particles2.json'
 , function(){
  	console.log("Particles Loaded");
  }

);

$(function(){
	pageTransitions(); 
	// var lastElementClicked;

	// var Homepage = Barba.BaseView.extend({
	// 	namespace: 'homepage',
	// 	onEnter: function() {
	// 	  // The new Container is ready and attached to the DOM.
	// 	},
	// 	onEnterCompleted: function() {
	// 	  // The Transition has just finished.
	// 	},
	// 	onLeave: function() {
	// 	  // A new Transition toward a new page has just started.
	// 	},
	// 	onLeaveCompleted: function() {
	// 	 	console.log("URL: " + window.location.href)
	// 	 	onWorkPageLoad(); 
	// 	}
	// });
	// Homepage.init();


	// console.log("Barba is starting... ")
	// Barba.Pjax.start();
	// Barba.Prefetch.init();

	// Barba.Dispatcher.on('linkClicked', function(el) {
	// 	lastElementClicked = el;
	// 	console.log("Barba: Something was clicked");
	// });

	// var MovePage = Barba.BaseTransition.extend({
	// 	start: function() {
	// 		this.originalThumb = lastElementClicked;

	// 		Promise
	// 		.all([this.newContainerLoading, this.scrollTop()])
	// 		.then(this.movePages.bind(this));
	// 	},

	// 	scrollTop: function() {
	// 		var deferred = Barba.Utils.deferred();
	// 		var obj = { y: window.pageYOffset };

	// 		TweenLite.to(obj, 0.4, {
	// 		y: 0,
	// 		onUpdate: function() {
	// 		  if (obj.y === 0) {
	// 		    deferred.resolve();
	// 		  }

	// 		  window.scroll(0, obj.y);
	// 		},
	// 		onComplete: function() {
	// 		  deferred.resolve();
	// 		}
	// 	});

	// 	return deferred.promise;
	// },

	// movePages: function() {
	// 	var _this = this;
	// 	var goingForward = true;
	// 	//this.updateLinks();

	// 	console.log("old data container; " + this.oldContainer.dataset.prev); 

	// 	if (this.getNewPageFile() === this.oldContainer.dataset.prev) {
	// 		goingForward = false;
	// 	}

	// 	TweenLite.set(this.newContainer, {
	// 		visibility: 'visible',
	// 		xPercent: goingForward ? 100 : -100,
	// 		position: 'fixed',
	// 		left: 0,
	// 		top: 0,
	// 		right: 0
	// 	});

	// 	TweenLite.to(this.oldContainer, 0.6, { xPercent: goingForward ? -100 : 100 });
	// 	TweenLite.to(this.newContainer, 0.6, { xPercent: 0, onComplete: function() {
	// 	TweenLite.set(_this.newContainer, { clearProps: 'all' });
	// 		_this.done();
	// 	}});
	// 	},

	// 	getNewPageFile: function() {
	// 		return Barba.HistoryManager.currentStatus().url.split('/').pop();
	// 	}
	// });

	// Barba.Pjax.getTransition = function() {
	// 	return MovePage;
	// };
});
