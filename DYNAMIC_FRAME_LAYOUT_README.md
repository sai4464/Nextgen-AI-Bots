# Dynamic Frame Layout Integration

## Overview
This dynamic frame layout system has been successfully integrated into your NextGen AI BOTS website. It creates an interactive, modern tab/grid organization system that displays content in an engaging visual format.

## What Was Integrated

### ✅ Components Created
1. **`components/DynamicFrameLayout.tsx`** - Main grid layout component with:
   - 3x3 responsive grid (9 cells total)
   - Hover-to-expand animations
   - State management for hover effects
   - Customizable controls

2. **`components/FrameComponent.tsx`** - Individual frame component with:
   - Video display
   - Decorative corner and edge images
   - Zoom and border controls
   - Autoplay support (all videos or hover-only)

3. **Updated `components/hero.tsx`** - New hero section featuring:
   - Left: Your existing text content
   - Right: Dynamic frame layout grid

### ✅ Styling Added
- Added custom slider styles to `app/globals.css`
- Maintains Royal Flush theme compatibility
- Responsive design for mobile and desktop

## Current Setup

The frame layout currently displays **9 placeholder videos** from the template. To customize this for your organization:

### To Customize Videos

Edit `components/DynamicFrameLayout.tsx`, specifically the `initialFrames` array (lines 27-144). Each frame has:

```typescript
{
  id: 1,  // Unique identifier
  video: "YOUR_VIDEO_URL_HERE",  // Video URL
  defaultPos: { x: 0, y: 0, w: 4, h: 4 },  // Grid position
  corner: "CORNER_IMAGE_URL",  // Decorative corner
  edgeHorizontal: "EDGE_IMAGE_URL",  // Horizontal edge
  edgeVertical: "EDGE_IMAGE_URL",  // Vertical edge
  mediaSize: 1,  // Zoom level
  borderThickness: 0,  // Border width
  borderSize: 80,  // Border size percentage
  autoplayMode: "all",  // "all" or "hover"
  isHovered: false
}
```

### Grid Layout (3x3)
```
Position Map (x, y coordinates):
[0,0] [4,0] [8,0]
[0,4] [4,4] [8,4]
[0,8] [4,8] [8,8]
```

## Key Features

1. **Hover Effects**: Hovering over a cell expands it while shrinking others
2. **Smooth Animations**: All transitions use Framer Motion
3. **Responsive**: Adapts to different screen sizes
4. **Customizable**: Adjust gap size, hover size, media zoom, etc.
5. **Clean Interface**: Hidden controls by default for production use

## Controls Available (Hidden by Default)

To show controls, modify `components/DynamicFrameLayout.tsx`:
- Change `cleanInterface` initial state to `false`
- Uncomment the control panel sections

Available controls:
- Hover Size: How much cells expand on hover (default: 6)
- Gap Size: Spacing between cells (default: 4px)
- Per-frame: Media size, border thickness, border size

## Design Integration

The layout integrates seamlessly with your existing design:
- Uses Royal Flush theme colors
- Maintains dark background aesthetic
- Respects responsive breakpoints
- Preserves existing hero section text on the left

## Next Steps

1. **Replace placeholder videos** with your organization's content:
   - Robotics build sessions
   - Competition highlights
   - Student showcases
   - Workshop sessions
   - Team introductions
   - etc.

2. **Add decorative frames** (optional):
   - Create corner and edge images
   - Update URLs in the frame data
   - Toggle `showFrames` state to display

3. **Adjust layout parameters**:
   - Modify `GRID_SIZE` for different grid dimensions
   - Adjust `hoverSize` for expansion effect
   - Customize animation timings

## Files Modified

- ✅ `components/DynamicFrameLayout.tsx` (NEW)
- ✅ `components/FrameComponent.tsx` (NEW)
- ✅ `components/hero.tsx` (UPDATED)
- ✅ `app/globals.css` (UPDATED with slider styles)

## Dependencies Used

All dependencies were already installed in your project:
- `framer-motion` ^12.23.12
- `@radix-ui/react-slider` (via shadcn/ui)
- `@radix-ui/react-switch` (via shadcn/ui)

## Browser Compatibility

- Modern browsers (Chrome, Firefox, Safari, Edge)
- Responsive mobile support
- Smooth animations via Framer Motion
- Hardware-accelerated transforms

## Questions or Issues?

If you need to:
- Customize the layout further
- Replace videos with images
- Add click-to-navigate functionality
- Adjust animation timing
- Change grid dimensions

Refer to the component source files and adjust as needed!

