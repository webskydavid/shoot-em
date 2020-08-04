import 'phaser';
import MainScene from './scenes/mainScene';
import PreloadScene from './scenes/preloadScene';
import {SCREEN_HEIGHT, SCREEN_WIDTH, GLOBAL_GRAVITY} from './../constants';

const config: Phaser.Types.Core.GameConfig = {
  type: Phaser.AUTO,
  backgroundColor: '#ffffff',
  render: {
    antialias: false,
    pixelArt: true,
  },
  scale: {
    parent: 'phaser-game',
    mode: Phaser.Scale.FIT,
    autoCenter: Phaser.Scale.CENTER_BOTH,
    width: SCREEN_WIDTH,
    height: SCREEN_HEIGHT,
  },
  scene: [PreloadScene, MainScene],
  physics: {
    default: 'arcade',
    arcade: {
      debug: true,
      gravity: {y: GLOBAL_GRAVITY},
      debugShowBody: true,
    },
  },
};

window.addEventListener('load', () => {
  const game = new Phaser.Game(config);
});
