document.addEventListener('DOMContentLoaded', () => {
  const searchForm = document.getElementById('searchForm');

  searchForm.addEventListener('submit', async function (event) {
    event.preventDefault(); // Prevent form from refreshing the page

    const query = document.getElementById('query').value.trim();
    if (!query) {
      console.error("Query cannot be empty");
      return;
    }

    try {
      const response = await fetch(`https://api.tvmaze.com/search/shows?q=${encodeURIComponent(query)}`);
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }

      const results = await response.json();

      // Log each show's name to the console
      console.log("Search results:");
      results.forEach(result => {
        const show = result.show;
        console.log(`- ${show.name}`);
      });

    } catch (error) {
      console.error("An error occurred while fetching data:", error);
    }
  });
});
