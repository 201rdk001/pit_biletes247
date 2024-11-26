import type { default as Db } from './database';

declare global {
    declare type Database = Db;

    declare namespace Express {
        export interface Application {
            db: Database;
        }
    }
}