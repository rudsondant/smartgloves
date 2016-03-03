#pragma strict
//Se o HUD deve ser exibido na tela
var ativo:boolean=false;
var skin:GUISkin;
public var numEstrelas:int=0;
public var nomeJogador:String="Lucas";
public var tempo:int; //Em Segundos
var texturaEstrela:Texture2D;
var backgroundGameOver:Texture2D;
//Variáveis do controle do barco
var barco:BarcoControl;
//var control:Texture2D[];
var gameOver:boolean=false;
var posInicial:Vector3;


function OnGUI(){
	GUI.skin=skin;
	//Informações superiores
	if(ativo){
	GUI.DrawTexture(Rect(20,10,50,50),texturaEstrela);
	GUI.Label(Rect(60,40,20,30),"X");
	var tamFont = skin.label.fontSize;
	skin.label.fontSize=30;
	GUI.Label(Rect(70,40,40,30),""+numEstrelas);
	skin.label.fontSize=tamFont;
	GUI.Label(Rect(60,10,200,30),"Tempo: "+tempo+"s");

	}
	
	if(gameOver){
		doGameOver();
	}
	
}

function Update(){
	if(ativo){
		tempo+=Time.deltaTime;
	}

}

function doGameOver(){
	//BackGround
	GUI.DrawTexture(Rect(0,0,Screen.width,Screen.height),backgroundGameOver);
	//Exibir dados da Partida
	GUI.Label(Rect(Screen.width/2-50,50,200,30),"Fim da partida");
	GUI.Label(Rect(Screen.width/2-50,80,200,30),"Tempo: "+tempo+"s");
	
	GUI.DrawTexture(Rect(Screen.width/2-75,85,150,150),texturaEstrela);
	
	var tamFont = skin.label.fontSize;
	skin.label.fontSize=30;

	GUI.Label(Rect(Screen.width/2-50,240,100,30),""+numEstrelas);
	skin.label.fontSize=tamFont;
	if(GUI.Button(Rect(Screen.width/2-90,300,180,30),"Jogar Novamente")){
		Application.LoadLevel(1);
	}
	
	if(GUI.Button(Rect(Screen.width/2-80,331,160,30),"Menu Inicial")){
		//menu.estadoMenu=2;
		//Desativando tudo do jogo
		barco.gameObject.transform.position=posInicial;
		//menu.gameObject.transform.parent=null;
		tempo=0;
		numEstrelas=0;
		gameOver=false;
		ativo=false;
		gameObject.SetActive(false);
		Application.LoadLevel(2);
	}
	
	if(GUI.Button(Rect(Screen.width/2-70,362,140,30),"Sair")){
		Application.Quit();
	}
	

}

function Respawn(){
	barco.gameObject.transform.position=posInicial;
	tempo=0;
	numEstrelas=0;
	gameOver=false;
	ativo=true;
}
