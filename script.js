const local = document.getElementById("inputLocation"),
    btnConsult = document.getElementById("btnConsult"),
    nextBtn = document.getElementById("nextBtn"),
    backBtn = document.getElementById("backBtn")

let currentCard = 1, // Contador para mudar o card.
    limit = 2,
    cont = 0 // contador para trocar a chave.

const key = ['9d5114ad', '75d49f48'] // keys

// Função que muda o card na tela assim que o botao de Next ou Back é pressionado.
const nextCard = typeBtn => {
    document.getElementById(`card${currentCard}`).classList.remove("selected")
    typeBtn == "backBtn" ? currentCard++ : currentCard--

    if (currentCard > 3) currentCard = 1
    if (currentCard < 1) currentCard = 3

    document.getElementById(`card${currentCard}`).classList.add("selected")
}

// Evento de click para cada botão, chamando a função de mudar o card.
nextBtn.addEventListener("click", () => nextCard(nextBtn.id))
backBtn.addEventListener("click", () => nextCard(backBtn.id))

// Função para consumir API.
const getData = async url => {
    await fetch(url)
        .then(async resp => {
            const { results } = await resp.json()

            let srcImage0 = ''
            if (results.forecast[0].condition == "rain") srcImage0 = "images/chuvoso.png"
            else if (results.forecast[0].condition == "cloud") srcImage0 = "images/nublado.png"
            else srcImage0 = "images/ensolarado.png"

            document.getElementById("city1").textContent = results.city
            document.getElementById("dataTime1").textContent = "Today " + results.time
            document.getElementById("MinMax1").textContent = "Min: " + results.forecast[0].min + "° Max: " + results.forecast[0].max
            document.getElementById("temp1").textContent = results.temp + "°"
            document.getElementById("desc1").textContent = results.description
            document.getElementById("image1").setAttribute("src", `${srcImage0}`)

            let srcImage1 = ''
            if (results.forecast[1].condition == "rain") srcImage1 = "images/chuvoso.png"
            else if (results.forecast[1].condition == "cloud") srcImage1 = "images/nublado.png"
            else srcImage1 = "images/ensolarado.png"

            document.getElementById("city2").textContent = results.city
            document.getElementById("dataTime2").textContent = results.forecast[1].weekday + " " + results.forecast[1].date
            document.getElementById("MinMax2").textContent = "Min: " + results.forecast[1].min + "° Max: " + results.forecast[1].max
            document.getElementById("desc2").textContent = results.forecast[1].description
            document.getElementById("image2").setAttribute("src", `${srcImage1}`)

            let srcImage2 = ''
            if (results.forecast[2].condition == "rain") srcImage2 = "images/chuvoso.png"
            else if (results.forecast[2].condition == "cloud") srcImage2 = "images/nublado.png"
            else srcImage2 = "images/ensolarado.png"

            document.getElementById("city3").textContent = results.city
            document.getElementById("dataTime3").textContent = results.forecast[2].weekday + " " + results.forecast[2].date
            document.getElementById("MinMax3").textContent = "Min: " + results.forecast[2].min + "° Max: " + results.forecast[2].max
            document.getElementById("desc3").textContent = results.forecast[2].description
            document.getElementById("image3").setAttribute("src", `${srcImage2}`)
        })
        .catch(() => {
            cont++
            if (cont > 1) { cont = 0; alert("Servidor fora de operação!") }
        })
        .finally(() => {
            console.log("Consulta concluida.")
        })
}

// Evento do botão para consultar clima da cidade.
btnConsult.addEventListener("click", () => {

    if (local.value == "") {
        alert("informe a cidade e estado (Ex: São Paulo)")
    }
    else if (limit == 0) {
        alert("Você excedeu o limite de consultas.")
    }
    else {
        limit--
        getData(`https://api.hgbrasil.com/weather?key=${key[cont]}&city_name=${local.value}&format=json-cors`)
    }

})

// Ao carregar a pagina, uma cidade é consultada por padrão para definir os valores dos cards. 
getData(`https://api.hgbrasil.com/weather?key=${key[cont]}&city_name=Sao Paulo&format=json-cors`)