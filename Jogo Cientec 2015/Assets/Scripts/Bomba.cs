using UnityEngine;
using System.Collections;
using System.IO.Ports;
using System.Text.RegularExpressions;
using System.Threading;
using System;

public class Bomba : MonoBehaviour {
	SerialPort portaSerial;

	public int ponto = 5;
	private float timeVida;
	public float tempoMaximoVida;

	private Vidas vidas;
	private Score score;


	private Gerenciador gerenciador;
	PLayer p;

	void Awake(){
		score = GameObject.FindGameObjectWithTag("Pontos").GetComponent<Score>() as Score;
		gerenciador = FindObjectOfType (typeof(Gerenciador)) as Gerenciador;
		p = FindObjectOfType (typeof(PLayer)) as PLayer;
	}
	
	void Start () {

	}
	
	// Update is called once per frame
	void Update () {
		timeVida += Time.deltaTime;

		if (timeVida >= tempoMaximoVida) {
			Destroy(gameObject);
			timeVida = 0;
		}
	}

	void OnCollisionEnter2D(Collision2D colisor){
		
		if (colisor.gameObject.tag == "Player") {
			Debug.Log("bomba");

			vidas = GameObject.FindGameObjectWithTag("Vidas").GetComponent<Vidas>() as Vidas;

			if(vidas.ExcluirVida()){
				score.TirarScore(ponto);
				Destroy(gameObject);
			}else{
				gerenciador.GameOver();
			}

		}

//		if (colisor.gameObject.tag == "plataforma") {
//			Destroy(gameObject);
//		}
	}
	
}
