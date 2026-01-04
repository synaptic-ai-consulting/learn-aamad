// Module Tracker Injector - Client-Side
// Automatically injects the progress tracker into course module pages
// Works with GitHub Pages markdown rendering

(function() {
  'use strict';

  // Wait for DOM to be ready
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }

  function init() {
    // Detect if we're on a module page (URL pattern: /course/01-*.md or /course/01-*.html)
    const path = window.location.pathname;
    // More flexible pattern: matches "01-", "02-", etc. anywhere in the path
    const moduleMatch = path.match(/0(\d)-/) || path.match(/\/0(\d)-/) || path.match(/module[_-]?0?(\d)/i);
    
    if (!moduleMatch) {
      console.log('Module tracker: Not a module page, path:', path);
      return; // Not a module page
    }
    
    console.log('Module tracker: Detected module page, path:', path, 'match:', moduleMatch);

    const moduleNumber = parseInt(moduleMatch[1]);
    
    if (moduleNumber < 1 || moduleNumber > 8) {
      return; // Invalid module number
    }

    // Find containers for top (progress) and bottom (answers)
    const container = document.querySelector('.container');
    if (!container) {
      console.warn('Could not find container to inject tracker');
      return;
    }
    
    // Create top container for progress tracker
    const topTrackerContainer = document.getElementById('module-tracker-container');
    if (!topTrackerContainer) {
      const newTopContainer = document.createElement('div');
      newTopContainer.id = 'module-tracker-container';
      const markdownBody = container.querySelector('.markdown-body');
      if (markdownBody) {
        container.insertBefore(newTopContainer, markdownBody);
      } else {
        container.insertBefore(newTopContainer, container.firstChild);
      }
    }
    
    // Create bottom container for answers submission
    const bottomTrackerContainer = document.getElementById('module-answers-container');
    if (!bottomTrackerContainer) {
      const newBottomContainer = document.createElement('div');
      newBottomContainer.id = 'module-answers-container';
      const markdownBody = container.querySelector('.markdown-body');
      if (markdownBody) {
        container.appendChild(newBottomContainer);
      } else {
        container.appendChild(newBottomContainer);
      }
    }

    // Inject progress tracker at top and answers form at bottom
    injectTrackerSplit(topTrackerContainer, bottomTrackerContainer, moduleNumber);
  }

  function injectTrackerSplit(topContainer, bottomContainer, moduleNumber) {
    // Inject progress tracker at top and answers form at bottom
    injectTrackerInline(topContainer, bottomContainer, moduleNumber);
  }

  function injectTrackerInline(topContainer, bottomContainer, moduleNumber) {
    // Inline tracker HTML split into top (progress) and bottom (answers)
    const API_BASE_URL = 'https://learn-aamad-1bstuneub-synaptic-ai-consulting.vercel.app/api';
    
    // Top container: Progress tracker and registration
    topContainer.innerHTML = `
<div id="module-tracker" data-module-number="${moduleNumber}" style="margin: 2rem 0; padding: 1.5rem; border: 2px solid #30363d; border-radius: 6px; background-color: #161b22;">
  <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 1.5rem; flex-wrap: wrap; gap: 1rem;">
    <h3 style="margin: 0; color: #c9d1d9;">📊 Track Your Progress</h3>
    <div id="certificate-action-buttons" style="display: flex; gap: 0.75rem; flex-wrap: wrap;">
      <button id="download-certificate-btn" disabled style="background-color: #21262d; color: #8b949e; padding: 0.75rem 1.5rem; border: 1px solid #30363d; border-radius: 6px; cursor: not-allowed; font-weight: 600; text-align: center;">
        📥 Download Certificate
      </button>
      <button id="post-linkedin-btn" disabled style="background-color: #21262d; color: #8b949e; padding: 0.75rem 1.5rem; border: 1px solid #30363d; border-radius: 6px; cursor: not-allowed; font-weight: 600; text-align: center;">
        🔗 Post to LinkedIn
      </button>
    </div>
  </div>
  
  <div id="registration-section" style="display: none;">
    <p style="color: #c9d1d9;">To track your progress and receive your certificate, please register:</p>
    <form id="registration-form">
      <div style="margin-bottom: 1rem;">
        <label for="student-email" style="color: #c9d1d9; display: block; margin-bottom: 0.5rem;">Email:</label>
        <input type="email" id="student-email" required style="width: 100%; padding: 0.5rem; background-color: #0d1117; border: 1px solid #30363d; border-radius: 4px; color: #c9d1d9;">
      </div>
      <div style="margin-bottom: 1rem;">
        <label for="student-linkedin" style="color: #c9d1d9; display: block; margin-bottom: 0.5rem;">LinkedIn Profile URL (optional):</label>
        <input type="url" id="student-linkedin" placeholder="https://linkedin.com/in/yourprofile" style="width: 100%; padding: 0.5rem; background-color: #0d1117; border: 1px solid #30363d; border-radius: 4px; color: #c9d1d9;">
      </div>
      <div style="margin-bottom: 1rem;">
        <label for="student-name" style="color: #c9d1d9; display: block; margin-bottom: 0.5rem;">Full Name:</label>
        <input type="text" id="student-name" required style="width: 100%; padding: 0.5rem; background-color: #0d1117; border: 1px solid #30363d; border-radius: 4px; color: #c9d1d9;">
      </div>
      <button type="submit" style="background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); color: white; padding: 0.75rem 1.5rem; border: none; border-radius: 6px; cursor: pointer; font-weight: 600;">
        Register & Continue
      </button>
    </form>
  </div>

  <!-- Module Navigation Grid - Always visible for navigation -->
  <div id="modules-navigation-section" style="margin-bottom: 2rem;">
    <div id="modules-grid" style="display: grid; grid-template-columns: repeat(auto-fit, minmax(200px, 1fr)); gap: 0.75rem; margin-bottom: 1rem;">
      <!-- Modules will be injected here -->
    </div>
    <div id="progress-summary" style="color: #8b949e; font-size: 0.9rem;">
      <span id="completed-count">0</span> of 8 modules completed
    </div>
  </div>

  <div id="progress-section" style="display: none;">
    <!-- This section is now empty, buttons moved to header -->
  </div>

  <div id="success-message" style="display: none; padding: 1rem; background-color: #1a472a; border: 1px solid #238636; border-radius: 4px; color: #3fb950; margin-top: 1rem;">
    ✅ Module marked as complete! Great work!
  </div>

  <div id="certificate-section" style="display: none; margin-top: 2rem; padding: 1.5rem; background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); border-radius: 8px; color: white;">
    <h3 style="margin-top: 0; color: white;">🎉 Congratulations! You've Completed the Course!</h3>
    <p>Your certificate is ready. Download it below or share it on LinkedIn.</p>
    
    <div id="certificate-info" style="margin-top: 1rem;">
      <div style="margin-bottom: 1rem;">
        <strong>Verification Code:</strong> <code id="verification-code" style="background: rgba(255,255,255,0.2); padding: 0.25rem 0.5rem; border-radius: 4px; font-family: monospace;"></code>
      </div>
      
      <div style="display: flex; gap: 1rem; flex-wrap: wrap;">
        <a id="certificate-download-link" href="#" target="_blank" style="background-color: white; color: #667eea; padding: 0.75rem 1.5rem; border-radius: 6px; text-decoration: none; font-weight: 600; display: inline-block;">
          📥 Download Certificate
        </a>
        <button id="share-linkedin-btn" style="background-color: #0077b5; color: white; padding: 0.75rem 1.5rem; border: none; border-radius: 6px; cursor: pointer; font-weight: 600;">
          🔗 Share on LinkedIn
        </button>
        <a id="verify-certificate-link" href="#" target="_blank" style="background: rgba(255,255,255,0.2); color: white; padding: 0.75rem 1.5rem; border-radius: 6px; text-decoration: none; font-weight: 600; display: inline-block;">
          ✓ Verify Certificate
        </a>
      </div>
    </div>
  </div>

  <div id="error-message" style="display: none; padding: 1rem; background-color: #3d2115; border: 1px solid #da3633; border-radius: 4px; color: #f85149; margin-top: 1rem;">
    <span id="error-text"></span>
  </div>
</div>

<!-- LinkedIn Share Modal -->
<div id="linkedin-share-modal" style="display: none; position: fixed; top: 0; left: 0; width: 100%; height: 100%; background-color: rgba(0, 0, 0, 0.7); z-index: 1000; align-items: center; justify-content: center;">
  <div style="background-color: #161b22; border: 2px solid #30363d; border-radius: 8px; padding: 2rem; max-width: 600px; width: 90%; max-height: 90vh; overflow-y: auto; position: relative;">
    <button id="close-linkedin-modal" style="position: absolute; top: 1rem; right: 1rem; background: none; border: none; color: #c9d1d9; font-size: 1.5rem; cursor: pointer; padding: 0.5rem; line-height: 1;">&times;</button>
    <h3 style="color: #c9d1d9; margin-top: 0; margin-bottom: 1.5rem;">🔗 Share Your Certificate on LinkedIn</h3>
    
    <div style="margin-bottom: 1.5rem;">
      <label style="color: #c9d1d9; display: block; margin-bottom: 0.5rem; font-weight: 600;">Suggested Post Text:</label>
      <textarea id="linkedin-post-text" readonly style="width: 100%; min-height: 150px; padding: 0.75rem; background-color: #0d1117; border: 1px solid #30363d; border-radius: 4px; color: #c9d1d9; font-family: inherit; resize: vertical;"></textarea>
      <button id="copy-linkedin-text" style="margin-top: 0.5rem; background-color: #667eea; color: white; padding: 0.5rem 1rem; border: none; border-radius: 4px; cursor: pointer; font-weight: 600;">
        📋 Copy Text
      </button>
    </div>
    
    <div style="margin-bottom: 1.5rem; padding: 1rem; background-color: #0d1117; border: 1px solid #30363d; border-radius: 4px;">
      <p style="color: #c9d1d9; margin: 0 0 0.5rem 0; font-weight: 600;">Instructions:</p>
      <ol style="color: #8b949e; margin: 0; padding-left: 1.5rem;">
        <li style="margin-bottom: 0.5rem;">Copy the post text above (it includes the certificate URL)</li>
        <li style="margin-bottom: 0.5rem;">Click "Open LinkedIn" below</li>
        <li style="margin-bottom: 0.5rem;">Paste the text in your LinkedIn post</li>
        <li style="margin-bottom: 0.5rem;">LinkedIn will automatically render the certificate URL as a clickable link</li>
        <li>Publish your post!</li>
      </ol>
    </div>
    
    <div style="display: flex; gap: 0.75rem; flex-wrap: wrap;">
      <button id="open-linkedin-btn" style="flex: 1; background-color: #0077b5; color: white; padding: 0.75rem 1.5rem; border: none; border-radius: 6px; cursor: pointer; font-weight: 600; min-width: 150px;">
        🔗 Open LinkedIn
      </button>
      <button id="download-cert-from-modal" style="flex: 1; background-color: #667eea; color: white; padding: 0.75rem 1.5rem; border: none; border-radius: 6px; cursor: pointer; font-weight: 600; min-width: 150px;">
        📥 Download Certificate
      </button>
    </div>
  </div>
</div>
    `;

    // Bottom container: Answers submission form
    bottomContainer.innerHTML = `
<div id="module-answers" data-module-number="${moduleNumber}" style="margin: 2rem 0; padding: 1.5rem; border: 2px solid #30363d; border-radius: 6px; background-color: #161b22;">
  <h3 style="margin-top: 0; color: #c9d1d9;">📝 Submit Your Answers</h3>
  <p style="font-size: 0.9rem; color: #8b949e; margin-bottom: 1.5rem;">Answer the "Check Your Understanding" questions below, then submit your responses.</p>
  
  <form id="answers-form">
    <div id="questions-container"></div>
    
    <div style="margin-top: 1rem;">
      <label for="submission-url" style="color: #c9d1d9; display: block; margin-bottom: 0.5rem;">Link to your deliverables (GitHub repo, Google Drive, etc.):</label>
      <input type="url" id="submission-url" placeholder="https://github.com/yourusername/your-project" style="width: 100%; padding: 0.5rem; background-color: #0d1117; border: 1px solid #30363d; border-radius: 4px; color: #c9d1d9;">
    </div>
    
    <div style="margin-top: 1rem; display: flex; gap: 1rem;">
      <button type="submit" id="submit-btn" style="background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); color: white; padding: 0.75rem 1.5rem; border: none; border-radius: 6px; cursor: pointer; font-weight: 600;">
        ✅ Mark Module Complete
      </button>
      <button type="button" id="save-draft-btn" style="background-color: #21262d; color: #c9d1d9; padding: 0.75rem 1.5rem; border: 1px solid #30363d; border-radius: 6px; cursor: pointer;">
        💾 Save Draft
      </button>
    </div>
  </form>
</div>
    `;

    // Initialize tracker functionality (shared between top and bottom)
    initializeTracker(moduleNumber, API_BASE_URL);
  }

  function initializeTracker(moduleNumber, API_BASE_URL) {
    // Module metadata - defined first so it's available for rendering
    const MODULES = [
      { number: 1, title: 'Introduction to Agentic Architect', url: '/learn-aamad/course/01-intro-agentic-architect.html' },
      { number: 2, title: 'AAMAD Overview', url: '/learn-aamad/course/02-aamad-overview.html' },
      { number: 3, title: 'Context Engineering Basics', url: '/learn-aamad/course/03-context-engineering-basics.html' },
      { number: 4, title: 'Building Multi-Agent AI Systems', url: '/learn-aamad/course/04-building-your-multiagent-application-crew.html' },
      { number: 5, title: 'Hands-On: Define Phase', url: '/learn-aamad/course/05-hands-on-mini-project-define.html' },
      { number: 6, title: 'Hands-On: Build Phase', url: '/learn-aamad/course/06-hands-on-mini-project-build.html' },
      { number: 7, title: 'Hands-On: Deliver Phase', url: '/learn-aamad/course/07-hands-on-mini-project-deliver.html' },
      { number: 8, title: 'Value and Next Steps', url: '/learn-aamad/course/08-value-and-next-steps.html' }
    ];
    
    function renderModulesGrid(moduleStatuses = {}) {
      const grid = document.getElementById('modules-grid');
      if (!grid) {
        console.warn('modules-grid element not found');
        return;
      }
      
      // Use relative URLs for navigation to work correctly on GitHub Pages
      // The URLs are already relative paths like '/course/01-intro-agentic-architect.html'
      const gridHTML = MODULES.map(mod => {
        const isCompleted = moduleStatuses[mod.number] || false;
        const isCurrent = mod.number === moduleNumber;
        // Use relative URL - works on both local and GitHub Pages
        const moduleUrl = mod.url;
        
        return `
          <a href="${moduleUrl}" style="display: flex; align-items: center; gap: 0.75rem; padding: 0.75rem; background-color: ${isCurrent ? '#21262d' : '#0d1117'}; border: 2px solid ${isCurrent ? '#667eea' : '#30363d'}; border-radius: 6px; text-decoration: none; color: #c9d1d9; transition: all 0.2s; ${isCurrent ? 'box-shadow: 0 0 0 2px rgba(102, 126, 234, 0.3);' : ''}">
            <div style="width: 24px; height: 24px; display: flex; align-items: center; justify-content: center; flex-shrink: 0;">
              ${isCompleted ? '<span style="color: #3fb950; font-size: 1.2rem;">✓</span>' : '<div style="width: 18px; height: 18px; border: 2px solid #30363d; border-radius: 4px; background-color: #0d1117;"></div>'}
            </div>
            <div style="flex: 1; min-width: 0;">
              <div style="font-weight: 600; font-size: 0.9rem;">Module ${mod.number.toString().padStart(2, '0')}</div>
              <div style="font-size: 0.85rem; color: #8b949e; overflow: hidden; text-overflow: ellipsis; white-space: nowrap;">${mod.title}</div>
            </div>
          </a>
        `;
      }).join('');
      
      grid.innerHTML = gridHTML;
      console.log('Modules grid rendered with', MODULES.length, 'modules');
    }
    
    const studentId = localStorage.getItem('learn-aamad-student-id');
    const studentEmail = localStorage.getItem('learn-aamad-student-email');
    
    // Always render the modules grid (even without registration)
    // This ensures navigation is always available
    renderModulesGrid({});
    
    if (studentId && studentEmail) {
      showProgressSection();
      loadModuleStatus();
    } else {
      showRegistrationSection();
    }
    
    // Registration form handler
    const registrationForm = document.getElementById('registration-form');
    if (registrationForm) {
      registrationForm.addEventListener('submit', async (e) => {
        e.preventDefault();
        const email = document.getElementById('student-email').value;
        const linkedin = document.getElementById('student-linkedin').value;
        const name = document.getElementById('student-name').value;
        
        try {
          const response = await fetch(API_BASE_URL + '/register', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ email, linkedin_url: linkedin || null, full_name: name })
          });
          
          if (!response.ok) throw new Error('Registration failed');
          const data = await response.json();
          localStorage.setItem('learn-aamad-student-id', data.student_id);
          localStorage.setItem('learn-aamad-student-email', email);
          showProgressSection();
          loadModuleStatus();
        } catch (error) {
          showError('Registration failed. Please try again.');
        }
      });
    }
    
    function extractQuestions() {
      const questions = [];
      const content = document.querySelector('article, .markdown-body, main') || document.body;
      const headings = content.querySelectorAll('h2, h3, h4');
      
      for (const heading of headings) {
        if (heading.textContent.includes('Check Your Understanding')) {
          let next = heading.nextElementSibling;
          while (next && next.tagName !== 'H2' && next.tagName !== 'H3') {
            if (next.tagName === 'OL' || next.tagName === 'UL') {
              next.querySelectorAll('li').forEach((li, index) => {
                const text = li.textContent.trim();
                if (text) questions.push({ number: index + 1, text: text });
              });
              break;
            }
            next = next.nextElementSibling;
          }
          break;
        }
      }
      return questions;
    }
    
    function hideCheckUnderstandingSection() {
      // Hide "Check Your Understanding" section from main content after extraction
      const headings = document.querySelectorAll('.markdown-body h2, .markdown-body h3');
      headings.forEach(function(heading) {
        if (heading.textContent.includes('Check Your Understanding')) {
          // Mark the heading and all following siblings until next heading
          heading.style.display = 'none';
          let next = heading.nextElementSibling;
          while (next) {
            // Stop at next h2 or h3
            if (next.tagName === 'H2' || next.tagName === 'H3') {
              break;
            }
            next.style.display = 'none';
            next = next.nextElementSibling;
          }
        }
      });
    }
    
    function populateQuestionsForm() {
      const questions = extractQuestions();
      // Hide the section after extraction
      hideCheckUnderstandingSection();
      
      // Target the questions-container in the bottom answers section, not the top tracker
      const moduleAnswers = document.getElementById('module-answers');
      const container = moduleAnswers ? moduleAnswers.querySelector('#questions-container') : null;
      if (!container) {
        console.warn('Questions container not found in bottom section');
        return;
      }
      
      if (questions.length === 0) {
        container.innerHTML = '<p style="color: #8b949e;">No questions found. You can still mark the module as complete.</p>';
        return;
      }
      
      container.innerHTML = questions.map(q => `
        <div style="margin-bottom: 1.5rem;">
          <label style="display: block; font-weight: 600; margin-bottom: 0.5rem; color: #c9d1d9;">Question ${q.number}:</label>
          <p style="margin-bottom: 0.5rem; color: #8b949e;">${q.text}</p>
          <textarea name="answer-${q.number}" data-question="${q.number}" rows="3" placeholder="Type your answer here..." style="width: 100%; padding: 0.5rem; background-color: #0d1117; border: 1px solid #30363d; border-radius: 4px; font-family: inherit; color: #c9d1d9;"></textarea>
        </div>
      `).join('');
    }
    
    async function loadAllModuleStatuses() {
      const currentStudentId = localStorage.getItem('learn-aamad-student-id');
      if (!currentStudentId) return {};
      
      const statuses = {};
      const promises = MODULES.map(mod => 
        fetch(`${API_BASE_URL}/module-status?student_id=${currentStudentId}&module_number=${mod.number}`)
          .then(res => res.ok ? res.json() : { completed: false })
          .then(data => ({ number: mod.number, completed: data.completed || false }))
          .catch(() => ({ number: mod.number, completed: false }))
      );
      
      const results = await Promise.all(promises);
      results.forEach(result => {
        statuses[result.number] = result.completed;
      });
      
      return statuses;
    }
    
    async function loadModuleStatus() {
      // Read studentId from localStorage (not closure variable)
      const currentStudentId = localStorage.getItem('learn-aamad-student-id');
      if (!currentStudentId) return;
      
      try {
        // Load all module statuses for the grid
        const allStatuses = await loadAllModuleStatuses();
        renderModulesGrid(allStatuses);
        
        // Update completion count
        const completedCount = Object.values(allStatuses).filter(Boolean).length;
        const completedCountEl = document.getElementById('completed-count');
        if (completedCountEl) completedCountEl.textContent = completedCount;
        
        // Update certificate buttons
        const allComplete = completedCount === 8;
        const downloadBtn = document.getElementById('download-certificate-btn');
        const linkedInBtn = document.getElementById('post-linkedin-btn');
        
        if (downloadBtn) {
          downloadBtn.disabled = !allComplete;
          if (allComplete) {
            downloadBtn.style.backgroundColor = '#667eea';
            downloadBtn.style.color = 'white';
            downloadBtn.style.cursor = 'pointer';
            downloadBtn.style.borderColor = '#667eea';
          } else {
            downloadBtn.style.backgroundColor = '#21262d';
            downloadBtn.style.color = '#8b949e';
            downloadBtn.style.cursor = 'not-allowed';
            downloadBtn.style.borderColor = '#30363d';
          }
        }
        
        if (linkedInBtn) {
          linkedInBtn.disabled = !allComplete;
          if (allComplete) {
            linkedInBtn.style.backgroundColor = '#0077b5';
            linkedInBtn.style.color = 'white';
            linkedInBtn.style.cursor = 'pointer';
            linkedInBtn.style.borderColor = '#0077b5';
          } else {
            linkedInBtn.style.backgroundColor = '#21262d';
            linkedInBtn.style.color = '#8b949e';
            linkedInBtn.style.cursor = 'not-allowed';
            linkedInBtn.style.borderColor = '#30363d';
          }
        }
        
        // Load current module status
        const response = await fetch(`${API_BASE_URL}/module-status?student_id=${currentStudentId}&module_number=${moduleNumber}`);
        if (response.ok) {
          const data = await response.json();
          if (data.completed) {
            const submitBtn = document.getElementById('submit-btn');
            if (submitBtn) {
              submitBtn.textContent = '✅ Module Complete';
              submitBtn.disabled = true;
            }
            if (data.answers) {
              const moduleAnswers = document.getElementById('module-answers');
              if (moduleAnswers) {
                Object.entries(data.answers).forEach(([key, value]) => {
                  const textarea = moduleAnswers.querySelector(`textarea[name="${key}"]`);
                  if (textarea) textarea.value = value;
                });
              }
            }
            if (data.all_modules_complete) {
              checkAndDisplayCertificate();
              // Reload all statuses to update the grid
              const updatedStatuses = await loadAllModuleStatuses();
              renderModulesGrid(updatedStatuses);
            }
          }
        }
      } catch (error) {
        console.error('Error loading status:', error);
      }
      populateQuestionsForm();
    }
    
    document.getElementById('answers-form')?.addEventListener('submit', async (e) => {
      e.preventDefault();
      // Read studentId from localStorage (not closure variable)
      const currentStudentId = localStorage.getItem('learn-aamad-student-id');
      if (!currentStudentId) { showError('Please register first.'); return; }
      
      // Collect answers from bottom section only
      const answers = {};
      const moduleAnswers = document.getElementById('module-answers');
      if (moduleAnswers) {
        moduleAnswers.querySelectorAll('#questions-container textarea').forEach(textarea => {
          const qNum = textarea.dataset.question;
          if (qNum && textarea.value.trim()) answers[`answer-${qNum}`] = textarea.value.trim();
        });
      }
      
      const submitBtn = document.getElementById('submit-btn');
      submitBtn.disabled = true;
      submitBtn.textContent = 'Submitting...';
      
      try {
        const submissionData = {
          student_id: currentStudentId,
          module_number: moduleNumber,
          answers: answers,
          submission_url: document.getElementById('submission-url').value || null
        };
        
        console.log('Submitting module completion:', submissionData);
        
        const response = await fetch(API_BASE_URL + '/complete-module', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(submissionData)
        });
        
        console.log('Module completion response status:', response.status, response.statusText);
        
        if (!response.ok) {
          const errorData = await response.json().catch(() => ({ error: 'Unknown error' }));
          console.error('Module completion failed:', errorData);
          throw new Error(errorData.error || 'Submission failed');
        }
        
        const data = await response.json();
        console.log('Module completion success:', data);
        document.getElementById('status-text').textContent = '✅ Completed';
        document.getElementById('progress-fill').style.width = '100%';
        document.getElementById('success-message').style.display = 'block';
        submitBtn.textContent = '✅ Module Complete';
        
        if (data.all_modules_complete) {
          try {
            // Read studentId from localStorage (not closure variable)
            const currentStudentId = localStorage.getItem('learn-aamad-student-id');
            await fetch(API_BASE_URL + '/generate-certificate', {
              method: 'POST',
              headers: { 'Content-Type': 'application/json' },
              body: JSON.stringify({ student_id: currentStudentId })
            });
            // Reload all module statuses to update the grid
            const updatedStatuses = await loadAllModuleStatuses();
            renderModulesGrid(updatedStatuses);
            const completedCount = Object.values(updatedStatuses).filter(Boolean).length;
            const completedCountEl = document.getElementById('completed-count');
            if (completedCountEl) completedCountEl.textContent = completedCount;
            
            // Update certificate buttons
            const downloadBtn = document.getElementById('download-certificate-btn');
            const linkedInBtn = document.getElementById('post-linkedin-btn');
            if (downloadBtn) {
              downloadBtn.disabled = false;
              downloadBtn.style.backgroundColor = '#667eea';
              downloadBtn.style.color = 'white';
              downloadBtn.style.cursor = 'pointer';
              downloadBtn.style.borderColor = '#667eea';
            }
            if (linkedInBtn) {
              linkedInBtn.disabled = false;
              linkedInBtn.style.backgroundColor = '#0077b5';
              linkedInBtn.style.color = 'white';
              linkedInBtn.style.cursor = 'pointer';
              linkedInBtn.style.borderColor = '#0077b5';
            }
            
            setTimeout(() => checkAndDisplayCertificate(), 1000);
          } catch (err) {
            setTimeout(() => checkAndDisplayCertificate(), 1000);
          }
        } else {
          // Reload all module statuses to update the grid
          const updatedStatuses = await loadAllModuleStatuses();
          renderModulesGrid(updatedStatuses);
          const completedCount = Object.values(updatedStatuses).filter(Boolean).length;
          const completedCountEl = document.getElementById('completed-count');
          if (completedCountEl) completedCountEl.textContent = completedCount;
        }
        
        document.getElementById('success-message').scrollIntoView({ behavior: 'smooth' });
      } catch (error) {
        showError(error.message || 'Failed to submit. Please try again.');
        submitBtn.disabled = false;
        submitBtn.textContent = '✅ Mark Module Complete';
      }
    });
    
    document.getElementById('save-draft-btn')?.addEventListener('click', async () => {
      // Read studentId from localStorage (not closure variable)
      const currentStudentId = localStorage.getItem('learn-aamad-student-id');
      if (!currentStudentId) { showError('Please register first.'); return; }
      
      // Collect answers from bottom section only
      const answers = {};
      const moduleAnswers = document.getElementById('module-answers');
      if (moduleAnswers) {
        moduleAnswers.querySelectorAll('#questions-container textarea').forEach(textarea => {
          const qNum = textarea.dataset.question;
          if (qNum && textarea.value.trim()) answers[`answer-${qNum}`] = textarea.value.trim();
        });
      }
      
      try {
        await fetch(API_BASE_URL + '/save-draft', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ student_id: currentStudentId, module_number: moduleNumber, answers: answers })
        });
        
        const btn = document.getElementById('save-draft-btn');
        const originalText = btn.textContent;
        btn.textContent = '💾 Saved!';
        btn.style.backgroundColor = '#28a745';
        setTimeout(() => {
          btn.textContent = originalText;
          btn.style.backgroundColor = '#6a737d';
        }, 2000);
      } catch (error) {
        showError('Failed to save draft.');
      }
    });
    
    async function ensureCertificateExists(studentId) {
      // Check if certificate exists, generate if it doesn't
      try {
        const checkResponse = await fetch(`${API_BASE_URL}/get-certificate?student_id=${studentId}`);
        if (checkResponse.ok) {
          // Certificate exists, return the data
          const data = await checkResponse.json();
          return data;
        } else if (checkResponse.status === 404) {
          // Certificate doesn't exist, generate it
          console.log('Certificate not found, generating...');
          const generateResponse = await fetch(`${API_BASE_URL}/generate-certificate`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ student_id: studentId })
          });
          
          if (generateResponse.ok) {
            // Generation successful, now fetch the certificate
            const generateData = await generateResponse.json();
            if (generateData.success) {
              // Return the certificate data from generation response
              return generateData;
            }
          } else {
            const errorData = await generateResponse.json().catch(() => ({ error: 'Generation failed' }));
            throw new Error(errorData.error || 'Failed to generate certificate');
          }
        }
      } catch (error) {
        console.error('Error ensuring certificate exists:', error);
        throw error;
      }
      return null;
    }
    
    async function checkAndDisplayCertificate() {
      // Read studentId from localStorage (not closure variable)
      const currentStudentId = localStorage.getItem('learn-aamad-student-id');
      if (!currentStudentId) return;
      try {
        const data = await ensureCertificateExists(currentStudentId);
        if (data && data.success && data.certificate_url) {
          // Show the certificate section if it exists (for backward compatibility)
          const certSection = document.getElementById('certificate-section');
          if (certSection) {
            certSection.style.display = 'block';
            const verifyCodeEl = document.getElementById('verification-code');
            if (verifyCodeEl) verifyCodeEl.textContent = data.verification_code;
            const downloadLink = document.getElementById('certificate-download-link');
            if (downloadLink) downloadLink.href = data.certificate_url;
            const verifyLink = document.getElementById('verify-certificate-link');
            if (verifyLink) {
              const baseUrl = window.location.origin;
              verifyLink.href = `${baseUrl}/verify-certificate.html?code=${data.verification_code}`;
            }
            const shareBtn = document.getElementById('share-linkedin-btn');
            if (shareBtn) {
              shareBtn.onclick = () => {
                showLinkedInShareModal(data);
              };
            }
          }
        }
      } catch (error) {
        console.error('Error checking certificate:', error);
      }
    }
    
    // Set up certificate button handlers
    const downloadBtn = document.getElementById('download-certificate-btn');
    const linkedInBtn = document.getElementById('post-linkedin-btn');
    
    if (downloadBtn) {
      downloadBtn.addEventListener('click', async () => {
        if (downloadBtn.disabled) return;
        const currentStudentId = localStorage.getItem('learn-aamad-student-id');
        if (!currentStudentId) {
          showError('Please register first.');
          return;
        }
        try {
          downloadBtn.disabled = true;
          downloadBtn.textContent = '⏳ Generating...';
          const data = await ensureCertificateExists(currentStudentId);
          if (data && data.success && data.certificate_url) {
            window.open(data.certificate_url, '_blank');
          } else {
            showError('Certificate not found. Please complete all modules first.');
          }
          downloadBtn.disabled = false;
          downloadBtn.textContent = '📥 Download Certificate';
        } catch (error) {
          showError(error.message || 'Failed to download certificate.');
          downloadBtn.disabled = false;
          downloadBtn.textContent = '📥 Download Certificate';
        }
      });
    }
    
    if (linkedInBtn) {
      linkedInBtn.addEventListener('click', async () => {
        if (linkedInBtn.disabled) return;
        const currentStudentId = localStorage.getItem('learn-aamad-student-id');
        if (!currentStudentId) {
          showError('Please register first.');
          return;
        }
        try {
          linkedInBtn.disabled = true;
          linkedInBtn.textContent = '⏳ Generating...';
          const data = await ensureCertificateExists(currentStudentId);
          if (data && data.success && data.certificate_url) {
            showLinkedInShareModal(data);
          } else {
            showError('Certificate not found. Please complete all modules first.');
          }
          linkedInBtn.disabled = false;
          linkedInBtn.textContent = '🔗 Post to LinkedIn';
        } catch (error) {
          showError(error.message || 'Failed to share certificate.');
          linkedInBtn.disabled = false;
          linkedInBtn.textContent = '🔗 Post to LinkedIn';
        }
      });
    }
    
    function showRegistrationSection() {
      document.getElementById('registration-section').style.display = 'block';
      document.getElementById('progress-section').style.display = 'none';
    }
    
    function showProgressSection() {
      document.getElementById('registration-section').style.display = 'none';
      document.getElementById('progress-section').style.display = 'block';
      // Certificate buttons are always visible, no need to show/hide them
      // Modules navigation is always visible, no need to show/hide it
    }
    
    function showError(message) {
      const errorDiv = document.getElementById('error-message');
      const errorText = document.getElementById('error-text');
      if (errorDiv && errorText) {
        errorText.textContent = message;
        errorDiv.style.display = 'block';
        setTimeout(() => { errorDiv.style.display = 'none'; }, 5000);
      }
    }
    
    function showLinkedInShareModal(certificateData) {
      const modal = document.getElementById('linkedin-share-modal');
      const postText = document.getElementById('linkedin-post-text');
      
      // Create suggested post text with certificate PDF URL included (without verify URL)
      const suggestedText = `🎓 Excited to share that I've completed the "Agentic Architect Fundamentals" course by Synaptic AI Consulting!

✅ I've learned how to leverage the AAMAD (AI-Assisted Multi-Agent Application Development) framework to build production-ready AI applications using a persona-driven, context-engineered approach.

This course has equipped me with the skills to:
• Orchestrate AI agent personas effectively
• Engineer context for optimal AI performance
• Build multi-agent systems with CrewAI
• Apply the Agentic Architect mindset to deliver real business value

📜 View my certificate: ${certificateData.certificate_url}

#AgenticArchitect #AAMAD #AI #CrewAI #AIAgents #MachineLearning #SoftwareArchitecture`;
      
      if (postText) {
        postText.value = suggestedText;
      }
      
      // Copy text button
      const copyBtn = document.getElementById('copy-linkedin-text');
      if (copyBtn) {
        copyBtn.onclick = () => {
          postText.select();
          document.execCommand('copy');
          copyBtn.textContent = '✅ Copied!';
          setTimeout(() => {
            copyBtn.textContent = '📋 Copy Text';
          }, 2000);
        };
      }
      
      // Open LinkedIn button
      const openLinkedInBtn = document.getElementById('open-linkedin-btn');
      if (openLinkedInBtn) {
        openLinkedInBtn.onclick = () => {
          window.open('https://www.linkedin.com/feed/', '_blank');
        };
      }
      
      // Download certificate button in modal
      const downloadBtn = document.getElementById('download-cert-from-modal');
      if (downloadBtn) {
        downloadBtn.onclick = () => {
          window.open(certificateData.certificate_url, '_blank');
        };
      }
      
      // Close modal button
      const closeBtn = document.getElementById('close-linkedin-modal');
      if (closeBtn) {
        closeBtn.onclick = () => {
          modal.style.display = 'none';
        };
      }
      
      // Close modal when clicking outside
      modal.onclick = (e) => {
        if (e.target === modal) {
          modal.style.display = 'none';
        }
      };
      
      // Show modal
      modal.style.display = 'flex';
    }
  }
})();
