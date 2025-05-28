'use client';

import React, { useState, useEffect } from 'react';
import {
  MapContainer,
  TileLayer,
  Circle,
  CircleMarker,
  Popup,
  Marker
} from 'react-leaflet';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';

import staticNodes from './Nodes';
import { db } from '../../lib/firebase';
import { ref, onValue } from 'firebase/database';

export default function KamloopsMap() {
  const [nodes, setNodes] = useState([]);
  const center = [50.6745, -120.3273];
  const dataCenter = [50.64905741054284, -120.34698321895848];
  const houseIcon = L.icon({
    iconUrl: '/dataCenter.png',
    iconSize: [40, 50],
    iconAnchor: [12, 41],
    popupAnchor: [10, -41],
  });
  const loraIcon = L.icon({
    iconUrl: '/Lora.png',
    iconSize: [50, 50],
    iconAnchor: [12, 41],
    popupAnchor: [5, -31],
  });

  useEffect(() => {
    const unsub = onValue(ref(db, 'nodes'), snap => {
      const raw = snap.val() || {};

      const merged = staticNodes.map(n => {
        const d = raw[n.id] || {};
        const stamped =
          d.last_updated != null
            ? d.last_updated
            : d.lastUpdated != null
            ? d.lastUpdated
            : null;
        const lastNum = stamped != null ? Number(stamped) : null;

        return {
          ...n,
          temperature:
            d.temperature != null ? Number(d.temperature) : null,
          lastUpdated: lastNum,
          previousUpdated: prevNum,
          delay: delayMs
        };
      });

      setNodes(merged);
    });
    return () => unsub();
  }, []);

  const distances = nodes.map(n =>
    L.latLng(n.coords).distanceTo(center)
  );
  const maxDistance = Math.max(...distances, 1000);

  return (
    <MapContainer
      center={center}
      zoom={13}
      className="w-full h-[600px] mx-auto"
    >
      <TileLayer
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        attribution="&copy; OpenStreetMap contributors"
      />

      <Marker position={dataCenter} icon={houseIcon}>
        <Popup>
          This is the Data Center of the Nodes.
        </Popup>
      </Marker>

      <Marker position={center} icon={loraIcon}>
        <Popup>
          This is the Lora-Zygbee Converter
        </Popup>
      </Marker>

      {nodes.map((node) => {
        const now = Date.now();
        const isOnline =
          node.lastUpdated != null &&
          now - node.lastUpdated < 5 * 60 * 1000; // 5 min

        return (
          <CircleMarker
            key={node.id}
            center={node.coords}
            radius={8}
            pathOptions={{
              color: isOnline ? 'crimson' : 'gray',
              fillColor: isOnline ? 'crimson' : 'gray',
              fillOpacity: 0.9,
              weight: 1
            }}
          >
            <Popup>
              <strong>{node.name}</strong><br/>
              {isOnline
                ? `Temp: ${node.temperature}°C`
                : <span style={{ color: '#888' }}>Offline</span>
              }
              {node.lastUpdated && (
                <div style={{ fontSize: '0.8em', marginTop: 4 }}>
                  Last update: {new Date(node.lastUpdated).toLocaleTimeString()}<br/>
                  {node.previousUpdated && `Prev update: ${new Date(node.previousUpdated).toLocaleTimeString()}`
                  }<br/>
                {node.delay != null &&
                  `Delay: ${(node.delay / 1000).toFixed(1)}s`
                }
                </div>
              )}
            </Popup>
          </CircleMarker>
        );
      })}

      <Circle
        center={center}
        radius={maxDistance + 100}
        pathOptions={{ fillOpacity: 0.2 }}
      />
    </MapContainer>
  );
}
