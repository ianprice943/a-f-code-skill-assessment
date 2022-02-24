import Handlebars from 'handlebars';

async function getData() {
    try {
        const response = await fetch("https://615485ee2473940017efaed3.mockapi.io/assessment");
        const data = await response.json();
        return data;
    } catch(e) {
        console.log(e.message);
        return { failed: e.message };
    }
}

function generateHandlebarTemplate() {
    const template = `
        <li>
            <article>
                <h3>{{this.username}}</h3>
                <img src="{{this.avatar}}">
                <p>{{this.createdDate}}</p>
                <p>{{this.id}}</p>
            </article>
        </li>
    `
    return template;
}

async function handlebarDriver() {
    const data = await getData();
    const listEl = document.getElementById("users");    

    if(data.failed) {
        listEl.innerHTML = data.failed;
    } else {
        const list = `
            {{#each this}}
                ${generateHandlebarTemplate}
            {{/each}}
        `
        const template = Handlebars.compile(list);
        const filledTemplate = template(data);
        listEl.innerHTML = filledTemplate;
    }
}

handlebarDriver();

export { getData, generateHandlebarTemplate };