import LogoApp from './components/LogoApp';
import SelectFile from './components/SelectFile';
import TextFieldKeyIV from './components/TextFieldKeyIV';
import ToggleCipher from './components/ToggleCipher';
import ToggleModeOperation from './components/ToggleModeOperation';
import './styles/Main.css'

function App() {
  return (
    <div className="mainContainer">
      
      <div className='left'> {/* LEFT CONTAINER */}
        <div className='appInfo'>
          <LogoApp/>
          <span>Cipher AES</span>
        </div>
        <ToggleCipher onChange={(event) => console.log("Type: "+event)} />
      </div>
      <div className='right'> {/* RIGHT CONTAINER */}
        <span>Modo de Operación</span>
        <ToggleModeOperation onChange={(event) => console.log("Mode: "+event)}/>
        <span>Imagen (.bmp)</span>
        <SelectFile/>
        <span>Llave</span>
        <TextFieldKeyIV/>
        <span>Vector de Inicialización (CO)</span>
        <TextFieldKeyIV/>
        <div className='buttonMake'>
          <button>Cifrar</button>
        </div>
      </div>
    </div>
  );
}

export default App;