/* Data de Criação: 01.12.2012 - UpRise 
Programado por: Lucas Cassiano
Este Script cria o efeito de fadeIn/fadeOut no inicio do Jogo;
Na variavel:'SeuMenuInicial' digite object nome da cena que contém o Menu Inicial do seu Jogo;
------------------------------------------------------------------------------------------------ */
#pragma strict
var logo:Texture2D; //Logo da UpRise
var SeuMenuInicial:String ="Digite o nome da cena";
var tempoDeExibicao:float=6.0;
private var alfa:float=0;
private var tamX:float;
private var tamY:float;

function Awake(){
	tamX=Screen.width/2;
	tamY=Screen.height/2;
}

function Start(){
	alfa=0;
	print("UpRise");
	Aparecer();
	Apagar(tempoDeExibicao);
}

function Update(){
	tamX=Screen.width/2;
	tamY=Screen.height/2;
}

function OnGUI(){
	var corAntiga:Color = GUI.color;
	GUI.color=new Color (corAntiga.r, corAntiga.g, corAntiga.b,alfa);
	GUI.DrawTexture(Rect((Screen.width/2)-(tamX/2),(Screen.height/2)-(tamY/2),tamX,tamY),logo,ScaleMode.ScaleToFit,false);
}

function Aparecer(){
	while(alfa<1.0000000){
	alfa+=0.02;
	yield WaitForSeconds(0.01);
	}
	alfa=1;
	yield;
}

function Apagar(tempo){
	yield WaitForSeconds(tempo);
	while(alfa>0.0000000){
	alfa-=0.01; 
	yield WaitForSeconds(0.01);
	}
	alfa=0;
	yield;
	Application.LoadLevel(SeuMenuInicial);
}