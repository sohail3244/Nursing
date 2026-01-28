ALTER TABLE `courses` ADD `code` varchar(100) NOT NULL;--> statement-breakpoint
ALTER TABLE `courses` ADD CONSTRAINT `course_code_unique` UNIQUE(`code`);