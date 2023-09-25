async function buscarInformacoesPais(paisDesejado) {
  try {
    const response = await fetch(
      `https://restcountries.com/v3.1/name/${paisDesejado}`
    );
    const data = await response.json();
    return data[0];
  } catch (error) {
    throw error;
  }
}

function exibirInformacoesPais() {
  const countryInput = document.getElementById("country-input");
  const paisDesejado = countryInput.value.trim();

  if (paisDesejado !== "") {
    buscarInformacoesPais(paisDesejado)
      .then((countryData) => {
        const countryInfoContainer = document.getElementById(
          "country-info-container"
        );
        countryInfoContainer.innerHTML = "";

        const countryInfo = document.createElement("div");
        countryInfo.classList.add("country-info");

        // Exibir a bandeira do país
        const flagImage = document.createElement("img");
        flagImage.src = countryData.flags.png;
        flagImage.alt = `Bandeira do país ${countryData.name.common}`;
        countryInfo.appendChild(flagImage);

        // Exibir o nome do país
        const countryName = document.createElement("h2");
        countryName.textContent = countryData.name.common;
        countryInfo.appendChild(countryName);

        // Exibir informações essenciais
        const essentialInfo = document.createElement("div");
        essentialInfo.innerHTML = `<p><strong>Capital:</strong> ${
          countryData.capital
        }</p>
                        <p><strong>População:</strong> ${countryData.population.toLocaleString()}</p>
                        <p><strong>Área:</strong> ${countryData.area.toLocaleString()} km²</p>
                        <p><strong>Região:</strong> ${countryData.region}</p>
                        <p><strong>Sub-região:</strong> ${
                          countryData.subregion
                        }</p>
                        <p><strong>Idioma:</strong> ${Object.keys(
                          countryData.languages
                        ).join(", ")}</p>
                        <p><strong>Moeda:</strong> ${Object.keys(
                          countryData.currencies
                        ).join(", ")}</p>`;
        countryInfo.appendChild(essentialInfo);

        countryInfoContainer.appendChild(countryInfo);
      })
      .catch((error) => {
        console.error(error);
        alert(
          "Não foi possível encontrar informações para o país especificado."
        );
      });
  }

  // Limpar as informações de busca
  countryInput.value = "";
  const countryInfoContainer = document.getElementById(
    "country-info-container"
  );
  countryInfoContainer.innerHTML = "";
}

// Atualize o evento de envio do formulário para chamar a função exibirInformacoesPais()

document
  .getElementById("country-form")
  .addEventListener("submit", function (e) {
    e.preventDefault(); // Evitar o comportamento padrão de envio do formulário
    exibirInformacoesPais();
  });

// Atualize o trecho responsável por preencher a lista de países:

fetch("https://restcountries.com/v3.1/all")
  .then((response) => response.json())
  .then((countries) => {
    const countryList = document.getElementById("country-list");

    // Adicionar a opção "Escolha um país" no início da lista
    const defaultOption = document.createElement("option");
    defaultOption.value = "";
    defaultOption.textContent = "Escolha um país";
    countryList.appendChild(defaultOption);

    // Ordenar os países em ordem alfabética pelo nome com a função sort()
    countries.sort((a, b) => a.name.common.localeCompare(b.name.common));

    countries.forEach((country) => {
      const option = document.createElement("option");
      option.value = country.name.common;
      option.textContent = country.name.common;
      countryList.appendChild(option);
    });
  })
  .catch((error) => {
    console.error(error);
    alert("Não foi possível carregar a lista de países.");
  });

// Defina o evento de envio do formulário para chamar a função exibirInformacoesPais()
document
  .getElementById("country-form")
  .addEventListener("submit", function (e) {
    e.preventDefault(); // Evitar o comportamento padrão de envio do formulário
    exibirInformacoesPais();
  });
