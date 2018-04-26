import {LitElement, html} from '@polymer/lit-element/lit-element.js';
// import '@polymer/iron-form-element-behavior/iron-form-element-behavior.js'

const BASE_URL = 'https://us-central1-fe-workshop-april-2018.cloudfunctions.net';

const login = async (name) => {

    const response = await fetch(`${BASE_URL}/login`, {
        method: 'POST',
        headers: {
            'content-type': 'application/json',
        },
        body: JSON.stringify({
            name,
        }),
    });

    if (!response.ok) {
        throw new Error(`${await response.text()}`)
    }

    const token = await response.text()
    // this.state.login = {
    //     username,
    //     token,
    // };

    return token
};

class Login extends LitElement {

    static get properties() {
        return {
            token: String,
        }
    }

    constructor() {
        super();
    }

async handleLogin(e) {
    e.preventDefault()
    const formData = [...e.target]
        .map((input) => ({
            name: input.name,
            value: input.value,
        }))
        .filter(val => val.value)
    ;
    // quick and dirty... Dur ikke for mange værdier
    const data = Object.assign(...formData);

    //const token = await login(data.value);
    this.token = await login(data.value);
}

render({token}) {
    console.log("-2-");
    if(token) return null;

    this.token = token;

    return html`
        <style include="shared-styles">
            :host {
                display: block;
                padding: 10px;
            }
        </style>
        
        <form name="loginForm" onsubmit=${this.handleLogin} autocomplete="off"}>
            <input type="text" name="name" pattern="[a-z0-0]{3,}" />
            <button type="submit" class="build">Login</button>
            <p class="msg"></p>
        </form>
    `
    }
}

window.customElements.define('my-login', Login);