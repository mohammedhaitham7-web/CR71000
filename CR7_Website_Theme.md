# CR7 Website — Theme & Design System
> Ready to paste into Claude Code to build the website.
> All colors pulled from the official kits of every club and national team CR7 played for.

---

## 🎨 The Concept

The website uses a **dark base** (inspired by Juventus black) with each section of the career timeline shifting into that club's signature color. Portugal anchors the hero with its navy blue, and gold from Al Nassr is used for highlights and milestone moments — giving it a premium feel.

---

## 🟥🟩🟦⬜🟨⬛ Team Color Palette

### 🇵🇹 Portugal — National Team
| Name | Hex | Use |
|---|---|---|
| Portugal Navy | `#002B5C` | Hero section background, header |
| Portugal Red | `#D40C18` | Accents, active nav links, CTA buttons |
| Portugal Green | `#006600` | Secondary accents, hover states |
| Portugal Gold | `#C9A84C` | Borders, badge detail |

### 🔴 Manchester United
| Name | Hex | Use |
|---|---|---|
| United Red | `#DA291C` | Man Utd section background, headings |
| United Black | `#1A1A1A` | Text on red background |
| United Gold | `#FFE500` | Accent on Man Utd section |
| United White | `#FFFFFF` | Body text on dark red |

### 🟢 Sporting CP
| Name | Hex | Use |
|---|---|---|
| Sporting Green | `#006F3C` | Sporting CP section background |
| Sporting Yellow | `#FFD700` | Lion logo accent, highlights |
| Sporting White | `#FFFFFF` | Text on green |
| Sporting Dark | `#003D22` | Darker shade for depth |

### 🟡 Al Nassr
| Name | Hex | Use |
|---|---|---|
| Al Nassr Gold | `#C89B3C` | Al Nassr section background accent |
| Al Nassr Yellow | `#F5C518` | Highlight color, milestone badges |
| Al Nassr Blue | `#003087` | Secondary color for Al Nassr section |
| Al Nassr Dark | `#1A1200` | Background depth |

### ⬜ Real Madrid
| Name | Hex | Use |
|---|---|---|
| Madrid White | `#FFFFFF` | Real Madrid section background |
| Madrid Gold | `#C9A84C` | Crown/badge color, borders |
| Madrid Dark | `#1A1A1A` | Text on white background |
| Madrid Purple | `#6B2D8B` | Rare accent (old Madrid colors) |

### ⬛⬜ Juventus
| Name | Hex | Use |
|---|---|---|
| Juve Black | `#000000` | Juventus section, global dark base |
| Juve White | `#FFFFFF` | Text, stripes |
| Juve Gray | `#1F1F1F` | Card backgrounds, section dividers |
| Juve Pink | `#E8235B` | Away kit accent (optional) |

---

## 🖥️ Global CSS Variables

Paste this into your main `styles.css` or `global.css`:

```css
:root {
  /* === BASE (Juventus-inspired dark) === */
  --color-bg-base: #0D0D0D;
  --color-bg-card: #1A1A1A;
  --color-bg-surface: #252525;
  --color-text-primary: #FFFFFF;
  --color-text-secondary: #AAAAAA;
  --color-border: #333333;

  /* === HIGHLIGHT (Al Nassr Gold) === */
  --color-gold: #C89B3C;
  --color-gold-light: #F5C518;
  --color-gold-dark: #8B6914;

  /* === PORTUGAL === */
  --portugal-navy: #002B5C;
  --portugal-red: #D40C18;
  --portugal-green: #006600;
  --portugal-gold: #C9A84C;

  /* === MAN UTD === */
  --manutd-red: #DA291C;
  --manutd-black: #1A1A1A;
  --manutd-gold: #FFE500;
  --manutd-white: #FFFFFF;

  /* === SPORTING CP === */
  --sporting-green: #006F3C;
  --sporting-yellow: #FFD700;
  --sporting-dark: #003D22;
  --sporting-white: #FFFFFF;

  /* === REAL MADRID === */
  --madrid-white: #FFFFFF;
  --madrid-gold: #C9A84C;
  --madrid-dark: #1A1A1A;

  /* === JUVENTUS === */
  --juve-black: #000000;
  --juve-white: #FFFFFF;
  --juve-gray: #1F1F1F;

  /* === AL NASSR === */
  --alnassr-gold: #C89B3C;
  --alnassr-yellow: #F5C518;
  --alnassr-blue: #003087;
  --alnassr-dark: #1A1200;

  /* === TYPOGRAPHY === */
  --font-heading: 'Bebas Neue', 'Impact', sans-serif;
  --font-body: 'Inter', 'Helvetica Neue', sans-serif;
  --font-accent: 'Oswald', sans-serif;

  /* === SIZING === */
  --radius-card: 12px;
  --radius-badge: 50px;
  --shadow-card: 0 4px 24px rgba(0,0,0,0.5);
  --transition: all 0.3s ease;
}
```

---

## 📐 Section-by-Section Design

### 1. 🏠 Hero / Landing Section
```
Background: Portugal Navy (#002B5C) → Juve Black (#000000) gradient
Overlay: Subtle red glow (Portugal Red)
Main text: White + Gold
CTA Button: Portugal Red with Gold border
Stats bar at bottom: Gold (#C89B3C)
```

```css
.hero {
  background: linear-gradient(135deg, #002B5C 0%, #0D0D0D 60%, #000000 100%);
  color: #FFFFFF;
  position: relative;
  overflow: hidden;
}

.hero::before {
  content: '';
  position: absolute;
  top: 0; left: 0; right: 0; bottom: 0;
  background: radial-gradient(ellipse at top left, rgba(212,12,24,0.15) 0%, transparent 60%);
}

.hero h1 {
  font-family: var(--font-heading);
  color: #FFFFFF;
  text-shadow: 0 0 40px rgba(200, 155, 60, 0.4);
}

.hero .cta-btn {
  background: #D40C18;
  border: 2px solid #C89B3C;
  color: #FFFFFF;
  border-radius: var(--radius-badge);
}
```

---

### 2. 📊 Career Stats Bar (Global)
```
Background: Juve Black
Accent line: Gold (#C89B3C)
Numbers: Gold
Labels: White
```

```css
.stats-bar {
  background: #0D0D0D;
  border-top: 3px solid #C89B3C;
  border-bottom: 3px solid #C89B3C;
}

.stats-bar .stat-number {
  color: #C89B3C;
  font-family: var(--font-heading);
  font-size: 3rem;
}

.stats-bar .stat-label {
  color: #AAAAAA;
  text-transform: uppercase;
  letter-spacing: 0.1em;
}
```

---

### 3. 🟢 Sporting CP Section (2002–2003)
```
Background: Sporting Green (#006F3C)
Accent: Sporting Yellow (#FFD700)
Text: White
Card bg: Darker green (#003D22)
Badge: Yellow on green
```

```css
.section-sporting {
  background: linear-gradient(180deg, #006F3C 0%, #003D22 100%);
  color: #FFFFFF;
}

.section-sporting .club-badge {
  border: 3px solid #FFD700;
  box-shadow: 0 0 20px rgba(255, 215, 0, 0.3);
}

.section-sporting .stat-card {
  background: rgba(0, 61, 34, 0.8);
  border-left: 4px solid #FFD700;
}

.section-sporting h2 {
  color: #FFD700;
}
```

---

### 4. 🔴 Manchester United Section (2003–2009 & 2021–2022)
```
Background: United Red (#DA291C)
Accent: United Gold (#FFE500)
Text: White
Card bg: Darker red (#8B0000)
Stripe detail: Gold/Black
```

```css
.section-manutd {
  background: linear-gradient(180deg, #DA291C 0%, #8B0000 100%);
  color: #FFFFFF;
}

.section-manutd .club-badge {
  border: 3px solid #FFE500;
  box-shadow: 0 0 20px rgba(255, 229, 0, 0.4);
}

.section-manutd .stat-card {
  background: rgba(139, 0, 0, 0.7);
  border-left: 4px solid #FFE500;
}

.section-manutd h2 {
  color: #FFE500;
}

.section-manutd .divider {
  background: repeating-linear-gradient(
    90deg,
    #FFE500 0px, #FFE500 4px,
    #DA291C 4px, #DA291C 20px
  );
  height: 4px;
}
```

---

### 5. ⬜🏆 Real Madrid Section (2009–2018)
```
Background: Madrid White (#FFFFFF) or very light gray
Accent: Madrid Gold (#C9A84C)
Text: Dark (#1A1A1A)
Card bg: White with gold border
Shadow: Gold glow
```

```css
.section-madrid {
  background: linear-gradient(180deg, #F5F5F5 0%, #FFFFFF 50%, #F0EBE0 100%);
  color: #1A1A1A;
}

.section-madrid .club-badge {
  border: 3px solid #C9A84C;
  box-shadow: 0 0 30px rgba(201, 168, 76, 0.5);
}

.section-madrid .stat-card {
  background: #FFFFFF;
  border: 1px solid #C9A84C;
  box-shadow: 0 4px 20px rgba(201, 168, 76, 0.2);
}

.section-madrid h2 {
  color: #C9A84C;
  font-family: var(--font-heading);
}

.section-madrid .goal-count {
  color: #C9A84C;
  font-size: 5rem;
}
```

---

### 6. ⬛⬜ Juventus Section (2018–2021)
```
Background: Juve Black (#000000)
Accent: Juve White (#FFFFFF)
Detail: Diagonal black/white stripes (the jersey)
Text: White
Card bg: Dark gray (#1F1F1F)
```

```css
.section-juventus {
  background: #000000;
  color: #FFFFFF;
  position: relative;
}

.section-juventus::after {
  content: '';
  position: absolute;
  top: 0; right: 0;
  width: 40%;
  height: 100%;
  background: repeating-linear-gradient(
    -45deg,
    transparent 0px, transparent 20px,
    rgba(255,255,255,0.03) 20px, rgba(255,255,255,0.03) 40px
  );
  pointer-events: none;
}

.section-juventus .stat-card {
  background: #1F1F1F;
  border: 1px solid #333333;
}

.section-juventus h2 {
  color: #FFFFFF;
  border-bottom: 3px solid #FFFFFF;
  display: inline-block;
  padding-bottom: 8px;
}
```

---

### 7. 🟡 Al Nassr Section (2023–Present)
```
Background: Al Nassr Dark → Gold gradient
Accent: Gold (#F5C518) + Blue (#003087)
Text: Dark on gold, White on dark
Card bg: Dark gold tint
Badge: Gold crown detail
```

```css
.section-alnassr {
  background: linear-gradient(135deg, #1A1200 0%, #2D2000 50%, #1A1200 100%);
  color: #FFFFFF;
  position: relative;
}

.section-alnassr::before {
  content: '';
  position: absolute;
  inset: 0;
  background: radial-gradient(ellipse at center, rgba(245, 197, 24, 0.08) 0%, transparent 70%);
}

.section-alnassr .club-badge {
  border: 3px solid #F5C518;
  box-shadow: 0 0 40px rgba(245, 197, 24, 0.4);
}

.section-alnassr .stat-card {
  background: rgba(200, 155, 60, 0.1);
  border: 1px solid #C89B3C;
}

.section-alnassr h2 {
  color: #F5C518;
}

.section-alnassr .goal-count {
  color: #F5C518;
  text-shadow: 0 0 30px rgba(245, 197, 24, 0.6);
}
```

---

### 8. 🏅 Goals Tracker / Milestone Section
```
Background: Dark base (#0D0D0D)
Progress bar: Gold gradient
Milestone markers: Team colors at each club's contribution
Number 971: Giant gold display
```

```css
.goals-tracker {
  background: #0D0D0D;
}

.progress-bar-container {
  background: #1A1A1A;
  border-radius: 50px;
  overflow: hidden;
  height: 20px;
}

.progress-bar-fill {
  background: linear-gradient(90deg,
    #006F3C 0%,       /* Sporting */
    #DA291C 10%,      /* Man Utd 1st spell */
    #C9A84C 48%,      /* Real Madrid */
    #1F1F1F 62%,      /* Juventus */
    #DA291C 68%,      /* Man Utd 2nd */
    #F5C518 97.1%     /* Al Nassr */
  );
  border-radius: 50px;
  height: 100%;
  transition: width 1.5s ease;
}

.milestone-number {
  font-family: var(--font-heading);
  font-size: clamp(5rem, 15vw, 12rem);
  color: #C89B3C;
  line-height: 1;
  text-shadow: 0 0 60px rgba(200, 155, 60, 0.3);
}
```

---

## 🔤 Typography

```css
/* Import from Google Fonts */
@import url('https://fonts.googleapis.com/css2?family=Bebas+Neue&family=Oswald:wght@400;600&family=Inter:wght@300;400;600;700&display=swap');

/* Headings — Bold & Athletic */
h1, h2, h3 {
  font-family: 'Bebas Neue', 'Impact', sans-serif;
  letter-spacing: 0.05em;
  text-transform: uppercase;
}

/* Section Labels */
.section-label {
  font-family: 'Oswald', sans-serif;
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 0.2em;
  font-size: 0.8rem;
}

/* Body */
p, li, td {
  font-family: 'Inter', sans-serif;
  font-weight: 400;
  line-height: 1.7;
}

/* Stats / Numbers */
.stat-number, .goal-count {
  font-family: 'Bebas Neue', sans-serif;
  font-size: 4rem;
  line-height: 1;
}
```

---

## 🗂️ Website Sections (Planned)

| Section | Theme Color | Content |
|---|---|---|
| Hero / Landing | Portugal Navy + Black | CR7 photo, name, 971 goals stat |
| Career Timeline | Per-club colors | Each club era with stats |
| Goals Tracker | Gold on Black | Progress to 1,000, full goals table |
| Sporting CP | Green | 2002–2003, first goals |
| Manchester United | Red | 2003–2009 & 2021–2022 |
| Real Madrid | White + Gold | 2009–2018, peak era, 450 goals |
| Juventus | Black + White | 2018–2021 |
| Al Nassr | Gold on Dark | 2023–present, road to 1,000 |
| Portugal | Navy + Red | 143 goals, World Records |
| Records & Awards | Gold on Black | Ballon d'Or x5, records |
| Gallery | Mixed | Photos from all eras |

---

## 💡 Claude Code Instructions

When building the website, paste this into your Claude Code prompt:

```
Build a CR7 tribute website using the design system in CR7_Website_Theme.md.
Use the CSS variables defined in the :root block.
Each club section must use its designated color palette.
The base background is #0D0D0D (Juventus black).
Global accent/highlight color is #C89B3C (Al Nassr gold).
Typography: Bebas Neue for headings, Inter for body.
The hero section uses Portugal Navy (#002B5C) to black gradient.
Make it fully responsive. Mobile-first.
```

---

*Last updated: May 18, 2026*
