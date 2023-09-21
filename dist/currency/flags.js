var Flags = /** @class */ (function () {
    function Flags() {
        this.element = document.createElement('div');
        this.element.classList.add('flags');
    }
    Flags.prototype.render = function (items) {
        var _this = this;
        this.element.innerHTML = "";
        if (items.length === 0) {
            this.element.innerHTML = "<p>No countries for this currency<p>";
        }
        items.forEach(function (item) {
            var flag = document.createElement('div');
            flag.classList.add('flags__item');
            var image = document.createElement('img');
            image.src = "https://flagcdn.com/40x30/".concat(item.country.toLowerCase(), ".png");
            flag.appendChild(image);
            flag.appendChild(document.createElement('p')).textContent = item.name;
            flag.appendChild(document.createElement('p')).textContent = "1 EUR = " + item.rate + " " + item.currency;
            _this.element.append(flag);
        });
    };
    Flags.prototype.toHTML = function () {
        return this.element;
    };
    return Flags;
}());
export default Flags;
//# sourceMappingURL=flags.js.map