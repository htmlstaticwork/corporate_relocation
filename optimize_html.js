const fs = require('fs');
const path = require('path');

const dir = '.';
const files = fs.readdirSync(dir).filter(f => f.endsWith('.html'));

const preconnectLinks = `
    <!-- Preconnect for performance -->
    <link rel="preconnect" href="https://fonts.googleapis.com">
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
    <link rel="preconnect" href="https://cdn.jsdelivr.net">`;

files.forEach(f => {
    let content = fs.readFileSync(path.join(dir, f), 'utf8');
    let originalContent = content;

    // 1. Add Preconnect Links right after <link rel="icon"... or <title>...
    if (!content.includes('<link rel="preconnect"')) {
        // Try to insert after favicon or title
        if (content.includes('<link rel="icon"')) {
            content = content.replace(/(<link rel="icon"([^>]+)>)/, '$1\n' + preconnectLinks);
        } else if (content.includes('</title>')) {
            content = content.replace(/(<\/title>)/, '$1\n' + preconnectLinks);
        } else {
            content = content.replace(/(<head>)/i, '$1\n' + preconnectLinks);
        }
    }

    // 2. Add `defer` to scripts
    // Match <script src="..."> but avoid those already having defer or async
    content = content.replace(/<script(?![^>]*\b(?:defer|async)\b)([^>]+src="[^"]+")[^>]*><\/script>/g, '<script$1 defer></script>');

    // 3. Add `loading="lazy"` to all images
    // Match <img ...> but avoid those already having loading="lazy" or loading="eager"
    // Also avoid adding lazy loading to images that have 'hero' in their src or class
    content = content.replace(/<img(?![^>]*\bloading=(?:"|')?(?:lazy|eager)(?:"|')?)[^>]+>/gi, (match) => {
        if (match.includes('hero') || match.includes('favicon')) {
            return match; // Don't lazy load hero or favicons
        }
        return match.replace(/<img/i, '<img loading="lazy"');
    });

    if (content !== originalContent) {
        fs.writeFileSync(path.join(dir, f), content);
        console.log('Optimized ' + f);
    }
});
