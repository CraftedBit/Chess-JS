export class UIManager {
    constructor(fenManager) {
        this.fenManager = fenManager;
        this.fenDisplay = document.getElementById('fen')
        this.shareButton = document.getElementById('shareButton')
        
        this.init();
    }

    init() {
        if (this.shareButton) {
            this.shareButton.addEventListener("click", () => this.copyFen()); // Add event listener to the button
        } 

        this.updateFenDisplay();
    }

    updateFenDisplay() {
        if (this.fenDisplay) {
            this.fenDisplay.textContent = this.fenManager.generateFen();
        }    
    }

    async copyFen() {
        try {
            const fen = this.fenManager.generateFen();
            await navigator.clipboard.writeText(fen);
            this.showNotifcation("FEN copied to clipboard: " + fen);
        } catch (error) {
            console.error("Error copying FEN to clipboard:", error);
            showNotification('Failed to copy FEN to clipboard');
        }
    }

    showNotifcation(message, duration = 3000) {
        const notification = document.createElement('div');
        notification.className = 'notification';
        notification.textContent = message;

        document.body.appendChild(notification);

        // Fade in
        setTimeout(() => notification.classList.add('visible'), 10);
        
        // Remove after duration
        setTimeout(() => {
        notification.classList.remove('visible');
        setTimeout(() => notification.remove(), 300);
        }, duration);
    }
}
