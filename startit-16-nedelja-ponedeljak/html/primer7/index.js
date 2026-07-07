/**
 * Movie
 * @typedef {Object} Movie
 * @property {number} id ID
 * @property {string} titleTitle
 * @property {number} year Release Year
 * @property {number} runtime Runtime
 * @property {string[]} genres Genres
 * @property {string} director Director
 * @property {string} actors Comma seperated actors
 */


App = (function (axios) {
	/** @type {Movie[]} */
	var movies = [];

	var movieTpl = document.getElementById('movie-template').innerHTML;
	var detailsTpl = document.getElementById('movie-details').innerHTML;

	var $movie = document.getElementById('movie');
	var $details = document.getElementById('details');

	/**
	 * Return random movie from given collection.
	 *
	 * @param {Movie[]} movies Collection from wich to take random movie.
	 * @returns {Movie}
	 */
	function getRandomMovie(movies) {
		// Return random movie from collection using lodashe's random function.
		// @more https://lodash.com/docs/4.17.10#random
		return movies[_.random(0, movies.length - 1)];
	}

	/**
	 * Attach events.
	 *
	 * @return {undefined}
	 */
	function attachEvents() {

		/** @see https://developer.mozilla.org/en-US/docs/Web/Events/dragstart */
		document.addEventListener('dragstart', function (e) {

			// Check to see if we have a valid draggable item else prevent drag.
			if (
				e.target instanceof HTMLElement &&
				e.target.getAttribute('id') === 'movie'
			) {
				console.log('dragstart: ' + e.target.id);
				var movieId = e.target.children[0].getAttribute('data-movie-id');
				var movie = _.find(movies, { id: parseInt(movieId) });

				// Apply some style when element is dragged.
				e.target.classList.add('dragging');

				/**
				 * Our custom app MIME type. Can be anything really.
				 * @see https://www.w3.org/TR/2011/WD-html5-20110113/dnd.html#the-drag-data-store
				 * @see https://developer.mozilla.org/en-US/docs/Web/API/DataTransfer/setData
				 */
				e.dataTransfer.setData('text/x-movie', JSON.stringify(movie));

				return;
			}

			e.preventDefault();
		});


		/** @see https://developer.mozilla.org/en-US/docs/Web/Events/dragend */
		document.addEventListener('dragend', function (e) {
			// Remove style.
			e.target.classList.remove('dragging');
		});

		/** @see https://developer.mozilla.org/en-US/docs/Web/Events/dragover */
		document.addEventListener('dragover', function (e) {
			if (e.target.getAttribute('id') === 'details') {

				/**
				 * We need to prevent default event to indicate that this is
				 * valid drop target.
				 * @see https://developer.mozilla.org/en-US/docs/Web/API/HTML_Drag_and_Drop_API/Drag_operations#droptargets
				 */
				e.preventDefault();
			}
		});

		/** @see https://developer.mozilla.org/en-US/docs/Web/Events/dragenter */
		document.addEventListener('dragenter', function (e) {
			if (e.target.getAttribute('id') === 'details') {
				console.log('dragenter: ' + e.target.id);

				// Apply some style when elements has drop target.
				e.target.classList.add('has-drop-target');

				/**
				 * We need to prevent default event to indicate that this is
				 * valid drop target.
				 * @see https://developer.mozilla.org/en-US/docs/Web/API/HTML_Drag_and_Drop_API/Drag_operations#droptargets
				 */
				e.preventDefault();
			}
		});

		/** @see https://developer.mozilla.org/en-US/docs/Web/Events/dragleave */
		document.addEventListener('dragleave', function (e) {
			if (e.target.getAttribute('id') === 'details') {
				console.log('dragleave: ' + e.target.id);

				// Remove styling.
				e.target.classList.remove('has-drop-target');
			}
		});

		/** @see https://developer.mozilla.org/en-US/docs/Web/Events/drop */
		document.addEventListener('drop', function (e) {
			/**
			 * Retreive the stored data.
			 * @see https://developer.mozilla.org/en-US/docs/Web/API/DataTransfer/getData
			 */
			var data = JSON.parse(e.dataTransfer.getData('text/x-movie'));

			// Render the template.
			$details.innerHTML = Mustache.render(detailsTpl, data);

			// Remove styling.
			e.target.classList.remove('has-drop-target');
		});
	}

	return {
		/**
		 * Bootstrap the application.
		 *
		 * @return {undefined}
		 */
		start: function () {
			// Fetch db.json using axios.
			axios.get('db.json')
			.then(function (response) {
				// Store movies into the app global movies variable.
				movies = response.data.movies;

				// Get random movie.
				var movie = getRandomMovie(movies);

				// Render movie card.
				$movie.innerHTML = Mustache.render(movieTpl, {
					id: movie.id,
					posterUrl: movie.posterUrl
				});

				// Attach events.
				attachEvents();
			});
		}
	}
})(axios);