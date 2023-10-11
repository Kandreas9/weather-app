const SUNCOLOR = "#777142";

const title = document.getElementById("temp");
const wrapper = document.querySelector(".wrapper");
const content = document.querySelector(".content");
const sun = document.querySelector(".sun");
const moon = document.querySelector(".moon");

let data;

window.addEventListener("load", async () => {
    let currentDate = new Date();

    if (currentDate.getHours > 12) {
        wrapper.classList.add("light");
    } else {
        wrapper.classList.add("dark");
    }

    //Fetch api
    const json = await fetch(
        "https://api.open-meteo.com/v1/forecast?latitude=43.6109&longitude=3.8763&current=temperature_2m&daily=temperature_2m_max&timezone=Europe%2FBerlin"
    );

    if (currentDate.getHours > 12) {
        sun.classList.add("rotate");
    } else {
        moon.classList.add("rotate");
    }

    if (!json.ok) {
        const message = `An error has occured: ${response.status}`;
        throw new Error(message);
    }

    data = await json.json();
    title.textContent = `${data.current.temperature_2m}°C`;

    for (let i = 0; i < 7; i++) {
        const li = document.createElement("li");
        const div = document.createElement("div");

        li.textContent = new Date(data.daily.time[i]).getDate();
        div.textContent = `${data.daily.temperature_2m_max[i]} °C`;

        li.appendChild(div);

        content.appendChild(li);
    }
});
