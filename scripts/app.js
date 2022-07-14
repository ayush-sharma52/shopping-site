import { map } from "./UI/map.js";
import { canvas } from "./UI/reCAPTCHA.js";

const cartButton=document.getElementById('cart-btn');
const backdrop=document.getElementById('backdrop');
const cartModal=document.getElementById('cart-modal');
const itemsListNode=document.querySelector('#items');
const form=itemsListNode.previousElementSibling.querySelector('form'); 
const cartItemsList=cartModal.querySelector('ul');
const totalCost=cartModal.querySelector('#cost');
const aTags=document.querySelectorAll('a');
const clearAllbtn=cartModal.querySelector('button');
const captchaModal=document.getElementById('captcha-modal');
const submitBtn=document.querySelector('#captcha-modal span')

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
function updateTotal(){
    total=total.toFixed(2);
    total=parseFloat(total);
    totalCost.textContent=`₹${total}`;
}
function renderItems(itemsArray){
let id=0; 
itemsArray.forEach((i)=>{ 
    availableItems.push(new storeItem(i,id));
    ++id;
}) 
}
function formHandler(event){
  event.preventDefault();
  const input=event.target.querySelector('input').value;
  if(input=='Shoes'||input=='All'|| input=='Shirt' || input=="Jeans" || input=='T-shirts' || input=='Jackets' ){
  itemsListNode.innerHTML='';availableItems=[];//rendering the whole list again 
  input!=='All' ?renderItems(itemsList.filter(item => item.split(' ')[1]==input)):renderItems(itemsList);
  event.target.querySelector('input').value='';
}
else{
  alert('Please enter correct item');
  event.target.querySelector('input').value='';
}}
function clearAllbtnhandler(){
  localStorage.clear();
  cartItemsList.innerHTML='';
  total=0;
  updateTotal();
}

class cartItem{
  constructor(name,cost,id){
 this.id=id;
 this.addItem(name,cost);
}
 deleteBtnhandler=(event)=>{
  localStorage.removeItem(this.id);
  event.target.closest('li').remove();
  const elementPrice=parseFloat(event.target.closest('li').querySelector('p').textContent.split('₹')[1]);
  total-=elementPrice
  updateTotal();
  }
 addItem=(name,cost)=>{
  localStorage.setItem(this.id,`${name}&${cost}`)
  const newItem=document.createElement('li');
  newItem.classList.add("list-group-item");
  newItem.innerHTML=` <span class="badge">delete</span> 
  <h4 class="list-group-item-heading">${name}</h4>
  <p class="list-group-item-text">₹${cost}</p>`
  cartItemsList.prepend(newItem);
  total+=parseFloat(cost);
  updateTotal();
  const deleteBtn=newItem.querySelector('span');
  deleteBtn.addEventListener('click',this.deleteBtnhandler);
  } }

class storeItem{
constructor(itemString,id){
this.itemNode=this.render(itemString);
const addBtn=this.itemNode.querySelector('button');
addBtn.addEventListener('click',this.addBtnhandler); //adding event listeners to each item to click and add to cart
this.id=id;
this.connectDrag();
}
render(string){
   let arr=string.split(' ');
   let location=arr[0];
   let name=arr[1];
   let price=arr[2];
   const itemDiv =document.createElement('div');
   itemDiv.classList.add('col-xs-4');
   itemDiv.innerHTML=`
   <div class="card" >
      <img class="card-img-top" src="./images/${location}" alt="Card image" >
    <div class="card-body">
      <h4 class="card-title">${name}<span>${price}</span><button style="font-size:24px">Add <i class="fa fa-shopping-cart"></i></button></h4>
    </div>
     </div>`
  itemsListNode.append(itemDiv);
  return itemDiv;
}
addBtnhandler=()=>{   //prepending every item we clicked to the cart-modal
const h4HTML=this.itemNode.querySelector('h4').textContent.split('₹');
const name=h4HTML[0]
const cost=h4HTML[1].split('A')[0];
new cartItem(name,cost,Math.random().toFixed(5));
}
connectDrag(){
this.itemNode.addEventListener('dragstart',event => {
event.dataTransfer.setData('text/plain',this.id);
})
this.itemNode.addEventListener('dragend',event=>{    
})}}

cartModal.addEventListener('dragenter', event => {
  if (event.dataTransfer.types[0] === 'text/plain') {
    cartItemsList.parentElement.classList.add('droppable');
    event.preventDefault();
  }
});
cartModal.addEventListener('dragover', event => {
  if (event.dataTransfer.types[0] === 'text/plain') {
    event.preventDefault();
  }
});
cartModal.addEventListener('dragleave', event => {
  if (event.relatedTarget.closest('div').id !== cartModal.id ) {  //for defining thw whole area inside cartmodal list
  cartItemsList.parentElement.classList.remove('droppable');
}});
cartModal.addEventListener('drop', event => {
  const prjId = event.dataTransfer.getData('text/plain');
 console.log(prjId);
  availableItems.forEach(item=>{
      if(item.id==prjId)
    item.addBtnhandler();
 
  });
   console.log(availableItems);
  cartModal.classList.remove('droppable');
  // event.preventDefault(); // not required
});
cartButton.addEventListener('click',cartButtonhandler);
clearAllbtn.addEventListener('click',clearAllbtnhandler);
submitBtn.addEventListener('click',()=>{
if(obj.drawn)
toggleCaptcha();
else
alert('please first draw something')
})
form.addEventListener('submit',formHandler);

let availableItems=[];
let total=0;
const itemsList=["jackets1.jfif Jackets ₹386",
"jackets2.jfif jackets ₹337",
"download.jfif Jeans ₹130",
"shirtsmen2.jfif Shirt ₹290",
"jeans1.jfif Jeans ₹130",
"shoes3.jfif Shoes ₹235",
"jeans3.jfif Jeans ₹165",
"shoes1.jfif Shoes ₹190.80",
"tshirtsmen1.jfif T-shirts ₹70",
"jackets4.jfif Jackets ₹380.40",
"tshirtsmen3.jfif T-shirts ₹130",
"shoes2.jfif Shoes ₹325"]
aTags.forEach((a)=>{
    a.setAttribute("draggable","false");
})
const mp=new map({lat: 28.639232, lng: 77.2046848} ); ///giving locatiion coordinates of the shop
const obj=new canvas('canvas');
renderItems(itemsList);
 
(function(){  // to render previous cart-items from local storage
 let keys = Object.keys(localStorage);
    let i = keys.length;
   let values=[];
    while ( i-- ) {
    values.push(localStorage.getItem(keys[i]));
     }
     localStorage.clear();
     for(let i=values.length-1;i>=0;--i){
      let arr=values[i].split('&');
      new cartItem(arr[0],arr[1],Math.random().toFixed(5));
     }
})();

(function(){  //this will make sure captcha will only be displayed when tab reopens not on refreshes
if(sessionStorage.getItem('refreshed')!=='true'){
sessionStorage.setItem('refreshed','true');
captchaModal.classList.add('visible');
backdrop.classList.add('visible');
}
})();


