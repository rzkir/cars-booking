"use client";

import { useEffect, useRef } from "react";

import { MapContainer, TileLayer, useMap } from "react-leaflet";

import L from "leaflet";

import { GeoSearchControl, OpenStreetMapProvider } from "leaflet-geosearch";

import "leaflet/dist/leaflet.css";
import "leaflet-geosearch/dist/geosearch.css";

if (typeof window !== "undefined") {
  const DefaultIcon = L.icon({
    iconUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png",
    iconRetinaUrl:
      "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png",
    shadowUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png",
    iconSize: [25, 41],
    iconAnchor: [12, 41],
  });
  L.Marker.prototype.options.icon = DefaultIcon;
}

function GeoSearchHandler({ onSelect, searchLabel }: GeoSearchHandlerProps) {
  const map = useMap();
  const controlRef = useRef<L.Control | null>(null);

  useEffect(() => {
    const provider = new OpenStreetMapProvider();
    const searchControl = (
      GeoSearchControl as (opts: {
        provider: OpenStreetMapProvider;
        style: string;
        showMarker: boolean;
        showPopup: boolean;
        autoClose: boolean;
        retainZoomLevel: boolean;
        animate: boolean;
        keepResult: boolean;
        searchLabel: string;
      }) => L.Control
    )({
      provider,
      style: "bar",
      showMarker: true,
      showPopup: false,
      autoClose: true,
      retainZoomLevel: false,
      animate: true,
      keepResult: true,
      searchLabel: searchLabel ?? "Cari alamat...",
    });

    map.addControl(searchControl);
    controlRef.current = searchControl;

    const handler = (
      e: L.LeafletEvent & {
        location?: { x: number; y: number; label: string };
      },
    ) => {
      const loc = e?.location;
      if (loc) {
        onSelect({
          address: loc.label,
          latitude: loc.y,
          longitude: loc.x,
        });
      }
    };

    map.on("geosearch/showlocation", handler as L.LeafletEventHandlerFn);

    return () => {
      map.off("geosearch/showlocation", handler as L.LeafletEventHandlerFn);
      if (controlRef.current) {
        map.removeControl(controlRef.current);
      }
    };
  }, [map, onSelect, searchLabel]);

  return null;
}

export default function LocationPicker({
  center = [-6.2088, 106.8456],
  zoom = 12,
  onSelect,
  height = "320px",
  searchLabel,
}: LocationPickerProps) {
  return (
    <div
      className="rounded-2xl overflow-hidden border border-gray-200"
      style={{ height }}
    >
      <MapContainer
        center={center}
        zoom={zoom}
        className="h-full w-full z-1"
        scrollWheelZoom
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        <GeoSearchHandler onSelect={onSelect} searchLabel={searchLabel} />
      </MapContainer>
    </div>
  );
}
