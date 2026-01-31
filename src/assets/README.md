# Image assets

Replace the placeholder SVGs with images generated via **nano-banana-pro** per [docs/image-generation-plan.md](../../docs/image-generation-plan.md).

## Core four (from image-generation plan)

| File | Size | Prompt (see image-generation-plan.md) |
|------|------|----------------------------------------|
| hero-tutor-interface.png | 1200×800 | Student with personalized tutor dashboard on screen |
| tutor-interaction.png | 1000×600 | Tutor providing feedback, student engaged |
| how-tutor-works.png | 1200×400 (3 panels) | Diagnostic → Plan → Practice |
| analytics-dashboard.png | 1400×900 | Skill mastery breakdown, progress chart, weakness list |

## Generate with nano-banana-pro

```bash
uv run ~/.codex/skills/nano-banana-pro/scripts/generate_image.py \
  --prompt "<prompt>" \
  --filename "<name>.png" \
  --resolution 2K
```

Save outputs into this directory, then replace placeholder references in Hero, HowItWorks, PersonalTutor, Testimonials, and analytics as needed.

## Extended set (Testimonials, Trainers)

See docs/image-generation-plan.md for style (modern, clean, educational, SAT-themed, diverse).
