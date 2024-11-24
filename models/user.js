const database = require("../database");

/**
 * User object
 * @typedef {Object} User
 * @property {number} id
 * @property {string} username
 * @property {string} name
 * @property {string} surname
 * @property {string} email
 * @property {string} phone
 * @property {string} password
 * @property {boolean} send_announcements_email
 * @property {boolean} send_announcements_phone
 * @property {boolean} is_organizer
 * @property {boolean} is_admin
 * @property {Date} created_at
 * @property {Date} deactivated_at
 */

/**
 * Save user to database
 * @param {import("sqlite3").Database} db 
 * @param {User} user
 * @returns {Promise<boolean>}
 */
function saveUser(db, user) {
    return database.saveRow(db, "users", user);
}

/**
 * Find user by identifier
 * @param {import("sqlite3").Database} db 
 * @param {number} id
 * @returns {Promise<User>}
 */
function loadUser(db, id) {
    return database.findRow(db, "users", id);

}

/**
 * Authentify user with password
 * @param {import("sqlite3").Database} db 
 * @param {number} id
 * @returns {Promise<boolean>}
 */
function checkUserPassword(db, id, password) {
    return new Promise((resolve, reject) => {
        db.get(
            `SELECT (password = ?) FROM users WHERE id = ?;`
            [password, id],
            (err, row) => err ? reject(err) : resolve(row.password_matches == 1)
        );
    });
}

module.exports = { saveUser, loadUser, checkUserPassword };