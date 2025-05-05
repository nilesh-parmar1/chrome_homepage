
// Initialize particles.js
particlesJS("particles-js", {
    "particles": {
        "number": {
            "value": 80,
            "density": {
                "enable": true,
                "value_area": 800
            }
        },
        "color": {
            "value": "#ffffff"
        },
        "shape": {
            "type": "circle",
            "stroke": {
                "width": 0,
                "color": "#000000"
            },
            "polygon": {
                "nb_sides": 5
            }
        },
        "opacity": {
            "value": 0.5,
            "random": false,
            "anim": {
                "enable": false,
                "speed": 1,
                "opacity_min": 0.1,
                "sync": false
            }
        },
        "size": {
            "value": 3,
            "random": true,
            "anim": {
                "enable": false,
                "speed": 40,
                "size_min": 0.1,
                "sync": false
            }
        },
        "line_linked": {
            "enable": true,
            "distance": 150,
            "color": "#ffffff",
            "opacity": 0.4,
            "width": 1
        },
        "move": {
            "enable": true,
            "speed": 6,
            "direction": "none",
            "random": false,
            "straight": false,
            "out_mode": "out",
            "bounce": false,
            "attract": {
                "enable": false,
                "rotateX": 600,
                "rotateY": 1200
            }
        }
    },
    "interactivity": {
        "detect_on": "canvas",
        "events": {
            "onhover": {
                "enable": true,
                "mode": "grab"
            },
            "onclick": {
                "enable": true,
                "mode": "push"
            },
            "resize": true
        },
        "modes": {
            "grab": {
                "distance": 140,
                "line_linked": {
                    "opacity": 1
                }
            },
            "bubble": {
                "distance": 400,
                "size": 40,
                "duration": 2,
                "opacity": 8,
                "speed": 3
            },
            "repulse": {
                "distance": 200,
                "duration": 0.4
            },
            "push": {
                "particles_nb": 4
            },
            "remove": {
                "particles_nb": 2
            }
        }
    },
    "retina_detect": true
});

// Name reveal animation
function animateName() {
    const nameElement = document.getElementById('user-name');
    const name = nameElement.textContent;
    nameElement.innerHTML = '';
    nameElement.classList.add('reveal-name');
    
    for (let i = 0; i < name.length; i++) {
        const span = document.createElement('span');
        span.textContent = name[i];
        span.style.animationDelay = `${i * 0.1}s`;
        nameElement.appendChild(span);
    }
}

// Initialize the name animation after a short delay
setTimeout(animateName, 500);

// Time-based greeting
function updateGreeting() {
    const hour = new Date().getHours();
    let greeting = "Hello,";
    
    if (hour >= 5 && hour < 12) {
        greeting = "Good Morning,";
    } else if (hour >= 12 && hour < 17) {
        greeting = "Good Afternoon,";
    } else if (hour >= 17 && hour < 22) {
        greeting = "Good Evening,";
    } else {
        greeting = "Good Night,";
    }
    
    document.getElementById('greeting').textContent = greeting;
}

updateGreeting();

// Search functionality with Google-like suggestions
const searchInput = document.getElementById('search-input');
const suggestionsContainer = document.getElementById('search-suggestions');
let typingTimer;

// Popular search suggestions 
const popularSearches = [
    "JavaScript tutorials",
    "React JS documentation",
    "CSS grid layout examples",
    "Python programming tips",
    "WebGL animation examples",
    "TypeScript vs JavaScript",
    "Node.js best practices",
    "Frontend development tools",
    "Backend development roadmap",
    "VS Code shortcuts",
    "HTML5 canvas tutorials",
    "CSS animation examples",
    "JavaScript frameworks comparison",
    "React Native vs Flutter",
    "How to learn web development",
    "Git workflow best practices",
    "Docker for beginners",
    "Kubernetes tutorial"
];

// Show suggestions based on input with debounce
searchInput.addEventListener('input', function() {
    clearTimeout(typingTimer);
    
    typingTimer = setTimeout(function() {
        const query = searchInput.value.trim().toLowerCase();
        suggestionsContainer.innerHTML = '';
        
        if (query.length > 0) {
            // Filter suggestions that include the query
            const filteredSuggestions = popularSearches.filter(item => 
                item.toLowerCase().includes(query)
            );
            
            // Add exact query as first suggestion if not empty
            if (query.length > 0) {
                addSuggestion(query);
            }
            
            // Add filtered suggestions
            if (filteredSuggestions.length > 0) {
                filteredSuggestions.forEach(suggestion => {
                    addSuggestion(suggestion);
                });
                
                suggestionsContainer.classList.add('active');
            } else if (query.length > 0) {
                // Just show the typed query
                suggestionsContainer.classList.add('active');
            } else {
                suggestionsContainer.classList.remove('active');
            }
        } else {
            suggestionsContainer.classList.remove('active');
        }
    }, 200); // 200ms debounce delay
});

function addSuggestion(text) {
    const query = searchInput.value.trim().toLowerCase();
    const suggestionElement = document.createElement('div');
    suggestionElement.className = 'suggestion-item';
    
    // Highlight matching part of suggestion
    if (text.toLowerCase() !== query.toLowerCase()) {
        const regex = new RegExp('(' + query + ')', 'gi');
        suggestionElement.innerHTML = text.replace(regex, '<span class="highlight">$1</span>');
    } else {
        suggestionElement.textContent = text;
    }
    
    suggestionElement.addEventListener('click', function() {
        searchInput.value = text;
        suggestionsContainer.classList.remove('active');
        performSearch();
    });
    
    suggestionsContainer.appendChild(suggestionElement);
}

// Show suggestions when input is focused
searchInput.addEventListener('focus', function() {
    if (this.value.trim().length > 0) {
        suggestionsContainer.classList.add('active');
    }
});

// Hide suggestions when clicking outside
document.addEventListener('click', function(event) {
    if (!event.target.closest('.search-container')) {
        suggestionsContainer.classList.remove('active');
    }
});

function performSearch() {
    const query = document.getElementById('search-input').value.trim();
    if (query) {
        window.location.href = `https://www.google.com/search?q=${encodeURIComponent(query)}`;
    }
}

// Listen for Enter key
searchInput.addEventListener('keypress', function(event) {
    if (event.key === 'Enter') {
        performSearch();
    }
});

// Update date and time
function updateDateTime() {
    const now = new Date();
    const options = { 
        weekday: 'long', 
        year: 'numeric', 
        month: 'long', 
        day: 'numeric',
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit'
    };
    document.getElementById('date-time').textContent = now.toLocaleDateString('en-US', options);
}

// Update the date and time every second
setInterval(updateDateTime, 1000);
updateDateTime();

// Matrix-like code rain
function createCodeRain() {
    const container = document.getElementById('code-rain-container');
    const width = window.innerWidth;
    const height = window.innerHeight;
    
    // Create 20 code columns
    for (let i = 0; i < 20; i++) {
        const codeElement = document.createElement('div');
        codeElement.className = 'code-rain';
        codeElement.style.left = `${Math.random() * width}px`;
        codeElement.style.top = `${Math.random() * height}px`;
        
        // Generate random code-like characters
        let codeText = '';
        for (let j = 0; j < 15; j++) {
            const charCode = Math.floor(Math.random() * 26) + 97; // a-z
            codeText += String.fromCharCode(charCode);
            if (Math.random() > 0.7) codeText += Math.floor(Math.random() * 10); // Add random number
            if (Math.random() > 0.9) codeText += ['(', ')', '{', '}', '[', ']', '<', '>', '=', '+', '-', '*', '/', '%'][Math.floor(Math.random() * 14)]; // Add random symbol
            codeText += '<br>';
        }
        
        codeElement.innerHTML = codeText;
        container.appendChild(codeElement);
        
        // Animate the code rain
        animateCodeRain(codeElement, height);
    }
}

function animateCodeRain(element, height) {
    let pos = parseInt(element.style.top);
    const speed = 1 + Math.random() * 3;
    
    function frame() {
        pos += speed;
        if (pos > height) {
            pos = -300; // Reset to top
            element.style.left = `${Math.random() * window.innerWidth}px`;
        }
        element.style.top = pos + 'px';
        requestAnimationFrame(frame);
    }
    
    requestAnimationFrame(frame);
}

// Initialize code rain
createCodeRain();

// Handle window resize
window.addEventListener('resize', function() {
    // Clear and recreate code rain on resize
    document.getElementById('code-rain-container').innerHTML = '';
    createCodeRain();
});

  // To-Do List functionality
document.addEventListener('DOMContentLoaded', function() {
const todoInput = document.getElementById('todo-input');
const addTodoBtn = document.getElementById('add-todo');
const todoList = document.getElementById('todo-list');
const clearCompletedBtn = document.getElementById('clear-completed');
const clearAllBtn = document.getElementById('clear-all');

// Load todos from localStorage
let todos = JSON.parse(localStorage.getItem('todos')) || [];

// Function to save todos to localStorage
function saveTodos() {
    localStorage.setItem('todos', JSON.stringify(todos));
}

// Function to render todos
function renderTodos() {
    todoList.innerHTML = '';
    
    todos.forEach((todo, index) => {
        const todoItem = document.createElement('li');
        todoItem.classList.add('todo-item');
        if (todo.completed) {
            todoItem.classList.add('completed');
        }
        
        // Create the checkbox
        const checkbox = document.createElement('div');
        checkbox.classList.add('todo-checkbox');
        if (todo.completed) {
            checkbox.classList.add('checked');
        }
        checkbox.addEventListener('click', () => toggleTodo(index));
        
        // Create the todo text
        const todoText = document.createElement('span');
        todoText.classList.add('todo-text');
        todoText.textContent = todo.text;
        
        // Create the delete button
        const deleteBtn = document.createElement('button');
        deleteBtn.classList.add('delete-todo');
        deleteBtn.innerHTML = '×';
        deleteBtn.addEventListener('click', () => deleteTodo(index));
        
        // Append everything to the todo item
        todoItem.appendChild(checkbox);
        todoItem.appendChild(todoText);
        todoItem.appendChild(deleteBtn);
        
        // Add hover animation for the sparkle effect
        todoItem.addEventListener('mouseenter', () => {
            todoItem.style.boxShadow = '0 0 10px rgba(77, 219, 255, 0.5)';
        });
        
        todoItem.addEventListener('mouseleave', () => {
            todoItem.style.boxShadow = 'none';
        });
        
        // Append the todo item to the list
        todoList.appendChild(todoItem);
    });
}

// Function to add a new todo
function addTodo() {
    const todoText = todoInput.value.trim();
    if (todoText) {
        const newTodo = {
            text: todoText,
            completed: false,
            timestamp: Date.now()
        };
        
        todos.push(newTodo);
        saveTodos();
        renderTodos();
        todoInput.value = '';
        
        // Add a nice little animation
        const lastTodo = todoList.lastChild;
        lastTodo.style.transform = 'translateX(20px)';
        lastTodo.style.opacity = '0';
        
        setTimeout(() => {
            lastTodo.style.transform = 'translateX(0)';
            lastTodo.style.opacity = '1';
        }, 10);
    }
}

// Function to toggle a todo's completed state
function toggleTodo(index) {
    todos[index].completed = !todos[index].completed;
    saveTodos();
    renderTodos();
}

// Function to delete a todo
function deleteTodo(index) {
    const todoItem = todoList.children[index];
    todoItem.style.transform = 'translateX(20px)';
    todoItem.style.opacity = '0';
    
    setTimeout(() => {
        todos.splice(index, 1);
        saveTodos();
        renderTodos();
    }, 300);
}

// Function to clear completed todos
function clearCompleted() {
    todos = todos.filter(todo => !todo.completed);
    saveTodos();
    renderTodos();
}

// Function to clear all todos
function clearAll() {
    todos = [];
    saveTodos();
    renderTodos();
}

// Event listeners
addTodoBtn.addEventListener('click', addTodo);

todoInput.addEventListener('keypress', function(e) {
    if (e.key === 'Enter') {
        addTodo();
    }
});

clearCompletedBtn.addEventListener('click', clearCompleted);
clearAllBtn.addEventListener('click', clearAll);

// Initialize
renderTodos();
});


function redirectToChatGPT() {
    const prompt = document.getElementById('promptInput').value.trim();
    if (prompt) {
        // Use the ChatGPT URL pattern that includes the prompt
        // Note: ChatGPT doesn't have an official way to directly pre-fill prompts via URL
        // but we can open it with the prompt as a URL parameter that may work in some scenarios
        const chatGptUrl = `https://chat.openai.com/?q=${encodeURIComponent(prompt)}`;
        
        // Also copy to clipboard as a backup
        navigator.clipboard.writeText(prompt).then(() => {
            // Open ChatGPT in a new tab
            window.open(chatGptUrl, "_blank");
            
        }).catch(err => {
            // If clipboard access fails, just open ChatGPT
            window.open(chatGptUrl, "_blank");
            alert("Opening ChatGPT! You may need to paste your prompt manually.");
        });
    }
}

// Add Enter key functionality
document.getElementById('promptInput').addEventListener('keypress', function(event) {
    if (event.key === 'Enter') {
        event.preventDefault();
        redirectToChatGPT();
    }
});

