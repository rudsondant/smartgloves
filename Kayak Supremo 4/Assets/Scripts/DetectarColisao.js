#pragma strict
//var cameraPrincipal=GameObject.Find("Main Camera");

function OnCollisionEnter(collision : Collision) {
    if (collision.transform.tag == "Chegada"){ //Quando o barco ultrapassar chegada, o jogador vence e o Game Over fica ativo
       Camera.main.GetComponent(GameOver).venceu=true;
       Camera.main.GetComponent(GameOver).ativo=true;
    }
    if (collision.transform.tag == "Obstaculo"){ //Parâmetro que indica que o barco está colidindo (flag ativo)
       Camera.main.GetComponent(MoverJogador).estaColidindo=true;
    }
}

function OnCollisionExit(collision : Collision) {
    if (collision.transform.tag == "Obstaculo"){//Parâmetro que indica que o barco está colidindo (flag inativo)
       Camera.main.GetComponent(MoverJogador).estaColidindo=false;
    }
}

function OnTriggerEnter(other : Collider) {
	if (other.transform.tag == "Estrela"){//Parâmetro que indica a quantidade de estrelas que o jogador pegou
		
		//Se jogador não pegar todas as estrelas e pegar + 1 estrela, adicionar estrelas ao jogador
		if (Camera.main.GetComponent(ControleGUI).qtdStar < Camera.main.GetComponent(ControleGUI).qtdStarMax)
			Camera.main.GetComponent(ControleGUI).qtdStar++;
		
		//Se jogador pegar todas as estrelas, jogador vence e chama Game Over
		if (Camera.main.GetComponent(ControleGUI).qtdStar == Camera.main.GetComponent(ControleGUI).qtdStarMax){
		  	Camera.main.GetComponent(GameOver).ativo = true;
		  	Camera.main.GetComponent(GameOver).venceu = true;
		}	 
		Destroy(other.gameObject); 
    }
}

