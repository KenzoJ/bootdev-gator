ALTER TABLE "feed_follows" ALTER COLUMN "user_id" SET NOT NULL;--> statement-breakpoint
ALTER TABLE "feed_follows" ALTER COLUMN "feed_id" SET NOT NULL;--> statement-breakpoint
ALTER TABLE "feed_follows" ADD CONSTRAINT "feed_follows_feed_id_user_id_unique" UNIQUE("feed_id","user_id");