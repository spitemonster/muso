CREATE TABLE IF NOT EXISTS "albums" (
	"id" text,
	"title" text,
	"duration" integer,
	"artist_id" text,
	"cover_url" text,
	"created_at" timestamp
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "artists" (
	"id" text,
	"name" text,
	"url" text,
	"admin_id" text,
	"created_at" timestamp
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "songs" (
	"id" text,
	"title" text,
	"duration" integer,
	"artist_id" text,
	"album_id" text,
	"created_at" timestamp
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "users" (
	"id" text,
	"name" text,
	"email" text,
	"password" text,
	"type" text,
	"artist_id" text,
	"created_at" timestamp,
	"updated_at" timestamp
);
