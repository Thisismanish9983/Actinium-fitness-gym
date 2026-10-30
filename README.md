# ActiniumFitness — Premium Athletic Gym Website Template

**ActiniumFitness** is a premium, powerful, and modern gym website template engineered for strength and conditioning facilities, bodybuilding clubs, athletic performance centers, and elite personal trainers. 

Built strictly with clean semantic **HTML5, modern CSS3, and Vanilla JavaScript**, this template requires **no frameworks, no bundlers, and no build tools**. It runs directly by opening `index.html` in any web browser.

---

## 📸 Brand Identity & Logo
The website features an ultra-luxury, pristine white athletic aesthetic combined with the electric sapphire tones of the official **Actinium Fitness** emblem:
- **Logo File:** `assets/images/actiniumfitness-logo.png`
- **Extracted Quality:** Preserves original metallic chrome lettering, 3D triangular prism badge, electric cyan halo glow, and circular dark navy backing with transparent corner padding.
- **Brand Colors (Sampled directly from the official logo emblem):**
  - **Pristine White Theme Surfaces:** `#ffffff`, `#f8fafc`, `#f1f5f9`
  - **Logo Sapphire Electric Blue:** `#1391cc`, `#0c6996`, `#e0f2fe`
  - **High-Contrast Obsidian & Charcoal:** `#0a0f1d`, `#1e293b`, `#334155`, `#64748b`

---

## 🗂️ Project Structure

```text
gym website/
├── index.html                   # Homepage (Hero, Programs, Advantage, Trainers, Pricing, Testimonials, FAQ)
├── about.html                   # About the Facility, History, 4 Pillars of Progress, Arena Zones
├── programs.html                # Workout Programs (Filterable: Strength, Hypertrophy, Metabolic, 1-on-1)
├── trainers.html                # Master Coaching Staff, Credentials, Bios, Specializations
├── membership.html              # Membership Tiers (Monthly/Annual toggle, Day Passes, Comparison Matrix)
├── contact.html                 # Contact Form, Arena Location, Hours, Trial Booking
├── README.md                    # Template documentation, customization guide, packaging instructions
├── LICENSE.txt                  # Template usage and asset license terms
└── assets/
    ├── css/
    │   └── style.css            # Responsive CSS3 styles, CSS variables, glassmorphic cards, neon glows
    ├── js/
    │   └── main.js              # Vanilla JS: mobile menu, pricing toggle, stats counter, client validation, modal
    └── images/
        ├── actiniumfitness-logo.png  # Official extracted ActiniumFitness logo
        ├── favicon.png               # High-res favicon
        ├── hero-bg.jpg               # Atmospheric gym hero background
        ├── program-strength.jpg      # Strength Training program banner
        ├── program-muscle.jpg        # Muscle Building / Hypertrophy banner
        ├── program-fatloss.jpg       # Metabolic fat loss & HIIT banner
        ├── program-personal.jpg      # 1-on-1 elite coaching banner
        ├── about-facility.jpg        # State-of-the-art arena showcase
        ├── facility-olympic.jpg      # Olympic power cages & Eleiko platforms
        ├── facility-recovery.jpg     # Contrast therapy cryo & sauna spa
        ├── facility-cardio.jpg       # Metabolic sprint turf & cardio deck
        ├── trainer-1.jpg             # Marcus Vance portrait
        ├── trainer-2.jpg             # Elena Rostova portrait
        ├── trainer-3.jpg             # David Chen portrait
        ├── trainer-4.jpg             # Sarah Jenkins portrait
        ├── avatar-1.png              # Member testimonial avatar 1
        ├── avatar-2.png              # Member testimonial avatar 2
        └── avatar-3.png              # Member testimonial avatar 3
```

---

## 🚀 How to Run & Preview Locally

### Method 1: Direct File Opening (No Server Needed)
1. Navigate to the project directory in your file explorer.
2. Double-click `index.html` (or right-click and choose **Open with Google Chrome / Firefox / Edge / Safari**).
3. All navigation links, modals, counters, and responsive behaviors work seamlessly offline.

### Method 2: Local Development Server (Recommended for Live Preview)
If you have Python or Node installed, you can launch a local HTTP server:

**Using Python 3:**
```bash
python -m http.server 8000
```
Then visit `http://localhost:8000` in your browser.

**Using Node / npx:**
```bash
npx serve .
```

**Using VS Code Live Server Extension:**
Right-click `index.html` inside VS Code and choose **"Open with Live Server"**.

---

## ⚙️ Key Functional Features

1. **Responsive Mobile Navigation:** Full-screen animated mobile menu with keyboard `Escape` dismissal, focus restoration, and accessible `aria-expanded` attributes.
2. **Pricing Switcher:** Dynamic toggle between monthly and discounted annual billing, recalculating prices live across all membership tiers.
3. **Plan Auto-Selection:** Clicking "Select Plan" stores the user's tier preference and automatically pre-fills the inquiry dropdown on `contact.html`.
4. **Interactive Program Filter:** Filter training tracks smoothly by category (*Strength & Power*, *Hypertrophy*, *Fat Loss & HIIT*, *1-on-1 Coaching*).
5. **Client-Side Form Validation:** Real-time validation for contact and trial reservation forms with modern `:user-valid` and `:user-invalid` styling.
6. **Accessible VIP Free Pass Modal:** Native HTML5 `<dialog>` component with smooth backdrop blur, keyboard trap, and client-side confirmation message.
7. **Animated Statistic Counters:** IntersectionObserver-triggered smooth cubic ease-out number counters for key arena metrics.
8. **Semantic & Keyboard Accessible:** Includes skip-to-content anchor, high-contrast text ratios, explicit button types, and readable labels.

---

## 🎨 How to Customize

### 1. Colors & Neon Glows
Open `assets/css/style.css` and modify the `:root` variables:
```css
:root {
  --electric-blue: #00f0ff;       /* Accent neon cyan */
  --electric-blue-dark: #00b4d8;  /* Secondary blue */
  --bg-primary: #070a10;          /* Deepest obsidian background */
  --bg-secondary: #0c111a;        /* Card & section dark backing */
}
```

### 2. Changing Text & Content
Edit the HTML files (`index.html`, `about.html`, `programs.html`, `trainers.html`, `membership.html`, `contact.html`) directly in any text editor. All sections have clear class names and comment headings.

### 3. Connecting Real Form Backends
The contact and trial forms include client-side verification and friendly demo status messages. To send real emails or capture leads:
- **Formspree:** Change `<form id="contact-form" action="https://formspree.io/f/YOUR_ID" method="POST">`
- **EmailJS:** Call `emailjs.sendForm('YOUR_SERVICE_ID', 'YOUR_TEMPLATE_ID', form)` in `main.js`.
- **Netlify Forms:** Add `data-netlify="true"` to `<form>`.

---

## 📦 How to Package as a ZIP for TemplateTrip

When preparing the template for commercial distribution or sale:
1. Ensure all files (`index.html`, `about.html`, `programs.html`, `trainers.html`, `membership.html`, `contact.html`, `assets/`, `README.md`, `LICENSE.txt`) are present.
2. Exclude any temporary hidden files (e.g. `.git`, `.DS_Store`, or IDE caches).
3. Compress into a clean ZIP archive named `ActiniumFitness-HTML-Template.zip`:
   - **Windows:** Select the files, right-click &rarr; **Send to &rarr; Compressed (zipped) folder**.
   - **PowerShell:**
     ```powershell
     Compress-Archive -Path index.html, about.html, programs.html, trainers.html, membership.html, contact.html, README.md, LICENSE.txt, assets -DestinationPath ActiniumFitness-HTML-Template.zip
     ```

---

## 📄 License & Credits
- **Template Code:** Commercial and Personal License included under terms outlined in `LICENSE.txt`.
- **Logo:** Official ActiniumFitness logo extracted and formatted exclusively for this template.
- **Imagery & Icons:** Royalty-free original artwork and custom SVGs created for ActiniumFitness.
