CREATE TABLE `todo` (
	`id` serial AUTO_INCREMENT NOT NULL,
	`description` text NOT NULL,
	`date` date NOT NULL,
	`user_id` int NOT NULL,
	CONSTRAINT `todo_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `user` (
	`id` int AUTO_INCREMENT NOT NULL,
	`username` varchar(10) NOT NULL,
	CONSTRAINT `user_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
ALTER TABLE `todo` ADD CONSTRAINT `todo_user_id_user_id_fk` FOREIGN KEY (`user_id`) REFERENCES `user`(`id`) ON DELETE no action ON UPDATE no action;