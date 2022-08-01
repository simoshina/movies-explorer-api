const router = require('express').Router();
const { validateMovieInfo, validateMovieId } = require('../constants/validation');
const { getMovies, createMovie, deleteMovie } = require('../controllers/movies');

router.get('/', getMovies);
router.post('/', validateMovieInfo, createMovie);
router.delete('/:_id', validateMovieId, deleteMovie);

module.exports = router;
