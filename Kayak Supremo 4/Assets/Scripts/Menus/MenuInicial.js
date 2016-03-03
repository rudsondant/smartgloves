#pragma strict
//Se está ativo ou não
public var enable:boolean=true;

//base
var background:Texture2D;
var normal:Texture2D;
var circle:Texture2D;
var icon:Texture2D[];

//Animação Inicial
var animou:boolean=false;
private var scale:Vector2; //Scale
var rot:float;
private var fator:int=1;
private var pivot:Vector2;
var t:float;
private var cor:Color;

//Matriz GUI original
private var matriz:Matrix4x4;
private var gColor:Color;

//Data e Hora
var hora:System.DateTime;



//Botões
private var rPlay:Rect;
private var rSettings:Rect;
private var rHand:Rect;

//Outros Objetos
var settings:Settings;


function Start () {
	pivot=Vector2(Screen.width/2,Screen.height/2);
	scale=Vector2(3,3);
	matriz=GUI.matrix;
	gColor=GUI.color;
	cor=new Color(1,1,1,0);
	rot=-45;
	
	//Botões
	var tamB=Screen.width*0.17;
	rPlay=Rect(Screen.width*0.5-tamB/2,Screen.height*0.05,tamB,tamB);
	rHand=Rect(Screen.width*0.25-tamB/2,Screen.height*0.53,tamB,tamB);
	rSettings=Rect(Screen.width*0.75-tamB/2,Screen.height*0.53,tamB,tamB);
	
	//Indexando Objetos
	settings=gameObject.GetComponent(Settings);
	
	//Abrindo Servidor
	Network.InitializeServer(2, 25000);

}

function Update () {
	t+=Time.deltaTime;
	if(!animou){
		Animar();
	}

	if(rot<0){
		rot+=Time.deltaTime*15;
	}
	else{
		rot=0;
	}
	rot=0;
	hora=System.DateTime.Now;
	//print(hora);

}

function OnGUI(){
	if(enable){
		GUI.color=cor;
		matriz=GUI.matrix;
		GUI.DrawTexture(Rect(0,0,Screen.width,Screen.height),background);
		GUIUtility.ScaleAroundPivot (scale, pivot); 
		GUI.color=cor;
		GUI.DrawTexture(Rect(0,0,Screen.width,Screen.height),normal);
		GUI.matrix=matriz;
		GUIUtility.RotateAroundPivot(rot,pivot); 
		GUI.DrawTexture(Rect(0,0,Screen.width,Screen.height),circle);
		GUI.matrix=matriz;
		GUI.color=cor;
		//Hora
		GUI.color=Color(1,1,1,1);
		GUI.skin.label.normal.textColor=Color(1,1,1,0.5);
		GUI.skin.label.fontSize=25;
		GUI.skin.label.alignment=TextAnchor.UpperLeft;
		GUI.Label(Rect(Screen.width-270,Screen.height-30,400,40),hora.ToString());
		
		//Botões ativos
		if(animou){
			//PLAY
			if(rPlay.Contains(Event.current.mousePosition)){
				GUI.DrawTexture(Rect(0,0,Screen.width,Screen.height),icon[0]);
				GUI.skin.label.alignment=TextAnchor.MiddleCenter;
				GUI.skin.label.fontSize=Screen.width/25;
				GUI.Label(Rect(0,Screen.height*0.2,Screen.width,Screen.height),"Jogar");
				GUI.DrawTexture(Rect(0,0,Screen.width,Screen.height),icon[3]);
				if(Input.GetMouseButton(0)){
					print("Load Game");
					Application.LoadLevel(1);
				}
			}
			//SIMULATOR_HAND
			else if(rHand.Contains(Event.current.mousePosition)){
				GUI.DrawTexture(Rect(0,0,Screen.width,Screen.height),icon[2]);
				GUI.skin.label.alignment=TextAnchor.MiddleCenter;
				GUI.skin.label.fontSize=Screen.width/25;
				GUI.Label(Rect(0,0,Screen.width,Screen.height),"Simulador");
				if(Input.GetMouseButton(0)){
					print("Load Hand");
					Application.LoadLevel(3);
				}
			}
			//SETTINGS
			else if(rSettings.Contains(Event.current.mousePosition)){
				GUI.DrawTexture(Rect(0,0,Screen.width,Screen.height),icon[1]);
				GUI.skin.label.alignment=TextAnchor.MiddleCenter;
				GUI.skin.label.fontSize=Screen.width/25;
				GUI.Label(Rect(0,0,Screen.width,Screen.height),"Configurações");
				if(Input.GetMouseButton(0)){
					print("Load Settings");
					settings.enable=true;
					enable=false;
				}
			}	
		}
	}
}

function Animar(){
	scale.x-=t*0.05;
	scale.y-=t*0.05;
	cor.a+=t*0.05;
	if(scale.x<=1){
		scale=Vector2(1,1);
		cor.a=1;
		animou=true;
	}
}