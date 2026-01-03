# Module 06: Hands-On Mini-Project - Build Phase

**Estimated time:** ~45 minutes  
**Outcome:** Execute the Build phase using the Development Crew to transform PRD into working code

---

## Learning Objectives

By the end of this module, you will be able to:
- Orchestrate the Development Crew using independent chat sessions
- Work with System Architect to create Solution Architecture Document (SAD)
- Work with Frontend Engineer to build UI components
- Work with Backend Engineer to implement business logic
- Work with Integration Engineer to wire up components
- Work with QA Engineer to test end-to-end functionality
- Use git branches for incremental development
- Configure environment variables for the application
- Apply software development best practices as an Agentic Architect

---

## Prerequisites

- Completed Module 05 (Define phase with MRD and PRD)
- Your `recruitment-assistant` project with AAMAD initialized
- Python 3.8+ installed
- Git installed and configured
- Access to an AI coding assistant (CursorAI recommended)
- OpenAI API key (or other LLM provider API key)

---

## Build Phase Overview

The Build phase transforms your PRD into working software through coordinated multi-agent execution. As an **Agentic Architect**, you'll wear your **Technical Hat** to orchestrate the Development Crew, ensuring:

- **Single Responsibility**: Each agent persona focuses on one aspect
- **Incremental Development**: Build and validate in small, manageable steps
- **Asynchronous Work**: Each persona works in independent chat sessions
- **Context Preservation**: All plans and decisions documented in markdown artifacts
- **Quality Gates**: Review, validate, and test at each step

**Development Crew Personas (in order):**
1. **System Architect** (`@system-architect`) - Creates SAD
2. **Frontend Engineer** (`@frontend-engineer`) - Builds UI
3. **Backend Engineer** (`@backend-engineer`) - Implements logic
4. **Integration Engineer** (`@integration-engineer`) - Wires components
5. **QA Engineer** (`@qa-engineer`) - Tests everything

---

## Step 1: Configure Environment Variables

Before starting development, configure the required environment variables.

### Create `.env` File

1. In your project root, create a `.env` file:

   ```bash
   cd ~/projects/recruitment-assistant
   touch .env
   ```

2. Add the following environment variables:

   ```bash
   # OpenAI API Configuration
   OPENAI_API_KEY=your_openai_api_key_here
   
   # Optional: Use a different model
   OPENAI_MODEL=gpt-4
   
   # Application Configuration
   APP_NAME=Recruitment Assistant
   APP_ENV=development
   
   # CrewAI Configuration (if needed)
   CREWAI_TELEMETRY_OPT_OUT=true
   ```

3. **Important:** Add `.env` to `.gitignore` to avoid committing secrets:

   ```bash
   echo ".env" >> .gitignore
   ```

4. Create a `.env.example` file as a template (commit this, not `.env`):

   ```bash
   cp .env .env.example
   # Edit .env.example to remove actual API keys, replace with placeholders
   ```

### Verify Environment Setup

Test that your environment variables are accessible:

```bash
# In Python
python -c "import os; from dotenv import load_dotenv; load_dotenv(); print('API Key set:', bool(os.getenv('OPENAI_API_KEY')))"
```

**Note:** You may need to install `python-dotenv`:
```bash
pip install python-dotenv
```

---

## Step 2: System Architect - Create Solution Architecture Document (SAD)

The System Architect designs the technical architecture based on your PRD.

### 2.1 Create Architecture Branch

```bash
git checkout -b feature/architecture
```

### 2.2 Invoke System Architect Persona

**Start a NEW chat session** (this is important for context isolation):

1. Open a new chat in Cursor (or your AI assistant)
2. Reference the System Architect persona:

   ```
   @system-architect
   
   I need you to create a Solution Architecture Document (SAD) for the 
   recruitment assistant application. Please:
   
   1. Review the PRD: project-context/1.define/prd.md
   2. Create a comprehensive SAD using the template: .cursor/templates/sad-template.md
   3. Design the architecture for:
      - Application Crew (Researcher, Evaluator, Recommender agents using CrewAI)
      - Frontend interface (simple web UI or CLI)
      - Backend API (FastAPI or Flask)
      - Integration points
   4. Save the SAD as: project-context/2.build/sad.md
   5. Also create a plan document: project-context/2.build/architecture-plan.md
      that outlines the implementation approach and status
   ```

### 2.3 Review and Iterate

**Wearing your Technical Hat**, review the SAD:

- [ ] Architecture aligns with PRD requirements
- [ ] Technology choices are appropriate (CrewAI, Python, etc.)
- [ ] Components are well-defined and modular
- [ ] Integration points are clear
- [ ] Scalability and performance considerations addressed
- [ ] Security considerations included

**If adjustments are needed:**
- Continue the conversation with `@system-architect`
- Request specific changes: "Update the API design to use FastAPI instead of Flask"
- Review again until satisfied

### 2.4 Validate and Commit

Once the SAD is complete and reviewed:

```bash
git add project-context/2.build/sad.md project-context/2.build/architecture-plan.md
git commit -m "feat: Add Solution Architecture Document (SAD)

- System Architect created comprehensive SAD
- Architecture plan documented
- Architecture reviewed and approved"
```

### 2.5 Merge to Main

```bash
git checkout main
git merge feature/architecture
git branch -d feature/architecture
```

---

## Step 3: Frontend Engineer - Build UI Components

The Frontend Engineer creates the user interface for the recruitment assistant.

### 3.1 Create Frontend Branch

```bash
git checkout -b feature/frontend
```

### 3.2 Invoke Frontend Engineer Persona

**Start a NEW chat session:**

```
@frontend-engineer

I need you to build the frontend for the recruitment assistant. Please:

1. Review the PRD: project-context/1.define/prd.md
2. Review the SAD: project-context/2.build/sad.md
3. Create a plan document: project-context/2.build/frontend-plan.md
   that outlines:
   - UI components to build
   - User interaction flows
   - API integration points
   - Implementation approach
   - Status tracking
4. Implement the frontend based on the plan
5. Create a simple web interface (HTML/CSS/JS or React) or CLI interface
6. Update frontend-plan.md with progress as you work
```

### 3.3 Review Frontend Plan

Review the `frontend-plan.md` before implementation:

- [ ] Plan covers all UI requirements from PRD
- [ ] User flows are logical and intuitive
- [ ] API integration points match SAD
- [ ] Implementation approach is feasible

**Iterate with Frontend Engineer if needed.**

### 3.4 Implementation

The Frontend Engineer will:
- Create frontend code in `src/frontend/` or similar
- Implement UI components
- Set up API client for backend communication
- Update `frontend-plan.md` with status as work progresses

**Monitor progress** by checking `frontend-plan.md` regularly.

### 3.5 Review Implementation

**Wearing your Technical Hat**, review the code:

- [ ] Code follows best practices
- [ ] UI matches PRD requirements
- [ ] Error handling is implemented
- [ ] Code is clean and maintainable

### 3.6 Validate and Commit

```bash
git add project-context/2.build/frontend-plan.md src/frontend/
git commit -m "feat: Add frontend implementation

- Frontend Engineer created UI components
- UI matches PRD requirements
- Frontend plan documented and updated"
```

### 3.7 Merge to Main

```bash
git checkout main
git merge feature/frontend
git branch -d feature/frontend
```

---

## Step 4: Backend Engineer - Implement Business Logic

The Backend Engineer implements the Application Crew and backend services.

### 4.1 Create Backend Branch

```bash
git checkout -b feature/backend
```

### 4.2 Invoke Backend Engineer Persona

**Start a NEW chat session:**

```
@backend-engineer

I need you to implement the backend for the recruitment assistant. Please:

1. Review the PRD: project-context/1.define/prd.md
2. Review the SAD: project-context/2.build/sad.md
3. Create a plan document: project-context/2.build/backend-plan.md
   that outlines:
   - Application Crew implementation (CrewAI agents)
   - API endpoints to implement
   - Business logic components
   - Implementation approach
   - Status tracking
4. Implement the Application Crew using CrewAI:
   - Researcher Agent
   - Evaluator Agent
   - Recommender Agent
5. Implement API endpoints (FastAPI or Flask)
6. Update backend-plan.md with progress as you work
```

### 4.3 Review Backend Plan

Review the `backend-plan.md`:

- [ ] Plan covers all backend requirements
- [ ] Application Crew agents are well-defined
- [ ] API endpoints match SAD
- [ ] Implementation approach is sound

**Iterate with Backend Engineer if needed.**

### 4.4 Implementation

The Backend Engineer will:
- Create backend code in `src/backend/` or `src/`
- Implement CrewAI agents (Researcher, Evaluator, Recommender)
- Create API endpoints
- Implement business logic
- Update `backend-plan.md` with status

**Key Implementation Notes:**
- Use CrewAI to create the Application Crew
- Follow the architecture defined in SAD
- Ensure agents can access required tools/APIs
- Implement proper error handling

### 4.5 Review Implementation

**Wearing your Technical Hat**, review:

- [ ] Application Crew agents are correctly implemented
- [ ] API endpoints match SAD specification
- [ ] Code follows best practices
- [ ] Error handling is comprehensive
- [ ] Environment variables are used correctly

### 4.6 Validate and Commit

```bash
git add project-context/2.build/backend-plan.md src/backend/ src/
git commit -m "feat: Add backend implementation

- Backend Engineer implemented Application Crew (CrewAI)
- API endpoints created
- Backend plan documented and updated"
```

### 4.7 Merge to Main

```bash
git checkout main
git merge feature/backend
git branch -d feature/backend
```

---

## Step 5: Integration Engineer - Wire Up Components

The Integration Engineer connects frontend, backend, and external services.

### 5.1 Create Integration Branch

```bash
git checkout -b feature/integration
```

### 5.2 Invoke Integration Engineer Persona

**Start a NEW chat session:**

```
@integration-engineer

I need you to integrate all components of the recruitment assistant. Please:

1. Review the PRD: project-context/1.define/prd.md
2. Review the SAD: project-context/2.build/sad.md
3. Review frontend plan: project-context/2.build/frontend-plan.md
4. Review backend plan: project-context/2.build/backend-plan.md
5. Create a plan document: project-context/2.build/integration-plan.md
   that outlines:
   - Frontend-Backend integration
   - API connection setup
   - External service integrations (if any)
   - Configuration needed
   - Testing approach
   - Status tracking
6. Wire up all components
7. Ensure end-to-end data flow works
8. Update integration-plan.md with progress
```

### 5.3 Review Integration Plan

Review the `integration-plan.md`:

- [ ] All integration points are identified
- [ ] Data flow is clear
- [ ] Configuration requirements are documented
- [ ] Testing approach is comprehensive

**Iterate with Integration Engineer if needed.**

### 5.4 Implementation

The Integration Engineer will:
- Connect frontend to backend API
- Configure API endpoints
- Set up data flow between components
- Test basic integration
- Update `integration-plan.md` with status

### 5.5 Review Integration

**Wearing your Technical Hat**, verify:

- [ ] Frontend can communicate with backend
- [ ] API endpoints are correctly integrated
- [ ] Data flows correctly end-to-end
- [ ] Error handling works across boundaries

### 5.6 Validate and Commit

```bash
git add project-context/2.build/integration-plan.md
git commit -m "feat: Integrate frontend and backend components

- Integration Engineer wired up all components
- End-to-end data flow verified
- Integration plan documented"
```

### 5.7 Merge to Main

```bash
git checkout main
git merge feature/integration
git branch -d feature/integration
```

---

## Step 6: QA Engineer - Test End-to-End

The QA Engineer ensures everything works correctly.

### 6.1 Create QA Branch

```bash
git checkout -b feature/qa
```

### 6.2 Invoke QA Engineer Persona

**Start a NEW chat session:**

```
@qa-engineer

I need you to test the recruitment assistant application. Please:

1. Review the PRD: project-context/1.define/prd.md
2. Review the SAD: project-context/2.build/sad.md
3. Review all implementation plans:
   - project-context/2.build/frontend-plan.md
   - project-context/2.build/backend-plan.md
   - project-context/2.build/integration-plan.md
4. Create a test plan document: project-context/2.build/qa-plan.md
   that outlines:
   - Test cases to execute
   - Test scenarios
   - Expected vs actual results
   - Issues found
   - Status tracking
5. Execute end-to-end tests
6. Test each Application Crew agent
7. Test API endpoints
8. Test frontend functionality
9. Document all test results
10. Update qa-plan.md with findings
```

### 6.3 Review Test Plan

Review the `qa-plan.md`:

- [ ] Test cases cover all PRD requirements
- [ ] Test scenarios are comprehensive
- [ ] Edge cases are included
- [ ] Test approach is systematic

**Iterate with QA Engineer if needed.**

### 6.4 Test Execution

The QA Engineer will:
- Execute test cases
- Document results
- Identify issues
- Update `qa-plan.md` with findings

### 6.5 Fix Issues

**If issues are found:**

1. Create a fix branch: `git checkout -b fix/issue-description`
2. Work with the appropriate engineer persona to fix
3. Re-test with QA Engineer
4. Commit fixes
5. Merge to main

### 6.6 Review Test Results

**Wearing your Technical Hat**, review:

- [ ] All critical tests pass
- [ ] Issues are documented
- [ ] Test coverage is adequate
- [ ] Application meets PRD requirements

### 6.7 Validate and Commit

```bash
git add project-context/2.build/qa-plan.md
git commit -m "feat: Add QA test results

- QA Engineer executed comprehensive tests
- Test results documented
- Application validated against PRD"
```

### 6.8 Merge to Main

```bash
git checkout main
git merge feature/qa
git branch -d feature/qa
```

---

## Step 7: Final Review and Documentation

### 7.1 Review All Artifacts

As an Agentic Architect, review all Build phase artifacts:

- [ ] `project-context/2.build/sad.md` - Architecture is sound
- [ ] `project-context/2.build/architecture-plan.md` - Status updated
- [ ] `project-context/2.build/frontend-plan.md` - Frontend complete
- [ ] `project-context/2.build/backend-plan.md` - Backend complete
- [ ] `project-context/2.build/integration-plan.md` - Integration complete
- [ ] `project-context/2.build/qa-plan.md` - Tests passed
- [ ] All code is committed and merged

### 7.2 Update Project README

Update your project README with:
- Current status (Build phase complete)
- How to run the application
- Environment setup instructions
- Architecture overview

### 7.3 Final Commit

```bash
git add README.md
git commit -m "docs: Update README with Build phase completion

- All Build phase artifacts complete
- Application ready for Deliver phase"
```

---

## Exercise Summary

Complete the Build phase by:

1. ✅ Configure environment variables (`.env` file)
2. ✅ System Architect: Create SAD and architecture plan
3. ✅ Frontend Engineer: Build UI and frontend plan
4. ✅ Backend Engineer: Implement Application Crew and backend plan
5. ✅ Integration Engineer: Wire components and integration plan
6. ✅ QA Engineer: Test everything and QA plan
7. ✅ Review all artifacts and update documentation

**Key Practices Applied:**
- Independent chat sessions for each persona
- Markdown plan documents for asynchronous work
- Git branches for incremental development
- Review and iteration at each step
- Technical hat for orchestration and quality gates

---

## Deliverables

By the end of this module, you should have:

1. ✅ `.env` file configured (not committed)
2. ✅ `.env.example` template (committed)
3. ✅ `project-context/2.build/sad.md` - Solution Architecture Document
4. ✅ `project-context/2.build/architecture-plan.md` - Architecture implementation plan
5. ✅ `project-context/2.build/frontend-plan.md` - Frontend implementation plan
6. ✅ `project-context/2.build/backend-plan.md` - Backend implementation plan
7. ✅ `project-context/2.build/integration-plan.md` - Integration plan
8. ✅ `project-context/2.build/qa-plan.md` - QA test results
9. ✅ Working frontend code
10. ✅ Working backend code with Application Crew
11. ✅ Integrated application
12. ✅ All code committed and merged to main
13. ✅ Updated README.md

---

## Check Your Understanding

1. **Why use independent chat sessions for each persona?**
   - What happens if you use the same chat session for all personas?

2. **Why create plan documents for each persona?**
   - How do plan documents enable asynchronous development?

3. **Why use git branches for each step?**
   - What are the benefits of incremental commits and merges?

4. **How does the Technical Hat help in the Build phase?**
   - What decisions do you make as an Agentic Architect that the personas don't?

5. **Why review and iterate with each persona?**
   - What's the difference between accepting their work vs. reviewing it?

---

## Troubleshooting

**Issue: Environment variables not loading**
- Solution: Ensure `.env` file is in project root
- Install `python-dotenv`: `pip install python-dotenv`
- Verify `.env` is in `.gitignore`

**Issue: Agent persona not following instructions**
- Solution: Be explicit in your prompts
- Reference specific files: "Review project-context/1.define/prd.md"
- Break down tasks into smaller steps

**Issue: Git merge conflicts**
- Solution: Resolve conflicts manually
- Use `git status` to see conflicted files
- Review changes carefully before committing

**Issue: Application Crew agents not working**
- Solution: Check CrewAI installation: `pip install crewai`
- Verify API keys are set correctly
- Review agent configuration in code

**Issue: Frontend can't connect to backend**
- Solution: Check API endpoint URLs
- Verify backend is running
- Check CORS settings if using web frontend

---

## Best Practices Applied

Throughout this module, you've applied key software development best practices:

1. **Single Responsibility Principle**: Each persona has one clear job
2. **Incremental Development**: Build in small, validated steps
3. **Context Isolation**: Independent chat sessions prevent context pollution
4. **Documentation**: All plans and decisions are documented
5. **Version Control**: Git branches enable safe experimentation
6. **Quality Gates**: Review and validation at each step
7. **Asynchronous Work**: Plan documents enable parallel development

---

## Next Steps

Once the Build phase is complete:

1. **Review all artifacts** - Ensure everything is documented
2. **Test the application** - Run it end-to-end
3. **Commit all work** - Ensure main branch is up to date
4. **Proceed to Module 07** - Deliver phase (deployment and operations)

Continue to [Module 07: Hands-On Mini-Project - Deliver Phase](./07-hands-on-mini-project-deliver.md)

---

## Additional Resources

- [CrewAI Documentation](https://docs.crewai.com/) - CrewAI framework guide
- [AAMAD Framework Repository](https://github.com/synaptic-ai-consulting/AAMAD) - Framework documentation
- [Git Branching Best Practices](https://www.atlassian.com/git/tutorials/comparing-workflows) - Git workflow guide
