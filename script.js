// script.js

const results = document.getElementById('results');

function createCard(anime, index) { const delay = index * 0.1; return <div class="anime-card" style="animation-delay: ${delay}s"> <img src="${anime.images.jpg.image_url}" alt="${anime.title}"> <h3>${anime.title}</h3> <p>Score: ${anime.score ?? 'N/A'}</p> <a href="${anime.url}" target="_blank">Lihat Detail</a> </div>; }

function searchAnime() { const query = document.getElementById('searchInput').value; const genre = document.getElementById('genreSelect').value; const year = document.getElementById('yearInput').value;

if (!query) return;

let url = https://api.jikan.moe/v4/anime?q=${query}&limit=10; if (year) url += &start_date=${year}-01-01&end_date=${year}-12-31;

fetch(url) .then(res => res.json()) .then(data => { results.innerHTML = data.data.map(createCard).join(''); }) .catch(() => { results.innerHTML = '<p>Gagal mengambil data.</p>'; }); }

function getTrending() { fetch("https://api.jikan.moe/v4/top/anime?filter=bypopularity&limit=10") .then(res => res.json()) .then(data => { results.innerHTML = data.data.map(createCard).join(''); }) .catch(() => { results.innerHTML = '<p>Gagal mengambil data trending.</p>'; }); }

