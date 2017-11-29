# smartgloves
Repositório de códigos dos projetos de luvas de dados do laboratório TEAM

O projeto possui dois jogos: O Caçadores de Reliquias e o Kaiak Supremo 4.0.


## Requisitos

* [CP210x_Windows_Drivers](https://www.silabs.com/products/development-tools/software/usb-to-uart-bridge-vcp-drivers) - Driver para o hardware.


## Funcionamento

Para testar é possível utilizar o projeto SerialPortToString em C++, dentro dele consta o executável compilado para Windows e um .bat para rodar.

O executável pede os parâmetros: -p porta e -b bauds:
```
SerialPortToString.exe -p 3 -b 115200
```

Seu retorno será uma string:
```
233;240;220;253;232;
```

Os números não estão na ordem respectivas dos dedos, isso depende da disposição dos sensores na luva, o valor máximo para cada sensor é 250.
