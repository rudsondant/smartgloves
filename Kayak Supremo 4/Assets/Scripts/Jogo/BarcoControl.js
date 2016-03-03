#pragma strict

//Se o barco deve se mover
public var ativo:boolean=false;

//Variáveis do Movimento
public var entrada:float;
public var media:float;
var velocidade:float;
var sensibilidade:float;
//var hud:GameHUD;
var estado:int; // <- -1    0    1 ->

var avatar:GameObject;

var seguidor:GameObject;
var barreiraE:GameObject;
var barreiraD:GameObject;
var disBarre:float;

var controle:GloveController;


private var pontoSpawn;

//Informações do jogador
var nStars:int=0;
var nColi:int=0;
var matchTime:float=0;

var contarTempo:boolean=false;

var callGO:boolean=false;
//Animação inicial da câmera


function Start(){
	disBarre=Vector3.Distance(barreiraE.transform.position, barreiraD.transform.position);
	pontoSpawn=transform.position;
}

function Update() {
	if(ativo){
		if(entrada!=0 && media!=0){
			velocidade=sensibilidade*(entrada/media);
		}
		if(entrada<media*0.6 && entrada>media*0.4){
			estado=0;
			rigidbody.velocity.z=0;
		}
		
		else if(entrada<media){ //Vai para direita;
			rigidbody.velocity.z=velocidade;
			estado=1;
			//animando
			avatar.transform.animation["Remar"].speed=-velocidade/(2);
			avatar.transform.animation.CrossFade("Remar");
		}
		
		else if(entrada>media){ //Vai para esquerda;
			rigidbody.velocity.z=-velocidade;
			estado=-1;
			avatar.transform.animation["Remar"].speed=velocidade/(2);
			avatar.transform.animation.CrossFade("Remar");
		}
		
		else{
			rigidbody.velocity.z=0;
			estado=0;
		}
		
		//Descendo o Rio
			rigidbody.velocity.x = -3;
		//Seguindo 
		seguidor.transform.position.x=transform.position.x;
		Barreiras();
		Camera.main.transform.LookAt(transform.position);
			matchTime+=Time.deltaTime;
		
	}
	
}

function OnTriggerEnter (objeto : Collider) {
        if(objeto.tag=="Estrela"){
        	nStars++;
        	//print("Pegou" + hud.numEstrelas+ " Estrelas");
        	Destroy(objeto.gameObject);
       	}
       	

       	     	
}

function OnCollisionEnter(collision : Collision) {
	if(collision.transform.tag=="Obstaculo" || collision.transform.tag=="Muro"){
		nColi++;
		controle.Vibrar();
	}
	
	if(collision.transform.tag=="Chegada" || collision.transform.name=="Chegada"){
			callGO=true;
			print("------End of Match------");
    }


}

function Spawn(){
	transform.position=pontoSpawn;
	matchTime=0;
	nStars=0;
	nColi=0;
}

function Barreiras(){
	var distE = Vector3.Distance(barreiraE.transform.position, transform.position);
	
	var distD = Vector3.Distance(barreiraD.transform.position, transform.position);
	barreiraE.renderer.material.color=Color(0.92,0.52,0,1-2*(distE/(disBarre/2)));
	barreiraD.renderer.material.color=Color(0.92,0.52,0,1-2*(distD/(disBarre/2)));
}

function OnGUI(){
	if(ativo){
		DoHUD();

	}
	if(callGO){
		DoGameOver();
	}
	
	if(Input.GetKeyDown(KeyCode.Escape)){
		Application.LoadLevel(2);
	}
}


//Variaveis do HUD
var estrela:Texture2D;
var skin:GUISkin;

function DoHUD(){
	GUI.skin=skin;
	var tamStar:float=Screen.width*0.1f;
	GUI.DrawTexture(Rect(Screen.width*0.02,Screen.height-tamStar*1.1,tamStar,tamStar),estrela);
	var tamTexto:float=Screen.width*0.07f;
	GUI.color=Color(1,1,1,0.8);
	GUI.skin.label.fontSize=tamTexto;
	GUI.Label(Rect(Screen.width*0.02+tamStar*0.6,Screen.height-tamStar*0.7,tamTexto*5,tamTexto),"x");
	GUI.Label(Rect(Screen.width*0.02+tamStar,Screen.height-tamStar*0.7,tamTexto*5,tamTexto),nStars.ToString());
	GUI.skin.label.fontSize=tamTexto*0.3;
	GUI.Label(Rect(Screen.width-tamStar*1.2,Screen.height-tamStar,tamTexto*5,tamTexto),"tempo:");
	GUI.skin.label.fontSize=tamTexto*0.6;
	var tempoExibido:int=matchTime;
	GUI.Label(Rect(Screen.width-1.2*tamStar,Screen.height-tamStar*0.7,tamTexto*5,tamTexto),tempoExibido.ToString());
	//GUI.color=Color(1,1,1,1);
}



//variaveis da UI do game over
var backGroundGO:Texture2D;
var skinGO:GUISkin;
function DoGameOver(){
	GUI.skin=skinGO;
	ativo=false;
	//Pausado
	avatar.transform.animation["Remar"].speed=0;
	transform.rigidbody.velocity=Vector3(0,0,0);
	GUI.DrawTexture(Rect(0,0,Screen.width,Screen.height),backGroundGO); //Back
	var tamB:float=Screen.width*0.25f;
	
	
	
	if(GUI.Button(Rect(Screen.width*0.5-tamB*0.5,Screen.height*0.4,tamB,tamB*0.3),"Novo Jogo")){
		//Salvar Os Dados
		controle.SalvarDadosPartida(nStars,nColi,matchTime);
		ativo=true;
		callGO=false;
		Spawn();
		controle.ned.Fechar ();
		Application.LoadLevel(Application.loadedLevel);
	}
	
	if(GUI.Button(Rect(Screen.width*0.5-tamB*0.5,Screen.height*0.4+tamB*0.4,tamB,tamB*0.3),"Menu Inicial")){
		//Salvar Os Dados
		controle.SalvarDadosPartida(nStars,nColi,matchTime);	
		controle.ned.Fechar();
		Application.LoadLevel(2); //MENU INICIAL
	
	}
	
	if(GUI.Button(Rect(Screen.width*0.5-tamB*0.5,Screen.height*0.4+2*tamB*0.4,tamB,tamB*0.3),"Sair")){
		//Salvar Os Dados
		controle.SalvarDadosPartida(nStars,nColi,matchTime);		
		Application.Quit();
	
	}
	


}