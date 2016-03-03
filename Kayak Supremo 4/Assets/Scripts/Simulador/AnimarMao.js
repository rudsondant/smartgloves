#pragma strict
var Polegar:GameObject[];
var Indicador:GameObject[];
var Medio:GameObject[];
var Anelar:GameObject[];
var Mindinho:GameObject[];
//Valores da Calibração
var maoAberta:int[];
var maoFechada:int[];

var angulos:float[];
var animar:boolean;

var ned:Ned_API;

function Start(){
	//ned.StartConnection("COM5",57600);
	angulos= new float[5];
}
function Update () {
	if(animar){
		angulos = ned.anguloDedos;
		ned.lerAngulos=true;
		Animar();
	}
	if(Input.GetKeyDown("z")){
		ned.SetAbertos();
	}
	if(Input.GetKeyDown("x")){
		ned.SetFechados();
	}

}

function Animar(){
	Polegar[0].transform.localEulerAngles.y=angulos[0];
	Polegar[1].transform.localEulerAngles.y=angulos[0];
	Polegar[2].transform.localEulerAngles.y=angulos[0];

	Indicador[0].transform.localEulerAngles.x=angulos[1];
	Indicador[1].transform.localEulerAngles.x=angulos[1];
	Indicador[2].transform.localEulerAngles.x=angulos[1];
	
	Medio[0].transform.localEulerAngles.x=angulos[2];
	Medio[1].transform.localEulerAngles.x=angulos[2];
	Medio[2].transform.localEulerAngles.x=angulos[2];
	
	Anelar[0].transform.localEulerAngles.x=angulos[3];
	Anelar[1].transform.localEulerAngles.x=angulos[3];
	Anelar[2].transform.localEulerAngles.x=angulos[3];
	
	//Anelar[0].transform.localEulerAngles.x=angulos[3];
	//Anelar[1].transform.localEulerAngles.x=angulos[3];
	//Anelar[2].transform.localEulerAngles.x=angulos[3];
}