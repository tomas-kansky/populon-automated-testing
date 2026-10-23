@echo off
chcp 65001 >nul
title Populon E2E — Live Slow-Motion Demo Launcher

echo ==============================================================
echo   🎭 POPULON AUTOMATED TESTING — LIVE DEMO LAUNCHER (SLOW-MO)
echo ==============================================================
echo.
echo   [1] Spustit VSECHNY testy ve zpomalenem rezimu (Default - Enter)
echo   [2] Otevrit interaktivni Playwright UI (vyber testu kliknutim)
echo   [3] Spustit pouze SMOKE testy (@smoke) ve zpomalenem rezimu
echo   [4] Otevrit posledni HTML report
echo.
set /p choice="Zvolte moznost [1-4, Enter=1]: "

if "%choice%"=="" set choice=1

if "%choice%"=="1" (
    echo.
    echo Spoustim zpomalene Live Demo vsech testu...
    call npm run demo
    goto end
)
if "%choice%"=="2" (
    echo.
    echo Oteviram interaktivni Playwright UI se zapnutym Slow-Mo...
    call npm run demo:ui
    goto end
)
if "%choice%"=="3" (
    echo.
    echo Spoustim zpomalene Live Demo pro @smoke testy...
    call npm run demo:smoke
    goto end
)
if "%choice%"=="4" (
    echo.
    echo Oteviram HTML report...
    call npm run report
    goto end
)

:end
echo.
pause
