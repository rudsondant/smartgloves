import System.IO;
#pragma strict

private var width: int = 500; // texture width
private var height: int = 100; // texture height

var backgroundColor: Color = Color.black;
var lineColor: Color = Color.green;
private var larguraLinha:int=2;

public var texture: Texture2D;
private var blankTexture:Texture2D;
private var blank:Color[];
public var x:Array;

//Limite vertical (escala em Y)
private var yMax:int;



//Cria um objeto na cena com este script, podendo assim criar vários gráficos na tela
static function Begin():DynamicGraph{ return Begin("Dynamic_Graph");}
static function Begin(nome:String):DynamicGraph{
	//Objeto de jogo que conterá o script
	var objeto:GameObject;
	objeto = new GameObject();
	objeto.name=nome;
	objeto.AddComponent("DynamicGraph");
	var script:DynamicGraph= objeto.GetComponent(DynamicGraph);
	return script;
}


//Iniciar Grafico dinamico (tamanho,cores,linha,tipo)
function Create(w:int, h:int,bC:Color,lC:Color,limY:int):Texture2D{
	width=w;
	height=h;
	backgroundColor=bC;
	lineColor=lC;
	yMax=limY;
	x= new Array();
	x.length=w;
	print(x.length);
	// Criando Textura
  	texture = new Texture2D(width, height);
  	blankTexture =new Texture2D(width, height);
  	
	blank = new Color[width * height]; //Preenchendo o vetor limpo
  	for (var pixel in blank){
   	 pixel = backgroundColor;
  	}
  	texture.SetPixels(blank,0);
  	for(var i=0; i<x.length;i++){
  		x[i]=0;
		texture.SetPixel(i, x[i], lineColor);
		print(i);
	}
	texture.Apply();
	return texture;
}
//Desenhar gráfico

function Add(nPoint:float):Texture2D{ return Add(nPoint,false);}
function Add(nPoint:float, doUnder:boolean):Texture2D{
	x.RemoveAt(0);
	x.Add(nPoint);
	print(x.length);
	texture.SetPixels(blank,0);
	//texture.Apply();
	for(var i=0; i<x.length;i++){
		//Convertendo para valores dentro da escala definida pelo Y Max;
		var y:float= x[i];
		var rY:float= ((y*(height))/yMax);
		if(rY>height-1)
			rY=height-1;
		else if (rY<0)
			rY=0;
		texture.SetPixel(i, rY, lineColor);
		if(doUnder){
			for(var j=0; j<rY; j++){
				texture.SetPixel(i, j, lineColor);
			
			}
		}
		else{ //Espessura da linha
			for (var ia = 0; ia < larguraLinha; ia++){
				if(rY+ia<=height-1)
					texture.SetPixel(i, rY+ia, lineColor);
				if(rY-ia>=0){
					texture.SetPixel(i, rY-ia, lineColor);
				}
			}
		
		}
	}
	texture.Apply();
	return texture;
}
	//Adicionar novos pontos
	//Calcular posição relativa
