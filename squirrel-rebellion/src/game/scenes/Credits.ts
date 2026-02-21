import { Scene, GameObjects } from 'phaser';

export class Credits extends Scene
{
    background: GameObjects.Image;
    backButton: GameObjects.Text;

    constructor ()
    {
        super('Credits');
    }

    create ()
    {
        this.background = this.add.image(512, 384, 'background');

        // Credits title
        this.add.text(512, 200, 'Credits', {
            fontFamily: 'Arial Black', fontSize: 48, color: '#ffffff',
            stroke: '#000000', strokeThickness: 8,
            align: 'center'
        }).setOrigin(0.5);

        // Credit entries
        this.add.text(512, 300, 'Game Design: Anonymous Squirrel #1', {
            fontFamily: 'Arial', fontSize: 24, color: '#ffffff',
            stroke: '#000000', strokeThickness: 4,
            align: 'center'
        }).setOrigin(0.5);

        this.add.text(512, 340, 'Programming: Anonymous Squirrel #2', {
            fontFamily: 'Arial', fontSize: 24, color: '#ffffff',
            stroke: '#000000', strokeThickness: 4,
            align: 'center'
        }).setOrigin(0.5);

        this.add.text(512, 380, 'Art: Anonymous Squirrel #3', {
            fontFamily: 'Arial', fontSize: 24, color: '#ffffff',
            stroke: '#000000', strokeThickness: 4,
            align: 'center'
        }).setOrigin(0.5);

        this.add.text(512, 420, 'Music: Anonymous Squirrel #4', {
            fontFamily: 'Arial', fontSize: 24, color: '#ffffff',
            stroke: '#000000', strokeThickness: 4,
            align: 'center'
        }).setOrigin(0.5);

        // Back button
        this.backButton = this.add.text(512, 520, 'Back to Menu', {
            fontFamily: 'Arial Black', fontSize: 28, color: '#ffffff',
            stroke: '#000000', strokeThickness: 6,
            align: 'center'
        })
        .setOrigin(0.5)
        .setInteractive({ useHandCursor: true })
        .on('pointerover', () => this.backButton.setStyle({ color: '#ff0' }))
        .on('pointerout', () => this.backButton.setStyle({ color: '#ffffff' }))
        .on('pointerdown', () => this.scene.start('MainMenu'));
    }
}