import Selector from "./selector.js";
import Rates from "./rates.js";
import Flags from "./flags.js";

export default class CurrencySelector {
  rates:Rates;
  container:HTMLElement;
  select_container:HTMLElement;
  flags_container:HTMLElement;

  constructor(container_id:string="app") {
    this.container = document.getElementById(container_id);
    // get data
    this.rates = new Rates();
    
    
    this.rates.on_update = () => {
      this.render();
    }
    
    this.rates.update_all();
    
  }

  render(){

    let flags = new Flags()
    this.flags_container = document.createElement("div")
    this.flags_container.classList.add("currency__flags")
    this.flags_container.appendChild(flags.toHTML());
    
    this.container.classList.add("currency")
    // create select container
    this.select_container = document.createElement("div")
    this.select_container.classList.add("currency__select")
    // create selector object
    let selector = new Selector(this.rates.currencies);
    selector.onSelect = (value:string) => {
      

      let counties = this.rates.get_countries_by_cur(value);
      console.log(counties);
      
      flags.render(counties)

    }
    this.select_container.appendChild(selector.toHTML());
    
    
    this.container.appendChild(this.select_container);
    this.container.appendChild(this.flags_container);

  }
}