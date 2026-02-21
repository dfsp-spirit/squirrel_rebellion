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

    // Visual indicator for selected difficulty
    selectorBox: GameObjects.Rectangle;

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

        // Easy button
        this.easyButton = this.add.text(312, buttonY, 'Easy', {
            fontFamily: 'Arial Black', fontSize: 28, color: '#ffffff',
            stroke: '#000000', strokeThickness: 6,
            align: 'center',
            backgroundColor: '#333333',
            padding: { left: 20, right: 20, top: 10, bottom: 10 }
        })
        .setOrigin(0.5)
        .setInteractive({ useHandCursor: true })
        .on('pointerover', () => this.hoverDifficulty('easy'))
        .on('pointerout', () => this.resetDifficultyStyles())
        .on('pointerdown', () => this.setDifficulty('easy'));

        // Normal button
        this.normalButton = this.add.text(512, buttonY, 'Normal', {
            fontFamily: 'Arial Black', fontSize: 28, color: '#ffffff',
            stroke: '#000000', strokeThickness: 6,
            align: 'center',
            backgroundColor: '#333333',
            padding: { left: 20, right: 20, top: 10, bottom: 10 }
        })
        .setOrigin(0.5)
        .setInteractive({ useHandCursor: true })
        .on('pointerover', () => this.hoverDifficulty('normal'))
        .on('pointerout', () => this.resetDifficultyStyles())
        .on('pointerdown', () => this.setDifficulty('normal'));

        // Ultra Violence button
        this.ultraButton = this.add.text(712, buttonY, 'Ultra Violence', {
            fontFamily: 'Arial Black', fontSize: 28, color: '#ffffff',
            stroke: '#000000', strokeThickness: 6,
            align: 'center',
            backgroundColor: '#333333',
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
        .on('pointerover', () => this.backButton.setStyle({ color: '#666666' }))
        .on('pointerout', () => this.backButton.setStyle({ color: '#ffffff' }))
        .on('pointerdown', () => this.scene.start('MainMenu'));
    }

    hoverDifficulty(difficulty: 'easy' | 'normal' | 'ultra-violence') {
        this.resetDifficultyStyles();

        // Highlight the hovered button without changing selection
        if (difficulty === 'easy') {
            this.easyButton.setStyle({ backgroundColor: '#555555' });
        } else if (difficulty === 'normal') {
            this.normalButton.setStyle({ backgroundColor: '#555555' });
        } else {
            this.ultraButton.setStyle({ backgroundColor: '#555555' });
        }
    }

    resetDifficultyStyles() {
        // Reset all buttons to default style
        this.easyButton.setStyle({ backgroundColor: '#333333' });
        this.normalButton.setStyle({ backgroundColor: '#333333' });
        this.ultraButton.setStyle({ backgroundColor: '#333333' });

        // Re-apply selected style
        this.updateDifficultyDisplay();
    }

    setDifficulty(difficulty: 'easy' | 'normal' | 'ultra-violence') {
        GameState.difficulty = difficulty;
        this.updateDifficultyDisplay();
    }

    updateDifficultyDisplay() {
        // Reset all buttons
        this.easyButton.setStyle({ backgroundColor: '#333333' });
        this.normalButton.setStyle({ backgroundColor: '#333333' });
        this.ultraButton.setStyle({ backgroundColor: '#333333' });

        // Highlight selected button
        if (GameState.difficulty === 'easy') {
            this.easyButton.setStyle({ backgroundColor: '#4CAF50' }); // Green
        } else if (GameState.difficulty === 'normal') {
            this.normalButton.setStyle({ backgroundColor: '#FFC107' }); // Yellow
        } else {
            this.ultraButton.setStyle({ backgroundColor: '#F44336' }); // Red
        }

        // Update description
        let description = '';
        switch(GameState.difficulty) {
            case 'easy':
                description = '☺ Relaxed gameplay, more health, forgiving enemies';
                break;
            case 'normal':
                description = '★ Balanced challenge, as intended';
                break;
            case 'ultra-violence':
                description = '☠ Hardcore mode, tough enemies, limited resources';
                break;
        }

        if (this.difficultyDescription) {
            this.difficultyDescription.setText(description);
        }
    }
}