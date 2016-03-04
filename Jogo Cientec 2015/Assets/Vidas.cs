using UnityEngine;
using System.Collections;

public class Vidas : MonoBehaviour {
	public Texture2D[] vidaAtual;
	public int  vidas;
	public int contador; 
	// Use this for initialization
	void Start () {
	
		GetComponent<GUITexture>().texture = vidaAtual [0];
		vidas = vidaAtual.Length;
	}
	
	// Update is called once per frame
	void Update () {
	
	}

	public bool ExcluirVida(){
		if (vidas < 0) {
			return false;
		}

		if (contador < (vidas - 1)) {
			contador += 1;
			GetComponent<GUITexture>().texture = vidaAtual [contador];
			return true;
		} else {
			return false;
		}
	}
}
