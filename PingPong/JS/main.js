var Setup=(function(){
    
    
   var DomStrings={
       canv:'#SnakeBox',
       P1_pts:'#p1-score',
       P2_pts:'#p2-score',
       start:'#start',
       stop:'#pause',
       diff:'#diffSelect'
       
   };
   
   var Dom=document.querySelector(DomStrings.canv);
  
   
   var GData={
       Points:{
       P1_Score:0,
       P2_Score:0}
   };
   
   var BallInfo={
       radius:15,
       BallX:Dom.width/2,
       BallY:Dom.height/2,
       AngleS:0,
       AngleEnd:2*Math.PI,
       Color:'white',
       Speed:10,
       SpeedX:6,
       verticalD:this.speed,
       AngCos:360-this.AngSin,
       AngSin:360-this.AngCos,
   };
   
   BallInfo.MoveBall=function(){
       var P1Y, P2Y;
    P1Y=UserControls.PlayerMotion().P1Y;
    P2Y=UserControls.PlayerMotion().P2Y;
       if(this.BallY>Dom.height-this.radius){
           this.Speed=this.Speed*-1;
       }
       
        if(this.BallY<this.radius){
           this.Speed=this.Speed*-1;
            
       }
       
       if(this.BallX+this.radius>canv.width*0.8&& this.BallY>P2Y && this.BallY<P2Y+50){
       
        
 console.log(this.BallX);
console.log(canv.width*.8);
    this.SpeedX=-this.SpeedX;
    
           console.log(this.SpeedX);
        };
       
       
       
       if(this.BallX<canv.width*0.2 && this.BallY>P1Y && this.BallY<P1Y+50){
           console.log(this.BallX);
              this.SpeedX=-this.SpeedX;
            console.log(this.SpeedX+'!!!');
       };
           
    
           
       this.BallY+=this.Speed;
       this.BallX+=this.SpeedX;
   };
   
   return{
       getDOMStrings: function(){
           return DomStrings;
       },
       
       getDOMPoints:function(){
           return GData;
       },
       
       getBallInfo:function(){
           return BallInfo;
       }
   }
})();

var UserControls=(function(SU){
    var StringsG=SU.getDOMStrings();
    var canvG=document.querySelector(StringsG.canv);
 
    var PMotion={
        P1Y:canvG.height/2,
        P2Y:canvG.height/2
    }
    var DiffSet=document.querySelector(StringsG.diff);
    PMotion.P2AI=function(){
       if(DiffSet.value==10) {if(this.P2Y+25>SU.getBallInfo().BallY){
            
            this.P2Y-=1;
        }
        if(this.P2Y+25<SU.getBallInfo().BallY){
            this.P2Y+=1;
        }
         
                             }
        if(DiffSet.value==15) {if(this.P2Y+25>SU.getBallInfo().BallY){
          
            this.P2Y-=6;
        }
        if(this.P2Y+25<SU.getBallInfo().BallY){
            this.P2Y+=6;
        }
                             }
  }
    
 return{
    PlayerMotion:function(){
        return PMotion;
    }
 }
    
    
    
})(Setup)




var DomStrings=Setup.getDOMStrings();
var canv=document.querySelector(DomStrings.canv);
var ctx=canv.getContext('2d');
window.addEventListener('keydown',function(e){
    switch(e.keyCode){
        case 87:
           
           if (UserControls.PlayerMotion().P1Y>10) {UserControls.PlayerMotion().P1Y-=0.1;}
            
            break;  
        case 83:
                      if (UserControls.PlayerMotion().P1Y<canv.height-60) {UserControls.PlayerMotion().P1Y+=0.1;}
            break;
    }
})
var GameMode=function(){
var P1Y, P2Y;
    P1Y=UserControls.PlayerMotion().P1Y;
    P2Y=UserControls.PlayerMotion().P2Y;


// define the background 
ctx.clearRect(0,0,canv.width,canv.height);
ctx.fillStyle='black';
ctx.fillRect(0,0,canv.width,canv.height);

// define player 1 Motion
ctx.fillStyle='white';
ctx.fillRect(canv.width*0.1,P1Y,canv.width*0.05,50)
    
// define Player 2 Motion
ctx.fillStyle='white';
ctx.fillRect(canv.width*0.8,P2Y,canv.width*0.05,50)

// define Ball Location

UserControls.PlayerMotion().P2AI();   
var BallInfo=Setup.getBallInfo();
BallInfo.MoveBall();
ctx.beginPath();
ctx.arc(BallInfo.BallX,BallInfo.BallY, BallInfo.radius,BallInfo.AngleS,BallInfo.AngleEnd);
ctx.fillStyle=BallInfo.Color;
ctx.fill();
ctx.stroke();


    

}

function init(){
    var P1Y, P2Y;
    P1Y=UserControls.PlayerMotion().P1Y;
    P2Y=UserControls.PlayerMotion().P2Y;

   // define the background 
ctx.clearRect(0,0,canv.width,canv.height);
ctx.fillStyle='black';
ctx.fillRect(0,0,canv.width,canv.height);

// define player 1 Motion
ctx.fillStyle='white';
ctx.fillRect(canv.width*0.1,P1Y,canv.width*0.05,50)
    
// define Player 2 Motion
ctx.fillStyle='white';
ctx.fillRect(canv.width*0.8,P2Y,canv.width*0.05,50)

// define Ball Location

UserControls.PlayerMotion().P2AI();   
var BallInfo=Setup.getBallInfo();
BallInfo.MoveBall();
ctx.beginPath();
ctx.arc(BallInfo.BallX,BallInfo.BallY, BallInfo.radius,BallInfo.AngleS,BallInfo.AngleEnd);
ctx.fillStyle=BallInfo.Color;
ctx.fill();
ctx.stroke();
 
}

init();
var game=false;
document.querySelector(Setup.getDOMStrings().start).addEventListener('click',function(){
game=true;
console.log('hi');
 Myvar=setInterval(GameMode,50);   
});
document.querySelector(Setup.getDOMStrings().stop).addEventListener('click',function(){
clearInterval(Myvar);  
});


