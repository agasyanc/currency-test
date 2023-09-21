var Selector = /** @class */ (function () {
    function Selector(currencies) {
        this.currencies = currencies;
        this.createElement();
    }
    Selector.prototype.createElement = function () {
        var _this = this;
        this.element = document.createElement('select');
        this.element.innerHTML += "<option value=\"\"></option>";
        for (var currency in this.currencies) {
            this.element.innerHTML += "<option value=\"".concat(currency, "\">").concat(this.currencies[currency], "</option>");
        }
        this.element.className = 'selector';
        this.element.addEventListener('change', function () {
            if (_this.element.value === '')
                return;
            if (_this.onSelect)
                _this.onSelect(_this.element.value.toLowerCase());
        });
    };
    Selector.prototype.toHTML = function () {
        return this.element;
    };
    return Selector;
}());
export default Selector;
//# sourceMappingURL=selector.js.map