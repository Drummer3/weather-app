import useSWRImmutable from "swr/immutable";
import { WeatherData, useWeatherProps } from "./useWeather.types";

const apiKey = process.env.NEXT_PUBLIC_OPENWEATHERMAP_API_KEY || "";

async function fetcher(url: string) {
  const res = await fetch(url);

  if (!res.ok) {
    throw new Error("Bad input, try spelling it correctly");
  }

  return res.json();
}

export function useWeather(props: useWeatherProps) {
  let url;
  if ("city" in props) {
    url = `https://api.openweathermap.org/data/2.5/weather?q=${props.city}&appid=${apiKey}&units=metric`;
  } else {
    url = `https://api.openweathermap.org/data/2.5/weather?lat=${props.lat}&lon=${props.lon}&appid=${apiKey}&units=metric`;
  }

  const { data, error, isLoading } = useSWRImmutable(url, fetcher);

  return {
    data: data as WeatherData | undefined,
    error,
    isLoading,
  };
}
