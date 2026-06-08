class Menu extends Phaser.Scene {
    constructor() {
        super('Menu');
    }

    preload() {
        this.load.image('fundo', 'fundo.png');
        this.load.image('chao', 'chao.png');
        this.load.image('plataforma', 'plataforma.png');
        this.load.image('bau', 'bau.png');
        this.load.image('rocha', 'rocha.png');
        this.load.image('moeda', 'moeda.png');
        this.load.spritesheet('dude', 'dude.png', {
            frameWidth: 32,
            frameHeight: 48
        });

    }

    create() {
        this.add.image(400, 300, 'fundo');

        this.add.text(400, 150, 'Caça ao Tesouro', {
            fontSize: '54px',
            fontFamily: 'Arial',
            color: '#ffffff',
            stroke: '#000000',
            strokeThickness: 6
        }).setOrigin(0.5);

        this.add.text(400, 215, 'Colete os baús antes da moeda', {
            fontSize: '25px',
            fontFamily: 'Arial',
            color: '#ffffff',
            stroke: '#000000',
            strokeThickness: 4
        }).setOrigin(0.5);

        const botao = this.add.rectangle(400, 330, 210, 68, 0x2563eb)
            .setStrokeStyle(4, 0xffffff)
            .setInteractive({ useHandCursor: true });

        const texto = this.add.text(400, 330, 'Iniciar Jogo', {
            fontSize: '27px',
            fontFamily: 'Arial',
            color: '#ffffff'
        }).setOrigin(0.5);

        botao.on('pointerover', () => botao.setFillStyle(0x1d4ed8));
        botao.on('pointerout', () => botao.setFillStyle(0x2563eb));
        botao.on('pointerdown', () => this.scene.start('Jogo'));
        texto.setInteractive({ useHandCursor: true });
        texto.on('pointerdown', () => this.scene.start('Jogo'));
    }
}
