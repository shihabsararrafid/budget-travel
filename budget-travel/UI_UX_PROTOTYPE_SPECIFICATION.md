# Budget Travel App - UI/UX Prototype Specification

## 🎨 Design System Overview

### Color Palette
- **Primary Gradient**: `from-blue-600 to-purple-600`
- **Secondary Gradient**: `from-green-600 to-blue-600`
- **Background**: `from-blue-50 via-indigo-50 to-purple-50`
- **Dark Mode**: `from-slate-900 via-slate-800 to-slate-900`
- **Accent Colors**: 
  - Success: Green variants
  - Warning: Amber variants
  - Error: Red variants
  - Info: Blue variants

### Typography
- **Font Family**: System fonts (Inter-like)
- **Headings**: Bold, gradient text effects
- **Body**: Regular weight, good contrast
- **Small Text**: Lighter weight for secondary info

### Layout System
- **Container**: Max-width 7xl (1280px)
- **Spacing**: Tailwind spacing scale (px-4, py-6, etc.)
- **Grid**: Responsive grid system (1-3 columns)
- **Cards**: Rounded corners, backdrop blur, subtle shadows

---

## 📱 Page Structure & Wireframes

### 1. 🏠 HOME PAGE (`/`)

#### Header Navigation
```
[🗺️ BudgetTravel] ─────────────────────── [Budget Search] [Chat] [Translate] [Sign In] [Get Started]
```

#### Hero Section
```
┌─────────────────────────────────────────────────────────────────┐
│                    DISCOVER AMAZING DESTINATIONS                │
│                        WITHIN YOUR BUDGET                       │
│                                                                │
│        Stop browsing expensive options you can't afford        │
│      Find tourist places tailored to your financial limits     │
│                                                                │
│  ┌───────────────────────────────────────────────────────────┐  │
│  │              BUDGET SEARCH COMPONENT                      │  │
│  │ [From] [To] [Budget] [Duration] [🔍 Search Destinations] │  │
│  └───────────────────────────────────────────────────────────┘  │
└─────────────────────────────────────────────────────────────────┘
```

#### Recommended Destinations Section
```
┌─────────────────────────────────────────────────────────────────┐
│                    RECOMMENDED DESTINATIONS                     │
│                                                                │
│  ┌─────────────────┐    ┌─────────────────┐                   │
│  │ 🏯 Bangkok      │    │ 🏰 Prague       │                   │
│  │ Thailand        │    │ Czech Republic  │                   │
│  │ ⭐ 4.8 • 7 days │    │ ⭐ 4.7 • 6 days │                   │
│  │ $800-1200       │    │ $900-1300       │                   │
│  │ [View Details]  │    │ [View Details]  │                   │
│  └─────────────────┘    └─────────────────┘                   │
│                                                                │
│  ┌─────────────────┐    ┌─────────────────┐                   │
│  │ 🌊 Lisbon       │    │ 🌮 Mexico City  │                   │
│  │ Portugal        │    │ Mexico          │                   │
│  │ ⭐ 4.6 • 8 days │    │ ⭐ 4.5 • 7 days │                   │
│  │ $1000-1500      │    │ $700-1000       │                   │
│  │ [View Details]  │    │ [View Details]  │                   │
│  └─────────────────┘    └─────────────────┘                   │
└─────────────────────────────────────────────────────────────────┘
```

#### AI Tools Section
```
┌─────────────────────────────────────────────────────────────────┐
│                         AI TRAVEL ASSISTANT                     │
│                                                                │
│  ┌──────────────────────────────────────────────────────────┐   │
│  │ 🤖 Chat with our AI for personalized recommendations    │   │
│  │ [Type your travel question here...]                     │   │
│  └──────────────────────────────────────────────────────────┘   │
│                                                                │
│                           TRAVEL TOOLS                         │
│                                                                │
│  ┌─────────────────┐    ┌─────────────────┐                   │
│  │ 💰 EXPENSE      │    │ 📸 IMAGE        │                   │
│  │    ESTIMATOR    │    │    TRANSLATOR   │                   │
│  │                 │    │                 │                   │
│  │ Calculate costs │    │ Find similar    │                   │
│  │ for your trip   │    │ destinations    │                   │
│  └─────────────────┘    └─────────────────┘                   │
└─────────────────────────────────────────────────────────────────┘
```

---

### 2. 🔐 AUTHENTICATION PAGES

#### Sign In Page (`/signin`)
```
┌─────────────────────────────────────────────────────────────────┐
│                     [🗺️ BudgetTravel]                          │
│                                                                │
│                        WELCOME BACK                            │
│                                                                │
│  ┌───────────────────────────────────────────────────────────┐  │
│  │                    SIGN IN FORM                           │  │
│  │                                                           │  │
│  │  📧 Email: [________________]                            │  │
│  │  🔒 Password: [________________] [👁️]                   │  │
│  │                                                           │  │
│  │              [🔓 Sign In]                                 │  │
│  │                                                           │  │
│  │  ─────────────── OR ───────────────                      │  │
│  │                                                           │  │
│  │  [📱 Continue with Google] [🐙 Continue with GitHub]     │  │
│  │                                                           │  │
│  │  Don't have an account? [Sign up for free]               │  │
│  └───────────────────────────────────────────────────────────┘  │
└─────────────────────────────────────────────────────────────────┘
```

#### Get Started (Sign Up) Page (`/get-started`)
```
Multi-step onboarding wizard:

Step 1: Travel Style
┌─────────────────────────────────────────────────────────────────┐
│                    WHAT'S YOUR TRAVEL STYLE?                   │
│                                                                │
│  ┌─────────────┐ ┌─────────────┐ ┌─────────────┐ ┌────────────┐ │
│  │ 🎒 BUDGET   │ │ 🏨 COMFORT  │ │ ✨ LUXURY   │ │ 🚐 NOMAD   │ │
│  │ BACKPACKER  │ │ TRAVELER    │ │ EXPERIENCE  │ │ LIFESTYLE  │ │
│  └─────────────┘ └─────────────┘ └─────────────┘ └────────────┘ │
│                          [← Back] [Continue →]                  │
└─────────────────────────────────────────────────────────────────┘

Step 2: Budget Range
Step 3: Destinations
Step 4: Personal Info + Account Creation
```

---

### 3. 💳 COST SHEETS MANAGEMENT

#### Cost Sheets Dashboard (`/cost-sheets`)
```
┌─────────────────────────────────────────────────────────────────┐
│ [🗺️ BudgetTravel • Cost Sheets] ────────── [Settings] [Logout] │
│                                                                │
│                   YOUR TRIP COST SHEETS                        │
│              Manage and track expenses for all trips           │
│                                                                │
│                                          [➕ New Cost Sheet]   │
│                                                                │
│  [🔍 All (3)] [📝 Draft (1)] [▶️ Active (1)] [✅ Complete (1)] │
│                                                                │
│  ┌───────────────────────────────────────────────────────────┐  │
│  │ 🏖️ Cox's Bazar Trip                            [Draft]   │  │
│  │ 📍 Cox's Bazar • Created Jan 24                          │  │
│  │ 💰 USD 0.00 • Family trip for 5 days                    │  │
│  │                                    [👁️ View] [✏️ Edit]   │  │
│  └───────────────────────────────────────────────────────────┘  │
│                                                                │
│  ┌───────────────────────────────────────────────────────────┐  │
│  │ 🏔️ Bangkok Adventure                          [Active]   │  │
│  │ 📍 Bangkok • Created Jan 20                              │  │
│  │ 💰 USD 1,250.75 • Solo backpacking trip                 │  │
│  │                                    [👁️ View] [✏️ Edit]   │  │
│  └───────────────────────────────────────────────────────────┘  │
└─────────────────────────────────────────────────────────────────┘
```

#### Individual Cost Sheet (`/cost-sheets/[id]`)
```
┌─────────────────────────────────────────────────────────────────┐
│ [🗺️ BudgetTravel • Cost Sheets • Cox's Bazar Trip] [← Back]    │
│                                                                │
│                    COX'S BAZAR TRIP                            │
│              📍 Cox's Bazar • Created Jan 24 • [Draft]         │
│                     Family trip for 5 days                     │
│                                                                │
│                                          [➕ Add Expense]      │
│                                                                │
│ ┌─────────────────┐ ┌─────────────────────────────────────────┐ │
│ │ 💰 TOTAL        │ │            EXPENSE DETAILS              │ │
│ │    EXPENSES     │ │                                         │ │
│ │                 │ │  ┌─────────────────────────────────────┐ │ │
│ │   USD 1,250     │ │  │ 🍽️ Food • Lunch at restaurant      │ │ │
│ │                 │ │  │ Jan 24 • USD 50.75                 │ │ │
│ │ 12 expenses     │ │  │                        [✏️] [🗑️] │ │ │
│ │ recorded        │ │  └─────────────────────────────────────┘ │ │
│ │                 │ │                                         │ │
│ │ BY CATEGORY     │ │  ┌─────────────────────────────────────┐ │ │
│ │ 🏨 Hotels $500  │ │  │ 🏨 Hotel • Beach resort booking    │ │ │
│ │ 🍽️ Food $300   │ │  │ Jan 23 • USD 120.00               │ │ │
│ │ ✈️ Travel $350  │ │  │                        [✏️] [🗑️] │ │ │
│ │ 🎯 Activities   │ │  └─────────────────────────────────────┘ │ │
│ │    $100         │ │                                         │ │
│ └─────────────────┘ └─────────────────────────────────────────┘ │
└─────────────────────────────────────────────────────────────────┘
```

---

### 4. 🌍 DESTINATION DETAILS

#### Destination Page (`/destination/[id]`)
```
┌─────────────────────────────────────────────────────────────────┐
│ [← Back to Destinations]          🏯 Bangkok, Thailand          │
│                    📍 Thailand • ⭐ 4.8 • ⏰ 7 days • 💰 $800-1200│
│                                                                │
│ [📅 Itinerary] [📦 Packages] [🏨 Hotels] [✈️ Flights] [🍽️ Rest] [👥 Guides] │
│                                                                │
│ SELECTED TAB CONTENT:                                          │
│                                                                │
│ Hotels Tab:                                                    │
│  ┌───────────────────────────────────────────────────────────┐  │
│  │ 🏨 Khao San Palace Hotel                    $35/night    │  │
│  │ ⭐ 4.2 • Khao San Road • 0.5km from center              │  │
│  │ 📸[🏨][🛏️][🏊][🍳] WiFi • Pool • Gym • Breakfast        │  │
│  │ "Great location, clean rooms, helpful staff..."          │  │
│  │                                          [📖 Book Now]   │  │
│  └───────────────────────────────────────────────────────────┘  │
│                                                                │
│  ┌───────────────────────────────────────────────────────────┐  │
│  │ 🏩 Silom Boutique Inn                       $48/night    │  │
│  │ ⭐ 4.5 • Silom District • 1.2km from center             │  │
│  │ 📸[🏩][☕][🏋️][🍽️] WiFi • Coffee • Gym                │  │
│  │ "Beautiful rooms, great breakfast, perfect location..."  │  │
│  │                                          [📖 Book Now]   │  │
│  └───────────────────────────────────────────────────────────┘  │
└─────────────────────────────────────────────────────────────────┘
```

---

### 5. 💳 PAYMENT & BOOKING

#### Payment Page (`/payment`)
```
┌─────────────────────────────────────────────────────────────────┐
│                         SECURE CHECKOUT                        │
│                                                                │
│ ┌─────────────────┐ ┌─────────────────────────────────────────┐ │
│ │ ORDER SUMMARY   │ │           PAYMENT DETAILS               │ │
│ │                 │ │                                         │ │
│ │ 🏨 Hotel Booking│ │  💳 Payment Method                      │ │
│ │                 │ │  ┌─────────────────────────────────────┐ │ │
│ │ Khao San Palace │ │  │ [💳] Credit Card                   │ │ │
│ │ Hotel           │ │  │ [💰] PayPal                        │ │ │
│ │                 │ │  │ [🏦] Bank Transfer                 │ │ │
│ │ Check-in:       │ │  └─────────────────────────────────────┘ │ │
│ │ Mar 15, 2024    │ │                                         │ │
│ │ Check-out:      │ │  Card Details:                          │ │
│ │ Mar 18, 2024    │ │  Card Number: [____-____-____-____]     │ │
│ │ Guests: 2       │ │  Expiry: [__/__] CVV: [___]             │ │
│ │ Rooms: 1        │ │  Name: [_________________]              │ │
│ │                 │ │                                         │ │
│ │ Subtotal: $105  │ │  Billing Address:                       │ │
│ │ Taxes: $15      │ │  [Address fields...]                    │ │
│ │ Total: $120     │ │                                         │ │
│ │                 │ │           [🔒 Complete Payment]         │ │
│ └─────────────────┘ └─────────────────────────────────────────┘ │
└─────────────────────────────────────────────────────────────────┘
```

---

## 🎯 Component Specifications

### Navigation Component
- **Fixed header** with backdrop blur
- **Responsive design** - collapses to hamburger on mobile
- **Authentication aware** - shows different options based on login state
- **Gradient branding** with logo and app name

### Card Components
- **Consistent styling**: `bg-white/90 backdrop-blur-sm border-white/20`
- **Hover effects**: `hover:shadow-lg transition-all duration-300`
- **Rounded corners**: `rounded-lg`
- **Responsive layouts**: Grid systems that adapt to screen size

### Form Components
- **Consistent input styling**: Focus rings, proper padding
- **Validation states**: Error, success, loading states
- **Accessibility**: Proper labels, ARIA attributes
- **Progressive enhancement**: Multi-step forms with clear navigation

### Button Styles
- **Primary**: Gradient backgrounds `from-blue-600 to-purple-600`
- **Secondary**: Outline buttons with hover states
- **Loading states**: Spinner animations
- **Icon integration**: Lucide React icons

### Color System
- **Status indicators**:
  - Draft: Gray
  - Active: Blue
  - Completed: Green
  - Error: Red
  - Warning: Amber

---

## 📱 Responsive Design

### Breakpoints
- **Mobile**: < 768px (sm)
- **Tablet**: 768px - 1024px (md)
- **Desktop**: > 1024px (lg, xl)

### Layout Adaptations
- **Navigation**: Hamburger menu on mobile
- **Grids**: 1 column mobile → 2 columns tablet → 3 columns desktop
- **Cards**: Stack vertically on mobile, side-by-side on desktop
- **Forms**: Single column on mobile, multi-column on desktop

---

## 🎨 Visual Hierarchy

### Typography Scale
- **H1**: 3xl (48px) - Page titles
- **H2**: 2xl (32px) - Section headers  
- **H3**: xl (24px) - Card titles
- **H4**: lg (18px) - Component titles
- **Body**: base (16px) - Main content
- **Small**: sm (14px) - Secondary info
- **Tiny**: xs (12px) - Labels, badges

### Spacing System
- **Sections**: py-16 (64px vertical)
- **Cards**: p-6 (24px all sides)
- **Elements**: gap-4 (16px between items)
- **Tight**: gap-2 (8px between related items)

---

This specification provides a comprehensive overview of your Budget Travel app's UI/UX design. You can use this as a reference to create actual visual prototypes in Figma, Adobe XD, or any design tool of your choice. The design system ensures consistency across all pages and components.