class MenuScene extends Phaser.Scene {
    constructor() {
        super('MenuScene');
    }

    preload() {
        this.load.video('fundoMenu', 'espa\u00e7o_sideral.mp4', 'loadeddata', false, true);
        this.load.image('playerCapa', 'player_capa.png');
        this.load.image('botaoPlay', 'botao.png');
    }

    create() {
        this.addVideoBackground('fundoMenu');

        this.add.image(400, 260, 'playerCapa')
            .setScale(0.55);

        const botao = this.add.image(400, 500, 'botaoPlay')
            .setInteractive({ useHandCursor: true });

        botao.on('pointerover', () => botao.setScale(1.08));
        botao.on('pointerout', () => botao.setScale(1));
        botao.on('pointerdown', () => this.scene.start('JogoScene'));
    }

    addVideoBackground(key) {
        const video = this.add.video(400, 300, key);
        video.play(true);
        video.setDisplaySize(800, 600);
        video.setDepth(-10);
    }
}
