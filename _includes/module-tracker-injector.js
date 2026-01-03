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

    // Find the insertion point (at the top, before markdown content)
    const trackerContainer = document.getElementById('module-tracker-container');
    
    if (!trackerContainer) {
      // Fallback: find container or create one
      const container = document.querySelector('.container');
      if (container) {
        const newContainer = document.createElement('div');
        newContainer.id = 'module-tracker-container';
        const markdownBody = container.querySelector('.markdown-body');
        if (markdownBody) {
          container.insertBefore(newContainer, markdownBody);
        } else {
          container.insertBefore(newContainer, container.firstChild);
        }
      } else {
        console.warn('Could not find container to inject tracker');
        return;
      }
    }

    // Inject tracker HTML with embedded functionality
    injectTracker(trackerContainer, moduleNumber);
  }

  function injectTracker(container, moduleNumber) {
    // Try to load the tracker HTML file first
    fetch('/_includes/module-tracker.html')
      .then(response => {
        if (!response.ok) throw new Error('Failed to load tracker HTML');
        return response.text();
      })
      .then(html => {
        // Replace Jekyll syntax with actual module number
        let processedHTML = html
          .replace(/\{\{\s*page\.module_number\s*\}\}/g, moduleNumber)
          .replace(/\{\{\s*page\.title\s*\}\}/g, document.title || `Module ${moduleNumber}`);
        
        // Inject the HTML
        container.innerHTML = processedHTML;
        
        // Extract and execute any script tags (innerHTML doesn't execute scripts)
        const scripts = container.querySelectorAll('script');
        scripts.forEach(oldScript => {
          const newScript = document.createElement('script');
          Array.from(oldScript.attributes).forEach(attr => {
            newScript.setAttribute(attr.name, attr.value);
          });
          newScript.appendChild(document.createTextNode(oldScript.innerHTML));
          oldScript.parentNode.replaceChild(newScript, oldScript);
        });
      })
      .catch(error => {
        console.error('Error loading tracker HTML, using inline fallback:', error);
        // Fallback: inject tracker inline
        injectTrackerInline(container, moduleNumber);
      });
  }

  function injectTrackerInline(container, moduleNumber) {
    // Inline tracker HTML (fallback if file can't be loaded)
    // This is a simplified self-contained version
    const API_BASE_URL = 'https://learn-aamad-1bstuneub-synaptic-ai-consulting.vercel.app/api';
    
    container.innerHTML = `
<div id="module-tracker" data-module-number="${moduleNumber}" style="margin: 2rem 0; padding: 1.5rem; border: 2px solid #30363d; border-radius: 6px; background-color: #161b22;">
  <h3 style="margin-top: 0; color: #c9d1d9;">📊 Track Your Progress</h3>
  
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

  <div id="progress-section" style="display: none;">
    <div id="completion-status" style="margin-bottom: 1rem;">
      <p style="color: #c9d1d9;"><strong>Status:</strong> <span id="status-text">Not started</span></p>
      <div id="progress-bar" style="width: 100%; height: 8px; background-color: #21262d; border-radius: 4px; margin-top: 0.5rem;">
        <div id="progress-fill" style="height: 100%; background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); border-radius: 4px; width: 0%; transition: width 0.3s;"></div>
      </div>
    </div>

    <div id="answers-section" style="margin-top: 1.5rem;">
      <h4 style="color: #c9d1d9;">Submit Your Answers</h4>
      <p style="font-size: 0.9rem; color: #8b949e;">Answer the "Check Your Understanding" questions below, then submit your responses.</p>
      
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
    `;

    // Initialize tracker functionality
    initializeTracker(moduleNumber, API_BASE_URL);
  }

  function initializeTracker(moduleNumber, API_BASE_URL) {
    const studentId = localStorage.getItem('learn-aamad-student-id');
    const studentEmail = localStorage.getItem('learn-aamad-student-email');
    
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
    
    function populateQuestionsForm() {
      const questions = extractQuestions();
      const container = document.getElementById('questions-container');
      if (!container) return;
      
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
    
    async function loadModuleStatus() {
      // Read studentId from localStorage (not closure variable)
      const currentStudentId = localStorage.getItem('learn-aamad-student-id');
      if (!currentStudentId) return;
      try {
        const response = await fetch(`${API_BASE_URL}/module-status?student_id=${currentStudentId}&module_number=${moduleNumber}`);
        if (response.ok) {
          const data = await response.json();
          if (data.completed) {
            document.getElementById('status-text').textContent = '✅ Completed';
            document.getElementById('progress-fill').style.width = '100%';
            document.getElementById('submit-btn').textContent = '✅ Module Complete';
            document.getElementById('submit-btn').disabled = true;
            if (data.answers) {
              Object.entries(data.answers).forEach(([key, value]) => {
                const textarea = document.querySelector(`textarea[name="${key}"]`);
                if (textarea) textarea.value = value;
              });
            }
            if (data.all_modules_complete) checkAndDisplayCertificate();
          } else {
            document.getElementById('status-text').textContent = 'In Progress';
            document.getElementById('progress-fill').style.width = '0%';
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
      
      const answers = {};
      document.querySelectorAll('#questions-container textarea').forEach(textarea => {
        const qNum = textarea.dataset.question;
        if (qNum && textarea.value.trim()) answers[`answer-${qNum}`] = textarea.value.trim();
      });
      
      const submitBtn = document.getElementById('submit-btn');
      submitBtn.disabled = true;
      submitBtn.textContent = 'Submitting...';
      
      try {
        const response = await fetch(API_BASE_URL + '/complete-module', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            student_id: currentStudentId,
            module_number: moduleNumber,
            answers: answers,
            submission_url: document.getElementById('submission-url').value || null
          })
        });
        
        if (!response.ok) {
          const errorData = await response.json();
          throw new Error(errorData.error || 'Submission failed');
        }
        
        const data = await response.json();
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
            setTimeout(() => checkAndDisplayCertificate(), 1000);
          } catch (err) {
            setTimeout(() => checkAndDisplayCertificate(), 1000);
          }
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
      
      const answers = {};
      document.querySelectorAll('#questions-container textarea').forEach(textarea => {
        const qNum = textarea.dataset.question;
        if (qNum && textarea.value.trim()) answers[`answer-${qNum}`] = textarea.value.trim();
      });
      
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
    
    async function checkAndDisplayCertificate() {
      // Read studentId from localStorage (not closure variable)
      const currentStudentId = localStorage.getItem('learn-aamad-student-id');
      if (!currentStudentId) return;
      try {
        const response = await fetch(`${API_BASE_URL}/get-certificate?student_id=${currentStudentId}`);
        if (response.ok) {
          const data = await response.json();
          if (data.success && data.certificate_url) {
            const certSection = document.getElementById('certificate-section');
            if (certSection) {
              certSection.style.display = 'block';
              document.getElementById('verification-code').textContent = data.verification_code;
              document.getElementById('certificate-download-link').href = data.certificate_url;
              const baseUrl = window.location.origin;
              document.getElementById('verify-certificate-link').href = `${baseUrl}/verify-certificate.html?code=${data.verification_code}`;
              document.getElementById('share-linkedin-btn').addEventListener('click', () => {
                const shareUrl = encodeURIComponent(`${baseUrl}/verify-certificate.html?code=${data.verification_code}`);
                window.open(`https://www.linkedin.com/sharing/share-offsite/?url=${shareUrl}`, '_blank');
              });
              certSection.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
            }
          }
        }
      } catch (error) {
        console.error('Error checking certificate:', error);
      }
    }
    
    function showRegistrationSection() {
      document.getElementById('registration-section').style.display = 'block';
      document.getElementById('progress-section').style.display = 'none';
    }
    
    function showProgressSection() {
      document.getElementById('registration-section').style.display = 'none';
      document.getElementById('progress-section').style.display = 'block';
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
  }
})();
