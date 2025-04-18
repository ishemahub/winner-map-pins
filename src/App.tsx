// src/App.tsx
import { useState, useEffect } from "react";
import { AnimatePresence } from "framer-motion";
import MapNavigation from "./components/MapNavigation";
import PathModal from "./components/PathModal";
import { Coordinate, Path } from "./types";
import { MapTypeProvider } from "./components/MapTypeContext";

// Default coordinates data
const DEFAULT_COORDINATES: Coordinate[] = [
	{
		name: "Kimironko",
		lat: -1.942618,
		lng: 30.1382016,
		id: "1744902906077",
	},
	{
		name: "DownTown",
		lat: -1.9428851,
		lng: 30.0574266,
		id: "1744902930259",
	},
	{
		name: "Nyacyonga",
		lat: -1.8765,
		lng: 30.0788,
		id: "1746801040000",
	},
	{
		name: "Kabuga",
		lat: -1.965,
		lng: 30.215,
		id: "1746801060000",
	},
	{
		name: "Busanza",
		lat: -2.0357,
		lng: 30.1184,
		id: "1746801080000",
	},
	{
		name: "Remera",
		lat: -1.95,
		lng: 30.1,
		id: "1746801100000",
	},
	{
		name: "Kanombe",
		lat: -1.9692,
		lng: 30.1675,
		id: "1746801120000",
	},
	{
		name: "Bishenyi",
		lat: -1.6833,
		lng: 29.6167,
		id: "1746801140000",
	},
	{
		name: "Rwandex",
		lat: -1.963,
		lng: 30.085,
		id: "1746801160000",
	},
	{
		name: "Nyabugogo",
		lat: -1.9536,
		lng: 30.0475,
		id: "1746801180000",
	},
	{
		name: "Nyamirambo",
		lat: -1.96,
		lng: 30.04,
		id: "1746801200000",
	},
];

const DEFAULT_PATHS: Path[] = [
	{
		name: "Kimironko-Downtown",
		start: DEFAULT_COORDINATES.find((c) => c.name === "Kimironko")!,
		end: DEFAULT_COORDINATES.find((c) => c.name === "DownTown")!,
		color: "#ef4444",
		id: "1744903262117",
	},
	{
		name: "Remera-Rwandex",
		start: DEFAULT_COORDINATES.find((c) => c.name === "Remera")!,
		end: DEFAULT_COORDINATES.find((c) => c.name === "Rwandex")!,
		color: "#f97316",
		id: "1744981948502",
	},
	{
		name: "Nyacyonga-Downtown",
		start: DEFAULT_COORDINATES.find((c) => c.name === "Nyacyonga")!,
		end: DEFAULT_COORDINATES.find((c) => c.name === "DownTown")!,
		color: "#a855f7", // Added a color
		id: Date.now().toString() + "1",
	},
	{
		name: "Nyamirambo-Downtown",
		start: DEFAULT_COORDINATES.find((c) => c.name === "Nyamirambo")!,
		end: DEFAULT_COORDINATES.find((c) => c.name === "DownTown")!,
		color: "#ec4899", // Added a color
		id: Date.now().toString() + "2",
	},
	{
		name: "Kabuga-Downtown",
		start: DEFAULT_COORDINATES.find((c) => c.name === "Kabuga")!,
		end: DEFAULT_COORDINATES.find((c) => c.name === "DownTown")!,
		color: "#db2777", // Added a color
		id: Date.now().toString() + "3",
	},
	{
		name: "Remera-Nyabugogo",
		start: DEFAULT_COORDINATES.find((c) => c.name === "Remera")!,
		end: DEFAULT_COORDINATES.find((c) => c.name === "Nyabugogo")!,
		color: "#14b8a6", // Added a color
		id: Date.now().toString() + "4",
	},
	{
		name: "Bishenyi-Nyabugogo",
		start: DEFAULT_COORDINATES.find((c) => c.name === "Bishenyi")!,
		end: DEFAULT_COORDINATES.find((c) => c.name === "Nyabugogo")!,
		color: "#0ea5e9", // Added a color
		id: Date.now().toString() + "5",
	},
	{
		name: "Ndera-Remera",
		start: {
			name: "Ndera",
			lat: -1.9167,
			lng: 30.15,
			id: Date.now().toString() + "6a",
		}, // Assuming approximate coordinates for Ndera
		end: DEFAULT_COORDINATES.find((c) => c.name === "Remera")!,
		color: "#64748b", // Added a color
		id: Date.now().toString() + "6",
	},
	{
		name: "Nyamirambo-Kimisagara-Downtown",
		// This looks like a multi-point path, which the current 'Path' structure with 'start' and 'end' doesn't directly support.
		// You might need a different structure to represent this.
		// For now, I'll represent it as a path from Nyamirambo to Downtown, potentially losing the Kimisagara information in this structure.
		start: DEFAULT_COORDINATES.find((c) => c.name === "Nyamirambo")!,
		end: DEFAULT_COORDINATES.find((c) => c.name === "DownTown")!,
		color: "#4ade80", // Added a color
		id: Date.now().toString() + "7",
	},
	{
		name: "Busanza-Remera",
		start: DEFAULT_COORDINATES.find((c) => c.name === "Busanza")!,
		end: DEFAULT_COORDINATES.find((c) => c.name === "Remera")!,
		color: "#eab308", // Added a color
		id: Date.now().toString() + "8",
	},
	{
		name: "Kanombe-Downtown",
		start: DEFAULT_COORDINATES.find((c) => c.name === "Kanombe")!,
		end: DEFAULT_COORDINATES.find((c) => c.name === "DownTown")!,
		color: "#f43f5e", // Added a color
		id: Date.now().toString() + "9",
	},
];
// Helper function to load data from localStorage
const loadFromLocalStorage = <T,>(key: string, defaultValue: T): T => {
	const saved = localStorage.getItem(key);
	return saved ? JSON.parse(saved) : defaultValue;
};

function App() {
	const [coordinates, setCoordinates] = useState<Coordinate[]>(() => {
		const loaded = loadFromLocalStorage<Coordinate[]>("coordinates", []);
		// If no coordinates exist in localStorage, use default coordinates
		return loaded.length > 0 ? loaded : DEFAULT_COORDINATES;
	});

	const [paths, setPaths] = useState<Path[]>(() => {
		const loaded = loadFromLocalStorage<Path[]>("path", []);
		// If no coordinates exist in localStorage, use default coordinates
		return loaded.length > 0 ? loaded : DEFAULT_PATHS;
	});

	const [isModalOpen, setIsModalOpen] = useState(false);

	// Save to localStorage whenever coordinates or paths change
	useEffect(() => {
		localStorage.setItem("coordinates", JSON.stringify(coordinates));
	}, [coordinates]);

	useEffect(() => {
		localStorage.setItem("paths", JSON.stringify(paths));
	}, [paths]);

	const addCoordinate = (coord: Omit<Coordinate, "id">) => {
		const newCoordinate = {
			...coord,
			id: Date.now().toString(),
		};
		setCoordinates((prev) => [...prev, newCoordinate]);
	};

	const addPath = (path: Omit<Path, "id">) => {
		const newPath = {
			...path,
			id: Date.now().toString(),
		};
		setPaths((prev) => [...prev, newPath]);
	};

	const deletePath = (pathId: string) => {
		setPaths((prev) => prev.filter((p) => p.id !== pathId));
	};

	return (
		<MapTypeProvider>
			<div className="h-screen bg-gray-100">
				<MapNavigation
					coordinates={coordinates}
					paths={paths}
					onAddCoordinate={addCoordinate}
					onDeletePath={deletePath}
					onOpenModal={() => setIsModalOpen(true)}
				/>

				<AnimatePresence>
					{isModalOpen && (
						<PathModal
							coordinates={coordinates}
							onAddPath={addPath}
							onClose={() => setIsModalOpen(false)}
						/>
					)}
				</AnimatePresence>
			</div>
		</MapTypeProvider>
	);
}

export default App;
