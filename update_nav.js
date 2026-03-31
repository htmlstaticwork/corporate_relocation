const fs = require('fs');
const path = require('path');

const dir = 'c:/Users/VISU/OneDrive/Documents/Smartfusion/March_2nd_Slot_SubashChendurVeluG/Corporate Relocation & Moving Service';
const files = fs.readdirSync(dir).filter(f => f.endsWith('.html'));

const newNav = `                      <ul class="navbar-nav justify-content-center flex-grow-1 pe-3 fs-5">
                          <li class="nav-item"><a class="nav-link fw-semibold" href="index.html">Home1</a></li>
                          <li class="nav-item"><a class="nav-link fw-semibold" href="home2.html">Home2</a></li>
                          <li class="nav-item"><a class="nav-link fw-semibold" href="about.html">About</a></li>
                          <li class="nav-item"><a class="nav-link fw-semibold" href="services.html">Services</a></li>
                          <li class="nav-item"><a class="nav-link fw-semibold" href="blog.html">Blog</a></li>
                          <li class="nav-item"><a class="nav-link fw-semibold" href="contact.html">Contact</a></li>
                      </ul>`;

files.forEach(f => {
    let content = fs.readFileSync(path.join(dir, f), 'utf8');
    const regex = /<ul class="navbar-nav justify-content-center flex-grow-1 pe-3 fs-5">[\s\S]*?<\/ul>/;
    
    if (regex.test(content)) {
        let updated = content.replace(regex, newNav);
        
        // Re-apply the active class based on the file name
        let linkRegex = new RegExp('(<a class="nav-link fw-semibold)" href="' + f + '">', 'g');
        updated = updated.replace(linkRegex, '$1 active text-primary" href="' + f + '">');

        fs.writeFileSync(path.join(dir, f), updated);
        console.log('Updated ' + f);
    }
});
