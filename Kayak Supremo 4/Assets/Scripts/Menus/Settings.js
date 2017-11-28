#pragma strict
public var enable:boolean=false;
var background:Texture2D;
var bOk:Texture2D; //Button "Ok"
private var rOk:Rect;

var skin:GUISkin;

//Outros Objetos
var menuInicial:MenuInicial;
var tamB2:Vector2;
var bancoDados:BaseDados;

//Serial Port
public var nomePorta:String="COM5";
private var numPorta:int=0;

//Jogador
private var nomeJogador:String="Lucas";
private var codigoJogador:String="#001";

private var onlyKeyboard = true;

function Start () {
	tamB2=new Vector2(Screen.width*0.1,Screen.width*0.04);
	var tamB=Screen.width*0.13;
	rOk=Rect(Screen.width*0.5-tamB/2,Screen.height*0.87,tamB,tamB);
	
	//Indexando Objetos
	menuInicial=gameObject.GetComponent(MenuInicial);
	if(Carregar()!=null){
		nomePorta=Carregar();
		bancoDados.nomePorta=nomePorta;
	}
	if(CarregarCodigo()!=null){
		codigoJogador=CarregarCodigo();
		bancoDados.codigoJogador=codigoJogador;
	}
	if(CarregarNome()!=null){
		nomeJogador=CarregarNome();
		bancoDados.nomeJogador=nomeJogador;
	}
	if(CarregarOnlyKeyboard()!=null){
		onlyKeyboard=CarregarOnlyKeyboard();
		bancoDados.onlyKeyboard=onlyKeyboard;
	}

}

function Update () {
	
}

function OnGUI(){
	if(enable){
		var fontSize : int = 18;
		var fieldSize : int = 26;

		GUI.skin=skin;
		GUI.DrawTexture(Rect(0,0,Screen.width,Screen.height),background);
		GUI.skin.label.normal.textColor=Color(0.15,0.15,0.15,1);
		GUI.skin.label.alignment=TextAnchor.UpperCenter;
		GUI.skin.label.fontSize=fontSize;
		GUI.skin.textField.fontSize=fontSize;
		GUI.skin.button.fontSize=fontSize;
		GUI.Label(Rect(0,Screen.height*0.02,Screen.width,Screen.width),"Configurações");
		GUI.skin.label.fontSize=fontSize;
		GUI.skin.label.alignment=TextAnchor.UpperLeft;

		//OK
		if(rOk.Contains(Event.current.mousePosition)){
				GUI.DrawTexture(Rect(0,0,Screen.width,Screen.height),bOk);
				if(Input.GetMouseButton(0)){
					print("Menu Inicial");
					menuInicial.enable=true;
					enable=false;
					SalvarPorta(nomePorta);
					//Dados do jogador
					SalvarCodigo(codigoJogador);
					SalvarNome(nomeJogador);
					bancoDados.codigoJogador=codigoJogador;
					bancoDados.nomeJogador=nomeJogador;
					bancoDados.CheckData(codigoJogador);
				}
		}
		
		//Serial Port
		//GUI.Button(Rect(Screen.width*0.1,Screen.height*0.1,tamB2.x,tamB2.y),"COM");
		GUI.Label(Rect(Screen.width*0.1,Screen.height*0.1,Screen.width,tamB2.y),"--------SerialPort---------");
		//nomePorta=GUI.TextField(Rect(Screen.width*0.1,Screen.height*0.2,tamB2.x,tamB2.y),nomePorta,6);
		GUI.Label(Rect(Screen.width*0.1,Screen.height*0.15,2*tamB2.x,tamB2.y),"Disponíveis:");
		//Portas disponíveis
		var portasDisponiveis:String[]= PortaSerial.PortasDisponiveisString();
		 numPorta = GUI.SelectionGrid (Rect (Screen.width*0.1, Screen.height*0.2, tamB2.x, tamB2.y*portasDisponiveis.Length),numPorta, portasDisponiveis, 1);
		 
		 //Porta Selecionada
		 GUI.Label(Rect(Screen.width*0.25,Screen.height*0.15,2*tamB2.x,tamB2.y),"Selecionada:");
		 GUI.Label(Rect(Screen.width*0.25,Screen.height*0.2,2*tamB2.x,tamB2.y),nomePorta);
		 if(GUI.Button(Rect(Screen.width*0.25,Screen.height*0.2+tamB2.y,tamB2.x,tamB2.y),"Alterar")){
		 	nomePorta= portasDisponiveis[numPorta];
		 	bancoDados.nomePorta=nomePorta;
		 }
		 if(GUI.Button(Rect(Screen.width*0.36,Screen.height*0.2+tamB2.y,tamB2.x,tamB2.y),"Vibrar")){
		 	//PortaSerial.TesteDeHardware(nomePorta,"#vv\n");
		 }
		//IP
		GUI.Label(Rect(Screen.width*0.5,Screen.height*0.1,Screen.width,Screen.width),"--Conexão com NED_ClipBoard*--");
		var ip=Network.player.ipAddress;
		GUI.skin.label.fontSize=fontSize;
		GUI.Label(Rect(Screen.width*0.5,Screen.height*0.15,Screen.width,Screen.width),ip);
		GUI.skin.label.fontSize=fontSize;
		GUI.Label(Rect(Screen.width*0.5,Screen.height*0.23,Screen.width,Screen.width),"Conectados: "+Network.connections.Length);
		
		//JOGADOR
		GUI.Label(Rect(Screen.width*0.5,Screen.height*0.3,Screen.width,Screen.width),"-------Dados do Jogador-------");
		//Nome Jogador
		GUI.Label(Rect(Screen.width*0.5,Screen.height*0.35,Screen.width,Screen.width),"Nome:");
		nomeJogador=GUI.TextField(Rect(Screen.width*0.58,Screen.height*0.35,Screen.width*0.35,fieldSize),nomeJogador,30);
		GUI.Label(Rect(Screen.width*0.5,Screen.height*0.4,Screen.width,Screen.width),"Código:");
		codigoJogador=GUI.TextField(Rect(Screen.width*0.58,Screen.height*0.4,tamB2.x,fieldSize),codigoJogador,6);
		if(!bancoDados.CheckUser(codigoJogador))
		if(GUI.Button(Rect(Screen.width*0.69,Screen.height*0.41,Screen.width*0.2,tamB2.y),"Cadastra Novo")){
			SalvarCodigo(codigoJogador);
			SalvarNome(nomeJogador);
			bancoDados.codigoJogador=codigoJogador;
			bancoDados.nomeJogador=nomeJogador;
			bancoDados.CheckData(codigoJogador);
		}
		
		//HARDWARE
		GUI.Label(Rect(Screen.width*0.5,Screen.height*0.5,Screen.width,Screen.width),"-------Ajuda-------");
		GUI.Button(Rect(Screen.width*0.5,Screen.height*0.55,Screen.width*0.2,tamB2.y),"Desenvolvedor");
		GUI.Button(Rect(Screen.width*0.5,Screen.height*0.56+tamB2.y,Screen.width*0.2,tamB2.y),"Manual Luva");
		GUI.Button(Rect(Screen.width*0.5,Screen.height*0.57+tamB2.y*2,Screen.width*0.2,tamB2.y),"Guia rápido");

		//Ativar TEAMBRIDGE luva
		GUI.skin.toggle.fontSize=fontSize;
		onlyKeyboard = GUI.Toggle(Rect(Screen.width*0.1,Screen.height*0.5, 400, fieldSize), onlyKeyboard, "Via TEAMBridge (Apenas o teclado é abilitado).");
		bancoDados.onlyKeyboard=onlyKeyboard;
		SalvarOnlyKeyboard(onlyKeyboard);
	}	

}

function SalvarPorta(valor:String){
	PlayerPrefs.SetString("nomePortaSerial", valor);
}

function Carregar(){
	var valor:String=null;
	try{
	valor=PlayerPrefs.GetString("nomePortaSerial");
	}
	catch(e){
		valor=null;
	}
	return valor;
}

function SalvarCodigo(valor:String){
	PlayerPrefs.SetString("codigoJogador", valor);
}



function CarregarCodigo(){
	var valor:String=null;
	try{
	valor=PlayerPrefs.GetString("codigoJogador");
	}
	catch(e){
		valor=null;
	}
	return valor;
}

function SalvarNome(valor:String){
	PlayerPrefs.SetString(codigoJogador+"nome", valor);


}

function CarregarNome(){
	var valor:String=null;
	try{
	valor=PlayerPrefs.GetString(codigoJogador+"nome");
	}
	catch(e){
		valor=null;
	}
	return valor;

}


function SalvarOnlyKeyboard(valor:boolean){
	PlayerPrefs.SetInt("onlyKeyboard", valor?1:0);
}

function CarregarOnlyKeyboard(){
	var valor:boolean=false;
	try{
		valor = PlayerPrefs.GetInt("onlyKeyboard")?true:false;
	}
	catch(e){
		valor=false;
	}
	return valor;

}

