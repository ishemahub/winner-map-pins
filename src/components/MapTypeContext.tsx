// src/context/MapTypeContext.tsx
import {
	createContext,
	useContext,
	useState,
	useEffect,
	ReactNode,
} from "react";

export type MapType = "osm" | "transport" | "satellite" | "cycle" | "dark";

interface MapTypeContextType {
	mapType: MapType;
	setMapType: (type: MapType) => void;
}

const MapTypeContext = createContext<MapTypeContextType | undefined>(undefined);

export const MapTypeProvider = ({ children }: { children: ReactNode }) => {
	const [mapType, setMapType] = useState<MapType>(() => {
		// Load from localStorage or default to 'osm'
		if (typeof window !== "undefined") {
			const saved = localStorage.getItem("mapType");
			return saved ? (JSON.parse(saved) as MapType) : "osm";
		}
		return "osm";
	});

	useEffect(() => {
		localStorage.setItem("mapType", JSON.stringify(mapType));
	}, [mapType]);

	return (
		<MapTypeContext.Provider value={{ mapType, setMapType }}>
			{children}
		</MapTypeContext.Provider>
	);
};

// eslint-disable-next-line react-refresh/only-export-components
export const useMapType = () => {
	const context = useContext(MapTypeContext);
	if (context === undefined) {
		throw new Error("useMapType must be used within a MapTypeProvider");
	}
	return context;
};
