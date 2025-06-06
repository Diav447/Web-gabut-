const results = document.getElementById('results');
const genreMap = {};

function createCard(anime, index) {
  const delay = index * 0.1;
  return `
    <div class="anime-card" style="animation-delay: ${delay}s">
      <img src="${anime.images.jpg.image_url}" alt="${anime.title}">
      <h3>${anime.title}</h3>
      <p>Score: ${anime.score ?? 'N/A'}</p>
      <a href="${anime.url}" target="_blank">Lihat Detail</a>
    </div>
  `;
}

function searchAnime() {
  const query = document.getElementById("searchInput").value.trim();
  const genreName = document.getElementById("genreSelect").value;
  const year = document.getElementById("yearInput").value;

  let url = "https://api.jikan.moe/v4/anime?limit=60";

  if (query) {
    url += `&q=${encodeURIComponent(query)}`;
  } else if (genreName && genreMap[genreName]) {
    url += `&genres=${genreMap[genreName]}`;
  }

  fetch(url)
    .then(res => res.json())
    .then(data => {
      let filtered = data.data;

      if (query && genreName && genreMap[genreName]) {
        filtered = filtered.filter(anime =>
          anime.genres.some(g => g.name.toLowerCase() === genreName.toLowerCase())
        );
      }

      if (year) {
  filtered = filtered.filter(anime => {
    const airedFrom = anime.aired?.from;
    if (!airedFrom) return false;
    const airedYear = airedFrom.substring(0, 4);
    return airedYear === year;
  });
}
      }

      results.innerHTML = filtered.length
        ? filtered.map(createCard).join('')
        : "<p>Anime tidak ditemukan sesuai filter.</p>";
    })
    .catch(err => {
      console.error(err);
      results.innerHTML = "<p>Gagal mengambil data.</p>";
    });
}

function getTrending() {
  fetch("https://api.jikan.moe/v4/top/anime?filter=bypopularity&limit=10")
    .then(res => res.json())
    .then(data => {
      results.innerHTML = data.data.map(createCard).join('');
    })
    .catch(() => {
      results.innerHTML = "<p>Gagal ambil trending.</p>";
    });
}

function loadGenres() {
  fetch("https://api.jikan.moe/v4/genres/anime")
    .then(res => res.json())
    .then(data => {
      const genreSelect = document.getElementById("genreSelect");
      data.data.forEach(g => {
        genreMap[g.name] = g.mal_id;
        const option = document.createElement("option");
        option.value = g.name;
        option.textContent = g.name;
        genreSelect.appendChild(option);
      });
    })
    .catch(() => {
      console.log("Gagal load genre.");
    });
}

window.addEventListener("DOMContentLoaded", () => {
  loadGenres();
});
