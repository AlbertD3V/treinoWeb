class GameOver extends Phaser.Scene {
    constructor() {
        super('GameOver');
    }

    create() {
        this.add.image(400, 300, 'fundo');

        this.add.text(400, 210, 'GAME OVER', {
            fontSize: '56px',
            fontFamily: 'Arial',
            color: '#ffffff',
            stroke: '#000000',
            strokeThickness: 6
        }).setOrigin(0.5);

        this.add.text(400, 285, 'Tente novamente!', {
            fontSize: '28px',
            fontFamily: 'Arial',
            color: '#ffffff',
            stroke: '#000000',
            strokeThickness: 4
        }).setOrigin(0.5);

        const botao = this.add.rectangle(400, 370, 230, 64, 0x2f855a)
            .setStrokeStyle(4, 0xffffff)
            .setInteractive({ useHandCursor: true });

        const texto = this.add.text(400, 370, 'Voltar ao Menu', {
            fontSize: '24px',
            fontFamily: 'Arial',
            color: '#ffffff'
        }).setOrigin(0.5);

        botao.on('pointerover', () => botao.setFillStyle(0x38a169));
        botao.on('pointerout', () => botao.setFillStyle(0x2f855a));
        botao.on('pointerdown', () => this.scene.start('Menu'));
        texto.setInteractive({ useHandCursor: true });
        texto.on('pointerdown', () => this.scene.start('Menu'));
    }
}
