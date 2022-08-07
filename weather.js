//Default view when loading the page:
//No visible messages
//No Visible Weather info 
//Random photo of the clouds as the background image.

document.body.style.backgroundImage = "url('https://source.unsplash.com/1600x900/?clouds')";
let msg = document.getElementById("msg");
let res= document.getElementById("result");
res.classList.add("disappear");
msg.classList.add("disappear");

//Function for making the weather info disappear and printing a message for the user
function message(s)
{
    document.body.style.backgroundImage = "url('https://source.unsplash.com/1600x900/?clouds')";

    //remove any data and show the message
    let res= document.getElementById("result");
    res.classList.add("disappear");
    
    let msg = document.getElementById("msg");
    msg.classList.remove("disappear");
    msg.innerHTML = s;
}

//Weather class:
//has an API-key from openweathermap.org
//fetches data about the city from the site's server and handles all invalid inputs
let weather= {
    "apiKey" : "a6deab420e4f7392f253478a1ee1f189",
    
    fetchWeather: function(city){
        if(isNaN(city) || city=="")
        {
            fetch("https://api.openweathermap.org/data/2.5/weather?q="+
            city+
            "&appid=" + this.apiKey +
            "&units=metric")
            .then((response) => response.json())
            .then((data) => this.displayWeather(data));
        }
        else
        {
            message("Numbers are invalid!");
        }
    },
    //Function that displays the results in the HTML page
    displayWeather : function(data){
        const {cod} = data;
        if(cod == "404") //code for invalid city
        {
            message("There is no such city!");

        }
        else if(cod == "400") //code for empty input
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
            
            //get specific data from json file
            const {name} = data;
            const {icon, main ,description} = data.weather[0];
            const {feels_like, humidity, temp} = data.main;
            const {speed} = data.wind;
            console.log(name,icon, description, temp, feels_like, humidity);
            
            //Update:
            
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
    
    //takes teh value from the search bar and executes the fetchWeather function
    search: function (){
        let val = document.querySelector(".search .bar").value;
        
        this.fetchWeather(val);
    }
}

//Event listener for the search button
document
    .querySelector(".search button")
    .addEventListener("click", function(){
        //Remove any data
        let res= document.getElementById("result");
        res.classList.add("disappear");
        let msg = document.getElementById("msg");
        msg.classList.add("disappear");
    
        //Search
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
        
        //Search
        weather.search();
    }
});

    
