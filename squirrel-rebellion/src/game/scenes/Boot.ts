import { Scene } from 'phaser';

export class Boot extends Scene
{
    constructor ()
    {
        super('Boot');
    }

    preload ()
    {
        //  The Boot Scene is typically used to load in any assets you require for your Preloader, such as a game logo or background.
        //  The smaller the file size of the assets, the better, as the Boot Scene itself has no preloader.

        this.load.image('background', 'assets/menu/bg.png');
        this.load.image('logo', 'assets/menu/logo.png');
        this.load.image('level_forest_background', 'assets/level_forest/background.png');
        this.load.image('background_gameover', 'assets/level_forest/background_gameover.png');
    }

    create ()
    {
        this.scene.start('Preloader');
    }
}
