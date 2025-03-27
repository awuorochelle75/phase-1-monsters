// js/index.js
document.addEventListener('DOMContentLoaded', () => {
    const monstersList = document.getElementById('monstersList');
    const loadMoreButton = document.getElementById('loadMore');
    const monsterForm = document.getElementById('monsterForm');

    let page = 1;
    const limit = 50;

    function fetchMonsters(pageNumber) {
        fetch(`http://localhost:3000/monsters/?_limit=${limit}&_page=${pageNumber}`)
            .then(response => response.json())
            .then(monsters => {
                monsters.forEach(monster => {
                    const monsterDiv = document.createElement('div');
                    monsterDiv.innerHTML = `
                        <h2>${monster.name}</h2>
                        <p>Age: ${monster.age}</p>
                        <p>Description: ${monster.description}</p>
                        <hr>
                    `;
                    monstersList.appendChild(monsterDiv);
                });
            });
    }

    fetchMonsters(page);

    loadMoreButton.addEventListener('click', () => {
        page++;
        fetchMonsters(page);
    });

    monsterForm.addEventListener('submit', (event) => {
        event.preventDefault();

        const name = document.getElementById('name').value;
        const age = parseFloat(document.getElementById('age').value);
        const description = document.getElementById('description').value;

        fetch('http://localhost:3000/monsters', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            },
            body: JSON.stringify({ name, age, description })
        })
        .then(response => response.json())
        .then(newMonster => {
            const monsterDiv = document.createElement('div');
            monsterDiv.innerHTML = `
                <h2>${newMonster.name}</h2>
                <p>Age: ${newMonster.age}</p>
                <p>Description: ${newMonster.description}</p>
                <hr>
            `;
            monstersList.insertBefore(monsterDiv, monstersList.firstChild);

            //clear form fields
            document.getElementById('name').value = '';
            document.getElementById('age').value = '';
            document.getElementById('description').value = '';

        })
        .catch(error => console.error('Error:', error));
    });
});