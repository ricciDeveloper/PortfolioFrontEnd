const input = document.getElementById("userAgent");
const button = document.getElementById("response");
const chatBox = document.getElementById("pResponse");

button.addEventListener("click", async () => {
    const pergunta = input.value.trim();
    if (!pergunta) return;

    // Adiciona a mensagem do usuário ao chat
    const userMessage = document.createElement("div");
    userMessage.className = "user-message";
    userMessage.innerText = pergunta;
    chatBox.appendChild(userMessage);
    chatBox.scrollTop = chatBox.scrollHeight;

    input.value = "";

    try {
        const res = await fetch("http://localhost:3000/ask", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({ prompt: pergunta })
        });

        if (!res.ok) {
            throw new Error("Erro ao conectar com a API.");
        }

        const data = await res.json();

        const agentResponse = document.createElement("div");
        agentResponse.className = "agent-response";
        agentResponse.innerText = data.resposta;

        chatBox.appendChild(agentResponse);
        chatBox.scrollTop = chatBox.scrollHeight;

    } catch (error) {
        const errorResponse = document.createElement("div");
        errorResponse.className = "agent-response";
        errorResponse.innerText = "Erro ao conectar com o servidor.";

        chatBox.appendChild(errorResponse);
        chatBox.scrollTop = chatBox.scrollHeight;

        console.error("Erro: ", error);
    }
});
