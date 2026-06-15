$siteDir = 'c:\ERP_Equipamec\site_institucional'
$gsapJs = 'https://cdn.jsdelivr.net/npm/gsap@3.12.5/dist/gsap.min.js'
$gsapSt = 'https://cdn.jsdelivr.net/npm/gsap@3.12.5/dist/ScrollTrigger.min.js'
$enc = New-Object System.Text.UTF8Encoding($false)

$files = Get-ChildItem -Path $siteDir -Filter '*.html' -Recurse
$updated = 0

foreach ($f in $files) {
    $path = $f.FullName
    $raw = [System.IO.File]::ReadAllText($path)

    $isSubDir = $path -match '\\(en|es)\\'
    if ($isSubDir) {
        $scriptTag = '    <script src="../js/script.js"></script>'
        $scriptPath = '../js/script.js'
    } else {
        $scriptTag = '    <script src="js/script.js"></script>'
        $scriptPath = 'js/script.js'
    }

    # Check if GSAP already directly precedes script.js
    $pattern = 'gsap\.min\.js[^\r\n]*[\r\n]+[^\r\n]*' + [regex]::Escape($scriptPath)
    $alreadyPresent = $raw -match $pattern

    if (-not $alreadyPresent) {
        $gsapLine1 = '    <script src="' + $gsapJs + '"></script>'
        $gsapLine2 = '    <script src="' + $gsapSt + '"></script>'
        $gsapInsert = $gsapLine1 + "`n" + $gsapLine2 + "`n" + $scriptTag
        $newRaw = $raw.Replace($scriptTag, $gsapInsert)
        if ($newRaw -ne $raw) {
            [System.IO.File]::WriteAllText($path, $newRaw, $enc)
            $updated++
            Write-Host "Added GSAP: $($f.Name) [$($f.DirectoryName | Split-Path -Leaf)]"
        }
    } else {
        Write-Host "Already OK: $($f.Name)"
    }
}

# Remove GSAP from <head> in the 3 index files (now moved to body)
$indexFiles = @(
    'c:\ERP_Equipamec\site_institucional\index.html',
    'c:\ERP_Equipamec\site_institucional\en\index.html',
    'c:\ERP_Equipamec\site_institucional\es\index.html'
)

foreach ($path in $indexFiles) {
    $raw = [System.IO.File]::ReadAllText($path)
    $headPattern = '[\r\n]+    <script src="' + [regex]::Escape($gsapJs) + '"></script>[\r\n]+    <script src="' + [regex]::Escape($gsapSt) + '"></script>'
    $newRaw = [regex]::Replace($raw, $headPattern, '')
    if ($newRaw -ne $raw) {
        [System.IO.File]::WriteAllText($path, $newRaw, $enc)
        Write-Host "Removed GSAP from head: $(Split-Path $path -Leaf) [$(Split-Path (Split-Path $path -Parent) -Leaf)]"
    }
}

Write-Host ""
Write-Host "Done. $updated files updated with GSAP in body."
