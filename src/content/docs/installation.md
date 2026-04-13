# Installation

This page covers how to install and run Power Interview on Windows and macOS.

---

## Option A - Install via Command Line

### Windows (PowerShell)

```powershell
$release = Invoke-RestMethod -Uri "https://api.github.com/repos/PowerInterviewAI/client/releases/latest"
$asset = $release.assets | Where-Object { $_.name -like "*Setup*.exe" } | Select-Object -First 1
Invoke-WebRequest -Uri $asset.browser_download_url -OutFile $asset.name
Start-Process ".\$($asset.name)"
```

### macOS (Terminal)

```bash
DMG_URL=$(curl -s https://api.github.com/repos/PowerInterviewAI/client/releases/latest | grep -Eo 'https://[^"]+\.dmg' | head -n 1)
curl -L "$DMG_URL" -o PowerInterview.dmg
open "PowerInterview.dmg"
```

These commands download the latest installer and open it immediately.

---

## Option B - Prebuilt Installer Download

Use the latest release binaries from GitHub:

- [Windows installer (.exe)](https://github.com/PowerInterviewAI/client/releases/latest/download/PowerInterview-Setup-1.4.0.exe)
- [macOS installer (.dmg)](https://github.com/PowerInterviewAI/client/releases/latest/download/Power.Interview-1.4.0-arm64.dmg)
- [All release assets (latest)](https://github.com/PowerInterviewAI/client/releases/latest)

After installation, launch **Power Interview**, sign in, and proceed to first-run setup.

---

## Option C - Run from Source

### System Requirements

| Requirement      | Minimum Version            |
| ---------------- | -------------------------- |
| Operating System | Windows 10/11 or macOS 13+ |
| Node.js          | 18+ (20 recommended)       |
| npm              | 8+                         |

### Setup

```bash
git clone https://github.com/PowerInterviewAI/client
cd client
npm install
npm run start
```

---

## First-Run Setup

After launching the app for the first time:

1. **Sign in** with your Power Interview account.
2. **Open Configuration** from the profile dropdown.
3. **Set up your profile** (name, CV/resume, interview context).
4. **Select your microphone** in **Audio Options**.

After setup, click **Start** to begin a session.

