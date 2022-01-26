import React, { useState, useContext, useEffect } from "react";
import Tile from "./Tile";
import { TILE_COUNT, GRID_SIZE, BOARD_SIZE } from "./constants"; // 9, 3, 360
import { canSwap, shuffle, swap, isSolved } from "./helpers";
import StateContext from '../../hooks/context';
import './index.css';
import shrek_1 from '../../data/shrek/1.png';
import shrek_2 from '../../data/shrek/2.png';
import shrek_3 from '../../data/shrek/3.png';
import shrek_4 from '../../data/shrek/4.png';
import shrek_5 from '../../data/shrek/5.png';
import shrek_6 from '../../data/shrek/6.png';
import shrek_7 from '../../data/shrek/7.png';
import shrek_8 from '../../data/shrek/8.png';

const shrek = {
    0: shrek_1,
    1: shrek_2,
    2: shrek_3,
    3: shrek_4,
    4: shrek_5,
    5: shrek_6,
    6: shrek_7,
    7: shrek_8,
    8: ''
}

function Slido() {
  const [tiles, setTiles] = useState([...Array(TILE_COUNT).keys()]);
  const [isStarted, setIsStarted] = useState(false);
  // console.log('is started:', isStarted);
  const state = useContext(StateContext);
  const [hasBegunTime, setHasBegunTime] = useState({
      timer: null,
      seconds: 0,
  });
  
  const startTimer = () => {
    const hasBegunTimer = setInterval(() => {
        setHasBegunTime(state => ({
            ...state,
            seconds: state.seconds + 1,
        }))
    }, 1000);
    
    setHasBegunTime(state => ({
        ...state,
        seconds: 0,
        timer: hasBegunTimer,
    }));
  }

  const shuffleTiles = () => {
    const shuffledTiles = shuffle(tiles);
    console.log('shuffled', shuffledTiles);
    setTiles(shuffledTiles);
  }

  const swapTiles = (tileIndex) => {
    if (canSwap(tileIndex, tiles.indexOf(tiles.length - 1))) {
      const swappedTiles = swap(tiles, tileIndex, tiles.indexOf(tiles.length - 1))
      setTiles(swappedTiles);
    }
  }

  const handleTileClick = (index) => {
    swapTiles(index);
  }

  const handleShuffleClick = () => {
    shuffleTiles();
    setIsStarted(true);
    startTimer();
    
  }

  const handleStartClick = () => {
    shuffleTiles();
    setIsStarted(true);
    startTimer();
  }

  const pieceWidth = Math.round(BOARD_SIZE / GRID_SIZE);
  const pieceHeight = Math.round(BOARD_SIZE / GRID_SIZE);
  const style = {
    width: BOARD_SIZE,
    height: BOARD_SIZE,
  };
  
  useEffect(() => {
    // success
    if (isSolved(tiles) && isStarted) {
        console.log('success');
        //alert('Puzzle solved 🧠 🎉');
        setIsStarted(false);
        state.setSuccess(state.success + 1);
        clearInterval(hasBegunTime.timer);
    }
  }, [tiles, isStarted, state, hasBegunTime.timer]);

  return (
    <div className="slido-container">
      <ul style={style} className="board">
        {tiles.map((tile, index) => (
          <Tile
            key={tile}
            tile={tile}
            index={index}
            width={pieceWidth}
            height={pieceHeight}
            handleTileClick={handleTileClick}
            imgUrl={shrek[tile]}
          />
        ))}
      </ul>
      {/* isSolved(tiles) && isStarted && <div>Puzzle solved 🧠 🎉</div> */}
      {!isStarted ?
        (<button onClick={() => handleStartClick()}>Start game</button>) :
        (<button onClick={() => handleShuffleClick()}>Restart game</button>)}
       Time: {hasBegunTime.seconds} s
    </div>
  );
}

export default Slido;