using UnityEngine;
using System;
using System.Collections;
using System.IO.Ports;
using System.Text.RegularExpressions;
using System.Threading;

public class Controle : MonoBehaviour {
	
	SerialPort porta = new SerialPort("/dev/cu.SLAB_USBtoUART", 115200); 
	static byte[] comando = {0, 200, 201};
	public static Controle instance;
	static bool led = false;
	
	void Awake(){
		instance = this;
		porta.Open ();
		porta.ReadTimeout = 500;
		porta.WriteTimeout = 500;
	}
	
	/* Update is called once per frame
	void Update () {
		
	}*/
	
	public int pular(){
		int pula;
		
		if(porta.IsOpen)
			pula = porta.ReadByte ();
		else{
			porta.Open();
			pula = porta.ReadByte ();
		}
		
		return pula;
	}
	
	public void teste(){
		try{
			if(porta.IsOpen){
				string dados = porta.ReadLine();
				Debug.Log(dados);
				string[] dado = dados.Split(';');
				int direita = int.Parse(dado[1]);
				Debug.Log(dado[1]);
				//for(int i = 0; i < dado.Length; i++)
				//	Debug.Log(dado[i]);
			}else
				Debug.Log("fechada");
		}catch(TimeoutException e){
			Debug.LogError(e.Message.ToString());
			
		}
		
	}

	public int Dieita(){
		int andar = 0;

		try{
			if(porta.IsOpen){

				string dados = porta.ReadLine();
				//Debug.Log(dados);
				string[] dado = dados.Split(';');
				andar = int.Parse(dado[1]);
				//Debug.Log(dado[1]);
				//for(int i = 0; i < dado.Length; i++)
				//	Debug.Log(dado[i]);
			}else
				Debug.Log("fechada");
		}catch(TimeoutException e){
			Debug.LogError(e.Message.ToString());
			
		}

		return andar;
		
	}
	
	public void colidir(){
		if (porta.IsOpen) {
			porta.Write ("1");
		} else {
			porta.Open();
			porta.Write ("1");
		}
	}
	
	public void close(){
		if (porta.IsOpen) 
			porta.Close ();
	}
	
	public void escreve(){
		
		string pula;
		if(porta.IsOpen){
			pula = porta.ReadLine().ToString();
			Debug.Log (porta.ReadByte());
			Debug.Log ("entrou");
			Debug.Log (porta.ReadLine().ToString());
		}else{
			//porta.Open();
			Debug.Log ("nao entrou");
		}
	}
}