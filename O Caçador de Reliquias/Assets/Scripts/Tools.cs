using UnityEngine;
using System.Collections;
using System.Threading;
using System;
using System.IO;
using System.Text.RegularExpressions;
using System.Collections.Generic;

public class Tools : MonoBehaviour {

	// Use this for initialization
	void Start () {
	
	}
	
	// Update is called once per frame
	void Update () {
	
	}

	private void enviarDados(float minutos, float segundos, float milisegundos, int pontos, 
	                               int numFlexao, int numExtensao, int flexao, int extensao){
//		string url = "http://smartglove.hol.es/sistema/includes/postdados.php";
		string url = "http://localhost/smartglove/sistema/includes/postdados.php";

		try{
			WWWForm form = new WWWForm();
			form.AddField("id_paciente", PlayerPrefs.GetInt ("id"));
			form.AddField("duracao_trial", string.Format("{1}", minutos, segundos, (int)milisegundos));
			form.AddField("pontos", pontos);
			form.AddField("num_flexoes", numFlexao);
			form.AddField("num_extensoes", numExtensao);
			form.AddField("valor_flexao", flexao);
			form.AddField("valor_extensao", extensao);
			
			
			WWW www = new WWW(url, form);
			StartCoroutine(WaitForRequest(www));
		}catch(Exception e){
			e.Message.ToString();
		}
	}
	
	 private IEnumerator WaitForRequest(WWW www)
	{
		yield return www;
		
		if (www.error == null){
			Debug.Log("WWW Ok!: " + www.data);
		} else {
			Debug.Log("WWW Error: "+ www.error);
		}    
	}

	private void escreveArquivo(float minutos, float segundos, float milisegundos, int pontos, 
	                            int numFlexao, int numExtensao, int flexao, int extensao, List<string> dados){

		string data = System.DateTime.Now.ToString("yyyy-MM-dd_HH-mm-ss");

//		StreamWriter writer = new StreamWriter(@"/Users/victoroliveira/Desktop/"+ PlayerPrefs.GetInt ("id").ToString()+"_"+data+".txt");

		StreamWriter writer = new StreamWriter("c:/SmartGlove/"+PlayerPrefs.GetInt ("id").ToString()+"_"+data+".txt");
		
		writer.WriteLine("Paciente: " + PlayerPrefs.GetInt ("id").ToString());
		writer.WriteLine("Duração Trial (Em segundos): " + string.Format("{1}", minutos, segundos, (int)milisegundos));
		writer.WriteLine("Pontos: " + pontos.ToString());
		writer.WriteLine("Numero de Flexões: " + numFlexao.ToString());
		writer.WriteLine("Número de Extensões: " + numExtensao.ToString());	
		writer.WriteLine("Flexão: " + flexao.ToString());
		writer.WriteLine("Extensão: " + extensao.ToString());
		writer.WriteLine ("\nDados da Luva \n");
		for (int i = 0; i < dados.Count; i++) {
			writer.WriteLine (dados[i]);
		}

		//Fechando o arquivo
		writer.Close();
		//Limpando a referencia dele da memória
		writer.Dispose();
	}

	public void finalizar(float minutos, float segundos, float milisegundos, int pontos, 
	                      int numFlexao, int numExtensao, int flexao, int extensao, List<string> dados){
		// Escrever Arquivo
		escreveArquivo(minutos,segundos,milisegundos,pontos,numFlexao,numExtensao,flexao,extensao,dados);
//		enviarDados(minutos,segundos,milisegundos,pontos,numFlexao,numExtensao,flexao,extensao);

	}


	
}
