# Neosho Security Solutions - Static Website

A premium, fully responsive multi-page static website for **Neosho Security Solutions**. Constructed using the Aura design export as the visual source of truth, utilizing HTML5, Tailwind CSS, GSAP (animations), and Lucide Icons.

---

## Project Structure

```text
/
├── index.html                  # Homepage (Aura export base)
├── services.html               # 8 Core security services detailed listing
├── about.html                  # About page (Who we are, brands, values)
├── gate-promotions.html        # Gate & garage automation promotion listings
├── contact.html                # Contact page & validated intake form
├── README.md                   # Project documentation & deployment guide
└── assets/
    ├── css/
    │   └── style.css           # Extracted shared CSS rules & overrides
    └── js/
        └── main.js             # Extracted shared JS (nav drawer, animations, form validator)
```

---

## Key Features

1. **Perfect Aura Design Fidelity**: Spacing, colors, premium typography, custom scrollbars, and card highlights remain identical to the original export.
2. ** DRY Code Structure**: Navbars, footers, animations, and custom styling overrides are unified and clean.
3. **Responsive Navigation**: Desktop navigation displays CTA buttons and inline links with visible hover feedback. Mobile navigation features a custom hamburger drawer that opens/closes smoothly, has full ARIA controls, and closes automatically upon selecting a link.
4. **Interactive Contact Form**: Includes robust client-side validation (ensuring proper email syntax, phone formats, and non-empty inputs) with clear validation errors and a success modal.
5. **WhatsApp & Clickable CTAs**: All service cards, promotions, headers, and footers contain operational WhatsApp links (`wa.me`) with prefilled, service-specific request messages. Phone and email icons/links are fully clickable (`tel:` and `mailto:`).
6. **SEO & Accessibility**: Complete page-specific Title tags, Meta descriptions, Open Graph protocol metadata, image alt descriptions, ARIA attributes, and keyboard outline visible focus states.

---

## Interface Upgrade Notes

This version includes an additional stylesheet, `assets/css/interface-upgrade.css`, layered after the original CSS. It improves the UI without changing the brand direction or removing existing content. Updates include:

- Premium sticky navigation with blur, depth and active-state polish
- Stronger hero visual hierarchy and trust highlight strip
- Refined cards, service blocks, promotion blocks and contact surfaces
- Better hover states, form focus states and button styling
- Improved mobile menu presentation and reduced-motion support

The original structure remains static HTML, CSS and JavaScript, so deployment is unchanged.

---

## Local Development

Since this is a fully static website, you can run it locally without any compiler or complex bundler.

### Method 1: Double-Click File
You can double-click `index.html` on your filesystem to open the page directly in any modern web browser.

### Method 2: Live Server (Recommended)
To run a local development server with live-reloading:
1. If you use **VS Code**, install the **Live Server** extension. Right-click `index.html` and choose **"Open with Live Server"**.
2. If you have **Node.js** installed, run:
   ```bash
   npx serve .
   ```
3. If you have **Python** installed, run:
   ```bash
   # Python 3
   python3 -m http.server 8000
   ```
   Open `http://localhost:8000` in your web browser.

---

## Backend Form Integration

The contact form in `contact.html` is fully validated on the client side. To receive form submissions, you can connect it to a static form backend:

### Option A: Netlify Forms (If deploying on Netlify)
Netlify detects forms automatically. Simply modify the `<form>` element in `contact.html` by adding the following attributes:
```html
<form id="contact-form" name="contact" method="POST" data-netlify="true" novalidate>
```
Insert a hidden field inside the `<form>` tags:
```html
<input type="hidden" name="form-name" value="contact">
```

### Option B: Formspree (Universal Endpoint)
1. Sign up at [Formspree.io](https://formspree.io) and create a new form project.
2. Replace the `action` attribute on the `<form>` tag:
```html
<form id="contact-form" action="https://formspree.io/f/YOUR_FORM_ID" method="POST" novalidate>
```

### Option C: EmailJS (Direct client-side sending)
1. Include the EmailJS SDK inside `<head>`:
   ```html
   <script src="https://cdn.jsdelivr.net/npm/@emailjs/browser@3/dist/email.min.js"></script>
   ```
2. Initialize EmailJS in `assets/js/main.js` using your public key:
   ```javascript
   emailjs.init("YOUR_PUBLIC_KEY");
   ```
3. Modify the submit listener inside `main.js` inside the valid block:
   ```javascript
   emailjs.sendForm('YOUR_SERVICE_ID', 'YOUR_TEMPLATE_ID', form)
     .then(() => {
       successMessage.classList.remove('hidden');
       form.reset();
     }, (error) => {
       console.error('EmailJS Error:', error);
     });
   ```

---

## Deployment Guides

### Deploying to Netlify (Recommended)
1. Sign in to [Netlify](https://www.netlify.com/).
2. Click **"Add new site"** -> **"Deploy manually"**.
3. Drag and drop the root folder of this project into the upload box.
4. Your site will be online in seconds. Set up custom domains and forms via the Netlify dashboard.

### Deploying to Vercel
1. Sign in to [Vercel](https://vercel.com/).
2. Install Vercel CLI locally (`npm i -g vercel`) or import your project repository from GitHub.
3. If using CLI, run in the root folder:
   ```bash
   vercel
   ```
4. Follow the configuration prompts to deploy the static directory.

### Deploying to GitHub Pages
1. Push this folder to a GitHub repository.
2. In the repository settings, go to the **"Pages"** tab.
3. Under **"Build and deployment"**, choose deploy from a branch and select `main` (or `master`) as the source branch.
4. Click **"Save"**. Your site will deploy to `https://<your-username>.github.io/<repo-name>/`.

### Deploying to cPanel (Shared Hosting)
1. Compress this project directory into a `.zip` archive.
2. Log in to your cPanel dashboard.
3. Open the **"File Manager"** and navigate to your site's directory (typically `public_html`).
4. Click **"Upload"** and select your `.zip` archive.
5. Extract the file inside the server directory. Make sure `index.html` sits directly in the target directory (e.g. `public_html/index.html`).
