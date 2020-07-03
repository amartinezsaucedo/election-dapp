# Elecciones Dapp
Elecciones Dapp es una ejemplo de como podemos realizar un sistema de votación utilizando Blockchain y Smart contracts.

Puedes encontrar el video con una explicación mas detallada en: https://drive.google.com/file/d/124rbVyn9CpepsZJpRrN7AWkWtBaaa2M_/view?usp=sharing

## Dependencias
* [NPM](https://nodejs.org/en/)
* [Truffle](https://www.trufflesuite.com/)
* [Ganache](https://www.trufflesuite.com/ganache)
* Metamask
  - [Chrome](https://chrome.google.com/webstore/detail/metamask/nkbihfbeogaeaoehlefnkodbefgpgknn?hl=en)
  - [Firefox](https://addons.mozilla.org/es/firefox/addon/ether-metamask/)
## Configuración
#### Ganache
Luego de instalar Ganache, crear un nuevo WorkSpace haciendo click en "Quickstart Ethereum".
#### Metamask
Agregar el plugin en Chrome/Firefox, buscar el mismo en la tienda de cada navegador.
Una vez agregado, realizar lo siguiente:

1.  Crear una nueva billetera y agregar una contraseña.
2.  Click en la imagen de tu cuenta y seleccionar la opcion"Importar Cuenta".
3.  Para importar una cuenta, selecciona una en Ganacha haciendo click en "Mostrar Clave", copiar la clave privada y pegarla en Metatask. 
4.  Bajo en menu de "Main Ethereum Network" hacer click  "RCP Personalizadp" para agregar nuestro servidor local RCP.
5.  En Ganache, copiar el la dirección del servidor RCP y pegarlo en "Nuevo URL RCP". Agregar un nombre a la red y guardar los cambios. 
## Ejecutar localmente Elecciones Dapp.
### Instalar las dependencias
`$ npm install` instalara todas las dependencias de nuestro proyecto.

`$ npm install truffle` agrega la dependencia de Truffle.
## Migrar Contratos
Cada vez que iniciamos nuestro servidor Ganache, tendremos que ejecutar la migración de los contratos.

`$ truffle migrate --reset`
### Ejecutar
Ejecutar el comando `$ npm run dev`. 
Se abrirá automaticamente una pestaña en nuestro navegador.
## Ejecutar Pruebas
`$ truffle test`
 
