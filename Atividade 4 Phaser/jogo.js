class Jogo extends Phaser.Scene {
    constructor() {
        super('Jogo');
    }

    preload() {
        this.load.audio('musicaJogo', 'trilhasonoraDuranteJogo.mp3');
        this.load.audio('somPedra', 'bateuPedra.mp3');
        this.load.audio('somBau', 'coletaBau.mp3');
        this.load.audio('somMoeda', 'coletaMoeda.mp3');
    }

    create() {
        this.score = 20;
        this.totalBaus = 4;
        this.bausColetados = 0;
        this.podeBaterPedra = true;

        this.add.image(400, 300, 'fundo');

        this.musica = this.sound.add('musicaJogo', {
            loop: true,
            volume: 0.35
        });
        this.musica.play();

        this.somPedra = this.sound.add('somPedra', { volume: 0.8 });
        this.somBau = this.sound.add('somBau', { volume: 0.8 });
        this.somMoeda = this.sound.add('somMoeda', { volume: 0.9 });

        this.chao = this.physics.add.staticImage(400, 560, 'chao');
        this.chao.refreshBody();

        this.plataformas = this.physics.add.group({
            allowGravity: false,
            immovable: true
        });

        this.criarPlataformaMovel(160, 410, 90);
        this.criarPlataformaMovel(420, 315, -115);
        this.criarPlataformaMovel(185, 220, 135);

        this.plataformaFinal = this.physics.add.staticImage(690, 135, 'plataforma');
        this.plataformaFinal.refreshBody();

        this.player = this.physics.add.sprite(70, 460, 'dude');
        this.player.setBounce(0.1);
        this.player.setCollideWorldBounds(true);
        this.player.body.setSize(24, 46);
        this.player.body.setOffset(4, 2);

        this.criarAnimacoes();

        this.baus = this.physics.add.staticGroup();
        this.criarBau(190, 505);
        this.criarBau(335, 505);
        this.criarBau(515, 505);
        this.criarBau(665, 505);

        this.rochas = this.physics.add.staticGroup();
        this.criarRocha(255, 505);
        this.criarRocha(445, 505);
        this.criarRocha(610, 505);

        this.moeda = this.physics.add.staticImage(690, 80, 'moeda');
        this.moeda.refreshBody();

        this.scoreText = this.add.text(16, 16, 'Score: 20', {
            fontSize: '28px',
            fontFamily: 'Arial',
            color: '#ffffff',
            stroke: '#000000',
            strokeThickness: 4
        });

        this.cursors = this.input.keyboard.createCursorKeys();

        this.physics.add.collider(this.player, this.chao);
        this.physics.add.collider(this.player, this.plataformas);
        this.physics.add.collider(this.player, this.plataformaFinal);
        this.physics.add.collider(this.baus, this.chao);
        this.physics.add.collider(this.rochas, this.chao);

        this.physics.add.overlap(this.player, this.baus, this.coletarBau, null, this);
        this.physics.add.overlap(this.player, this.rochas, this.baterNaRocha, null, this);
        this.physics.add.overlap(this.player, this.moeda, this.coletarMoeda, null, this);

        this.events.once('shutdown', this.pararMusica, this);
    }

    update() {
        if (this.cursors.left.isDown) {
            this.player.setVelocityX(-180);
            this.player.anims.play('esquerda', true);
        } else if (this.cursors.right.isDown) {
            this.player.setVelocityX(180);
            this.player.anims.play('direita', true);
        } else {
            this.player.setVelocityX(0);
            this.player.anims.play('parado');
        }

        if (this.cursors.up.isDown && this.player.body.touching.down) {
            this.player.setVelocityY(-530);
        }
    }

    criarAnimacoes() {
        if (this.anims.exists('esquerda')) {
            return;
        }

        this.anims.create({
            key: 'esquerda',
            frames: this.anims.generateFrameNumbers('dude', { start: 0, end: 3 }),
            frameRate: 10,
            repeat: -1
        });

        this.anims.create({
            key: 'parado',
            frames: [{ key: 'dude', frame: 4 }],
            frameRate: 20
        });

        this.anims.create({
            key: 'direita',
            frames: this.anims.generateFrameNumbers('dude', { start: 5, end: 8 }),
            frameRate: 10,
            repeat: -1
        });
    }

    criarPlataformaMovel(x, y, velocidade) {
        const plataforma = this.plataformas.create(x, y, 'plataforma');
        plataforma.setImmovable(true);
        plataforma.body.allowGravity = false;
        plataforma.setCollideWorldBounds(true);
        plataforma.setBounce(1, 0);
        plataforma.setVelocityX(velocidade);
        return plataforma;
    }

    criarBau(x, y) {
        const bau = this.baus.create(x, y, 'bau');
        bau.refreshBody();
    }

    criarRocha(x, y) {
        const rocha = this.rochas.create(x, y, 'rocha');
        rocha.refreshBody();
    }

    coletarBau(player, bau) {
        bau.disableBody(true, true);
        this.bausColetados += 1;
        this.atualizarScore(20);
        this.somBau.play();
    }

    baterNaRocha(player) {
        if (!this.podeBaterPedra) {
            return;
        }

        this.podeBaterPedra = false;
        this.somPedra.play();
        this.atualizarScore(-20);
        player.setVelocityY(-250);
        player.setTint(0xff5555);

        this.time.delayedCall(900, () => {
            this.podeBaterPedra = true;
            player.clearTint();
        });

        if (this.score <= 0) {
            this.abrirGameOver();
        }
    }

    coletarMoeda() {
        if (this.bausColetados < this.totalBaus) {
            this.abrirGameOver();
            return;
        }

        this.somMoeda.play();
        this.moeda.disableBody(true, true);
        this.time.delayedCall(500, () => this.scene.start('Menu'));
    }

    atualizarScore(valor) {
        this.score += valor;
        this.scoreText.setText('Score: ' + this.score);
    }

    abrirGameOver() {
        this.scene.start('GameOver');
    }

    pararMusica() {
        if (this.musica && this.musica.isPlaying) {
            this.musica.stop();
        }
    }
}
