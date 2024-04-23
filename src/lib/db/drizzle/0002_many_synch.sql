CREATE TABLE IF NOT EXISTS "albums" (
	"id" text,
	"title" text,
	"duration" interval second,
	"artistId" text,
	"created_at" timestamp
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "artists" (
	"id" text,
	"name" text,
	"url" text,
	"adminId" text,
	"created_at" timestamp
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "songs" (
	"id" text,
	"title" text,
	"duration" interval second,
	"url" text,
	"artistId" text,
	"albumId" text,
	"created_at" timestamp
);
