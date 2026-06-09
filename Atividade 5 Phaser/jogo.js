class Jogo extends Phaser.Scene {
    constructor() {
        super('Jogo');

        this.faseAtual = 0;
        this.quantidadeCorreta = 1;
        this.bolasAtivas = 0;
        this.faseBloqueada = false;
    }

    preload() {
        this.load.image('fundo', 'Praça.png');
        this.load.image('galinha', 'galinhaT.png');
        this.load.image('gato', 'gatoT.png');
        this.load.image('porco', 'porcoT.png');
        this.load.image('coelho', 'coelhoT.png');
        this.load.image('ovelha', 'ovelhaT.png');
        this.load.image('bola1', 'um.png');
        this.load.image('bola2', 'dois.png');
        this.load.image('bola3', 'tres.png');
        this.load.image('bola4', 'quatro.png');
        this.load.image('bola5', 'cinco.png');
        this.load.spritesheet('panda', 'panda.png', {
            frameWidth: 70,
            frameHeight: 100
        });
    }

    create() {
        this.fases = [
            { nome: 'Galinha', imagem: 'galinha' },
            { nome: 'Gato', imagem: 'gato' },
            { nome: 'Porco', imagem: 'porco' },
            { nome: 'Coelho', imagem: 'coelho' },
            { nome: 'Ovelha', imagem: 'ovelha' }
        ];

        this.add.image(512, 284, 'fundo');

        this.textoFase = this.add.text(24, 18, '', {
            fontFamily: 'Arial',
            fontSize: '28px',
            color: '#ffffff',
            stroke: '#22577a',
            strokeThickness: 5
        });

        this.textoPergunta = this.add.text(512, 78, '', {
            fontFamily: 'Arial',
            fontSize: '34px',
            color: '#ffffff',
            stroke: '#22577a',
            strokeThickness: 6
        }).setOrigin(0.5);

        this.textoMensagem = this.add.text(512, 142, '', {
            fontFamily: 'Arial',
            fontSize: '32px',
            color: '#fff3b0',
            stroke: '#7a3e00',
            strokeThickness: 6
        }).setOrigin(0.5);

        this.animais = [];
        this.bolas = this.physics.add.group();

        this.criarAnimacoes();
        this.criarPanda();

        this.cursors = this.input.keyboard.createCursorKeys();
        this.physics.add.overlap(this.panda, this.bolas, this.colidirComBola, null, this);

        this.faseAtual = 0;
        this.iniciarFase();
    }

    update() {
        this.movimentarPanda();
        this.verificarBolasForaDaTela();
    }

    criarAnimacoes() {
        this.anims.create({
            key: 'andarEsquerda',
            frames: this.anims.generateFrameNumbers('panda', { start: 0, end: 3 }),
            frameRate: 8,
            repeat: -1
        });

        this.anims.create({
            key: 'andarDireita',
            frames: this.anims.generateFrameNumbers('panda', { start: 4, end: 6 }),
            frameRate: 8,
            repeat: -1
        });
    }

    criarPanda() {
        this.panda = this.physics.add.sprite(920, 480, 'panda');
        this.panda.setScale(0.9);
        this.panda.setCollideWorldBounds(true);
        this.panda.body.setAllowGravity(false);
        this.panda.setSize(48, 82);
        this.panda.setOffset(16, 14);
    }

    iniciarFase() {
        const fase = this.fases[this.faseAtual];

        this.faseBloqueada = false;
        this.textoMensagem.setText('');
        this.textoFase.setText(`Fase ${this.faseAtual + 1}: ${fase.nome}`);
        this.textoPergunta.setText(`Quantos(as) ${fase.nome.toLowerCase()}s aparecem?`);

        this.panda.setPosition(920, 480);
        this.panda.setVelocity(0, 0);
        this.panda.setFrame(4);

        this.limparAnimais();
        this.limparBolas();

        this.quantidadeCorreta = Phaser.Math.RND.between(1, 5);
        this.mostrarAnimais(fase.imagem, this.quantidadeCorreta);
        this.criarBolas();
    }

    limparAnimais() {
        this.animais.forEach((animal) => animal.destroy());
        this.animais = [];
    }

    mostrarAnimais(chaveImagem, quantidade) {
        const posicoes = [
            { x: 260, y: 235 },
            { x: 380, y: 235 },
            { x: 500, y: 235 },
            { x: 620, y: 235 },
            { x: 740, y: 235 }
        ];

        for (let i = 0; i < quantidade; i++) {
            const animal = this.add.image(posicoes[i].x, posicoes[i].y, chaveImagem);
            this.animais.push(animal);
        }
    }

    criarBolas() {
        const posicoesX = Phaser.Utils.Array.Shuffle([150, 315, 480, 645, 810]);

        for (let i = 1; i <= 5; i++) {
            const bola = this.bolas.create(posicoesX[i - 1], -Phaser.Math.Between(40, 220), `bola${i}`);

            bola.numero = i;
            bola.setVelocityY(Phaser.Math.Between(150, 260));
            bola.setBounce(0);
            bola.setCollideWorldBounds(false);
            bola.body.setAllowGravity(false);
        }

        this.bolasAtivas = 5;
    }

    limparBolas() {
        this.bolas.clear(true, true);
        this.bolasAtivas = 0;
    }

    movimentarPanda() {
        if (this.cursors.left.isDown) {
            this.panda.setVelocityX(-280);
            this.panda.anims.play('andarEsquerda', true);
        } else if (this.cursors.right.isDown) {
            this.panda.setVelocityX(280);
            this.panda.anims.play('andarDireita', true);
        } else {
            this.panda.setVelocityX(0);
            this.panda.anims.stop();
        }
    }

    verificarBolasForaDaTela() {
        if (this.faseBloqueada) {
            return;
        }

        this.bolas.children.each((bola) => {
            if (bola.active && bola.y > 620) {
                bola.disableBody(true, true);
                this.bolasAtivas--;
            }
        });

        if (this.bolasAtivas <= 0) {
            this.limparBolas();
            this.criarBolas();
        }
    }

    colidirComBola(panda, bola) {
        if (this.faseBloqueada || !bola.active) {
            return;
        }

        if (bola.numero === this.quantidadeCorreta) {
            this.acertarFase();
            return;
        }

        this.textoMensagem.setText('Tente novamente!');
        this.limparBolas();
        this.criarBolas();
        this.time.delayedCall(700, () => {
            if (!this.faseBloqueada) {
                this.textoMensagem.setText('');
            }
        });
    }

    acertarFase() {
        this.faseBloqueada = true;
        this.limparBolas();

        if (this.faseAtual === this.fases.length - 1) {
            this.textoMensagem.setText('Parabens, voce venceu!');
            this.time.delayedCall(1800, () => this.scene.start('Menu'));
            return;
        }

        this.textoMensagem.setText('Parabens, voce acertou!');
        this.faseAtual++;
        this.time.delayedCall(1300, () => this.iniciarFase());
    }
}
