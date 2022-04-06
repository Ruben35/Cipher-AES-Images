import LogoApp from './components/LogoApp';
import './styles/Main.css'

function App() {
  return (
    <div className="mainContainer">
      
      <div> {/* LEFT CONTAINER */}
        <div className='appInfo'>
          <LogoApp/>
          <span>Cipher AES</span>
        </div>
      </div>
      <div> {/* RIGHT CONTAINER */}
        Right
      </div>
    </div>
  );
}

export default App;