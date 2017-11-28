using UnityEngine;
using System.Collections;
using System.IO.Ports;
using System.Threading;

public class Ned_API : MonoBehaviour {
	SerialPort portaSerial;
	Thread read;
	Thread send;
	public bool ativo=false;
	public bool ready=false; //Se a conexão com a luva está pronta ou não
	private bool exibirLog=true;
	public string Leitura;
	public float mediaDedos;
	public int[] valorDedos;
	public bool lerAngulos=false;
	//Calibração*****************
	public int[] valorDedosAbertos;
	public int[] valorDedosFechados;
	public float mediaAberta;
	public float mediaFechada;
	//**************************
	//Abertura máxima e mínima
	public float mediaMax=0;
	public float mediaMin=2000;
	//FlexoExtensões***********
	private bool flexed=false;
	private float mediaAnterior;
	public int flexoExt=0;
	public float[] anguloDedos; //Angulo em graus dos dedos (apenas após calibração)
	float time=0f;
	float timePrev=0;
	private bool ativarEscrita=false;
	private string protocol="";
	private string log="";
	private bool runTimeDebug=false;
	
	public void StartConnection(string portName,int bauds){
		portaSerial = new SerialPort();
		print (portName + ":" + bauds);
		portaSerial.PortName=portName;
		portaSerial.BaudRate=bauds;
		portaSerial.Parity=Parity.None;
		portaSerial.DataBits=8;
		portaSerial.StopBits=StopBits.One;
		portaSerial.DtrEnable = true;
		portaSerial.ReadTimeout=-1;
		portaSerial.WriteTimeout=-1;
		portaSerial.Open();
		read = new Thread(Ler);
		read.Start();
		ativo=true;


	}
	
	void Ler(){
		
		while(true){
			
			//Escrevendo
			if(ativarEscrita){
				portaSerial.WriteLine(protocol);
				//Thread.Sleep(1);
				ativarEscrita=false;
				if(exibirLog){
					print ("#NED_API: Escreveu -> "+protocol);
				}
			}
			//LENDO OS DADOS
			else{
				Leitura=portaSerial.ReadLine();
				if (Leitura != null) {
					ready = true;
				}
			}

			mediaDedos=MediaAtual();
			//Setando máximos e mínimos
			if(mediaDedos>mediaMax){
				mediaMax=mediaDedos;
			}
			if(mediaDedos<mediaMin){
				mediaMin=mediaDedos;
			}
			//FlexExtensões
			float mid = (mediaAberta+mediaFechada)/2;
			if(mediaAnterior<mid && mediaDedos>mid){
				flexoExt++;
			}
			mediaAnterior=mediaDedos;
			LerCadaInt ();//Lê o valor (int) de cada dedo
			float dT=time-timePrev;
			log="#NED_API_LOG"+"	#Leitura:"+Leitura+"	#Media:"+mediaDedos+"	#Tempo de processamento:"+dT+"segundos";
			if(exibirLog){
				print ("#NED_API_LOG"+"	#Leitura:"+Leitura+"	#Media:"+mediaDedos+"	#Tempo de processamento:"+dT+"segundos");
			}
			timePrev=time;
			//Angulos
			if(lerAngulos){
				ProcessarAngulos();
			}
			
		}
			
	}	

	void OnApplicationQuit(){
		if(portaSerial.IsOpen)
			portaSerial.Close();
	}
	
	/********************************************
	 * LerCada() - Separa a leitura em um vetor de String
	 * *****************************************/
	public int[] LerCadaInt(){
		
		string[] newLeitura = Leitura.Split(';');

		valorDedos = new int[newLeitura.Length];

		for(int i=0; i<newLeitura.Length; i++){
 			valorDedos[i]=int.Parse(newLeitura[i]);
 		}
		return valorDedos;
	}
	
	public float MediaAtual(){
		float soma=0;
		for(int i=0; i<valorDedos.Length; i++){
			soma+=valorDedos[i];
		}
		float result=soma/valorDedos.Length;
		return result;
	}
	
	public void Fechar (){ 
		if(portaSerial.IsOpen){
			portaSerial.Close();
			print ("Serial Port "+portaSerial.PortName+" is closed");
		}
		else{
			print ("Serial Port "+portaSerial.PortName+" was already closed");
		}
	}
	
	void Update(){
		time+=Time.deltaTime;	
		//Ativando debug
		if(Input.GetKey(KeyCode.LeftControl) && Input.GetKeyDown(KeyCode.M)){
				runTimeDebug=!runTimeDebug;
		}
	}
	
	public void SendData(string inprotocol){
		protocol=inprotocol;
		ativarEscrita=true;
	}
	
	public float AnguloDedo(int atual, int aberto, int fechado, int angMin, int angMax){
		float angulo;
		if((fechado-aberto)+angMin!=0)
			angulo = ((atual-aberto)*(angMax-angMin))/((fechado-aberto)+angMin);
		else angulo=0;
		if(angulo>angMax)
			angulo=angMax;
		if(angulo<angMin)
			angulo=angMin;
		return angulo;
	}
		
	public void SetAbertos(){
		valorDedosAbertos=valorDedos;
	}
	
	public void SetFechados(){
		valorDedosFechados=valorDedos;
	}
	
	public void ProcessarAngulos(){
		anguloDedos = new float[5];
		for(int i=0; i<valorDedos.Length; i++){
			anguloDedos[i]=AnguloDedo(valorDedos[i],valorDedosAbertos[i],valorDedosFechados[i],0,90);
		}	
	}
	
	//Medias de calibração
	public float SetMediaAberta(){
		mediaAberta=MediaAtual();
		return mediaAberta;
	}
	public float SetMediaFechada(){
		mediaFechada=MediaAtual();
		return mediaFechada;
	}
	
	//Debug no runtime crtl+M
	void OnGUI(){
		if(runTimeDebug==true){
			GUI.skin.label.fontSize=11;
			//GUI.Label(Rect(0,0,Screen.width,Screen.height*0.5),"log");	
			GUI.Label(new Rect(0, Screen.height-40, Screen.width, 40), log);
		}
		
	}
	
	
}
