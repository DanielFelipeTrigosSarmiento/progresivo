const apiUrl = "https://v2.jokeapi.dev/joke/Any";
const jokeElement = document.getElementById("joke");
const loadingElement = document.getElementById("loading");

// Función para mostrar/ocultar el indicador de carga
function toggleLoading(isLoading) {
    if (isLoading) {
        loadingElement.style.display = "block";
        jokeElement.style.display = "none";
    } else {
        loadingElement.style.display = "none";
        jokeElement.style.display = "block";
    }
}

// Función para obtener y mostrar el chiste
async function getJoke() {
    // Mostrar indicador de carga
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
        
        // Mostrar el chiste dependiendo del tipo
        jokeElement.innerHTML = data.type === "single"
            ? data.joke
            : `<strong>Pregunta:</strong> ${data.setup} <br><br> <strong>Respuesta:</strong> ${data.delivery}`;
            
        // Ocultar indicador de carga y mostrar el chiste
        toggleLoading(false);
        
        // Ajustar altura del contenedor según el contenido
        const jokeContainer = document.querySelector('.joke-container');
        jokeContainer.style.minHeight = `${Math.max(120, jokeElement.offsetHeight + 30)}px`;

    } catch (error) {
        console.error("Error al obtener el chiste:", error);
        jokeElement.innerHTML = "¡Ups! No pudimos cargar un chiste. Por favor, intenta de nuevo.";
        toggleLoading(false);
    }
}

// Iniciar la aplicación cuando el DOM esté cargado
document.addEventListener('DOMContentLoaded', function() {
    // Cargar un chiste al iniciar
    getJoke();
    
    // Asignar el evento al botón
    const newJokeButton = document.getElementById("new-joke-button");
    newJokeButton.addEventListener("click", getJoke);
});