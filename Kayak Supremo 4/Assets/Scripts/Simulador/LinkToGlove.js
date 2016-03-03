#pragma strict
import Ned_API;
var ned:Ned_API;
var text:Texture2D;
var valores:int[];

var mediaAberta:float;
var mediaFechada:float;
var media:float;
function Start () {
	ned.StartConnection("COM5",57600);
	text=new Texture2D(1,1);
	text.SetPixel(1,1,Color(0,0.5,0.6));
	text.Apply();
}

function Update () {
	if(Input.GetKeyDown("a")){
		ned.SendData("#v");
	}
	//valores = valorDedos;
	if(ned.Leitura!=null)
	if(ned.valorDedos.Length>0){
		media=ned.valorDedos[0];
		valores=ned.valorDedos;
	}
}

function OnApplicationQuit(){
	ned.Fechar();
}

function OnGUI(){
	for(var i=0; i<valores.Length;i++){
		GUI.DrawTexture(Rect(i*30,Screen.height-(valores[i]/10),20,valores[i]/10),text);
	}

}