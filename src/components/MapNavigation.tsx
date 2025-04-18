import MapView from "./MapView";
import CoordinatePanel from "./CoordinatePanel";
import { Coordinate, Path } from "../types";

interface MapNavigationProps {
	coordinates: Coordinate[];
	paths: Path[];
	onAddCoordinate: (coord: Omit<Coordinate, "id">) => void;
	onDeletePath: (pathId: string) => void;
	onOpenModal: () => void;
}

export default function MapNavigation({
	coordinates,
	paths,
	onAddCoordinate,
	onDeletePath,
	onOpenModal,
}: MapNavigationProps) {
	return (
		<div className="flex h-full">
			<div className="w-1/4 bg-white shadow-xl rounded-r-lg overflow-hidden">
				<CoordinatePanel
					coordinates={coordinates}
					paths={paths}
					onAddCoordinate={onAddCoordinate}
					onDeletePath={onDeletePath}
					onOpenModal={onOpenModal}
				/>
			</div>
			<div className="w-3/4">
				<MapView coordinates={coordinates} paths={paths} />
			</div>
		</div>
	);
}
