// src/components/MapView.tsx
import { useEffect, useRef } from "react";
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import "leaflet-routing-machine/dist/leaflet-routing-machine.css";
import "leaflet-routing-machine";
import { Coordinate, Path } from "../types";
import { useMapType } from "./MapTypeContext";
import { createCustomIcon } from "./PinIcon";
import pin from "../assets/bus-pin.png";
import bus from "../assets/bus.jpg";

interface MapViewProps {
	coordinates: Coordinate[];
	paths: Path[];
}

// src/components/MapView.tsx
const mapTiles = {
	osm: {
		url: "https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png",
		attribution:
			'&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
	},
	transport: {
		url: "https://tile.thunderforest.com/transport/{z}/{x}/{y}.png?apikey=6170aad10dfd42a38d4d8c709a536f38", // Example API key
		attribution:
			'Maps © <a href="https://www.thunderforest.com">Thunderforest</a>, Data © <a href="https://www.openstreetmap.org/copyright">OpenStreetMap contributors</a>',
	},
	satellite: {
		url: "https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}",
		attribution:
			'Tiles © <a href="https://services.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer">ArcGIS</a>',
	},
	cycle: {
		url: "https://tile.thunderforest.com/cycle/{z}/{x}/{y}.png?apikey=6170aad10dfd42a38d4d8c709a536f38", // Example API key
		attribution:
			'Maps © <a href="https://www.thunderforest.com">Thunderforest</a>, Data © <a href="https://www.openstreetmap.org/copyright">OpenStreetMap contributors</a>',
	},
	dark: {
		url: "https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png",
		attribution:
			'&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors &copy; <a href="https://carto.com/attributions">CARTO</a>',
	},
};

export default function MapView({ coordinates, paths }: MapViewProps) {
	const { mapType } = useMapType();
	const mapRef = useRef<L.Map | null>(null);
	const tileLayerRef = useRef<L.TileLayer | null>(null);
	const routeRefs = useRef<L.Routing.Control[]>([]);
	const mapContainerRef = useRef<HTMLDivElement>(null);

	useEffect(() => {
		if (!mapRef.current && mapContainerRef.current) {
			mapRef.current = L.map(mapContainerRef.current, {
				center: [-1.963, 30.085],
				zoom: 13,
				zoomControl: false,
			});

			// Add the initial tile layer
			tileLayerRef.current = L.tileLayer(mapTiles[mapType].url, {
				attribution: mapTiles[mapType].attribution,
			}).addTo(mapRef.current);
		}

		return () => {
			if (mapRef.current) {
				mapRef.current.remove();
				mapRef.current = null;
			}
		};
	}, [mapType]);

	// Update tile layer when mapType changes
	useEffect(() => {
		if (mapRef.current && tileLayerRef.current) {
			mapRef.current.removeLayer(tileLayerRef.current);
			tileLayerRef.current = L.tileLayer(mapTiles[mapType].url, {
				attribution: mapTiles[mapType].attribution,
			}).addTo(mapRef.current);
		}
	}, [mapType]);

	useEffect(() => {
		if (!mapRef.current) return;

		// Clear existing routes
		routeRefs.current.forEach((route) => {
			mapRef.current?.removeControl(route);
		});
		routeRefs.current = [];

		// Clear existing markers (except those from tileLayer)
		mapRef.current.eachLayer((layer) => {
			if (layer instanceof L.Marker || layer instanceof L.Routing.Control) {
				mapRef.current?.removeLayer(layer);
			}
		});

		// Add markers for all coordinates
		coordinates.forEach((coord) => {
			L.marker([coord.lat, coord.lng], {
				icon: createCustomIcon(
					pin, // Your image path pattern
					[60, 60] // Custom size
				),
			})
				.addTo(mapRef.current!)
				.bindPopup(coord.name);
		});

		// Add routes for all paths
		paths.forEach((path) => {
			L.Routing.control({
				waypoints: [
					L.latLng(path.start.lat, path.start.lng),
					L.latLng(path.end.lat, path.end.lng),
				],
				routeWhileDragging: false,
				showAlternatives: false,
				fitSelectedRoutes: false,
				show: false,
				// eslint-disable-next-line @typescript-eslint/ban-ts-comment
				// @ts-ignore
				lineOptions: {
					styles: [
						{
							color: path.color,
							opacity: 0.7,
							weight: 5,
						},
					],
				},
				createMarker: (i: number) => {
					const coord = i === 0 ? path.start : path.end;
					const customMarker = L.marker([coord.lat, coord.lng], {
						icon: L.divIcon({
							className: "waypoint-marker",
							html: `
					  <div style="
						width: 30px;
						height: 30px;
						border-radius: 50%;
						background: white;
						display: flex;
						align-items: center;
						justify-content: center;
						border: 2px solid ${path.color};
						color: ${path.color};
						font-weight: bold;
					  ">
						${i === 0 ? "A" : "B"}
					  </div>
					`,
							iconSize: [30, 30],
							iconAnchor: [15, 15],
						}),
					});

					const popupContent = `
				  <div style="
					width: 300px;
					height: 280px;
					background: white;
					overflow: hidden;
					display: flex;
					flex-direction: column;
				  ">
					<div style="
					  height: 200px;
					  background-image: url('${bus}');
					  background-size: contain;
					  background-repeat: no-repeat;
					  background-position: center;
					  position: relative;
					">
					  <div style="
						position: absolute;
						top: 10px;
						right: 10px;
						width: 30px;
						height: 30px;
						border-radius: 50%;
						background: white;
						display: flex;
						align-items: center;
						justify-content: center;
						border: 2px solid ${path.color};
						color: ${path.color};
						font-weight: bold;
					  ">
						${i === 0 ? "A" : "B"}
					  </div>
					</div>
	  
					<div style="
					  padding: 16px;
					  flex-grow: 1;
					  display: flex;
					  flex-direction: column;
					">
					  <button style="
						  padding: 8px 16px;
						  background: ${path.color};
						  color: white;
						  border: none;
						  border-radius: 4px;
						  cursor: pointer;
						">
						  ${path.name}
						</button>
					</div>
				  </div>
				`;

					customMarker.bindPopup(popupContent);
					return customMarker;
				},
			}).addTo(mapRef.current!);
		});

		// Fit bounds to show all markers and routes if there are any
		if (coordinates.length > 0 || paths.length > 0) {
			const bounds = new L.LatLngBounds(
				[...coordinates, ...paths.flatMap((p) => [p.start, p.end])].map(
					(coord) => [coord.lat, coord.lng]
				)
			);
			mapRef.current.fitBounds(bounds, { padding: [50, 50] });
		}
	}, [coordinates, paths]);

	return <div ref={mapContainerRef} className="h-full w-full" />;
}
