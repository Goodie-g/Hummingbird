export function openMovieDetails(e) {
  const card = e.target.closest('.js-movie-card');
  if (card) {
    const movie = {
      id: card.getAttribute('data-movie-id'),
      category: card.getAttribute('data-movie-category')
    };

    localStorage.setItem('selectedMovieId', movie.id);
    localStorage.setItem('selectedMovieCategory', movie.category);
    window.location.href = `movie-details-page.html`;
  }
}
