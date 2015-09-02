using UnityEngine;  
using System.Collections;  
using System.Threading;

public class Numero : MonoBehaviour {

	public AudioClip clip;
	private float timeVida;
	public float tempoMaximoVida;


	private Score score;
	private int ponto = 5;

	void Awake(){
		score = GameObject.FindGameObjectWithTag("Pontos").GetComponent<Score>() as Score;
	}

	// Use this for initialization
	void Start () {
		timeVida = 0;
	}
	
	// Update is called once per frame
	void Update () {

		timeVida += Time.deltaTime;

		if (timeVida >= tempoMaximoVida) {
			Destroy (gameObject);
			timeVida = 0;
		}

	}

	void OnCollisionEnter2D(Collision2D colisor){

		if (colisor.gameObject.tag == "Player") {
			score.SomaScore(ponto);
			//score.post();
			Destroy(gameObject);
			//Controle.colidir();
		}

	}
}
