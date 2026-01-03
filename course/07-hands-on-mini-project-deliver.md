---
layout: default
module_number: 7
title: Hands-On Mini-Project - Deliver Phase
---

# Module 07: Hands-On Mini-Project - Deliver Phase

**Estimated time:** ~30 minutes  
**Outcome:** Deploy, monitor, and operate your recruitment assistant application

---

## Learning Objectives

By the end of this module, you will be able to:
- Work with DevOps Engineer persona to create deployment configurations
- Simulate deployment for your mini-project (local run or Docker)
- Add basic monitoring and logging hooks
- Enable and configure CrewAI tracing for Application Crew observability
- View and analyze traces in the CrewAI AOP dashboard
- Create a comprehensive runbook for your application
- Run the application end-to-end and capture results
- Document lessons learned from the entire project
- Apply operational best practices as an Agentic Architect

---

## Prerequisites

- Completed Module 06 (Build phase with working code)
- Your `recruitment-assistant` project with all Build phase artifacts
- Python 3.8+ installed
- Git installed and configured
- Access to an AI coding assistant (CursorAI recommended)
- Docker installed (optional, for containerized deployment)

---

## Deliver Phase Overview

The Deliver phase ensures your application can run reliably, be monitored, and evolve over time. As an **Agentic Architect**, you'll wear your **Technical Hat** to orchestrate the DevOps Engineer, ensuring:

- **Deployment Readiness**: Application can be deployed and run
- **Operational Visibility**: Monitoring and logging are in place
- **Documentation**: Runbooks enable others to operate the system
- **Production Practices**: Security, error handling, and reliability considerations

**Key Activities:**
1. **Deployment Configuration** - Make the application deployable
2. **Monitoring & Logging** - Add observability hooks
3. **Runbook Creation** - Document operational procedures
4. **End-to-End Execution** - Run the application and capture results
5. **Lessons Learned** - Document insights from the project

---

## Step 1: DevOps Engineer - Create Deployment Plan

The DevOps Engineer will help you prepare your application for deployment.

### 1.1 Create Deployment Branch

```bash
git checkout -b feature/deployment
```

### 1.2 Invoke DevOps Engineer Persona

**Start a NEW chat session:**

```
@devops-engineer

I need you to help prepare the recruitment assistant for deployment. Please:

1. Review the PRD: project-context/1.define/prd.md
2. Review the SAD: project-context/2.build/sad.md
3. Review the Build phase artifacts in project-context/2.build/
4. Create a deployment plan document: project-context/3.deliver/deployment-plan.md
   that outlines:
   - Deployment approach (local, Docker, or cloud)
   - Required dependencies and environment setup
   - Configuration requirements
   - Deployment steps
   - Rollback procedures
   - Status tracking
5. Create deployment configurations (Dockerfile, docker-compose.yml, or startup scripts)
6. Update deployment-plan.md with progress
```

### 1.3 Review Deployment Plan

**Wearing your Technical Hat**, review the deployment plan:

- [ ] Deployment approach is appropriate for a mini-project
- [ ] All dependencies are identified
- [ ] Environment configuration is clear
- [ ] Deployment steps are documented
- [ ] Rollback procedures are considered

**Iterate with DevOps Engineer if needed.**

### 1.4 Implementation

The DevOps Engineer will create:
- Deployment configuration files (Dockerfile, docker-compose.yml, or startup scripts)
- Environment setup documentation
- Deployment instructions

**Common Deployment Options for Mini-Project:**

1. **Local Python Script** (Simplest)
   - Create a `main.py` or `run.py` entry point
   - Add requirements.txt with all dependencies
   - Document how to run: `python main.py`

2. **Docker Container** (Recommended for learning)
   - Create `Dockerfile`
   - Create `docker-compose.yml` (if needed)
   - Document: `docker build -t recruitment-assistant . && docker run recruitment-assistant`

3. **CLI Entry Point** (Good for testing)
   - Create a command-line interface
   - Use `click` or `argparse` for CLI
   - Document usage examples

### 1.5 Review Implementation

**Wearing your Technical Hat**, verify:

- [ ] Deployment configuration is correct
- [ ] All dependencies are included
- [ ] Environment variables are properly configured
- [ ] Instructions are clear and complete

### 1.6 Validate and Commit

```bash
git add project-context/3.deliver/deployment-plan.md Dockerfile docker-compose.yml requirements.txt main.py
git commit -m "feat: Add deployment configuration

- DevOps Engineer created deployment plan
- Deployment configurations added
- Ready for deployment simulation"
```

### 1.7 Merge to Main

```bash
git checkout main
git merge feature/deployment
git branch -d feature/deployment
```

---

## Step 2: Add Monitoring and Logging

Add basic observability to your application.

### 2.1 Create Monitoring Branch

```bash
git checkout -b feature/monitoring
```

### 2.2 Invoke DevOps Engineer Persona

**Continue with DevOps Engineer:**

```
@devops-engineer

I need you to add monitoring and logging to the recruitment assistant. Please:

1. Review the deployment plan: project-context/3.deliver/deployment-plan.md
2. Add basic logging to the application:
   - Log application startup
   - Log agent execution (when Application Crew runs)
   - Log API requests/responses
   - Log errors and exceptions
3. Enable CrewAI tracing for the Application Crew:
   - Set up CrewAI AOP account authentication
   - Enable tracing in the CrewAI Crew configuration
   - Document how to view traces in the CrewAI dashboard
4. Create a monitoring plan document: project-context/3.deliver/monitoring-plan.md
   that outlines:
   - What to monitor (agent execution, API calls, errors)
   - Log levels and formats
   - Where logs are stored
   - How to view logs
   - CrewAI tracing setup and access
   - Status tracking
5. Implement logging in the application code
6. Update monitoring-plan.md with implementation details
```

### 2.3 Review Monitoring Plan

Review the monitoring plan:

- [ ] Key events are logged (startup, agent execution, errors)
- [ ] Log format is consistent and readable
- [ ] Log storage location is appropriate
- [ ] Log viewing instructions are clear

**Iterate with DevOps Engineer if needed.**

### 2.4 Implementation

The DevOps Engineer will:
- Add logging statements to application code
- Configure log levels (INFO, WARNING, ERROR)
- Set up log file output or console logging
- Enable CrewAI tracing for Application Crew
- Document logging and tracing configuration

**Example Logging Setup:**

```python
import logging
from datetime import datetime

# Configure logging
logging.basicConfig(
    level=logging.INFO,
    format='%(asctime)s - %(name)s - %(levelname)s - %(message)s',
    handlers=[
        logging.FileHandler('logs/app.log'),
        logging.StreamHandler()
    ]
)

logger = logging.getLogger(__name__)

# Use in application
logger.info("Application started")
logger.info("Researcher agent executing...")
logger.error("Error occurred: %s", error_message)
```

### 2.5 Enable CrewAI Tracing

CrewAI provides built-in tracing capabilities that give you comprehensive observability into your Application Crew's execution. This is essential for monitoring agent decisions, task execution, and LLM calls.

#### 2.5.1 Set Up CrewAI AOP Account

1. **Create a CrewAI AOP Account:**
   - Visit [app.crewai.com](https://app.crewai.com) and sign up for a free account
   - This gives you access to the CrewAI AOP platform where you can view traces

2. **Install CrewAI CLI Tools:**
   ```bash
   pip install "crewai[tools]"
   ```

3. **Authenticate with CrewAI AOP:**
   ```bash
   crewai login
   ```
   
   This command will:
   - Open your browser to the authentication page
   - Prompt you to enter a device code
   - Authenticate your local environment with your CrewAI AOP account
   - Enable tracing capabilities for your local development

#### 2.5.2 Enable Tracing in Your Application Crew

Update your CrewAI Crew configuration to enable tracing:

**Option 1: Enable Tracing in Crew Configuration**

```python
from crewai import Agent, Crew, Process, Task

# Your existing agents
researcher = Agent(...)
evaluator = Agent(...)
recommender = Agent(...)

# Your existing tasks
research_task = Task(...)
evaluation_task = Task(...)
recommendation_task = Task(...)

# Enable tracing in your crew
crew = Crew(
    agents=[researcher, evaluator, recommender],
    tasks=[research_task, evaluation_task, recommendation_task],
    process=Process.sequential,
    tracing=True,  # Enable built-in tracing
    verbose=True
)

# Execute your crew - traces will be automatically sent to CrewAI AOP
result = crew.kickoff()
```

**Option 2: Enable Tracing via Environment Variable**

Add to your `.env` file:

```bash
CREWAI_TRACING_ENABLED=true
```

When this environment variable is set, all Crews will automatically have tracing enabled, even without explicitly setting `tracing=True`.

#### 2.5.3 View Traces in CrewAI AOP Dashboard

After running your Application Crew:

1. **Access the Dashboard:**
   - Visit [app.crewai.com](https://app.crewai.com) and log in
   - Navigate to your project dashboard
   - Click on the **Traces** tab to view execution details

2. **What You'll See in Traces:**
   - **Agent Decisions**: See how agents reason through tasks and make decisions
   - **Task Execution Timeline**: Visual representation of task sequences and dependencies
   - **Tool Usage**: Monitor which tools are called and their results
   - **LLM Calls**: Track all language model interactions, including prompts and responses
   - **Performance Metrics**: Execution times, token usage, and costs
   - **Error Tracking**: Detailed error information and stack traces

3. **Trace Features:**
   - **Execution Timeline**: Click through different stages of execution
   - **Detailed Logs**: Access comprehensive logs for debugging
   - **Performance Analytics**: Analyze execution patterns and optimize performance
   - **Export Capabilities**: Download traces for further analysis

#### 2.5.4 Document CrewAI Tracing Setup

The DevOps Engineer should document the tracing setup in `monitoring-plan.md`:

```markdown
## CrewAI Tracing

### Setup
- CrewAI AOP account: [Your account URL]
- Authentication: `crewai login` completed
- Tracing enabled: `tracing=True` in Crew configuration

### Accessing Traces
1. Visit app.crewai.com
2. Navigate to Traces tab
3. View execution details for each crew run

### What to Monitor
- Agent decision-making process
- Task execution timeline
- Tool usage and results
- LLM call performance
- Error occurrences
```

**Reference:** [CrewAI Tracing Documentation](https://docs.crewai.com/en/observability/tracing)

### 2.6 Review Implementation

**Wearing your Technical Hat**, verify:

- [ ] Logging is implemented consistently
- [ ] Log levels are appropriate
- [ ] Logs are useful for debugging
- [ ] Error logging captures sufficient context
- [ ] CrewAI tracing is enabled and configured
- [ ] CrewAI AOP account is set up and authenticated
- [ ] Tracing documentation is complete

### 2.7 Validate and Commit

```bash
git add project-context/3.deliver/monitoring-plan.md src/ logs/
git commit -m "feat: Add monitoring and logging

- DevOps Engineer added logging infrastructure
- Application events are now logged
- Monitoring plan documented"
```

### 2.8 Merge to Main

```bash
git checkout main
git merge feature/monitoring
git branch -d feature/monitoring
```

---

## Step 3: Create Runbook

A runbook is an operational guide that enables others to run and maintain your application.

### 3.1 Create Runbook Branch

```bash
git checkout -b feature/runbook
```

### 3.2 Invoke DevOps Engineer Persona

**Continue with DevOps Engineer:**

```
@devops-engineer

I need you to create a comprehensive runbook for the recruitment assistant. Please:

1. Review all project artifacts:
   - PRD: project-context/1.define/prd.md
   - SAD: project-context/2.build/sad.md
   - Deployment plan: project-context/3.deliver/deployment-plan.md
   - Monitoring plan: project-context/3.deliver/monitoring-plan.md
2. Use the runbook template: .cursor/templates/runbook-template.md
3. Create a comprehensive runbook: project-context/3.deliver/runbook.md
   that includes:
   - Application overview
   - Prerequisites and dependencies
   - Installation instructions
   - Configuration (environment variables)
   - How to run the application
   - How to monitor and view logs
   - Common issues and troubleshooting
   - How to stop/restart the application
   - Health checks
4. Make it clear and actionable for someone who hasn't worked on the project
```

### 3.3 Review Runbook

**Wearing your Technical Hat**, review the runbook:

- [ ] Overview is clear and concise
- [ ] Prerequisites are complete
- [ ] Installation steps are accurate
- [ ] Configuration is well-documented
- [ ] Run instructions are clear
- [ ] Troubleshooting covers common issues
- [ ] Someone new to the project could follow it

**Iterate with DevOps Engineer if needed.**

### 3.4 Validate and Commit

```bash
git add project-context/3.deliver/runbook.md
git commit -m "feat: Add operational runbook

- DevOps Engineer created comprehensive runbook
- All operational procedures documented
- Application is now fully documented for operations"
```

### 3.5 Merge to Main

```bash
git checkout main
git merge feature/runbook
git branch -d feature/runbook
```

---

## Step 4: End-to-End Execution

Run your application end-to-end and capture the results.

### 4.1 Prepare for Execution

1. **Ensure environment is set up:**
   ```bash
   # Install dependencies
   pip install -r requirements.txt
   
   # Verify .env file is configured
   cat .env | grep OPENAI_API_KEY
   ```

2. **Review the runbook:**
   ```bash
   cat project-context/3.deliver/runbook.md
   ```

### 4.2 Run the Application

Follow the runbook instructions to start your application:

**Option 1: Local Python Script**
```bash
python main.py
```

**Option 2: Docker**
```bash
docker build -t recruitment-assistant .
docker run --env-file .env recruitment-assistant
```

**Option 3: CLI Entry Point**
```bash
python -m src.cli --job-description "Python Developer" --requirements "5 years experience"
```

### 4.3 Test the Application

1. **Execute a test scenario:**
   - Provide a job description
   - Let the Application Crew (Researcher, Evaluator, Recommender) execute
   - Capture the output

2. **Monitor the execution:**
   - Watch console logs
   - Check log files if configured
   - Observe agent interactions

3. **Verify results:**
   - Check that agents executed correctly
   - Verify output format
   - Confirm recommendations are generated

### 4.4 Capture Execution Results

Create an execution log document:

```bash
git checkout -b feature/execution-results
```

Create `project-context/3.deliver/execution-results.md`:

```markdown
# Execution Results

## Test Run: [Date]

### Input
- Job Description: [Your test job description]
- Requirements: [Key requirements]

### Execution
- Start Time: [timestamp]
- End Time: [timestamp]
- Duration: [duration]

### Application Crew Execution
- Researcher Agent: [Status and findings]
- Evaluator Agent: [Status and findings]
- Recommender Agent: [Status and recommendations]

### Output
[Capture the actual output/recommendations]

### Logs
[Key log entries or attach log file]

### Issues Encountered
[Any errors or unexpected behavior]

### Observations
[What worked well, what didn't]
```

### 4.5 Commit Execution Results

```bash
git add project-context/3.deliver/execution-results.md
git commit -m "docs: Add execution results

- End-to-end test execution completed
- Application Crew executed successfully
- Results documented"
```

### 4.6 Merge to Main

```bash
git checkout main
git merge feature/execution-results
git branch -d feature/execution-results
```

---

## Step 5: Document Lessons Learned

Reflect on the entire project and document insights.

### 5.1 Create Lessons Learned Document

Create `LESSONS.md` in your project root:

```bash
git checkout -b feature/lessons-learned
```

### 5.2 Reflect on the Project

**As an Agentic Architect**, reflect on:

1. **Define Phase:**
   - What worked well in the Define phase?
   - What would you do differently?
   - How did the Product Manager persona help?

2. **Build Phase:**
   - How did working with multiple personas go?
   - What challenges did you face?
   - How did the plan documents help?
   - What would you improve?

3. **Deliver Phase:**
   - What deployment challenges did you encounter?
   - How useful was the runbook?
   - What monitoring/logging would you add?

4. **AAMAD Framework:**
   - How did AAMAD help structure your work?
   - What framework features were most valuable?
   - What would you change about the framework?

5. **Agentic Architect Role:**
   - How did you balance the three hats (Tech, Experience, Business)?
   - What decisions did you make that personas couldn't?
   - How did orchestration work?

### 5.3 Document Lessons Learned

Create `LESSONS.md`:

```markdown
# Lessons Learned

## Project: Recruitment Assistant

### What Went Well
- [List successes]

### Challenges Encountered
- [List challenges and how you overcame them]

### Key Insights

#### Define Phase
[Your insights]

#### Build Phase
[Your insights]

#### Deliver Phase
[Your insights]

### AAMAD Framework Observations
[What you learned about the framework]

### Agentic Architect Reflections
[What you learned about the role]

### Recommendations for Future Projects
[What you'd do differently next time]

### Skills Developed
[What skills did you develop or improve?]
```

### 5.4 Commit Lessons Learned

```bash
git add LESSONS.md
git commit -m "docs: Add lessons learned

- Document insights from entire project
- Reflect on AAMAD framework experience
- Capture recommendations for future projects"
```

### 5.5 Merge to Main

```bash
git checkout main
git merge feature/lessons-learned
git branch -d feature/lessons-learned
```

---

## Step 6: Final Review and Documentation

### 6.1 Review All Deliver Phase Artifacts

As an Agentic Architect, review all Deliver phase artifacts:

- [ ] `project-context/3.deliver/deployment-plan.md` - Deployment approach documented
- [ ] `project-context/3.deliver/monitoring-plan.md` - Monitoring strategy documented
- [ ] `project-context/3.deliver/runbook.md` - Operational guide complete
- [ ] `project-context/3.deliver/execution-results.md` - Test execution documented
- [ ] `LESSONS.md` - Lessons learned captured
- [ ] Deployment configurations committed
- [ ] Logging implemented
- [ ] Application runs end-to-end successfully

### 6.2 Update Project README

Update your project README with:
- Current status (Deliver phase complete)
- Quick start instructions (link to runbook)
- Project structure overview
- Links to all key artifacts
- Lessons learned summary

### 6.3 Create Release Notes

Create `project-context/3.deliver/release-notes.md`:

```markdown
# Release Notes

## Version 1.0.0 - Initial Release

### Features
- [List key features from PRD]

### Deployment
- [Deployment method used]
- [How to deploy]

### Known Issues
- [Any known issues]

### Next Steps
- [Future improvements]
```

### 6.4 Final Commit

```bash
git add README.md project-context/3.deliver/release-notes.md
git commit -m "docs: Complete Deliver phase documentation

- All Deliver phase artifacts complete
- README updated with project status
- Release notes created
- Project ready for production use"
```

---

## Exercise Summary

Complete the Deliver phase by:

1. ✅ DevOps Engineer: Create deployment plan and configurations
2. ✅ Add monitoring and logging to application
3. ✅ Create comprehensive runbook
4. ✅ Run application end-to-end and capture results
5. ✅ Document lessons learned
6. ✅ Update project documentation
7. ✅ Create release notes

**Key Practices Applied:**
- Independent chat session with DevOps Engineer
- Incremental development with git branches
- Review and iteration at each step
- Technical hat for orchestration and quality gates
- Operational best practices

---

## Deliverables

By the end of this module, you should have:

1. ✅ `project-context/3.deliver/deployment-plan.md` - Deployment strategy
2. ✅ `project-context/3.deliver/monitoring-plan.md` - Monitoring strategy (includes CrewAI tracing)
3. ✅ `project-context/3.deliver/runbook.md` - Operational guide
4. ✅ `project-context/3.deliver/execution-results.md` - Test execution results
5. ✅ `project-context/3.deliver/release-notes.md` - Release documentation
6. ✅ `LESSONS.md` - Lessons learned document
7. ✅ Deployment configurations (Dockerfile, docker-compose.yml, or scripts)
8. ✅ Logging implemented in application
9. ✅ CrewAI tracing enabled and configured
10. ✅ CrewAI AOP account set up and authenticated
11. ✅ Application runs end-to-end successfully
12. ✅ Updated README.md with project status
13. ✅ All code and documentation committed and merged to main

---

## Check Your Understanding

1. **Why is the Deliver phase important?**
   - What happens if you skip deployment and operational documentation?

2. **What's the purpose of a runbook?**
   - How does it enable others to operate your application?

3. **Why add monitoring and logging?**
   - What problems does observability solve?

4. **How does the Technical Hat help in the Deliver phase?**
   - What operational decisions do you make as an Agentic Architect?

5. **Why document lessons learned?**
   - How does reflection improve future projects?

---

## Troubleshooting

**Issue: Application won't start**
- Solution: Check environment variables are set
- Verify all dependencies are installed
- Review runbook for correct startup procedure

**Issue: Docker build fails**
- Solution: Check Dockerfile syntax
- Verify all files are in correct locations
- Check .dockerignore if files are missing

**Issue: Logs not appearing**
- Solution: Verify logging configuration
- Check log file permissions
- Ensure log directory exists

**Issue: CrewAI traces not appearing in dashboard**
- Solution: Ensure you're authenticated: `crewai login`
- Verify `tracing=True` is set in Crew configuration
- Check `CREWAI_TRACING_ENABLED=true` if using environment variable
- Confirm your crew/flow is actually executing
- Check your internet connection
- Verify your account at app.crewai.com

**Issue: Application Crew agents not executing**
- Solution: Check API keys in .env
- Verify CrewAI installation
- Review agent configuration in code

**Issue: Can't follow runbook**
- Solution: Test runbook yourself
- Update unclear sections
- Add more examples if needed

---

## Best Practices Applied

Throughout this module, you've applied key operational best practices:

1. **Deployment Automation**: Configuration files enable repeatable deployments
2. **Observability**: Logging provides visibility into application behavior
3. **Documentation**: Runbook enables operational independence
4. **Testing**: End-to-end execution validates the system works
5. **Reflection**: Lessons learned improve future work
6. **Version Control**: All operational artifacts are versioned

---

## Next Steps

Once the Deliver phase is complete:

1. **Review all artifacts** - Ensure everything is documented
2. **Share your project** - Show others what you built
3. **Apply learnings** - Use insights in future projects
4. **Proceed to Module 08** - Reflect on value and next steps

Continue to [Module 08: Value and Next Steps](./08-value-and-next-steps.md)

---

## Additional Resources

- [Docker Documentation](https://docs.docker.com/) - Container deployment guide
- [Python Logging Guide](https://docs.python.org/3/library/logging.html) - Logging best practices
- [CrewAI Tracing Documentation](https://docs.crewai.com/en/observability/tracing) - CrewAI built-in tracing guide
- [AAMAD Framework Repository](https://github.com/synaptic-ai-consulting/AAMAD) - Framework documentation
