async function buscarInformacoesPais(paisDesejado) {
    try {
        const response = await fetch(`https://restcountries.com/v3.1/name/${paisDesejado}`);
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
                const countryInfoContainer = document.getElementById("country-info-container");
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
                essentialInfo.innerHTML = `<p><strong>Capital:</strong> ${countryData.capital}</p>
                        <p><strong>População:</strong> ${countryData.population}</p>
                        <p><strong>Área:</strong> ${countryData.area} km²</p>
                        <p><strong>Região:</strong> ${countryData.region}</p>
                        <p><strong>Sub-região:</strong> ${countryData.subregion}</p>
                        <p><strong>Idioma:</strong> ${Object.keys(countryData.languages).join(", ")}</p>
                        <p><strong>Moeda:</strong> ${Object.keys(countryData.currencies).join(", ")}</p>
                        <p><strong>Domínio de topo:</strong> ${Object.keys(countryData.tld).join(", ")}</p>`;
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
}

// Defina o evento de envio do formulário para chamar a função exibirInformacoesPais()
document.getElementById("country-form").addEventListener("submit", function (e) {
    e.preventDefault(); // Evitar o comportamento padrão de envio do formulário
    exibirInformacoesPais();
});
