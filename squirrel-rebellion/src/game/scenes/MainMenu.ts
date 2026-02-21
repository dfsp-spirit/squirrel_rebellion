import { Scene, GameObjects } from 'phaser';

export class MainMenu extends Scene
{
    background: GameObjects.Image;
    logo: GameObjects.Image;
    title: GameObjects.Text;
    startButton: GameObjects.Text;
    creditsButton: GameObjects.Text;

    constructor ()
    {
        super('MainMenu');
    }

    create ()
    {
        this.background = this.add.image(512, 384, 'background');

        this.logo = this.add.image(512, 250, 'logo');

        this.title = this.add.text(512, 380, 'Main Menu', {
            fontFamily: 'Arial Black', fontSize: 38, color: '#ffffff',
            stroke: '#000000', strokeThickness: 8,
            align: 'center'
        }).setOrigin(0.5);

        // Start Game button
        this.startButton = this.add.text(512, 460, 'Start Game', {
            fontFamily: 'Arial Black', fontSize: 32, color: '#ffffff',
            stroke: '#000000', strokeThickness: 6,
            align: 'center'
        })
        .setOrigin(0.5)
        .setInteractive({ useHandCursor: true })
        .on('pointerover', () => this.startButton.setStyle({ color: '#ff0' }))
        .on('pointerout', () => this.startButton.setStyle({ color: '#ffffff' }))
        .on('pointerdown', () => this.scene.start('Game'));

        // Credits button
        this.creditsButton = this.add.text(512, 520, 'Credits', {
            fontFamily: 'Arial Black', fontSize: 32, color: '#ffffff',
            stroke: '#000000', strokeThickness: 6,
            align: 'center'
        })
        .setOrigin(0.5)
        .setInteractive({ useHandCursor: true })
        .on('pointerover', () => this.creditsButton.setStyle({ color: '#ff0' }))
        .on('pointerout', () => this.creditsButton.setStyle({ color: '#ffffff' }))
        .on('pointerdown', () => this.scene.start('Credits'));
    }
}