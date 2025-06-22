# Закрывает процессы на порту 3000
$port = 3000
try {
    $processIds = Get-NetTCPConnection -LocalPort $port -ErrorAction Stop | Select-Object -ExpandProperty OwningProcess -Unique
    if ($processIds) {
        foreach ($pid in $processIds) {
            Write-Host "Stopping process with PID $pid on port $port..."
            Stop-Process -Id $pid -Force
        }
        Write-Host "Port $port has been cleaned."
    } else {
        Write-Host "No processes found on port $port."
    }
} catch {
    Write-Host "No processes found on port $port or an error occurred."
} 