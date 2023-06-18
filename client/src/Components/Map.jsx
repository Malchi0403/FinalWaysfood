import React from "react";

import GoogleMapReact from "google-map-react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMapLocation, faMapMarkerAlt } from "@fortawesome/free-solid-svg-icons";

const Map = ({ defaultCenter, defaultZoom, selectedLocation, handleMapClick }) => {
  const mark = <FontAwesomeIcon icon={faMapMarkerAlt} size="2x" style={{ color: "red", cursor: "pointer" }} />
  const Marker = ({ text }) => (
    <div style={{ position: "relative", transform: "translate(-50%, -100%)" }}>
      {text}
    </div>
  );
  return (
    <div style={{ height: "450px", width: "100%" }}>
      <GoogleMapReact
        defaultCenter={defaultCenter}
        defaultZoom={defaultZoom}
        onClick={handleMapClick}
        bootstrapURLKeys={{ key: "AIzaSyCyOco1HeYAgOl3srERtNWggMIR5vF8py0" }}
      >
        {selectedLocation && (
          <Marker
            lat={selectedLocation.lat}
            lng={selectedLocation.lng}
            text={mark}
          />
        )}
      </GoogleMapReact>
    </div>
  );
};



export default Map;
