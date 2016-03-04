using UnityEngine;
using System.Collections; 

public class Gerenciador : MonoBehaviour {

	public Vector2 posicaoInicialPlayer;
	public Transform player;
	public int levelAtual;
	public int proximoLevel;
	private float tempoJogo = 3700;
	private float tempo = 0;
	public int quantidadeColerado = 0;
	private int quantidademaxima = 5;
	public bool ativo;
	private int direita;
	private int esquerda;


	void Awake () {
		if (player != null) {
			posicaoInicialPlayer = player.position;
		}
	}
	
	// Update is called once per frame
	void Update () {
		if(!ativo){
			quantidadeColerado = Score.Pontos ();

			tempo += Time.deltaTime;

			if (tempo <= tempoJogo) {
				tempo++;
			}else{
				GameOver();
			}
		}
		
	}

	public bool IsColetado(){
		if (quantidadeColerado >= quantidademaxima) {
			return true;
		}else{
			return false;
		}
	}

	// Método para pegar a posição do jogador no Start do Jogo.
	public void StartGame(){
		player.position = posicaoInicialPlayer;
	}

	// Método que leva para a Cena de gameOver
	public void GameOver(){
		Application.LoadLevel ("GameOver");
	}

	// Método que leva para a Cena de gameOver
	public void Credito(){
		Application.LoadLevel ("Creditos");
	}

	// método para controle de quantas frutas foram coletadas
	public void AddQuantidade(int quantidade){
		quantidadeColerado += quantidade;
	}

	// método para mudar de level
	public void ProximoLevel(int level){
		Application.LoadLevel (level);
	}

	public void setDireita(int direita){
		this.direita = direita;
	}

	public int getDireita(int direita){
		return this.direita;
	}

	public void setEsquerda(int esquerda){
		this.esquerda = esquerda;
	}
	
	public int getEsquerda(int esquerda){
		return this.esquerda;
	}
}
