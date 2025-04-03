# HTML to React Code Converter

A web application that converts traditional HTML/CSS/JavaScript code into modern React components. This tool helps developers migrate their existing HTML-based projects to React-based applications quickly and efficiently.

## Features

- Upload multiple HTML, CSS, and JavaScript files
- Automatic conversion of HTML to JSX
- Proper handling of class attributes to className
- Conversion of inline styles to React style objects
- Support for HTML comments
- Real-time code preview with syntax highlighting
- Download converted files as a ZIP archive
- Modern Material-UI interface

## Tech Stack

### Frontend
- React with TypeScript
- Material-UI for components
- react-syntax-highlighter for code preview
- axios for API calls
- JSZip for file downloads

### Backend
- Node.js
- Express
- JSDOM for HTML parsing
- Prettier for code formatting
- Multer for file uploads

## Prerequisites

Before you begin, ensure you have installed:
- Node.js (v14.0.0 or higher)
- npm (v6.0.0 or higher)

## Installation

1. Clone the repository:
```bash
git clone <repository-url>
cd code-converter
```

2. Install all dependencies (server and client):
```bash
npm run install-all
```

## Development

To run the application in development mode:

1. Start both frontend and backend servers:
```bash
npm run dev
```

Or run them separately:

2. Start the backend server:
```bash
npm run server
```

3. Start the frontend development server:
```bash
npm run client
```

The application will be available at:
- Frontend: http://localhost:3000
- Backend: http://localhost:5000

## Usage

1. Open the application in your browser (http://localhost:3000)
2. Click "Upload Files" to select your HTML, CSS, and JavaScript files
3. Click "Convert to React" to start the conversion process
4. Preview the converted code using the "Preview Code" button
5. Download the converted React components using the "Download" button

## Project Structure

```
code-converter/
├── client/                 # React frontend
│   ├── src/
│   │   ├── App.tsx        # Main application component
│   │   └── ...
│   └── package.json
├── server/                 # Node.js backend
│   ├── src/
│   │   └── index.js       # Server entry point
│   └── package.json
├── package.json           # Root package.json
└── README.md
```

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## License

This project is licensed under the ISC License. 