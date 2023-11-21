import { useEffect, useState } from 'react';
import { CiSearch } from 'react-icons/ci';
import { WiHumidity,WiCloudyWindy} from 'react-icons/wi'; 
import './WeatherApp.css'
const WeatherApp = () =>{
    const [temp,setTemp] = useState();
    const [city,setCity] = useState('');
    const [windSpeed,setWindSpeed] = useState();
    const [humidity,setHumidity] = useState();
    const [latitude,setLatitude] = useState();
    const [longitude,setLongitude] = useState();

    const searchWeather = async (latitude,longitude) =>{
        let api_key = 'e0b6f6c3d347639553f1b25aa87cf9dd'
        const inputData = document.getElementById('cityInput').value;
        if (!inputData){
            setCity('Add City')
        }
        else if (longitude && latitude){
            console.log('yes')
            let url = `https://api.openweathermap.org/data/3.0/onecall?lat=${latitude}&lon=${longitude}&exclude={part}&appid=${api_key}`
            let response = await fetch(url);
            let data = await response.json();
            console.log(data)
            try{
                setTemp(data.main.temp);
                setCity(data.name);
                setWindSpeed(data.wind.speed)
                setHumidity(data.main.humidity)
            }
            catch(e){
                console.log(e)
            }
        }
        else{
            let url = `https://api.openweathermap.org/data/2.5/weather?q=${inputData}&units=Metric&appid=${api_key}`
            let response = await fetch(url);
            let data = await response.json();
            console.log(data)
            try{
                setTemp(data.main.temp);
                setCity(data.name);
                setWindSpeed(data.wind.speed)
                setHumidity(data.main.humidity)
            }
            catch(e){
                console.log(e)
            }
        }
    }
        useEffect(()=>{
        document.getElementById('cityInput').addEventListener('keydown',function(e){
            if(e.key==="Enter"){
                searchWeather();
            }
        })
    },[]);
    const getWeatherFromLocation = () =>{
        navigator.geolocation.getCurrentPosition((position)=>{
            setLongitude(position.coords.longitude);
            setLatitude(position.coords.latitude);
            searchWeather(longitude,latitude);
        });
    }
    return(
        <div onLoad={getWeatherFromLocation()} className="container">
            <div className="top-bar">
                <input className="cityInput" type="text" name="" id="cityInput" />
                <div onClick={()=>searchWeather(null,null)} className="search-icon">
                    <CiSearch  size={30} color='white'/>
                </div>
            </div>
            <div className="weather-temp">
                {temp}&deg;C
            </div>
            <div className="weather-location">
                {city}
            </div>
            <div className="data-container">
                <div className="element">
                    <i className='icon'>
                        <WiHumidity size={45} color='white'/>
                    </i>
                    <div className="humidity-percent">
                        {humidity}%
                    </div>
                    <div className="humidity-text">
                        
                    </div>
                </div>
                <div className="element">
                    <i className="icon">
                        <WiCloudyWindy size={45} color='white' />
                    </i>
                    <div id='speed' className="humidity-percent">
                        {windSpeed}m/s
                    </div>
                    <div className="humidity-text">
                        
                    </div>
                </div>
            </div>
        </div>
    )
}
export default WeatherApp;