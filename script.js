var url = 'https://query.yahooapis.com/v1/public/yql?q=select%20*%20from%20weather.forecast%20where%20woeid%20in%20(select%20woeid%20from%20geo.places(1)%20where%20text%3D%22Warsaw%22)%20and%20u%3D%22c%22&format=json&env=store%3A%2F%2Fdatatables.org%2Falltableswithkeys';
var citiesRandom = [];

var cities = ['Lodz', 'Warsaw', 'Berlin', 'New York', 'London'];

var $btn = $('#get-weather');
var $list = $('.list');

function randomCities (array) {
	citiesRandom = [];
	var randomIndex = 0;
	var city = '';
	while (citiesRandom.length < 3i) {
		randomIndex = Math.floor(Math.random() * 4);
		city = array[randomIndex];
		console.log(city);
		if (citiesRandom.indexOf(city) < 0) citiesRandom.push(array[randomIndex]);
	}
		
	console.log(citiesRandom);
	return citiesRandom;
}

fillData();
//var intervalCities = setInterval(fillData, 5000);


//randomCities(cities);

function getRequest(city) {
	$.ajax({
		url: 'https://query.yahooapis.com/v1/public/yql?q=select%20*%20from%20weather.forecast%20where%20woeid%20in%20(select%20woeid%20from%20geo.places(1)%20where%20text%3D%22' + city + '%22)%20and%20u%3D%22c%22&format=json&env=store%3A%2F%2Fdatatables.org%2Falltableswithkeys',
		method: 'get',
		success: showWeather
	});	
}

function showWeather (resp) {
	console.log(resp);
	$('<li>').text(resp.query.results.channel.location.city + ': ' + resp.query.results.channel.item.condition.temp).append($('<sup>').text('o')).append('C, ' + resp.query.results.channel.item.condition.text).appendTo($list);
}

function tripleRequest() {
	for (var i = 0; i < citiesRandom.length; i++) {
		getRequest(citiesRandom[i]);
	}
}

function fillData() {
	clearContainer();
	randomCities(cities);
	tripleRequest();
	//var intervalData = setInterval(tripleRequest, 3000);
}

$btn.click(function() {
	clearContainer();
	randomCities(cities);
	for (var i = 0; i < citiesRandom.length; i++) {
		getRequest(citiesRandom[i]);
	}
	console.log(cities);
});

function clearContainer() {
	$list.empty();
	console.log('Cleaning container');
}

