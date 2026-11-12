CREATE TABLE `bookings` (
	`user_id` text NOT NULL,
	`ronda_id` text NOT NULL,
	`created_at` text NOT NULL,
	PRIMARY KEY(`user_id`, `ronda_id`)
);
--> statement-breakpoint
CREATE INDEX `bookings_ronda_idx` ON `bookings` (`ronda_id`);--> statement-breakpoint
CREATE TABLE `favorites` (
	`user_id` text NOT NULL,
	`ronda_id` text NOT NULL,
	PRIMARY KEY(`user_id`, `ronda_id`)
);
--> statement-breakpoint
CREATE TABLE `profiles` (
	`user_id` text PRIMARY KEY NOT NULL,
	`display_name` text NOT NULL,
	`interests` text NOT NULL,
	`skill` text DEFAULT '' NOT NULL
);
--> statement-breakpoint
CREATE TABLE `reports` (
	`id` text PRIMARY KEY NOT NULL,
	`user_id` text NOT NULL,
	`ronda_id` text NOT NULL,
	`reason` text NOT NULL,
	`created_at` text NOT NULL
);
--> statement-breakpoint
CREATE TABLE `rondas` (
	`id` text PRIMARY KEY NOT NULL,
	`owner_id` text NOT NULL,
	`host_name` text NOT NULL,
	`title` text NOT NULL,
	`description` text NOT NULL,
	`outcome` text NOT NULL,
	`category` text NOT NULL,
	`mode` text NOT NULL,
	`city` text NOT NULL,
	`location` text NOT NULL,
	`starts_at` text NOT NULL,
	`duration` integer NOT NULL,
	`capacity` integer NOT NULL,
	`status` text DEFAULT 'live' NOT NULL,
	`created_at` text NOT NULL
);
--> statement-breakpoint
CREATE INDEX `rondas_discovery_idx` ON `rondas` (`status`,`city`,`starts_at`);--> statement-breakpoint
CREATE INDEX `rondas_owner_idx` ON `rondas` (`owner_id`,`created_at`);