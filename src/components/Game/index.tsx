import {
    Unity,
    useUnityContext
} from 'react-unity-webgl';

import { StyledGame } from './styled';
import { Link } from 'react-router-dom';
import Button from 'react-bootstrap/Button';

export default function Game() {

    // const url = "https://static.api.ebattle.lamia-edu.com/unity/arqs/";

    const { unityProvider, isLoaded, loadingProgression, sendMessage } = useUnityContext({
        // loaderUrl: `${url}E-Battle BuildGL(JSON-API(05.14)).loader.js`,
        // dataUrl: `${url}E-Battle BuildGL(JSON-API(05.14)).data`,
        // frameworkUrl: `${url}E-Battle BuildGL(JSON-API(05.14)).framework.js`,
        // codeUrl: `${url}E-Battle BuildGL(JSON-API(05.14)).wasm`,
        loaderUrl: `Build2/E-Battle BuildGL(JSON-API).loader.js`,
        dataUrl: `Build2/E-Battle BuildGL(JSON-API).data`,
        frameworkUrl: `Build2/E-Battle BuildGL(JSON-API).framework.js`,
        codeUrl: `Build2/E-Battle BuildGL(JSON-API).wasm`,
        webglContextAttributes: { preserveDrawingBuffer: true },
    });
    const loadingPercentage = Math.round(loadingProgression * 100);

    function HandlerClick() {
        sendMessage('Canvas', 'SetIdMatche', "83");
        sendMessage('Canvas', 'SetTokenAPI', "9f31b35e8f78cb7a198c97b0d688c7f5fa6eeb046e78e0482d85072dee3e6ad36b95ebf80fc5128915f38efe055810ca9400d5b0a80bd090ac3af91aee0559e4");
    }
    HandlerClick();

    return (
        <StyledGame>
            {isLoaded === false && (
                <div className="loading-overlay">
                    <p>Loading... ({loadingPercentage}%)</p>
                </div>
            )}

            <Unity style={{ width: "100%", justifySelf: "center", alignSelf: "center", border: "2px solid red", borderRadius: '10px' }}
                unityProvider={unityProvider} />

            <Link to="/history">
                <Button variant="warning">Ver Historico</Button>
            </Link>
        </StyledGame>
    )
};
