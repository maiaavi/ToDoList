function updateDateTime() {
    const dateTimeElement = document.getElementById("datetime");
    if (dateTimeElement) {
        const options = {
            year: 'numeric',
            month: 'long',
            day: 'numeric',
            hour: '2-digit',
            minute: '2-digit',
            second: '2-digit',
            hour12: false
        };
        const dt = new Date().toLocaleString('pt-BR', options);
        dateTimeElement.innerHTML = dt;
    } else {
        console.warn('Elemento com id="datetime" não encontrado.');
    }
}

setInterval(updateDateTime, 1000);


window.onload = updateDateTime;