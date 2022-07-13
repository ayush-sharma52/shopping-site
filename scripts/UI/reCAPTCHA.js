export class canvas{
    constructor(idName){
   this.canvas=document.getElementById(idName);
//    let heightRatio = 0.6;      //if you want to add responsiveness but it will affect cursor calibration
// this.canvas.height = this.canvas.width * heightRatio;
   this.context=this.canvas.getContext('2d');
   this.drawn=false;
   this.connectDraw();
console.log('exported');}

   connectDraw()
    {
        let isDrawing = false;
        let x = 0;
        let y = 0;
              
        this.canvas.addEventListener('mousedown',e=>{
        isDrawing=true;
         x=e.offsetX;
         y=e.offsetY;
        })
        
        //using this eventlistener will help us to draw figures not just straight lines also making 
        //lines simultaneously as we draw unlike in the case of only mousedown and up events
        this.canvas.addEventListener('mousemove',e=>{ 
        if(isDrawing===true){
            this.drawLine(x,y,e.offsetX,e.offsetY);
            x=e.offsetX;
            y=e.offsetY;
            this.drawn=true;
        }
        })
        
 
        window.addEventListener('mouseup',e=>{ //also we will add window here insted of canvas
        if(isDrawing===true)//to check whether we downed mouse inside canvas or outside
      {  this.drawLine(x,y,e.offsetX,e.offsetY);   
      isDrawing=false;
      x=0;y=0; 
        console.log('fired');
    }
        })
    
    
    }
 drawLine(x,y,curX,curY){ 
  this.context.beginPath(); 
//If you don't, the previous sub-paths will remain part of the current 
// path, and get stroked every time you call the stroke() method.
  this.context.strokeStyle ='white';
  this.context.lineWidth = 1;
  this.context.moveTo(x,y);
  this.context.lineTo(curX,curY);
  this.context.stroke();
  this.context.closePath();
 }
}