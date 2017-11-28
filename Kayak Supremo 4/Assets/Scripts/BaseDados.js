import System;
import System.IO;

#pragma strict
//Jogador Info
var nomeJogador:String;
var codigoJogador:String;
var nomePorta:String;
var onlyKeyboard:boolean;

//Data e Hora
var hora:System.DateTime;
var patch:String;

function Awake () {
	DontDestroyOnLoad (transform.gameObject);
}

function CheckData(cod:String){
	patch="User Status/"+cod;
	var folder: DirectoryInfo = new DirectoryInfo(Application.dataPath);
	
	if(File.Exists(folder.Parent + "/" + patch +".rsp")){
			
	}
	else{
		fileManager.SaveTextFile(patch,nomeJogador+"@");
		
	}

}

function CheckUser(cod:String):boolean{
	patch="User Status/"+cod;
	var folder: DirectoryInfo = new DirectoryInfo(Application.dataPath);
	
	if(Directory.Exists(folder.Parent+"/User Status")){
	
	}
	else
		Directory.CreateDirectory(folder.Parent+"/User Status");
	
	if(File.Exists(folder.Parent + "/" + patch +".rsp")){
			return true;
	}
	else{
		return false;
		
	}

}

function CheckFolder(name:String):boolean{
	if(Directory.Exists(name)){
		return true;
	}
	else{
		Directory.CreateDirectory(name);
		return false;
	}

}

function CheckContData(name:String){
	var folder: DirectoryInfo = new DirectoryInfo(Application.dataPath);
	var contPath:String="User Status/Continuo";
	
	if(File.Exists(folder.Parent+"/"+contPath + "/" + name +".rsp")){
			
	}
	else{
		fileManager.SaveTextFile("User Status/Continuo"+"/" + name,nomeJogador+"@"+Environment.NewLine);
		
	}

}


function Update(){
	if(Network.isServer &&Network.connections.Length>0){
		//NetworkView.
	}
	hora=System.DateTime.Now;
}


function SalvarDados(mediaMax:int, mediaMin:int, flexExt:int,nStars:int,nColi:int,matchTime:float){
	//Dedos Abertos
	CheckData(codigoJogador);
	patch="User Status/"+codigoJogador;

	var newHora:String=System.DateTime.Now.ToString("hh:mm:ss");
	var newDia:String=System.DateTime.Now.ToString("dd/MM/yyyy"); 
	
	var newLine = "$"+newDia+" "+newHora+"#"+mediaMax+","+mediaMin+","+flexExt+","+nStars+","+nColi+","+matchTime+Environment.NewLine;
	fileManager.AddLine(patch,newLine);

}

function SalvarDadosCotinuos(valorDedos:int[]){
	patch="User Status/"+codigoJogador;
	var folder: DirectoryInfo = new DirectoryInfo(Application.dataPath);
	
	var contPath:String="User Status"+"/Continuo";
	var checkFolder=folder+"/"+contPath;
	
	CheckFolder(checkFolder);
	//Alocando valores
	var stDedos:String="";
	for(var i=0; i<valorDedos.Length; i++){
		stDedos+=valorDedos[i].ToString();
		if(i!=valorDedos.Length-1){
			stDedos+=",";
		}
	}
	//Criando nome do Arquivo
	var horaMin:String=System.DateTime.Now.ToString("hh mm");
	var dia:String=System.DateTime.Now.ToString("dd MM yyyy"); 
	var contFileName:String=contPath+"/"+codigoJogador+" "+dia+" "+horaMin;
	var checkFile:String=codigoJogador+" "+dia+" "+horaMin;
	//Checando se o arquivo existe
	CheckContData(checkFile);
	//Salvando Dados no arquivo
	var newHora:String=System.DateTime.Now.ToString("hh:mm:ss");
	var newDia:String=System.DateTime.Now.ToString("dd/MM/yyyy"); 
	var newLine = "$"+newDia+" "+newHora+"#"+stDedos+Environment.NewLine;
	fileManager.AddLine(contFileName,newLine);
	
}

//NED_CLIPBOARD

function enviarDados(){
	
	
}

@RPC
function receberDados(){
	


}
