#pragma strict

//Interface gráfica
var textAberto:Texture2D;
var textFechado:Texture2D;
var textOk:Texture2D;
var rOk:Rect;
var background:Texture2D;
var textEspera:Texture2D;
var textLoading:Texture2D;
private var time:float=0;

//API de conexão com a luva
var ned:Ned_API;
var nomePorta:String;
//base de Dados
private var baseDados:BaseDados;

//Valores das médias
var mediaAtual:float;
var mediaAberta:float;
var mediaFechada:float;

//Variáveis da calibração
private var calibrado:boolean=false;
private var calibAberta:boolean=false;
private var calibFechada:boolean=false;

//Controle do barco
var barco:BarcoControl;
var jogador:GameObject;

//Se o jogo está em execução
public var jogoIniciado:boolean=false;

//Informações do jogador
public var nStar:int=0;
public var nColi:int=0;
public var matchTime:float; //Tempo em segundos da partida

//Se deve salvar continuamente
public var SaveCont:boolean=false;

function Start () {
	var objBase:GameObject;
	try{
		objBase = GameObject.Find("Data_Base");
		baseDados=objBase.GetComponent(BaseDados);
		nomePorta=baseDados.nomePorta;
	}
	catch(e){
		nomePorta="COM5";
		print(e.Message);
	}
	//Abre a conexão
	ned.StartConnection(nomePorta,57600);
	print("Luva conectada");
	
	//Ajustando botões da interface de configuração
	var tamB=Screen.width*0.1;
	rOk=Rect(Screen.width*0.6,Screen.height*0.75,tamB,tamB);
	
	//Desativando o jogador
	jogador.transform.active=false;
}

function Update () {
	if(ned.ready){
		mediaAtual=ned.mediaDedos;
	}
	else
		time-=Time.deltaTime*200;
	
	if(jogoIniciado){
		barco.entrada=mediaAtual;
	}
	
}

function OnGUI(){
	if(!ned.ready){
		//Tela de Espera
		GUI.DrawTexture(Rect(0,0,Screen.width,Screen.height),textEspera);
		var matriz=GUI.matrix;
		var tam=Screen.width*0.3f;
		var pivot=Vector2(Screen.width*0.5, Screen.height-tam*0.5);
		GUIUtility.RotateAroundPivot(time,pivot);
		GUI.DrawTexture(Rect(Screen.width*0.5-tam*0.5, Screen.height-tam,tam,tam),textLoading);
		GUI.matrix=matriz;
	}
	else{
		//CALIBRANDO
		if(!calibrado){
			Calibrar();
		}
		
	}
}

function Calibrar(){
	//Mão Aberta
	if(!calibAberta && !calibFechada){
		//GUI.DrawTexture(Rect(0,0,Screen.width,Screen.height),background);
		GUI.DrawTexture(Rect(0,0,Screen.width,Screen.height),textAberto);
		if(rOk.Contains(Event.current.mousePosition)){ //OK
			GUI.DrawTexture(Rect(0,0,Screen.width,Screen.height),textOk);
			if(Input.GetMouseButtonUp(0)){
				mediaAberta = ned.SetMediaAberta();
				ned.SetAbertos();
				print("alocou os valores da mao aberta");
				calibAberta=true;
			}
		}	
	}
	//Mão Fechada
	else if(calibAberta && !calibFechada){
		//GUI.DrawTexture(Rect(0,0,Screen.width,Screen.height),background);
		GUI.DrawTexture(Rect(0,0,Screen.width,Screen.height),textFechado);
		if(rOk.Contains(Event.current.mousePosition)){
			GUI.DrawTexture(Rect(0,0,Screen.width,Screen.height),textOk);
			if(Input.GetMouseButtonDown(0)){
				mediaFechada = ned.SetMediaFechada();
				ned.SetFechados();
				print("alocou os valores da mao fechada");
				calibFechada=true;
			}
		}	
	
	}
	
	else{
		calibrado=true;
		IniciarJogo();
	}
}

function IniciarJogo(){
	barco.media = (mediaAberta+mediaFechada)/2;
	//Desativando o jogador
	jogador.transform.active=true;
	jogoIniciado=true;
	barco.ativo=true;
	//Salvar Dados Continuamente
	SaveCont=true;
}

function Vibrar(){
	ned.SendData("#v");
}


//baseDados.SalvarDados(valorDedosAbertos:int[],valorDedosFechados:int[],nStars:int,nColi:int,matchTime:float)
function SalvarDadosPartida(nS:int, nC:int, mT:float){
	baseDados.SalvarDados(ned.mediaMax,ned.mediaMin,ned.flexoExt,nS,nC,mT);
	print("Valores à serem salvos foram enviados à Base de Dados");
}


while(true){
	if(SaveCont){
		baseDados.SalvarDadosCotinuos(ned.valorDedos);
		yield WaitForSeconds(1);
	}

	yield;
}