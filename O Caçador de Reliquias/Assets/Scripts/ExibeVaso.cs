using UnityEngine;
using System.Collections;

public class ExibeVaso : MonoBehaviour {

	// Use this for initialization
	public int id;
	void Start () {
		if(id == 1)
			GetComponent<GUIText>().text = " x "+ PlayerPrefs.GetInt("vaso1");
		if(id == 3)
			GetComponent<GUIText>().text = " x "+ PlayerPrefs.GetInt("vaso2");
		if(id == 2)
			GetComponent<GUIText>().text = " x "+ PlayerPrefs.GetInt("vaso3");
		if(id == 4)
			GetComponent<GUIText>().text = "Score : "+Score.Pontos().ToString();
	}
	
	// Update is called once per frame
	void Update () {
	
	}
}
