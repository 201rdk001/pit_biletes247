var express = require('express');
var asyncHn = require('express-async-handler');
var { loadUpcomingEvents, loadOrganizerEvents  } = require("../models/event");
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

module.exports = router;