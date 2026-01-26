ALTER TABLE `users` RENAME COLUMN `user_number` TO `email`;--> statement-breakpoint
ALTER TABLE `users` MODIFY COLUMN `email` varchar(150) NOT NULL;--> statement-breakpoint
ALTER TABLE `users` MODIFY COLUMN `updated_at` timestamp NOT NULL DEFAULT (now()) ON UPDATE CURRENT_TIMESTAMP;--> statement-breakpoint
ALTER TABLE `users` ADD `password` varchar(255) NOT NULL;--> statement-breakpoint
ALTER TABLE `users` ADD `role` varchar(20) DEFAULT 'admin' NOT NULL;--> statement-breakpoint
ALTER TABLE `users` ADD `is_active` boolean DEFAULT true;--> statement-breakpoint
ALTER TABLE `users` ADD CONSTRAINT `email_unique` UNIQUE(`email`);--> statement-breakpoint
CREATE INDEX `role_index` ON `users` (`role`);