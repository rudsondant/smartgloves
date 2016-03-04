using UnityEngine;
using System.Collections;

public class Inimigo : MonoBehaviour {

	public GameObject objeto;
	private bool isEsquerda = true;
	public float velocidade = 5f;
	public float mxDelay;

	public float instanciadorTempo = 5f;
	public float instanciadorDelay = 3f;
	
	private float timeMovimento = 0f;
	public int valorMinimoRandom = 0;

	public Transform verticeInicial;
	public Transform verticeFinal;

	public bool isAlvo;	

	private float mxDelayObejto = 0.001f;
	private float timeObjeto = 10f;

	private float tempo = 600;
	private float tempoBomba = 0;

	// Use this for initialization
	void Start () {
	
	}
	
	// Update is called once per frame
	void Update () {
		Movimentar ();
		RayCasting ();
		Behaviours ();
	}

	void RayCasting(){
		Debug.DrawLine (verticeInicial.position, verticeFinal.position, Color.red);
		isAlvo = Physics2D.Linecast (verticeInicial.position, verticeFinal.position, 1 << LayerMask.NameToLayer ("Player"));

	}

	void Behaviours(){
		if (isAlvo) {
			if (timeObjeto <= mxDelayObejto) {
					timeObjeto += Time.deltaTime;

					Instantiate (objeto, verticeInicial.position, objeto.transform.rotation);
					//Instantiate (objeto, verticeInicial.position, Quaternion.identity, objeto.transform.rotation);
					//Instantiate (objetos [index], transform.position, objetos [index].transform.rotation);
			}
		} else {
			timeObjeto = 0;
		}
	}

	void Movimentar(){
		
		timeMovimento += Time.deltaTime;
		
		if (timeMovimento <= mxDelay) {
			
			if (isEsquerda) {
				
				transform.Translate (-Vector2.right * velocidade * Time.deltaTime);
				transform.eulerAngles = new Vector2 (0, 0);
				
			} else {
				
				transform.Translate (-Vector2.right * velocidade * Time.deltaTime);
				transform.eulerAngles = new Vector2 (0, 180);
				
			}
			
		} else {
			isEsquerda = !isEsquerda;
			timeMovimento = 0;	
		}
	}
}
