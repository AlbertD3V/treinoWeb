class MenuScene extends Phaser.Scene {
    constructor() {
        super('MenuScene');
    }

    preload() {
        this.load.image('fundo_menu', 'fundo_menu.png');
        this.load.image('btn_play', 'btn_play.png');
        this.load.image('chica_capa', 'chica_capa.png');
    }

    create() {
        this.add.image(400, 300, 'fundo_menu');

        this.add.image(400, 400, 'chica_capa').setScale(0.9);

        const botaoPlay = this.add.image(585, 375, 'btn_play').setScale(0.42);
        botaoPlay.setInteractive({ useHandCursor: true });
        botaoPlay.on('pointerdown', () => this.scene.start('Fase1'));
    }
}
