import WeatherInfoTile from "@/components/WeatherInfoTile";
import { WeatherData } from "@/data/WeatherData";
import React from "react";

const WeatherDisplay = ({ data }: { data: WeatherData | undefined }) => {
  if (!data) return;
  const {
    weather,
    main: { temp, feels_like, humidity },
    wind: { speed },
    visibility,
  } = data;

  return (
    <div className="text-center">
      <h2 className="mb-2 text-xl font-semibold">Current Weather</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <WeatherInfoTile
          title="Condition"
          value={weather[0].description}
          className="capitalize col-span-1 sm:col-span-2"
        />
        <WeatherInfoTile title="Temperature" value={`${temp.toString()}°C`} />
        <WeatherInfoTile
          title="Feels Like"
          value={`${feels_like.toString()}°C`}
        />
        <WeatherInfoTile title="Humidity" value={`${humidity.toString()}%`} />
        <WeatherInfoTile title="Wind Speed" value={`${speed.toString()} m/s`} />
        <WeatherInfoTile
          title="Visibility"
          value={`${visibility.toString()} meters`}
        />
      </div>
    </div>
  );
};

export default WeatherDisplay;
