const fs = require('fs');
const path = require('path');

const dir = 'c:/Users/VISU/OneDrive/Documents/Smartfusion/March_2nd_Slot_SubashChendurVeluG/Corporate Relocation & Moving Service';
const files = fs.readdirSync(dir).filter(f => f.endsWith('.html'));

files.forEach(f => {
    let content = fs.readFileSync(path.join(dir, f), 'utf8');
    const dropdownRegex = /<li class="nav-item dropdown">[\s\S]*?<\/ul>\s*<\/li>/;
    
    if (dropdownRegex.test(content)) {
        let updated = content.replace(dropdownRegex, '');
        fs.writeFileSync(path.join(dir, f), updated);
        console.log('Removed Pages dropdown from ' + f);
    }
});
