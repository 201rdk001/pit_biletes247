import type { default as Db } from './database';
import type { User } from "./models/user";
import "express-session";

declare global {
    declare type Database = Db;

    declare namespace Express {
        interface Application {
            db: Database;
        }
    }
}

declare module 'express-session' {
    interface SessionData {
        user: User;
    }
}