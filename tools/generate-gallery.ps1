$ErrorActionPreference = "Stop"

$generatorPath = Join-Path $PSScriptRoot "generate-gallery.py"
$pythonCommand = Get-Command python -ErrorAction SilentlyContinue

if (-not $pythonCommand) {
  $pythonCommand = Get-Command py -ErrorAction SilentlyContinue
}

if (-not $pythonCommand) {
  throw "Python was not found. Install Python 3 and Pillow, then run this command again."
}

& $pythonCommand.Source $generatorPath

if ($LASTEXITCODE -ne 0) {
  throw "Gallery generation failed with exit code $LASTEXITCODE."
}
