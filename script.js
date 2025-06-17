document.addEventListener('DOMContentLoaded', () => {
    const fighterList = document.getElementById('fighter-list');
    const fighterStats = document.getElementById('fighter-stats');

    fetch('data/fighters.json')
        .then(response => response.json())
        .then(data => {
            // Lista fighter in index.html
            if (fighterList) {
                data.forEach(fighter => {
                    const li = document.createElement('li');
                    li.innerHTML = `<a href="fighter.html?id=${fighter.id}">${fighter.name}</a>`;
                    fighterList.appendChild(li);
                });
            }

            // Dettagli fighter in fighter.html
            if (fighterStats) {
                const urlParams = new URLSearchParams(window.location.search);
                const fighterId = urlParams.get('id');
                if (fighterId) {
                    const fighter = data.find(f => f.id === fighterId);
                    if (fighter) {
                        fighterStats.innerHTML = `
                            <h2>${fighter.name}</h2>
                            <p><strong>Record:</strong> ${fighter.record}</p>
                            <p><strong>Weight Class:</strong> ${fighter.weightClass}</p>
                            <p><strong>Height:</strong> ${fighter.height}</p>
                            <p><strong>Reach:</strong> ${fighter.reach}</p>
                            <p><strong>Wins:</strong> ${fighter.wins}</p>
                            <p><strong>Losses:</strong> ${fighter.losses}</p>
                            <p><strong>Draws:</strong> ${fighter.draws}</p>
                        `;
                    } else {
                        fighterStats.innerHTML = '<p>Fighter non trovato.</p>';
                    }
                }
            }
        })
        .catch(err => {
            if (fighterList) fighterList.innerHTML = '<li>Errore nel caricamento dei dati.</li>';
            if (fighterStats) fighterStats.innerHTML = '<p>Errore nel caricamento dei dati.</p>';
            console.error('Fetch error:', err);
        });
});
