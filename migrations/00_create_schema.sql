CREATE TABLE "users" (
    "id" INTEGER NOT NULL,
    "username" TEXT UNIQUE NOT NULL,
    "name" TEXT,
    "surname" TEXT,
    "email" TEXT UNIQUE NOT NULL,
    "phone" TEXT,
    "password" TEXT NOT NULL,
    "send_announcements_email" BOOLEAN NOT NULL,
    "send_announcements_phone" BOOLEAN NOT NULL,
    "is_organizer" BOOLEAN NOT NULL,
    "is_admin" BOOLEAN NOT NULL,
    "created_at" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "deactivated_at" DATETIME,
    PRIMARY KEY("id" AUTOINCREMENT)
);

CREATE TABLE "events" (
    "id" INTEGER NOT NULL,
    "organizer_id" INTEGER NOT NULL,
    "name" TEXT NOT NULL,
    "type" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "place" TEXT NOT NULL,
    "address" TEXT NOT NULL,
    "duration" INTEGER NOT NULL,
    "age_limit" INTEGER,
    "website" TEXT,
    "is_approved" BOOLEAN,
    "created_at" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    PRIMARY KEY("id" AUTOINCREMENT)
    FOREIGN KEY("organizer_id") REFERENCES "users"("id")
);

CREATE TABLE "tickets" (
    "id" INTEGER NOT NULL,
    "event_id" INTEGER NOT NULL,
    "event_time" DATETIME NOT NULL,
    "sale_time" DATETIME NOT NULL,
    "count" INTEGER NOT NULL,
    "price" REAL NOT NULL,
    "created_at" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    PRIMARY KEY("id" AUTOINCREMENT)
    FOREIGN KEY("event_id") REFERENCES "events"("id")
);

CREATE TABLE "sales" (
    "id" INTEGER NOT NULL,
    "user_id" INTEGER NOT NULL,
    "ticket_id" INTEGER NOT NULL,
    "created_at" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    PRIMARY KEY("id" AUTOINCREMENT),
    FOREIGN KEY("user_id") REFERENCES "users"("id"),
    FOREIGN KEY("ticket_id") REFERENCES "tickets"("id")
);