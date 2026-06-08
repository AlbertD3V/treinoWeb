const config = {
    type: Phaser.AUTO,
    width: 1024,
    height: 568,
    parent: 'game',
    backgroundColor: '#87ceeb',
    physics: {
        default: 'arcade',
        arcade: {
            gravity: { y: 500 },
            debug: false
        }
    },
    scene: [Menu, Jogo]
};

const game = new Phaser.Game(config);
