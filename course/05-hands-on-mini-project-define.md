# Module 05: Hands-On Mini-Project - Define Phase

**Estimated time:** ~30 minutes  
**Outcome:** Complete an AAMAD "Define" phase for a recruitment assistant application crew

---

## Learning Objectives

By the end of this module, you will be able to:
- Set up a new project with the AAMAD framework
- Initialize AAMAD in a project directory
- Invoke the Product Manager agent persona to generate project artifacts
- Create a Market Research Document (MRD) and Product Requirements Document (PRD)
- Review PRD from the Agentic Architect perspective (Experience and Business hats)
- Generate project README.md based on PRD
- Identify application crew agents and development crew personas for your use case

---

## Project Scenario

For this hands-on exercise, we'll build a **Recruitment Assistant**—an automated candidate sourcing and evaluation system. This use case is based on the [CrewAI Recruitment Example](https://github.com/crewAIInc/crewAI-examples/tree/main/crews/recruitment), which demonstrates how to build a multi-agent system that:

- **Searches for candidates** based on job requirements
- **Evaluates candidates** against job criteria
- **Provides recommendations** to recruiters

This is a perfect example for learning AAMAD because it:
- Has clear, well-defined agents (Researcher, Evaluator, Recommender)
- Demonstrates agent collaboration patterns
- Shows how to structure a real-world multi-agent application
- Provides a reference implementation you can study

**Your Goal:** Use AAMAD's Define phase to create comprehensive MRD and PRD documents that will guide the development of this recruitment assistant.

---

## Prerequisites

Before starting, ensure you have:
- Python 3.8+ installed
- Git installed
- A code editor with AI assistance (Cursor recommended, but any editor works)
- Access to an AI coding assistant (CursorAI, GitHub Copilot, or similar)

---

## Step-by-Step Instructions

### Step 1: Create Your Project Folder

1. Open your terminal and navigate to where you want to create your project:

   ```bash
   cd ~/projects  # or wherever you keep your projects
   ```

2. Create a new directory for your recruitment project:

   ```bash
   mkdir recruitment-assistant
   cd recruitment-assistant
   ```

3. Initialize a Git repository:

   ```bash
   git init
   ```

   This creates a local Git repository to track your project artifacts.

### Step 2: Install AAMAD

Install the AAMAD framework using pip:

```bash
pip install aamad
```

This installs the AAMAD framework and all its dependencies, including:
- Framework templates (MRD, PRD, SAD, runbook templates)
- Agent persona definitions
- Cursor rules for AI-assisted development
- Project structure templates

### Step 3: Initialize AAMAD in Your Project

Initialize the AAMAD framework structure in your project:

```bash
aamad init --dest .
```

**What this does:**
- Creates the `.cursor/` directory with framework artifacts:
  - `agents/` - Agent persona definitions (Product Manager, System Architect, etc.)
  - `templates/` - Document templates (MRD, PRD, SAD, runbook)
  - `rules/` - Cursor rules for guiding AI agent behavior
  - `prompts/` - Parameterized prompts for agent interactions
- Creates the `project-context/` directory structure:
  - `1.define/` - For MRD and PRD artifacts
  - `2.build/` - For SAD and code artifacts
  - `3.deliver/` - For deployment and runbook artifacts
- Sets up the initial project structure

**Note:** The templates in `.cursor/templates/` come from the AAMAD library and are the official framework templates. These are different from the templates in this course repository—you'll use the AAMAD library templates for your actual project.

### Step 4: Review the Project Structure

After initialization, your project should look like this:

```
recruitment-assistant/
├── .cursor/
│   ├── agents/
│   │   └── product-mgr.md          # Product Manager persona
│   ├── templates/
│   │   ├── mrd-template.md         # MRD template
│   │   ├── prd-template.md        # PRD template
│   │   ├── sad-template.md        # SAD template
│   │   └── runbook-template.md    # Runbook template
│   ├── rules/
│   │   ├── core/
│   │   ├── development-workflow/
│   │   └── adapter-crewai/
│   └── prompts/
├── project-context/
│   ├── 1.define/                   # Define phase artifacts go here
│   ├── 2.build/                    # Build phase artifacts go here
│   └── 3.deliver/                  # Deliver phase artifacts go here
└── .git/
```

### Step 5: Review the CrewAI Recruitment Example

Before creating your MRD and PRD, familiarize yourself with the reference implementation:

1. Visit the [CrewAI Recruitment Example](https://github.com/crewAIInc/crewAI-examples/tree/main/crews/recruitment)
2. Review the example to understand:
   - What agents are used (Researcher, Evaluator, Recommender)
   - What tasks each agent performs
   - How agents collaborate
   - What the end-to-end workflow looks like

**Key Insights from the Example:**
- **Researcher Agent**: Searches for candidates based on job requirements
- **Evaluator Agent**: Assesses candidates against job criteria
- **Recommender Agent**: Provides ranked recommendations to recruiters

This understanding will help you create more accurate MRD and PRD documents.

### Step 6: Invoke the Product Manager Persona

Now you'll use the Product Manager agent persona to generate your MRD and PRD. The Product Manager persona is defined in `.cursor/agents/product-mgr.md` and contains prompts and guidelines for creating these documents.

**Option A: Using CursorAI (Recommended)**

1. Open your project in Cursor
2. Start a new chat session
3. Reference the Product Manager persona:

   ```
   @product-mgr I need to create an MRD and PRD for a recruitment assistant application. 
   The use case is based on the CrewAI recruitment example. 
   Please help me create comprehensive MRD and PRD documents.
   ```

4. The agent will guide you through the process, using the templates from `.cursor/templates/`

**Option B: Using Any AI Coding Assistant**

1. Open the Product Manager persona file: `.cursor/agents/product-mgr.md`
2. Review the prompts and instructions
3. Open the MRD template: `.cursor/templates/mrd-template.md`
4. Use your AI assistant to help fill out the template based on:
   - The recruitment assistant use case
   - Insights from the CrewAI example
   - Your understanding of the problem domain

### Step 7: Generate the Market Research Document (MRD)

Work with the Product Manager persona to create your MRD. The MRD should cover:

1. **Problem Statement**
   - What problem does the recruitment assistant solve?
   - Why is manual candidate sourcing and evaluation inefficient?

2. **Target Users**
   - Recruiters who need to find and evaluate candidates
   - Hiring managers who need candidate recommendations
   - HR teams managing high-volume recruitment

3. **Market Opportunity**
   - Time savings in candidate sourcing
   - Improved candidate matching accuracy
   - Scalability for high-volume recruitment

4. **Competitive Landscape**
   - Existing ATS (Applicant Tracking Systems)
   - Manual recruitment processes
   - How an AI-powered multi-agent system differs

**Save your MRD as:** `project-context/1.define/mrd.md`

### Step 8: Generate the Product Requirements Document (PRD)

Next, create your PRD. The PRD should include:

1. **Product Overview**
   - High-level description of the recruitment assistant
   - Core value proposition

2. **Goals and Success Metrics**
   - Time to source candidates
   - Candidate match accuracy
   - Recruiter satisfaction

3. **User Personas**
   - Primary: Recruiter (needs to find qualified candidates quickly)
   - Secondary: Hiring Manager (needs ranked candidate recommendations)

4. **Core Features**
   - Candidate search based on job requirements
   - Automated candidate evaluation
   - Ranked candidate recommendations
   - Integration with job posting systems (optional for mini-project)

5. **Application Crew Definition**
   - **Researcher Agent**: Searches and sources candidates
   - **Evaluator Agent**: Evaluates candidates against job criteria
   - **Recommender Agent**: Provides ranked recommendations

6. **Development Crew Mapping**
   - Product Manager (you, using this persona)
   - System Architect (for Module 06)
   - Backend Engineer (for Module 06)
   - Integration Engineer (for Module 06)

7. **Out of Scope (for this mini-project)**
   - Full ATS integration
   - Candidate communication automation
   - Advanced analytics and reporting

**Save your PRD as:** `project-context/1.define/prd.md`

### Step 9: Review PRD as Agentic Architect

**Critical Step:** Before proceeding, you must review the PRD wearing your **Agentic Architect hats**—specifically the **Experience** and **Business** hats. This is where you exercise judgment and ensure the application aligns with your vision.

#### Wearing the Experience Hat

Review the PRD from a user experience and design perspective:

1. **User Experience Alignment**
   - Does the PRD describe an experience that users will find valuable?
   - Are the user personas accurate and representative?
   - Will the Application Crew agents provide a smooth, intuitive experience?
   - How will users interact with the system? Is it clear and well-defined?

2. **Interaction Design**
   - How will recruiters input job requirements?
   - How will recommendations be presented? (ranked list, detailed reports, etc.)
   - What happens when agents encounter ambiguous requirements?
   - How are errors and edge cases handled?

3. **Brand and Voice**
   - Does the PRD specify the tone and personality of agent interactions?
   - Is the experience aligned with your organization's brand values?
   - How do agents represent your brand in candidate interactions?

**Action Items:**
- [ ] Review user personas and ensure they match real users
- [ ] Validate that the user experience flow is logical and intuitive
- [ ] Ensure error handling and edge cases are addressed
- [ ] Verify that agent interactions align with desired brand experience

#### Wearing the Business Hat

Review the PRD from a business outcomes and strategic perspective:

1. **Business Value Alignment**
   - Do the success metrics directly tie to business outcomes?
   - Will this system create measurable value (time savings, cost reduction, quality improvement)?
   - Is the ROI clear and defensible?

2. **Strategic Fit**
   - Does this application align with organizational goals?
   - Are the out-of-scope items appropriate for the current business context?
   - Does the scope balance ambition with feasibility?

3. **Risk and Constraints**
   - Are technical constraints realistic given business timelines?
   - Are there compliance or regulatory considerations?
   - What are the risks if the system doesn't meet success metrics?

**Action Items:**
- [ ] Verify success metrics are measurable and tied to business value
- [ ] Ensure the scope is appropriate for business needs
- [ ] Identify any business constraints or risks not captured in the PRD
- [ ] Confirm the PRD aligns with strategic business objectives

#### Making Adjustments

If your review reveals gaps or misalignments:

1. **Iterate with Product Manager Persona**
   - Go back to `@product-mgr` and request specific updates
   - Example: "Update the PRD to include error handling for ambiguous job requirements"
   - Example: "Add success metrics that measure recruiter time savings in hours per week"

2. **Document Your Decisions**
   - Note any changes you make and why
   - This creates traceability for future reference

**Remember:** As an Agentic Architect, you're not just accepting what the Product Manager persona creates—you're actively shaping it to ensure technical excellence, user experience quality, and business value alignment.

### Step 10: Generate Project README

Once your PRD is finalized and reviewed, have the Product Manager persona create a README.md file for your project repository. This README will serve as the public-facing documentation for your project.

**Invoke the Product Manager Persona:**

```
@product-mgr Based on the PRD in project-context/1.define/prd.md, 
create a comprehensive README.md file for the project repository. 
The README should include:
- Project overview and description
- Problem statement and value proposition
- Key features
- Application architecture overview (agents and their roles)
- Getting started instructions
- Project structure
- Next steps for contributors
```

**The README should include:**

1. **Project Title and Description**
   - Clear, concise description of what the project does
   - Value proposition for users

2. **Problem Statement**
   - What problem does this solve?
   - Why is it important?

3. **Features**
   - Core capabilities of the recruitment assistant
   - What users can expect

4. **Architecture Overview**
   - Brief description of the Application Crew
   - Agent roles and responsibilities
   - How agents collaborate

5. **Getting Started**
   - Prerequisites
   - Installation instructions
   - Basic usage (to be completed in Build phase)

6. **Project Structure**
   - Overview of the AAMAD directory structure
   - Where to find key artifacts

7. **Development Status**
   - Current phase (Define, Build, or Deliver)
   - What's been completed
   - What's next

**Save the README as:** `README.md` (in the project root)

**Why This Matters:**
- The README is often the first thing people see when exploring your project
- It communicates the project's purpose and value
- It helps onboard new contributors or team members
- It documents the project's current state and direction

### Step 11: Review and Validate

Before moving to the Build phase, complete this final review checklist:

**Document Completeness:**
- [ ] MRD clearly defines the problem and market opportunity
- [ ] PRD includes all core features
- [ ] Application Crew agents are clearly defined (Researcher, Evaluator, Recommender)
- [ ] Development Crew personas are identified
- [ ] Success metrics are measurable
- [ ] Out-of-scope items are explicitly listed

**Agentic Architect Review:**
- [ ] PRD reviewed from Experience hat perspective (user experience, interaction design, brand alignment)
- [ ] PRD reviewed from Business hat perspective (business value, strategic fit, risk assessment)
- [ ] Any identified gaps or misalignments addressed
- [ ] PRD finalized and approved for Build phase

**Project Documentation:**
- [ ] README.md created and saved in project root
- [ ] README accurately reflects PRD content
- [ ] README provides clear project overview and structure

---

## Exercise

Complete the following tasks:

1. **Set up your project:**
   - Create `recruitment-assistant` folder
   - Initialize Git
   - Install AAMAD
   - Run `aamad init --dest .`

2. **Study the reference:**
   - Review the [CrewAI Recruitment Example](https://github.com/crewAIInc/crewAI-examples/tree/main/crews/recruitment)
   - Identify the three main agents and their responsibilities
   - Understand the workflow between agents

3. **Generate artifacts:**
   - Use `@product-mgr` persona to create MRD
   - Use `@product-mgr` persona to create PRD
   - Save both documents in `project-context/1.define/`

4. **Review as Agentic Architect:**
   - Review PRD wearing the Experience hat (user experience, interaction design, brand)
   - Review PRD wearing the Business hat (business value, strategic fit, risk)
   - Make adjustments as needed
   - Finalize PRD for Build phase

5. **Create project documentation:**
   - Use `@product-mgr` persona to generate README.md based on PRD
   - Save README.md in project root

6. **Define your Application Crew:**
   - Document the Researcher Agent role and responsibilities
   - Document the Evaluator Agent role and responsibilities
   - Document the Recommender Agent role and responsibilities
   - Describe how they will collaborate

7. **Commit your work:**
   ```bash
   git add .
   git commit -m "Define phase: MRD and PRD for recruitment assistant"
   ```

---

## Deliverables

By the end of this module, you should have:

1. ✅ A new project folder with AAMAD framework initialized
2. ✅ `project-context/1.define/mrd.md` - Market Research Document
3. ✅ `project-context/1.define/prd.md` - Product Requirements Document (reviewed and finalized)
4. ✅ `README.md` - Project README generated from PRD
5. ✅ Application Crew definition (3 agents: Researcher, Evaluator, Recommender)
6. ✅ Development Crew mapping (personas you'll use in Build phase)
7. ✅ PRD reviewed from Experience and Business perspectives (Agentic Architect review)
8. ✅ Git repository with initial commit

---

## Check Your Understanding

Answer these questions to verify you understand the Define phase:

1. **Why do we create MRD and PRD before writing code?**
   - What happens if AI agents don't have clear context about what to build?

2. **What's the difference between Application Crew and Development Crew?**
   - Which crew are you defining in the PRD?
   - Which crew will build the Application Crew?

3. **Why use the AAMAD templates instead of creating documents from scratch?**
   - What benefits do standardized templates provide?

4. **How does the Product Manager persona help in the Define phase?**
   - What would happen if you tried to create MRD/PRD without using a persona?

5. **Why is it important to review the PRD as an Agentic Architect?**
   - What's the difference between accepting the PRD as-is vs. reviewing it with your Experience and Business hats?
   - How does this review step demonstrate the value of the Agentic Architect role?

---

## Troubleshooting

**Issue: `aamad: command not found`**
- Solution: Ensure AAMAD is installed: `pip install aamad`
- Check your Python path: `which python` and `which pip`

**Issue: Templates not found after `aamad init`**
- Solution: Verify the `.cursor/templates/` directory exists
- Re-run `aamad init --dest .` if needed

**Issue: Product Manager persona not responding correctly**
- Solution: Ensure you're referencing `@product-mgr` correctly
- Check that `.cursor/agents/product-mgr.md` exists
- Review the persona file to understand its capabilities

---

## Next Steps

Once you've completed the Define phase:

1. **Review your artifacts** - Make sure MRD and PRD are complete and clear
2. **Commit your work** - Save your Define phase artifacts to Git
3. **Proceed to Module 06** - You'll use these documents to guide the Build phase

Continue to [Module 06: Hands-On Mini-Project - Build Phase](./06-hands-on-mini-project-build.md)

---

## Additional Resources

- [CrewAI Recruitment Example](https://github.com/crewAIInc/crewAI-examples/tree/main/crews/recruitment) - Reference implementation
- [AAMAD Framework Repository](https://github.com/synaptic-ai-consulting/AAMAD) - Framework documentation
- [CrewAI Documentation](https://docs.crewai.com/) - CrewAI framework guide
