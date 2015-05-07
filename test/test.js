var assert = require("assert"),
    Browser = require("zombie"),
    querySelectorAll = require("../src/index");


describe("querySelectorAll(selector, [ownerDocument : Document])", function() {
    var document;

    before(function(done) {
        Browser.localhost("localhost", 80);
        Browser.visit("/", function(e, browser) {
            document = browser.window.document;
            done();
        });
    });

    it("should find all selector matches", function() {
        var div = document.createElement("div");
        div.className = "div";
        document.body.appendChild(div);

        assert.equal(querySelectorAll(".div", document)[0], div);
    });
});
