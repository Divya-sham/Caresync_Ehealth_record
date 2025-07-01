const express = require('express');
const {bookAppointment} = require('../controllers/appointmentController');
const auth = require('../middleware/authMiddleware');
const router = express.Router();

router.post('/',auth,bookAppointment);

module.exports = router;
