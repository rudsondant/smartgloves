using UnityEngine;
using System.Collections;
using System.IO.Ports;

public class Simulador : MonoBehaviour {
	static SerialPort porta = new SerialPort("COM3", 115200); 
	public static Simulador instance;
	public static int dedo1, dedo2, dedo3, dedo4, dedo5;


	void Awake(){
		instance = this;
	}

	// Use this for initialization
	void Start () {
		
		porta.Open ();
		porta.ReadTimeout = 1;

	//	calibar ();
	}
	
	// Update is called once per frame
	void Update () {
	
	}
	/*
	public static void calibar(){
		if(porta.IsOpen){
			salvarDados(porta.ReadByte ());
		}else{
			porta.Open();
			salvarDados(porta.ReadByte ());
		}
		//string texto = "50,42,60, 70,90";
		//salvarDados(texto);

	}
	/*
	public static void salvarDados(string valor){
		dedo1 = 0;
		dedo2 = 0;
		dedo3 = 0;
		dedo4 = 0;
		dedo5 = 0;


		string[] colunas = valor.Split (',');
		for(int i = 0; i < colunas.Length; i++){

			if(i == 0){
				if(dedo1 < int.Parse(colunas.GetValue(i).ToString()))
					dedo1 = int.Parse(colunas.GetValue(i).ToString());
			}
			else if(i == 1){
				if(dedo2 < int.Parse(colunas.GetValue(i).ToString()))
					dedo2 = int.Parse(colunas.GetValue(i).ToString());
			}
			else if(i == 2){
				if(dedo3 < int.Parse(colunas.GetValue(i).ToString()))
					dedo3 = int.Parse(colunas.GetValue(i).ToString());
			}
			else if(i == 3){
				if(dedo4 < int.Parse(colunas.GetValue(i).ToString()))
					dedo4 = int.Parse(colunas.GetValue(i).ToString());
			}else{
				if(dedo5 < int.Parse(colunas.GetValue(i).ToString()))
					dedo5 = int.Parse(colunas.GetValue(i).ToString());
			}

		}

		Debug.Log ("Dedo 1: " +dedo1 + "Dedo 2: " + dedo2 + "Dedo 3: " + dedo3 + "Dedo 4: " + dedo4 + "Dedo 5: " + dedo5);
	}*/
}
