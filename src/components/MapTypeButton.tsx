// src/components/MapTypeButton.tsx
import { useState } from "react";
import { Layers } from "lucide-react";
import MapTypeModal from "./MapTypeModal";

export default function MapTypeButton() {
	const [isModalOpen, setIsModalOpen] = useState(false);

	return (
		<>
			<button
				className="fixed bottom-4 right-4 bg-white p-3 rounded-full shadow-lg z-[500] hover:bg-gray-100 transition-colors"
				onClick={() => setIsModalOpen(true)}
				aria-label="Change map type"
			>
				<Layers className="w-5 h-5" />
			</button>

			<MapTypeModal
				isOpen={isModalOpen}
				onClose={() => setIsModalOpen(false)}
			/>
		</>
	);
}
