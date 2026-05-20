$transcriptPath = "C:\Users\Zeeshan\.gemini\antigravity\brain\8ed4cb86-93c7-4a97-a9c4-47b15647c77b\.system_generated\logs\transcript.jsonl"
$outputPath = "c:\Users\Zeeshan\Desktop\Portfolio\raw_index.html"

Get-Content -Path $transcriptPath | ForEach-Object {
    $obj = $_ | ConvertFrom-Json
    if ($obj.content -like "*Alex Rivers | Full-Stack Engineer*") {
        $content = $obj.content
        $startTag = "<USER_REQUEST>"
        $endTag = "</USER_REQUEST>"
        $startIndex = $content.IndexOf($startTag)
        if ($startIndex -ge 0) {
            $startIndex += $startTag.Length
            $endIndex = $content.IndexOf($endTag, $startIndex)
            if ($endIndex -ge 0) {
                $rawHtml = $content.Substring($startIndex, $endIndex - $startIndex).Trim()
                $rawHtml | Out-File -FilePath $outputPath -Encoding utf8
                Write-Output "Successfully extracted HTML!"
            }
        }
    }
}
