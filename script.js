$(document).ready(function() {

  var citiesRandom = [];
  var cities = ['Lodz', 'Warsaw', 'Berlin', 'New York', 'London'];

  var $list = $('#city-list');

  function randomCities(array) {
    citiesRandom = [];
    var randomIndex = 0;
    var city = '';
    while (citiesRandom.length < 3) {
      randomIndex = Math.floor(Math.random() * 5);
      city = array[randomIndex];
      if (citiesRandom.indexOf(city) < 0) citiesRandom.push(array[randomIndex]);
    }
    return citiesRandom;
  }

  function getRequest() {
    $list.empty();
    for (var i = 0; i < citiesRandom.length; i++) {
      $.ajax({
        url: 'https://query.yahooapis.com/v1/public/yql?q=select%20*%20from%20weather.forecast%20where%20woeid%20in%20(select%20woeid%20from%20geo.places(1)%20where%20text%3D%22' + citiesRandom[i] + '%22)%20and%20u%3D%22c%22&format=json&env=store%3A%2F%2Fdatatables.org%2Falltableswithkeys',
        method: 'get',
        success: showWeather
      });
    }
  }

  //Run widget
  $list.empty();
  randomCities(cities);
  getRequest();

  var cityInterval = setInterval(function() {
    randomCities(cities);
  }, 60000);

  var dataInterval = setInterval(function() {
    getRequest();
  }, 10000);

  function showWeather(resp) {
    var $item = $('<li>').attr('class', 'list-group-item');
    var cityName = resp.query.results.channel.location.city;
    //console.log(cityName);
    var temp = resp.query.results.channel.item.condition.temp;
    var text = resp.query.results.channel.item.condition.text;
    var $celcius = $('<sup>').text(' o');
    var $imgStr = resp.query.results.channel.item.description;
    var $img = $imgStr.substr(9, 50);
    var $linkStr = resp.query.results.channel.link;
    var $linkUrl = $linkStr.substr($linkStr.indexOf('*') + 1);
    var $link = $('<a>').attr('href', $linkUrl).attr('target', '_blank');

    $link.text(cityName + ': ');
    $link.append(temp);
    $link.append($celcius);
    $link.append('C, ' + text);
    $link.append($img);
    $link.appendTo($item);
    $item.appendTo($list);
    $item.hide();
    //Just for nice look
    $item.fadeIn('slow');

    checkList();
  }

  //Just for check 
  function checkList() {
    if ($('li').length > 3) alert('Error!');
  }
});