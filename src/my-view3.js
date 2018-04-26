import {LitElement, html} from '@polymer/lit-element/lit-element.js';
// import { PolymerElement, html } from '@polymer/polymer/polymer-element.js';
import '@polymer/paper-icon-button/paper-icon-button.js';
import './shared-styles.js';
import './scripts/login';
import buildBoard from './scripts/build-board';

class MyView3 extends LitElement {
  constructor() {
    super();
    this.BASE_URL = 'https://us-central1-fe-workshop-april-2018.cloudfunctions.net';
    this.token = '';
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

    isFlipped(card) {
        return card.state.flipped
    }
    isMatched(card) {
        return card.state.matched
    }

  render() {    
    return html`
      <style include="shared-styles">
      :host {
        display: block;
        padding: 10px;
      }
      </style>
      <div id="app">
        <my-login token=${this.token} /> 
          <form class="build" hidden>
            <input value="3" type="number" min="1" max="20" />
            <button type="submit" class="build">Build-A-Board</button>
          </form>

          ${this.appState.state.cards.map((card) => {
            
          })}
      </div>
    `;
  }
}

window.customElements.define('my-view3', MyView3);