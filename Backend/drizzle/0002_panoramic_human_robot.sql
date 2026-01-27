CREATE TABLE `leads` (
	`id` varchar(36) NOT NULL DEFAULT (UUID()),
	`name` varchar(150) NOT NULL,
	`email` varchar(150),
	`phone` varchar(20) NOT NULL,
	`course` varchar(150),
	`college` varchar(150),
	`source` varchar(100) DEFAULT 'website',
	`created_at` timestamp DEFAULT (now()),
	CONSTRAINT `leads_id` PRIMARY KEY(`id`)
);
