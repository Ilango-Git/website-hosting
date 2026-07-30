$ErrorActionPreference = "Stop"

$root = Split-Path -Parent $PSScriptRoot
$homepageRoot = Join-Path $root "assets\homepage"
$jsonOutputPath = Join-Path $homepageRoot "homepage.json"
$scriptOutputPath = Join-Path $homepageRoot "homepage-data.js"
$allowedExtensions = @(".jpg", ".jpeg", ".png", ".webp")

if (-not (Test-Path $homepageRoot)) {
  New-Item -ItemType Directory -Force -Path $homepageRoot | Out-Null
}

$images = @()
$index = 1

Get-ChildItem -Path $homepageRoot -File |
  Where-Object { $allowedExtensions -contains $_.Extension.ToLower() } |
  Sort-Object Name |
  ForEach-Object {
    $relativePath = "assets/homepage/$($_.Name)"
    $images += [pscustomobject][ordered]@{
      src = $relativePath
      alt = "Thulir Nrithyalaya Foundation homepage image $index"
    }
    $index += 1
  }

$manifest = [ordered]@{
  images = @($images)
}

$json = $manifest | ConvertTo-Json -Depth 4
$json | Set-Content -LiteralPath $jsonOutputPath -Encoding UTF8
"window.THULIR_HOMEPAGE = $json;" | Set-Content -LiteralPath $scriptOutputPath -Encoding UTF8

Write-Output "Updated $jsonOutputPath with $($images.Count) image(s)."
Write-Output "Updated $scriptOutputPath with $($images.Count) image(s)."
