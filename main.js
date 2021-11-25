let weather = {
    "apiKey": "104429181e94f87ee9201409bf5124ad",
    fetchWeather: function (city) 
    {
        const url = "https://api.openweathermap.org/data/2.5/weather?q=" +
                     city +
                     "&units=metric&appid=" +
                     this.apiKey;

        fetch(url)
        .then((response) => {
          if (!response.ok) {
            alert("Clima não encontrado.");
            throw new Error("Clima não encontrado.");
          }
          return response.json();
        })
        .then((data) => {
            this.displayWeather(data);
        })
    },

    displayWeather: function(data)
    {
        const { name } = data;
        const { icon, description } = data.weather[0];
        const { temp, humidity } = data.main;
        const { speed } = data.wind;
        const { country } = data.sys;
        /*console.log(country);
        console.log(name, icon, description, temp, humidity, speed); */

        document.querySelector(".city").innerHTML = name + " - " + country;
        //document.querySelector(".icon").src = "https://openweathermap.org/img/wn/"+ icon + ".png"
        document.querySelector(".icon").src = "./img/"+ icon + ".png"
        document.querySelector(".description").innerHTML = description;
        var temperatura = parseFloat(temp).toFixed();
        document.querySelector(".temp").innerHTML = temperatura.toString() + "° C";
        document.querySelector(".humidity").innerHTML = "Humidade: " + humidity + "%";
        document.querySelector(".wind").innerHTML = "Velocidade dos Ventos: " + speed + "Km/h";
    
        document.querySelector(".weather").classList.remove("loading");
    
        document.body.style.backgroundImage = "url('https://source.unsplash.com/1600x900/?" + name + "')"
    },

    search: function () {
      this.fetchWeather(document.querySelector(".search-bar").value);
    },
};

document.querySelector(".search button").addEventListener("click", function () {
    weather.search();
});

document
  .querySelector(".search-bar")
  .addEventListener("keyup", function (event) {
    if (event.key == "Enter") {
      weather.search();
    }
  });

weather.fetchWeather("Uberaba");