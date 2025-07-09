const apiURL = "https://api.coingecko.com/api/v3/coins/markets";
const moedas = ["bitcoin", "ethereum", "cardano", "solana", "ripple"];

async function obterDados() {
  try {
    const resposta = await fetch(`${apiURL}?vs_currency=brl&ids=${moedas.join(',')}`);
    const dados = await resposta.json();

    const container = document.getElementById("cards-container");
    container.innerHTML = "";

    dados.forEach((moeda) => {
      const card = document.createElement("div");
      card.classList.add("card");

      card.innerHTML = `
        <h2>${moeda.name} (${moeda.symbol.toUpperCase()})</h2>
        <p>💰 R$ ${moeda.current_price.toLocaleString("pt-BR")}</p>
        <p>📈 Variação 24h: ${moeda.price_change_percentage_24h.toFixed(2)}%</p>
      `;

      container.appendChild(card);
    });
  } catch (erro) {
    console.error("Erro ao buscar dados:", erro);
  }
}

// Atualiza os dados a cada 60 segundos
obterDados();
setInterval(obterDados, 60000);
