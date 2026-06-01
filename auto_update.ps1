# CR7 Stats Auto-Update — runner script
# Invoked daily by the "CR7 Stats Auto-Update" Windows Scheduled Task.
# Runs Claude Code headless to research and apply the latest Cristiano Ronaldo stats.

$ErrorActionPreference = 'Continue'
$proj   = 'M:\CR7\CR7 Website Building Demo (Testing)'
$log    = Join-Path $proj 'auto_update.log'
$claude = 'C:\Users\Mohammed Haitham\AppData\Roaming\npm\claude.ps1'

Set-Location $proj
"=== Run started $(Get-Date -Format 'yyyy-MM-dd HH:mm') ===" | Out-File -FilePath $log -Append -Encoding utf8

if (-not (Test-Path $claude)) {
    "ERROR: claude CLI not found at $claude" | Out-File -FilePath $log -Append -Encoding utf8
    return
}

$prompt = Get-Content -Raw (Join-Path $proj 'auto_update_prompt.txt')

try {
    & $claude -p $prompt --dangerously-skip-permissions 2>&1 |
        Out-File -FilePath $log -Append -Encoding utf8
} catch {
    "ERROR: $_" | Out-File -FilePath $log -Append -Encoding utf8
}

"=== Run finished $(Get-Date -Format 'yyyy-MM-dd HH:mm') ===" | Out-File -FilePath $log -Append -Encoding utf8
