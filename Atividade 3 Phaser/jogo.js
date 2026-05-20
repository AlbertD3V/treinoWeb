class JogoScene extends Phaser.Scene {
    constructor() {
        super('JogoScene');
        this.score = 0;
        this.lives = 3;
        this.canTakeDamage = true;
    }

    preload() {
        this.load.image('floresta', 'floresta.png');
        this.load.image('banana', 'banana.png');
        this.load.image('cobra', 'cobra.png');
        this.load.image('vida', 'vida.png');
        this.load.spritesheet('macaco', 'macaco.png', {
            frameWidth: 65,
            frameHeight: 65
        });
        this.load.spritesheet('lobo', 'lobo.png', {
            frameWidth: 128,
            frameHeight: 128
        });
    }

    create() {
        this.score = 0;
        this.lives = 3;
        this.canTakeDamage = true;

        this.add.image(930, 360, 'floresta');
        this.physics.world.setBounds(0, 0, 1860, 720);

        this.createAnimations();
        this.createInterface();
        this.createCollectibles();
        this.createEnemies();
        this.createPlayer();
        this.createWolf();

        this.cursors = this.input.keyboard.createCursorKeys();
        this.keys = this.input.keyboard.addKeys('W,A,S,D');

        this.physics.add.overlap(this.player, this.bananas, this.collectBanana, null, this);
        this.physics.add.overlap(this.player, this.snakes, this.hitEnemy, null, this);
        this.physics.add.overlap(this.player, this.wolf, this.hitEnemy, null, this);
    }

    update() {
        this.movePlayer();
        this.moveWolf();
    }

    createAnimations() {
        this.anims.create({
            key: 'macaco_down',
            frames: this.anims.generateFrameNumbers('macaco', { start: 0, end: 11 }),
            frameRate: 8,
            repeat: -1
        });

        this.anims.create({
            key: 'macaco_right',
            frames: this.anims.generateFrameNumbers('macaco', { start: 24, end: 35 }),
            frameRate: 8,
            repeat: -1
        });

        this.anims.create({
            key: 'macaco_left',
            frames: this.anims.generateFrameNumbers('macaco', { start: 12, end: 23 }),
            frameRate: 8,
            repeat: -1
        });

        this.anims.create({
            key: 'macaco_up',
            frames: this.anims.generateFrameNumbers('macaco', { start: 36, end: 45 }),
            frameRate: 8,
            repeat: -1
        });

        this.anims.create({
            key: 'lobo_run',
            frames: this.anims.generateFrameNumbers('lobo', { start: 0, end: 8 }),
            frameRate: 10,
            repeat: -1
        });
    }

    createInterface() {
        this.scoreText = this.add.text(28, 22, 'Pontuacao: 0', {
            fontFamily: 'Arial',
            fontSize: '32px',
            fontStyle: 'bold',
            color: '#ffffff',
            stroke: '#19310d',
            strokeThickness: 6
        }).setDepth(10);

        this.lifeIcons = [];

        for (let i = 0; i < 3; i++) {
            const heart = this.add.image(50 + i * 48, 86, 'vida')
                .setDepth(10);
            this.lifeIcons.push(heart);
        }
    }

    createCollectibles() {
        const bananaPositions = [
            { x: 310, y: 180 },
            { x: 710, y: 145 },
            { x: 1080, y: 205 },
            { x: 1510, y: 160 },
            { x: 520, y: 555 },
            { x: 1280, y: 540 }
        ];

        this.bananas = this.physics.add.staticGroup();

        bananaPositions.forEach((position) => {
            this.bananas.create(position.x, position.y, 'banana')
                .setScale(0.65)
                .refreshBody();
        });
    }

    createEnemies() {
        const snakePositions = [
            { x: 205, y: 330 },
            { x: 440, y: 470 },
            { x: 670, y: 300 },
            { x: 860, y: 575 },
            { x: 1040, y: 370 },
            { x: 1235, y: 490 },
            { x: 1420, y: 285 },
            { x: 1590, y: 555 },
            { x: 1740, y: 405 }
        ];

        this.snakes = this.physics.add.staticGroup();

        snakePositions.forEach((position) => {
            const snake = this.snakes.create(position.x, position.y, 'cobra')
                .setScale(0.9);
            snake.refreshBody();
            snake.body.setSize(60, 35).setOffset(13, 12);
        });
    }

    createPlayer() {
        this.player = this.physics.add.sprite(165, 360, 'macaco', 0)
            .setScale(1.25)
            .setCollideWorldBounds(true);

        this.player.body.setSize(35, 42).setOffset(15, 18);
    }

    createWolf() {
        this.wolf = this.physics.add.sprite(-90, Phaser.Math.Between(125, 610), 'lobo')
            .setScale(0.9)
            .play('lobo_run');

        this.wolf.body.setSize(88, 56).setOffset(20, 52);
        this.resetWolf();
    }

    movePlayer() {
        const speed = 260;
        let velocityX = 0;
        let velocityY = 0;
        let animation = null;

        if (this.cursors.left.isDown || this.keys.A.isDown) {
            velocityX = -speed;
            animation = 'macaco_left';
        } else if (this.cursors.right.isDown || this.keys.D.isDown) {
            velocityX = speed;
            animation = 'macaco_right';
        }

        if (this.cursors.up.isDown || this.keys.W.isDown) {
            velocityY = -speed;
            animation = 'macaco_up';
        } else if (this.cursors.down.isDown || this.keys.S.isDown) {
            velocityY = speed;
            animation = 'macaco_down';
        }

        this.player.setVelocity(velocityX, velocityY);

        if (velocityX !== 0 && velocityY !== 0) {
            this.player.body.velocity.normalize().scale(speed);
        }

        if (animation) {
            this.player.anims.play(animation, true);
        } else {
            this.player.anims.stop();
            this.player.setFrame(0);
        }
    }

    moveWolf() {
        if (this.wolf.x > 1960) {
            this.resetWolf();
        }
    }

    resetWolf() {
        this.wolf.setPosition(-90, Phaser.Math.Between(120, 620));
        this.wolf.setVelocityX(Phaser.Math.Between(135, 235));
    }

    collectBanana(player, banana) {
        banana.disableBody(true, true);
        this.score += 20;
        this.scoreText.setText(`Pontuacao: ${this.score}`);

        if (this.bananas.countActive(true) === 0) {
            this.time.delayedCall(500, () => {
                this.scene.start('MenuScene');
            });
        }
    }

    hitEnemy() {
        if (!this.canTakeDamage) {
            return;
        }

        this.canTakeDamage = false;
        this.lives -= 1;
        this.updateLives();

        this.player.setTint(0xff5555);
        this.player.setVelocity(0, 0);

        this.time.delayedCall(900, () => {
            this.player.clearTint();
            this.canTakeDamage = true;
        });

        if (this.lives <= 0) {
            this.time.delayedCall(500, () => {
                this.scene.restart();
            });
        }
    }

    updateLives() {
        this.lifeIcons.forEach((heart, index) => {
            heart.setVisible(index < this.lives);
        });
    }
}
