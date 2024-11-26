var express = require('express');
var asyncHn = require('express-async-handler');
var { loadUpcomingEvents } = require("../models/event");
var router = express.Router();

// Auth check
router.use((req, res, next) => {
    const user = req.session.user;

    if (!user) {
        next(403);
        return;
    }

    if (user.name && user.surname) {
        res.locals.name = `${user.name} ${user.surname}`;
    }
    else {
        res.locals.name = user.username;
    }
    
    next();
});

/* GET event list page. */
router.get('/', asyncHn(async function(req, res, next) {
    const events = await loadUpcomingEvents(req.app.db);
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

    res.render('events', { events });
}));

module.exports = router;