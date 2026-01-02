# Module 02: AAMAD Overview

**Estimated time:** ~15 minutes  
**Outcome:** Can explain AAMAD's three phases and the idea of Development Crew vs Application Crew

---

## Learning Objectives

By the end of this module, you will be able to:
- Explain the Define–Build–Deliver phases of AAMAD
- Distinguish between Development Crew and Application Crew
- Identify key artifacts produced in each phase

---

## Content

### What is AAMAD?

**AAMAD** (AI-Assisted Multi-Agent Application Development) is an open, production-grade framework for building, deploying, and evolving multi-agent applications using best context engineering practices. It systematizes research-driven planning, modular AI agent workflows, and rapid MVP/devops pipelines for enterprise-ready AI solutions.

Think of AAMAD as a **methodology and toolkit** that helps you:
- Launch projects with autonomous or collaborative AI agents
- Rapidly prototype MVPs with clear context boundaries
- Use production-ready architecture/design patterns
- Accelerate delivery, reduce manual overhead, and enable continuous iteration

AAMAD is built on the principle that **context engineering** (not model tweaking) is the core lever for building reliable, maintainable agentic systems.

### The Three Phases: Define → Build → Deliver

AAMAD organizes work into three sequential phases, each with clear artifacts, personas, and rules to keep development auditable and reusable:

```
┌─────────┐      ┌─────────┐      ┌─────────┐
│ DEFINE  │ ───> │  BUILD  │ ───> │ DELIVER │
└─────────┘      └─────────┘      └─────────┘
   Context          Execution      Operations
   Setup            & Code         & Deploy
```

#### Phase 1: Define

**Goal:** Establish a solid foundation with clear research, requirements, and project scope.

**Persona:** Product Manager (`@product-mgr`)

**Key Activities:**
- Conduct prompt-driven discovery and context setup
- Generate Market Research Document (MRD)
- Generate Product Requirements Document (PRD)
- Create comprehensive context handoff artifacts for technical teams
- Validate completeness of market analysis, user personas, feature requirements, and success metrics

**Key Artifacts:**
- `mrd.md` - Market Research Document
- `prd.md` - Product Requirements Document
- Context summary documents

**Output Location:** `project-context/1.define/`

**Why This Matters:** Without clear definition, AI agents lack the context needed to make good decisions. The Define phase ensures everyone (human and AI) understands what we're building and why.

#### Phase 2: Build

**Goal:** Execute multi-agent development to produce working code, architecture, and integration.

**Personas:** Multiple specialized agents working in sequence:
- **Project Manager** - Coordinates the build process
- **System Architect** - Designs solution architecture
- **Frontend Engineer** - Builds UI components
- **Backend Engineer** - Implements backend logic
- **Integration Engineer** - Wires up components and APIs
- **QA Engineer** - Tests end-to-end functionality

**Key Activities:**
- Generate Solution Architecture Document (SAD)
- Scaffold environment and install dependencies
- Build frontend UI and placeholders
- Implement backend services
- Wire up integrations and chat flows
- Conduct quality assurance testing

**Key Artifacts:**
- `sad.md` - Solution Architecture Document
- `setup.md` - Environment setup documentation
- `frontend.md` - Frontend implementation notes
- `backend.md` - Backend implementation notes
- `integration.md` - Integration documentation
- `qa.md` - Quality assurance test results
- Source code and configuration files

**Output Location:** `project-context/2.build/`

**Why This Matters:** The Build phase transforms requirements into working software through coordinated multi-agent execution. Each agent persona has a single responsibility, ensuring quality and maintainability.

#### Phase 3: Deliver

**Goal:** Deploy, monitor, and operate the application in production.

**Persona:** DevOps Engineer

**Key Activities:**
- Configure deployment pipelines
- Set up hosting environments
- Implement access control and security
- Create runbooks and operational documentation
- Establish monitoring and logging
- Plan for continuous deployment

**Key Artifacts:**
- Deployment configurations
- Runbooks (operational guides)
- Release notes
- Monitoring setup
- Access control policies
- QA logs and production readiness reports

**Output Location:** `project-context/3.deliver/`

**Why This Matters:** Building software is only half the battle. The Deliver phase ensures your application can run reliably in production, be monitored, and evolve over time.

### Development Crew vs Application Crew

This is a **critical distinction** in AAMAD:

#### Development Crew (The Builders)

The **Development Crew** consists of AI agent personas that **build your application**. These are the "construction workers" who create the software:

- **Product Manager** - Defines what to build
- **System Architect** - Designs how to build it
- **Frontend Engineer** - Builds user interfaces
- **Backend Engineer** - Implements business logic
- **Integration Engineer** - Connects components
- **QA Engineer** - Ensures quality
- **DevOps Engineer** - Deploys and operates

These agents are **temporary**—they exist during development to create your application. Once the project is complete, they're done.

**Example:** When building a customer service chatbot, the Development Crew includes agents like "Frontend Engineer" (who builds the chat UI) and "Backend Engineer" (who implements the conversation logic).

#### Application Crew (The Application Itself)

The **Application Crew** consists of AI agents that **are your application**. These are the agents that end users interact with in production:

- **Customer Service Agent** - Handles customer inquiries
- **Document Analyzer** - Processes and extracts information from documents
- **Recommendation Engine** - Suggests products or actions
- **Workflow Orchestrator** - Coordinates multi-step processes

These agents are **permanent**—they run in production and deliver value to end users.

**Example:** In a customer service chatbot application, the Application Crew might include:
- A "Support Agent" that answers questions
- A "Escalation Agent" that handles complex issues
- A "Feedback Collector" that gathers user satisfaction

### Visualizing the Distinction

```
┌─────────────────────────────────────────────────┐
│         DEVELOPMENT CREW (Temporary)            │
│  ┌──────────┐  ┌──────────┐  ┌──────────┐     │
│  │ Product  │  │ System   │  │ Frontend │     │
│  │ Manager  │  │Architect │  │ Engineer │     │
│  └──────────┘  └──────────┘  └──────────┘     │
│                                                │
│  These agents BUILD your application           │
└─────────────────────────────────────────────────┘
                    │
                    │ Creates
                    ▼
┌─────────────────────────────────────────────────┐
│        APPLICATION CREW (Permanent)             │
│  ┌──────────┐  ┌──────────┐  ┌──────────┐     │
│  │ Support  │  │Document  │  │Workflow  │     │
│  │  Agent   │  │Analyzer  │  │Orchestr. │     │
│  └──────────┘  └──────────┘  └──────────┘     │
│                                                │
│  These agents ARE your application             │
└─────────────────────────────────────────────────┘
```

### Core AAMAD Concepts

#### 1. Persona-Driven Development

Each workflow is owned and documented by a clear AI agent persona with a single responsibility principle. This ensures:
- Clear accountability
- Specialized expertise
- Maintainable code
- Auditable decisions

#### 2. Context Artifacts

All major actions, decisions, and documentation are stored as markdown artifacts, ensuring:
- **Explainability** - You can always understand why decisions were made
- **Reproducibility** - You can recreate the development process
- **Traceability** - You can track how requirements became code

#### 3. Parallelizable Epics

Big tasks are broken into epics, making development:
- Faster through parallel execution
- More autonomous while retaining quality control
- Easier to manage and review

#### 4. Reusability

The framework is reusable for any project. Framework artifacts (in `.cursor/`) are project-agnostic, while `project-context/` contains instance-specific documentation.

### AAMAD Repository Structure

When you use AAMAD, your project structure looks like this:

```
your-project/
├─ .cursor/                    # Reusable framework artifacts
│ ├─ agents/                   # Agent persona definitions
│ ├─ prompts/                  # Parameterized agent prompts
│ ├─ rules/                    # Architecture & workflow rules
│ └─ templates/               # Generation templates (MRD, PRD, SAD)
│
├─ project-context/            # Project-specific artifacts
│ ├─ 1.define/                 # MRD, PRD, research reports
│ ├─ 2.build/                  # SAD, code, setup docs
│ └─ 3.deliver/                # Deploy configs, runbooks, QA logs
│
└─ src/                        # Your application source code
```

**Framework artifacts** (`.cursor/`) are reusable across projects.  
**Project-context** contains all generated and instance-specific documentation.

### Why AAMAD Works

AAMAD addresses common problems in AI-assisted development:

1. **Context Chaos** - Without structure, AI agents lack context. AAMAD provides clear context boundaries.

2. **Quality Debt** - Rapid AI coding often produces "slop." AAMAD's persona-driven approach ensures quality.

3. **Maintenance Nightmares** - Unstructured AI-generated code is hard to maintain. AAMAD's artifact-driven approach ensures traceability.

4. **Lack of Reusability** - Each project starts from scratch. AAMAD's framework artifacts are reusable.

5. **No Clear Process** - Teams don't know how to systematically build agentic systems. AAMAD provides a proven methodology.

### Getting Started with AAMAD

AAMAD can be used in two ways:

1. **Clone the Repository**
   ```bash
   git clone https://github.com/synaptic-ai-consulting/AAMAD
   ```

2. **Install via pip/uv**
   ```bash
   pip install aamad
   aamad init --dest /path/to/your/project
   ```

Once set up, you follow the three-phase process, using the Development Crew to build your Application Crew.

---

## Check Your Understanding

Reflect on these questions to solidify your understanding:

1. **Phase Identification**: For each scenario, identify which AAMAD phase it belongs to:
   - Writing a Product Requirements Document
   - Deploying an application to production
   - Writing unit tests for a feature
   - Creating a runbook for operations
   - Designing the system architecture

2. **Crew Distinction**: Imagine you're building a document processing system. 
   - What would be in your **Application Crew**? (What agents will users interact with?)
   - What would be in your **Development Crew**? (What agents will build the system?)

3. **Artifact Traceability**: Why is it important that AAMAD stores all decisions as markdown artifacts? How does this help with maintenance and debugging?

4. **Persona Benefits**: How does the persona-driven approach (single responsibility per agent) help prevent the "slop" problem in AI-assisted development?

5. **Phase Dependencies**: Why must the phases run in order (Define → Build → Deliver)? What would happen if you tried to Build without Define, or Deliver without Build?

---

## Next Steps

Continue to [Module 03: Context Engineering Basics](./03-context-engineering-basics.md)

