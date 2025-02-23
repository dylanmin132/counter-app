/**
 * Copyright 2025 dylanmin132
 * @license Apache-2.0, see LICENSE for full text.
 */
import { LitElement, html, css } from "lit";
import { DDDSuper } from "@haxtheweb/d-d-d/d-d-d.js";
import { I18NMixin } from "@haxtheweb/i18n-manager/lib/I18NMixin.js";
import "@haxtheweb/multiple-choice/lib/confetti-container.js"

/**
 * `counter-app`
 * 
 * @demo index.html
 * @element counter-app
 */


export class CounterApp extends DDDSuper(I18NMixin(LitElement)) {

  static get tag() {
    return "counter-app";
  }

  constructor() {
    super();
    this.count = 0;
    this.min = 10;
    this.max = 25;

    this.title = "";
    this.t = this.t || {};
    this.t = {
      ...this.t,
      title: "Title",
    };
    this.registerLocalization({
      context: this,
      localesPath:
        new URL("./locales/counter-app.ar.json", import.meta.url).href +
        "/../",
      locales: ["ar", "es", "hi", "zh"],
    });
  }

  // Lit reactive properties
  static get properties() {
    return {
      ...super.properties,
      count: { type: Number, reflect: true },
      min: {type: Number},
      max: {type: Number}
    };
  }

  // Lit scoped styles
  static get styles() {
    return [super.styles,
    css`
      :host {
        display: block;
        color: var(--ddd-theme-primary);
        background-color: var(--ddd-theme-accent);
        font-family: var(--ddd-font-navigation);
      }
      :host([count="10"]) {
        color: var(--ddd-theme-default-landgrantBrown);
      }
      :host([count="18"]) {
        color: var(--ddd-theme-default-athertonViolet);
      }
      :host([count="21"]) {
        color: var(--ddd-theme-default-opportunityGreen);
      }
      :host([count="25"]) {
        color: var(--ddd-theme-default-keystoneYellow);
      }
      .wrapper {
        margin: var(--ddd-spacing-2);
        padding: var(--ddd-spacing-4);
      }
      .counter {
        font-size: var(--counter-app-label-font-size, var(--ddd-font-size-xxl));
      }
    `];
  }

  // Lit render the HTML
  render() {
    return html`
    <confetti-container id="confetti"></confetti-container>
      <div class="wrapper">
      <div class = "counter">${this.count}</div>
      <div class = "buttons">
          <button ?disabled="${this.count === this.min}" @click="${this.decrease}">-1</button>
          <button ?disabled="${this.count === this.max}" @click="${this.increase}">+1</button>
        </div>
      </div>
    `;
  }

  increase() {
    if(this.count < 25) {
      this.count++;
    }
  }
  decrease() {
    if(this.count > 10) {
      this.count--;
    }
  }

  updated(changedProperties) {
    if(super.updated) {
      super.updated(changedProperties);
    }
    if(changedProperties.has('count')) {
      if(this.count === this.max) {
        this.makeItRain();
      }
    }
  }

  makeItRain() {
    import("@haxtheweb/multiple-choice/lib/confetti-container.js").then(
      (module) => {
        setTimeout(() => {
          this.shadowRoot.querySelector("#confetti").setAttribute("popped", "");
        }, 0);
      }
    );
  }
  
  static get haxProperties() {
    return new URL(`./lib/${this.tag}.haxProperties.json`, import.meta.url)
      .href;
  }
}

globalThis.customElements.define(CounterApp.tag, CounterApp);