$(function(){

     //Mustache: 
	console.log("About to start Mustache"); 
	
	//Project List: 
	var projectList  =$('#project-list-template').html();
	Mustache.parse(projectList);
	var rendered = Mustache.render(projectList, workCases);
	$('#project-list').html(rendered);

	//Project Content:
	console.log("About to start Mustache"); 
	var projectContent  =$('#project-content-template').html();
	Mustache.parse(projectContent);
	var rendered = Mustache.render(projectContent, workCases);
	$('.project-content-container').html(rendered);
});



 