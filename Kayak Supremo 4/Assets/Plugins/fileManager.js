#pragma strict
import System;
import System.IO;

var fileName = "CodigoDefault";
 
function Update(){
	if(Input.GetKeyDown("a")){
	
		SaveTextFile("TesteData","Mundo?"+Environment.NewLine);
	}
	
	if(Input.GetKeyDown("s")){
		AddLine("TesteData",Environment.NewLine+"Teste"+Environment.NewLine);
	}

}

static function SaveTextFile ( fileName : String, fileContent : String ) {
   //var sw : StreamWriter = new StreamWriter ( fileName );
   var folder: DirectoryInfo = new DirectoryInfo(Application.dataPath);
   var sw : StreamWriter= new StreamWriter(folder.Parent + "/" + fileName +".rsp");
   sw.Write ( fileContent );
   sw.Close ();
   print ( "Saved " + fileName );
}

static function LoadTextFile ( fileName : String ) {
   var t : String = "";
   var line : String = "-";
   var folder: DirectoryInfo = new DirectoryInfo(Application.dataPath);
   try {
      var sr : StreamReader = new StreamReader ( folder.Parent + "/" + fileName+".rsp");
      line = sr.ReadLine();
         while (line != null) {
            t += line;
			line = sr.ReadLine();
			if ( line != null ) {
				t += "\n";
			}
         }
      sr.Close();
      print ( "Loaded " + fileName );
   }
   catch (e) {
      print ( "Error: " + fileName );
   }
   return t;
}

static function Create (fileName:String){
	var folder: DirectoryInfo = new DirectoryInfo(Application.dataPath);
	 var sw : StreamWriter= new StreamWriter(folder.Parent + "/" + fileName +".rsp");
	 print ( "Created " + fileName );
}

static function AddLine (fileName:String,line:String){
	//var sw : StreamWriter= StreamWriter(Application.dataPath + "/" + fileName +".rsp");
	
	var todo:String=LoadTextFile(fileName);
	var folder: DirectoryInfo = new DirectoryInfo(Application.dataPath);
	
	var sw : StreamWriter= StreamWriter(folder.Parent + "/" + fileName +".rsp");
	sw.WriteLine(todo+line,Environment.NewLine);
	
	sw.Close ();
}

