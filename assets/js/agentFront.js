const input = document.getElementById("userAgent");
const button = document.getElementById("response");
const respostaDiv = document.getElementById("pResponse");

button.addEventListener("click", async () => {
    const pergunta = input.value.trim();
    if (!pergunta) return;

    respostaDiv.innerHTML = "<p><em>Carregando resposta...</em></p>";

    try {
        const res = await fetch("http://localhost:3000/ask", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({ prompt: pergunta })
        });

        if (!res.ok) {
            respostaDiv.innerHTML = `<p><em>Erro:</em> ${res.status} - ${res.statusText}</p>`;
            throw new Error("Erro ao obter resposta do servidor.");
        }

        const data = await res.json();
        respostaDiv.innerHTML = `<p>${data.resposta}</p>`;
    } catch (error) {
        respostaDiv.innerHTML = `<p><strong>Erro:</strong> Falha ao conectar com a API.</p>`;
        console.error("Erro de conexão:", error);
    }
});
