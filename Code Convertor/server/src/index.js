const express = require('express');
const cors = require('cors');
const multer = require('multer');
const path = require('path');
const fs = require('fs');
const jsdom = require('jsdom');
const { JSDOM } = jsdom;
const prettier = require('prettier');

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());

// Configure multer for file upload
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    const uploadDir = path.join(__dirname, '../uploads');
    if (!fs.existsSync(uploadDir)) {
      fs.mkdirSync(uploadDir, { recursive: true });
    }
    cb(null, uploadDir);
  },
  filename: (req, file, cb) => {
    cb(null, `${Date.now()}-${file.originalname}`);
  }
});

const upload = multer({ storage });

// Helper function to create a valid React component name
function createValidComponentName(name) {
  // Capitalize first letter
  name = name.charAt(0).toUpperCase() + name.slice(1);
  
  // Replace invalid characters with empty string
  name = name.replace(/[^a-zA-Z0-9]/g, '');
  
  // Add 'Component' suffix if the name is a reserved word
  const reservedWords = ['new', 'class', 'function', 'return', 'export', 'import', 'default', 'try', 'catch'];
  if (reservedWords.includes(name.toLowerCase())) {
    name += 'Component';
  }
  
  return name;
}

// Helper function to escape special characters in JSX
function escapeJSX(str) {
  return str
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;')
    .replace(/©/g, '&copy;');
}

// Helper function to convert HTML to JSX
async function convertHTMLToJSX(html, componentName) {
  try {
    console.log('Starting HTML to JSX conversion for:', componentName);
    
    // Ensure valid component name
    componentName = createValidComponentName(componentName);

    // Convert HTML comments to JSX comments before parsing
    html = html.replace(/<!--([\s\S]*?)-->/g, '{/* $1 */}');

    const dom = new JSDOM(html);
    const document = dom.window.document;

    // Convert class attributes to className
    document.querySelectorAll('*[class]').forEach(element => {
      element.setAttribute('className', element.getAttribute('class'));
      element.removeAttribute('class');
    });

    // Convert for attributes to htmlFor
    document.querySelectorAll('label[for]').forEach(element => {
      element.setAttribute('htmlFor', element.getAttribute('for'));
      element.removeAttribute('for');
    });

    // Convert inline styles
    document.querySelectorAll('*[style]').forEach(element => {
      const style = element.getAttribute('style');
      if (style) {
        const jsxStyle = style.split(';')
          .filter(s => s.trim())
          .map(s => {
            const [key, value] = s.split(':').map(s => s.trim());
            const camelKey = key.replace(/-([a-z])/g, g => g[1].toUpperCase());
            return `${camelKey}: "${value}"`;
          })
          .join(', ');
        element.setAttribute('style', `{{${jsxStyle}}}`);
      }
    });

    // Convert onclick and other event handlers
    document.querySelectorAll('*').forEach(element => {
      Array.from(element.attributes).forEach(attr => {
        if (attr.name.startsWith('on')) {
          const eventName = attr.name.toLowerCase();
          const jsxEventName = eventName.replace(/^on/, 'on');
          element.setAttribute(jsxEventName, `{${attr.value}}`);
          if (eventName !== jsxEventName) {
            element.removeAttribute(eventName);
          }
        }
      });
    });

    // Extract script content and convert to React
    const scripts = Array.from(document.getElementsByTagName('script'));
    let functions = '';
    scripts.forEach(script => {
      if (script.textContent.trim()) {
        functions += script.textContent + '\n';
      }
      script.remove();
    });

    // Get the body content and escape special characters
    const bodyContent = document.body.innerHTML
      .trim()
      .replace(/\{\s*\/\*\s*|\s*\*\/\s*\}/g, match => match.replace(/\s+/g, ' '));

    // Create React component
    const reactComponent = `
import React, { useState, useEffect } from 'react';
import './${componentName}.css';

const ${componentName} = () => {
  ${functions}

  return (
    <div className="${componentName.toLowerCase()}-container">
      <div dangerouslySetInnerHTML={{ __html: \`${bodyContent}\` }} />
    </div>
  );
};

export default ${componentName};
`;

    // Format the code using prettier
    const formattedCode = await prettier.format(reactComponent, {
      parser: 'babel',
      singleQuote: true,
      trailingComma: 'es5',
      printWidth: 100,
    });

    console.log('Generated React component:', formattedCode);
    return formattedCode;

  } catch (error) {
    console.error('Error converting HTML to JSX:', error);
    throw new Error(`Failed to convert HTML to JSX: ${error.message}`);
  }
}

// Routes
app.post('/api/convert', upload.array('files'), async (req, res) => {
  try {
    console.log('Received files:', req.files);
    const files = req.files;
    const components = {};

    if (!files || files.length === 0) {
      return res.status(400).json({
        success: false,
        error: 'No files uploaded'
      });
    }

    for (const file of files) {
      try {
        console.log(`Processing file: ${file.originalname}`);
        const content = fs.readFileSync(file.path, 'utf8');
        console.log(`File content:`, content);

        const ext = path.extname(file.originalname);
        const basename = path.basename(file.originalname, ext);

        if (ext === '.html') {
          // Convert HTML to JSX
          const jsxContent = await convertHTMLToJSX(content, basename);
          components[`${basename}.jsx`] = jsxContent;
          console.log(`Converted ${basename}.jsx:`, jsxContent);
        } else if (ext === '.css') {
          // Keep CSS as is
          components[`${basename}.css`] = content;
          console.log(`Added CSS file: ${basename}.css`);
        } else if (ext === '.js') {
          // For now, just keep JavaScript files as they are
          components[`${basename}.js`] = content;
          console.log(`Added JS file: ${basename}.js`);
        }

        // Clean up uploaded file
        fs.unlinkSync(file.path);
      } catch (error) {
        console.error(`Error processing file ${file.originalname}:`, error);
        throw error;
      }
    }

    console.log('Conversion successful. Components:', components);
    res.json({
      success: true,
      components
    });
  } catch (error) {
    console.error('Conversion error:', error);
    res.status(500).json({
      success: false,
      error: 'Error converting files: ' + error.message
    });
  }
});

// Error handling middleware
app.use((err, req, res, next) => {
  console.error('Server error:', err);
  res.status(500).json({
    success: false,
    error: 'Server error: ' + err.message
  });
});

// Start server
const server = app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
}).on('error', (err) => {
  if (err.code === 'EADDRINUSE') {
    console.error(`Port ${PORT} is already in use. Please try a different port.`);
    process.exit(1);
  } else {
    console.error('Server error:', err);
  }
}); 