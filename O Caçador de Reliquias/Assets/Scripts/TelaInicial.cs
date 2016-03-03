using UnityEngine;
using System.Collections;

public class TelaInicial : MonoBehaviour {

	public GUISkin skinMenu;
	public Texture2D btnMenuPlay;
	// Use this for initialization
	void Start () {
	
	}
	
	// Update is called once per frame
	void Update () {
	
	}

	void OnGUI(){
		GUI.skin = skinMenu;
		
		bool play = GUI.Button(new Rect(Screen.width-600, Screen.height-400,500,500), btnMenuPlay);
		
		if (play) {
			PlayerPrefs.SetInt("vaso1", 0);
			PlayerPrefs.SetInt("vaso2", 0);
			PlayerPrefs.SetInt("vaso3", 0);
			Application.LoadLevel ("Menu");
		}
	}
}
