export default class Flags {
  element: HTMLElement;
  constructor(){
    this.element = document.createElement('div');
    this.element.classList.add('flags');
    
  }
  render(items:any[]){
    this.element.innerHTML = "";
    if (items.length === 0){
      this.element.innerHTML = `<p>No countries for this currency<p>`
    }
    items.forEach((item:any) => {
      let flag = document.createElement('div');
      flag.classList.add('flags__item');
      
      let image = document.createElement('img');
      image.src = `https://flagcdn.com/40x30/${item.country.toLowerCase()}.png`

      flag.appendChild(image)

      flag.appendChild(document.createElement('p')).textContent = item.name;

      flag.appendChild(document.createElement('p')).textContent = "1 EUR = "+item.rate+" "+item.currency;

      
      this.element.append(flag);
      

    })
  
  }
  toHTML(): HTMLElement{
    return this.element;
  }
}