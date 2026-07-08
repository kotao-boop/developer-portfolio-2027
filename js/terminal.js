const terminalBody = document.getElementById('terminal-body');

const commands = [
    { text: "> init nexdev_agent.sh", delay: 1000 },
    { text: "Loading core modules... [OK]", delay: 500 },
    { text: "Connecting to neural interface... [OK]", delay: 500 },
    { text: "> whoami", delay: 1000 },
    { text: "I am NexDev. A creative developer operating at the intersection of logical engineering and digital art.", delay: 800 },
    { text: "My mission is to build highly interactive, performant, and emotionally resonant web experiences.", delay: 800 },
    { text: "> fetch skills --core", delay: 1000 },
    { text: "[System]: WebGL, React ecosystem, AI Agent Integration, Rust, GLSL", delay: 500 },
    { text: "> status", delay: 1000 },
    { text: "Ready for new challenges. Awaiting input...", delay: 500 }
];

let commandIndex = 0;

function typeLine(text, callback) {
    const p = document.createElement('p');
    terminalBody.appendChild(p);
    
    let charIndex = 0;
    const interval = setInterval(() => {
        if (charIndex < text.length) {
            p.textContent += text.charAt(charIndex);
            charIndex++;
            // Keep scrolled to bottom
            terminalBody.scrollTop = terminalBody.scrollHeight;
        } else {
            clearInterval(interval);
            setTimeout(callback, 300);
        }
    }, 30); // typing speed
}

function displayLine(text, delay, callback) {
    setTimeout(() => {
        if (text.startsWith(">")) {
            typeLine(text, callback);
        } else {
            const p = document.createElement('p');
            p.style.color = "#94a3b8"; // response color
            p.textContent = text;
            terminalBody.appendChild(p);
            terminalBody.scrollTop = terminalBody.scrollHeight;
            setTimeout(callback, delay);
        }
    }, delay);
}

function runTerminal() {
    if (commandIndex < commands.length) {
        const cmd = commands[commandIndex];
        displayLine(cmd.text, cmd.delay, () => {
            commandIndex++;
            runTerminal();
        });
    } else {
        // Add blinking cursor at the end
        const cursor = document.createElement('span');
        cursor.className = 'terminal-cursor';
        terminalBody.appendChild(cursor);
    }
}

// Start sequence when section is scrolled into view
const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if(entry.isIntersecting) {
            if(commandIndex === 0) {
                runTerminal();
            }
        }
    });
}, { threshold: 0.5 });

observer.observe(document.querySelector('.terminal-section'));
