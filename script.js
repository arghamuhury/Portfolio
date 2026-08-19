document.addEventListener('DOMContentLoaded', () => {
    const currentPage = window.location.pathname.split('/').pop() || 'index.html';

    document.querySelectorAll('.nav-link').forEach(link => {
        const href = link.getAttribute('href');
        if (href === currentPage) {
            link.classList.add('active');
        }
    });

    initTerminal();

    if (document.getElementById('project-list')) {
        populateProjects();
    }
});

function initTerminal() {
    const terminalInput = document.querySelector('.terminal-input');
    const terminalOutput = document.getElementById('terminal-output');

    if (!terminalInput || !terminalOutput) return;

    // Handle input
    terminalInput.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') {
            e.preventDefault();
            const command = terminalInput.value.trim();

            if (command) {
                // Add command to output
                addToOutput(`> ${command}`, 'command');

                // Process command
                processCommand(command);

                // Clear input
                terminalInput.value = '';
            }
        }
    });

    // Add initial welcome message if on home page
    if (terminalOutput.children.length === 0) {
        addToOutput('welcome', 'command');
        addToOutput("Welcome to Argha Muhury's Cybersecurity/Dev Portfolio", 'response');
        addToOutput("Type 'help' to see available commands", 'response');
    }
}

function addToOutput(text, type) {
    const terminalOutput = document.getElementById('terminal-output');
    if (!terminalOutput) return;

    const line = document.createElement('div');
    line.className = `terminal-output-line ${type}`;
    line.textContent = text;
    terminalOutput.appendChild(line);
    terminalOutput.scrollTop = terminalOutput.scrollHeight;
}

function processCommand(command) {
    const cmd = command.toLowerCase().trim();

    switch (cmd) {
        case 'help':
            showHelp();
            break;
        case 'welcome':
            addToOutput("Welcome to Argha Muhury's Cybersecurity/Dev Portfolio", 'response');
            addToOutput("Type 'help' to see available commands", 'response');
            break;
        case 'get-projects':
        case 'projects':
            addToOutput('Fetching project portfolio...', 'response');
            // Simulate delay
            setTimeout(() => {
                addToOutput('Available projects:', 'response');
                addToOutput('- PROBE: Cybersecurity utility web app with glassmorphism OLED dark theme', 'response');
                addToOutput('- Alpha Music: Android music streaming app with OLED-optimized monochrome interface', 'response');
                addToOutput('- Smart Attendance: QR code-based attendance management web app', 'response');
                addToOutput("Visit 'projects.html' for full details", 'response');
            }, 500);
            break;
        case 'show-experience':
        case 'experience':
            addToOutput('Displaying professional experience...', 'response');
            setTimeout(() => {
                addToOutput('- Network Security Intern at Fortinet (Summer 2023)', 'response');
                addToOutput('- B.Sc. in Information Technology, Techno India University (2020-2024)', 'response');
                addToOutput("Visit 'experience.html' for full details", 'response');
            }, 500);
            break;
        case 'show-certifications':
        case 'certifications':
            addToOutput('Displaying certifications...', 'response');
            setTimeout(() => {
                addToOutput('- Fortinet Network Security Associate (FNSA-2024-0875)', 'response');
                addToOutput('- Google Cybersecurity Certificate (GCC-2023-1142)', 'response');
                addToOutput('- AWS Certified Solutions Architect – Associate (AWSA-CSAA-2022-0991)', 'response');
                addToOutput("Visit 'certifications.html' for full details", 'response');
            }, 500);
            break;
        case 'clear':
            const terminalOutput = document.getElementById('terminal-output');
            if (terminalOutput) {
                terminalOutput.innerHTML = '';
                addToOutput('Terminal cleared', 'response');
            }
            break;
        default:
            if (cmd === '') {
                // Empty command, do nothing
                return;
            }
            addToOutput(`Command not found: '${command}'. Type 'help' for available commands.`, 'response');
            break;
    }
}

function showHelp() {
    addToOutput('Available commands:', 'response');
    addToOutput('  help - Show this help message', 'response');
    addToOutput('  welcome - Show welcome message', 'response');
    addToOutput('  projects / get-projects - Show project portfolio', 'response');
    addToOutput('  experience / show-experience - Show professional experience', 'response');
    addToOutput('  certifications / show-certifications - Show certifications', 'response');
    addToOutput('  clear - Clear terminal output', 'response');
}

function populateProjects() {
    const projects = [
        { title: 'PROBE', tech: 'Flask, Python', link: 'https://github.com/arghamuhury/Probe', desc: 'Cybersecurity utility web app with a polished security dashboard and modern user experience.' },
        { title: 'Alpha Music', tech: 'Kotlin, Jetpack Compose', link: 'https://github.com/arghamuhury/AlphaMusic', desc: 'Android music app focused on simplicity, elegant mobile UX, and immersive listening flows.' },
        { title: 'Smart Attendance', tech: 'Flask, Python', link: 'https://github.com/arghamuhury/SmartAttendance', desc: 'QR-based attendance system built for clean workflow automation and role-based access.' }
    ];

    const projectList = document.getElementById('project-list');

    projects.forEach(project => {
        const projectItem = document.createElement('article');
        projectItem.classList.add('project-card', 'panel');
        projectItem.innerHTML = `
            <span class="project-tag">${project.title === 'PROBE' ? 'Cybersecurity' : project.title === 'Alpha Music' ? 'Mobile' : 'Web App'}</span>
            <h3>${project.title}</h3>
            <p>${project.desc}</p>
            <ul>
                ${project.tech.split(',').map(item => `<li>${item.trim()}</li>`).join('')}
            </ul>
            <a href="${project.link}" target="_blank" rel="noreferrer">View project →</a>
        `;
        projectList.appendChild(projectItem);
    });
}