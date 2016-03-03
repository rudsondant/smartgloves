/*Programador: Lucas Cassiano - Data de Criação 19.01.2013/ última alteração: 19.01.2013-------------------------
Este script cria um movimento de um personagem a partir de um GUI em tela. Simulando a entrada de dados para movimento 
provenientes da luva de dados.Apenas um paleativo para testes do protótipo do jogo.
----------------------------------------------------------------------------------------------------------------*/
#pragma strict
//var ativo:boolean;
var Barco:GameObject;
var x:int=0;
var Entrada : float = 0.0; //Representa a velocidade do movimento lateral do personagem, ou seja, os dados de saída da luva de dados.
var Estilo:GUISkin;
var correnteza:float=-3.0; //Velocidade da correnteza
//var velocidade:Vector3=Vector3(0,0,0);
var sensibilidade:float=3;
//limites laterais
var limNeg:Transform;
var limPos:Transform;
var posZ:float;
//Variável utilizada na variação;
var t0:float=0;
var delta:float;


var estaColidindo = false;//Variável que indica se o barco está colidindo
//var hit : RaycastHit;
var leftColliding : boolean; // Barco está colidindo na parte esquerda
var rightColliding : boolean;// Barco está colidindo na parte direita
var frontColliding : boolean;// Barco está colidindo na parte frontal
//var Cilindro1:GameObject;
//var Cilindro2:GameObject;

var speed : Vector3 ;


function FixedUpdate(){
	if(Camera.main.GetComponent(GameOver).ativo==false && Camera.main.GetComponent(ControleGUI).iniciou==false){
		//velocidade=Vector3(0,0,posZ*sensibilidade);
		//Barco.rigidbody.MovePosition(Barco.rigidbody.position + velocidade * Time.deltaTime);
		//Barco.rigidbody.AddForce(0,0,posZ*sensibilidade);
		/*	if(Physics.Raycast(Cilindro1.transform.position,Vector3.forward,1))
	  		rightColliding = true;
		else 
	  		rightColliding = false;
	  	if(Physics.Raycast(Cilindro2.transform.position,Vector3.forward,1))
	  		rightColliding = true;
		else 
	  		rightColliding = false;*/
	  	
	  	acharPos();
	  	Barco.rigidbody.velocity.x=correnteza;
	  	if(Physics.Raycast(Barco.transform.position,Vector3.forward,1))
			rightColliding = true;
		else 
	  		rightColliding = false;
	  	
	  	if(Physics.Raycast(Barco.transform.position,Vector3.left,4.5))
			frontColliding = true;
		else 
	  		frontColliding = false;
	  		
	  	if(Physics.Raycast(Barco.transform.position,Vector3.back,1))
			leftColliding = true;
		else 
			leftColliding = false;
			
	    if(frontColliding){
		  	if(rightColliding)//Entrada = -1
		  		Entrada -= 0.01;
		  	Entrada += 0.01;
		}
		/*else{
			if(estaColidindo)
				Entrada += 0.01;
		}*/
	    
	    if(!rightColliding){
		  	if(Input.GetKey(KeyCode.RightArrow))//Entrada = 1
		  		Entrada += 0.01;
		}
		else{
			if(estaColidindo)
				Entrada -= 0.01;
		}
		
		if(!leftColliding){
		  	if(Input.GetKey(KeyCode.LeftArrow))//Entrada = -1
		  		Entrada -= 0.01;
		}
		else{
			if(estaColidindo)
				Entrada += 0.01;
		}
		Barco.transform.position.z = posZ*sensibilidade;
		//Barco.rigidbody.MovePosition(Barco.rigidbody.position+Vector3(0,0,posZ*sensibilidade));
		
		Animacoes();
		print(Barco.transform.position + " " + Entrada + " " + rightColliding + " " + leftColliding + " " + frontColliding + " " + estaColidindo);
		//print(contadorTranslacao + " " + tempoEspera + " " +posZ);
		//print(Entrada + " "  +posZ + " " + limNeg.position.z + " " + limPos.position.z);
		//print(Entrada + " " +posZ);
	}
}


function OnGUI () {
	GUI.skin=Estilo;
	GUI.Label (Rect (130, Screen.height-113, 30, 20), (Entrada+5)*10 + " ");
	//GUI.Label (Rect (155, Screen.height-113, 30, 20), "%");
  	//Entrada = GUI.HorizontalSlider (Rect (40, Screen.height-100, 200, 30), Entrada,-5.0, 5.0); //Apenas um paleativo para testes.
  	
  	
  	GUI.Label (Rect (30, Screen.height-70, 180, 40), "0% -> totalmente fechada \n100% -> totalmente aberta"); 
}

function acharPos(){
	var dist:float;
	dist=limPos.position.z+ (-1*limNeg.position.z); //Equivalente à somatória dos dois em módulo
	posZ=(dist*Entrada)/1000;
}


function Animacoes(){
	if(Entrada<0){
		Barco.animation["Remar"].speed=-Entrada/(2.5);
		Barco.animation.CrossFade("Remar");
	}
	if(Entrada>0){
		Barco.animation["Remar"].speed=Entrada/(2.5);
		Barco.animation.CrossFade("Remar");
	}
}

//GUIStyle myButtonStyle = new GUIStyle(GUI.skin.button);
    //myButtonStyle.fontSize = 50;

/*
function Update () {
	if(Input.GetKey("a")){
		//x=2;
		//if(x>=2)
		x=2;
		var velocidade:Vector3=Vector3(0,0,0);
	}
	else if (Input.GetKey("d")){
		x=-1;
		Barco.animation["Remar"].speed=-2;
		Barco.animation.CrossFade("Remar");
		
	}
	else{
		x=0;
		Barco.animation.CrossFade("Parar");
	}	
	//limitando o tamanho de x
	
	
Barco.rigidbody.velocity=Vector3(-3,0,1-x);
//Barco.rigidbody.AddForce(100*Vector3(0,0,1));
}
*/