const searchItem = document.querySelector('.js-search-item');

document.querySelector('.js-search')
    .addEventListener('click', goToSearchPage);

searchItem.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') {
        goToSearchPage();
    }
});

function goToSearchPage() {
    const query = searchItem.value.trim();
    if (query) {
    window.location.href = `search-page.html?query=${encodeURIComponent(query)}`;
    }
}