# Install Node.js and npm using Chocolatey
# If you don't have Chocolatey, uncomment the line below to install it first

# Install Chocolatey (run as Administrator):
# Set-ExecutionPolicy Bypass -Scope Process -Force; [System.Net.ServicePointManager]::SecurityProtocol = [System.Net.ServicePointManager]::SecurityProtocol -bor 3072; iex ((New-Object System.Net.WebClient).DownloadString('https://community.chocolatey.org/install.ps1'))

# Then install Node.js:
choco install nodejs -y

# Verify installation
Write-Host "`n✓ Installation complete!`n" -ForegroundColor Green
node --version
npm --version

Write-Host "`nYou can now run: npm install" -ForegroundColor Cyan
