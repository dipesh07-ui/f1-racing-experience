// ========================================
// NAVBAR FUNCTIONALITY
// ========================================
const hamburger = document.getElementById('hamburger');
const navMenu = document.getElementById('navMenu');

hamburger.addEventListener('click', () => {
    hamburger.classList.toggle('active');
    navMenu.classList.toggle('active');
});

// Close menu when clicking on navigation links
navMenu.addEventListener('click', (e) => {
    if (e.target.tagName === 'A') {
        hamburger.classList.remove('active');
        navMenu.classList.remove('active');
    }
});

// ========================================
// SMOOTH SCROLLING FOR NAVIGATION
// ========================================
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// ========================================
// INTERACTIVE HOVER EFFECTS
// ========================================
document.querySelectorAll('.champion-item').forEach(item => {
    item.addEventListener('mouseenter', () => {
        item.style.transform = 'scale(1.05)';
        item.style.transition = 'transform 0.3s ease';
    });
    
    item.addEventListener('mouseleave', () => {
        item.style.transform = 'scale(1)';
    });
});

// ========================================
// FLOATING ELEMENTS FOR ABOUT SECTION
// ========================================
function createFloatingElement() {
    const element = document.createElement('div');
    element.classList.add('float-item');
    
    // Random positioning and timing
    element.style.left = Math.random() * 100 + '%';
    element.style.animationDelay = Math.random() * 5 + 's';
    element.style.animationDuration = (10 + Math.random() * 10) + 's';
    
    // Random colors for F1 theme
    const colors = [
        'rgba(225, 6, 0, 0.8)',    // F1 Red
        'rgba(255, 255, 255, 0.8)', // White
        'rgba(0, 212, 255, 0.8)',   // Cyan
        'rgba(255, 165, 0, 0.8)'    // Orange
    ];
    element.style.background = colors[Math.floor(Math.random() * colors.length)];
    
    document.getElementById('floatingElements').appendChild(element);
    
    // Remove element after animation
    setTimeout(() => {
        if (element.parentNode) {
            element.remove();
        }
    }, 20000);
}

// Create floating elements periodically
setInterval(createFloatingElement, 1500);

// ========================================
// QUIZ FUNCTIONALITY
// ========================================
class F1Quiz {
    constructor() {
        this.currentQuestion = 0;
        this.score = 0;
        this.questions = [
            {
                question: "Which driver has won the most Formula 1 World Championships?",
                options: ["Lewis Hamilton", "Michael Schumacher", "Max Verstappen", "Ayrton Senna"],
                correct: 1
            },
            {
                question: "Which team has won the most Constructors' Championships?",
                options: ["Ferrari", "McLaren", "Mercedes", "Red Bull Racing"],
                correct: 0
            },
            {
                question: "What is the fastest F1 circuit on the current calendar?",
                options: ["Monza", "Spa-Francorchamps", "Silverstone", "Baku"],
                correct: 0
            },
            {
                question: "Which driver holds the record for most Grand Prix wins?",
                options: ["Michael Schumacher", "Lewis Hamilton", "Max Verstappen", "Sebastian Vettel"],
                correct: 1
            },
            {
                question: "In which year was the first Formula 1 World Championship held?",
                options: ["1948", "1950", "1952", "1955"],
                correct: 1
            },
            {
                question: "Which driver is known as 'The Flying Finn'?",
                options: ["Kimi Räikkönen", "Mika Häkkinen", "Valtteri Bottas", "Heikki Kovalainen"],
                correct: 0
            },
            {
                question: "What is the nickname of the Monaco Grand Prix?",
                options: ["The Jewel in the Crown", "The Crown Jewel", "The Prince's Race", "The Million Dollar Race"],
                correct: 0
            },
            {
                question: "Which team has the most consecutive Constructors' Championships?",
                options: ["Ferrari", "McLaren", "Mercedes", "Red Bull Racing"],
                correct: 2
            },
            {
                question: "What is the maximum number of points a driver can score in a single race?",
                options: ["25", "26", "27", "28"],
                correct: 1
            },
            {
                question: "Which circuit is known as 'The Cathedral of Speed'?",
                options: ["Monza", "Spa-Francorchamps", "Silverstone", "Nürburgring"],
                correct: 0
            }
        ];
        
        this.init();
    }
    
    init() {
        this.setupQuiz();
        this.loadQuestion();
    }
    
    setupQuiz() {
        const options = document.querySelectorAll('.quiz-option');
        const nextButton = document.getElementById('nextQuestion');
        const restartButton = document.getElementById('restartQuiz');
        
        options.forEach(option => {
            option.addEventListener('click', () => {
                // Remove previous selections
                options.forEach(opt => {
                    opt.classList.remove('selected', 'correct', 'incorrect');
                });
                
                // Add selection to clicked option
                option.classList.add('selected');
                
                // Check answer and provide visual feedback
                const isCorrect = parseInt(option.dataset.answer) === 1;
                if (isCorrect) {
                    this.score++;
                    this.updateScore();
                    option.classList.add('correct');
                } else {
                    option.classList.add('incorrect');
                    // Highlight correct answer
                    options.forEach(opt => {
                        if (parseInt(opt.dataset.answer) === 1) {
                            opt.classList.add('correct');
                        }
                    });
                }
                
                // Disable all options after selection
                options.forEach(opt => opt.style.pointerEvents = 'none');
                
                // Show next button
                nextButton.style.display = 'inline-block';
            });
        });
        
        nextButton.addEventListener('click', () => {
            this.nextQuestion();
        });
        
        restartButton.addEventListener('click', () => {
            this.restartQuiz();
        });
    }
    
    loadQuestion() {
        const question = this.questions[this.currentQuestion];
        const questionElement = document.getElementById('quizQuestion');
        const optionsContainer = document.getElementById('quizOptions');
        const nextButton = document.getElementById('nextQuestion');
        
        questionElement.textContent = `Question ${this.currentQuestion + 1} of ${this.questions.length}: ${question.question}`;
        
        const options = optionsContainer.querySelectorAll('.quiz-option');
        options.forEach((option, index) => {
            option.textContent = question.options[index];
            option.dataset.answer = index === question.correct ? '1' : '0';
            option.classList.remove('selected', 'correct', 'incorrect');
            option.style.pointerEvents = 'auto';
        });
        
        nextButton.style.display = 'none';
    }
    
    nextQuestion() {
        this.currentQuestion++;
        
        if (this.currentQuestion >= this.questions.length) {
            this.endQuiz();
            return;
        }
        
        this.loadQuestion();
    }
    
    updateScore() {
        document.getElementById('quizScore').textContent = this.score;
    }
    
    endQuiz() {
        const questionElement = document.getElementById('quizQuestion');
        const optionsContainer = document.getElementById('quizOptions');
        const nextButton = document.getElementById('nextQuestion');
        const restartButton = document.getElementById('restartQuiz');
        
        const percentage = Math.round((this.score / this.questions.length) * 100);
        let message = `Quiz Complete! Your final score: ${this.score}/${this.questions.length} (${percentage}%)`;
        
        if (percentage >= 90) {
            message += " - Excellent! You're an F1 expert! 🏆";
        } else if (percentage >= 70) {
            message += " - Great job! You know your F1! 🏁";
        } else if (percentage >= 50) {
            message += " - Good effort! Keep learning! 📚";
        } else {
            message += " - Keep studying F1 history! 📖";
        }
        
        questionElement.textContent = message;
        optionsContainer.style.display = 'none';
        nextButton.style.display = 'none';
        restartButton.style.display = 'inline-block';
    }
    
    restartQuiz() {
        this.currentQuestion = 0;
        this.score = 0;
        this.updateScore();
        
        const optionsContainer = document.getElementById('quizOptions');
        const restartButton = document.getElementById('restartQuiz');
        
        optionsContainer.style.display = 'grid';
        restartButton.style.display = 'none';
        
        this.loadQuestion();
    }
}

// ========================================
// DRIVER COMPARISON FUNCTIONALITY
// ========================================
class DriverComparison {
    constructor() {
        this.driverData = {
            verstappen: {
                name: "Max Verstappen",
                avatar: "MV",
                points: 575,
                wins: 15,
                podiums: 18,
                position: 1
            },
            hamilton: {
                name: "Lewis Hamilton",
                avatar: "LH",
                points: 234,
                wins: 2,
                podiums: 8,
                position: 4
            },
            leclerc: {
                name: "Charles Leclerc",
                avatar: "CL",
                points: 356,
                wins: 3,
                podiums: 12,
                position: 2
            },
            russell: {
                name: "George Russell",
                avatar: "GR",
                points: 287,
                wins: 1,
                podiums: 6,
                position: 3
            },
            norris: {
                name: "Lando Norris",
                avatar: "LN",
                points: 205,
                wins: 0,
                podiums: 5,
                position: 5
            },
            piastri: {
                name: "Oscar Piastri",
                avatar: "OP",
                points: 164,
                wins: 0,
                podiums: 3,
                position: 6
            }
        };
        
        this.init();
    }
    
    init() {
        const driver1Select = document.getElementById('driver1Select');
        const driver2Select = document.getElementById('driver2Select');
        
        if (!driver1Select || !driver2Select) {
            console.error('Driver select elements not found');
            return;
        }
        
        driver1Select.addEventListener('change', () => {
            this.updateDriverCard(0, driver1Select.value);
        });
        
        driver2Select.addEventListener('change', () => {
            this.updateDriverCard(1, driver2Select.value);
        });
    }
    
    updateDriverCard(cardIndex, driverId) {
        const cards = document.querySelectorAll('.driver-card');
        const card = cards[cardIndex];
        
        if (!driverId || !this.driverData[driverId]) {
            // Reset card to default state
            card.querySelector('.driver-avatar').textContent = '?';
            card.querySelector('.driver-name').textContent = 'Select a driver';
            const stats = card.querySelectorAll('.driver-stat-value');
            stats.forEach(stat => stat.textContent = '-');
            return;
        }
        
        const driver = this.driverData[driverId];
        card.querySelector('.driver-avatar').textContent = driver.avatar;
        card.querySelector('.driver-name').textContent = driver.name;
        
        const stats = card.querySelectorAll('.driver-stat-value');
        stats[0].textContent = driver.points;
        stats[1].textContent = driver.wins;
        stats[2].textContent = driver.podiums;
        stats[3].textContent = '#' + driver.position;
        
        // Add visual feedback
        card.style.transform = 'scale(1.02)';
        setTimeout(() => {
            card.style.transform = 'scale(1)';
        }, 200);
    }
}

// ========================================
// INITIALIZE ON PAGE LOAD
// ========================================
document.addEventListener('DOMContentLoaded', () => {
    // Initialize quiz and driver comparison
    new F1Quiz();
    new DriverComparison();
    
    // Create initial floating elements
    for (let i = 0; i < 5; i++) {
        setTimeout(createFloatingElement, i * 1000);
    }
});

window.addEventListener('load', function() {
    const loader = document.getElementById('f1-loader');
    if (loader) loader.classList.add('hide');
}); 