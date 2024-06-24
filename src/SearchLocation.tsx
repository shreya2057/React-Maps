import { LatLng, LeafletEvent, LeafletEventHandlerFn } from "leaflet";
import { GeoSearchControl, OpenStreetMapProvider } from "leaflet-geosearch";
import React, { useEffect } from "react";
import { Marker, useMapEvents } from "react-leaflet";

interface GeoSearchShowLocationEvent extends LeafletEvent {
  location: {
    x: number; // longitude
    y: number; // latitude
  };
}

export const GetLocation = ({
  markers,
  setMarkers,
}: {
  markers: LatLng | undefined;
  setMarkers: React.Dispatch<React.SetStateAction<LatLng | undefined>>;
}) => {
  const map = useMapEvents({});

  useEffect(() => {
    const provider = new OpenStreetMapProvider();

    const searchControl = GeoSearchControl({
      provider,
      style: "bar",
      showMarker: false,
      showPopup: false,
      autoClose: true,
      retainZoomLevel: false,
    });

    map.addControl(searchControl);

    const handleLocationFound = (event: GeoSearchShowLocationEvent) => {
      const { x, y } = event.location;
      const newPosition = new LatLng(y, x);
      setMarkers(newPosition);
    };

    // Search location function
    map.on(
      "geosearch/showlocation",
      handleLocationFound as LeafletEventHandlerFn
    );

    // Pin location function
    map.on("click", (e) => setMarkers(e.latlng));

    return () => {
      map.removeControl(searchControl);
      map.off(
        "geosearch/showlocation",
        handleLocationFound as LeafletEventHandlerFn
      );
    };
  }, [markers, map]);

  return markers ? <Marker position={markers} /> : null;
};
