Design a premium, calm, enterprise SaaS web app called “SmartHire” for AI-powered recruitment screening, candidate ingestion, job posting distribution, and hiring manager shortlisting.

This is a desktop-first B2B product for a serious US company. It must look polished, trustworthy, clean, and intentionally designed — NOT like an AI-generated template. It should feel like a premium internal recruiting platform used by recruiters, hiring managers, and admins. Avoid flashy visuals, neon colors, clutter, over-rounded shapes, excessive gradients, or overly decorative elements.

OVERALL PRODUCT GOAL
SmartHire is a unified hiring system that:
1) creates and distributes jobs to multiple portals,
2) collects candidates from multiple sources,
3) normalizes all applications into one pipeline,
4) scores candidates by job criteria,
5) shows only the most relevant candidates clearly,
6) helps recruiters and hiring managers review, shortlist, and export top talent.

DESIGN THE FOLLOWING 21 SCREENS WITH FULL CONNECTIONS BETWEEN THEM:

GLOBAL DESIGN DIRECTION
Theme family: “Quiet Enterprise Premium”
Style: calm, clean, structured, premium, minimal, spacious, modern SaaS
Look & feel: soft slate + mist blue + subtle teal accents, white cards, gentle shadows, restrained color use

COLOR SYSTEM
- Primary brand: deep slate blue
- Background: very light cool gray, not pure white everywhere
- Surfaces/cards: pure white
- Accent: subtle teal or blue only
- Success/high score: muted green
- Warning/medium score: soft amber
- Danger/low score: muted red
Use score colors consistently across the product.

TYPOGRAPHY
- Use a clean modern sans serif like Inter-style typography
- Max 3 font weights
- Strong hierarchy:
  - page titles large and bold
  - section titles medium
  - body text regular
  - labels smaller and muted

LAYOUT SYSTEM
- Desktop only
- Fixed left sidebar navigation
- Top bar with page title, search, notifications, profile menu, quick actions
- Main content area with generous spacing
- Use cards, tables, tabs, filters, drawers, and modal overlays where appropriate
- Keep all screens easy to scan, not congested
- Use only one primary action per screen where possible
- Use consistent spacing, alignment, and card styling across the app

GLOBAL RULES
- Every application score must be displayed as a percentage
- Scores are 0–100%
- Higher score always appears first
- Only show candidates above 70% by default in the application lists
- Shortlisted candidates are always above 85%
- Allow a toggle to view all candidates if needed
- Job status must be visible on Dashboard:
  - Active Jobs
  - Closed Jobs
  - Draft Jobs
- Jobs can be saved as draft before publishing
- Every job must include:
  - Job Description box
  - Primary skills
  - Secondary skills
  - Other criteria such as experience, education, certifications
- Primary skills must carry more weight than secondary skills
- Multi-portal job posting must be built into job creation and job detail
- Candidate sources must be centralized through one import system
- Import sources should include:
  - Direct Apply
  - Manual Upload
  - Historical Import
  - Email Ingestion
- Secondary / strategic / expansion sources should also be represented:
  - Career Page Widget
  - Referral Portal
  - Drive / Dropbox Import
  - ATS Integration
- Show source tracing and review queue where relevant
- Include a chatbot assistant panel accessible from all screens via a floating icon
- The chatbot should feel like an always-available helper, not a separate app

VISUAL DENSITY RULE
The interface must breathe. Use whitespace intentionally. Never make the app feel cluttered or data-dense to the point of confusion. The client should immediately understand each screen.

REUSABLE COMPONENT STYLE
Create a consistent design system with:
- Primary / secondary / ghost / danger / loading buttons
- Inputs, select dropdowns, textarea, search input, tag input, file upload field
- Status badges: Active, Closed, Draft, Connected, Pending, Failed, Review Needed, Shortlisted
- Score badges with percentage
- Cards for jobs, candidates, imports, portals, stats
- Tables with clean headers, hover states, and empty states
- Tabs for filtering and switching views
- Drawer for chatbot and review details
- Modal for upload and export actions
- Tags/chips for primary and secondary skills
- Progress indicators and small charts where useful

SCREEN 1 — LOGIN
Purpose: secure entry to SmartHire
Layout:
- centered premium login card
- logo area
- product name
- email/password fields
- sign in button
- forgot password link
- optional SSO placeholder
Style:
- minimal and enterprise-like
- calm and not decorative

SCREEN 2 — DASHBOARD
Purpose: system overview and hiring command center
Must show:
- Active Jobs card
- Closed Jobs card
- Draft Jobs card
- Total Applications card
- Candidates above 70% card
- Shortlisted above 85% card
- Pending Review card
- Source breakdown widget
- Recent activity feed
- Top candidates snapshot
- quick navigation to jobs and imports
Layout:
- top summary cards row
- middle area with chart and recent activity
- bottom job table or job snapshot area
Important:
- Draft jobs must look distinct and slightly muted
- cards should be clickable filters into job list
- dashboard must feel like a serious operational control center

SCREEN 3 — JOB OPENINGS LIST
Purpose: show all jobs and lifecycle status
Must show:
- job title
- department
- status (Active / Closed / Draft)
- posted date
- application count
- shortlisted count
- posting status summary across portals
- view and edit actions
Layout:
- top filter bar
- search
- status filter
- department filter
- date filter
- jobs table or clean job cards
Connection:
- clicking a job opens Job Detail
- clicking create job opens Create Job screen

SCREEN 4 — CREATE JOB SCREEN
Purpose: create job, define JD, define scoring rules, and distribute to portals
This is one of the most important screens
Layout:
- two-column structured layout
Left column:
- Job basics: title, department, location, work type, salary, employment type
- Rich Job Description box
- responsibilities and requirements text area
Right column:
- Primary skills section with tag input
- Secondary skills section with tag input
- experience requirement
- education requirement
- certifications
- shortlist threshold set to default 85%
- scoring summary panel
- Multi-portal posting selector with checkbox cards
Job portal selector must include:
- LinkedIn
- Indeed
- Dice
- TimesJobs
- Naukri
- ZipRecruiter
Each portal card should show connection status:
- Connected / Not connected
- connect or reconnect CTA
- selected portal state
Bottom actions:
- Save Draft
- Publish Job
Important:
- Draft option must exist
- Publish action should trigger distribution to selected portals
- screen should make it obvious that one job can be posted to multiple portals at once

SCREEN 5 — JOB DETAIL SCREEN
Purpose: show full job configuration after creation
Must show:
- job header with title and status
- job basics
- full JD
- primary skills
- secondary skills
- scoring settings
- shortlist threshold
- application count
- shortlist count
- portal distribution status panel
Portal distribution panel:
- show each selected portal with status:
  - Posted
  - Pending
  - Failed
- actions:
  - View listing
  - Retry
  - Reconnect
  - Add more platforms
Connection:
- from Job List to Job Detail
- from Job Detail to Applications
- from Job Detail to Connected Portals

SCREEN 6 — CONNECTED PORTALS SCREEN
Purpose: manage portal accounts used for posting jobs
Must show portal cards for:
- LinkedIn
- Indeed
- Dice
- TimesJobs
- Naukri
- ZipRecruiter
Each card should include:
- portal logo
- connection status
- account name / connected identity
- last sync
- reconnect button
- test connection option
Layout:
- clean card grid
- strong visual status clarity
Purpose:
- this is the setup/management area for multi-portal posting

SCREEN 7 — IMPORT CENTER
Purpose: central hub for all candidate sources and input channels
Must show grouped source cards:

Primary / Core:
- Direct Apply
- Manual Upload
- Historical Import
- Email Ingestion

Expansion / Strategic:
- Career Page Widget
- Referral Portal
- Drive / Dropbox Import
- ATS Integration

Each card should show:
- source title
- one-line explanation
- status badge:
  - Active
  - Connected
  - Available
  - Enterprise
- CTA button:
  - Open
  - Setup
  - Connect
  - Learn more

This screen should feel like “all candidate entry points plug into one system”
Layout:
- source cards grid
- categorized sections
- clean and highly legible
Connection:
- clicking each card opens its dedicated screen or setup flow

SCREEN 8 — DIRECT APPLY SCREEN
Purpose: candidate applies directly into SmartHire
This screen is candidate-facing and simple
Must show:
- full name
- email
- phone
- LinkedIn prefill option
- job context
- resume upload required
- submit application button
Layout:
- centered clean application form
- minimal friction
- resume upload must be prominent
Connection:
- this is the primary controlled apply flow

SCREEN 9 — MANUAL UPLOAD SCREEN
Purpose: recruiter uploads resumes directly into SmartHire
Must show:
- drag and drop upload zone
- browse button
- bulk upload
- job selector
- file count
- processing state
- upload history
Layout:
- top explanation
- big upload zone
- processing list below
Purpose:
- for WhatsApp resumes, email downloads, referral files, local PDF/DOCX files

SCREEN 10 — HISTORICAL IMPORT SCREEN
Purpose: import old candidate databases and resume archives
Must show:
- CSV upload
- Excel upload
- ZIP/folder import
- field mapping preview
- duplicate preview
- import progress
- summary counts
Layout:
- step-based or wizard-like flow
- organized and enterprise-friendly
Purpose:
- bring historical candidate data into SmartHire

SCREEN 11 — EMAIL INGESTION SCREEN
Purpose: connect recruiter inboxes and ingest resumes automatically
Must show:
- Gmail connect
- Outlook connect
- connected inbox list
- detection rules
- extracted resume emails
- confidence state
- auto-import toggle
- review-needed count
Layout:
- connection panel and inbox status
- detected items list
Purpose:
- capture candidate emails and portal applications arriving in inboxes

SCREEN 12 — REVIEW QUEUE SCREEN
Purpose: handle low-confidence imports, ambiguous files, and duplicates
Must show:
- preview list of flagged items
- confidence score
- reason for review
- source
- approve
- reject
- merge
- assign to job
Layout:
- main list with preview drawer
- side drawer shows extracted data and resume preview
Purpose:
- human review before data enters final candidate pool

SCREEN 13 — APPLICATIONS SCREEN
Purpose: main work screen showing candidates for a specific job
Must show:
- breadcrumb path
- job title header
- summary stats
- tabs:
  - All
  - Shortlisted
  - Under Review
  - Rejected
- filters:
  - score filter default >= 70%
  - status filter
  - search
  - sort by highest score
Main table columns:
- Candidate name
- Score percentage
- Primary match
- Secondary match
- Experience
- Source
- Status
- Actions
Important:
- higher scores appear at top
- only show candidates above 70% by default
- include a toggle for all candidates
- shortlisted group is above 85%
Connection:
- view profile opens Candidate Profile
- upload or import actions can be accessed here if needed

SCREEN 14 — CANDIDATE PROFILE SCREEN
Purpose: deep candidate detail and scoring explanation
Must show:
- candidate summary header
- contact details
- score percentage prominently
- resume preview
- experience summary
- education
- certifications
- skills breakdown
- source history
- AI explanation
- recruiter notes
Skills breakdown must clearly separate:
- Primary skills
- Secondary skills
Each should show matched / missing tags
Score breakdown must be visible:
- primary score contribution
- secondary score contribution
- other criteria contribution
Actions:
- shortlist / approve
- reject
- move stage
- download profile
Purpose:
- trust screen and explanation screen

SCREEN 15 — SHORTLIST / HIRING MANAGER VIEW
Purpose: show only top candidates in ranked order
Must show:
- ranked candidates
- score %
- top reasons
- quick compare
- approve / reject
- interview-ready status
Only candidates above 85% should be in shortlist by default
Layout:
- ranked list or cards
- very clear and decisive
Purpose:
- the screen hiring managers use to make decisions

SCREEN 16 — CANDIDATE COMPARISON SCREEN
Purpose: compare top candidates side by side
Must show:
- 2 or 3 candidate columns
- score %
- primary match
- secondary match
- experience
- education
- certifications
- notes
- match reasons
This should be clean and easy to compare visually
Purpose:
- helps shortlist and final decision making

SCREEN 17 — EXPORT / DOWNLOAD SCREEN
Purpose: export shortlist and candidate reports
Must show:
- export format selector
- PDF / CSV options
- candidate count
- job title
- download action
Layout:
- modal or compact panel
Purpose:
- recruiter can export shortlisted candidates or reports

SCREEN 18 — AUDIT LOG SCREEN
Purpose: show system actions and traceability
Must show:
- timestamp
- action
- source
- user
- import / merge / sync status
- change history
Layout:
- clean log table
Purpose:
- enterprise traceability and transparency

SCREEN 19 — USER MANAGEMENT SCREEN
Purpose: manage recruiter, hiring manager, admin users
Must show:
- user name
- role
- assigned jobs
- access status
- actions
Layout:
- table with clear roles
Purpose:
- role-based access control and admin management

SCREEN 20 — SETTINGS SCREEN
Purpose: configure system behavior and integrations
Must show tabs for:
- General
- Integrations
- Scoring
- Notifications
- Branding
Integrations area should include:
- email
- portal connections
- ATS connections
- cloud storage
Purpose:
- global control panel for the platform

SCREEN 21 — CHATBOT PANEL
Purpose: floating assistant available from every screen
Must be:
- a floating icon on every screen
- opens a clean slide-out drawer
- not full screen
- context-aware
- calm and premium
It should help with:
- summaries
- comparisons
- explanations
- navigation guidance
- report instructions
Connection:
- present on all screens, especially Dashboard, Applications, Candidate Profile, and Job screens

PROTOTYPE FLOW / INTERACTION CONNECTIONS
Create clickable flows between the screens:
- Dashboard → Job Openings List
- Dashboard → Import Center
- Dashboard → Applications Screen
- Dashboard → Shortlist View
- Job Openings List → Create Job
- Job Openings List → Job Detail
- Create Job → Connected Portals
- Create Job → Job Detail
- Job Detail → Applications
- Job Detail → Connected Portals
- Import Center → Direct Apply
- Import Center → Manual Upload
- Import Center → Historical Import
- Import Center → Email Ingestion
- Import Center → Review Queue
- Applications → Candidate Profile
- Applications → Export / Download
- Candidate Profile → Shortlist View
- Candidate Profile → Export / Download
- Shortlist View → Candidate Comparison
- Connected Portals → Job Detail or Create Job
- Settings → Integrations screens
- Chatbot → context-sensitive help from all screens

SCORING / STATUS VISUAL RULES
- Always show score in percentage
- 85–100% = high match / shortlisted / green
- 70–84% = medium / review / amber
- below 70% = low / red
- use consistent badge language
- use simple labels like:
  - High Match
  - Moderate Match
  - Low Match
  - Active
  - Draft
  - Closed
  - Connected
  - Pending
  - Failed
  - Review Needed

UI DETAIL RULES
- Use consistent shadows and rounded corners
- Use light borders, not heavy outlines
- Use one primary color with restrained accents
- No flashy gradients
- No neon colors
- No overuse of icons
- No overcrowded tables
- No AI-looking random decoration
- Keep everything aligned and premium
- Use whitespace to make the app feel calm and clear

FINAL PRODUCT STORY
The app should tell this story visually:
1) recruiter creates a job,
2) defines JD, primary skills, secondary skills, and threshold,
3) selects portals and posts the job,
4) candidates arrive from direct apply, manual upload, historical import, or email ingestion,
5) SmartHire normalizes and reviews them,
6) applications are sorted by score percentage,
7) only candidates above 70% are shown by default,
8) shortlisted candidates are above 85%,
9) candidate details explain the score clearly,
10) hiring manager reviews shortlist and exports final reports.

The final result must look like a real premium enterprise recruiting system that is ready to present to a client.

Create all 21 screens with consistent visual design, realistic enterprise data, clear navigation, and polished layout. The output must feel ready to show to a client immediately.