const express = require('express');
const router = express.Router();
const {getAll, getOne, createOne, patchOne, deleteOne} = require('./index.controller');

router.get('/', getAll);

router.get('/:id', getOne);

router.post('/', createOne);

router.patch('/:id', patchOne);

router.delete('/:id', deleteOne);

module.exports = router;