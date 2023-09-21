export default class Selector{
  element:HTMLSelectElement;
  onSelect:Function;
  currencies:{};
  constructor(currencies:{}){
    this.currencies = currencies;
    this.createElement();
    
  }
  createElement(){
    this.element = document.createElement('select')
    this.element.innerHTML += `<option value=""></option>`
    for(let currency in this.currencies){
      this.element.innerHTML += `<option value="${currency}">${this.currencies[currency]}</option>`
    }
    this.element.className = 'selector'
    this.element.addEventListener('change',()=>{
      if (this.element.value === '') return;
      if(this.onSelect) this.onSelect(this.element.value.toLowerCase())
    })
  }
  toHTML(){
    return this.element;
  }
}