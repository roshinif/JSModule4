// Add an event listener to the form
document.addEventListener('DOMContentLoaded', () => {
    const form = document.querySelector('form');

    form.addEventListener('submit', async (event) => {
        event.preventDefault();

        const query = document.getElementById('query').value;
        const url = `https://api.tvmaze.com/search/shows?q=${encodeURIComponent(query)}`;

        try {
            const response = await fetch(url);
            const data = await response.json();
            console.log(data);
            displayResults(data);
        } catch (error) {
            console.error('Error fetching data:', error);
        }
    });
});

function displayResults(data) {
    const resultsContainer = document.getElementById('results');
    resultsContainer.innerHTML = '';

    data.forEach(tvShow => {
        const article = document.createElement('article');

        const title = document.createElement('h2');
        title.textContent = tvShow.show.name;
        article.appendChild(title);

        const link = document.createElement('a');
        link.href = tvShow.show.url;
        link.target = "_blank";
        link.textContent = "Details";
        article.appendChild(link);

        const img = document.createElement('img');
        img.src = tvShow.show.image ? tvShow.show.image.medium : 'https://via.placeholder.com/210x295?text=Not%20Found';
        img.alt = tvShow.show.name;
        article.appendChild(img);

        const summary = document.createElement('div');
        summary.innerHTML = tvShow.show.summary;
        article.appendChild(summary);

        resultsContainer.appendChild(article);
    });
}