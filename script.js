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
		//hides unselected divs.
		$(this).siblings('div').fadeOut('slow');
		//displays the selected one.
		$(this).css({'display': 'block','margin':'0 auto'});
		$('#food').show();
	});
//choose type of food and hides the rest.
$('#food div').on('click', function(){
	recipick.food = this.id;
		//hides unselected divs.
		$(this).siblings('div').fadeOut('slow');
		//displays the selected one.
		$(this).css({'display': 'block','margin':'0 auto 10px'});
		//takes selected items and and ads to the search..
		getCuisineTwo(recipick.cuisine, recipick.food);
		$('#results').show();
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
	$.ajax({
		url: url,
		data: param,
		success: function(data){
			showCuisine(data);

			var param = {
				_app_id:'a4cc8d7f',
				_app_key:'0403a1c7e83a3a6035369a42c9ccbbf5',

			};
				//gets recipe url and stores it in recipeUrl
				data.matches.forEach(function(x){
					
					var url = 'https://api.yummly.com/v1/api/recipe/' + x.id + '?_app_id='
					+ param._app_id +'&_app_key=' + param._app_key;
					$.getJSON(url, showRecipe);
				});
			}
		});
};

//uses recipe id to append link to result image.
function showRecipe(data){
	$('#' + data.id).attr('href', data.source.sourceRecipeUrl);
};

//brings up recipes 
function showCuisine(results){
	//hides previous divs
	$('#food').remove();
	$('#cuisine').hide();
	//loops through object to find recipe name and image
	for(var i = 0; i < results.matches.length; i++){
		var id = Object.keys(results.matches[i].imageUrlsBySize)[0];
		var imageUrl = results.matches[i].imageUrlsBySize[id];
		var recipeName = results.matches[i].recipeName;
		//shortens recipe name to fit in div
		if(recipeName.length > 18){
			recipeName = recipeName.substr(0,17) + '...';
		}
		
		$('#results').append('<div><a id="' + results.matches[i].id + '"target="_blank" href="' + 'www.google.com' + '"><img src ="' + imageUrl  + '"><h3>' + recipeName + '</h3></a></div>');
	};


};

});//document.ready