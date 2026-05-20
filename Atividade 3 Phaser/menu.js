class MenuScene extends Phaser.Scene {
    constructor() {
        super('MenuScene');
    }

    preload() {
        this.load.image('menu', 'menu.png');
        this.load.image('play', 'play.png');
    }

    create() {
        this.add.image(930, 360, 'menu');

        const playButton = this.add.image(930, 520, 'play')
            .setInteractive({ useHandCursor: true })
            .setScale(1.1);

        this.tweens.add({
            targets: playButton,
            scale: 1.2,
            duration: 650,
            yoyo: true,
            repeat: -1,
            ease: 'Sine.easeInOut'
        });

        playButton.on('pointerdown', () => {
            this.scene.start('JogoScene');
        });
    }
}
