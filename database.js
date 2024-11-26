const fs = require("fs");
const sqlite = require("sqlite3");

if (!fs.existsSync("database.sqlite.db")) {
    const db = new sqlite.Database("database.sqlite.db");
    for (const migration of fs.readdirSync("migrations")) {
        db.exec(fs.readFileSync(`migrations/${migration}`, "utf8"));
    }
    db.close();
}

class Database {
    constructor(sqlite) {
        /**
         * Sqlite database instance
         * @type {sqlite.Database}
         */
        this.sqlite = sqlite;
    }
    
    /**
     * Open new sqlite database instance
     * @returns {Database}
     */
    static open() {
        return new Database(new sqlite.Database("database.sqlite.db"));
    }

    /**
     * Find row by identifier
     * @param {string} table
     * @param {any} id
     * @param {string[]} fields
     * @returns {Promise<any>}
     */
    findRow(table, key, value, fields) {
        fields ??= ["*"];
        return new Promise((resolve, reject) => {
            console.log(`SELECT ${fields.join(", ")} FROM ${table} WHERE ${key} = ?`);
            this.sqlite.get(
                `SELECT ${fields.join(", ")} FROM ${table} WHERE ${key} = ?`, [value],
                (err, row) => err ? reject(err) : resolve(row)
            );
        });
    }

    /**
     * Update table row
     * @param {string} table
     * @param {any} row
     * @returns {Promise<number>}
     */
    updateRow(table, row) {
        const fields = Object.entries(row).filter(entry => entry[0] != "id");
        const setList = fields.map(entry => entry[0] + " = ?").join(", ");

        return new Promise((resolve, reject) => {
            this.sqlite.run(
                `UPDATE ${table} SET ${setList} WHERE id = ?;`,
                fields.map(entry => entry[1]).push(row.id),
                function (err) { err ? reject(err) : resolve(this.lastID); }
            );
        });
    }

    /**
     * Insert row into table
     * @param {string} table
     * @param {any} row
     * @returns {Promise<number>}
     */
    insertRow(table, row) {
        const fields = Object.entries(row);
        const fieldList = fields.map(entry => entry[0]).join(", ");
        const bindList = Array(fields.length).fill("?").join(", ");

        return new Promise((resolve, reject) => {
            this.sqlite.run(
                `INSERT INTO ${table} (${fieldList}) VALUES (${bindList});`,
                fields.map(entry => entry[1]),
                function (err) { err ? reject(err) : resolve(this.lastID); }
            );
        });
    }

    /**
     * Saves row to table
     * @param {string} table
     * @param {any} row
     * @returns {Promise<number>}
     */
    saveRow(table, row) {
        return row.id ? this.updateRow(table, row) : this.insertRow(table, row);
    }
}

module.exports = Database;