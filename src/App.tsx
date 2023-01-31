import {
  Unity,
  useUnityContext
} from 'react-unity-webgl';

function App() {
  
  const { unityProvider, isLoaded, loadingProgression, sendMessage } = useUnityContext({
    loaderUrl: "Build/E-Battle Build(JSON-API).loader.js",
    dataUrl: "Build/E-Battle Build(JSON-API).data.unityweb",
    frameworkUrl: "Build/E-Battle Build(JSON-API).framework.js.unityweb",
    codeUrl: "Build/E-Battle Build(JSON-API).wasm.unityweb",
    webglContextAttributes: { preserveDrawingBuffer: true },
  });

  const loadingPercentage = Math.round(loadingProgression * 100);

  function HandlerClick() {
    sendMessage('Canvas', 'SetIdGame', "62");
    sendMessage('Canvas', 'SetTokenAPI', "26c510da94f75a6eecdd9e30d695830d84de9a4928b4fa79a2ef0dc5c258d3ba115a1f5e5656268b58b190469b966fd9d837ce032f3d9edff8c7edf05ecd8472");
  }

  HandlerClick()

  return (
    <div className='container'>
      {isLoaded === false && (
        <div className="loading-overlay">
          <p>Loading... ({loadingPercentage}%)</p>
        </div>
      )}
      <Unity style={{ width: "100%", justifySelf: "center", alignSelf: "center" }}
        unityProvider={unityProvider} />
    </div>
  );
}

export default App;
