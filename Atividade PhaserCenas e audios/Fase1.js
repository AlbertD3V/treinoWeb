class Fase1 extends Phaser.Scene {
    constructor() {
        super('Fase1');
    }

    preload() {
        this.load.image('fundo_jogo', 'fundo_jogo.png');
        this.load.image('plataforma', 'plataforma.png');
        this.load.image('chave', 'chave.png');
        this.load.image('cadeado', 'cadeado.png');
        this.load.spritesheet('chica', 'chica.png', {
            frameWidth: 48,
            frameHeight: 64
        });

        this.load.audio('musica', 'musica do game.mp3');
        this.load.audio('som_chave', 'coleta chave.mp3');
        this.load.audio('som_cadeado', 'coleta cadeado.mp3');
        this.load.audio('som_passou', 'passou de fase.mp3');
    }

    create() {
        this.chavesColetadas = 0;
        this.reiniciando = false;
        this.add.image(400, 300, 'fundo_jogo');
        this.add.text(18, 18, 'Fase 1', {
            fontFamily: 'Arial',
            fontSize: '34px',
            color: '#ffffff'
        });

        this.criarMusica();
        this.criarAnimacoes();
        this.criarPlataformas([
            [105, 255],
            [460, 270],
            [800, 150],
            [800, 365]
        ]);

        this.player = this.physics.add.sprite(165, 190, 'chica', 7);
        this.player.setCollideWorldBounds(false);
        this.player.setBounce(0.05);
        this.physics.add.collider(this.player, this.plataformas);

        this.chaves = this.physics.add.staticGroup();
        this.chaves.create(780, 85, 'chave');
        this.chaves.create(780, 300, 'chave');
        this.physics.add.overlap(this.player, this.chaves, this.coletarChave, null, this);

        this.cadeado = this.physics.add.staticImage(25, 205, 'cadeado');
        this.physics.add.overlap(this.player, this.cadeado, this.tentarAbrirCadeado, null, this);

        this.cursors = this.input.keyboard.createCursorKeys();
    }

    update() {
        this.moverPlayer();

        if (this.player.y > 650 && !this.reiniciando) {
            this.reiniciarFaseComSom();
        }
    }

    criarMusica() {
        const musicaAtual = this.sound.get('musica');

        if (!musicaAtual) {
            this.musica = this.sound.add('musica', { loop: true, volume: 0.25 });
            this.musica.play();
            return;
        }

        if (!musicaAtual.isPlaying) {
            musicaAtual.play();
        }
    }

    criarAnimacoes() {
        if (this.anims.exists('parado')) {
            return;
        }

        this.anims.create({
            key: 'parado',
            frames: [{ key: 'chica', frame: 7 }],
            frameRate: 1
        });

        this.anims.create({
            key: 'andar',
            frames: this.anims.generateFrameNumbers('chica', { start: 3, end: 3 }),
            frameRate: 8,
            repeat: -1
        });

        this.anims.create({
            key: 'pular',
            frames: this.anims.generateFrameNumbers('chica', { start: 8, end: 11 }),
            frameRate: 8
        });
    }

    criarPlataformas(posicoes) {
        this.plataformas = this.physics.add.staticGroup();

        posicoes.forEach(([x, y]) => {
            this.plataformas.create(x, y, 'plataforma').setScale(0.6, 1).refreshBody();
        });
    }

    moverPlayer() {
        if (this.cursors.left.isDown) {
            this.player.setVelocityX(-180);
            this.player.setFlipX(true);
            this.player.anims.play('andar', true);
        } else if (this.cursors.right.isDown) {
            this.player.setVelocityX(180);
            this.player.setFlipX(false);
            this.player.anims.play('andar', true);
        } else {
            this.player.setVelocityX(0);
            this.player.anims.play('parado', true);
        }

        if (this.cursors.up.isDown && this.player.body.touching.down) {
            this.player.setVelocityY(-360);
            this.player.anims.play('pular', true);
        }

        if (!this.player.body.touching.down) {
            this.player.anims.play('pular', true);
        }
    }

    coletarChave(player, chave) {
        chave.disableBody(true, true);
        this.chavesColetadas++;
        this.sound.play('som_chave');
    }

    tentarAbrirCadeado() {
        if (this.chavesColetadas < 2) {
            this.reiniciarFaseComSom();
            return;
        }

        this.sound.play('som_passou');
        this.scene.start('Fase2');
    }

    reiniciarFaseComSom() {
        this.reiniciando = true;
        this.sound.play('som_passou');
        this.time.delayedCall(350, () => this.scene.restart());
    }
}
