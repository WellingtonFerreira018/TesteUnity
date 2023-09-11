import React, { Fragment } from "react";
import { Unity, useUnityContext } from "react-unity-webgl";

import { StyledGame } from "./styled";
import { Modal } from "react-bootstrap";

export default function Game() {
  const url = "https://static.api.ebattle.lamia-edu.com/unity/arqs/";

  const { unityProvider, isLoaded, loadingProgression } = useUnityContext({
    loaderUrl: `${url}E-Battle BuildGL(10.09).loader.js`,
    dataUrl: `${url}E-Battle BuildGL(10.09).data.unityweb`,
    frameworkUrl: `${url}E-Battle BuildGL(10.09).framework.js.unityweb`,
    codeUrl: `${url}E-Battle BuildGL(10.09).wasm.unityweb`,
    webglContextAttributes: { preserveDrawingBuffer: true },
  });
  const loadingPercentage = Math.round(loadingProgression * 100);

  return (
    <StyledGame>
      {isLoaded === false && (
        <>
          <div className="modal show loading">
            <Modal.Dialog>
              <Modal.Header closeButton>
                <Modal.Title>Loading... ({loadingPercentage}%)</Modal.Title>
              </Modal.Header>

              <Modal.Body>
                <p>Configurando Informações do Game</p>
              </Modal.Body>
            </Modal.Dialog>
          </div>
        </>
      )}
      <Fragment>
        <Unity className="game" unityProvider={unityProvider} />
      </Fragment>
    </StyledGame>
  );
}
