$files = Get-ChildItem -Filter *.html
foreach ($file in $files) {
    $content = Get-Content $file.FullName -Raw
    $content = $content -replace 'navbar-expand-lg', 'navbar-expand-xl'
    $content = $content -replace 'd-lg-block', 'd-xl-block'
    $content = $content -replace 'd-lg-none', 'd-xl-none'
    $content = $content -replace 'order-lg-last', 'order-xl-last'
    Set-Content $file.FullName $content
}
