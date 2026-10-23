@echo off
chcp 65001 >nul
title Populon E2E — Live Slow-Motion Demo Launcher

echo ==============================================================
echo   🎭 POPULON AUTOMATED TESTING — LIVE DEMO LAUNCHER (SLOW-MO)
echo ==============================================================
echo.
echo   [1] Spustit BYZNYS SCENARE TC-001 az TC-004 ve zpomalenem rezimu (Default - Enter)
echo   [2] Spustit VSECHNY testy (15 testu) ve zpomalenem rezimu
echo   [3] Otevrit interaktivni Playwright UI (vyber testu kliknutim)
echo   [4] Otevrit posledni HTML report
echo.
set /p choice="Zvolte moznost [1-4, Enter=1]: "

if "%choice%"=="" set choice=1

if "%choice%"=="1" (
    echo.
    echo Spoustim zpomalene Live Demo pro TC-001 az TC-004...
    call npm run demo:scenarios
    goto end
)
if "%choice%"=="2" (
    echo.
    echo Spoustim zpomalene Live Demo vsech 15 testu...
    call npm run demo
    goto end
)
if "%choice%"=="3" (
    echo.
    echo Oteviram interaktivni Playwright UI se zapnutym Slow-Mo...
    call npm run demo:ui
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
