import React, { Fragment } from "react";
import { Unity, useUnityContext } from "react-unity-webgl";

import { StyledGame } from "./styled";
import { Modal } from "react-bootstrap";

export const Game: React.FC = () => {
  const searchParams = new URLSearchParams(window.location.search);
  const id_game = searchParams.get("id");
  const token = localStorage.getItem("token");

  const url =
    "https://static.api.ebattle.lamia-edu.com/unity/arqs/E-BattleBuildGL(16-10)/";

  const { unityProvider, isLoaded, loadingProgression, sendMessage } =
    useUnityContext({
      loaderUrl: `${url}E-Battle BuildGL.loader.js`,
      dataUrl: `${url}E-Battle BuildGL.data.unityweb`,
      frameworkUrl: `${url}E-Battle BuildGL.framework.js.unityweb`,
      codeUrl: `${url}E-Battle BuildGL.wasm.unityweb`,
      webglContextAttributes: { preserveDrawingBuffer: true },
    });
  const loadingPercentage = Math.round(loadingProgression * 100);

  function HandlerClick() {
    if (id_game !== null && token !== null) {
      sendMessage("Canvas", "SetIdMatche", "92");
      sendMessage("Canvas", "SetTokenAPI", token);
    }
  }
  HandlerClick();

  return (
    <StyledGame>
      {isLoaded === false && (
        <>
          <div className="loading">
            <Modal.Dialog>
              <Modal.Header>
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
};
