import { Scene, GameObjects } from 'phaser';

export class Credits extends Scene
{
    background: GameObjects.Image;
    logo: GameObjects.Image;
    backButton: GameObjects.Text;

    constructor ()
    {
        super('Credits');
    }

    create ()
    {
        this.cameras.main.setBackgroundColor(0x111111); // around the image
        this.background = this.add.image(512, 384, 'background');
        this.logo = this.add.image(512, 200, 'logo').setDisplaySize(400, 200);

        // Credits title
        this.add.text(512, 400, 'Credits', {
            fontFamily: 'Arial Black', fontSize: 48, color: '#ffffff',
            stroke: '#000000', strokeThickness: 8,
            align: 'center'
        }).setOrigin(0.5);

        const creditLinesStartY = 460;
        const creditLinesSpacing = 40;

        // Credit entries
        this.add.text(512, creditLinesStartY, 'Game Design: Anonymous Squirrel #1', {
            fontFamily: 'Arial', fontSize: 24, color: '#ffffff',
            stroke: '#000000', strokeThickness: 4,
            align: 'center'
        }).setOrigin(0.5);

        this.add.text(512, creditLinesStartY + 1 * creditLinesSpacing, 'Programming: Anonymous Squirrel #2', {
            fontFamily: 'Arial', fontSize: 24, color: '#ffffff',
            stroke: '#000000', strokeThickness: 4,
            align: 'center'
        }).setOrigin(0.5);

        this.add.text(512, creditLinesStartY + 2 * creditLinesSpacing, 'Art: Anonymous Squirrel #3', {
            fontFamily: 'Arial', fontSize: 24, color: '#ffffff',
            stroke: '#000000', strokeThickness: 4,
            align: 'center'
        }).setOrigin(0.5);

        this.add.text(512, creditLinesStartY + 3 * creditLinesSpacing, 'Music: Anonymous Squirrel #4', {
            fontFamily: 'Arial', fontSize: 24, color: '#ffffff',
            stroke: '#000000', strokeThickness: 4,
            align: 'center'
        }).setOrigin(0.5);

        // Back button
        this.backButton = this.add.text(512, creditLinesStartY + 5 * creditLinesSpacing, 'Back', {
            fontFamily: 'Arial Black', fontSize: 28, color: '#ffffff',
            stroke: '#000000', strokeThickness: 6,
            align: 'center'
        })
        .setOrigin(0.5)
        .setInteractive({ useHandCursor: true })
        .on('pointerover', () => this.backButton.setStyle({ color: '#666666' }))
        .on('pointerout', () => this.backButton.setStyle({ color: '#ffffff' }))
        .on('pointerdown', () => this.scene.start('MainMenu'));
    }
}