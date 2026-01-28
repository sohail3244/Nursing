ALTER TABLE `colleges` ADD `code` varchar(255) NOT NULL;--> statement-breakpoint
ALTER TABLE `colleges` ADD CONSTRAINT `code_unique` UNIQUE(`code`);