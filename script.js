const asciiArtProjects = `
 ____            _           _       
|  _ \\ _ __ ___ (_) ___  ___| |_ ___ 
| |_) | '__/ _ \\| |/ _ \\/ __| __/ __|
|  __/| | | (_) | |  __/ (__| |_\\__ \\
|_|   |_|  \\___// |\\___|\\___|\\__|___/
              |__/                   
`;

const asciiArtAbout = `
    _    _                 _   
   / \\  | |__   ___  _   _| |_ 
  / _ \\ | '_ \\ / _ \\| | | | __|
 / ___ \\| |_) | (_) | |_| | |_ 
/_/   \\_\\_.__/ \\___/ \\__,_|\\__|
`;

const asciiArtSkills = `
 ____  _    _ _ _     
/ ___|| | _(_) | |___ 
\\___ \\| |/ / | | / __|
 ___) |   <| | | \\__ \\
|____/|_|\\_\\_|_|_|___/
`;

const loremIpsum = `Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.`;
const skillsData = {
    labels: ['HTML', 'CSS', 'JavaScript', 'React', 'Node.js'], // Initial skill labels
    datasets: [{
        label: 'Skill Level',
        data: [90, 80, 85, 70, 75], // Initial skill levels
        backgroundColor: [
            'rgba(255, 99, 132, 0.2)',
            'rgba(54, 162, 235, 0.2)',
            'rgba(255, 206, 86, 0.2)',
            'rgba(75, 192, 192, 0.2)',
            'rgba(153, 102, 255, 0.2)'
        ],
        borderColor: [
            'rgba(255, 99, 132, 1)',
            'rgba(54, 162, 235, 1)',
            'rgba(255, 206, 86, 1)',
            'rgba(75, 192, 192, 1)',
            'rgba(153, 102, 255, 1)'
        ],
        borderWidth: 1
    }]
};

document.addEventListener('DOMContentLoaded', function () {
    const input = document.getElementById('command-line-input');
    const output = document.getElementById('command-line-output');
    const title = document.getElementById('title');
    const footer = document.getElementById('footer');
    const backButton = document.querySelector('.btCls');
    let easterEggs = [];

    //heart icon logic
    const heartIcon = document.querySelector('.heart-icon');
    const likeCounter = document.getElementById('likeCounter');

    let likeCount = localStorage.getItem('likeCount') ? parseInt(localStorage.getItem('likeCount')) : 0;
    let isLiked = localStorage.getItem('isLiked') === 'true';

    likeCounter.textContent = likeCount;

    if (isLiked) {
        heartIcon.classList.add('liked');
    }

    heartIcon.addEventListener('click', function () {
        if (!isLiked) {
            likeCount++;
            heartIcon.classList.add('liked');
            isLiked = true;
        } else {
            likeCount--;
            heartIcon.classList.remove('liked');
            isLiked = false;
        }

        likeCounter.textContent = likeCount;
        localStorage.setItem('likeCount', likeCount);
        localStorage.setItem('isLiked', isLiked);
    });
    // Fetch Easter Eggs from JSON
    fetch('easter_eggs.json')
        .then(response => response.json())
        .then(data => easterEggs = data)
        .catch(error => console.error('Error loading easter eggs:', error));

    input.addEventListener('keydown', function (e) {
        if (e.key === 'Enter') {
            const command = input.value.trim();
            input.value = '';
            showLoading();
            setTimeout(() => {
                output.innerHTML = '';
                processCommand(command);
                // Show the CMD_dir button only when a command is processed
                backButton.style.display = 'block';
            }, 500);
        }
    });

    function showLoading() {
        output.innerHTML = '<p>Loading...</p>';
    }

    function processCommand(command) {
        const easterEgg = easterEggs.find(egg => egg.command === command);
        if (easterEgg) {
            output.innerHTML = easterEgg.content;
            return;
        }

        switch (command.toLowerCase()) {
            case 'show_resume':
                output.innerHTML = `
                    <div class="about">
                        <h2>Resume</h2>
                        <p>Name: Aryan Shandilya</p>
                        <p>Experience: Web Developer</p>
                        <p>Skills: HTML, CSS, JavaScript</p>
                    </div>
                `;
                break;
            case 'show_projects':
                loadProjects();
                break;
            case 'show_skills':
                output.innerHTML = `
                    <div class="ascii-container"><pre>${asciiArtSkills}</pre></div>
                    <div class="skills">
                        <canvas id="skillsChart"></canvas>
                    </div>
                `;
                renderSkillsChart();
                break;
            case 'show_contact':
                output.innerHTML = `
                    <div class="contact-details">
                        <h2>Contact Me</h2>
                        <p>Name: Aryan Shandilya</p>
                        <p>Phone: 9155636600</p>
                        <p>Email: aryanspl2004@gmail.com</p>
                    </div>
                `;
                break;
            case 'show_about':
                output.innerHTML = `
                    <div class="ascii-container"><pre>${asciiArtAbout}</pre></div>
                    <div class="about">
                        <h2>Hello There !</h2>
                        <img src="images/3.jpg" alt="About Image">
                        <p>Hello! I am Aryan Shandilya, a passionate web developer with a knack for creating elegant and efficient web applications.</p>
                    </div>
                `;
                break;
            case 'hint':
                showHint();
                // Hide the CMD_dir button when showing the hint section
                backButton.style.display = 'none';
                break;
            default:
                output.innerHTML = `<p>Unknown command: ${command}. Type 'hint' for a list of commands.</p>`;
                break;
        }
    }

    function renderSkillsChart() {
        const ctx = document.getElementById('skillsChart').getContext('2d');
        new Chart(ctx, {
            type: 'bar',
            data: skillsData,
            options: {
                responsive: true,
                scales: {
                    y: {
                        beginAtZero: true
                    }
                }
            }
        });
    }

    // Function to dynamically add skills
    function addSkill(label, level) {
        skillsData.labels.push(label);
        skillsData.datasets[0].data.push(level);
    }

    // Function to dynamically remove skills
    function removeSkill(label) {
        const index = skillsData.labels.indexOf(label);
        if (index > -1) {
            skillsData.labels.splice(index, 1);
            skillsData.datasets[0].data.splice(index, 1);
        }
    }

    // Example usage:
    addSkill('Python', 60);
    addSkill('Arduino', 20);
    addSkill('Raspberry Pi', 30);
    addSkill('C++', 50);
    addSkill('Json', 10);
    // removeSkill('Node.js');

    function loadProjects() {
        fetch('projects.json')
            .then(response => response.json())
            .then(projects => {
                output.innerHTML = `
                    <div class="ascii-container"><pre>${asciiArtProjects}</pre></div>
                `;
                projects.forEach(project => {
                    output.innerHTML += `
                        <div class="project">
                            <h2>${project.title}</h2>
                            <img src="${project.image}" alt="Project Image">
                            <p>${project.description}</p>
                            <div class="project-buttons">
                                <a href="${project.demoLink}" target="_blank">Demo</a>
                                <a href="${project.githubLink}" target="_blank">GitHub</a>
                            </div>
                        </div>
                    `;
                });
            })
            .catch(error => {
                output.innerHTML = '<p>Error loading projects.</p>';
                console.error('Error:', error);
            });
    }

    function showHint() {
        output.innerHTML = `
            <p id="titleCmd">Available commands:</p>
            ${createHintLink('show_resume')}
            ${createHintLink('show_projects')}
            ${createHintLink('show_skills')}
            ${createHintLink('show_contact')}
            ${createHintLink('show_about')}
        `;
    }

    function createHintLink(command) {
        return `<p><a href="#" id="links" class="hint-link" data-command="${command}">${command}</a></p>`;
    }

    output.addEventListener('click', function (e) {
        if (e.target.classList.contains('hint-link')) {
            e.preventDefault();
            const command = e.target.getAttribute('data-command');
            processCommand(command);
        }
    });

    document.querySelector('.back-button').addEventListener('click', showHint);

    if (
        localStorage.isDark === "true" ||
        (localStorage.isDark === undefined &&
            window.matchMedia("(prefers-color-scheme: dark)").matches)
    ) {
        document.documentElement.classList.add("dark");
        localStorage.isDark = true;
    }

    document.getElementById('darkmode').addEventListener('click', function () {
        document.body.classList.toggle('dark');
        localStorage.isDark = document.body.classList.contains('dark');
    });

    function typeEffect(element, text, delay) {
        let i = 0;
        function typing() {
            if (i < text.length) {
                element.innerHTML += text.charAt(i);
                i++;
                setTimeout(typing, delay);
            }
        }
        typing();
    }

    function displayTitle() {
        const titleText = "Aryan Shandilya";
        const footerText = " | A.S.";
        const titleElement = document.getElementById('title');
        const footerElement = document.getElementById('footer');
        typeEffect(titleElement, titleText, 100);
        typeEffect(footerElement, footerText, 50);
    }

    function setFooterYear() {
        const footerElement = document.getElementById('footer');
        const currentYear = new Date().getFullYear();
        footerElement.innerHTML = `© ${currentYear}`;
    }
    
    displayTitle();
    setFooterYear();
});
