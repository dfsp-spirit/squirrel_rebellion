import { Scene, GameObjects } from 'phaser';

// Global game state - can be imported anywhere in your game
export const GameState = {
    difficulty: 'normal' as 'easy' | 'normal' | 'ultra-violence' // default difficulty
};

export class Settings extends Scene
{
    background: GameObjects.Image;
    logo: GameObjects.Image;
    backButton: GameObjects.Text;

    // Difficulty buttons
    easyButton: GameObjects.Text;
    normalButton: GameObjects.Text;
    ultraButton: GameObjects.Text;
    difficultyDescription: GameObjects.Text;

    // Store original colors for each button
    private easyColor: number = 0xffffff;
    private normalColor: number = 0xffffff;
    private ultraColor: number = 0xffffff;

    constructor ()
    {
        super('Settings');
    }

    create ()
    {
        this.cameras.main.setBackgroundColor(0x111111); // around the image
        this.background = this.add.image(512, 384, 'background');
        this.logo = this.add.image(512, 200, 'logo').setDisplaySize(400, 200);

        this.add.text(512, 400, 'Settings', {
            fontFamily: 'Arial Black', fontSize: 48, color: '#ffffff',
            stroke: '#000000', strokeThickness: 8,
            align: 'center'
        }).setOrigin(0.5);

        const settingsLinesStartY = 460;
        const settingsLinesSpacing = 40;

        // Settings entries
        this.add.text(512, settingsLinesStartY, 'Difficulty:', {
            fontFamily: 'Arial', fontSize: 24, color: '#ffffff',
            stroke: '#000000', strokeThickness: 4,
            align: 'center'
        }).setOrigin(0.5);

        // Create difficulty selection buttons in a row
        const buttonY = settingsLinesStartY + settingsLinesSpacing;

        // Easy button - no background color
        this.easyButton = this.add.text(312, buttonY, 'Easy', {
            fontFamily: 'Arial Black', fontSize: 28, color: '#ffffff',
            stroke: '#000000', strokeThickness: 6,
            align: 'center',
            padding: { left: 20, right: 20, top: 10, bottom: 10 }
        })
        .setOrigin(0.5)
        .setInteractive({ useHandCursor: true })
        .on('pointerover', () => this.hoverDifficulty('easy'))
        .on('pointerout', () => this.resetDifficultyStyles())
        .on('pointerdown', () => this.setDifficulty('easy'));

        // Normal button - no background color
        this.normalButton = this.add.text(512, buttonY, 'Normal', {
            fontFamily: 'Arial Black', fontSize: 28, color: '#ffffff',
            stroke: '#000000', strokeThickness: 6,
            align: 'center',
            padding: { left: 20, right: 20, top: 10, bottom: 10 }
        })
        .setOrigin(0.5)
        .setInteractive({ useHandCursor: true })
        .on('pointerover', () => this.hoverDifficulty('normal'))
        .on('pointerout', () => this.resetDifficultyStyles())
        .on('pointerdown', () => this.setDifficulty('normal'));

        // Ultra Violence button - no background color
        this.ultraButton = this.add.text(712, buttonY, 'Ultra Violence', {
            fontFamily: 'Arial Black', fontSize: 28, color: '#ffffff',
            stroke: '#000000', strokeThickness: 6,
            align: 'center',
            padding: { left: 20, right: 20, top: 10, bottom: 10 }
        })
        .setOrigin(0.5)
        .setInteractive({ useHandCursor: true })
        .on('pointerover', () => this.hoverDifficulty('ultra-violence'))
        .on('pointerout', () => this.resetDifficultyStyles())
        .on('pointerdown', () => this.setDifficulty('ultra-violence'));

        // Add a small description that changes based on difficulty
        const descriptionY = buttonY + settingsLinesSpacing + 20;
        this.difficultyDescription = this.add.text(512, descriptionY, '', {
            fontFamily: 'Arial', fontSize: 18, color: '#aaaaaa',
            stroke: '#000000', strokeThickness: 3,
            align: 'center',
            fontStyle: 'italic'
        }).setOrigin(0.5);

        // Apply current difficulty styling
        this.updateDifficultyDisplay();

        // Back button
        this.backButton = this.add.text(512, settingsLinesStartY + 5 * settingsLinesSpacing, 'Back', {
            fontFamily: 'Arial Black', fontSize: 28, color: '#ffffff',
            stroke: '#000000', strokeThickness: 6,
            align: 'center'
        })
        .setOrigin(0.5)
        .setInteractive({ useHandCursor: true })
        .on('pointerover', () => this.backButton.setStyle({ color: '#ffaa00' }))
        .on('pointerout', () => this.backButton.setStyle({ color: '#ffffff' }))
        .on('pointerdown', () => this.scene.start('MainMenu'));
    }

    hoverDifficulty(difficulty: 'easy' | 'normal' | 'ultra-violence') {
        // Temporarily change color on hover (only if not already selected)
        if (difficulty === 'easy' && GameState.difficulty !== 'easy') {
            this.easyButton.setStyle({ color: '#88ff88' }); // Light green
        } else if (difficulty === 'normal' && GameState.difficulty !== 'normal') {
            this.normalButton.setStyle({ color: '#ffff88' }); // Light yellow
        } else if (difficulty === 'ultra-violence' && GameState.difficulty !== 'ultra-violence') {
            this.ultraButton.setStyle({ color: '#ff8888' }); // Light red
        }
    }

    resetDifficultyStyles() {
        // Reset to current selection styling
        this.updateDifficultyDisplay();
    }

    setDifficulty(difficulty: 'easy' | 'normal' | 'ultra-violence') {
        GameState.difficulty = difficulty;
        this.updateDifficultyDisplay();
    }

    updateDifficultyDisplay() {
        // Set colors based on selection
        // Easy button
        if (GameState.difficulty === 'easy') {
            this.easyButton.setStyle({ color: '#4CAF50' }); // Green
        } else {
            this.easyButton.setStyle({ color: '#ffffff' }); // White
        }

        // Normal button
        if (GameState.difficulty === 'normal') {
            this.normalButton.setStyle({ color: '#FFC107' }); // Yellow
        } else {
            this.normalButton.setStyle({ color: '#ffffff' }); // White
        }

        // Ultra Violence button
        if (GameState.difficulty === 'ultra-violence') {
            this.ultraButton.setStyle({ color: '#F44336' }); // Red
        } else {
            this.ultraButton.setStyle({ color: '#ffffff' }); // White
        }

        // Update description
        let description = '';
        let descriptionColor = '#aaaaaa';

        switch(GameState.difficulty) {
            case 'easy':
                description = 'Relaxed gameplay, more health, forgiving enemies';
                descriptionColor = '#4CAF50';
                break;
            case 'normal':
                description = 'Balanced challenge, as intended';
                descriptionColor = '#FFC107';
                break;
            case 'ultra-violence':
                description = 'Hardcore mode, tough enemies, limited resources';
                descriptionColor = '#F44336';
                break;
        }

        if (this.difficultyDescription) {
            this.difficultyDescription.setText(description);
            this.difficultyDescription.setStyle({ color: descriptionColor });
        }
    }
}