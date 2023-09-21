export default class Rates{
  rates = {}
  cur_names = {}
  country_to_cur = {}
  code_to_name = {}
  num_of_updates = 0;
  on_update:Function;

  constructor(){
    
  }
  get currencies():{}{
    let curr_names = []
    for (let key in this.cur_names){
      curr_names[key] = this.cur_names[key]
    }
    return curr_names
  }
  get_countries_by_cur(tag:any){
    
    let countries = []
    
    for (let key in this.country_to_cur){
      
      if (this.country_to_cur[key].toLowerCase() == tag){
      
        
        countries.push({country:key, currency:tag.toUpperCase(), name:this.code_to_name[key.toLowerCase()], rate: this.rates[tag.toUpperCase()]})
      }
    }
    return countries
  }
  need_update(){
    this.num_of_updates--
    if (this.num_of_updates == 0){
      this.on_update();
    }
  }

  update_all(){
    this.update_rates()
    this.update_cur_names()
    this.update_country_to_cur()
    this.update_code_to_name()
    this.on_update;
  }
  update_rates(){
    this.num_of_updates++
    const rates_api_str = "http://data.fixer.io/api/latest?access_key=b2a62d1e8398549ed24d9ec69f03fc56"

    fetch(rates_api_str)
    .then(response => response.json())
    .then(data => {
      this.rates = data.rates;
      this.need_update();
    })
  }
  update_cur_names(){
    this.num_of_updates++
    const cur_names_api_str = "http://data.fixer.io/api/symbols?access_key=b2a62d1e8398549ed24d9ec69f03fc56"

    fetch(cur_names_api_str)
    .then(response => response.json())
    .then(data => {
      this.cur_names = data.symbols;
      this.need_update();
    })
  }
  update_country_to_cur(){
    this.num_of_updates++
    const country_to_cur_name_api_str = "http://country.io/currency.json"
    // load country to currency
    fetch(country_to_cur_name_api_str)
    .then(response => response.json())
    .then(data => {
      this.country_to_cur = data;
      this.need_update();
    })
  }
  update_code_to_name(){
    this.num_of_updates++
    const codes_to_names_api_str = "https://flagcdn.com/en/codes.json"
    // get all country codes
    fetch(codes_to_names_api_str)
    .then(response => response.json())
    .then(data => {
      this.code_to_name = data;
      this.need_update();
    })
  }
}