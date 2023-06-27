import { MapContainer, Marker, Popup, TileLayer, useMapEvents } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import MarkerMap from "../assets/waysfood/marker.png"
import L from "leaflet";

export default function Map({ handleMapClick, selectedLat, selectedLng }) {

  const icon = L.icon({
    iconUrl: MarkerMap,
    iconSize: [38, 36],
  });


  function MapEvents() {
    useMapEvents({
      click: handleMapClick,
    });

    return null;
  }
  const centerMap = [-6.17781214899621, 106.82685538905109];
  return (
    <>
      <div style={{ width: "50vw", height: "100%", border: "1px solid grey" }}>
        <MapContainer
          center={centerMap}
          zoom={14}
          scrollWheelZoom={true}
          style={{ height: "400px", width: "100%" }}
        >
          <TileLayer
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            url="https://api.maptiler.com/maps/streets-v2/256/{z}/{x}/{y}.png?key=vUvFcgFdVky4hX0f5zZA"
          />
          <MapEvents />
          {selectedLat && selectedLng && (
            <Marker
              position={[selectedLat, selectedLng]}
              draggable={true}
              animate={true}
              icon={icon}
            >
              <Popup>Hey ! you found me</Popup>
            </Marker>
          )}
        </MapContainer>
      </div>

    </>
  );
}