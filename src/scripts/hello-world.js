import {LitElement, html} from '@polymer/lit-element/lit-element.js'

class MyHelloWorld extends LitElement {

    render({props}) {
        return html`
      <style include="shared-styles">
        :host {
          display: block;
          padding: 10px;
        }
      </style>

      <h1> HELLO WORLD! </h1>
    `;
    }
}

window.customElements.define('my-hello-world', MyHelloWorld);
