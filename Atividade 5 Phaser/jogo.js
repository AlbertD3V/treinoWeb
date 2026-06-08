class JogoScene extends Phaser.Scene {
    constructor() {
        super('JogoScene');
    }

    preload() {
        this.load.video('fundoJogo', 'espa\u00e7o_sideral.mp4', 'loadeddata', false, true);
        this.load.spritesheet('player', 'player.png', {
            frameWidth: 32,
            frameHeight: 48
        });
        this.load.image('plataforma', 'plataforma.png');
        this.load.image('chave', 'chave.png');
        this.load.image('rocha', 'rocha.png');
        this.load.image('nave', 'nave.png');
    }

    create() {
        this.pontuacao = 0;
        this.tempoRestante = 40;
        this.jogoFinalizado = false;

        this.addVideoBackground('fundoJogo');
        this.createPlatforms();
        this.createPlayer();
        this.createAnimations();
        this.createCollectables();
        this.createRocks();
        this.createShip();
        this.createHud();
        this.createTimer();
        this.createCollisions();

        this.cursors = this.input.keyboard.createCursorKeys();
    }

    update() {
        if (this.jogoFinalizado) {
            return;
        }

        const touchingFloor = this.player.body.blocked.down || this.player.body.touching.down;

        if (this.cursors.left.isDown) {
            this.player.setVelocityX(-180);
            this.player.anims.play('esquerda', true);
        } else if (this.cursors.right.isDown) {
            this.player.setVelocityX(180);
            this.player.anims.play('direita', true);
        } else {
            this.player.setVelocityX(0);
            this.player.anims.play('parado', true);
        }

        if (this.cursors.up.isDown && touchingFloor) {
            this.player.setVelocityY(-620);
        }
    }

    addVideoBackground(key) {
        const video = this.add.video(400, 300, key);
        video.play(true);
        video.setDisplaySize(800, 600);
        video.setDepth(-10);
    }

    createPlatforms() {
        this.plataformas = this.physics.add.staticGroup();

        this.plataformas.create(400, 585, 'plataforma')
            .setScale(2.1, 1)
            .refreshBody();

        this.plataformas.create(610, 430, 'plataforma');
        this.plataformas.create(720, 305, 'plataforma');
        this.plataformas.create(815, 185, 'plataforma');
        this.plataformas.create(910, 85, 'plataforma').setScale(1.1,1);
    }

    createPlayer() {
        this.player = this.physics.add.sprite(620, 520, 'player', 1);
        this.player.setCollideWorldBounds(true);
        this.player.setBounce(0.05);
    }

    createAnimations() {
        this.anims.create({
            key: 'parado',
            frames: this.anims.generateFrameNumbers('player', { start: 1, end: 1 }),
            frameRate: 4,
            repeat: -1
        });

        this.anims.create({
            key: 'esquerda',
            frames: this.anims.generateFrameNumbers('player', { start: 3, end: 5 }),
            frameRate: 8,
            repeat: -1
        });

        this.anims.create({
            key: 'direita',
            frames: this.anims.generateFrameNumbers('player', { start: 6, end: 8 }),
            frameRate: 8,
            repeat: -1
        });
    }

    createCollectables() {
        this.chaves = this.physics.add.staticGroup();
        this.chaves.createMultiple([
            { key: 'chave', quantity:5, setXY: {x:35, y:560, stepX:135}},
            { key: 'chave', quantity:3, setXY: {x:445, y:400, stepX:170}},
            { key: 'chave', quantity:2, setXY: {x:610, y:275, stepX:125}},
            { key: 'chave', quantity:2, setXY: {x:700, y:155, stepX:90}}
        ]);
    }

    createRocks() {
        this.rochas = this.physics.add.staticGroup();
        this.rochas.createMultiple([
            { key: 'rocha', quantity: 3, setXY: { x: 105, y: 555, stepX:120 }},            
            { key: 'rocha', quantity: 1, setXY: { x: 540, y: 280 }},// pedra superior tile 03
            { key: 'rocha', quantity: 1, setXY: { x: 640, y: 160 }} //pedra superior tile 02
        ]);
    }

    createShip() {
        this.nave = this.physics.add.staticImage(765, 50, 'nave');
        this.nave.refreshBody();
    }

    createHud() {
        const textStyle = {
            fontFamily: 'Arial',
            fontSize: '24px',
            color: '#ffffff',
            stroke: '#000000',
            strokeThickness: 4
        };

        this.textoPontuacao = this.add.text(16, 16, 'Pontua\u00e7\u00e3o: 0', textStyle);
        this.textoTempo = this.add.text(16, 48, 'Tempo: 40', textStyle);
    }

    createTimer() {
        this.time.addEvent({
            delay: 1000,
            loop: true,
            callback: () => {
                if (this.jogoFinalizado) {
                    return;
                }

                this.tempoRestante -= 1;
                this.textoTempo.setText(`Tempo: ${this.tempoRestante}`);

                if (this.tempoRestante <= 0) {
                    this.reiniciarJogo();
                }
            }
        });
    }

    createCollisions() {
        this.physics.add.collider(this.player, this.plataformas);
        this.physics.add.collider(this.chaves, this.plataformas);
        this.physics.add.collider(this.rochas, this.plataformas);
        this.physics.add.collider(this.nave, this.plataformas);

        this.physics.add.overlap(this.player, this.chaves, this.coletarChave, null, this);
        this.physics.add.overlap(this.player, this.rochas, this.reiniciarJogo, null, this);
        this.physics.add.overlap(this.player, this.nave, this.checarVitoria, null, this);
    }

    coletarChave(player, chave) {
        chave.disableBody(true, true);
        this.pontuacao += 100;
        this.textoPontuacao.setText(`Pontua\u00e7\u00e3o: ${this.pontuacao}`);
    }

    checarVitoria() {
        if (this.pontuacao === 1200 && this.tempoRestante > 0) {
            this.jogoFinalizado = true;
            this.scene.start('MenuScene');
            return;
        }

        this.reiniciarJogo();
    }

    reiniciarJogo() {
        if (this.jogoFinalizado) {
            return;
        }

        this.jogoFinalizado = true;
        this.scene.restart();
    }
}
