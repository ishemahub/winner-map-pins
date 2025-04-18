const colors = [
	"#3b82f6", // blue
	"#ef4444", // red
	"#10b981", // green
	"#f59e0b", // yellow
	"#8b5cf6", // purple
	"#ec4899", // pink
	"#14b8a6", // teal
	"#f97316", // orange
];

interface ColorPickerProps {
	color: string;
	onChange: (color: string) => void;
}

export default function ColorPicker({ color, onChange }: ColorPickerProps) {
	return (
		<div className="flex space-x-2">
			{colors.map((c) => (
				<button
					key={c}
					className={`w-8 h-8 rounded-full ${
						color === c ? "ring-2 ring-offset-2 ring-gray-400" : ""
					}`}
					style={{ backgroundColor: c }}
					onClick={() => onChange(c)}
				/>
			))}
		</div>
	);
}
