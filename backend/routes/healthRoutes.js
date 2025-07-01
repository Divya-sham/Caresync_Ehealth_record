const express = require('express');
const router = express.Router();
const auth = require('../middleware/authMiddleware');

const{
    getHealthRecord,updateHealthRecord,
    addEncounter,getEncounters,
    uploadDocument,getDocuments,deleteDocument
} = require('../controllers/healthController');

const multer = require('multer');
const upload = multer({dest:'uploads/'});

router.get('/health',auth,getHealthRecord);
router.post('/health',auth,updateHealthRecord);

router.get('/encounters',auth,getEncounters);
router.post('/encounters',auth,addEncounter);

router.get('/documents',auth,getDocuments);
router.post('/documents',auth,upload.single('file'),uploadDocument);
router.delete('/documents/:id',auth,deleteDocument);

module.exports=router;