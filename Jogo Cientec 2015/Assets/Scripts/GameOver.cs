using UnityEngine;
using System.Collections;

public class GameOver : MonoBehaviour {

	public GUISkin skinMenu;
	public Texture2D btnMenuPlay;
	public Texture2D btnVoltar;
	public Texture2D btnCredito;
	public Texture2D vaso1;
	public Texture2D vaso2;
	public Texture2D vaso3;
	private Gerenciador gerenciador;
	
	// Use this for initialization
	void Start () {
		gerenciador = FindObjectOfType (typeof(Gerenciador)) as Gerenciador;
		Debug.Log(PlayerPrefs.GetInt("vaso1"));
		Debug.Log(PlayerPrefs.GetInt("vaso2"));
		Debug.Log(PlayerPrefs.GetInt("vaso3"));
	}
	
	// Update is called once per frame
	void Update () {
		
	}
	
	void OnGUI(){
		GUI.skin = skinMenu;
		
//		GUI.Button(new Rect(Screen.width-800, Screen.height-500,300,300), btnMenuPlay);

		bool voltar = GUI.Button(new Rect (Screen.width-600, Screen.height-160,100,130), btnVoltar);
		bool cre = GUI.Button(new Rect (Screen.width-800, Screen.height-160,100,130), btnCredito);
		

		if(voltar){
			PlayerPrefs.SetInt("vaso1", 0);
			PlayerPrefs.SetInt("vaso2", 0);
			PlayerPrefs.SetInt("vaso3", 0);
			Application.LoadLevel ("TelaInicial");
		}
		
		if(cre){
			PlayerPrefs.SetInt("vaso1", 0);
			PlayerPrefs.SetInt("vaso2", 0);
			PlayerPrefs.SetInt("vaso3", 0);
			Score.Inicializar();
			Application.LoadLevel ("Level2");
		}
	}
}