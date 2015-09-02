using UnityEngine;
using System.Collections;

public class Menu : MonoBehaviour {

	public GUISkin skinMenu;
	public Texture2D btnMenuPlay;
	public Texture2D titulo;
	public Texture2D btnVoltar;
	public Texture2D cobra;
	public Texture2D menino;

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
		GUI.DrawTexture (new Rect (Screen.width / 2 - titulo.width / 2, 200, titulo.width, titulo.height), titulo);

		GUI.DrawTexture (new Rect (Screen.width-150 / 2 - cobra.width / 2, 80, cobra.width/4, cobra.height/4), cobra);

		GUI.DrawTexture (new Rect (Screen.width-2000 / 2 - cobra.width / 2, Screen.height-300, menino.width/2, menino.height/2), menino);

		bool play = GUI.Button(new Rect(Screen.width-160, Screen.height-90,100,100), btnMenuPlay);

		bool voltar = GUI.Button(new Rect (Screen.width-100, Screen.height-90,100,100), btnVoltar);

		if (play) {
			gerenciador.ProximoLevel(gerenciador.proximoLevel);
			Score.Inicializar();
		}

		if(voltar){
			Application.Quit();
		}
	}
}
