$path = "index.html"
$text = Get-Content $path -Raw
$start = '<!-- 5. Projects Section -->'
$end = '<!-- 6. Resume Section -->'
$i = $text.IndexOf($start)
$j = $text.IndexOf($end, $i)
if ($i -lt 0 -or $j -lt 0) {
    throw 'Markers not found'
}
$replacement = $start + "`n<section class=\"py-section-gap px-gutter max-w-container-max mx-auto\" id=\"projects\">`n<div class=\"mb-16 reveal\">`n<h2 class=\"font-display text-display mb-4\">Currently <span class=\"text-primary\">Working On</span></h2>`n<p class=\"text-on-surface-variant max-w-2xl font-body-lg text-body-lg\">`n                    I'm currently working on a mobile application project using Flutter and Dart, focused on building a smooth UX with Firebase-powered realtime functionality.`n                </p>`n</div>`n</section>`n"
$updated = $text.Substring(0, $i) + $replacement + $text.Substring($j)
Set-Content -Path $path -Value $updated -Encoding utf8
Write-Output 'projects section updated'