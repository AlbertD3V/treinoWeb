const config = {
    type: Phaser.AUTO,
    parent: 'game',
    width: 1860,
    height: 720,
    backgroundColor: '#10140d',
    physics: {
        default: 'arcade',
        arcade: {
            debug: false
        }
    },
    scale: {
        mode: Phaser.Scale.FIT,
        autoCenter: Phaser.Scale.CENTER_BOTH
    },
    scene: [MenuScene, JogoScene]
};

new Phaser.Game(config);
