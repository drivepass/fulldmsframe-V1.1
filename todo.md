# DrivePass CRM 360 - New Structure Implementation Plan

Based on the Figma CSV specifications, I need to create a comprehensive CRM system with the following structure:

## Core Screens to Implement:

### Lead Management Stage (Awareness → Interest)
1. **Lead Capture Dashboard** - Main dashboard with lead overview
2. **Lead Profile Page** - Detailed individual lead information
3. **Pipeline View (Kanban)** - Drag & drop lead management

### Prospect Engagement Stage (Consideration)  
4. **Test Drive Calendar View** - Schedule and manage test drives
5. **Prospect Timeline Page** - Chronological interaction history

### Additional Core Modules
6. **Sales Dashboard** - Sales performance and metrics
7. **Workshop Management** - Service appointments and maintenance
8. **Yard Management** - Vehicle inventory management
9. **Finance Module** - Financial reporting and management
10. **Service Bookings** - Customer service appointments
11. **Subscriptions** - Subscription management
12. **Analytics** - Business intelligence and reporting

## Technical Implementation:
- React + TypeScript with shadcn/ui components
- Responsive design with Tailwind CSS
- Clean navigation structure
- Professional automotive dealer interface
- Interactive features (drag & drop, calendars, filters)

## File Structure:
- Update App.tsx with new routing
- Create individual page components for each screen
- Update sidebar navigation
- Maintain existing login functionality with DrivePass branding