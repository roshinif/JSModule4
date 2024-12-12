document.addEventListener('DOMContentLoaded', () => {
  const searchForm = document.getElementById('searchForm');
  const resultsDiv = document.getElementById('results');

  searchForm.addEventListener('submit', async function (event) {
    event.preventDefault(); // Prevent form submission from reloading the page

    const query = document.getElementById('query').value.trim();
    if (!query) {
      console.error("Query cannot be empty");
      return;
    }

    resultsDiv.innerHTML = ''; // Clear old results before fetching new ones

    try {
      const response = await fetch(`https://api.tvmaze.com/search/shows?q=${encodeURIComponent(query)}`);
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }

      const results = await response.json();

      if (results.length === 0) {
        resultsDiv.innerHTML = '<p>No results found.</p>';
        return;
      }

      results.forEach(result => {
        const tvShow = result.show;

        // Create an <article> element
        const article = document.createElement('article');

        // Add the show's name
        const title = document.createElement('h2');
        title.textContent = tvShow.name;
        article.appendChild(title);

        // Add the link to details
        const link = document.createElement('a');
        link.href = tvShow.url;
        link.target = '_blank';
        link.textContent = 'View Details';
        article.appendChild(link);

        // Add the medium image
        if (tvShow.image?.medium) {
          const image = document.createElement('img');
          image.src = tvShow.image.medium;
          image.alt = tvShow.name;
          article.appendChild(image);
        }

        // Add the summary
        if (tvShow.summary) {
          const summary = document.createElement('div');
          summary.innerHTML = tvShow.summary; // TVMaze provides safe HTML in the summary
          article.appendChild(summary);
        }

        // Append the article to the results div
        resultsDiv.appendChild(article);
      });
    } catch (error) {
      console.error("An error occurred while fetching data:", error);
      resultsDiv.innerHTML = '<p>An error occurred while fetching the data. Please try again later.</p>';
    }
  });
});
