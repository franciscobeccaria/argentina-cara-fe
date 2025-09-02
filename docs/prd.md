# Dashboard Argentina Brownfield Enhancement PRD

## Intro Project Analysis and Context

### Existing Project Overview

**Analysis Source:** IDE-based fresh analysis of Next.js project structure and components

**Current Project State:**
- **Primary Purpose:** Web application comparing product prices between Argentina, Chile, Brazil, and USA to analyze purchasing power and visualize dollar value differences
- **Current Functionality:** Price comparison of popular products, economic indicators dashboard, basic product visualization
- **Architecture:** Next.js 15.2.4 SPA with reusable components, currency context management, Supabase integration, caching system
- **Status:** Development in progress with backend scraping issues identified

### Available Documentation Analysis

**Available Documentation:**
- ✅ Tech Stack Documentation (detected from package.json and project structure)
- ❌ Source Tree/Architecture documentation
- ❌ Coding Standards documentation  
- ❌ API Documentation
- ❌ External API Documentation
- ❌ UX/UI Guidelines
- ❌ Technical Debt Documentation

**Recommendation:** For comprehensive brownfield enhancement planning, consider running document-project task to generate complete technical documentation.

### Enhancement Scope Definition

**Enhancement Type:**
- ✅ Major Feature Modification - Hybrid product management system
- ✅ Integration with New Systems - Transition from Supabase to local SQL + Claude Code
- ✅ UI/UX Overhaul - Product listing and creation improvements  
- ✅ New Feature Addition - User contribution system with verification workflow

**Enhancement Description:**
Transform the application from a fragile scraping-dependent system to a robust hybrid platform combining reliable automated data with manual user contributions. Migrate from Supabase to local SQL for simplified architecture and enhanced data control, while implementing dynamic economic indices by category.

**Impact Assessment:**
- ✅ Major Impact - Architectural changes required (Supabase migration, user system, approval workflow)

### Goals and Background Context

**Goals:**
• Stabilize data acquisition by eliminating critical dependency on fragile scraping
• Implement manual product contribution system with verification workflow
• Migrate from Supabase to local SQL + Claude Code to simplify architecture
• Improve product listing and creation UX
• Expand and enhance economic indicators with dynamic category-based indices
• Create hybrid system: reliable APIs + manual data + selective scraping
• Transform from simple price comparator to comprehensive economic index

**Background Context:**
The current project faces stability issues due to dependency on web scraping, which is inherently fragile and vulnerable to external site changes. While some scraping functions work reliably, others fail consistently. Rather than abandoning scraping entirely, the solution is creating an intelligent hybrid system that maintains scraping where it works, implements manual mode as fallback where it fails, and adds user contribution capability for organic expansion. The Supabase architecture adds unnecessary complexity when greater control and simplicity can be achieved with local SQL. The opportunity to evolve from a simple price comparison tool to a dynamic economic index with granular category insights provides significant value differentiation.

### Change Log

| Change | Date | Version | Description | Author |
|--------|------|---------|-------------|---------|
| Initial PRD Creation | 2025-09-01 | 1.0 | Comprehensive brownfield enhancement specification | PM Agent |

## Requirements

### Functional Requirements

**FR1:** The system must maintain automatic scraping for products where it currently functions without interrupting existing functionality

**FR2:** The system must implement manual mode as automatic fallback when scraping fails for specific products, with intelligent detection of scraping failures

**FR3:** Any user must be able to add products and prices manually without registration or authentication, with immediate visibility in the application

**FR4:** User-contributed products and prices must display immediately in the application alongside scraping data, with clear visual differentiation of data sources

**FR5:** Users must be able to vote (useful/not useful) on manually contributed products, with restriction of 1 vote per product per unique browser fingerprint

**FR6:** The system must provide administrative interface for reviewing, verifying, or eliminating user contributions with simple approve/reject workflow

**FR7:** Verified products must display "Verified" badge clearly differentiating them from unverified contributions

**FR8:** The system must completely migrate from Supabase to local SQL maintaining all existing data without loss

**FR9:** Product listing interface must be enhanced to clearly show data origin (scraping/manual/verified) with appropriate visual indicators

**FR10:** Economic indicators in the lower section must be expanded with new relevant metrics and dynamic category-based calculations

**FR11:** The system must detect and prevent multiple votes from the same user using browser fingerprinting combining multiple parameters (User Agent, resolution, timezone, plugins, canvas fingerprint)

**FR12:** The system must store vote history by fingerprint for suspicious pattern analysis and future moderation capabilities

**FR13:** The system must prominently display timestamp of last update for each product with clear recency indicators

**FR14:** Each price must include verifiable origin link/proof (URL, image, tweet) accessible to users for credibility verification

**FR15:** The system must calculate and display general "Argentina vs [country]" index in main header with real-time updates

**FR16:** Products must be organized by categories (Tech, Food, Fashion, Home, Cars) with specific indices calculated independently for each category

**FR17:** The application must display historical trends in simple graphs by category and general index with meaningful time ranges

**FR18:** The system must calculate category indices independently from general index, enabling granular economic analysis

**FR19:** The interface must visually show which categories are advantageous (cheaper) vs disadvantageous (more expensive) with color-coded indicators

**FR20:** The system must generate automatic insights highlighting categories where Argentina is competitive vs international markets

**FR21:** Users must be able to filter to view only advantageous or disadvantageous categories with toggle controls

**FR22:** The dashboard must show visual ranking of categories from cheapest to most expensive with intuitive progression indicators

**FR23:** The system must allow dynamic change of reference country while maintaining granularity by category

### Non Functional Requirements

**NFR1:** The hybrid system must maintain current response times (<2s for product listing) despite increased functionality

**NFR2:** Migration to local SQL must not result in loss of existing data with comprehensive backup and rollback procedures

**NFR3:** The system must handle at least 1000 user contributions per day without performance degradation

**NFR4:** Voting interface must be responsive and function properly on mobile devices with touch-optimized interactions

**NFR5:** Verification system must be accessible via simple web interface for administration with intuitive workflow

**NFR6:** Browser fingerprinting system must function on at least 95% of modern browsers without affecting application performance

**NFR7:** The system must handle fingerprinting false positives (legitimate users in libraries/offices) allowing manual override in specific cases

**NFR8:** Category index calculations must complete within 5 seconds even with hundreds of products to maintain real-time feel

**NFR9:** Historical data queries must not impact main application performance with appropriate caching and optimization

**NFR10:** The administrative panel must support batch operations for efficiency when handling high volumes of user contributions

### Compatibility Requirements

**CR1:** Enhancement must maintain existing API compatibility for any external integrations during transition period

**CR2:** Database schema compatibility must be maintained for rollback scenarios with version-aware migrations

**CR3:** UI/UX consistency must be preserved with existing design patterns, component libraries, and interaction models

**CR4:** Integration compatibility must be ensured with current deployment pipeline and infrastructure setup

**CR5:** Voting interface must use same design language and components as current system (Radix buttons, Tailwind colors) for visual consistency

**CR6:** Verification badges must integrate visually with existing card design without breaking current layout structure

**CR7:** Contribution modal must follow existing form patterns and maintain responsive behavior consistent with current application

## User Interface Enhancement Goals

### Integration with Existing UI

**Design System Integration:**
The current dashboard uses Radix UI components with Tailwind CSS styling, implementing a clean card-based layout with dark/light theme support via next-themes. New functionality will seamlessly integrate with this established design language.

**New Feature Integration:**
- **Voting Controls:** Integrated thumb up/down buttons within existing product-card components maintaining visual hierarchy
- **Verification States:** Badge system using established Radix badge components with consistent color scheme
- **Manual Contribution:** Modal/drawer implementation using existing Radix dialog components with form patterns
- **Source Indicators:** Clear iconography (robot/user/checkmark icons) consistent with Lucide React icon system

### Modified/New Screens and Views

**Modified Screens:**
1. **Main Dashboard:** Enhanced product cards with voting controls, verification badges, category filters, and dynamic index display
2. **Individual Product View:** Expanded with price history, source transparency, and contribution options

**New Screens:**
1. **Product Contribution Modal:** Clean form for manual product/price entry with image upload capability
2. **Admin Panel:** Simple interface for reviewing and verifying user contributions
3. **Category Index View:** Dedicated view showing detailed breakdown of economic indices by category
4. **Historical Trends View:** Graphs and charts showing price evolution over time

### UI Consistency Requirements

**Visual Integration:**
- Maintain current card-based layout structure without cluttering
- Use established color scheme for different states (verified=green, pending=yellow, rejected=red)
- Preserve responsive behavior across desktop and mobile viewports
- Continue using established typography hierarchy and spacing system

**Interaction Consistency:**
- Voting interactions follow existing button interaction patterns
- Modal workflows consistent with current user flows
- Form validation and feedback using established patterns
- Loading states and transitions matching current application behavior

## Technical Constraints and Integration Requirements

### Existing Technology Stack

**Current Technology Stack (from package.json and project analysis):**
- **Languages:** TypeScript, JavaScript
- **Frameworks:** Next.js 15.2.4, React 19
- **Database:** Supabase (current) → Local SQL (target architecture)
- **UI Framework:** Tailwind CSS 3.4.17, Radix UI comprehensive component set
- **State Management:** TanStack React Query 5.74.4, React Context for currency management
- **Infrastructure:** Next.js deployment (likely Vercel), Node.js runtime environment
- **External Dependencies:** Lucide React (iconography), next-themes (theme switching), recharts (data visualization)

### Integration Approach

**Database Integration Strategy:**
- **Migration Process:** Export complete dataset from Supabase to local SQLite/PostgreSQL with data integrity verification
- **Schema Evolution:** Maintain existing structure while adding new tables (votes, contributions, verifications, categories, historical_data)
- **Query Layer:** Implement with Prisma ORM or direct SQL queries + Claude Code for complex data management and migrations
- **Backup Strategy:** Maintain Supabase backup during 30-day transition period with rollback capability

**API Integration Strategy:**
- **Scraping APIs:** Preserve existing endpoints that function correctly with enhanced error handling and fallback logic
- **Manual Data APIs:** New RESTful endpoints for CRUD operations on user contributions (/api/contributions, /api/products/manual)
- **Voting System APIs:** Dedicated endpoints for vote management with fingerprinting validation (/api/votes, /api/fingerprint)
- **Admin APIs:** Administrative endpoints for content moderation and bulk operations (/api/admin/verify, /api/admin/moderate)
- **Index Calculation APIs:** Real-time endpoints for dynamic index calculations with caching layer

**Frontend Integration Strategy:**
- **Component Extension:** Enhance existing product-card component with voting controls and verification badges
- **State Management:** Leverage existing React Query patterns for new data fetching with optimistic updates
- **Form Handling:** Utilize react-hook-form (already in dependencies) for contribution forms with Zod validation
- **Fingerprinting Implementation:** Client-side fingerprinting library integration (FingerprintJS or custom implementation)
- **Real-time Updates:** WebSocket or polling implementation for live index updates and contribution notifications

**Testing Integration Strategy:**
- **Unit Testing:** Extend current testing framework for new components and utilities
- **Integration Testing:** Comprehensive tests for hybrid data system ensuring data consistency across sources
- **E2E Testing:** End-to-end validation of contribution and verification workflows
- **Performance Testing:** Load testing for vote processing and index calculations under high concurrent usage

### Code Organization and Standards

**File Structure Approach:**
```
/app
  /api
    /contributions     # User contribution endpoints
    /votes            # Voting system endpoints
    /admin            # Administrative endpoints
    /indices          # Index calculation endpoints
/lib
  /database           # Local SQL setup, migrations, queries
  /fingerprint        # Browser fingerprinting logic
  /voting             # Vote processing and validation
  /contributions      # User contribution management
  /indices            # Index calculation algorithms
  /migration          # Supabase migration utilities
/components
  /admin             # Administrative panel components
  /contribution      # User contribution forms and modals
  /voting            # Voting UI components and controls
  /indices           # Index visualization components
  /enhanced          # Enhanced versions of existing components
/hooks
  /use-fingerprint   # Fingerprinting React hook
  /use-voting        # Voting logic custom hook
  /use-contributions # Contribution management hook
```

**Naming Conventions:** 
- Maintain camelCase for TypeScript variables and functions
- Use kebab-case for file and directory names
- PascalCase for React components and TypeScript interfaces
- UPPER_SNAKE_CASE for environment variables and constants

**Coding Standards:** 
- Continue TypeScript strict mode with comprehensive type definitions
- Maintain existing ESLint configuration with additional rules for new functionality
- Use Prettier formatting with current configuration
- Implement comprehensive JSDoc documentation for new utilities and complex functions

**Documentation Standards:** 
- Document all new API endpoints with OpenAPI/Swagger specifications
- Create migration guides for database transition
- Maintain README updates with setup instructions for local SQL
- Document fingerprinting implementation and privacy considerations

### Deployment and Operations

**Build Process Integration:**
- **Database Initialization:** Automated scripts for local SQL setup across development, staging, and production environments
- **Migration Scripts:** Automated Supabase to local SQL migration with data validation and integrity checks
- **Environment Configuration:** New environment variables for local database connection, fingerprinting settings, and admin credentials
- **Build Optimization:** Bundle analysis to ensure new features don't significantly impact application size

**Deployment Strategy:**
- **Staging Environment:** Complete hybrid system testing with production data copy for comprehensive validation
- **Production Rollout:** Gradual migration approach maintaining Supabase as read-only backup during transition
- **Blue-Green Deployment:** Zero-downtime deployment strategy for database migration
- **Rollback Procedures:** Comprehensive rollback plan with data restoration capabilities and feature flag controls

**Monitoring and Logging:**
- **Contribution Analytics:** Track contribution patterns, spam detection, and user engagement metrics
- **Performance Monitoring:** Database query performance comparison (local SQL vs Supabase) with alerting for degradation
- **Voting System Analytics:** Vote authenticity analysis and potential manipulation detection
- **Index Calculation Performance:** Monitoring for calculation times and accuracy validation
- **Error Tracking:** Enhanced error logging for hybrid data source conflicts and resolution

**Configuration Management:**
- **Feature Flags:** Gradual rollout controls for user contributions, voting system, and new categories
- **Rate Limiting Configuration:** Adjustable limits for contributions, votes, and API access with dynamic updates
- **Admin Panel Settings:** Configurable moderation thresholds and automatic verification criteria
- **Index Calculation Tuning:** Adjustable weights and parameters for category index calculations

### Risk Assessment and Mitigation

**Technical Risks:**
- **Data Migration Risk:** Potential data loss or corruption during Supabase to local SQL transition
  - *Mitigation:* Comprehensive backup strategy, staged migration with validation, rollback procedures
- **Performance Impact:** Local SQL queries potentially slower than Supabase for certain operations
  - *Mitigation:* Database optimization, appropriate indexing, query caching, performance monitoring
- **Fingerprinting Accuracy:** False positives in corporate/library environments affecting legitimate users
  - *Mitigation:* Multiple fingerprinting methods, admin override capabilities, user feedback mechanism

**Integration Risks:**
- **Data Consistency:** Conflicts between scraped data, manual contributions, and verification states
  - *Mitigation:* Clear data precedence rules, conflict detection algorithms, administrative resolution workflows
- **Scraping Disruption:** Enhanced system complexity potentially breaking existing scraping functionality
  - *Mitigation:* Isolated scraping modules, comprehensive testing, fallback to manual mode
- **UI Complexity Overload:** New features potentially overwhelming existing clean interface
  - *Mitigation:* Progressive disclosure, user testing, feature toggles for gradual introduction

**Deployment Risks:**
- **Migration Downtime:** Extended downtime during database migration affecting user access
  - *Mitigation:* Off-peak migration scheduling, blue-green deployment, real-time migration monitoring
- **Feature Integration Conflicts:** New functionality potentially breaking existing user workflows
  - *Mitigation:* Comprehensive integration testing, staged feature rollout, user acceptance testing
- **Spam and Abuse:** User contribution system potentially vulnerable to spam and manipulation
  - *Mitigation:* Robust fingerprinting, rate limiting, admin moderation tools, community voting validation

**Business Continuity Risks:**
- **User Adoption:** Users may not engage with new contribution and voting features
  - *Mitigation:* Clear value proposition communication, intuitive UX design, gradual feature introduction
- **Data Quality Degradation:** Manual contributions potentially lowering overall data quality
  - *Mitigation:* Verification workflows, voting systems, admin oversight, quality metrics monitoring
- **Maintenance Overhead:** Increased system complexity requiring more maintenance resources
  - *Mitigation:* Automated monitoring, clear documentation, modular architecture, admin efficiency tools

## Epic and Story Structure

### Epic Approach

**Epic Structure Decision:** Single Comprehensive Epic - "Hybrid Data System with Dynamic Economic Indices"

**Rationale:** This represents a cohesive architectural transformation requiring coordination between data migration, contribution system, voting mechanism, and dynamic index calculations. While complex, all components are interdependent and must be implemented coordinately to achieve the vision of a dynamic economic index. The brownfield nature requires careful sequencing to maintain existing functionality while introducing substantial enhancements.

**MVP/Product-Focused Consideration:** Story sequencing prioritizes user-visible value delivery starting with core contribution functionality before advanced categorization features, ensuring early user engagement and feedback collection.

## Epic 1: Hybrid Data System with Dynamic Economic Indices

**Epic Goal:** Transform the application from a simple price comparator to a dynamic economic index platform that intelligently combines automated scraping (where functional), manual fallback modes (where scraping fails), and user contributions, providing granular economic insights through category-based indices and comprehensive source transparency.

**Integration Requirements:** 
- Complete migration from Supabase to local SQL while maintaining all existing functionality
- Seamless integration of multiple data sources without conflicts or inconsistencies
- Enhancement of existing Radix/Tailwind UI with new functionality maintaining design consistency
- Performance preservation or improvement despite significant functionality expansion
- Robust data verification and quality control systems for user-generated content

### Story Sequence (MVP/Product-Focused Priority)

### Story 1.1: Database Migration and Hybrid Data Management
**Priority:** CRITICAL - Essential foundation enabling Claude Code capabilities and simplified architecture

As a system administrator,
I want to migrate from Supabase to local PostgreSQL while maintaining all existing functionality,
So that we have complete control over our data architecture, simplified operations, and full Claude Code capabilities.

**Detailed Acceptance Criteria:**
1. **Complete Data Migration:** All existing products, prices, and historical data transferred from Supabase to local PostgreSQL without loss
2. **Schema Enhancement:** New database design accommodates user contributions, votes, verifications, and categories while maintaining existing data structure
3. **Performance Preservation:** Query performance matches or exceeds current Supabase performance with proper indexing
4. **Claude Code Integration:** Full database access enabling Claude Code to perform migrations, queries, and data management operations
5. **Development Environment:** Local PostgreSQL setup with Docker Compose for consistent development experience
6. **Rollback Capability:** Comprehensive backup and rollback procedures in case of migration issues
7. **Data Integrity:** All data relationships and constraints properly maintained during transition
8. **Connection Pooling:** Efficient database connection management for production scalability

**Integration Verification:**
- IV1: Existing product displays and scraping functionality continues working without interruption
- IV2: All existing API endpoints maintain functionality and response formats
- IV3: Current user workflows remain unchanged during and after migration

**Implementation Details:**
- Set up PostgreSQL with Docker Compose for local development
- Create comprehensive migration scripts with data validation and integrity checks
- Implement Prisma ORM for type-safe database operations and migrations
- Establish proper database indexing strategy for optimal query performance
- Create seeded development database for consistent testing environment

---

### Story 1.2: User Product Contribution Foundation
**Priority:** HIGH - Core MVP functionality enabling user engagement

As a user who discovers prices not listed in the index,
I want to easily add products and prices manually without registration barriers,
So that I can contribute valuable data to improve the economic index accuracy.

**Detailed Acceptance Criteria:**
1. **Simple Contribution Form:** Modal/drawer accessible from main dashboard with intuitive product entry fields (name, price by country, category, source URL/proof)
2. **No Registration Required:** Users can contribute immediately without account creation or authentication
3. **Immediate Visibility:** Contributed products appear in main product grid immediately with "User Contributed" indicator
4. **Image Upload Support:** Users can attach screenshots or photos as price proof with basic image validation
5. **Mobile Optimization:** Contribution form fully functional on mobile devices with touch-optimized interactions
6. **Source Linking:** Required fields for source information (store URL, location, date observed) to maintain credibility
7. **Category Selection:** Dropdown selection from predefined categories (Tech, Food, Fashion, Home, Cars, Other)

**Integration Verification:**
- IV1: Contribution modal uses existing Radix Dialog components maintaining visual consistency with current design system
- IV2: New product cards integrate seamlessly with existing grid layout without breaking responsive behavior
- IV3: Form validation and error handling follows established patterns used elsewhere in the application

**Implementation Details:**
- Use react-hook-form with Zod validation for robust form handling
- Implement optimistic UI updates for immediate user feedback
- Store contributions in new `user_contributions` table with proper indexing
- Include comprehensive logging for contribution tracking and analysis

---

### Story 1.3: Browser Fingerprinting Voting System
**Priority:** HIGH - Essential for quality control and spam prevention

As a user of the economic index,
I want to vote on the usefulness of contributed products and prices,
So that the community can collectively improve data quality and reliability.

**Detailed Acceptance Criteria:**
1. **Intuitive Voting Interface:** Thumb up/down buttons integrated into each product card for easy voting access
2. **Fingerprint-Based Control:** System prevents multiple votes per product using comprehensive browser fingerprinting (User Agent, screen resolution, timezone, installed plugins, canvas fingerprint)
3. **Vote Persistence:** Votes are stored and associated with fingerprints for future reference and analysis
4. **Visual Feedback:** Clear indication of vote status and vote counts on each product with real-time updates
5. **Mobile-Friendly Voting:** Touch-optimized voting controls that work effectively on mobile devices
6. **Vote History:** System maintains complete audit trail of votes for administrative review and spam detection
7. **Rate Limiting:** Additional protection against abuse with reasonable daily voting limits per fingerprint

**Integration Verification:**
- IV1: Voting controls integrate visually with existing product-card design without cluttering the interface
- IV2: Fingerprinting operates transparently without affecting application performance or user experience
- IV3: Vote data storage and retrieval doesn't impact main product loading times

**Implementation Details:**
- Implement custom fingerprinting solution combining multiple browser characteristics
- Create optimized database schema for vote storage and retrieval
- Use React Query for vote state management with optimistic updates
- Include comprehensive analytics for voting pattern analysis

---

### Story 1.3: Administrative Verification Workflow
**Priority:** HIGH - Critical for maintaining index credibility and quality

As the administrator of the economic index,
I want an efficient system to review, verify, and moderate user contributions,
So that I can maintain high data quality while scaling user participation.

**Detailed Acceptance Criteria:**
1. **Simple Admin Dashboard:** Clean interface listing all pending contributions with essential details (product, price, source, votes, date)
2. **One-Click Verification:** Approve/reject functionality with single-click actions for efficient processing
3. **Batch Operations:** Ability to select multiple contributions for bulk approval or rejection
4. **Verification Badges:** Approved products display prominent "Verified" badge distinguishing them from unverified contributions
5. **Rejection Reasons:** Optional categorized rejection reasons for user feedback and pattern analysis
6. **Source Review:** Easy access to provided proof (URLs, images) for quick credibility assessment
7. **Analytics Dashboard:** Overview of contribution patterns, spam detection, and verification statistics

**Integration Verification:**
- IV1: Admin panel integrates with existing Next.js architecture and authentication patterns
- IV2: Verification status updates reflect immediately across all user-facing interfaces
- IV3: Batch operations complete efficiently without causing performance issues for end users

**Implementation Details:**
- Create dedicated admin API endpoints with proper authorization
- Implement real-time updates for verification status changes
- Design intuitive admin interface using established component library
- Include comprehensive logging for audit trail and decision tracking

---

### Story 1.4: Administrative Verification Workflow
**Priority:** HIGH - Critical for maintaining index credibility and quality

As the administrator of the economic index,
I want an efficient system to review, verify, and moderate user contributions,
So that I can maintain high data quality while scaling user participation.

**Detailed Acceptance Criteria:**
1. **Simple Admin Dashboard:** Clean interface listing all pending contributions with essential details (product, price, source, votes, date)
2. **One-Click Verification:** Approve/reject functionality with single-click actions for efficient processing
3. **Batch Operations:** Ability to select multiple contributions for bulk approval or rejection
4. **Verification Badges:** Approved products display prominent "Verified" badge distinguishing them from unverified contributions
5. **Rejection Reasons:** Optional categorized rejection reasons for user feedback and pattern analysis
6. **Source Review:** Easy access to provided proof (URLs, images) for quick credibility assessment
7. **Analytics Dashboard:** Overview of contribution patterns, spam detection, and verification statistics

**Integration Verification:**
- IV1: Admin panel integrates with existing Next.js architecture and authentication patterns
- IV2: Verification status updates reflect immediately across all user-facing interfaces
- IV3: Batch operations complete efficiently without causing performance issues for end users

**Implementation Details:**
- Create dedicated admin API endpoints with proper authorization
- Implement real-time updates for verification status changes
- Design intuitive admin interface using established component library
- Include comprehensive logging for audit trail and decision tracking

---

### Story 1.5: Source Transparency and Proof System
**Priority:** MEDIUM - Important for credibility but builds on core functionality

As a user evaluating economic data,
I want to see exactly where price information comes from with verifiable proof,
So that I can trust the accuracy and reliability of the economic index.

**Detailed Acceptance Criteria:**
1. **Clear Source Indicators:** Each product displays clear visual indication of data source (scraping bot, manual entry, user contribution)
2. **Timestamp Visibility:** Prominent display of when each price was last updated with relative time indicators
3. **Proof Access:** Clickable links to original sources (URLs, images, tweets) with secure handling of external links
4. **Source Quality Scoring:** Visual indicators showing reliability based on source type and verification status
5. **Historical Source Tracking:** System maintains record of how prices have been sourced over time
6. **Broken Link Detection:** Automated checking and flagging of invalid source links
7. **Source Comparison:** When multiple sources exist for same product, clear comparison interface

**Integration Verification:**
- IV1: Source information integrates cleanly with existing product card layout without overwhelming users
- IV2: External link handling follows security best practices for user protection
- IV3: Additional source data doesn't impact application loading performance

**Implementation Details:**
- Design intuitive iconography for different source types
- Implement secure external link handling with user warnings
- Create efficient source validation and monitoring systems
- Build source history tracking with appropriate data retention

---

### Story 1.6: Category System and Dynamic Indices
**Priority:** MEDIUM - Valuable differentiation feature building on established product base

As a user analyzing economic trends,
I want to see products organized by categories with independent economic indices,
So that I can understand which sectors are expensive or competitive in Argentina.

**Detailed Acceptance Criteria:**
1. **Product Categorization:** All products automatically or manually assigned to categories (Tech, Food, Fashion, Home, Cars, Other)
2. **Category Filtering:** Users can filter product view by specific categories with clear navigation
3. **Independent Index Calculations:** Each category shows its own economic index relative to reference countries
4. **Visual Index Comparison:** Clear visual representation showing which categories are expensive (red) vs competitive (green)
5. **Category Performance Dashboard:** Overview showing all categories ranked from most to least expensive
6. **Dynamic Reference Country:** Users can change reference country (USA, Chile, Brazil) and see category indices update
7. **Category Insights:** Automated insights highlighting notable category performance ("Tech is 65% more expensive, but Fashion is 8% cheaper")

**Integration Verification:**
- IV1: Category filtering integrates smoothly with existing product display and search functionality
- IV2: Index calculations complete quickly without impacting user interface responsiveness
- IV3: Category visualizations use existing chart library (recharts) for consistency

**Implementation Details:**
- Create efficient categorization system with both automated and manual assignment
- Implement real-time index calculation algorithms optimized for performance
- Design intuitive category navigation and filtering interfaces
- Build comprehensive category analytics and insight generation

---

### Story 1.7: Historical Tracking and Trend Analysis
**Priority:** LOW - Advanced analytics feature for power users

As a user interested in economic trends,
I want to see how prices and indices have changed over time,
So that I can understand patterns and make informed economic decisions.

**Detailed Acceptance Criteria:**
1. **Automated Historical Data:** System automatically stores price changes and maintains comprehensive historical records
2. **Trend Visualization:** Simple graphs showing price evolution for individual products and category indices
3. **Time Range Selection:** Users can view trends over different periods (1 month, 3 months, 6 months, 1 year)
4. **Historical Comparisons:** Ability to compare current index values with historical benchmarks
5. **Trend Insights:** Automated detection and highlighting of significant price movements or trends
6. **Export Functionality:** Basic data export capabilities for users wanting to analyze trends externally
7. **Performance Optimization:** Historical data queries don't impact main application performance

**Integration Verification:**
- IV1: Historical data visualizations integrate with existing chart components and design system
- IV2: Historical data storage and retrieval optimized to avoid impacting real-time functionality
- IV3: Trend analysis features accessible but don't overwhelm users focused on current data

**Implementation Details:**
- Design efficient historical data storage with appropriate data retention policies
- Implement optimized queries for historical data analysis and visualization
- Create intuitive historical data interfaces building on existing UI patterns
- Build automated trend analysis algorithms with meaningful insight generation

---

## Next Steps and Implementation Priorities

### Immediate Actions Required:

1. **Technical Setup:**
   - Set up local PostgreSQL database environment with Docker Compose
   - Create comprehensive Supabase data export and migration scripts
   - Establish Prisma ORM setup for type-safe database operations
   - Configure Claude Code database access for enhanced development capabilities

2. **MVP Implementation Sequence (Updated Priority):**
   - **FIRST:** Story 1.1 (Database Migration) - Foundation enabling Claude Code capabilities
   - **SECOND:** Story 1.2 (User Product Contribution) for immediate value delivery
   - **THIRD:** Story 1.3 (Voting System) for quality control
   - **FOURTH:** Story 1.4 (Admin Verification) for scalable moderation

3. **Design and UX Planning:**
   - Create detailed mockups for contribution modal and voting interfaces
   - Design admin panel wireframes for efficient moderation workflow
   - Plan category filtering and index visualization interfaces

### Success Metrics and KPIs:

**User Engagement Metrics:**
- Number of user contributions per week
- Voting participation rate on contributed products
- Return user rate for contributors

**Data Quality Metrics:**
- Percentage of contributions verified vs rejected
- Time from contribution to verification
- Source link validity and accessibility rate

**System Performance Metrics:**
- Application response time with enhanced functionality
- Database query performance post-migration
- Index calculation completion time

**Business Value Metrics:**
- Economic index accuracy and reliability measures
- User trust indicators through surveys
- Category insight utilization and engagement

This comprehensive PRD provides the foundation for transforming Dashboard Argentina from a simple price comparison tool into a robust, community-driven economic index platform with dynamic insights and reliable data sources.

🤖 Generated with [Claude Code](https://claude.ai/code)

Co-Authored-By: Claude <noreply@anthropic.com>