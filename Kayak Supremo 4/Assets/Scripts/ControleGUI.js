var qtdStar : int = 0; // Quantidade de estrelas que o jogador pegou
var qtdStarMax : int = 3; // Quantidade máxima de estrelas que o jogador pode pegar
var distX : float;// Distância entre cada estrela
var textures : Texture2D[]; // Texturas 
var iniciou = true; //Variável que indica se o jogo está  no inicio

function OnGUI(){
	if(!Camera.main.GetComponent(GameOver).ativo){
		for(var i : int = qtdStar;i < qtdStarMax; i++){
			//Desenhando estrelas pretas na GUI
			GUI.Box(Rect(Screen.width*0.05f+i*(Screen.width*0.03f+distX),Screen.height*0.05f,Screen.width*0.03f,Screen.width*0.03f),textures[0]);
		}
		for(i = 0;i < qtdStar; i++){
			//Desenhando estrelas amarelas na GUI
			GUI.Box(Rect(Screen.width*0.05f+i*(Screen.width*0.03f+distX),Screen.height*0.05f,Screen.width*0.03f,Screen.width*0.03f),textures[1]);
		}
	}
	if(iniciou){
		//GUI.DrawTexture(Rect(0,0,Screen.width,Screen.height),Camera.main.GetComponent(GameOver).BG);
	}

}