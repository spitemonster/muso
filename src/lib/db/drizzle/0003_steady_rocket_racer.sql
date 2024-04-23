ALTER TABLE "albums" RENAME COLUMN "artistId" TO "artist_url";--> statement-breakpoint
ALTER TABLE "artists" RENAME COLUMN "adminId" TO "admin_id";--> statement-breakpoint
ALTER TABLE "songs" RENAME COLUMN "artistId" TO "artist_id";--> statement-breakpoint
ALTER TABLE "songs" RENAME COLUMN "albumId" TO "album_id";--> statement-breakpoint
ALTER TABLE "albums" ADD COLUMN "cover_url" text;