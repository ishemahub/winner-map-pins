// src/utils/mapIcons.ts
import L from "leaflet";

export const createCustomIcon = (
	iconUrl: string,
	size: [number, number] = [25, 41]
) => {
	return L.icon({
		iconUrl,
		iconSize: size,

		iconAnchor: [size[0] / 2, size[1]], // Center the icon
		popupAnchor: [0, -size[1]], // Position popup above the icon
	});
};

// Default marker if image fails to load
const defaultMarker = new L.Icon.Default();
defaultMarker.options.iconUrl = "/images/default-marker.png"; // Your fallback image
export { defaultMarker };
