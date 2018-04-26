import {LitElement, html} from '@polymer/lit-element/lit-element.js';
// import { PolymerElement, html } from '@polymer/polymer/polymer-element.js';
import '@polymer/paper-icon-button/paper-icon-button.js';
import './shared-styles.js';
import './scripts/login';
import buildBoard from './scripts/build-board';


class MyView3 extends LitElement {
  constructor() {
    super();
    this.token = 'test';
    this.BASE_URL = 'https://us-central1-fe-workshop-april-2018.cloudfunctions.net';
    this.appState = {
      lastFlip: null,
      clickIndex: 2,
      state: {
        login: {
          busy: true,
          username: null,
          token: null,
        },
        celebrate: false,
        turnsTaken: 0,
        cards: [],
      },
      currentState: {
        login: {
          username: null,
          token: null,
        },
        celebrate: false,
        'turns-taken': 0,
        cards: [],
      },
    },
    this.settings = {
      pairSize: 2,
      thinkTime: 5000,
      availableValues: Array(100).fill(0).map((value, index) => index),
    }
  }

    ready() {
        this.addEventListener('token', async (e) => {
            e.preventDefault()
            console.log(e.target)
            this.token = 'Hello from the other side'
        });
        super.ready();
    }

  render() {
      console.log('running', this.token);
      const setToken = (newToken) => {
        console.log('in set token', this.token);

          newToken.then(val => {
              console.dir(val)
              this.token = val;

        console.log('after set token', this.token);
          })
        console.log('done', this.token);
          //console.log(await newToken)
          // if (newToken) {
          //     this.token = await newToken;
          // }
            //console.log(this.token);
      };
    return html`
      <style include="shared-styles">
      :host {
        display: block;
        padding: 10px;
      }
      </style>
     <div id="app">
     <h3>Hello ${this.token}</h3>
        <my-login setToken=${setToken} token=${this.token}/> 
    </div>
          ${this.appState.state.cards.map((card) => {
            
          })}
      </div>
    `;
  }
}

window.customElements.define('my-view3', MyView3);