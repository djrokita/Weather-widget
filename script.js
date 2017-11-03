$(document).ready(function() {
 
  var url = 'https://query.yahooapis.com/v1/public/yql?q=select%20*%20from%20weather.forecast%20where%20woeid%20in%20(select%20woeid%20from%20geo.places(1)%20where%20text%3D%22Warsaw%22)%20and%20u%3D%22c%22&format=json&env=store%3A%2F%2Fdatatables.org%2Falltableswithkeys';
  var citiesRandom = [];

  var cities = ['Lodz', 'Warsaw', 'Berlin', 'New York', 'London'];

  var $btn = $('#get-weather');
  var $list = $('#city-list');
  //var $item = $('<li>').attr('class', 'list-group-item');

  function randomCities(array) {
    citiesRandom = [];
    var randomIndex = 0;
    var city = '';
    while (citiesRandom.length < 3) {
      randomIndex = Math.floor(Math.random() * 4);
      city = array[randomIndex];
      console.log(city);
      if (citiesRandom.indexOf(city) < 0) citiesRandom.push(array[randomIndex]);
    }

    console.log(citiesRandom);
    return citiesRandom;
  }

  fillData();
  var intervalCities = setInterval(function() {
    clearInterval();
    fillData(); 
    //var intervalData = setInterval(intervalRequest, 5000);
  }, 10000);

  //randomCities(cities);

  function getRequest(city) {
    $.ajax({
      url: 'https://query.yahooapis.com/v1/public/yql?q=select%20*%20from%20weather.forecast%20where%20woeid%20in%20(select%20woeid%20from%20geo.places(1)%20where%20text%3D%22' + city + '%22)%20and%20u%3D%22c%22&format=json&env=store%3A%2F%2Fdatatables.org%2Falltableswithkeys',
      method: 'get',
      success: showWeather
    });
  }

  function showWeather(resp) {
    //console.log(resp);
    //clearContainer();
    var $item = $('<li>').attr('class', 'list-group-item');
    var cityName = resp.query.results.channel.location.city;
    var temp = resp.query.results.channel.item.condition.temp;
    var text = resp.query.results.channel.item.condition.text;
    var $celcius = $('<sup>').text(' o');
    var $imgUrl = resp.query.results.channel.item.description;
    var $imgString = $imgUrl.substr(9, 50);
    var x = '<img src="http://l.yimg.com/a/i/us/we/52/27.gif"/>'
    $img = $($imgString);
    //$img.appendTo('main');

    $item.text(cityName + ': ');
    $item.append(temp);
    $item.append($celcius);
    $item.append('C, ' + text);
    $item.append($img);
    $item.appendTo($list);
  }

  function tripleRequest(cities) {
    console.log('Get');
    clearContainer();
    for (var i = 0; i < cities.length; i++) {
      getRequest(cities[i]);
    }
  }

  function intervalRequest() {
    console.log('Interval Get');
    clearContainer();
    for (var i = 0; i < citiesRandom.length; i++) {
      getRequest(citiesRandom[i]);
    }
  }

  //tripleRequest();

  function fillData() {
    clearContainer();
    tripleRequest(randomCities(cities));
    //var intervalData = setInterval(intervalRequest, 5000);
  }

  function clearContainer() {
    $list.empty();
    console.log('cleaner');
  }

});