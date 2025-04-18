// src/components/PathModal.tsx
import { motion } from "framer-motion";
import { useState, useEffect } from "react";
import ColorPicker from "./ColorPicker";
import { Coordinate, Path } from "../types";

interface PathModalProps {
	coordinates: Coordinate[];
	onAddPath: (path: Omit<Path, "id">) => void;
	onClose: () => void;
}

export default function PathModal({
	coordinates,
	onAddPath,
	onClose,
}: PathModalProps) {
	const [pathName, setPathName] = useState("");
	const [startId, setStartId] = useState("");
	const [endId, setEndId] = useState("");
	const [color, setColor] = useState("#3b82f6");

	useEffect(() => {
		const leafletPanes = document.querySelectorAll(".leaflet-pane");
		leafletPanes.forEach((pane) => {
			(pane as HTMLElement).style.zIndex = "0";
		});

		return () => {
			leafletPanes.forEach((pane) => {
				(pane as HTMLElement).style.zIndex = "";
			});
		};
	}, []);

	const handleSubmit = () => {
		const start = coordinates.find((c) => c.id === startId);
		const end = coordinates.find((c) => c.id === endId);

		if (!start || !end || !pathName) return;

		onAddPath({
			name: pathName,
			start,
			end,
			color,
		});

		onClose();
	};

	return (
		<motion.div
			initial={{ opacity: 0 }}
			animate={{ opacity: 1 }}
			exit={{ opacity: 0 }}
			className="fixed inset-0 bg-black-900 bg-opacity-50 flex items-center justify-center z-[1000]"
			onClick={onClose}
		>
			<motion.div
				initial={{ y: 50, opacity: 0 }}
				animate={{ y: 0, opacity: 1 }}
				exit={{ y: 50, opacity: 0 }}
				className="bg-white rounded-lg p-6 w-full max-w-md z-[1001]"
				onClick={(e) => e.stopPropagation()}
			>
				<h2 className="text-2xl font-bold mb-4">Create New Path</h2>

				<div className="space-y-4">
					<div>
						<label className="block text-sm font-medium mb-1">Path Name</label>
						<input
							type="text"
							className="w-full p-2 border rounded"
							value={pathName}
							onChange={(e) => setPathName(e.target.value)}
						/>
					</div>

					<div>
						<label className="block text-sm font-medium mb-1">
							Start Point
						</label>
						<select
							className="w-full p-2 border rounded"
							value={startId}
							onChange={(e) => setStartId(e.target.value)}
						>
							<option value="">Select start point</option>
							{coordinates.map((coord) => (
								<option key={coord.id} value={coord.id}>
									{coord.name}
								</option>
							))}
						</select>
					</div>

					<div>
						<label className="block text-sm font-medium mb-1">End Point</label>
						<select
							className="w-full p-2 border rounded"
							value={endId}
							onChange={(e) => setEndId(e.target.value)}
							disabled={!startId}
						>
							<option value="">Select end point</option>
							{coordinates
								.filter((coord) => coord.id !== startId)
								.map((coord) => (
									<option key={coord.id} value={coord.id}>
										{coord.name}
									</option>
								))}
						</select>
					</div>

					<div>
						<label className="block text-sm font-medium mb-1">Path Color</label>
						<ColorPicker color={color} onChange={setColor} />
					</div>
				</div>

				<div className="flex justify-end space-x-2 mt-6">
					<button className="px-4 py-2 border rounded" onClick={onClose}>
						Cancel
					</button>
					<button
						className="px-4 py-2 bg-blue-500 text-white rounded"
						onClick={handleSubmit}
						disabled={!pathName || !startId || !endId}
					>
						Create Path
					</button>
				</div>
			</motion.div>
		</motion.div>
	);
}
