// src/components/PathDetailModal.tsx
import { motion } from "framer-motion";
import { Path } from "../types";
import bus from "../assets/bus.jpg";

interface PathDetailModalProps {
	path: Path;
	onClose: () => void;
}

export default function PathDetailModal({
	path,
	onClose,
}: PathDetailModalProps) {
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
				className="bg-white rounded-lg p-6 w-full max-w-md z-[1001]"
				onClick={(e) => e.stopPropagation()}
			>
				<h2 className="text-xl font-bold mb-4">{path.name}</h2>

				{
					<div className="mb-4 h-48 bg-gray-100 rounded-lg overflow-hidden">
						<img
							src={bus}
							alt={path.name}
							className="w-full h-full object-cover"
						/>
					</div>
				}

				<div className="space-y-4">
					<div>
						<h3 className="font-medium text-gray-700">Start Point</h3>
						<p>{path.start.name}</p>
					</div>

					<div>
						<h3 className="font-medium text-gray-700">End Point</h3>
						<p>{path.end.name}</p>
					</div>


					<div className="flex justify-end">
						<button
							className="px-4 py-2 bg-blue-500 text-white rounded"
							onClick={onClose}
						>
							Close
						</button>
					</div>
				</div>
			</motion.div>
		</motion.div>
	);
}
