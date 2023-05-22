import React from "react";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import "leaflet/dist/leaflet.css";

const Maps = () => {
  const position = [26.217444, 50.482222];

  return (
    <div id="location">
      <h3 className="text-[40px] text-main text-center p-8"> موقعــنا</h3>

      <MapContainer center={position} zoom={13} style={{ height: "400px" }}>
        <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
        <Marker position={position}>
          <Popup>Budaiya Road - MB Plaza, Saar, Bahrain</Popup>
        </Marker>
      </MapContainer>
    </div>
  );
};
export default Maps;
// 88d6cd6f546a446c98a1d75234713db0
