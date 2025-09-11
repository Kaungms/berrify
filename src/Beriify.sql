CREATE TABLE "users" (
  "id" integer PRIMARY KEY,
  "name" varchar,
  "email" varchar UNIQUE,
  "password" varchar,
  "onboarded" boolean,
  "photo_url" varchar,
  "role" varchar,
  "createdAt" timestamp
);

CREATE TABLE "plants" (
  "plant_id" integer PRIMARY KEY,
  "user_id" integer NOT NULL,
  "plant_name" varchar,
  "mode" varchar,
  "last_scan_time" timestamp,
  "last_photo_at" timestamp,
  "moisture" decimal,
  "photo_url" varchar,
  "status" varchar,
  "status_alert" varchar,
  "tracking_description" text
);

CREATE TABLE "uploads" (
  "id" integer PRIMARY KEY,
  "plant_id" integer NOT NULL,
  "user_id" integer NOT NULL,
  "image_url" varchar,
  "source" varchar,
  "storage_path" varchar,
  "timestamp" timestamp
);

CREATE TABLE "devices" (
  "device_id" integer PRIMARY KEY,
  "plant_id" integer NOT NULL
);

CREATE TABLE "diary_entries" (
  "id" integer PRIMARY KEY,
  "plant_id" integer NOT NULL,
  "title" varchar,
  "timestamp" timestamp
);

ALTER TABLE "plants" ADD FOREIGN KEY ("user_id") REFERENCES "users" ("id");

ALTER TABLE "uploads" ADD FOREIGN KEY ("user_id") REFERENCES "users" ("id");

ALTER TABLE "uploads" ADD FOREIGN KEY ("plant_id") REFERENCES "plants" ("plant_id");

ALTER TABLE "devices" ADD FOREIGN KEY ("plant_id") REFERENCES "plants" ("plant_id");

ALTER TABLE "diary_entries" ADD FOREIGN KEY ("plant_id") REFERENCES "plants" ("plant_id");
