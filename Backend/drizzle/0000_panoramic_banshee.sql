CREATE TABLE `users` (
	`id` varchar(36) NOT NULL DEFAULT (UUID()),
	`user_number` varchar(30) NOT NULL,
	`first_name` varchar(100) NOT NULL,
	`last_name` varchar(100) NOT NULL,
	`created_at` timestamp NOT NULL DEFAULT (now()),
	`updated_at` timestamp NOT NULL DEFAULT (now()),
	CONSTRAINT `users_id` PRIMARY KEY(`id`)
);
