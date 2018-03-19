class Modal {
  constructor(mainDiv, title) {
    this.mainDiv = mainDiv;
    this.title = title;
  }

  add_header() {
    let header = document.createElement('div');
    header.className = "modal-header";
    header.innerHTML = `
      <span class="close-btn">&times;</span>
      <h2>${this.title}</h2>`;
    this.mainDiv.prependChild(header);

  }

  add_footer() {
    let footer = document.createElement('div');
    footer.className = "modal-footer";
    footer.innerHTML = `<h3> FOOTER</h3>`;
    this.mainDiv.appendChild(footer);
  }

}
