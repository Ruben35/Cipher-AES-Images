import LogoApp from './components/LogoApp';
import SelectFile from './components/SelectFile';
import TextFieldKeyIV from './components/TextFieldKeyIV';
import ToggleCipher from './components/ToggleCipher';
import ToggleModeOperation from './components/ToggleModeOperation';
import './styles/Main.css'
import { useState } from 'react';
import CryptoJS from 'crypto-js';

function ascii_to_hex(str){
  var arr1 = [];
  for (var n = 0, l = str.length; n < l; n ++) 
      {
    var hex = Number(str.charCodeAt(n)).toString(16);
    arr1.push(hex);
    }
  return arr1.join('');
}

const encryptAES = (dataArg,modeArg,keyArg,ivArg) => {
  var key = CryptoJS.enc.Hex.parse(ascii_to_hex(keyArg));
  var iv = CryptoJS.enc.Hex.parse(ascii_to_hex(ivArg));
  
  var header = dataArg.substring(0,72);
  var body = dataArg.replace(header,"");

  var dataWords = CryptoJS.enc.Base64.parse(body);

  var modeOper;
  if(modeArg==="CBC")
    modeOper=CryptoJS.mode.CBC;
  else if(modeArg==="CFB")
    modeOper=CryptoJS.mode.CFB;
  else if(modeArg==="OFB")
    modeOper=CryptoJS.mode.OFB;
  else
    modeOper=CryptoJS.mode.ECB;

  var encrypted = CryptoJS.AES.encrypt(dataWords, key, {
    iv: iv,
    mode: modeOper,
    padding: CryptoJS.pad.ZeroPadding
  });

  var base64Data = encrypted.ciphertext.toString(CryptoJS.enc.Base64);
  
  return header+base64Data;
}

const decryptAES = (dataArg,modeArg,keyArg,ivArg) => {
  var key = CryptoJS.enc.Hex.parse(ascii_to_hex(keyArg));
  var iv = CryptoJS.enc.Hex.parse(ascii_to_hex(ivArg));
  
  var header = dataArg.substring(0,72);
  var body = dataArg.replace(header,"");

  var dataWords = CryptoJS.enc.Base64.parse(body);

  var modeOper;

  if(modeArg==="CBC")
    modeOper=CryptoJS.mode.CBC;
  else if(modeArg==="CFB")
    modeOper=CryptoJS.mode.CFB;
  else if(modeArg==="OFB")
    modeOper=CryptoJS.mode.OFB;
  else
    modeOper=CryptoJS.mode.ECB;

  var decrypt=CryptoJS.AES.decrypt({ciphertext: dataWords}, key, {
    iv: iv,
    mode: modeOper,
    padding: CryptoJS.pad.ZeroPadding
  });

  var base64Data = CryptoJS.enc.Base64.stringify(decrypt);
  
  return header+base64Data;
}

function App() {

  const [processType, setProcessType] = useState("encrypt");
  const [operationMode, setOperationMode] = useState("ECB");
  const [key, setKey] = useState("");
  const [iv, setIV] = useState("");
  const [image, setImage] = useState(null);

  const startAES = () => {
    // * Validating */

    if(image==null){
      window.api.makeMessage("Debe de seleccionar una imagen...");
      return;
    }
    if(key.length!==16){
      window.api.makeMessage("La llave debe de tener 16 caracteres");
      return;
    }
    if(iv.length!==16){
      window.api.makeMessage("El vector de inicialización debe tener 16 caracteres");
      return;
    }

    //* ENCRYPTION / DECRYPTION */

    var newImage= {name:"", data:""}
    
    //* FILE WRITE */
    if(processType==="encrypt"){
      newImage.data=encryptAES(image.data,operationMode,key,iv);
      newImage.name=image.name.replace('.bmp','_e'+operationMode+'.bmp');
    }else{
      newImage.data=decryptAES(image.data,operationMode,key,iv);
      newImage.name=image.name.replace('.bmp','_d'+operationMode+'.bmp');
    }
    window.api.writeImageFile(newImage);
  }

  return (
    <div className="mainContainer">
      <div className='left'> {/* LEFT CONTAINER */}
        <div className='appInfo'>
          <LogoApp/>
          <span>Cipher AES</span>
        </div>
        <ToggleCipher onChange={(e) => setProcessType(e)} />
      </div>
      <div className='right'> {/* RIGHT CONTAINER */}
        <span>Modo de Operación</span>
        <ToggleModeOperation onChange={(e) => setOperationMode(e)}/>
        <span>Imagen (.bmp)</span>
        <SelectFile onChange={(e) => setImage(e)}/>
        <span>Llave</span>
        <TextFieldKeyIV value={key} onChange={(e) => setKey(e)}/>
        <span>Vector de Inicialización (CO)</span>
        <TextFieldKeyIV value={iv} onChange={(e) => setIV(e)}/>
        <div className='buttonMake'>
          <button onClick={startAES}>{processType==="encrypt"?"Cifrar":"Descifrar"}</button>
        </div>
      </div>
    </div>
  );
}

export default App;