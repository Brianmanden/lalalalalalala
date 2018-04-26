/**
 * @license
 * Copyright (c) 2016 The Polymer Project Authors. All rights reserved.
 * This code may only be used under the BSD style license found at http://polymer.github.io/LICENSE.txt
 * The complete set of authors may be found at http://polymer.github.io/AUTHORS.txt
 * The complete set of contributors may be found at http://polymer.github.io/CONTRIBUTORS.txt
 * Code distributed by Google as part of the polymer project is also
 * subject to an additional IP rights grant found at http://polymer.github.io/PATENTS.txt
 */
import {LitElement, html} from '@polymer/lit-element/lit-element.js'
// import { PolymerElement, html } from '@polymer/polymer/polymer-element.js';
import '@polymer/paper-icon-button/paper-icon-button.js'
import './shared-styles.js';
import './scripts/hello-world'

class MyView4 extends LitElement {

    // Public property API that triggers re-render (synched with attributes)
    static get properties() {
        return {
            foo: String,
            whales: Number
        }
    }

    constructor() {
        super();
        this.foo = {
            header: 'wow',
            text: 'This is the text',
            headerArray: [
                'I am the new header',
                'I am the second header',
                'I am the third header',
                'I am the fourth header',
            ],
            headerCount: 0,
        };
    }

    changeHeader() {
        // this.foo.text = HelloWorld();
        this.foo.header = this.foo.headerArray[this.foo.headerCount];
        this.foo.headerCount++
        if (this.foo.headerCount >= this.foo.headerArray.length) {
            this.foo.headerCount = 0;
        }
    }

    ready() {
        this.addEventListener('click', async (e) => {
            this.whales = this.whales-1;
            if (this.whales === -1) this.whales = 10;
            await this.nextRendered;
            this.dispatchEvent(new CustomEvent('whales', {detail: {whales: this.whales}}))
        });
        super.ready();
    }

    render({foo, whales}) {
        const myConst = 'I am the button';
        return html`
      <style include="shared-styles">
        :host {
          display: block;
          padding: 10px;
        }
        .card {
            margin: 24px;
            padding: 16px;
            color: #757575;
            border-radius: 5px;
            background-color: #fff;
            box-shadow: 0 2px 2px 0 rgba(0, 0, 0, 0.14), 0 1px 5px 0 rgba(0, 0, 0, 0.12), 0 3px 1px -2px rgba(0, 0, 0, 0.2);
        }
        .buttons {
            border: 1px solid black;
            border-radius: 10px;
            min-width: 50px;
        }
      </style>

      <div class="card">
          <h3>${foo.header}</h3>
          <paper-icon-button class="buttons" icon="my-icons:close" on-click=${this.changeHeader()}>${myConst}</paper-icon-button>
          <div>whales: ${whales > 0 ? '🐳'.repeat(whales) : 'We killed all the whales. Happy Earth Day!!'}</div>
          <div>${foo.text}</div>  
          <slot>${foo.text}</slot> 
          <my-hello-world /> 
        </div>
    `;
    }
}

window.customElements.define('my-view4', MyView4);
