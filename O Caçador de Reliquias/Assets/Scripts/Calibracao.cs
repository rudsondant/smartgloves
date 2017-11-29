using UnityEngine;
using System.Collections;
using System;

/**
 * Onde ser ler "esquerda" é equivalente "flexao"
 * Onde ser ler "direita" é equivalente "Extensao"
 */

public class Calibracao : MonoBehaviour {

	public Texture2D[] vidaAtual;
	public Texture2D titulo;
	public GameObject abrir;
	public GameObject fechar;
	public GameObject fechadoCalibrado;
	public GameObject abertoCalibrado;
	public GameObject aguarde;
	public GameObject luvaConecte;
	public GameObject sucesso;

	public Texture2D btnSalvaCalibracao;
	public Texture2D btnCapturaCalibracao;

	public Texture2D btnMenuPlay;
	public Texture2D btnTreino;

	private Gerenciador gerenciador;

	private int tempo = 0;
	
	private bool esquerda = true;
	private bool calibracao = false;
	
	private bool esquerdaCalibrada = false;
	private bool direitaCalibrada = false;

	private int testeCalibracao = 0;
	private int valorCalibrado = 0;

	string t = "";

	void Start () {
		fechar.SetActive (false);
		fechadoCalibrado.SetActive (false);
		abertoCalibrado.SetActive (false);
		aguarde.SetActive (false);
		luvaConecte.SetActive (false);
		sucesso.SetActive (false);

		gerenciador = FindObjectOfType (typeof(Gerenciador)) as Gerenciador;
		try{
//			Luva.StartConnection ("/dev/tty.SLAB_USBtoUART", 115200);
			// Computador do HOUL
//			Luva.StartConnection ("COM4", 115200);
			// Computador de Luiza
			Luva.StartConnection ("COM3", 115200);
		}catch(Exception e){
			Debug.Log(e.Message.ToString());
		}

	}
	
	// Update is called once per frame
	void Update () {
		if (Input.GetKeyDown (KeyCode.E)) {
			Luva.fecharConexao();
			Application.LoadLevel ("Menu");
		}
	
	}

	void OnGUI(){
		// Textura do Titulo
		GUI.DrawTexture (new Rect (Screen.width / 2 - titulo.width / 2, -100, titulo.width, titulo.height), titulo);

		// Botão de Play
		bool play = GUI.Button(new Rect(Screen.width-100, Screen.height-100,64,64), btnMenuPlay);
		bool treino = GUI.Button(new Rect(Screen.width-160, Screen.height-100,64,64), btnTreino);

		if (treino) {
			Debug.Log("treino");
			if((PlayerPrefs.GetInt("esquerda") != 0) && (PlayerPrefs.GetInt("direita") != 0)){
				PlayerPrefs.SetInt ("luva", 1);
				Application.LoadLevel ("Level1");
			}else{
				if(calibracao){
					PlayerPrefs.SetInt ("luva", 1);
					Application.LoadLevel ("Level1");
				}
			}
		}

		if (play) {
			Debug.Log("Jogo");
			if((PlayerPrefs.GetInt("id") != 0) && (PlayerPrefs.GetInt("esquerda") != 0) && (PlayerPrefs.GetInt("direita") != 0)){
				gerenciador.Jogo();
				Score.Inicializar();
			}else{
				if(t.Length != 0){
					if(calibracao){
						PlayerPrefs.SetInt ("id", int.Parse(t));
						gerenciador.Jogo();
						Score.Inicializar();
					}
				}else{
					Debug.Log("Escreva o Código");
				}
			}
		}

		t = GUI.TextField (new Rect (Screen.width-800, Screen.height-180,200,30), t);

		// botão de Salvar Calibração
		bool salvar = GUI.Button(new Rect(Screen.width-600, Screen.height-250,64,64), btnSalvaCalibracao);

		// Botão de recalibrar
		bool calibrar = GUI.Button(new Rect(Screen.width-700, Screen.height-250,64,64), btnCapturaCalibracao);

		// Apertou no botão de calibrar (Icone de Atualizar)
		if(calibrar){
			if(this.esquerda)
				abrir.SetActive (false);
			else
				fechar.SetActive(false);

			aguarde.SetActive(true);

			if(esquerda)
				esquerdaCalibrada = true;
			else
				direitaCalibrada = true;

			if(Luva.portaSerial.IsOpen){
				Calibrar();
				Luva.vibrar();
				
				while(tempo < 0){
					tempo ++;
				}

				aguarde.SetActive(false);

				if(this.esquerda)
					abertoCalibrado.SetActive(true);
				else
					fechadoCalibrado.SetActive(true);
				

			}else{
				aguarde.SetActive(false);
				luvaConecte.SetActive (true);
			}
		}

		if (salvar) {
			if(this.esquerda){
				abrir.SetActive(false);
				abertoCalibrado.SetActive(false);
				fechar.SetActive (true);
				saveCalibracao();
				this.esquerda = false;
			}else{
				fechar.SetActive (false);
				fechadoCalibrado.SetActive(false);
				saveCalibracao();
				sucesso.SetActive(true);
			}
		}

	}

	private void Calibrar(){
		testeCalibracao = 0;
		valorCalibrado = 0;
		int teste = 15;
		if(!calibracao)
			teste = 30;

		while(testeCalibracao < teste){
			string dados1 = Luva.portaSerial.ReadLine ();
//			Debug.Log(dados1);

			string[] dado1 = dados1.Split (';');
//			Debug.Log(dado1);

			valorCalibrado = (int.Parse (dado1 [4])*5) / 5;
//			Debug.Log(valorCalibrado);
			
			testeCalibracao++;
		}
		
		Luva.vibrar ();
	}

	private void saveCalibracao(){
		if(this.esquerda){
			PlayerPrefs.SetInt("esquerda", valorCalibrado);
			Debug.Log("esquerda " + valorCalibrado);
		}else{
			PlayerPrefs.SetInt("direita", valorCalibrado);
			calibracao = true;
			Debug.Log("direita " + valorCalibrado);
		}
	}
}
