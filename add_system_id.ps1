$files = Get-ChildItem -Filter *.html
foreach ($file in $files) {
    if ($file.Name -eq "login.html" -or $file.Name -eq "register.html") { continue }
    $content = Get-Content $file.FullName -Raw
    if ($content -match "SYSTEM_ID:") { continue }
    
    $id = "NODE_" + $file.BaseName.ToUpper() + "_X"
    $replacement = "<p class=`"mb-0 small tech-data`" style=`"font-size: 0.75rem;`">&copy; 2026 CORPMOVE_LOGISTICS_NETWORK. ALL PROTOCOLS ENFORCED. <span class=`"ms-3 text-primary opacity-50`">SYSTEM_ID: $id</span></p>"
    
    $content = $content -replace '<p class="mb-0 small tech-data" style="font-size: 0.75rem;">&copy; 2026 CORPMOVE_LOGISTICS_NETWORK. ALL PROTOCOLS ENFORCED.</p>', $replacement
    
    Set-Content $file.FullName $content
}
