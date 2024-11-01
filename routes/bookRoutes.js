const express = require('express');
const { uploadBook, getAllBooks, getBookById, updateBook, deleteBook } = require('../controllers/bookController');
const { verifyToken } = require('../middlewares/authMiddleware');
const router = express.Router();

router.post('/upload-book', verifyToken, uploadBook);
router.get('/all-books', getAllBooks);
router.get('/book/:id', getBookById);
router.patch('/book/:id', verifyToken, updateBook);
router.delete('/book/:id', verifyToken, deleteBook);

module.exports = router;
