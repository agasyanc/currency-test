var Rates = /** @class */ (function () {
    function Rates() {
        this.rates = {};
        this.cur_names = {};
        this.country_to_cur = {};
        this.code_to_name = {};
        this.num_of_updates = 0;
    }
    Object.defineProperty(Rates.prototype, "currencies", {
        get: function () {
            var curr_names = [];
            for (var key in this.cur_names) {
                curr_names[key] = this.cur_names[key];
            }
            return curr_names;
        },
        enumerable: false,
        configurable: true
    });
    Rates.prototype.get_countries_by_cur = function (tag) {
        var countries = [];
        for (var key in this.country_to_cur) {
            if (this.country_to_cur[key].toLowerCase() == tag) {
                countries.push({ country: key, currency: tag.toUpperCase(), name: this.code_to_name[key.toLowerCase()], rate: this.rates[tag.toUpperCase()] });
            }
        }
        return countries;
    };
    Rates.prototype.need_update = function () {
        this.num_of_updates--;
        if (this.num_of_updates == 0) {
            this.on_update();
        }
    };
    Rates.prototype.update_all = function () {
        this.update_rates();
        this.update_cur_names();
        this.update_country_to_cur();
        this.update_code_to_name();
        this.on_update;
    };
    Rates.prototype.update_rates = function () {
        var _this = this;
        this.num_of_updates++;
        var rates_api_str = "http://data.fixer.io/api/latest?access_key=b2a62d1e8398549ed24d9ec69f03fc56";
        fetch(rates_api_str)
            .then(function (response) { return response.json(); })
            .then(function (data) {
            _this.rates = data.rates;
            _this.need_update();
        });
    };
    Rates.prototype.update_cur_names = function () {
        var _this = this;
        this.num_of_updates++;
        var cur_names_api_str = "http://data.fixer.io/api/symbols?access_key=b2a62d1e8398549ed24d9ec69f03fc56";
        fetch(cur_names_api_str)
            .then(function (response) { return response.json(); })
            .then(function (data) {
            _this.cur_names = data.symbols;
            _this.need_update();
        });
    };
    Rates.prototype.update_country_to_cur = function () {
        var _this = this;
        this.num_of_updates++;
        var country_to_cur_name_api_str = "http://country.io/currency.json";
        // load country to currency
        fetch(country_to_cur_name_api_str)
            .then(function (response) { return response.json(); })
            .then(function (data) {
            _this.country_to_cur = data;
            _this.need_update();
        });
    };
    Rates.prototype.update_code_to_name = function () {
        var _this = this;
        this.num_of_updates++;
        var codes_to_names_api_str = "https://flagcdn.com/en/codes.json";
        // get all country codes
        fetch(codes_to_names_api_str)
            .then(function (response) { return response.json(); })
            .then(function (data) {
            _this.code_to_name = data;
            _this.need_update();
        });
    };
    return Rates;
}());
export default Rates;
//# sourceMappingURL=rates.js.map