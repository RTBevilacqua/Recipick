'use strict'
$(function(){
	console.log('ready');
	$('#cuisine').hide();
	var result = [];

//click on food icon
$(document).on('click', 'div', function(e){
	e.preventDefault();
	var food = this.id;
	//push clicked item into result
	result.push(food);
	// fade other icons out
	$(this).siblings('div').fadeOut('slow');
	//center icon at top
	$(this).css({'display': 'block','margin':'0 auto'});
	//load cuisine bellow icon
	$('#cuisine').show();
	console.log(food);
	console.log(result);
	if(result.length === 2){
		getRequest(result.toString());
	}
	

});



//once results has two search items the next window should bring up recipes 



/*---------------GET JSON----------------*/

function getRequest(cuisine){
	var url = 'http://food2fork.com/api/search';
	var parm = {
		key: '7c1222ed0547d19bb6062e98a4cba425',
		q: cuisine
	}
	$.post()


	$.ajax({
	    url: url,
	    data: parm,

	    type: 'GET',
	    success: function (data) {
	        console.log(data);
	    }
	});
	
	// 	$.ajax({
	// 	url: url,
	// 	jsonpCallback: 'callback',
	// 	dataType: "jsonp",//use jsonp to avoid cross origin issues
	// 	type: "GET"
	// })
	// .done(function(result){ //this waits for the ajax to return with a succesful promise object
	// 	//showResults(result);
	// 	console.log(result.recipes);
	// })
};

function showResults(results){
	$('#food').hide();
	$('#cuisine').hide();
	$.each(results.recipes.title, function(i, value){
		//$('#results').append();
		console.log(results);

	});

}























});//document.ready