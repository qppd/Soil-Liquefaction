import { useState, useEffect } from "react";

export default function useGeolocation(options) {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState();
  const [data, setData] = useState({
    latitude: 0,
    longitude: 0,
    altitude: null,
    accuracy: 0,
    altitudeAccuracy: null,
    heading: null,
    speed: null,
  });

  useEffect(() => {
    const successHandler = (pos) => {
      setLoading(false);
      setError(null);
      setData(pos.coords);
    };

    const errorHandler = (err) => {
      setError(err);
      setLoading(false);
    };

    const successOptions = {
      enableHighAccuracy: true,
      timeout: 5000,
      maximumAge: 0,
    };

    const id = navigator.geolocation.watchPosition(
      successHandler,
      errorHandler,
      options || successOptions
    );

    return () => navigator.geolocation.clearWatch(id);
  }, [options]);

  return { loading, error, data };
}
