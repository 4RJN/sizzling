// Symbole und deren Werte
const SYMBOLS = ["🍒", "🍋", "🍊", "🍇", "🍉", "⭐", "7"];
const PAYOUTS = {
    "7": 100,
    "⭐": 50,
    "🍉": 40,
    "🍇": 30,
    "🍊": 20,
    "🍋": 10,
    "🍒": 5
};

// Spielstatus
let balance = 1000;

const reels = [
    document.getElementById("reel1"),
    document.getElementById("reel2"),
    document.getElementById("reel3"),
    document.getElementById("reel4"),
    document.getElementById("reel5")
];

const spinButton = document.getElementById("spin-button");
const balanceDisplay = document.getElementById("balance");
const messageDisplay = document.getElementById("message");

// Spin-Funktion
function spinReels() {
    if (balance < 10) {
        messageDisplay.textContent = "Nicht genug Guthaben!";
        return;
    }

    balance -= 10; // Einsatz
    balanceDisplay.textContent = `Guthaben: ${balance}`;
    messageDisplay.textContent = "Drehen...";

    const results = [];
    reels.forEach((reel, index) => {
        const randomSymbol = SYMBOLS[Math.floor(Math.random() * SYMBOLS.length)];
        reel.textContent = randomSymbol;
        results.push(randomSymbol);
    });

    calculateWin(results);
}

// Gewinnberechnung
function calculateWin(results) {
    const counts = {};
    results.forEach(symbol => {
        counts[symbol] = (counts[symbol] || 0) + 1;
    });

    let win = 0;
    let message = "";

    // Prüfen auf Gewinne
    for (const symbol in counts) {
        if (symbol === "7" && counts[symbol] === 5) {
            win += 1000; // Jackpot
            message = "Jackpot! 🎉";
        } else if (counts[symbol] >= 3) {
            win += PAYOUTS[symbol] * counts[symbol];
            message = `Gewinn: ${PAYOUTS[symbol] * counts[symbol]} Punkte!`;
        }
    }

    balance += win;
    balanceDisplay.textContent = `Guthaben: ${balance}`;

    if (win === 0) {
        messageDisplay.textContent = "Keine Gewinne, versuch's nochmal!";
    } else {
        messageDisplay.textContent = message;
    }
}

// Event Listener für den Spin-Button
spinButton.addEventListener("click", spinReels);
