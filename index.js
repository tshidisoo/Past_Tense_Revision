// Quiz data
const quizData = [
    // Multiple Choice Questions (1-10)
    {
        type: 'multiple',
        verb: 'run',
        icon: '🏃‍♂️',
        question: 'What did he do?',
        options: ['He ran.', 'He runs.', 'He running.', 'He will run.'],
        correct: 0
    },
    {
        type: 'multiple',
        verb: 'jump',
        icon: '🦘',
        question: 'What did she do?',
        options: ['She jumps.', 'She jumped.', 'She jumping.', 'She will jump.'],
        correct: 1
    },
    {
        type: 'multiple',
        verb: 'dance',
        icon: '💃',
        question: 'What did she do?',
        options: ['She dances.', 'She dancing.', 'She danced.', 'She will dance.'],
        correct: 2
    },
    {
        type: 'multiple',
        verb: 'clap',
        icon: '👏',
        question: 'What did he do?',
        options: ['He clapped.', 'He claps.', 'He clapping.', 'He will clap.'],
        correct: 0
    },
    {
        type: 'multiple',
        verb: 'wave',
        icon: '👋',
        question: 'What did she do?',
        options: ['She waves.', 'She waving.', 'She will wave.', 'She waved.'],
        correct: 3
    },
    {
        type: 'multiple',
        verb: 'shout',
        icon: '📢',
        question: 'What did he do?',
        options: ['He shouting.', 'He shouted.', 'He shouts.', 'He will shout.'],
        correct: 1
    },
    {
        type: 'multiple',
        verb: 'laugh',
        icon: '😂',
        question: 'What did she do?',
        options: ['She laughs.', 'She laughing.', 'She laughed.', 'She will laugh.'],
        correct: 2
    },
    {
        type: 'multiple',
        verb: 'walk',
        icon: '🚶‍♂️',
        question: 'What did he do?',
        options: ['He walked.', 'He walks.', 'He walking.', 'He will walk.'],
        correct: 0
    },
    {
        type: 'multiple',
        verb: 'stamp',
        icon: '🦶',
        question: 'What did she do?',
        options: ['She stamps.', 'She stamping.', 'She will stamp.', 'She stamped.'],
        correct: 3
    },
    {
        type: 'multiple',
        verb: 'catch',
        icon: '🤾‍♀️',
        question: 'What did he do?',
        options: ['He catches.', 'He caught.', 'He catching.', 'He will catch.'],
        correct: 1
    },
    
    // Fill-in Questions (11-20)
    {
        type: 'fill',
        verb: 'hop',
        icon: '🐰',
        question: 'She _______ on one foot.',
        answer: 'hopped'
    },
    {
        type: 'fill',
        verb: 'skip',
        icon: '⛹️‍♀️',
        question: 'He _______ down the street.',
        answer: 'skipped'
    },
    {
        type: 'fill',
        verb: 'turn around',
        icon: '🔄',
        question: 'She _______ _______ to see who was calling.',
        answer: 'turned around'
    },
    {
        type: 'fill',
        verb: 'pull',
        icon: '🪢',
        question: 'He _______ the rope very hard.',
        answer: 'pulled'
    },
    {
        type: 'fill',
        verb: 'scream',
        icon: '😱',
        question: 'She _______ when she saw the spider.',
        answer: 'screamed'
    },
    {
        type: 'fill',
        verb: 'whisper',
        icon: '🤫',
        question: 'He _______ the secret to his friend.',
        answer: 'whispered'
    },
    {
        type: 'fill',
        verb: 'run',
        icon: '🏃‍♀️',
        question: 'They _______ to catch the bus.',
        answer: 'ran'
    },
    {
        type: 'fill',
        verb: 'jump',
        icon: '🤸‍♂️',
        question: 'The cat _______ over the fence.',
        answer: 'jumped'
    },
    {
        type: 'fill',
        verb: 'walk',
        icon: '🚶‍♀️',
        question: 'We _______ to school yesterday.',
        answer: 'walked'
    },
    {
        type: 'fill',
        verb: 'dance',
        icon: '🕺',
        question: 'Everyone _______ at the party.',
        answer: 'danced'
    }
];

// Quiz state
let currentQuestion = 0;
let score = 0;
let mcScore = 0;
let fillScore = 0;
let selectedAnswer = null;

// DOM elements
const questionCard = document.getElementById('question-card');
const resultsDiv = document.getElementById('results');
const progressBar = document.getElementById('progress');
const currentQuestionSpan = document.getElementById('current-question');
const totalQuestionsSpan = document.getElementById('total-questions');
const questionImage = document.getElementById('question-image');
const questionText = document.getElementById('question-text');
const optionsDiv = document.getElementById('options');
const nextBtn = document.getElementById('next-btn');

// Initialize quiz
function initQuiz() {
    currentQuestion = 0;
    score = 0;
    mcScore = 0;
    fillScore = 0;
    selectedAnswer = null;
    
    totalQuestionsSpan.textContent = quizData.length;
    questionCard.style.display = 'block';
    resultsDiv.style.display = 'none';
    
    displayQuestion();
}

// Display current question
function displayQuestion() {
    const question = quizData[currentQuestion];
    
    // Update progress
    const progressPercent = (currentQuestion / quizData.length) * 100;
    progressBar.style.width = progressPercent + '%';
    currentQuestionSpan.textContent = currentQuestion + 1;
    
    // Display question image
    questionImage.innerHTML = `<div class="action-icon">${question.icon}</div>`;
    
    // Display question text
    questionText.textContent = question.question;
    
    // Clear options
    optionsDiv.innerHTML = '';
    
    if (question.type === 'multiple') {
        displayMultipleChoice(question);
    } else {
        displayFillInBlank(question);
    }
    
    // Reset button
    nextBtn.textContent = 'Next Question';
    nextBtn.disabled = true;
    selectedAnswer = null;
}

// Display multiple choice options
function displayMultipleChoice(question) {
    question.options.forEach((option, index) => {
        const button = document.createElement('button');
        button.className = 'option';
        button.textContent = option;
        button.onclick = () => selectOption(index, button);
        optionsDiv.appendChild(button);
    });
}

// Display fill-in-the-blank input
function displayFillInBlank(question) {
    const input = document.createElement('input');
    input.type = 'text';
    input.className = 'fill-input';
    input.placeholder = 'Type your answer here...';
    input.oninput = () => {
        selectedAnswer = input.value.trim();
        nextBtn.disabled = selectedAnswer === '';
    };
    input.onkeypress = (e) => {
        if (e.key === 'Enter' && !nextBtn.disabled) {
            nextQuestion();
        }
    };
    optionsDiv.appendChild(input);
    input.focus();
}

// Select multiple choice option
function selectOption(index, button) {
    // Remove previous selections
    document.querySelectorAll('.option').forEach(opt => {
        opt.classList.remove('selected');
    });
    
    // Mark selected option
    button.classList.add('selected');
    selectedAnswer = index;
    nextBtn.disabled = false;
}

// Move to next question
function nextQuestion() {
    const question = quizData[currentQuestion];
    let isCorrect = false;
    
    if (question.type === 'multiple') {
        isCorrect = selectedAnswer === question.correct;
        showMultipleChoiceResult(question, isCorrect);
    } else {
        const userAnswer = selectedAnswer.toLowerCase();
        const correctAnswer = question.answer.toLowerCase();
        isCorrect = userAnswer === correctAnswer;
        showFillInResult(question, isCorrect);
    }
    
    // Update scores
    if (isCorrect) {
        score++;
        if (question.type === 'multiple') {
            mcScore++;
        } else {
            fillScore++;
        }
    }
    
    // Change button to continue
    nextBtn.textContent = currentQuestion === quizData.length - 1 ? 'Show Results' : 'Continue';
    nextBtn.onclick = continueQuiz;
}

// Show multiple choice result
function showMultipleChoiceResult(question, isCorrect) {
    const options = document.querySelectorAll('.option');
    options.forEach((option, index) => {
        if (index === question.correct) {
            option.classList.add('correct');
        } else if (index === selectedAnswer && !isCorrect) {
            option.classList.add('incorrect');
        }
        option.onclick = null; // Disable clicking
    });
    
    showFeedback(isCorrect, question.options[question.correct]);
}

// Show fill-in result
function showFillInResult(question, isCorrect) {
    const input = document.querySelector('.fill-input');
    input.classList.add(isCorrect ? 'correct' : 'incorrect');
    input.disabled = true;
    
    showFeedback(isCorrect, question.answer);
}

// Show feedback
function showFeedback(isCorrect, correctAnswer) {
    const feedback = document.createElement('div');
    feedback.className = `feedback ${isCorrect ? 'correct' : 'incorrect'}`;
    feedback.textContent = isCorrect ? 'Correct! ✓' : `Incorrect. The correct answer is: ${correctAnswer}`;
    optionsDiv.appendChild(feedback);
}

// Continue to next question or show results
function continueQuiz() {
    currentQuestion++;
    
    if (currentQuestion < quizData.length) {
        displayQuestion();
        nextBtn.onclick = nextQuestion;
    } else {
        showResults();
    }
}

// Show final results
function showResults() {
    questionCard.style.display = 'none';
    resultsDiv.style.display = 'block';
    
    document.getElementById('final-score').textContent = score;
    document.getElementById('mc-score').textContent = mcScore;
    document.getElementById('fill-score').textContent = fillScore;
    
    // Update progress bar to 100%
    progressBar.style.width = '100%';
}

// Restart quiz
function restartQuiz() {
    initQuiz();
}

// Initialize quiz when page loads
window.onload = initQuiz;