import React from 'react';
import styled from 'styled-components';

const Loading = () => {
  return (
    <StyledWrapper>
      <div className="overlay">
        <div className="characterContainer">
          <div className="load">Loading . . . </div>
          <div className="hands" />
          <div className="body" />
          <div className="head">
            <div className="eye" />
          </div>
        </div>
      </div>
    </StyledWrapper>
  );
}

const StyledWrapper = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  z-index: 9999;
  display: flex;
  justify-content: center;
  align-items: center;

  .overlay {
    background-color: rgba(255, 255, 255, 0.8);
    backdrop-filter: blur(2px);
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    display: flex;
    justify-content: center;
    align-items: center;
  }

  .characterContainer {
    position: relative;
    width: 180px;
    height: 200px;
    backface-visibility: hidden;
  }

  .head {
    backface-visibility: hidden;
    position: absolute;
    top: 0;
    left: 50%;
    transform: translateX(-50%);
    width: 80px;
    height: 80px;
    background: linear-gradient(145deg, #222, #000);
    border-radius: 50px;
    box-shadow: 
      inset -4px 2px 0px 0px rgba(240,220,220,0.8),
      0 4px 8px rgba(0,0,0,0.2);
    animation: headAnim 1.2s infinite alternate;
    animation-timing-function: ease-in-out;
  }

  .eye {
    width: 12px;
    height: 12px;
    background-color: rgba(240,220,220,1);
    border-radius: 50%;
    position: relative;
    left: 20px;
    top: 35px;
    box-shadow: 40px 0px 0px 0px rgba(240,220,220,1);
    animation: eyeBlink 3s infinite;
  }

  .body {
    position: absolute;
    top: 70px;
    left: 50%;
    transform: translateX(-50%);
    width: 140px;
    height: 120px;
    background: linear-gradient(145deg, #222, #000);
    border-radius: 50px/25px;
    box-shadow: 
      inset -5px 2px 0px 0px rgba(240,220,220,0.8),
      0 4px 8px rgba(0,0,0,0.2);
    animation: bodyAnim 1.5s infinite alternate;
    animation-timing-function: ease-in-out;
  }

  .hands {
    position: absolute;
    top: 120px;
    left: 50%;
    transform: translateX(-50%) rotate(45deg);
    width: 120px;
    height: 120px;
    background: linear-gradient(145deg, #222, #000);
    border-radius: 20px;
    box-shadow: 
      -1px -4px 0px 0px rgba(240,220,220,0.8),
      0 4px 8px rgba(0,0,0,0.2);
    z-index: 1;
    animation: handAnim 3s infinite ease-in-out;
  }

  .load {
    position: absolute;
    top: -40px;
    left: 50%;
    transform: translateX(-50%);
    height: 32px;
    text-align: center;
    line-height: 32px;
    font-family: 'Julius Sans One', sans-serif;
    font-size: 28px;
    font-weight: 400;
    color: #777;
    animation: 
      fontAnim 3s infinite ease-in-out,
      colorPulse 4s infinite alternate;
    word-wrap: break-word;
    display: block;
    overflow: hidden;
    white-space: nowrap;
  }

  @keyframes headAnim {
    0% { transform: translateX(-50%) translateY(0px) rotate(0deg); }
    30% { transform: translateX(-50%) translateY(5px) rotate(-2deg); }
    70% { transform: translateX(-50%) translateY(5px) rotate(2deg); }
    100% { transform: translateX(-50%) translateY(0px) rotate(0deg); }
  }

  @keyframes bodyAnim {
    0% { transform: translateX(-50%) translateY(-5px); }
    50% { transform: translateX(-50%) translateY(8px); }
    100% { transform: translateX(-50%) translateY(-5px); }
  }

  @keyframes handAnim {
    0% { transform: translateX(-50%) rotate(40deg) scale(1); }
    50% { transform: translateX(-50%) rotate(50deg) scale(1.05); }
    100% { transform: translateX(-50%) rotate(40deg) scale(1); }
  }

  @keyframes fontAnim {
    0% { width: 7ch; opacity: 0.7; }
    20% { width: 8ch; opacity: 1; }
    40% { width: 9ch; }
    60% { width: 10ch; }
    80% { width: 11ch; }
    100% { width: 12ch; }
  }

  @keyframes colorPulse {
    0% { color: #777; }
    100% { color: #333; }
  }

  @keyframes eyeBlink {
    0%, 10%, 100% { height: 12px; border-radius: 50%; }
    5% { height: 2px; border-radius: 0; }
  }
`;

export default Loading;