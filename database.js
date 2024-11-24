const fs = require("fs");
const sqlite = require("sqlite3");
const dbExists = fs.existsSync("database.sqlite.db");
const _db = new sqlite.Database("database.sqlite.db");

if (!dbExists) {
    for (const migration of fs.readdirSync("migrations")) {
        _db.exec(fs.readFileSync(`migrations/${migration}`, "utf8"));
    }
}

function middleware() {
    /**
     * Database connection provider middleware
     * @param {import('express').Request} req 
     * @param {import('express').Response} res
     * @param {import('express').NextFunction} next 
     */
    return (req, res, next) => {
        res.locals.db = _db;
        next();
    };
}

/**
 * Find row by identifier
 * @param {import("sqlite3").Database} db 
 * @param {string} table
 * @param {any} id
 * @param {string[]} fields
 * @returns {Promise<any>}
 */
function findRow(db, table, id, fields) {
    fields ??= ["*"];
    return new Promise((resolve, reject) => {
        db.get(
            `SELECT ${fields.join(", ")} FROM "${table}" WHERE id = ?`, [id],
            (err, row) => err ? reject(err) : resolve(row)
        );
    });
}

/**
 * Update table row
 * @param {import("sqlite3").Database} db 
 * @param {string} table
 * @param {any} row
 * @returns {Promise<boolean>}
 */
function updateRow(db, table, row) {
    const fields = Object.entries(row).filter(entry => entry[0] != "id");
    const setList = fields.map(entry => entry[0] + " = ?").join(", ");

    return new Promise((resolve, reject) => {
        db.run(
            `UPDATE "${table}" SET ${setList} WHERE id = ?;`,
            fields.map(entry => entry[1]).push(row.id),
            (err, row) => err ? reject(err) : resolve(row)
        );
    });
}

/**
 * Insert row into table
 * @param {import("sqlite3").Database} db 
 * @param {string} table
 * @param {any} row
 * @returns {Promise<boolean>}
 */
function insertRow(db, table, row) {
    const fields = Object.entries(row);
    const fieldList = fields.map(entry => entry[0]).join(", ");
    const bindList = Array(fields.length).fill("?").join(", ");

    return new Promise((resolve, reject) => {
        db.run(
            `INSERT INTO "${table}" (${fieldList}) VALUES (${bindList});`,
            fields.map(entry => entry[1]),
            function (err) {
                if (err) { reject(err); }
                row.id = this.lastID;
                resolve(row);
            }
        );
    });
}

/**
 * Saves row to table
 * @param {import("sqlite3").Database} db 
 * @param {string} table
 * @param {any} row
 * @returns {Promise<boolean>}
 */
function saveRow(db, table, row) {
    return row.id ? updateRow(db, table, row) : insertRow(db, table, row);
}

/**
 * Get application database
 * @param {import("express").Response} res 
 * @returns {import("sqlite3").Database}
 */
function get(res) {
    return res.locals.db;
}



module.exports = { middleware, get, findRow, updateRow, insertRow, saveRow };