import Handlebars from 'handlebars';

async function getData() {
    const myHeaders = new Headers();
    myHeaders.append('Content-Type', 'application/json');

    const init = {
        method: 'GET',
        headers: myHeaders,
        mode: 'cors',
        cache: 'default'
    }

    try {
        const response = await fetch("https://615485ee2473940017efaed3.mockapi.io/assessment", init);
        const data = await response.json();
        return data;
    } catch(e) {
        console.log(e.message);
        return { failed: e.message };
    }
}

function generateHandlebarTemplate() {
    const template = "<li><article><h3>{{this.name}}</h3><img src='{{this.avatar}}'><button id='toggle{{this.id}}'>Toggle ID and Date</button><div id='wrapper{{this.id}}' class='hide'><p>{{this.createdAt}}</p><p>{{this.id}}</p></div></article></li>"
    return template;
}

async function handlebarDriver() {
    const data = await getData();
    const listEl = document.getElementById("users");    

    if(data.failed) {
        listEl.innerHTML = data.failed;
    } else {
        const list = "{{#each this}}" + generateHandlebarTemplate() + "{{/each}}";
        const template = Handlebars.compile(list);
        const filledTemplate = template(data);
        listEl.innerHTML = filledTemplate;
        const buttons = document.querySelectorAll(`[id^="toggle"]`);
        buttons.forEach((button) => {
            button.addEventListener('click', (e) => {
                toggleHide(e);
            });
        });
    }
}

function toggleHide(event) {
    let id = event.target.id;
    id = id.substring(id.length - 1);
    const wrapper = document.getElementById('wrapper' + id);
    wrapper.classList.toggle('hide');
}

handlebarDriver();

export { getData, generateHandlebarTemplate, toggleHide };