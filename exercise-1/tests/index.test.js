import { enableFetchMocks } from 'jest-fetch-mock';
enableFetchMocks();
import { getData, generateHandlebarTemplate } from '../scripts/index';
import Handlebars from 'handlebars';

describe("The data is fetched", () => {

    it("should fetch the data from https://615485ee2473940017efaed3.mockapi.io/assessment", () => {
        const data = getData();
        expect(data).not.toBe(undefined);
    });

});

describe("The data is rendered", () => {

    it("should generate a handlebar template based on the object given", () => {
        const userObj = {
            username: "Karl Gibson",
            avatar: "https://cdn.fakercloud.com/avatars/beshur_128.jpg",
            createdDate: "2013-10-27T13:52:22.484Z",
            id: "3"
        }

        const template = Handlebars.compile(generateHandlebarTemplate());
        const filledTemplate = template(userObj);
        expect(filledTemplate).toContain(userObj.username);
        expect(filledTemplate).toContain(userObj.avatar);
        expect(filledTemplate).toContain(userObj.createdDate);
        expect(filledTemplate).toContain(userObj.id);
    });

    it("should loop through an array of objects and generate a template", () => {
        const userArr = [
            {
                username: "Kate Feest",
                avatar: "https://cdn.fakercloud.com/avatars/antonyzotov_128.jpg",
                createdDate: "2079-10-01T18:03:47.484Z",
                id: "2"
            },
            {
                username: "Karl Gibson",
                avatar: "https://cdn.fakercloud.com/avatars/beshur_128.jpg",
                createdDate: "2013-10-27T13:52:22.484Z",
                id: "3"
            }
        ]

        const list = `
            {{#each this}}
                ${generateHandlebarTemplate}
            {{/each}}
        `;
        const template = Handlebars.compile(list);
        const filledTemplate = template(userArr);

        expect(filledTemplate).toContain(userArr[0].username);
        expect(filledTemplate).toContain(userArr[1].username);
    });

});