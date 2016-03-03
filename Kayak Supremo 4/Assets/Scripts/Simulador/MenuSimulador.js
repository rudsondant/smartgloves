#pragma strict

//API de conexão com a luva
var ned:Ned_API;
var nomePorta:String;
//base de Dados
private var baseDados:BaseDados;



//Recs texture
private var text:Texture2D;

//Tempo
private var t:float;

//**Elementos de GUI**-----------
var skin:GUISkin;
//#Tela de Espera
var waitScreen:Texture2D;
var waitBar:Texture2D;
//#Barra de ferramentas
var base:Texture2D;
var ativo:Texture2D[];
private var button:Rect[];
var starter:Texture2D;
private var Rstarter:Rect;
private var RTrigger:Rect;
private var animado:boolean=false;
private var posBar:float=0;
//Icones da barra de ferramentas
private var selected:boolean[];
/*-------------
0-Graficos
1-Configuracoes
2-MoverCamera
3-Screenshot
4-Angulos
-------------*/

//#Elementos Menu Gráficos
private var windowGraficos:Rect= Rect (20,20, 290, 340);
var windowBackGraficos:Texture2D;
var backGraph:Texture2D;
private var g1:DynamicGraph; //Gráfico polegar
private var g2:DynamicGraph; //Gráfico indicador
private var g3:DynamicGraph; //Gráfico médio
private var g4:DynamicGraph; //Gráfico anelar
var lineColor:Color; //Cor das linhas

//Mão
var hand:AnimarMao;

function Start () {
	//Inicializando a NED Data Glove*-------------------
	var objBase:GameObject;
	var nomePorta:String;
	try{
		objBase = GameObject.Find("Data_Base");
		baseDados=objBase.GetComponent(BaseDados);
		nomePorta=baseDados.nomePorta;
	}
	catch(e){
		nomePorta="COM5";
		print(e.Message);
	}
	//Abre a conexão a 57600 bauds
	ned.StartConnection(nomePorta,57600);
	print("Luva conectada");
	//--------------------------------------------------
	
	//***Teste para posicionar os Rects
	text=new Texture2D(1,1);
	text.SetPixel(1,1,Color(0,0.5,0.6,0.8));
	text.Apply();
	
	//Rects
	button = new Rect[6];
	var tamB=Screen.width*0.09;
	Rstarter=Rect(Screen.width*0.97,Screen.height*0.5-tamB*0.15,tamB*0.3,tamB*0.3);
	RTrigger=Rect(Screen.width*0.91,0,tamB,Screen.height);
	button[0]=Rect(Screen.width*0.91,Screen.height*0.13,tamB,tamB);
	button[1]=Rect(Screen.width*0.91,Screen.height*0.28,tamB,tamB);
	button[2]=Rect(Screen.width*0.91,Screen.height*0.435,tamB,tamB);
	button[3]=Rect(Screen.width*0.91,Screen.height*0.585,tamB,tamB);
	button[4]=Rect(Screen.width*0.91,Screen.height*0.735,tamB,tamB);
	button[5]=Rect(Screen.width*0.91,Screen.height*0.87,tamB,tamB*0.7);
	
	//Definindo o selected
	selected=new boolean[5];
	for(var i=0; i<selected.Length; i++){
		selected[i]=false;
	}
	

}

function Update(){
	t+=Time.deltaTime;


}

function OnGUI(){
	GUI.skin=skin;
	if(!ned.ready){ //Tela inicial de Espera
		WaitScreen();			
	}
	else{
		AllowMenu();
		ShowWindows();
	}
}

//#Tela de Espera
function WaitScreen(){
	GUI.DrawTexture(Rect(0,0,Screen.width,Screen.height),waitScreen);
	GUI.DrawTexture(Rect(0,0,(t*Screen.width)/2,Screen.height),waitBar);
}

//#Iniciar menu lateral (+ Animação)
function AllowMenu(){
	var tamB=Screen.width*0.09;
	var veloc:float=1.2;
	if(RTrigger.Contains(Event.current.mousePosition)){
		//Animando
		print("Animando menu inicial");
		if(tamB-t*veloc*tamB>0)
			posBar=tamB-t*veloc*tamB;
		else{
			posBar=0;
		}
		GUI.BeginGroup (Rect(posBar, 0, Screen.width, Screen.height));
		MenuLateral();
		GUI.EndGroup();
	}
	else{
		posBar=tamB;
		t=0;
		GUI.DrawTexture(Rstarter,starter);
		
	}

}

function MenuLateral(){

	GUI.DrawTexture(Rect(0,0,Screen.width,Screen.height),base); //Background
	
	if(button[0].Contains(Event.current.mousePosition)){ //Graph
		GUI.DrawTexture(Rect(0,0,Screen.width,Screen.height),ativo[0]);
		if(Input.GetMouseButton(0)){
			selected[0]=true;
		}
	}
			
	else if(button[1].Contains(Event.current.mousePosition)){ //Settings
		GUI.DrawTexture(Rect(0,0,Screen.width,Screen.height),ativo[1]);
		if(Input.GetMouseButton(0)){
			selected[1]=!selected[1];
		}
	}
			
	if(button[2].Contains(Event.current.mousePosition)){ //camera
		GUI.DrawTexture(Rect(0,0,Screen.width,Screen.height),ativo[2]);
		if(Input.GetMouseButton(0)){
			selected[2]=!selected[2];
		}
	}
			
	if(button[3].Contains(Event.current.mousePosition)){ //SS
		GUI.DrawTexture(Rect(0,0,Screen.width,Screen.height),ativo[3]);
		if(Input.GetMouseButton(0)){
			selected[3]=true;
		}
	}
	
	if(button[4].Contains(Event.current.mousePosition)){ //Angles
		GUI.DrawTexture(Rect(0,0,Screen.width,Screen.height),ativo[4]);
		if(Input.GetMouseButton(0)){
			selected[4]=!selected[4];
		}
	}
	
	if(button[5].Contains(Event.current.mousePosition)){ //Back
		GUI.DrawTexture(Rect(0,0,Screen.width,Screen.height),ativo[5]);
		if(Input.GetMouseButton(0)){
			print("Back_Load last level");
			ned.Fechar();
			Application.LoadLevel(2); //Volta pro menu inicial
		}
	}
	
}

function ShowWindows(){
	//Acionando as funções de cada botão
	if(selected[0]){	
		windowGraficos = GUI.Window (0, windowGraficos, Graficos, "---");	
	}	
	if(selected[1]){	
		Configuracoes();	
	}


}


function Graficos(windowID : int){
	GUI.DragWindow (Rect (0,0, 10000, 20));
	if(!g1)
		IniciarGraficos();
	GUI.DrawTexture(Rect(0,0,290,340),windowBackGraficos);
	//Fechar
	skin.button.fontSize=10;
	if(GUI.Button(Rect(239,319,40,20),"Ok")){
		selected[0]=false;
		print("fechou");
	}
	skin.label.fontSize=14;
	var alinhamento=skin.label.alignment;
	skin.label.alignment=TextAnchor.MiddleCenter;
	//GUI.Label(Rect(0,0,260,20),"Gráficos de leitura");
	skin.label.alignment=TextAnchor.UpperLeft;
	//Background dos gráficos
	GUI.DrawTexture(Rect(5,25,290,80),backGraph);
	GUI.DrawTexture(Rect(5,100,290,80),backGraph);
	GUI.DrawTexture(Rect(5,175,290,80),backGraph);
	GUI.DrawTexture(Rect(5,250,290,80),backGraph);
	if(g1)
		GUI.DrawTexture(Rect(5,25,250,50),g1.texture);
	if(g2)
		GUI.DrawTexture(Rect(5,100,250,50),g2.texture);
	if(g3)
		GUI.DrawTexture(Rect(5,175,250,50),g3.texture);
	if(g4)
		GUI.DrawTexture(Rect(5,250,250,50),g4.texture);
	
	//Rótulo dos gráficos
	var tCor=skin.label.normal.textColor;
	skin.label.normal.textColor=Color.white;
	skin.label.fontSize=12;
	GUI.Label(Rect(10,25,260,20),"Polegar");
	GUI.Label(Rect(10,100,260,20),"Indicador");
	GUI.Label(Rect(10,175,260,20),"Médio");
	GUI.Label(Rect(10,250,260,20),"Anelar");
	/* Já esta embutida na textura
	skin.label.normal.textColor=tCor;
	skin.label.fontSize=11;
	//GUIUtility.RotateAroundPivot(
	//rotulos
	GUI.Label(Rect(255,16,260,20),"-90°");
	GUI.Label(Rect(255,65,260,20),"-0°");
	
	GUI.Label(Rect(255,85,260,20),"-90°");
	GUI.Label(Rect(255,135,260,20),"-0°");
	
	GUI.Label(Rect(255,154,260,20),"-90°");
	GUI.Label(Rect(255,205,260,20),"-0°");
	
	GUI.Label(Rect(255,226,260,20),"-90°");
	GUI.Label(Rect(255,275,260,20),"-0°");
	skin.label.fontSize=12;
	skin.label.alignment=TextAnchor.UpperCenter;
	GUI.Label(Rect(5,72,250,20),"Tempo (10² ms)");
	GUI.Label(Rect(5,142,250,20),"Tempo (10² ms)");
	GUI.Label(Rect(5,212,250,20),"Tempo (10² ms)");
	GUI.Label(Rect(5,282,250,20),"Tempo (10² ms)");
	skin.label.alignment=TextAnchor.UpperLeft;
	*/ 
}

function IniciarGraficos(){
	//Inicializando gráficos
	g1=DynamicGraph.Begin("Graph#1"); //Polegar
	g1.Create(250,50,Color(0,0,0,0),lineColor,300);
	g2=DynamicGraph.Begin("Graph#2"); //Indicador
	g2.Create(250,50,Color(0,0,0,0),lineColor,300);
	g3=DynamicGraph.Begin("Graph#3"); //Medio
	g3.Create(250,50,Color(0,0,0,0),lineColor,300);
	g4=DynamicGraph.Begin("Graph#4");	//Anelar
	g4.Create(250,50,Color(0,0,0,0),lineColor,300);
}

//Inserindo e atualizando o gráfico
while(true){
	if(!g1) //Inicializando os gráficos
		IniciarGraficos();
	else{
		if(ned.valorDedos.Length>=4){
			g1.Add(ned.valorDedos[0]-780,false);
			g2.Add(ned.valorDedos[1]-780,false);
			g3.Add(ned.valorDedos[2]-700,false);
			g4.Add(ned.valorDedos[3]-700,false);
		}
	}
	yield WaitForSeconds(0.1);
}
function Configuracoes(){

	


}

