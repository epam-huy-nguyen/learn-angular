import {LitElement, html } from 'lit';
import { property, state } from 'lit/decorators.js';

export class TestElement extends LitElement {
    @property()
    input: string = "";

    @state()
    private checked: boolean = false;

    changeInput(event: Event) {
        const input = event.target as HTMLInputElement;
        this.input = input.value;
    }

    disableInput = () => {
        this.checked = !this.checked;
    }

    render() {
        return html`
            <h1>Hello World</h1>
            <input type="text" ?disabled=${this.checked} placeholder="Input text" @change=${this.changeInput} />
            <button @click=${this.disableInput}>Disable Input</button>
            
        `;
    }
}