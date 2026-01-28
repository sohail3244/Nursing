ALTER TABLE `leads` ADD `state` varchar(100) NOT NULL;--> statement-breakpoint
ALTER TABLE `leads` ADD `city` varchar(100) NOT NULL;--> statement-breakpoint
ALTER TABLE `courses` DROP COLUMN `fees`;--> statement-breakpoint
ALTER TABLE `leads` DROP COLUMN `source`;