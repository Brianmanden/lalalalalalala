import {LitElement, html} from '@polymer/lit-element/lit-element';
import '@polymer/paper-icon-button/paper-icon-button';
import './shared-styles';
import './scripts/login';
import './scripts/scripts';
import buildBoard from './scripts/build-board';

const settings = {
  pairSize: 2,
  thinkTime: 5000,
  availableValues: Array(100).fill(0).map((value, index) => index),
}

class MyView2 extends LitElement {
  render(){
    const cards = buildBoard(9, settings);
    console.dir(cards);

    return html`
      <style include="shared-styles">
        :host {
          display: block;
          padding: 10px;
        }
      </style>

      <div id="app">
        <form class="build">
          <input value="3" type="number" min="1" max="20" />
          <button type="submit" class="build">Build</button>
        </form>
        <p>-1-</p>
      </div>

      <div class="card">
        <div class="circle">2</div>
        <h1>View Two</h1>
        <p>Ea duis bonorum nec, falli paulo aliquid ei eum.</p>
        <p>Id nam odio natum malorum, tibique copiosae expetenda mel ea.Detracto suavitate repudiandae no eum. Id adhuc minim soluta nam.Id nam odio natum malorum, tibique copiosae expetenda mel ea.</p>
      </div>
    `;

    // ${this.appState.state.cards.map((card) => {          
    // })}
  }
}

window.customElements.define('my-view2', MyView2);
