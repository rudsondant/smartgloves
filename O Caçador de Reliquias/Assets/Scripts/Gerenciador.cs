using UnityEngine;
using System.Collections; 
using System;
using System.IO;
using System.Text.RegularExpressions;
using System.Collections.Generic;

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

	// Variaveis do tempo
	public float minutes = 5;
	public float seconds = 0;
	public float miliseconds = 0;

	void Awake () {
		if (player != null) {
			posicaoInicialPlayer = player.position;
		}
	}
	
	// Update is called once per frame
	void Update () {
		if(!ativo){
			quantidadeColerado = Score.Pontos ();
			Tempo ();
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

	public void LavelCalibracao(){
		Application.LoadLevel ("Calibracao");
	}

	public void Jogo(){
		Application.LoadLevel ("Level2");
	}

	public void JogoManual(){
		Application.LoadLevel ("Level3");
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

	void Tempo(){
		if(miliseconds <= 0){
			if(seconds <= 0){
				//minutes--;
				seconds = 1;
			}
			else if(seconds >= 0){
				seconds++;
				
				if(seconds > 295){
					GameOver();
				}
			}
			
			miliseconds = 100;
		}
		
		miliseconds -= Time.deltaTime * 100;
		
		//mascaraTempo.text = string.Format("{1}:{2}", minutes, seconds, (int)miliseconds);
	}

	private void enviarDados(float minutos, float segundos, float milisegundos, int pontos, 
	                         int numFlexao, int numExtensao, int flexao, int extensao){
		//		string url = "http://smartglove.hol.es/sistema/includes/postdados.php";
		string url = "http://localhost/smartglove/sistema/includes/postdados.php";
		
		try{
			WWWForm form = new WWWForm();
			form.AddField("id_paciente", PlayerPrefs.GetInt ("id"));
			form.AddField("duracao_trial", string.Format("{1}", minutos, segundos, (int)milisegundos));
			form.AddField("pontos", pontos);
			form.AddField("num_flexoes", numFlexao);
			form.AddField("num_extensoes", numExtensao);
			form.AddField("valor_flexao", flexao);
			form.AddField("valor_extensao", extensao);
			
			
			WWW www = new WWW(url, form);
			StartCoroutine(WaitForRequest(www));
		}catch(Exception e){
			e.Message.ToString();
		}
	}
	
	private IEnumerator WaitForRequest(WWW www)
	{
		yield return www;
		
		if (www.error == null){
			Debug.Log("WWW Ok!: " + www.data);
		} else {
			Debug.Log("WWW Error: "+ www.error);
		}    
	}
	
	private void escreveArquivo(float minutos, float segundos, float milisegundos, int pontos, 
	                            int numFlexao, int numExtensao, int flexao, int extensao, List<string> dados){
		
		string data = System.DateTime.Now.ToString("yyyy-MM-dd_HH-mm-ss");
		
//		StreamWriter writer = new StreamWriter(@"/Users/victoroliveira/Desktop/"+ PlayerPrefs.GetInt ("id").ToString()+"_"+data+".txt");
		
		StreamWriter writer = new StreamWriter("c:/SmartGlove/"+PlayerPrefs.GetInt ("id").ToString()+"_"+data+".txt");
		
		writer.WriteLine("Paciente: " + PlayerPrefs.GetInt ("id").ToString());
		writer.WriteLine("Duração Trial (Em segundos): " + string.Format("{1}", minutos, segundos, (int)milisegundos));
		writer.WriteLine("Pontos: " + pontos.ToString());
		writer.WriteLine("Numero de Flexões: " + numFlexao.ToString());
		writer.WriteLine("Número de Extensões: " + numExtensao.ToString());	
		writer.WriteLine("Flexão: " + flexao.ToString());
		writer.WriteLine("Extensão: " + extensao.ToString());
		writer.WriteLine ("\nDados da Luva \n");
		for (int i = 0; i < dados.Count; i++) {
			writer.WriteLine (dados[i]);
		}
		
		//Fechando o arquivo
		writer.Close();
		//Limpando a referencia dele da memória
		writer.Dispose();
	}
	
	public void finalizar(float minutos, float segundos, float milisegundos, int pontos, 
	                      int numFlexao, int numExtensao, int flexao, int extensao, List<string> dados){
		// Escrever Arquivo
		escreveArquivo(minutos,segundos,milisegundos,pontos,numFlexao,numExtensao,flexao,extensao,dados);
		//		enviarDados(minutos,segundos,milisegundos,pontos,numFlexao,numExtensao,flexao,extensao);
		
	}
}
