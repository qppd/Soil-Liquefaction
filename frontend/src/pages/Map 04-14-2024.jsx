import React, { useEffect, useState, memo } from "react";
import {
  GoogleMap,
  useJsApiLoader,
  DrawingManager,
  Polygon,
  Marker,
} from "@react-google-maps/api";
import useGeolocation from "../hooks/useGeolocation";
import BarangaysData from "../assets/Barangays.json"; // Import Barangays data
import clusterAreaBounds from "../assets/clusterBound"; // Import clusterAreaBounds data

const mapOptions = {
  googleMapApiKey: "AIzaSyAar1bBBZHXUmCVpb0YOwVjTysf4eY_bWs",
  libraries: ["drawing", "marker", "core", "routes", "geocoding"],
};

const Map = () => {
  const { isLoaded } = useJsApiLoader({
    id: mapOptions.googleMapApiKey,
    googleMapsApiKey: mapOptions.googleMapApiKey,
    libraries: mapOptions.libraries,
  });

  const guaguaBounds = {
    north: 15.0353,
    south: 14.9086,
    east: 120.783,
    west: 120.4754,
  };

  const guaguaCenter = {
    lat: 14.9662,
    lng: 120.6332,
  };

  const [center, setCenter] = useState(guaguaCenter);
  const { data: userLocation, loading: locationLoading } = useGeolocation();
  const [colorMap, setColorMap] = useState({});

  const containerStyle = {
    width: "99.9vw",
    height: "99.9vh",
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch("http://127.0.0.1:5000/barangay/fetch");
        if (!response.ok) {
          throw new Error("Failed to fetch barangay data");
        }
        const barangays = await response.json();
        const newColorMap = {};
        barangays.forEach((barangay) => {
          console.log("liquefaction value:", barangay.liquefaction);
          newColorMap[barangay.name] =
            barangay.evaluation == 1 ? "red" : "green";
        });
        setColorMap(newColorMap);
      } catch (error) {
        console.error("Error fetching barangay data:", error);
      }
    };
    fetchData();
  }, []);

  const selectedBarangays = Object.keys(colorMap);

  const filteredBarangaysData = BarangaysData.features.filter((barangay) =>
    selectedBarangays.includes(barangay.properties.NAME_3)
  );

  return isLoaded ? (
    <GoogleMap
      mapContainerStyle={containerStyle}
      center={center}
      zoom={10}
      options={{
        mapTypeControl: true,
        mapTypeId: "terrain",
        fullscreenControl: true,
        streetViewControl: true,
        zoomControl: true,
        disableDefaultUI: false,
        draggable: true,
        rotateControl: true,
        restriction: {
          latLngBounds: guaguaBounds,
          strictBounds: false,
        },
      }}
    >
      <DrawingManager
        options={{
          polylineOptions: {
            strokeColor: "red",
          },
        }}
      />

      <Polygon
        path={clusterAreaBounds}
        options={{
          strokeColor: "gray",
          strokeOpacity: 0.8,
          strokeWeight: 1,
          fillColor: "gray",
          fillOpacity: 0.35,
        }}
      />

      {filteredBarangaysData.map((barangay, index) => (
        <Polygon
          key={index}
          path={barangay.geometry.coordinates[0].map((coord) => ({
            lat: coord[1],
            lng: coord[0],
          }))}
          options={{
            strokeColor: colorMap[barangay.properties.NAME_3],
            strokeOpacity: 0.8,
            strokeWeight: 1,
            fillColor: colorMap[barangay.properties.NAME_3],
            fillOpacity: 0.35,
          }}
        />
      ))}

      {!locationLoading && userLocation && (
        <Marker
          position={{
            lat: userLocation.latitude,
            lng: userLocation.longitude,
          }}
        />
      )}
    </GoogleMap>
  ) : (
    "Loading map..."
  );
};

export default memo(Map);
