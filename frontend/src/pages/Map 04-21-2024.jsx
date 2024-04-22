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
          newColorMap[barangay.name] = barangay.evaluation == 1 ? "red" : "green";
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
        <BarangayPolygon
          key={index}
          barangay={barangay}
          color={colorMap[barangay.properties.NAME_3]}
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

const BarangayPolygon = ({ barangay, color }) => {
  const coordinates = barangay.geometry.coordinates[0];
  const polygonCenter = calculatePolygonCenter(coordinates);

  return (
    <>
      <Polygon
        path={coordinates.map((coord) => ({ lat: coord[1], lng: coord[0] }))}
        options={{
          strokeColor: color,
          strokeOpacity: 0.8,
          strokeWeight: 1,
          fillColor: color,
          fillOpacity: 0.35,
        }}
      />
      <Marker
        position={{ lat: polygonCenter.lat, lng: polygonCenter.lng }}
        icon={{
          path: google.maps.SymbolPath.CIRCLE,
          fillColor: color,
          fillOpacity: 1,
          strokeWeight: 0,
          scale: 8,
        }}
        label={{
          text: barangay.properties.NAME_3,
          color: "#000000",
          fontWeight: "bold",
        }}
      />
    </>
  );
};

// Function to calculate polygon center
function calculatePolygonCenter(coords) {
  let x = 0,
    y = 0,
    z = 0;

  for (let coord of coords) {
    let latitude = coord[1] * Math.PI / 180;
    let longitude = coord[0] * Math.PI / 180;

    x += Math.cos(latitude) * Math.cos(longitude);
    y += Math.cos(latitude) * Math.sin(longitude);
    z += Math.sin(latitude);
  }

  let total = coords.length;

  x = x / total;
  y = y / total;
  z = z / total;

  let centralLongitude = Math.atan2(y, x);
  let centralSquareRoot = Math.sqrt(x * x + y * y);
  let centralLatitude = Math.atan2(z, centralSquareRoot);

  return {
    lat: centralLatitude * 180 / Math.PI,
    lng: centralLongitude * 180 / Math.PI,
  };
}

export default memo(Map);
