$ErrorActionPreference = "Stop"

$root = Split-Path -Parent $PSScriptRoot
$eventsRoot = Join-Path $root "assets\events"
$outputPath = Join-Path $eventsRoot "events.json"

if (-not (Test-Path $eventsRoot)) {
  New-Item -ItemType Directory -Force -Path $eventsRoot | Out-Null
}

$events = @()

Get-ChildItem -Path $eventsRoot -Directory | Where-Object { $_.Name -match '^\d{4}$' } | ForEach-Object {
  $yearDir = $_

  Get-ChildItem -Path $yearDir.FullName -Directory | ForEach-Object {
    $eventDir = $_
    $metadataPath = Join-Path $eventDir.FullName "event.json"

    if (-not (Test-Path $metadataPath)) {
      return
    }

    $metadata = Get-Content -LiteralPath $metadataPath -Raw | ConvertFrom-Json
    $year = if ($metadata.year) { [string]$metadata.year } else { $yearDir.Name }
    $cover = if ($metadata.cover) { [string]$metadata.cover } else { "cover.jpg" }

    $event = [ordered]@{
      title = [string]$metadata.title
      month = [string]$metadata.month
      year = $year
      description = [string]$metadata.description
      cover = "assets/events/$($yearDir.Name)/$($eventDir.Name)/$cover"
      photos = @()
    }

    if ($metadata.photos) {
      $event.photos = @($metadata.photos | ForEach-Object {
        "assets/events/$($yearDir.Name)/$($eventDir.Name)/$_"
      })
    }

    $events += [pscustomobject]$event
  }
}

$manifest = [ordered]@{
  events = @($events | Sort-Object @{ Expression = { [int]$_.year }; Descending = $true }, @{ Expression = { $_.month }; Descending = $true })
}

$manifest | ConvertTo-Json -Depth 6 | Set-Content -LiteralPath $outputPath -Encoding UTF8
Write-Output "Updated $outputPath with $($events.Count) event(s)."
