# Image Generation Plan

## Images Needed

### Hero Section
- **Current**: Generic student images from Unsplash
- **Needed**: Student with personalized tutor interface visible on screen
- **Prompt**: "High school student studying SAT prep on laptop, personalized tutor dashboard visible on screen showing skill breakdown and practice recommendations, modern study environment, encouraging atmosphere"
- **Size**: 1200x800px
- **File**: `src/assets/hero-tutor-interface.png`

### Personal Tutor Section
- **Current**: None (text-only)
- **Needed**: Visual representation of tutor-student interaction
- **Prompt**: "Illustration showing personalized tutor providing feedback to student, tutor interface showing 'Great job!' message and skill progress, student looking engaged and confident"
- **Size**: 1000x600px
- **File**: `src/assets/tutor-interaction.png`

### How It Works
- **Current**: Generic student learning image
- **Needed**: Step-by-step tutor interaction graphics
- **Prompt**: "Three-panel illustration: 1) Tutor assessing student with diagnostic test, 2) Tutor creating personalized plan on screen, 3) Tutor guiding practice with instant feedback"
- **Size**: 1200x400px (3 panels)
- **File**: `src/assets/how-tutor-works.png`

### Analytics Dashboard Mockup
- **Current**: None
- **Needed**: Visual mockup of analytics dashboard
- **Prompt**: "Modern analytics dashboard showing skill mastery breakdown, progress chart, weakness list, clean and professional design"
- **Size**: 1400x900px
- **File**: `src/assets/analytics-dashboard.png`

## Implementation Steps

1. Use `nano-banana-pro` skill to generate images:
   ```bash
   uv run ~/.codex/skills/nano-banana-pro/scripts/generate_image.py \
     --prompt "<prompt>" \
     --filename "hero-tutor-interface.png" \
     --resolution 2K
   ```

2. Or use `openai-image-gen` skill:
   ```bash
   python3 ~/.nvm/versions/node/v22.17.0/lib/node_modules/clawdbot/skills/openai-image-gen/scripts/gen.py \
     --prompt "<prompt>" \
     --count 1 \
     --size 1536x1024
   ```

3. Replace Unsplash URLs in components with local assets
4. Update alt text for accessibility
5. Optimize images for web (compress if needed)

## Current Placeholder Images

- Hero: `https://images.unsplash.com/photo-1523240795612-9a054b0db644`
- Hero secondary: `https://images.unsplash.com/photo-1548372290-8d01b6c8e78c`
- How It Works: `https://images.unsplash.com/photo-1516321318423-f06f85e504b3`
- Testimonials: Multiple Unsplash profile images

## Notes

- Images should maintain consistent style (modern, clean, educational)
- Use SAT-themed elements (test materials, score reports, practice questions)
- Show diversity in student representation
- Ensure images are optimized for web performance
