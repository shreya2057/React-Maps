import { LatLng } from "leaflet";
import "leaflet/dist/leaflet.css";
import { useState } from "react";
import { MapContainer, Marker, TileLayer } from "react-leaflet";
import "./index.css";

import "leaflet-geosearch/dist/geosearch.css";
import { GetLocation } from "./SearchLocation";

function App() {
  const [markers, setMarkers] = useState<LatLng>();
  console.log([markers?.lat, markers?.lng]);
  return (
    <div>
      <span>Maps</span>
      <div>
        <MapContainer
          center={[27.708317, 85.3205817]}
          zoom={13}
          zoomControl={true}
          scrollWheelZoom={true}
          className="markercluster-map"
        >
          <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
          <GetLocation setMarkers={setMarkers} markers={markers} />
          {markers && (
            <Marker
              key={`marker-${markers.lat}-${markers.lng}`}
              position={[markers?.lat, markers?.lng]}
            />
          )}
        </MapContainer>
      </div>
    </div>
  );
}

export default App;
