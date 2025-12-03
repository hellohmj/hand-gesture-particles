https://7042d3cb-0c26-4c42-9629-f4d13e68dff1-00-1e7vnnax0qrvg.picard.replit.dev/

# Design Guidelines: Hand Gesture Particle System

## Design Approach
**Custom Creative Tool UI** - Drawing inspiration from Adobe Creative Suite, Three.js demos, and modern WebGL experiences. The design prioritizes the immersive 3D canvas while providing elegant, unobtrusive controls.

## Layout System

### Viewport Strategy
- **Full-screen 3D Canvas**: Occupies entire viewport as background layer
- **Floating UI Controls**: Overlaid with backdrop blur effect
- **Spacing Units**: Use Tailwind units of 2, 4, 6, and 8 for consistent rhythm

### Component Positioning
- **Control Panel**: Fixed position, top-right corner (top-8 right-8)
- **Fullscreen Button**: Fixed position, bottom-right corner (bottom-8 right-8)
- **Webcam Indicator**: Fixed position, top-left corner (top-8 left-8)

## Typography

### Font System
**Primary**: Inter (Google Fonts) for UI elements
- Labels: 14px (text-sm), font-medium
- Button text: 16px (text-base), font-semibold
- Status indicators: 12px (text-xs), font-normal

## Component Library

### 1. Main Canvas
- Full viewport dimensions (w-screen h-screen)
- Position: fixed with z-index: 0
- Contains Three.js renderer

### 2. Control Panel (Floating Card)
**Structure**:
- Semi-transparent backdrop with blur effect (backdrop-blur-md)
- Rounded corners (rounded-2xl)
- Padding: p-6
- Width: w-80
- Vertical stack layout with gap-6

**Panel Sections**:

**Model Selector Grid**:
- 5 buttons in grid layout (grid grid-cols-2 gap-3)
- Each button: aspect-square, rounded-xl, p-4
- Icon + Label layout (flex flex-col items-center gap-2)
- Icons: 32px size from Heroicons or Font Awesome
- Models: Heart, Flower, Saturn, Buddha, Fireworks

**Color Picker**:
- Label above (mb-2)
- HTML5 color input styled with custom wrapper
- Input: h-12 w-full rounded-lg cursor-pointer

**Gesture Status Display**:
- Real-time hand detection indicator
- Icon + text inline layout (flex items-center gap-2)
- Shows "Hand Detected" or "No Hand Detected"

### 3. Fullscreen Toggle Button
- Circular button (rounded-full)
- Size: w-14 h-14
- Icon-only (24px icon)
- Backdrop blur effect (backdrop-blur-md)

### 4. Webcam Indicator
- Small pill-shaped badge (rounded-full px-4 py-2)
- Icon + text layout (flex items-center gap-2)
- Pulsing animation on recording dot
- Backdrop blur effect (backdrop-blur-md)

### 5. Loading State
- Centered overlay during initialization
- Spinner icon (animate-spin)
- Loading text below (mt-4)

## Interaction Patterns

### Button States
- Default: subtle elevation
- Hover: scale-105 transform
- Active: scale-95 transform
- Selected (model buttons): distinct border treatment

### Panel Behavior
- Slide-in animation on load (animate-slide-in-right)
- Can be toggled to hide/show with hamburger icon
- Smooth opacity transitions (transition-all duration-300)

### Particle System Display
- Particles render continuously in canvas
- No frame or border around canvas
- Seamless full-bleed experience

## Responsive Considerations

### Desktop (Primary Experience)
- Control panel: full width as specified (w-80)
- All controls visible simultaneously

### Mobile/Tablet
- Control panel: full width with reduced padding (w-full px-4)
- Model selector: single column (grid-cols-1)
- Bottom sheet style positioning
- Simplified gesture instructions overlay

## Accessibility
- All buttons: proper focus states with focus-visible rings
- Color picker: labeled for screen readers
- Keyboard shortcuts for model switching (1-5 keys)
- Escape key to exit fullscreen
- Alt text for status icons

## Performance Considerations
- Minimize DOM reflows during particle updates
- Use CSS transforms for animations (not position changes)
- Debounce color picker changes (300ms)
- RequestAnimationFrame for smooth rendering

## Critical UI Elements Priority
1. 3D Canvas (highest z-index layer: particles)
2. Control Panel (interactive layer)
3. Fullscreen Button (always accessible)
4. Webcam Indicator (status feedback)
5. Loading State (initialization only)
## run by Node.js in Terminal
netstat -ano | findstr :5000

npm run dev
