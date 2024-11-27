/// <reference path="../types.d.ts" />

/**
 * Event object
 * @typedef {Object} Event
 * @property {number} id
 * @property {string} name
 * @property {string} type
 * @property {string} description
 * @property {string} place
 * @property {string} address
 * @property {number} duration
 * @property {number?} age_limit
 * @property {string?} website
 * @property {boolean?} is_approved
 * @property {Date} created_at
 */ 

/**
 * EventTicket object
 * @typedef {Object} EventTicket
 * @property {number} id
 * @property {number} event_id
 * @property {number} event_time
 * @property {number} sale_time
 * @property {number} count
 * @property {number} unit_price
 * @property {number} created_at
 * @property {string} name
 * @property {string} place
 * @property {string} address
 * @property {number} duration
 * @property {number?} age_limit
 */

/**
 * Get all events in database
 * @param {Database} db
 * @returns {Promise<Event[]>}
 */
function loadEvents(db) {
    return new Promise((resolve, reject) => {
        db.sqlite.all(
            `SELECT * FROM "events";`,
            (err, rows) => err ? reject(err) : resolve(rows)
        );
    });
}

/**
 * Get the soonest upcoming events (max 15)
 * @param {Database} db
 * @returns {Promise<EventTicket[]>}
 */
function loadUpcomingEvents(db) {
    return new Promise((resolve, reject) => {
        db.sqlite.all(
            `SELECT T.*, E.name, E.place, E.address, E.duration, E.age_limit
            FROM tickets T
            JOIN events E ON E.id = T.event_id
            ORDER BY event_time LIMIT 15;`,
            (err, rows) => err ? reject(err) : resolve(rows)
        );
    });
}

/**
 * Get the organizer's events
 * @param {Database} db
 * @param {number} organizerId
 * @returns {Promise<Event[]>}
 */
function loadOrganizerEvents(db, organizerId) {
    return new Promise((resolve, reject) => {
        db.sqlite.all(
            `SELECT * FROM events E WHERE organizer_id = ?;`, [organizerId],
            (err, rows) => err ? reject(err) : resolve(rows)
        );
    });
}

module.exports = { loadEvents, loadUpcomingEvents, loadOrganizerEvents };


