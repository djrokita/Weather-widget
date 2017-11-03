$(document).ready(function() {
 
  var url = 'https://query.yahooapis.com/v1/public/yql?q=select%20*%20from%20weather.forecast%20where%20woeid%20in%20(select%20woeid%20from%20geo.places(1)%20where%20text%3D%22Warsaw%22)%20and%20u%3D%22c%22&format=json&env=store%3A%2F%2Fdatatables.org%2Falltableswithkeys';
  var citiesRandom = [];

  var cities = ['Lodz', 'Warsaw', 'Berlin', 'New York', 'London'];

  var $btn = $('#get-weather');
  var $list = $('#city-list');
  var $listItem = $list.find('.list-group-item');
  var intervalData;
  var ifDataPresent = false;
  var timeGetCity = 5000;
  var timeGetData = 5000;
 	var counter = 0;

  function randomCities(array) {
    //clearContainer();
    citiesRandom = [];
    var randomIndex = 0;
    var city = '';
    while (citiesRandom.length < 3) {
      randomIndex = Math.floor(Math.random() * 5);
      city = array[randomIndex];
      if (citiesRandom.indexOf(city) < 0) citiesRandom.push(array[randomIndex]);
    }

    console.log(citiesRandom);

    return citiesRandom;
  }
	
	//getRequest(randomCities(cities));
  fillData();
  /*
  var intervalData = setInterval(function() {
	     getRequest(citiesRandom);
	      },
	      timeGetData);
	*/      
  var cityInterval = setInterval(function() {
  	randomCities(cities)
  }, 10000);

  var myInterval = setInterval(function() {    
    getRequest(citiesRandom);
}, 5000);


  /*
  if (counter == 2) {
  	counter = 0;
  	randomCities(city);
  }
*/
  function runInnerInterval() {
  	innerInterval = setInterval(function() {
  		getRequest(citiesRandom);
  	}, 5000);
  }

  function getRequest(city) {
    clearContainer();
    counter++;
    console.log('Request');
    console.log('Liczba pkt: ', $('li').length);
    //if (!ifDataPresent && $('li').length == 0) {
	    for (var i = 0; i < city.length; i++) {
	      $.ajax({
	        url: 'https://query.yahooapis.com/v1/public/yql?q=select%20*%20from%20weather.forecast%20where%20woeid%20in%20(select%20woeid%20from%20geo.places(1)%20where%20text%3D%22' + city[i] + '%22)%20and%20u%3D%22c%22&format=json&env=store%3A%2F%2Fdatatables.org%2Falltableswithkeys',
	        method: 'get',
	        success: showWeather
	      });
	  }
	  console.log('Licznik: ', counter);
    //}
  }

  function showWeather(resp) {
    //console.log(resp);
    //clearContainer();
    var $item = $('<li>').attr('class', 'list-group-item');
    var cityName = resp.query.results.channel.location.city;
    var temp = resp.query.results.channel.item.condition.temp;
    var text = resp.query.results.channel.item.condition.text;
    var $celcius = $('<sup>').text(' o');
    var $imgStr = resp.query.results.channel.item.description;
    var $img = $imgStr.substr(9, 50);
    var $linkStr = resp.query.results.channel.link;
    var $linkUrl = $linkStr.substr($linkStr.indexOf('*') + 1);
    var $link = $('<a>').attr('href', $linkUrl).attr('target', '_blank');    

    $item.text(cityName + ': ');
    $item.append(temp);
    $item.append($celcius);
    $item.append('C, ' + text);
    $item.append($img);
    $item.appendTo($link);
    $link.appendTo($list);
    $item.hide();
    $item.fadeIn('fast');
  	console.log('Liczba li: ', $('li').length);
  	checkList();
  }

  function fillData() {
    clearContainer();
 	getRequest(randomCities(cities));
	}

  function clearContainer() {
    $list.empty();
    ifDataPresent = false;
    console.log(ifDataPresent);
  }

  function checkList() {
  	if($('li').length > 3) alert('Błąd!');
  }

});