CREATE TABLE "refreshTokens" (
	"userId" integer PRIMARY KEY NOT NULL,
	"token" text NOT NULL
);
--> statement-breakpoint
CREATE TABLE "rubiksFolders" (
	"id" serial PRIMARY KEY NOT NULL,
	"name" varchar(128) NOT NULL,
	"userId" integer NOT NULL
);
--> statement-breakpoint
CREATE TABLE "rubiksSolves" (
	"id" serial PRIMARY KEY NOT NULL,
	"solveTime" integer NOT NULL,
	"cubeType" varchar(128) NOT NULL,
	"scramble" varchar(128) NOT NULL,
	"penalty" varchar(128) NOT NULL,
	"when" timestamp DEFAULT now(),
	"rubiksFolderId" integer NOT NULL
);
--> statement-breakpoint
CREATE TABLE "users" (
	"id" serial PRIMARY KEY NOT NULL,
	"email" varchar(128) NOT NULL,
	"roles" varchar(128)[] NOT NULL,
	"password" text NOT NULL,
	CONSTRAINT "users_email_unique" UNIQUE("email")
);
--> statement-breakpoint
ALTER TABLE "refreshTokens" ADD CONSTRAINT "refreshTokens_userId_users_id_fk" FOREIGN KEY ("userId") REFERENCES "public"."users"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "rubiksFolders" ADD CONSTRAINT "rubiksFolders_userId_users_id_fk" FOREIGN KEY ("userId") REFERENCES "public"."users"("id") ON DELETE cascade ON UPDATE cascade;--> statement-breakpoint
ALTER TABLE "rubiksSolves" ADD CONSTRAINT "rubiksSolves_rubiksFolderId_rubiksFolders_id_fk" FOREIGN KEY ("rubiksFolderId") REFERENCES "public"."rubiksFolders"("id") ON DELETE cascade ON UPDATE cascade;