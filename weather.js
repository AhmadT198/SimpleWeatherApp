document.body.style.backgroundImage = "url('https://source.unsplash.com/1600x900/?clouds')";
let msg = document.getElementById("msg");
let res= document.getElementById("result");
res.classList.add("disappear");
msg.classList.add("disappear");


function message(s)
{
    document.body.style.backgroundImage = "url('https://source.unsplash.com/1600x900/?clouds')";

    //remove any data and show the message
    let msg = document.getElementById("msg");
    let res= document.getElementById("result");
    res.classList.add("disappear");

    msg.classList.remove("disappear");
    msg.innerHTML = s;
}

let weather= {
    "apiKey" : "a6deab420e4f7392f253478a1ee1f189",
    fetchWeather: function(city){
        if(isNaN(city))
        {
            fetch("https://api.openweathermap.org/data/2.5/weather?q="+
            city+
            "&appid=" +this.apiKey + "&units=metric"
            ).then((response) => response.json())
            .then((data) => this.displayWeather(data));
        }
        else
        {
            message("Numbers are invalid!");
        }
    },
    displayWeather : function(data){
        const {cod} = data;
        if(cod == "404")
        {
            message("There is no such city!");

        }
        else if(cod == "400")
        {
            message("Please Enter a city!");

        }
        else
        {
            //show only the weather data
            let res= document.getElementById("result");
            res.classList.remove("disappear");
            let msg = document.getElementById("msg");
            msg.classList.add("disappear");

            const {name} = data;
            const {icon, main ,description} = data.weather[0];
            const {feels_like, humidity, temp} = data.main;
            const {speed} = data.wind;
            console.log(name,icon, description, temp, feels_like, humidity);
            
            let city = document.getElementById("cityName");
            city.textContent = "Weather in "+ name;

            let curr_t = document.getElementById("temp");
            curr_t.textContent = temp + '°C';

            let f = document.getElementById("feel");
            f.textContent = "but feels like " + feels_like + '°C';

            let sky = document.getElementById("sky");
            sky.textContent =  main;

            let hum = document.getElementById("hum");
            hum.textContent = "Humidity : " + humidity + " %";

            let ico = document.getElementById("icon");
            ico.src="http://openweathermap.org/img/wn/"+icon+ ".png";

            document.body.style.backgroundImage = "url('https://source.unsplash.com/1600x900/?" + name + "')";
        }
    },

    search: function (){
        let val = document.querySelector(".search .bar").value;
        
        this.fetchWeather(val);
    }
}

document
    .querySelector(".search button")
    .addEventListener("click", function(){
        weather.search();
});

document
.querySelector(".search .bar")
.addEventListener("keyup", function(event){
    if(event.key == "Enter") {
        //Remove any data
        let res= document.getElementById("result");
        res.classList.add("disappear");
        let msg = document.getElementById("msg");

        msg.classList.add("disappear");
        weather.search();
    }
});

    
