using UnityEngine;
using System.Collections;

public class Menu : MonoBehaviour {

	public GUISkin skinMenu;
	public Texture2D btnMenuPlay;
	public Texture2D btnVoltar;
	public Texture2D btnCredito;
	public Texture2D rk;
	public Texture2D ob;
	private Gerenciador gerenciador;

	// Use this for initialization
	void Start () {
		gerenciador = FindObjectOfType (typeof(Gerenciador)) as Gerenciador;
	}
	
	// Update is called once per frame
	void Update () {
	
	}

	void OnGUI(){
		GUI.skin = skinMenu;

		bool play = GUI.Button(new Rect(Screen.width-800, Screen.height-600,300,300), btnMenuPlay);
		bool cre = GUI.Button(new Rect (Screen.width-500, Screen.height-250,100,130), btnCredito);
		GUI.Button(new Rect (Screen.width-700, Screen.height-250,100,130), ob);
		GUI.Button(new Rect (Screen.width-900, Screen.height-250,100,130), rk);

		bool voltar = GUI.Button(new Rect (Screen.width-120, Screen.height-750,100,130), btnVoltar);

		if (play) {
			PlayerPrefs.SetInt("vaso1", 0);
			PlayerPrefs.SetInt("vaso2", 0);
			PlayerPrefs.SetInt("vaso3", 0);
			Application.LoadLevel ("Level2");
			Score.Inicializar();
		}

		if(voltar){
			Debug.Log('S');
			Application.LoadLevel ("TelaInicial");
		}

		if(cre){
			Debug.Log('C');
			Application.LoadLevel ("Creditos");
		}
	}
}
