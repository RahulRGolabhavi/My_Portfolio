# Rahul R Golabhavi - Developer Portfolio

A modern, single-page, fully responsive developer portfolio built directly into a single HTML file. This project utilizes React (via CDN), custom CSS3 (Glassmorphism, Dark Theme, CSS Animations), and Web3Forms for a complete, backend-less portfolio solution.

## 🚀 Features

- **Single Page Architecture:** The entire React application is built within `index.html` without requiring Node.js, Webpack, or a complex build step.
- **Glassmorphism UI:** Modern translucent panels, blurred backgrounds (`backdrop-filter`), and elegant borders.
- **Dark Theme Aesthetics:** A deep space dark theme (`#0a0a0f`) featuring glowing orb background effects and vibrant CSS text gradients.
- **Interactive Animations:** 
  - Dynamic profile picture morphing animation.
  - Multi-string typing animation for job titles.
  - Intersection Observer-based "Scroll Reveal" animations that smoothly fade in elements as you navigate down the page.
- **Fully Responsive:** CSS Grid and Flexbox layouts paired with media queries ensure the site looks flawless on mobile devices, tablets, and full desktop monitors.
- **Functional Contact Form:** Integrated with [Web3Forms](https://web3forms.com/) to route message submissions directly to email securely, without writing custom backend code.

## 🛠️ Tech Stack

- **HTML5:** Semantic structuring.
- **CSS3:** Custom properties (Variables), Keyframes, Flexbox, Grid, and Media Queries.
- **JavaScript (ES6):** React Hooks (`useState`, `useEffect`, `useRef`), Fetch API, and DOM observation.
- **React 18:** Component-based UI rendering loaded entirely over CDN.
- **Babel:** In-browser JSX compilation.
- **FontAwesome:** Scalable vector icons.
- **Google Fonts:** Space Grotesk (Headings) and Inter (Body).

## 📂 Project Structure

Because this project is streamlined for maximum simplicity and portability, the entire application lives within:

```text
📁 Portfolio/
 └── 📄 index.html     (HTML Structure, CSS Styling, React Logic, JSX Components)
```

## ⚙️ How to Run Locally

You do not need to install `npm`, `node`, or run `npm start` to view this portfolio!

**Option 1: Direct File Open**
1. Simply double-click `index.html`. 
2. It will open directly in your default web browser (Chrome, Edge, Firefox, Safari) and run instantly. 
*(Note: Browsers restrict some dynamic fetching features over the `file:///` protocol, so Option 2 is recommended for accurate local testing).*

**Option 2: Local Web Server (Recommended)**
If you have Python or a VS Code Live Server extension installed:

**Using Python:**
1. Open your terminal in the `Portfolio` folder.
2. Run the command: `python -m http.server 3000`
3. Open your browser and navigate to `http://localhost:3000`

**Using VS Code:**
1. Open `index.html` in VS Code.
2. Click the "Go Live" button in the bottom right corner (Requires "Live Server" extension).

## 📧 Modifying the Contact Form

If you fork or clone this repository, you must update the Web3Forms access key so messages are routed to *your* email:
1. Get a free access key at [Web3Forms](https://web3forms.com/).
2. Open `index.html` and locate the `Contact` React component (near the bottom).
3. Update the required line:
   ```javascript
   formData.append("access_key", "YOUR_NEW_ACCESS_KEY_HERE");
   ```

## 👨‍💻 Author

**Rahul R Golabhavi**
- **Role:** Full Stack Web Developer
- **Email:** rahulgolabhavi@gmail.com
- **LinkedIn:** [Rahul R Golabhavi](https://www.linkedin.com/in/rahul-r-golabhavi/)
- **GitHub:** [RahulRGolabhavi](https://github.com/RahulRGolabhavi)

---
*Built with passion, React, and beautiful CSS.*
