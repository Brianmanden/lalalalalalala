import {LitElement, html} from '@polymer/lit-element/lit-element';
import '@polymer/paper-icon-button/paper-icon-button';
import './shared-styles';
import './scripts/login';
import './scripts/scripts';
import buildBoard from './scripts/build-board';

const settings = {
    pairSize: 2,
    thinkTime: 5000,
    availableValues: Array(100).fill(0).map((value, index) => index)
}

class MyView2 extends LitElement {
  static get properties(){
    return{
      cards: Array
    }
  }

  constructor(){
    super();
    this.cards = buildBoard(9, settings);
  }

  ready(){
    this.addEventListener('click', (e) => {
      console.dir(e);
    });
    super.ready();
  }

  render(){
    return html`
      <style include="shared-styles">
        :host {
          display: block;
          padding: 10px;
        }
        #app{
          display: grid;
          grid-column-gap: 5px;
          grid-template-columns: 1fr 1fr 1fr 1fr 1fr;
          grid-gap: 20px;
        }
        form{
          background: green;
          grid-area: 1 / 1 / span 1 / span 5;
          height: 100px;
        }
        .card{
          background: palegreen;
          box-shadow: 5px 5px 5px 2px #aaa;
          border-radius: 10px;
          height: 100px;
          padding: 10px;
          width: 100px;
        }
      </style>
      <div id="app">
        <form class="build">
          <input value="3" type="number" min="1" max="20" />
          <button type="submit" class="build">Build</button>
        </form>

        ${this.cards.map((card) => {
          // console.dir(card);
          return cardTemplate(card);
        })}
      </div>
    `;
  }
}

const cardTemplate = (card) => html`
  <button type="button" class="card">
    <h3 class="hidden">index = ${card.index}</h3>
    <h3 class="hidden">value = ${card.value}</h3>
  </button>
`;

window.customElements.define('my-view2', MyView2);

