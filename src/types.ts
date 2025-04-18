// src/types.ts
export interface Coordinate {
	id: string;
	name: string;
	lat: number;
	lng: number;
}

export interface Path {
	id: string;
	name: string;
	start: Coordinate;
	end: Coordinate;
	color: string;
}
