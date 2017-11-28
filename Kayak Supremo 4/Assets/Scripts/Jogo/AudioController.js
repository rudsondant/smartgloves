#pragma strict
var jogador:GameObject;
var limite:float=1;
function Start () {
	if(jogador==null)
	jogador=GameObject.FindWithTag ("Jogador");
}

function Update () {
	if(jogador!=null){
		var dist=Vector3.Distance(gameObject.transform.position,jogador.transform.position);
		if(dist>=limite){
			GetComponent.<AudioSource>().mute=true;
		}
		else
			GetComponent.<AudioSource>().mute=false;
	}
}