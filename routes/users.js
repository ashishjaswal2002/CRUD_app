 const express = require('express');
 const router = express.Router();
 const multer   = require('multer');
const {handleGetAllUsers,addUsers,updatingUsers,deleteUser} = require('../controllers/user');

const upload = multer({dest:'uploads'});

 router.get('/', handleGetAllUsers);


router.post('/', upload.single('Image'),addUsers);


router.put('/:id', upload.single('Image'), updatingUsers);



router.delete('/:id',deleteUser);


module.exports = router;