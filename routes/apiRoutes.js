// Routes untuk REST API
const express = require('express');
const router = express.Router();
const api = require('../controllers/apiController');

router.get('/', api.getAll);        // GET    /api/films
router.get('/:id', api.getById);    // GET    /api/films/1
router.post('/', api.create);       // POST   /api/films
router.put('/:id', api.update);     // PUT    /api/films/1
router.delete('/:id', api.remove);  // DELETE /api/films/1

module.exports = router;