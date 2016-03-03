using UnityEngine;
using System.Collections;
using System.IO.Ports;
using System.Text.RegularExpressions;
using System.Threading;
using System;
using System.Collections.Generic;
using System.IO;

/**
 * Onde ser ler "esquerda" é equivalente "flexao"
 * Onde ser ler "direita" é equivalente "Extensao"
 */
public class PLayer : MonoBehaviour {
	Thread read;
	private int andar = 0;
	private int soma = 0;

	private int direita = 0;
	private int esquerda = 0;
	
	public float velocidade;

	public Transform player;
	private Animator animador;

	public bool isGrounded;
	public float force;

	public float jumpTime = 0.5f;
	public float jumpDelay = 0.5f;
	public bool jumped = false;
	public Transform ground;

	private float tempoJogo = 90;
	private float tempo = 0;

	public static bool paused;

	private Gerenciador gerenciador;
	private Tools tools;

	public static int numFlexao;
	public static int numExtensao;
	
	public static List<string> dadosLuva;
	private Score score;
	public bool treino;

	public bool teclado;
	public static bool UseTeclado;

	void Start () {

		gerenciador = FindObjectOfType (typeof(Gerenciador)) as Gerenciador;
		if (!treino) {
			score = GameObject.FindGameObjectWithTag ("Pontos").GetComponent<Score> () as Score;
		}

		animador = player.GetComponent<Animator> ();
		gerenciador.StartGame ();

		if (!teclado) {
			numFlexao = 0;
			numExtensao = 0;
			dadosLuva = new List<string> ();
			Debug.ClearDeveloperConsole ();
			Debug.Log (PlayerPrefs.GetInt ("direita"));
			Debug.Log (PlayerPrefs.GetInt ("esquerda"));

			direita = PlayerPrefs.GetInt ("direita");
			esquerda = PlayerPrefs.GetInt ("esquerda");

			read = new Thread (Ler);
			read.Start ();

			UseTeclado = false;
		} else {
			UseTeclado = true;
		}

		paused = true;
	}

	void Update () {
		if (Input.GetKeyDown (KeyCode.S) || Input.GetKeyDown (KeyCode.E)) {
			if(!teclado){
				if(!treino){
					gerenciador.finalizar(gerenciador.minutes, gerenciador.seconds, gerenciador.miliseconds, 
					                      Score.Pontos(), numFlexao, numExtensao, esquerda, direita, dadosLuva);
				}

				if (Luva.portaSerial.IsOpen) {
					Luva.portaSerial.Close();
				}
				
				if(treino)
					Application.LoadLevel ("Calibracao");
				else
					Application.LoadLevel ("GameOver");
			}else{
				Application.LoadLevel ("GameOver");
			}
		}

		if (Input.GetKeyDown (KeyCode.P)) {
			if(paused){
				paused = false;
			}else{
				paused = true;
			}
		}

		if(paused){
			if(teclado){
				MovimentarTeclado();
			}else{
				Movimentar ();
			}
		}else{
			animador.SetFloat("run", Mathf.Abs(0));
		}

	}
	
	void Movimentar(){

		isGrounded = Physics2D.Linecast(transform.position, ground.position, 1 << LayerMask.NameToLayer("Plataforma"));

		if (andar <= direita+10 && andar != 0) {
			animador.SetFloat("run", Mathf.Abs(andar));
			transform.Translate (Vector2.right * velocidade * Time.deltaTime);
			transform.eulerAngles = new Vector2(0,0);
		}else if (andar >= esquerda-10 && andar != 0) {
			animador.SetFloat("run", Mathf.Abs(andar));
			transform.Translate (Vector2.right * velocidade * Time.deltaTime);
			transform.eulerAngles = new Vector2(0,180);
		}else
			animador.SetFloat("run", Mathf.Abs(0));

		jumpTime -= Time.deltaTime;

		if (jumpTime <= 0 && isGrounded && jumped) {
			animador.SetTrigger("chao");
			jumped = false;
		}
	}

	void MovimentarTeclado(){
		
		animador.SetFloat("run", Mathf.Abs(Input.GetAxis("Horizontal")));
		
		if (Input.GetAxis("Horizontal") > 0) {
			animador.SetFloat("run", Mathf.Abs(Input.GetAxis("Horizontal")));
			transform.Translate (Vector2.right * velocidade * Time.deltaTime);
			transform.eulerAngles = new Vector2(0,0);
		}
		
		if (Input.GetAxis("Horizontal") < 0 ) {
			animador.SetFloat("run", Mathf.Abs(Input.GetAxis("Horizontal")));
			transform.Translate (Vector2.right * velocidade * Time.deltaTime);
			transform.eulerAngles = new Vector2(0,180);
		}
	}

	void OnCollisionEnter2D(Collision2D colisor){
		if (colisor.gameObject.name == "Porta") {
			Debug.Log("Colidiu");
			if(gerenciador.IsColetado()){
				gerenciador.ProximoLevel(gerenciador.proximoLevel);
				
			}else{
				Debug.Log("Não coletou a quantidade maxima."); 
			}
		}
	}

	public void Ler(){

		while (true) {

			try {
				if (Luva.portaSerial.IsOpen) {
					int aux = andar;

					string dados = Luva.portaSerial.ReadLine ();
					string[] dado = dados.Split (';');
					andar = (int.Parse (dado [4])*5) / 5;
					dadosLuva.Add(dados);
					Debug.Log(dadosLuva.Count);

					// Somar a quantidade de flexao e extensao do paciente
					if(andar < aux-10 && andar < esquerda-10){
						numFlexao++;
					}
					if(andar > aux+10 && andar > direita-10){
						numExtensao++;
					}

				} else
					Debug.Log ("fechada");
			} catch (TimeoutException e) {
				Debug.LogError (e.Message.ToString ());
			}
		}
	}

	public void bomba(){
		Luva.vibrar ();
	}

	private void enviaLog(string log){
		string url = "http://localhost:8888/smartglove/sistema/includes/postlog.php";
		//	string url = "http://smartglove.hol.es/sistema/includes/postdados.php";
		string data = System.DateTime.Now.ToString("yyyy-MM-dd_HH-mm-ss");
		Debug.Log (log);
		try{
			WWWForm form = new WWWForm();
			form.AddField("id_paciente", PlayerPrefs.GetInt ("id"));
			form.AddField("log", log);
			form.AddField("id_log", data+PlayerPrefs.GetInt ("id").ToString());

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

}
