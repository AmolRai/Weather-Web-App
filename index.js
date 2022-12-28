function getData(city) {
  var searchText = document.querySelector("input").value;

  if(searchText.length == 0) {
    searchText = city;
  }

  var url = "https://api.openweathermap.org/data/2.5/weather?q=" + searchText + "&units=metric&appid=7098acce63adc71f61a93091563819d1";
  fetch(url).then(function(respone) {
    return respone.json();
  }).then(function(data) {
    if(data.cod == "404") {
      alert("City doesn't exist!");
      return;
    }
    document.querySelector(".temperature").innerHTML = data.main.temp + "°C";
    document.querySelector(".wind-speed").innerHTML = data.wind.speed;
    let description = data.weather[0].description;
    document.querySelector(".description").innerHTML = description.toUpperCase();
    document.querySelector(".city").innerHTML = data.name + ", " + data.sys.country;
    document.querySelector(".humidity").innerHTML = data.main.humidity
    document.querySelector("img").src = "https://openweathermap.org/img/wn/" + data.weather[0].icon + "@2x.png";
  });
}

document.querySelector(".btn").addEventListener("click", function() {
  getData();
})

// different cities
document.querySelector(".birmingham").addEventListener("click", function() {
  document.querySelector("input").value = "birmingham";
  getData();
})

document.querySelector(".manchester").addEventListener("click", function() {
  document.querySelector("input").value = "manchester";
  getData();
})

document.querySelector(".york").addEventListener("click", function() {
  document.querySelector("input").value = "york";
  getData();
})

document.querySelector(".california").addEventListener("click", function() {
  document.querySelector("input").value = "california";
  getData();
})

// Here is the getData() function is called when enter button is pressed
var input = document.querySelector("input");
input.addEventListener("keypress", function(event) {
  if(event.key == "Enter") {
    getData()
  }
})


// Location
function findMyLocation() {

  function success(position) {
    console.log(position)
    const latitude = position.coords.latitude;
    const longitude = position.coords.longitude

    const geoApiUrl = "https://api.bigdatacloud.net/data/reverse-geocode-client?latitude=" + latitude + "&longitude=" + longitude + "&localityLanguage=en"
    fetch(geoApiUrl).then(function(response) {
      return response.json();
    }).then(function(data) {
      getData(data.city);
    })
  }

  function error() {
    console.log("Unable to access the location!")
  }

  navigator.geolocation.getCurrentPosition(success, error);
}

function load() {
  window.onbeforeunload = function () {
    return "Are you sure want to leave?";
  }
}

findMyLocation();
load();
