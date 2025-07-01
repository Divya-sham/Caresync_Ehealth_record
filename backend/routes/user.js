const express = require('express');
const {getUser,updateUser,deleteUser,getPatients} = require('../controllers/userController');
const router = express.Router();
const auth = require('../middleware/authMiddleware');
const {isProvider} = require('../middleware/roleMiddleware');

router.get('/profile',auth,getUser)
router.get('/',auth,isProvider,getPatients);
router.put('/profile',auth,updateUser);
router.delete('/:id',auth,deleteUser);

module.exports = router;