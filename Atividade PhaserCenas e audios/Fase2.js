class Fase2 extends Phaser.Scene {
    constructor() {
        super('Fase2');
    }

    create() {
        this.chavesColetadas = 0;
        this.reiniciando = false;
        this.add.image(400, 300, 'fundo_jogo');
        this.add.text(18, 18, 'Fase 2', {
            fontFamily: 'Arial',
            fontSize: '34px',
            color: '#ffffff'
        });

        this.criarPlataformas([
            [105, 275],
            [390, 360],
            [800, 150],
            [720, 410]
        ]);

        this.player = this.physics.add.sprite(650, 340, 'chica', 0);
        this.player.setCollideWorldBounds(false);
        this.player.setBounce(0.05);
        this.physics.add.collider(this.player, this.plataformas);

        this.chaves = this.physics.add.staticGroup();
        this.chaves.create(25, 215, 'chave');
        this.chaves.create(780, 85, 'chave');
        this.physics.add.overlap(this.player, this.chaves, this.coletarChave, null, this);

        this.cadeado = this.physics.add.staticImage(755, 340, 'cadeado');
        this.physics.add.overlap(this.player, this.cadeado, this.tentarAbrirCadeado, null, this);

        this.cursors = this.input.keyboard.createCursorKeys();
    }

    update() {
        this.moverPlayer();

        if (this.player.y > 650 && !this.reiniciando) {
            this.reiniciarFaseComSom();
        }
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

        this.sound.play('som_cadeado');
        this.scene.start('MenuScene');
    }

    reiniciarFaseComSom() {
        this.reiniciando = true;
        this.sound.play('som_passou');
        this.time.delayedCall(350, () => this.scene.restart());
    }
}
