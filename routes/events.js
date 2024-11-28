var express = require('express');
var asyncHn = require('express-async-handler');
var { loadEvent, loadUpcomingEvents, loadOrganizerEvents  } = require("../models/event");
var router = express.Router();
router.use(require('../auth'));

/* GET event list page. */
router.get('/', asyncHn(async function(req, res, next) {
    let events;
    
    if (req.query.organizer_events && req.session.user.is_organizer) {
        events = await loadOrganizerEvents(req.app.db, req.session.user.id);
        events.forEach(event => {
            event.event_id = event.id;
        });
        res.locals.organizer_view = "checked";
    }
    else {
        events = await loadUpcomingEvents(req.app.db);
        events.forEach(event => {
            const eventTime = new Date(event.event_time * 1000);
            event.event_time = eventTime.toLocaleString("lv-LV", {
                day: "2-digit",
                month: "2-digit",
                year: "numeric",
                hour: "2-digit",
                minute: "2-digit",
                weekday: "long"
            });
            event.price = event.price.toFixed(2);
        });
    }

    if (req.query.search) {
        events = events.filter(event => event.name.includes(req.query.search));
    }
    
    res.locals.is_organizer = req.session.user.is_organizer;
    res.render('events', { events });
}));

router.get('/:eventId', asyncHn(async function(req, res, next) {
    const event = await loadEvent(req.app.db, req.params.eventId);
    const is_organizer = req.session.user.id === event.organizer_id;
    const ticket = await req.app.db.findRow("tickets", "event_id", event.id);
    const ticket_price = ticket.price;
    const ticket_count = ticket.count;
    const event_time = (new Date(ticket.event_time * 1000)).toLocaleString("lv-LV", {
        day: "2-digit",
        month: "2-digit",
        year: "numeric",
        hour: "2-digit",
        minute: "2-digit",
        weekday: "long"
    });

    res.render('event_view', {
        is_organizer,
        ...event,
        event_id: event.id,
        event_time,
        ticket_price,
        ticket_count
    });
}));

router.get('/:eventId/edit', asyncHn(async function(req, res, next) {
    res.render('event_edit');
}));

router.get('/:eventId/edit/tickets', asyncHn(async function(req, res, next) {
    res.render('event_tickets');
}));

router.get('/:eventId/purchase', asyncHn(async function(req, res, next) {
    res.render('event_purchase');
}));

module.exports = router;