const apiUrl = "https://v2.jokeapi.dev/joke/Any";
const jokeElement = document.getElementById("joke");
const loadingElement = document.getElementById("loading");

function toggleLoading(isLoading) {
    if (isLoading) {
        loadingElement.style.display = "block";
        jokeElement.style.display = "none";
    } else {
        loadingElement.style.display = "none";
        jokeElement.style.display = "block";
    }
}

async function getJoke() {
    toggleLoading(true);
    
    try {
        const response = await fetch(apiUrl, {
            method: 'GET',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            }
        });

        if (!response.ok) {
            throw new Error(`Error al obtener chistes: ${response.statusText}`);
        }

        const data = await response.json();
        
        jokeElement.innerHTML = data.type === "single"
            ? data.joke
            : `<strong>Pregunta:</strong> ${data.setup} <br><br> <strong>Respuesta:</strong> ${data.delivery}`;
            
        toggleLoading(false);
        
        const jokeContainer = document.querySelector('.joke-container');
        jokeContainer.style.minHeight = `${Math.max(120, jokeElement.offsetHeight + 30)}px`;

    } catch (error) {
        console.error("Error al obtener el chiste:", error);
        jokeElement.innerHTML = "¡Ups! No pudimos cargar un chiste. Por favor, intenta de nuevo.";
        toggleLoading(false);
    }
}

document.addEventListener('DOMContentLoaded', function() {
    getJoke();
    
    const newJokeButton = document.getElementById("new-joke-button");
    newJokeButton.addEventListener("click", getJoke);
});