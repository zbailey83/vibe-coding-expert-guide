// Wait for DOM to be fully loaded
document.addEventListener('DOMContentLoaded', function() {
    
    // --- Splash Screen Logic ---
    const splashScreen = document.getElementById('splash-screen');
    if (splashScreen) {
        // Hide splash screen after a delay
        setTimeout(() => {
            splashScreen.classList.add('hidden');
            // Optional: remove splash screen from DOM after transition
            // setTimeout(() => splashScreen.remove(), 500); // 500ms matches CSS transition
        }, 2000); // 2 seconds delay
    }
    // --- End Splash Screen Logic ---
    
    // Get navigation elements and content section
    const navItems = document.querySelectorAll('.course-navigation li');
    const contentSection = document.querySelector('.content');
    
    // Content data for each section (Parsed from vibelayout-md.md)
    const sections = {
        "🔑 Golden Rules": `
            <h2>🔑 Golden Rules</h2>
            <p>These are the high-level principles that guide how to work with AI tools efficiently and effectively. We'll be implementing these through global rules and our prompting throughout the process.</p>
            
            <h3>Use markdown files to manage the project</h3>
            <p>Create and maintain README.md, PLANNING.md, and TASK.md to organize your project structure and workflow.</p>
            
            <h3>Keep files under 500 lines</h3>
            <p>Split into modules when needed to maintain code readability and maintainability.</p>
            
            <h3>Start fresh conversations often</h3>
            <p>Long threads degrade response quality. Reset context when starting new tasks.</p>
            
            <h3>Don't overload the model</h3>
            <p>One task per message is ideal. Focus yields better results than trying to accomplish multiple tasks at once.</p>
            
            <h3>Test early, test often</h3>
            <p>Every new function should have unit tests to ensure reliability and catch issues early.</p>
            
            <h3>Be specific in your requests</h3>
            <p>The more context, the better. Examples help a lot in guiding the AI to produce what you want.</p>
            
            <h3>Write docs and comments as you go</h3>
            <p>Don't delay documentation. Document your code as you write it to maintain clarity.</p>
            
            <h3>Implement environment variables yourself</h3>
            <p>Don't trust the LLM with API keys. Handle sensitive information yourself.</p>
            
            <div class="warning-box">
                <h3>❌ Common Pitfall</h3>
                <p>Don't try to solve everything at once or with a single prompt. Break down complex problems into manageable pieces.</p>
            </div>
        `,
        "🧠 Planning & Task Management": `
            <h2>🧠 Planning & Task Management</h2>
            <p>Before writing any code, it's important to have a conversation with the LLM to plan the initial scope and tasks for the project. Scope goes into PLANNING.md, and specific tasks go into TASK.md. These should be updated by the AI coding assistant as the project progresses.</p>
            
            <div class="info-box">
                <h3>PLANNING.md</h3>
                <ul>
                    <li><strong>Purpose:</strong> High-level vision, architecture, constraints, tech stack, tools, etc.</li>
                    <li><strong>Prompt to AI:</strong> "Use the structure and decisions outlined in PLANNING.md."</li>
                    <li>Have the LLM reference this file at the beginning of any new conversation.</li>
                </ul>
            </div>
            
            <div class="info-box">
                <h3>TASK.md</h3>
                <ul>
                    <li><strong>Purpose:</strong> Tracks current tasks, backlog, and sub-tasks.</li>
                    <li><strong>Includes:</strong> Bullet list of active work, milestones, and anything discovered mid-process.</li>
                    <li><strong>Prompt to AI:</strong> "Update TASK.md to mark XYZ as done and add ABC as a new task."</li>
                    <li>Can prompt the LLM to automatically update and create tasks as well (through global rules).</li>
                </ul>
            </div>
            
            <div class="tip-box">
                <h3>💡 Pro Tip</h3>
                <p>Create templates for your markdown files to ensure consistency across projects. You can have the AI generate these templates for you at the start of each new project.</p>
            </div>
            
            <div class="example-box">
                <h3>Example PLANNING.md Structure</h3>
                <pre><code># Project Planning: [Project Name]
## Project Overview
[Brief description of what the project aims to accomplish]
## Architecture
[High-level architecture diagram or description]
## Tech Stack
- Backend: [e.g., Python, FastAPI]
- Database: [e.g., Supabase, PostgreSQL]
- Infrastructure: [e.g., Docker, Kubernetes]
- Tools: [e.g., MCP, AI Assistants]
## Constraints
[List any technical, time, or resource constraints]
## Implementation Phases
1. [Phase 1 description]
2. [Phase 2 description]
3. [Phase 3 description]
## Style Guidelines
[Code style, naming conventions, etc.]</code></pre>
            </div>
            
            <div class="example-box">
                <h3>Example TASK.md Structure</h3>
                <pre><code># Project Tasks
## Active Tasks
- [ ] [Task description with date]
- [ ] [Task description with date]
## Completed Tasks
- [x] [Completed task with date]
- [x] [Completed task with date]
## Backlog
- [ ] [Future task]
- [ ] [Future task]
## Discovered During Work
- [ ] [Unexpected task found during development]</code></pre>
            </div>
        `,
        "⚙️ Global Rules": `
            <h2>⚙️ Global Rules (For AI IDEs)</h2>
            <p>Global (or project level) rules are the best way to enforce the use of the golden rules for your AI coding assistants. Global rules apply to all projects. Project rules apply to your current workspace. All AI IDEs support both.</p>
            <p>
                <strong>Cursor Rules:</strong> <a href="https://docs.cursor.com/context/rules-for-ai" target="_blank">https://docs.cursor.com/context/rules-for-ai</a><br>
                <strong>Windsurf Rules:</strong> <a href="https://docs.codeium.com/windsurf/memories#windsurfrules" target="_blank">https://docs.codeium.com/windsurf/memories#windsurfrules</a><br>
                <strong>Cline Rules:</strong> <a href="https://docs.cline.bot/improving-your-prompting-skills/prompting" target="_blank">https://docs.cline.bot/improving-your-prompting-skills/prompting</a><br>
                <strong>Roo Code Rules:</strong> Works the same way as Cline
            </p>
            <p>Use the below example (for our Supabase MCP server) as a starting point to add global rules to your AI IDE system prompt to enforce consistency:</p>
            
            <div class="rules-box">
                <h3>🔄 Project Awareness & Context</h3>
                <ul>
                    <li><strong>Always read <code>PLANNING.md</code></strong> at the start of a new conversation to understand the project's architecture, goals, style, and constraints.</li>
                    <li><strong>Check <code>TASK.md</code></strong> before starting a new task. If the task isn't listed, add it with a brief description and today's date.</li>
                    <li><strong>Use consistent naming conventions, file structure, and architecture patterns</strong> as described in <code>PLANNING.md</code>.</li>
                </ul>
            
                <h3>🧱 Code Structure & Modularity</h3>
                <ul>
                    <li><strong>Never create a file longer than 500 lines of code.</strong> If a file approaches this limit, refactor by splitting it into modules or helper files.</li>
                    <li><strong>Organize code into clearly separated modules</strong>, grouped by feature or responsibility.</li>
                    <li><strong>Use clear, consistent imports</strong> (prefer relative imports within packages).</li>
                </ul>

                <h3>🧪 Testing & Reliability</h3>
                 <ul>
                    <li><strong>Always create Pytest unit tests for new features</strong> (functions, classes, routes, etc).</li>
                    <li><strong>After updating any logic</strong>, check whether existing unit tests need to be updated. If so, do it.</li>
                    <li><strong>Tests should live in a <code>/tests</code> folder</strong> mirroring the main app structure.</li>
                    <li>Include at least:
                        <ul>
                            <li>1 test for expected use</li>
                            <li>1 edge case</li>
                            <li>1 failure case</li>
                        </ul>
                    </li>
                </ul>

                <h3>✅ Task Completion</h3>
                <ul>
                    <li><strong>Mark completed tasks in <code>TASK.md</code></strong> immediately after finishing them.</li>
                    <li>Add new sub-tasks or TODOs discovered during development to <code>TASK.md</code> under a "Discovered During Work" section.</li>
                </ul>

                <h3>📎 Style & Conventions</h3>
                <ul>
                    <li><strong>Use Python</strong> as the primary language.</li>
                    <li><strong>Follow PEP8</strong>, use type hints, and format with <code>black</code>.</li>
                    <li><strong>Use <code>pydantic</code> for data validation</strong>.</li>
                    <li>Use <code>FastAPI</code> for APIs and <code>SQLAlchemy</code> or <code>SQLModel</code> for ORM if applicable.</li>
                    <li>Write <strong>docstrings for every function</strong> using the Google style:</li>
                 </ul>
                 <pre><code>def example():
    """ Brief summary.
    Args:
        param1 (type): Description.
    Returns:
        type: Description.
    """</code></pre>

                <h3>📚 Documentation & Explainability</h3>
                <ul>
                    <li><strong>Update <code>README.md</code></strong> when new features are added, dependencies change, or setup steps are modified.</li>
                    <li><strong>Comment non-obvious code</strong> and ensure everything is understandable to a mid-level developer.</li>
                    <li>When writing complex logic, <strong>add an inline <code># Reason:</code> comment</strong> explaining the why, not just the what.</li>
                </ul>

                <h3>🧠 AI Behavior Rules</h3>
                <ul>
                    <li><strong>Never assume missing context. Ask questions if uncertain.</strong></li>
                    <li><strong>Never hallucinate libraries or functions</strong> – only use known, verified Python packages.</li>
                    <li><strong>Always confirm file paths and module names</strong> exist before referencing them in code or tests.</li>
                    <li><strong>Never delete or overwrite existing code</strong> unless explicitly instructed to or if part of a task from <code>TASK.md</code>.</li>
                </ul>
            </div>
            
            <div class="tip-box">
                <h3>💡 Pro Tip</h3>
                <p>Customize these global rules for your specific project needs. The more specific and clear your rules are, the better your AI assistant will perform.</p>
            </div>
        `,
        "🧰 Configuring MCP": `
            <h2>🧰 Configuring MCP</h2>
            <p>MCP (Model Context Protocol) enables your AI assistant to interact with services to perform various tasks such as file system operations, web searches, Git operations, and more.</p>

            <div class="capabilities-box">
                <h3>MCP Capabilities:</h3>
                <ul>
                    <li><strong>📁 File System Operations:</strong> Read/write files, refactor code, and perform multi-file edits</li>
                    <li><strong>🔍 Web Search:</strong> Search the web for documentation and other resources with Brave</li>
                    <li><strong>🔄 Git Operations:</strong> Branch, diff, commit, and other Git operations</li>
                    <li><strong>🧠 Memory & Tools:</strong> Access vector databases like Qdrant for enhanced memory capabilities</li>
                 </ul>
            </div>

            <div class="resources-box">
                <h3>MCP Configuration Resources:</h3>
                <ul>
                    <li><strong>Cursor MCP:</strong> <a href="https://docs.cursor.com/context/model-context-protocol" target="_blank">https://docs.cursor.com/context/model-context-protocol</a></li>
                    <li><strong>Windsurf MCP:</strong> <a href="https://docs.codeium.com/windsurf/mcp" target="_blank">https://docs.codeium.com/windsurf/mcp</a></li>
                    <li><strong>Cline MCP:</strong> <a href="https://docs.cline.bot/mcp-servers/mcp" target="_blank">https://docs.cline.bot/mcp-servers/mcp</a></li>
                    <li><strong>Roo Code MCP:</strong> <a href="https://docs.roocode.com/features/mcp/using-mcp-in-roo" target="_blank">https://docs.roocode.com/features/mcp/using-mcp-in-roo</a></li>
                 </ul>
            </div>

            <div class="example-box">
                <h3>Example MCP Prompt</h3>
                <pre><code>"Okay great, I like the current state of the application. Please make a git commit to save the current state."</code></pre>
            </div>

            <div class="tip-box">
                 <h3>💡 Pro Tip</h3>
                 <p>You can find a large list of MCP servers with installation instructions in the documentation of your AI IDE. These servers can significantly expand what your AI assistant can do.</p>
            </div>
        `,
        "💬 Initial Prompt": `
            <h2>💬 Initial Prompt to Start the Project</h2>
            <p>The first prompt to begin a project is the most important. Even with a comprehensive overview in PLANNING.md, clear tasks in TASK.md, and good global rules, it's still important to give detailed instructions to describe exactly what you want the LLM to create for you and documentation for it to reference.</p>
            
            <div class="methods-box">
                <h3>Ways to Provide Examples and Documentation:</h3>
                <ol>
                    <li><strong>Use Built-in Documentation Features</strong>
                        <p>Most AI IDEs have documentation access features. For example, if you type "@mcp" in Windsurf and hit tab, you've now told Windsurf to search the MCP documentation to aid in its coding.</p>
                    </li>
                    <li><strong>Web Search via MCP</strong>
                        <p>Have the LLM use an MCP server like Brave to find documentation on the internet. For example: "Search the web to find other Python MCP server implementations."</p>
                    </li>
                    <li><strong>Manual Examples</strong>
                        <p>Manually provide examples/documentation snippets in your prompt.</p>
                    </li>
                 </ol>
            </div>

            <div class="example-box">
                <h3>Example Initial Prompt:</h3>
                <pre><code>Use @docs:model-context-protocol-docs and @docs:supabase-docs to create an MCP server written in Python (using FastMCP) to interact with a Supabase database. The server should use the Stdio transport and have the following tools:
- Read rows in a table
- Create a record (or multiple) in a table
- Update a record (or multiple) in a table
- Delete a record (or multiple) in a table

Be sure to give comprehensive descriptions for each tool so the MCP server can effectively communicate to the LLM when and how to use each capability.

The environment variables for this MCP server need to be the Supabase project URL and service role key.

Read this GitHub README to understand best how to create MCP servers with Python:
https://github.com/modelcontextprotocol/python-sdk/tree/main

After creating the MCP server with FastMCP, update README.md and TASK.md since you now have the initial implementation for the server.</code></pre>
            </div>

            <div class="warning-box">
                <h3>⚠️ Remember</h3>
                <p>Restart conversations once they get long. You'll know when it's time when the LLM starts to frustrate you to no end.</p>
            </div>

            <div class="tip-box">
                 <h3>💡 Pro Tip</h3>
                 <p>The best prompts in apps like bolt.new, v0, Archon, etc. all give examples - you should too. Including similar examples of what you want to build dramatically improves results.</p>
            </div>
        `,
        "🧩 Modular Prompting": `
            <h2>🧩 Modular Prompting Process after Initial Prompt</h2>
            <p>For any follow-up fixes or changes to the project, you generally want to give just a single task at a time unless the tasks are very simple. It's tempting to throw a lot at the LLM at one time, but it always yields more consistent results the more focused its changes are.</p>
            
            <div class="example-box">
                <h3>Good Example:</h3>
                <pre><code>"Now update the list records function to add a parameter for filtering the records."</code></pre>
            </div>

            <div class="example-box">
                 <h3>Bad Example:</h3>
                 <pre><code>"Update list records to add filtering. Then I'm getting an error for the create row function that says API key not found. Plus I need to add better documentation to the main function and in README.md for how to use this server."</code></pre>
            </div>

            <div class="important-box">
                <h3>The Most Important Point:</h3>
                <p>For consistent output, have the LLM focus on updating a single file whenever possible.</p>
            </div>

            <div class="warning-box">
                <h3>⚠️ Remember</h3>
                <p>Always have the LLM update README.md, PLANNING.md, and TASK.md after making any changes!</p>
            </div>

            <div class="checklist-box">
                 <h3>Modular Prompting Checklist:</h3>
                 <ul>
                    <li>Focus on one task per message</li>
                    <li>Be specific about what file needs to be modified</li>
                    <li>Provide clear acceptance criteria for the task</li>
                    <li>After implementation, remind the LLM to update documentation</li>
                    <li>Start a new conversation if the context gets too complex</li>
                 </ul>
            </div>
        `,
        "✅ Testing": `
            <h2>✅ Test After Every Feature</h2>
            <p>Either tell the LLM through the global rules to write unit tests after each feature it implements, or do it yourself as a follow-up. Catching bugs early prevents compounding problems so this is VERY important!</p>
            <p>Unit tests can be annoying and LLMs aren't perfect writing them either, but try your best to have the AI coding assistant test everything it implements. You can always ask it to bypass writing the tests for a feature in the worst case scenario where it gets hung up on something in the tests and you just want to move on.</p>

            <div class="best-practices-box">
                <h3>Best Practices for Testing:</h3>
                <ul>
                    <li>Create the tests in a <code>tests/</code> directory</li>
                    <li>Always "mock" calls to services like the DB and LLM so you aren't interacting with anything "for real"</li>
                    <li>For each function, test at least:
                        <ul>
                            <li>One successful scenario</li>
                            <li>One intentional failure (to ensure proper error handling)</li>
                            <li>One edge case</li>
                        </ul>
                    </li>
                 </ul>
            </div>

            <div class="tip-box">
                <h3>💡 Pro Tip</h3>
                <p>Create test templates for common patterns in your project. This makes it easier for the LLM to generate consistent tests across your codebase.</p>
            </div>

            <div class="example-box">
                 <h3>Example Test Prompt:</h3>
                 <pre><code>Now let's write tests for the list_records function we just implemented. Make sure to:
1. Test the happy path with successful record retrieval
2. Test filtering functionality
3. Test error handling when the table doesn't exist
4. Mock all Supabase calls so we don't need actual credentials for testing</code></pre>
            </div>

            <div class="code-example-box">
                <h3>Example Test Structure:</h3>
                <pre><code># tests/test_supabase_tools.py
import pytest
from unittest.mock import patch, MagicMock
from src.supabase_tools import list_records

@pytest.fixture
def mock_supabase_client():
    """Create a mock Supabase client for testing."""
    mock_client = MagicMock()
    # Configure the mock to return test data
    mock_client.table().select().execute.return_value = {
        "data": [
            {"id": 1, "name": "Test Item 1"},
            {"id": 2, "name": "Test Item 2"}
        ]
    }
    return mock_client

def test_list_records_success(mock_supabase_client):
    """Test successful retrieval of records."""
    result = list_records(mock_supabase_client, "test_table")
    assert len(result) == 2
    assert result[0]["name"] == "Test Item 1"

def test_list_records_with_filter(mock_supabase_client):
    """Test filtering functionality."""
    # Configure the mock for this specific test
    filtered_response = { "data": [{"id": 1, "name": "Test Item 1"}] }
    mock_supabase_client.table().select().eq().execute.return_value = filtered_response
    result = list_records(mock_supabase_client, "test_table", filter_column="name", filter_value="Test Item 1")
    assert len(result) == 1
    assert result[0]["name"] == "Test Item 1"

def test_list_records_table_error(mock_supabase_client):
    """Test error handling when table operation fails."""
    # Make the mock raise an exception
    mock_supabase_client.table().select().execute.side_effect = Exception("Table not found")
    with pytest.raises(Exception) as exc_info:
        list_records(mock_supabase_client, "nonexistent_table")
    assert "Table not found" in str(exc_info.value)</code></pre>
            </div>
        `,
        "🐳 Docker Deployment": `
            <h2>🐳 Docker Deployment (Supabase MCP Example)</h2>
            <p>This step is more optional and is decently opinionated, but still valuable! When ready to deploy the project to host in the cloud and/or share with others, "containerizing" the project with Docker or a similar service like Podman is recommended.</p>
            <p>LLMs are VERY good at working with Docker, so it's the most consistent way to package up a project. Plus almost every cloud service for deploying apps (Render, Railway, Coolify, DigitalOcean, Cloudflare, Netlify, etc.) supports hosting Docker containers.</p>

            <div class="code-example-box">
                <h3>Dockerfile Example:</h3>
                <pre><code>FROM python:3.12-slim
WORKDIR /app
COPY requirements.txt .
RUN pip install --no-cache-dir -r requirements.txt
# Copy the MCP server files
COPY . .
CMD ["python", "server.py"]</code></pre>
            </div>

            <div class="code-example-box">
                 <h3>Build Command:</h3>
                 <pre><code>docker build -t mcp/supabase .</code></pre>
             </div>

            <div class="example-box">
                 <h3>Example Prompt to Get This from the LLM:</h3>
                 <pre><code>Write a Dockerfile for this MCP server using requirements.txt. Give me the commands to build the container after.</code></pre>
            </div>

            <div class="tip-box">
                 <h3>💡 Pro Tip</h3>
                 <p>Consider adding a <code>docker-compose.yml</code> file if your project requires multiple services (like a database) to run together.</p>
            </div>
            
            <div class="cloud-deployment-box">
                <h3>Cloud Deployment Options:</h3>
                <ul>
                    <li><strong>Render:</strong> Easy deployment with Git integration</li>
                    <li><strong>Railway:</strong> Developer platform to deploy apps</li>
                    <li><strong>Digital Ocean:</strong> App Platform or Droplets</li>
                    <li><strong>Cloudflare:</strong> Workers or Pages</li>
                    <li><strong>Netlify:</strong> With Docker support via custom builds</li>
                    <li><strong>Coolify:</strong> Self-hosted PaaS</li>
                </ul>
            </div>
        `
    };
    
    // Function to update content
    function showSection(sectionName) {
        // Clear active class from all navigation items
        navItems.forEach(function(item) {
            item.classList.remove('active');
        });
        
        // Find the clicked navigation item and make it active
        for (let i = 0; i < navItems.length; i++) {
            if (navItems[i].textContent.trim() === sectionName) {
                navItems[i].classList.add('active');
                break;
            }
        }
        
        // Update content
        if (sections[sectionName]) {
            // Add fade-out effect
            contentSection.classList.add('fade-out');

            // Update content after a short delay for the fade effect
            setTimeout(function() {
                contentSection.innerHTML = sections[sectionName];
                
                // Add fade-in effect
                contentSection.classList.remove('fade-out');
                contentSection.classList.add('fade-in');
                
                // Remove fade-in class after animation completes
                setTimeout(function() {
                    contentSection.classList.remove('fade-in');
                }, 300); // Match fade-in duration
            }, 150); // Delay before updating content
            
        } else {
            contentSection.innerHTML = `<h2>${sectionName}</h2><p>Content not available.</p>`;
        }
    }
    
    // Add click handlers to all navigation items
    for (let i = 0; i < navItems.length; i++) {
        navItems[i].onclick = function() {
            const sectionName = this.textContent.trim();
            showSection(sectionName);
            // Smooth scroll to content area
            // Only scroll if the nav bar is potentially covering the top of the content
            // We check if the nav bar is sticky and its bottom position
            const navStyle = window.getComputedStyle(navItems[0].closest('nav'));
            if (navStyle.position === 'sticky') {
                 // Small delay to allow content rendering before scrolling
                setTimeout(() => {
                    const navHeight = navItems[0].closest('nav').offsetHeight;
                    const contentTop = contentSection.getBoundingClientRect().top + window.pageYOffset - navHeight;
                    window.scrollTo({ top: contentTop, behavior: 'smooth' });
                }, 160); // Slightly longer than the fade-out delay
            } else {
                 contentSection.scrollIntoView({ behavior: 'smooth' });
            }
            return false; // Prevent default link behavior
        };
    }
    
    // Initialize with the Course Overview content, not linked to a nav item
    const initialContentHTML = `
        <h2>Course Overview</h2>
        <p>Welcome to the VIBE CODING EXPERT COURSE! This comprehensive guide outlines a repeatable, structured process for working with AI coding assistants to build production-quality software. While we'll use the example of building a Supabase MCP server with Python, the same process applies to any AI coding workflow.</p>
        <p>By the end of this course, you'll have mastered a structured approach to working with AI coding assistants, allowing you to build better software, faster, and with fewer headaches.</p>
    `;
    contentSection.innerHTML = initialContentHTML;
    
    // Ensure no nav item is active initially
    navItems.forEach(function(item) {
        item.classList.remove('active');
    });
}); 