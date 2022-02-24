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
    const template = "<li><article><h3>{{this.name}}</h3><img src='{{this.avatar}}'><p>{{this.createdAt}}</p><p>{{this.id}}</p></article></li>"
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
        console.log(filledTemplate);
        listEl.innerHTML = filledTemplate;
    }
}

handlebarDriver();

export { getData, generateHandlebarTemplate };