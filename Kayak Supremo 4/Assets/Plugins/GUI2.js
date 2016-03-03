#pragma strict



static function Botao(posTam:Rect,textura:Texture2D):boolean{
	var skinOriginal = GUI.skin;
	var newSkin = new GUISkin();
	newSkin.button.normal.background=null;
	GUI.skin = newSkin;
	GUI.DrawTexture(posTam,textura);
	if(GUI.Button(posTam," ")){
		return true;
	}
	GUI.skin = skinOriginal;
	return false;
}
