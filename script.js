'use strict'
$(function(){
	$('#food').hide();
	$('#recipe').hide();
	var recipick = {
		cuisine: '',
		food: ''
	};
	//choose cuisine and hides others.
$('#cuisine div').on('click', function(){
	recipick.cuisine = this.id;
		$(this).siblings('div').fadeOut('slow');
		$(this).css({'display': 'block','margin':'0 auto'});
		$('#food').show();
});
//choose type of food and hides the rest.
$('#food div').on('click', function(){
	recipick.food = this.id;
		$(this).siblings('div').fadeOut('slow');
		$(this).css({'display': 'block','margin':'0 auto 10px'});
		getCuisineTwo(recipick.cuisine, recipick.food);
		$('#results').show();
});
//pick the results of cuisne and food and loads webpage with recipe.
$('#results').on('click', 'div', function(){
	console.log('yes');
	
});


/*---------------GET JSON----------------*/
//searches for food

function getCuisineTwo(cuisine, food) {
	var url = 'https://api.yummly.com/v1/api/recipes?';
	var param = {
		"Content-Type": "application/json",
		_app_id:'a4cc8d7f',
		_app_key:'0403a1c7e83a3a6035369a42c9ccbbf5',
		q: food,
		"allowedCuisine[]":'cuisine^cuisine-' + cuisine,
		requirePictures: 'true',
		maxResults: '10',
		hostedLargeUrl: 'large (360×240)'
	};
	//$.getJSON(url, param, showCuisine);
	$.ajax({url: url,
			data: param,
			success: function(data){
				//console.log(data);
				showCuisine(data);
				
			var param = {
					_app_id:'a4cc8d7f',
					_app_key:'0403a1c7e83a3a6035369a42c9ccbbf5'
					};
				data.matches.forEach(function(v){
					console.log(v.id);
					var url = 'http://api.yummly.com/v1/api/recipe/' + v.id + '?_app_id='
					+ param._app_id +'&_app_key=' + param._app_key;
				$.getJSON(url, showRecipe);
				console.log(v.source.sourceRecipeUrl);
				})
			}
			});
};

//gets recipe id 
function showRecipe(data){
	console.log(data);
};


//brings up recipes 
function showCuisine(results){
	//console.log(results);
	$('#food').remove();
	$('#cuisine').hide();
	for(var i = 0; i < results.matches.length; i++){
		var id = Object.keys(results.matches[i].imageUrlsBySize)[0];
		var imageUrl = results.matches[i].imageUrlsBySize[id];
		var recipeName = results.matches[i].recipeName;
		if(recipeName.length > 18){
			recipeName = recipeName.substr(0,17) + '...';
		}
		$('#results').append('<div><img src ="' + imageUrl  + '"><h3>' + recipeName + '</h3></div>');
		var recipeId = results.matches[i].id;
		//console.log(recipeId);
	}



 };







});//document.ready