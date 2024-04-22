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

export const mapOptions = {
  googleMapApiKey: "AIzaSyAar1bBBZHXUmCVpb0YOwVjTysf4eY_bWs", // Replace with your Google Maps API key
  libraries: ["drawing", "marker", "core", "routes", "geocoding"],
};

function Map() {
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

  const containerStyle = {
    width: "99.9vw",
    height: "99.9vh",
  };

  useEffect(() => {
    console.log({ userLocation });
  }, [userLocation]);

  const clusterAreaBounds = [
    { lat: 14.981535168518548, lng: 120.55817792920647 },
    { lat: 14.979712760487459, lng: 120.56620786904477 },
    { lat: 14.969900400955822, lng: 120.57429939934508 },
    { lat: 14.967201695798025, lng: 120.58917116643221 },
    { lat: 14.964073108132993, lng: 120.59771364222786 },
    { lat: 14.960658455561443, lng: 120.61097487369716 },
    { lat: 14.95724024234147, lng: 120.61200729087557 },
    { lat: 14.954106472287705, lng: 120.61834497068196 },
    { lat: 14.949693978396397, lng: 120.62851283812938 },
    { lat: 14.944853175014103, lng: 120.63661875101332 },
    { lat: 14.93787582732432, lng: 120.64693533106123 },
    { lat: 14.935455045851626, lng: 120.65342000200343 },
    { lat: 14.93346262311502, lng: 120.66269838127926 },
    { lat: 14.929046720929122, lng: 120.66742188753398 },
    { lat: 14.918367935243722, lng: 120.67124961303784 },
    { lat: 14.916232059052035, lng: 120.67463877602609 },
    { lat: 14.909963605430761, lng: 120.67420101785638 },
    { lat: 14.908540346359601, lng: 120.67729448538535 },
    { lat: 14.912670930873617, lng: 120.68554627370668 },
    { lat: 14.916943764499294, lng: 120.68569210920566 },
    { lat: 14.923352414353118, lng: 120.67920590933483 },
    { lat: 14.928259350229936, lng: 120.67717186627891 },
    { lat: 14.93151220478012, lng: 120.67807738005575 },
    { lat: 14.93325840299849, lng: 120.68505991460825 },
    { lat: 14.936751102155668, lng: 120.68850922725926 },
    { lat: 14.940243493342734, lng: 120.68612653448253 },
    { lat: 14.945957998637923, lng: 120.688754435031 },
    { lat: 14.9529729365576, lng: 120.68816724085895 },
    { lat: 14.957560510498993, lng: 120.69259545311434 },
    { lat: 14.962663386219845, lng: 120.69147510387825 },
    { lat: 14.971550368498, lng: 120.6853109810931 },
    { lat: 14.979048488440213, lng: 120.676083448633 },
    { lat: 14.982330740602563, lng: 120.66528541005243 },
    { lat: 14.988156340831637, lng: 120.6588876354457 },
    { lat: 14.988460280847534, lng: 120.65529201066374 },
    { lat: 14.988992174821988, lng: 120.64915643993413 },
    { lat: 14.991550313086847, lng: 120.64414834587683 },
    { lat: 14.992107527266157, lng: 120.63788167320962 },
    { lat: 14.983409080620888, lng: 120.63278126993629 },
    { lat: 14.97932790928516, lng: 120.62624413672523 },
    { lat: 14.98449327527068, lng: 120.6169267360732 },
    { lat: 14.991651233669899, lng: 120.6068164727264 },
    { lat: 14.994813331670471, lng: 120.59931140835295 },
    { lat: 15.000423802986532, lng: 120.59549540776953 },
    { lat: 15.008482818215796, lng: 120.58647351988606 },
    { lat: 15.012579368775008, lng: 120.5737264690735 },
    { lat: 15.011187274765135, lng: 120.5686320033181 },
    { lat: 15.001828756603828, lng: 120.56569429830307 },
    { lat: 14.9956134310832, lng: 120.559733930719 },
    { lat: 14.991308307952536, lng: 120.55491018989068 },
    { lat: 14.981535168518548, lng: 120.55817792920647 },
  ];

  const colorMap = {
    "San Juan": "red",
    Bancal: "green",
    "Jose Abad Santos": "red",
    Lambac: "green",
    Magsaysay: "red",
    // Add more barangays and their corresponding colors here
  };

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
}

export default memo(Map);
