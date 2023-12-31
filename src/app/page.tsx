"use client";

import WeatherDisplay from "@/components/WeatherDisplay";
import Button from "@/components/common/Button";
import { useWeather } from "@/data/useWeather";
import { FormEvent, useEffect, useRef, useState } from "react";

export default function Home() {
  const searchRef = useRef<HTMLInputElement | null>(null);
  const [gpsLocation, setGpsLocation] = useState<null | GeolocationPosition>(
    null,
  );
  const [location, setLocation] = useState<
    { city: string } | { lat: string; lon: string }
  >({ city: "Tbilisi" });

  const { data, isLoading, error } = useWeather(location);

  function updateCity(e: FormEvent) {
    e.preventDefault();
    setLocation({ city: searchRef.current?.value || "" });
  }

  function useGpsData() {
    setLocation({
      lat: gpsLocation!.coords.latitude.toString(),
      lon: gpsLocation!.coords.latitude.toString(),
    });
  }

  function getInputLabel() {
    return "city" in location ? location.city : "Auto";
  }

  useEffect(() => {
    window.navigator.geolocation.getCurrentPosition((pos) => {
      setGpsLocation(pos);
      setLocation({
        lat: pos.coords.latitude.toString(),
        lon: pos.coords.longitude.toString(),
      });
    }, console.error);
  }, []);

  return (
    <div className="px-6 my-8">
      <div className="max-w-md mx-auto w-full rounded-lg bg-white p-8 shadow-md dark:bg-gray-700">
        <h1 className="mb-4 text-center text-3xl font-semibold">Weather App</h1>
        <form className="mb-6" onSubmit={updateCity}>
          <div className="flex items-center gap-2">
            <input
              ref={searchRef}
              defaultValue={getInputLabel()}
              type="text"
              className="text-gray-600 w-full rounded-md border border-gray-300 p-2 focus:border-blue-300 focus:outline-none focus:ring dark:border-gray-600"
              placeholder="e.g., Georgia, Tbilisi"
            />
            {gpsLocation && (
              <Button
                type="button"
                color="purple"
                className=""
                onClick={useGpsData}
                label="GPS"
              />
            )}
          </div>
          <Button
            type="submit"
            color="blue"
            className="mt-2 w-full"
            label="Search"
          />
        </form>

        {isLoading && <p className="text-blue-500 text-center">Loading...</p>}
        {error && (
          <>
            <p className="text-red-500 text-center">
              We couldn`t look at the sky ☹️
            </p>
            <p className="text-red-500 text-center text-xl">{error.message}</p>
          </>
        )}
        {data ? <WeatherDisplay data={data} /> : null}
      </div>
    </div>
  );
}
