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

    return token
};

// const handleLogin = async (e) => {
//     e.preventDefault()
//     return 'Virker'
//     const formData = [...e.target]
//         .map((input) => ({
//             name: input.name,
//             value: input.value,
//         }))
//         .filter(val => val.value)
//     ;
//     // quick and dirty... Dur ikke for mange værdier
//     const data = Object.assign(...formData);
//     //setToken('test')
//
//
//     return await login(data.value);
//     // console.dir('this')
//     // console.dir(this)
//     // console.dir('class')
//     // console.dir(Login)
// }

class Login extends LitElement {

    static get properties() {
        return {
            setToken: Function,
            token: String,
        }
    }

    constructor() {
        super();
        //this.handleLogin.bind(this)

    }

    async handleSubmit(e) {
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

        const token = await login(data.value);
        this.dispatchEvent(new CustomEvent('token', {detail: {token,}}))
    }

    ready() {
        this.addEventListener('submit', async (e) => {
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

            const token = await login(data.value);
            this.dispatchEvent(new CustomEvent('token', {detail: {token,}}))
        });
        super.ready();
    }

render({setToken, token}) {
        console.log('hej', token)
    //if(token !== '/') return null;
    const submit = (e) => {
        e.preventDefault()
        const token = this.handleLogin(e)
        setToken(token)
    };

    return html`
        <style include="shared-styles">
            :host {
            display: block;
            padding: 10px;
            }
        </style>
        
        <form id="hejmeddig" name="loginForm" onsubmit=${this.handleSubmit} autocomplete="off"}>
            <input type="text" name="name" pattern="[a-z0-0]{3,}" />
            <button type="submit" class="build">Login</button>
        </form>
    `
    }
}

window.customElements.define('my-login', Login);
