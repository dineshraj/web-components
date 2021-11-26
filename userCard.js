const template = document.createElement('template');
const templateStyle = `
  <style>
    h3 {
    color: red;
    }
    .user-card {
      font-family: 'Arial', sans-serif;
      background: #f4f4f4;
      width: 500px;
      display: grid;
      grid-template-columns: 1fr 2fr;
      grid-gap: 10px;
      margin-bottom: 15px;
      border-bottom: black 5px solid;
    }

    .user-card img {
      width: 100%;
    }

    .user-card button {
      cursor: pointer;
      background: black ;
      color: #fff;
      border: 0;
      border-radius: 5px;
      padding: 5px 10px;
    }
  </style>`;
const templateHTML = `
  <div class="user-card">
    <img />
    <div>
      <h3></h3>
      <div class="info">
        <p><slot name="email" /></p>
        <p><slot name="phone" /></p>
      </div>
      <button id="toggle-info">Hide Info</button>
    </div>
  </div>
`
template.innerHTML = `${templateStyle}${templateHTML}`;

class UserCard extends HTMLElement {
  constructor() {
    super();

    // A way of doing it but you don't have any encapsulation
    // Below overrides any h3 on the page
    // this.innerHTML = `
    //  ${templateStyle}
    //  ... 
    //  <h3>${this.getAttribute('name')}</h3>
    //  ... 
    //`;

    // Instead attach a shadow DOM, which encapsulates all the styling, and appends the html template
    this.attachShadow({ mode: 'open' });

    this.shadowRoot.appendChild(template.content.cloneNode(true));
    this.shadowRoot.querySelector('h3').innerText = `${this.getAttribute('name')} (H3)`;
    this.shadowRoot.querySelector('img').src = this.getAttribute('avatar');

    this.showInfo = true;
  }

  toggleInfo() {
    this.showInfo = !this.showInfo;

    const info = this.shadowRoot.querySelector('.info');
    const toggleBtn = this.shadowRoot.querySelector('#toggle-info');

    if (this.showInfo) {
      info.style.display = 'block';
      toggleBtn.innerText = 'Hide Info';
    } else {
      info.style.display = 'none';
      toggleBtn.innerText = 'Show Info';
    }
  }

  connectedCallback() {
    this.shadowRoot.querySelector('#toggle-info').addEventListener('click', () => this.toggleInfo());
  }

  disconnectedCallback() {
    this.shadowRoot.querySelector('#toggle-info').removeEventListener();
  }
}

window.customElements.define('user-card', UserCard);

// constructor
// connectedCallback - (mount)
// disconnectedCallback - (unmount)
// attributeChangedCallback - (componentdidupdate etc)
