class Menu extends Phaser.Scene {
    constructor() {
        super('Menu');
    }

    preload() {
        this.load.image('fundo', 'Praça.png');
        this.load.image('numeroCincoMenu', 'cinco_menu.png');
        this.load.image('botaoJogar', 'btn_jogar.png');
    }

    create() {
        this.add.image(512, 284, 'fundo');

        this.add.text(512, 80, 'Pandinha do Calculo', {
            fontFamily: 'Arial',
            fontSize: '54px',
            color: '#ffffff',
            stroke: '#22577a',
            strokeThickness: 8
        }).setOrigin(0.5);

        this.add.text(512, 145, 'Conte os animais de 1 ate 5', {
            fontFamily: 'Arial',
            fontSize: '28px',
            color: '#ffffff',
            stroke: '#22577a',
            strokeThickness: 5
        }).setOrigin(0.5);

        this.add.image(512, 285, 'numeroCincoMenu').setScale(1.25);

        const botao = this.add.image(512, 445, 'botaoJogar').setInteractive({
            useHandCursor: true
        });

        botao.on('pointerover', () => botao.setScale(1.08));
        botao.on('pointerout', () => botao.setScale(1));
        botao.on('pointerdown', () => this.scene.start('Jogo'));
    }
}
