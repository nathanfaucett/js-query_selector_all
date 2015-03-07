var environment = require("environment"),
    getPrototypeOf = require("get_prototype_of");


var document = environment.document,
    window = environment.window,
    querySelectorAll = document.querySelectorAll;


if (!querySelectorAll) {
    querySelectorAll = function querySelectorAll(selectors) {
        var style = this.createElement("style"),
            elements = [],
            qsa = [],
            element;

        this.documentElement.firstChild.appendChild(style);

        this._qsa = qsa;
        global.__qsaDocument = this;

        style.styleSheet.cssText = selectors + "{x-qsa:expression(__qsaDocument._qsa && __qsaDocument._qsa.push(this))}";
        window.scrollBy(0, 0);
        style.parentNode.removeChild(style);

        while (qsa.length) {
            element = qsa.shift();
            element.style.removeAttribute("x-qsa");
            elements.push(element);
        }

        global.__qsaDocument = null;
        this._qsa = null;

        return elements;
    };
}

document.querySelectorAll = getPrototypeOf(document).querySelectorAll = querySelectorAll;


module.exports = function(selectors, ownerDocument) {
    ownerDocument = ownerDocument || document;

    if (!ownerDocument.querySelectorAll) {
        ownerDocument.querySelectorAll = querySelectorAll;
    }

    return ownerDocument.querySelectorAll(selectors);
};
