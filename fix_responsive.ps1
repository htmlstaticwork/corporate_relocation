$files = Get-ChildItem -Filter *.html
foreach ($file in $files) {
    if ($file.Name -eq "login.html" -or $file.Name -eq "register.html") { continue }
    $content = Get-Content $file.FullName -Raw
    $content = $content -replace 'd-lg-flex', 'd-xl-flex'
    $content = $content -replace 'd-lg-block', 'd-xl-block'
    $content = $content -replace 'd-lg-none', 'd-xl-none'
    Set-Content $file.FullName $content
}
