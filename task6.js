function fetchJokes(searchTerm) {
    fetch(`https://api.chucknorris.io/jokes/search?query=${searchTerm}`)
        .then(response => response.json())
        .then(data => {
            const jokeContainer = document.getElementById('jokeContainer');
            jokeContainer.innerHTML = '';
            data.result.forEach(joke => {
                const article = document.createElement('article');
                article.innerHTML = `<p>${joke.value}</p>`;
                jokeContainer.appendChild(article);
            });
        })
        .catch(error => console.error('Error fetching jokes:', error));
}

document.getElementById('jokeForm').addEventListener('submit', function(event) {
    event.preventDefault();
    const searchTerm = document.getElementById('searchTerm').value;
    fetchJokes(searchTerm);
});

fetchJokes();