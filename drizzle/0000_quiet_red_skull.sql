CREATE TABLE "refreshTokens" (
	"id" serial PRIMARY KEY NOT NULL,
	"userId" integer NOT NULL,
	"token" text
);
--> statement-breakpoint
CREATE TABLE "rubiksFolders" (
	"id" serial PRIMARY KEY NOT NULL,
	"name" varchar(128),
	"userId" integer NOT NULL
);
--> statement-breakpoint
CREATE TABLE "rubiksSolves" (
	"id" serial PRIMARY KEY NOT NULL,
	"solveTime" integer,
	"cubeType" varchar(128),
	"scramble" varchar(128),
	"when" timestamp DEFAULT now(),
	"rubiksFolderId" integer NOT NULL
);
--> statement-breakpoint
CREATE TABLE "users" (
	"id" serial PRIMARY KEY NOT NULL,
	"email" varchar(128),
	"roles" varchar(128)[],
	"password" text,
	CONSTRAINT "users_email_unique" UNIQUE("email")
);
--> statement-breakpoint
ALTER TABLE "refreshTokens" ADD CONSTRAINT "refreshTokens_userId_users_id_fk" FOREIGN KEY ("userId") REFERENCES "public"."users"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "rubiksFolders" ADD CONSTRAINT "rubiksFolders_userId_users_id_fk" FOREIGN KEY ("userId") REFERENCES "public"."users"("id") ON DELETE cascade ON UPDATE cascade;--> statement-breakpoint
ALTER TABLE "rubiksSolves" ADD CONSTRAINT "rubiksSolves_rubiksFolderId_rubiksFolders_id_fk" FOREIGN KEY ("rubiksFolderId") REFERENCES "public"."rubiksFolders"("id") ON DELETE cascade ON UPDATE cascade;