// src/components/CoordinatePanel.tsx
import { motion } from "framer-motion";
import { useState } from "react";
import { Trash2 } from "lucide-react";
import { Coordinate, Path } from "../types";
import MapTypeButton from "./MapTypeButton";
import logo from "../assets/logo.png";

interface CoordinatePanelProps {
	coordinates: Coordinate[];
	paths: Path[];
	onAddCoordinate: (coord: Omit<Coordinate, "id">) => void;
	onDeletePath: (pathId: string) => void;
	onOpenModal: () => void;
}

export default function CoordinatePanel({
	paths,
	onAddCoordinate,
	onDeletePath,
	onOpenModal,
}: CoordinatePanelProps) {
	const [newCoord, setNewCoord] = useState<Omit<Coordinate, "id">>({
		name: "",
		lat: 0,
		lng: 0,
	});

	const handleAdd = () => {
		if (newCoord.name && newCoord.lat && newCoord.lng) {
			onAddCoordinate(newCoord);
			setNewCoord({ name: "", lat: 0, lng: 0 });
		}
	};

	return (
		<div className="p-6 h-full flex flex-col">
			<img src={logo} className=" h-30" alt="Logo" />
			<div className="mb-6">
				<h3 className="text-lg font-semibold mb-3">Add New Point</h3>
				<div className="grid grid-cols-2 gap-2 mb-2">
					<div className="col-span-2">
						<input
							type="text"
							placeholder="Name"
							className="w-full p-2 border rounded mb-2"
							value={newCoord.name}
							onChange={(e) =>
								setNewCoord({ ...newCoord, name: e.target.value })
							}
						/>
					</div>
					<input
						type="number"
						placeholder="Latitude"
						className="flex-1 p-2 border rounded"
						value={newCoord.lat || ""}
						onChange={(e) =>
							setNewCoord({ ...newCoord, lat: parseFloat(e.target.value) || 0 })
						}
					/>
					<input
						type="number"
						placeholder="Longitude"
						className="flex-1 p-2 border rounded"
						value={newCoord.lng || ""}
						onChange={(e) =>
							setNewCoord({ ...newCoord, lng: parseFloat(e.target.value) || 0 })
						}
					/>
				</div>
				<button
					className="w-full bg-blue-500 text-white py-2 px-4 rounded"
					onClick={handleAdd}
				>
					Add Point
				</button>
			</div>
			<div className="w-full flex">
				<MapTypeButton />
			</div>
			<div className="flex-1 overflow-y-auto mb-4">
				<h3 className="text-lg font-semibold mb-3">Saved Paths</h3>
				{paths.length === 0 ? (
					<p className="text-gray-500">No paths saved yet</p>
				) : (
					paths.map((path) => (
						<motion.div
							key={path.id}
							initial={{ opacity: 0 }}
							animate={{ opacity: 1 }}
							className="p-3 mb-2 shadow-lg rounded border flex items-center justify-between"
							style={{ borderLeft: `4px solid ${path.color}` }}
						>
							<div className="flex-1">
								<div className="font-medium">{path.name}</div>
								<div className="text-sm text-gray-500">
									{path.start.name} → {path.end.name}
								</div>
							</div>
							<button
								onClick={() => onDeletePath(path.id)}
								className="text-red-500 hover:text-red-700"
							>
								<Trash2 size={18} />
							</button>
						</motion.div>
					))
				)}
			</div>

			<motion.button
				whileHover={{ scale: 1.02 }}
				whileTap={{ scale: 0.98 }}
				className="w-full bg-green-500 text-white py-3 px-4 rounded-lg"
				onClick={onOpenModal}
			>
				Create New Path
			</motion.button>
		</div>
	);
}
