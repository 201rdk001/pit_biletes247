/// <reference path="../types.d.ts" />

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
 * @param {Database} db
 * @param {User} user
 * @returns {Promise<number>}
 */
function saveUser(db, user) {
    return db.saveRow("users", user).then(id => user.id = id);
}

/**
 * Find user by identifier
 * @param {Database} db
 * @param {number | string} key
 * @returns {Promise<User>}
 */
function loadUser(db, key) {
    if (typeof key == "number") {
        return db.findRow("users", "id", key);
    }
    else if (typeof key == "string") {
        console.log(key);
        return db.findRow("users", "username", key);
    }
}

module.exports = { saveUser, loadUser };