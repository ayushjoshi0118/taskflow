# TaskFlow 📝✨

A clean, modern, and beginner-friendly To-Do List web application built with vanilla **HTML5**, **CSS3**, and **JavaScript**.

![License: MIT](https://img.shields.io/badge/License-MIT-purple.svg)
![Vanilla JS](https://img.shields.io/badge/Vanilla-JavaScript-f7df1e.svg)
![HTML5](https://img.shields.io/badge/HTML5-E34F26.svg)
![CSS3](https://img.shields.io/badge/CSS3-1572B6.svg)

---

## 🌟 Features

- **Add Tasks**: Quickly add tasks by typing and hitting <kbd>Enter</kbd> or clicking **Add Task**.
- **Input Validation**: Prevents adding empty or whitespace-only tasks.
- **Mark Complete**: Interactive custom checkboxes that strike through finished tasks.
- **Delete Tasks**: Remove individual tasks with a single click.
- **Auto-Persistence**: Saves all items to browser `localStorage` automatically—your tasks stay intact even after refreshing or closing the browser.
- **Task Filters**: Toggle between **All**, **Active**, and **Completed** tasks seamlessly.
- **Real-Time Counters**: Displays live counts for total tasks and completed tasks.
- **Contextual Empty States**: Friendly, encouraging messages when no tasks match the current view.
- **Modern & Responsive UI**: Styled with a soft light palette, clean purple accents, rounded cards, and smooth transitions that look great on desktop and mobile.

---

## 📁 Project Structure

```text
taskflow/
├── index.html        # App layout, structure, and semantic elements
├── style.css         # Responsive styling, color palette, animations
├── script.js         # State management, localStorage handling, DOM logic
├── .gitignore        # Files and directories ignored by Git
├── LICENSE           # MIT open-source license
└── README.md         # Project documentation and guide
```

---

## 🚀 Getting Started

No installations, build steps, or dependencies are required.

### 1. Clone or Download the Repository

```bash
git clone https://github.com/YOUR-USERNAME/taskflow.git
cd taskflow
```

### 2. Run the App

#### Option A: Direct Open (Simplest)
Double-click `index.html` or open it with your favorite web browser (Chrome, Firefox, Safari, Edge).

#### Option B: VS Code Live Server
1. Open the project folder in VS Code.
2. Install the **Live Server** extension.
3. Right-click `index.html` and click **"Open with Live Server"**.

#### Option C: Local HTTP Server (Python / Node)
```bash
# With Python 3:
python -m http.server 8000

# With Node.js:
npx serve .
```
Then visit `http://localhost:8000` in your browser.

---

## 🌐 Deploy to GitHub Pages

You can easily host this website for free using **GitHub Pages**:

1. Push this repository to your GitHub account.
2. In your GitHub repository, click on **Settings** (gear icon).
3. Scroll down on the left sidebar to **Pages**.
4. Under **Build and deployment > Branch**, select `main` (or `master`) and folder `/ (root)`.
5. Click **Save**. Within a minute, your live site URL will be displayed!

---

## 📜 License

This project is open-source and available under the [MIT License](LICENSE).
