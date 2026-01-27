CREATE TABLE `blogs` (
	`id` varchar(36) NOT NULL DEFAULT (UUID()),
	`title` varchar(255) NOT NULL,
	`description` text NOT NULL,
	`image` varchar(255),
	`created_at` timestamp DEFAULT (now()),
	CONSTRAINT `blogs_id` PRIMARY KEY(`id`)
);
