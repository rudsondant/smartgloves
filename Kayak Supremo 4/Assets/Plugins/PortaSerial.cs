/*---------------SERIAL CONNECTION------------------------
*Programado por: Lucas Cassiano 
*Criação: 04/03/2013
*Ultima Alteração: 05/04/2013
*----------------------------------------------------
*Script com funções básicas para conexões com portas seriais;
*--------------------------------------------------
*Documentação de funções:
*-Abrir(int numero da porta, float tempo de leitura, int baud)
*-Ler(float tempo de leitura); _->String
*-LerCada(float tempo de leitura, String separacao); ->String[]
*-PortasDisponiveis //Portas disponíveis, retorna o número delas
*-Escrever(String) //Envia uma String pela PortaSerial
*
*
*
*
**/



using UnityEngine;
using System.Collections;
using System.IO.Ports;
using System.Threading;
using System.Collections.Generic;
using System.Timers;
using System.ComponentModel;
using System.Text;
using System;


public class PortaSerial  : MonoBehaviour {
	public SerialPort Porta;
	void Awake() {
        DontDestroyOnLoad(transform.gameObject);
    }
	//Abrindo a porta Serial
	public void Abrir(int numPorta,int timeOut){Abrir(numPorta,9600,timeOut);} //Por padrão
	public void Abrir (int numPorta,int baud,int timeOut){ 
		Porta= new SerialPort("COM"+numPorta,baud);	
	
			if (Porta.IsOpen) {
				Porta.Close();
        	}
			else {
				Porta.Open();  //opens the connection
				Porta.ReadTimeout=timeOut;
				print ("#Serial Port COM"+numPorta+" open successfully#");
			}

	}
	public void Abrir(string nomePorta,int baud, int timeOut){
		Porta= new SerialPort(nomePorta,baud);	
	
			if (Porta.IsOpen) {
				Porta.Close();
        	}
			else {
				Porta.Open();  //opens the connection
				Porta.ReadTimeout=timeOut;
				print ("#Serial Port "+nomePorta+" open successfully#");
			}

		
		
	}
	
	
/*#---------Ler()---------------------------------------
 * Lê o que está sendo escrito na porta serial indicada
 * Usar println() no arduino
 * Retorna o que foi lido como string;
-------------------------------------------------------*/
	public string Ler(float tempoLim){return Ler ();} //Solução paleativa
	public string Ler(){
		string Leitura=null;
		Leitura=Porta.ReadLine();
		return Leitura;
	}

	
	
/*#---------LerCada()-----------------------------------
 * Lê o que está sendo escrito na porta serial indicada
 * Usar println() no arduino
 * Retorna,separando os termos lidos, como um vetor string;
---------------------------------------------------------*/
	public string[] LerCada (){ return LerCada(0.01f,",");}
	public string[] LerCada (float tempo,string split){
		string Leitura = Ler (tempo);
		string[] retorno=Leitura.Split(split[0]);
		return retorno;
	}


/*#---------LerCadaInt()---------------------------------
 * Lê o que está sendo escrito na porta serial indicada
 * Usar println() no arduino
 * Separa os termos lidos, como um vetor string
 * Converte para int32 e retorna um vetor de Inteiros;
-------------------------------------------------------*/
	public int[] LerCadaInt(){return LerCadaInt(0.01f,",");}
	public int[] LerCadaInt(float tempo , string split){
		string[] Leitura = LerCada(tempo,split);
		int[] retorno = new int[Leitura.Length];
		for(int i=0; i<retorno.Length; i++){
 			retorno[i]=int.Parse(Leitura[i]);
 		}
		return retorno;
	}

/*#---------LerCadaFloat()---------------------------------
 * Lê o que está sendo escrito na porta serial indicada
 * Usar println() no arduino
 * Separa os termos lidos, como um vetor string
 * Converte para float e retorna um vetor de Inteiros;
-------------------------------------------------------*/
	public float[] LerCadaFloat(){return LerCadaFloat(0.01f,",");}
	public float[] LerCadaFloat(float tempo , string split){
		string[] Leitura = LerCada(tempo,split);
		float[] retorno = new float[Leitura.Length];
		for(int i=0; i<retorno.Length; i++){
 			retorno[i]=float.Parse(Leitura[i]);
 		}
		return retorno;
	}
	
	
	
/*#---------Fechar()---------------------------------------
 * Fecha uma porta Serial se ele estiver aberta;
-----------------------------------------------------------*/
	public void Fechar (){ 
		if(Porta.IsOpen){
			Porta.Close();
			print ("Serial Port "+Porta.PortName+" is closed");
		}
		else{
			print ("Serial Port "+Porta.PortName+" was already closed");
		}
	}

/*#---------TodasAsPortas()---------------------------------------
 * Lê todas as portas ativas no computador
 * Retorna um vetor de inteiros com o numero correspondente às portas
-----------------------------------------------------------*/
	static public int[] PortasDisponiveis(){
		string [] portas = SerialPort.GetPortNames();
		int [] numPortas = new int[portas.Length];
		print ("Opened Serial Ports:");
		for(int i=0; i<portas.Length;i++){
			string [] separacao = portas[i].Split("M"[0]);
			int valorSeparacao = int.Parse(separacao[1]);
			numPortas[i]=valorSeparacao;
			print("COM"+numPortas[i]);
		}
		print ("-----end of ports------");
		return numPortas;
	}
	
	static public string[] PortasDisponiveisString(){
		string [] portas = SerialPort.GetPortNames();
		return  portas;
	}
	
	
	
	public void Escrever (string protocolo){
		if(Porta.IsOpen){
			Porta.WriteLine(protocolo);
			print ("Imprimiu na Serial: "+protocolo);
		}
		else{
			print ("porta Fechada");	
		}
		
	}
	
	
	 void OnApplicationQuit() {
		Fechar ();
		
	}
	
/*#---------Ler2()---------------------------------------
 * Lê o que está sendo escrito na porta serial indicada
 * Usar println() no arduino
 * Retorna o que foi lido como string;
-------------------------------------------------------*/
	public string Ler2(){
		string Leitura=null;
		Leitura=Porta.ReadLine();
		return Leitura;
	}
	
	
	
	
}//Fim da classe PortaSerial


