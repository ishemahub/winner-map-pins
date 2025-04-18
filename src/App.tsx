// src/App.tsx
import { useState, useEffect } from "react";
import { AnimatePresence } from "framer-motion";
import MapNavigation from "./components/MapNavigation";
import PathModal from "./components/PathModal";
import { Coordinate, Path } from "./types";
import { MapTypeProvider } from "./components/MapTypeContext";

// Helper function to load data from localStorage
const loadFromLocalStorage = <T,>(key: string, defaultValue: T): T => {
	const saved = localStorage.getItem(key);
	return saved ? JSON.parse(saved) : defaultValue;
};

function App() {
	const [coordinates, setCoordinates] = useState<Coordinate[]>(
		loadFromLocalStorage("coordinates", [])
	);
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
