using UnityEngine;
using System.Collections;

public class Score : MonoBehaviour {
	
	public static int ponto;
	public static Score instance;

	private static WWW www;
	

	void Awake(){
		instance = this;
	}

	void Start () {
			GetComponent<GUIText>().text = "Pontos:   " + ponto;

	}
	
	// Update is called once per frame
	void Update () {
		GetComponent<GUIText>().text = "Pontos:   " + ponto;	
		
	}

	public void SomaScore(int _ponto){

		ponto += _ponto;
		postPonto (ponto);
		GetComponent<GUIText>().text = "Pontos:   " + ponto;	
	}

	public void TirarScore(int _ponto){
		ponto -= _ponto;
		if (ponto < 0)
			ponto = 0;
		GetComponent<GUIText>().text = "Pontos:   " + ponto;	

	}

	public static void Inicializar(){
		ponto = 0;

	}

	public static int Pontos(){
		return ponto;
	}

	public void post(){

		Debug.Log ("Entrou");

		string url = "http://localhost:8888/servico/servico_post.php";
		
		WWWForm form = new WWWForm ();
		form.AddField ("nome", "Teste Agora");
		form.AddField ("idade", 20);
		www = new WWW (url, form);

		StartCoroutine(WaitForRequest(www));

	}

	public void postPonto(int pontos){
		
		//Debug.Log ("Entrou");
		
		string url = "http://localhost:8888/servico/servico-ponto.php";
		
		WWWForm form = new WWWForm ();
		//form.AddField ("nome", "Teste Agora");
		form.AddField ("ponto", pontos);
		www = new WWW (url, form);
		
		StartCoroutine(WaitForRequest(www));
		
	}

	public void setVaso(int tipo){
		if (tipo == 1) {
			PlayerPrefs.SetInt("vaso1", PlayerPrefs.GetInt("vaso1") + 1);
		}

		if (tipo == 2) {
			PlayerPrefs.SetInt("vaso2", PlayerPrefs.GetInt("vaso1") + 1);
		}

		if (tipo == 3) {
			PlayerPrefs.SetInt("vaso3", PlayerPrefs.GetInt("vaso1") + 1);
		}
	}
	
	static IEnumerator WaitForRequest(WWW www)
	{
		yield return www;
		
		// check for errors
		if (www.error == null)
		{
			//Debug.Log("WWW Ok!: " + www.data);
		} else {
			//Debug.Log("WWW Error: "+ www.error);
		}    
	} 
}
