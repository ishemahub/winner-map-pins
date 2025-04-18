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

	const [paths, setPaths] = useState<Path[]>(loadFromLocalStorage("paths", []));
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
