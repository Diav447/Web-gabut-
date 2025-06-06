// script.js async function searchAnime() { const query = document.getElementById("searchInput").value.trim(); const resultsContainer = document.getElementById("results"); resultsContainer.innerHTML = "<p>🔎 Mencari anime... tunggu bentar ya...</p>";

if (!query) return (resultsContainer.innerHTML = "<p>⚠️ Masukkan nama anime dulu bro.</p>");

try { const response = await fetch(https://api.jikan.moe/v4/anime?q=${encodeURIComponent(query)}&limit=12); const data = await response.json();

if (!data.data || data.data.length === 0) {
  resultsContainer.innerHTML = `<p>❌ Anime dengan nama '<strong>${query}</strong>' gak ketemu bro.</p>`;
  return;
}

resultsContainer.innerHTML = "";
data.data.forEach((anime) => {
  const card = document.createElement("div");
  card.classList.add("anime-card");

  card.innerHTML = `
    <img src="${anime.images.jpg.image_url}" alt="${anime.title}">
    <div class="anime-info">
      <h3>${anime.title}</h3>
      <p>⭐ ${anime.score || "N/A"}</p>
      <p>${anime.synopsis?.substring(0, 120) || "Sinopsis tidak tersedia."}...</p>
      <a href="${anime.url}" target="_blank">🔗 Lihat di MAL</a>
    </div>
  `;

  resultsContainer.appendChild(card);
});

} catch (error) { console.error(error); resultsContainer.innerHTML = <p>🚫 Terjadi error saat cari data. Coba lagi nanti ya!</p>; } }

document.getElementById("searchInput").addEventListener("keydown", function (e) { if (e.key === "Enter") searchAnime(); });


