
//VAriaveis do jogo
 var vetorDeImgs=[3,2,7,4,1,5,8,6,12,11,9,10];
 var jogada1,jogada2,jogada1Str,esperar=false,pontos,p=0,cont=0;
 pontos=document.getElementById("pontos");
 pontos.innerHTML=p;
 var seg=0,min=0,mins,segs;
 var tempo=document.getElementById("tempo");
 var perdeu=false;
 var esperar=false;
 var vetorDebugger=[1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24];

//Colocar cartas em ordem aleatoria        
for(var i=1; i <=12 ; i++){
            
        var numAle=Math.floor(Math.random()*12);
        vetorDeImgs.splice(numAle,0,i);
                if(i==12){
                
                var x1=vetorDeImgs[23];
                var x2=vetorDeImgs[22];
                var y1=vetorDeImgs[numAle];
                var y2=vetorDeImgs[numAle+1];    
                vetorDeImgs.splice(numAle,2,x1,x2);
                vetorDeImgs.splice(22,2,y1,y2);    
            
            }   
            
        
        }
           
    for(var i=1; i <= 24 ; i++){
            document.getElementById("c"+i).src="folder/"+vetorDeImgs[i-1]+".jpg";    
        }



//cronometro
setInterval(function(){
    seg++;
    if(seg>59){
        seg=0;
        min++;
    }
    if(seg<10){  
    seg="0"+seg;
    }

    tempo.innerHTML=min+":"+seg;
    },1000);


//record
var recorde = localStorage.getItem("recorde");
if (recorde == null){  
    localStorage.setItem("recorde",1000);
}

//atualizar
function Atualizar() {
window.location.reload();
}




//fadeIn das cartas oa clicar
 $("#container div").click(function effectFade(){
     
         if(esperar==false){
            $(this).fadeOut(0);
            $(this).fadeIn(1800);
     }


});





//função do clique

function cartaClick(carta){
    
       
        if(vetorDebugger[carta-1]==77){
            return;
            alert(5);
        }
    
    
    
    
        if(esperar==false && perdeu!=true){
        aud2.play();
            
        var card=document.getElementById("c"+carta);
            card.style.display="block";
        
            
            
            
            
            
        if(jogada1==null){
            jogada1Str=carta;
            jogada1=parseInt(carta);
          
            return;
        }
       
        if((jogada1>=1 && jogada1<=24) && jogada2==null && jogada1!=carta){
            jogada2=parseInt(carta);
            
                //jogada certa 
                if(vetorDeImgs[jogada1-1]==vetorDeImgs[jogada2-1]){
                    pontos.innerHTML=++p;
                    
                    vetorDebugger.splice(jogada1-1,1,77);
                    vetorDebugger.splice(jogada2-1,1,77);
                    
                    cont++;
                    jogada1=null;
                    jogada2=null;
                    aud3.play();
                    
                    
                    //fim de jogo
                    if(cont==12){
                       mins=min;
                       segs=seg;   
                       aud4.play();
                       if (p < recorde){
                        localStorage.setItem("recorde",p);
                        document.getElementById("fimdejogo").style.display="block";
                        document.getElementById("info").innerHTML= "Novo recorde: " + p;
                        document.getElementById("time").innerHTML= "<br>Tempo jogado: " + mins + ":" +segs;
                       }
            		   else {
            		    document.getElementById("fimdejogo").style.display="block";
                        document.getElementById("info").innerHTML="Jogadas: " + p + "<br> Recorde: " + recorde;
                    
                        document.getElementById("time").innerHTML= "Tempo jogado: " + mins + ":" +segs;
                       
                       }
                    }
        
                    
                    return;
                    };
            //escolha errada
                if(vetorDeImgs[jogada1]!=vetorDeImgs[jogada2]){
                    
                    esperar=true;
                    var interval=setInterval(function(){
                        card.style.display="none";
                        document.getElementById("c"+jogada1Str).style.display="none";
                        clearInterval(interval);
                        esperar=false;
                        pontos.innerHTML=++p;
                    },2500);
                        
                    };
            
            
//Essa parte foi adicionada para remover um bug estranho q as vezes aparecia e virava as cartas
                if(esperar!=true){
                    for(var i=0; i< 24; i++){
                        
                        
                        if(vetorDebugger[i]>24){
                            
                            document.getElementById("c"+(i+1)).style.display="block";
                        }
                        if(vetorDebugger[i]<24){
                            document.getElementById("c"+(i+1)).style.display="none";
                        }
                    }         
                };
            
            
            jogada1=null;                
            jogada2=null;
        }
    
    }      
}






// botao desistir
function acabou(){
    aud5.play();
    perdeu=true;
 
   for(var j=1; j <= 24 ; j++){
            document.getElementById("c"+j).style.display="block";
            
        }
    document.getElementById("btn").style.display="none";
    document.getElementById("btn2").style.display="block";
    
}    


				    
//botao som desligar/ligar    

var s=true;

function som(){
    var imgSom=document.getElementById("btn-volume");
    
    if(s){
        imgSom.src="folder/volume-off.png";
        aud.volume=0;
        aud2.volume=0;
        aud3.volume=0;
        aud4.volume=0;
        aud5.volume=0;
    s=false;
        
    }
    else{
        imgSom.src="folder/volume.png";
        aud.volume= 0.03;    
        aud2.volume= 0.035; 
        aud3.volume= 0.01;
        aud4.volume= 0.3; 
        aud5.volume= 0.3;
    s=true;
    }
    
   
}
          

      