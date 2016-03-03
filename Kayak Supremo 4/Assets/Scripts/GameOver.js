#pragma strict
public var venceu:boolean=false;
public var ativo:boolean=false;
var tempo:float;
var tempoFinal:float;
var pegouTempo:boolean=false;
var Estilo:GUISkin;
var BG: Texture2D;

function Update () {
	tempo= Time.timeSinceLevelLoad;
	
	if(ativo==true && pegouTempo==false){
		tempoFinal=tempo;
		pegouTempo=true;
	}
}

function OnGUI(){
GUI.skin=Estilo;
//Estilo.label.fontSize=20;
//Estilo.button.fontSize=20;
Estilo.label.fontSize=Screen.width*0.017f;
Estilo.button.fontSize=Screen.width*0.017f;

	if(ativo){
		GUI.DrawTexture(Rect(0,0,Screen.width,Screen.height),BG);
		GUI.Label(Rect((Screen.width/2)-Screen.width*0.15f,(Screen.height/2)-Screen.height*0.2f,Screen.width*0.3f,Screen.width*0.07f),"Tempo de Jogo:");
		GUI.Label(Rect((Screen.width/2)-Screen.width*0.15f,(Screen.height/2)-Screen.height*0.04f,Screen.width*0.3f,Screen.width*0.04f),"Segundos");
		Estilo.label.fontSize=Screen.width*0.034f;
		GUI.Box(Rect((Screen.width/2)-Screen.width*0.1f,(Screen.height/2)-Screen.height*0.1f,Screen.width*0.2f,Screen.width*0.04f),"");
		GUI.Label(Rect((Screen.width/2)-Screen.width*0.15f,(Screen.height/2)-Screen.height*0.1f,Screen.width*0.3f,Screen.width*0.04f),""+ tempoFinal);
		if(venceu){
			GUI.Label(Rect((Screen.width/2)-Screen.width*0.15f,(Screen.height/2)-Screen.height*0.23f,Screen.width*0.3f,Screen.width*0.04f),"Você Venceu!");
		}
		for(var i : int = gameObject.GetComponent(ControleGUI).qtdStar;i < gameObject.GetComponent(ControleGUI).qtdStarMax; i++){
			GUI.Box(Rect((Screen.width/2)-Screen.width*0.075f+i*Screen.width*0.05f,(Screen.height/2)+Screen.height*0.08f,Screen.width*0.05f,Screen.width*0.05f),gameObject.GetComponent(ControleGUI).textures[0]);//Estrela preta
		}
		for(i = 0;i < gameObject.GetComponent(ControleGUI).qtdStar; i++){
			GUI.Box(Rect((Screen.width/2)-Screen.width*0.075f+i*Screen.width*0.05f,(Screen.height/2)+Screen.height*0.08f,Screen.width*0.05f,Screen.width*0.05f),gameObject.GetComponent(ControleGUI).textures[1]);//Estrela amarela
		}

		
		Time.timeScale=0;
		if(GUI.Button(Rect((Screen.width/2)-Screen.width*0.075f,Screen.height*0.87,Screen.width*0.15f,Screen.width*0.05f),"Jogar Mais!")){
			Time.timeScale=1;
			Application.LoadLevel(Application.loadedLevel);
			ativo=false;
			
		}
	}
	
	
	


}