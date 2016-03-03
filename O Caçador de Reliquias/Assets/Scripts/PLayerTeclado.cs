﻿using UnityEngine;
using System.Collections;
using System.IO.Ports;
using System.Text.RegularExpressions;
using System.Threading;
using System;

public class PLayerTeclado : MonoBehaviour {
	private int andar = 0;
	private int soma = 0;

	private int direita = 0;
	private int esquerda = 0;

	private int teste = 0;

	private bool calibrar = false;
	private bool calibrarDireita = false;
	private bool calibrarEsquerda = false;

	
	public float velocidade;

	public Transform player;
	private Animator animador;

	public bool isGrounded;
	public float force;

	public float jumpTime = 0.5f;
	public float jumpDelay = 0.5f;
	public bool jumped = false;
	public Transform ground;

	private float tempoJogo = 90;
	private float tempo = 0;

	private Gerenciador gerenciador;
	public static bool paused;

	private Score score;

	void Start () {
		gerenciador = FindObjectOfType (typeof(Gerenciador)) as Gerenciador;
		animador = player.GetComponent<Animator> ();
//		gerenciador.StartGame ();

		score = GameObject.FindGameObjectWithTag("Pontos").GetComponent<Score>() as Score;

		PLayer.paused = true;
	}
	

	void Update () {

		if (Input.GetKeyDown (KeyCode.S) || Input.GetKeyDown (KeyCode.E)) {
			Application.LoadLevel ("GameOver");
		}
		
		if (Input.GetKeyDown (KeyCode.P)) {
			if(PLayer.paused){
				PLayer.paused = false;
			}else{
				PLayer.paused = true;
			}
		}
		
		if(paused){
			Movimentar ();
		}else{
			animador.SetFloat("run", Mathf.Abs(0));
		}
	}

	void Movimentar(){

		animador.SetFloat("run", Mathf.Abs(Input.GetAxis("Horizontal")));

      	if (Input.GetAxis("Horizontal") > 0) {
			animador.SetFloat("run", Mathf.Abs(Input.GetAxis("Horizontal")));
			transform.Translate (Vector2.right * velocidade * Time.deltaTime);
			transform.eulerAngles = new Vector2(0,0);
		}

		if (Input.GetAxis("Horizontal") < 0 ) {
			animador.SetFloat("run", Mathf.Abs(Input.GetAxis("Horizontal")));
			transform.Translate (Vector2.right * velocidade * Time.deltaTime);
			transform.eulerAngles = new Vector2(0,180);
		}
	}

	void OnCollisionEnter2D(Collision2D colisor){
		if (colisor.gameObject.name == "Porta") {
			Debug.Log("Colidiu");
			if(gerenciador.IsColetado()){
				gerenciador.ProximoLevel(gerenciador.proximoLevel);
				
			}else{
				Debug.Log("Não coletou a quantidade maxima."); 
			}
		}
	}


}
