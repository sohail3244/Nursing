ALTER TABLE `blogs` ADD `code` varchar(100) NOT NULL;--> statement-breakpoint
ALTER TABLE `blogs` ADD CONSTRAINT `blog_code_unique` UNIQUE(`code`);