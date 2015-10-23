var tape = require("tape"),
    querySelectorAll = require("..");


tape("querySelectorAll(selector, [ownerDocument : Document])", function(assert) {
    var div = document.createElement("div");

    div.className = "div";
    document.body.appendChild(div);

    assert.equal(querySelectorAll(".div", document)[0], div, "should find all selector matches");
    assert.end();
});
