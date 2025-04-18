// src/components/MapTypeModal.tsx
import { motion } from "framer-motion";
import { Map, Layers, Satellite, Bike, Moon } from "lucide-react";
import { MapType, useMapType } from "./MapTypeContext";

const mapTypes = [
	{ id: "osm", name: "OpenStreetMap", icon: <Map className="w-5 h-5" /> },
	{ id: "transport", name: "Transport", icon: <Layers className="w-5 h-5" /> },
	{
		id: "satellite",
		name: "Satellite",
		icon: <Satellite className="w-5 h-5" />,
	},
	{ id: "cycle", name: "Cycle", icon: <Bike className="w-5 h-5" /> },
	{ id: "dark", name: "Dark", icon: <Moon className="w-5 h-5" /> },
];

interface MapTypeModalProps {
	isOpen: boolean;
	onClose: () => void;
}

export default function MapTypeModal({ isOpen, onClose }: MapTypeModalProps) {
	const { mapType, setMapType } = useMapType();

	if (!isOpen) return null;

	return (
		<motion.div
			initial={{ opacity: 0 }}
			animate={{ opacity: 1 }}
			exit={{ opacity: 0 }}
			className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-[1000]"
			onClick={onClose}
		>
			<motion.div
				initial={{ y: 50, opacity: 0 }}
				animate={{ y: 0, opacity: 1 }}
				exit={{ y: 50, opacity: 0 }}
				className="bg-white rounded-lg p-6 w-full max-w-sm z-[1001]"
				onClick={(e) => e.stopPropagation()}
			>
				<h2 className="text-xl font-bold mb-4 flex items-center gap-2">
					<Layers className="w-5 h-5" />
					Select Map Type
				</h2>

				<div className="space-y-2">
					{mapTypes.map((type) => (
						<button
							key={type.id}
							className={`w-full p-3 rounded-lg flex items-center gap-3 text-left transition-colors ${
								mapType === type.id
									? "bg-blue-100 text-blue-700"
									: "hover:bg-gray-100"
							}`}
							onClick={() => {
								setMapType(type.id as MapType);
								onClose();
							}}
						>
							<div
								className={`p-2 rounded-full ${
									mapType === type.id ? "bg-blue-500 text-white" : "bg-gray-200"
								}`}
							>
								{type.icon}
							</div>
							<span>{type.name}</span>
						</button>
					))}
				</div>
			</motion.div>
		</motion.div>
	);
}
