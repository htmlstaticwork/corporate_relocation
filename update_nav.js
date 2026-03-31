const fs = require('fs');
const path = require('path');

const dir = 'c:/Users/VISU/OneDrive/Documents/Smartfusion/March_2nd_Slot_SubashChendurVeluG/Corporate Relocation & Moving Service';
const files = fs.readdirSync(dir).filter(f => f.endsWith('.html'));

const newNav = `                      <ul class="navbar-nav justify-content-center flex-grow-1 pe-3 fs-5">
                          <li class="nav-item"><a class="nav-link fw-semibold" href="index.html">Home</a></li>
                          <li class="nav-item"><a class="nav-link fw-semibold" href="home2.html">Home 2</a></li>
                          <li class="nav-item"><a class="nav-link fw-semibold" href="about.html">About</a></li>
                          <li class="nav-item"><a class="nav-link fw-semibold" href="services.html">Services</a></li>
                          <li class="nav-item dropdown">
                              <a class="nav-link fw-semibold dropdown-toggle" href="#" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                                  Pages
                              </a>
                              <ul class="dropdown-menu">
                                  <li><a class="dropdown-item" href="service-details.html">Service Details</a></li>
                                  <li><a class="dropdown-item" href="pricing.html">Pricing Plans</a></li>
                                  <li><a class="dropdown-item" href="blog-details.html">Blog Details</a></li>
                                  <li><hr class="dropdown-divider"></li>
                                  <li><a class="dropdown-item" href="dashboard.html">Admin Dashboard</a></li>
                                  <li><a class="dropdown-item" href="login.html">Login</a></li>
                                  <li><a class="dropdown-item" href="register.html">Sign Up</a></li>
                                  <li><hr class="dropdown-divider"></li>
                                  <li><a class="dropdown-item" href="404.html">404 Error</a></li>
                                  <li><a class="dropdown-item" href="coming-soon.html">Coming Soon</a></li>
                              </ul>
                          </li>
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
