export interface RecordBase {
	id: string;
}

export interface Release extends RecordBase {
	title: string;
	slug: string;
	tags?: Tag[];
	primaryArtist?: Artist;
	artists?: Artist[];
}

export interface Track extends Release {
	trackUrl: string;
	duration?: number;
}

export interface Collection extends Release {
	coverUrl: string;
	description?: string;
	tracks?: Track[];
	artists?: Artist[];
}

export interface Entity extends RecordBase {
	name: string;
}

export interface Artist extends Entity {
	slug: string;
	collections?: Collection[];
	profileImageUrl?: string;
	biography?: string;
	tags?: Tag[];
}

export interface Tag extends Entity {
	slug: string;
}

export type ColumnCount = 1 | 2 | 3 | 4 | 6;