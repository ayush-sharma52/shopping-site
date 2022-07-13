import { map } from "./UI/map.js";
import { canvas } from "./UI/reCAPTCHA.js";

const cartButton=document.getElementById('cart-btn');
const backdrop=document.getElementById('backdrop');
const cartModal=document.getElementById('cart-modal');
const itemsList=document.querySelectorAll('#items .card');//selecting all items
const cartItemsList=cartModal.querySelector('ul');
const totalCost=cartModal.querySelector('#cost');
const aTags=document.querySelectorAll('a');
const clearAllbtn=cartModal.querySelector('button');
const captchaModal=document.getElementById('captcha-modal');
const submitBtn=document.querySelector('#captcha-modal span')
aTags.forEach((a)=>{
    a.setAttribute("draggable","false");
})
function toggleCaptcha(){
backdrop.classList.add('invisible');
captchaModal.classList.add('invisible');
}
function toggleCart(){
cartModal.classList.toggle('visible');
}

function cartButtonhandler(){
toggleCart();
}
const availableItems=[];
let total=0;
// let cartItems=0;
function updateTotal(){
    total=total.toFixed(2);
    total=parseFloat(total);
    totalCost.textContent=`$${total}`;
}


cartItemsList.addEventListener('dragenter', event => {
    if (event.dataTransfer.types[0] === 'text/plain') {
      cartItemsList.parentElement.classList.add('droppable');
      event.preventDefault();
    }
  });
  cartItemsList.addEventListener('dragover', event => {
    if (event.dataTransfer.types[0] === 'text/plain') {
      event.preventDefault();
    }
 });
 
 cartItemsList.addEventListener('dragleave', event => {
    if (event.relatedTarget.closest('ul') !== cartItemsList) {  //for defining thw whole area inside cartmodal list
    cartItemsList.parentElement.classList.remove('droppable');
  }});

  cartItemsList.addEventListener('drop', event => {
    const prjId = event.dataTransfer.getData('text/plain');
    console.log(prjId);
    availableItems.forEach(item=>{
        if(item.id==prjId)
       item.addToCarthandler();
   
    })
    cartItemsList.parentElement.classList.remove('droppable');
    // event.preventDefault(); // not required
  });

class storeItem{
    constructor(itemNode,id){
      const addBtn=itemNode.querySelector('button');
    addBtn.addEventListener('click',this.addToCarthandler); //adding event listeners to each item to click and add to cart
    this.id=id;
    this.item=itemNode;
    this.connectDrag();
    }
    deleteBtnhandler(event){
        event.target.closest('li').remove();
        const elementPrice=parseFloat(event.target.closest('li').querySelector('p').textContent.split('$')[1]);
        total-=elementPrice
        updateTotal();
        }
     addItem = (name,cost)=>{
            const newItem=document.createElement('li');
            newItem.classList.add("list-group-item");
            newItem.innerHTML=` <span class="badge">delete</span> 
            <h4 class="list-group-item-heading">${name}</h4>
            <p class="list-group-item-text">$${cost}</p>`
            cartItemsList.prepend(newItem);
            return newItem;
        } 
    addToCarthandler=()=>{   //prepending every item we clicked to the cart-modal
        const h4HTML=this.item.querySelector('h4').textContent.split('$');
        const name=h4HTML[0]
        const cost=h4HTML[1].split('A')[0];
        total+=parseFloat(cost);
        const item=this.addItem(name,cost);
        updateTotal();
        const deleteBtn=item.querySelector('span');
        deleteBtn.addEventListener('click',this.deleteBtnhandler);
    }
    connectDrag(){
       this.item.addEventListener('dragstart',event => {
        event.dataTransfer.setData('text/plain',this.id);})
        this.item.addEventListener('dragend',event=>{    
        console.log(event);})
    }
}
let id=0; 
itemsList.forEach((i)=>{ 
    availableItems.push(new storeItem(i,id));
    ++id;
})

function clearAllbtnhandler(){
  cartItemsList.innerHTML='';
  total=0;
  updateTotal();
}
const mp=new map({lat: 28.639232, lng: 77.2046848} ); ///giving locatiion coordinates of the shop
const obj=new canvas('canvas');

cartButton.addEventListener('click',cartButtonhandler);
clearAllbtn.addEventListener('click',clearAllbtnhandler);
submitBtn.addEventListener('click',()=>{
if(obj.drawn)
toggleCaptcha();
else
alert('bosdike draw krle pehle')

})


