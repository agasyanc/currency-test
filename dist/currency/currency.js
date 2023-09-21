import Selector from "./selector.js";
import Rates from "./rates.js";
import Flags from "./flags.js";
var CurrencySelector = /** @class */ (function () {
    function CurrencySelector(container_id) {
        if (container_id === void 0) { container_id = "app"; }
        var _this = this;
        this.container = document.getElementById(container_id);
        // get data
        this.rates = new Rates();
        this.rates.on_update = function () {
            _this.render();
        };
        this.rates.update_all();
    }
    CurrencySelector.prototype.render = function () {
        var _this = this;
        var flags = new Flags();
        this.flags_container = document.createElement("div");
        this.flags_container.classList.add("currency__flags");
        this.flags_container.appendChild(flags.toHTML());
        this.container.classList.add("currency");
        // create select container
        this.select_container = document.createElement("div");
        this.select_container.classList.add("currency__select");
        // create selector object
        var selector = new Selector(this.rates.currencies);
        selector.onSelect = function (value) {
            var counties = _this.rates.get_countries_by_cur(value);
            console.log(counties);
            flags.render(counties);
        };
        this.select_container.appendChild(selector.toHTML());
        this.container.appendChild(this.select_container);
        this.container.appendChild(this.flags_container);
    };
    return CurrencySelector;
}());
export default CurrencySelector;
//# sourceMappingURL=currency.js.map