// app/components/KamloopsMap.jsx
'use client';

import nodes from './Nodes';
import React from 'react';
import { MapContainer, TileLayer, Marker, Popup, Circle } from 'react-leaflet';
import L from 'leaflet';
import { divIcon } from 'leaflet';
import 'leaflet/dist/leaflet.css';

// fix missing marker icons in most bundlers
import iconUrl from 'leaflet/dist/images/marker-icon.png';
import iconRetinaUrl from 'leaflet/dist/images/marker-icon-2x.png';
import shadowUrl from 'leaflet/dist/images/marker-shadow.png';

delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl,
  iconUrl,
  shadowUrl,
});

export default function KamloopsMap() {
  const kamloopsCoords = [50.6745, -120.3273];
  const pulseIcon = divIcon({
  className: 'pulse-marker', // our CSS class
  iconSize: [16, 16],
});
  //this will calculate de distance from all the nodes to the center
  const distances = nodes.map(n =>
    L.latLng(n.coords[0], n.coords[1]).distanceTo(kamloopsCoords)
  );
  // finds the furthers one
  const maxDistance = Math.max(...distances, 1000); // fallback to 1km


  return (
    
    <MapContainer
      center={kamloopsCoords}
      zoom={13}
      className="w-9/10 h-[600px] mx-auto border-4 border-gray-900"
    >
      <TileLayer
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        attribution="&copy; OpenStreetMap contributors"
      />
      <Marker position={kamloopsCoords}>
        <Popup>Kamloops, BC</Popup>
      </Marker>

      {nodes.map((node) => (
          <Marker key={node.id} position={node.coords} icon={pulseIcon}>
            <Popup>
              <strong>{node.name}</strong><br />
              {node.coords.join(', ')}
            </Popup>
          </Marker>
      ))}

      <Circle
        center={kamloopsCoords}
        //this ensures that all the nodes are inside the circle
        radius={maxDistance + 100}
        pathOptions={{ fillOpacity: 0.2 }}
      />
    </MapContainer>
    
  );
}
