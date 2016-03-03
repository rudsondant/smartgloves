using UnityEngine;
using System.Collections;

public class Credito : MonoBehaviour {
	
	public GUISkin skinMenu;
	public Texture2D btnVoltar;
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

		bool voltar = GUI.Button (new Rect (Screen.width - 450, Screen.height - 800, 500, 500), btnVoltar);
		
		if(voltar){
			Debug.Log('S');
			//Application.Quit();
			Application.LoadLevel ("Menu");
		}

	}
}