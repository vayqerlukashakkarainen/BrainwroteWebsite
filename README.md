# Transcribr Website

Official website for Transcribr - A cross-platform audio transcription application.

## Features

- Clean, Notion-inspired design
- Responsive layout for all devices
- Professional Lucide icons
- App screenshots showcase
- Easy deployment to GitHub Pages

## Development

### Setup

```bash
npm install
```

### Development Server

```bash
npm run dev
```

Opens a development server with live reload at http://localhost:3050

### Build

```bash
npm run build
```

### Preview

```bash
npm run preview
```

## Deployment

### GitHub Pages (Automatic)

1. Push to `main` branch
2. GitHub Actions will automatically deploy to GitHub Pages
3. Site will be available at `https://USERNAME.github.io/TranscribrWebsite`

### Manual Deployment

```bash
npm run deploy
```

This uses the `gh-pages` package to deploy the current directory to the `gh-pages` branch.

## Project Structure

```
├── index.html          # Main HTML file
├── styles.css          # Styles with Notion-inspired design
├── referenceImages/    # App screenshots
├── package.json        # Node.js configuration
├── .github/workflows/  # GitHub Actions for deployment
└── README.md          # This file
```

## Technologies

- HTML5
- CSS3 (Custom styling inspired by Notion)
- Lucide Icons
- GitHub Pages for hosting
- GitHub Actions for CI/CD

## License

ISC