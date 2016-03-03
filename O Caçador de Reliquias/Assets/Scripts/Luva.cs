using UnityEngine;
using System.Collections;
using System.IO.Ports;
using System.Text.RegularExpressions;
using System.Threading;
using System;
#if UNITY_EDITOR
using UnityEditor;
#endif

public class Luva : MonoBehaviour {
	public static SerialPort portaSerial;

	void Start () {

	}

	void Update () {

	}

	public static void StartConnection(string portName, int bauds){
		try{
			portaSerial = new SerialPort();
			portaSerial.PortName = portName;
			portaSerial.BaudRate=bauds;
			portaSerial.Parity=Parity.None;
			portaSerial.DataBits=8;
			portaSerial.StopBits=StopBits.One;
			portaSerial.DtrEnable = true;
			portaSerial.ReadTimeout=-1;
			portaSerial.WriteTimeout=-1;
			portaSerial.Open();
		}catch(Exception ){
			portaSerial.Close();
			StartConnection (portName, bauds);
		}
	}
	
	public static void fecharConexao(){
		if(portaSerial.IsOpen){
			portaSerial.Close ();
			Debug.Log ("Fechou Conexao");
		}
	}
	
	public static void vibrar(){
		if (!PLayer.UseTeclado) {
			if (portaSerial.IsOpen) {
				portaSerial.Write ("1");
			}
		}
	}

	public static void verificaPortas(){
		string [] portas = SerialPort.GetPortNames();
		for(int i = 0; i < portas.Length; i++)
			Debug.Log(portas[i]);
	}
}
