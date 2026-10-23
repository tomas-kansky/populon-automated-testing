@echo off
chcp 65001 >nul
title Populon E2E — Live Slow-Motion Demo Launcher

echo ==============================================================
echo   🎭 POPULON AUTOMATED TESTING — LIVE DEMO LAUNCHER (SLOW-MO)
echo ==============================================================
echo.
echo   [1] Spustit VSECHNY scenare (TC-001 az TC-004 + vada BUG-002) (Default - Enter)
echo   [2] Spustit pouze 100%% PROCHAZEJICI scenare (TC-001 az TC-004 bez BUG-002)
echo   [3] Spustit jen TC-004 (TK) - Tomáš Kanský (Clenstvi a adresa)
echo   [4] Spustit jen ukázku odhalené vady BUG-002 (Lokalizace / Jazyk)
echo   [5] Spustit VSECHNY testy v projektu (16 testu)
echo   [6] Otevrit interaktivni Playwright UI (vyber testu kliknutim)
echo   [7] Otevrit posledni HTML report
echo.
set /p choice="Zvolte moznost [1-7, Enter=1]: "

if "%choice%"=="" set choice=1

if "%choice%"=="1" (
    echo.
    echo Spoustim Live Demo vsech scenaru (TC-001 az TC-004 + BUG-002)...
    call npm run demo:scenarios
    goto end
)
if "%choice%"=="2" (
    echo.
    echo Spoustim pouze 100%% uspesne scenare (TC-001 az TC-004)...
    call npm run demo:pass
    goto end
)
if "%choice%"=="3" (
    echo.
    echo Spoustim pouze TC-004 (TK)...
    call npm run demo:tc4
    goto end
)
if "%choice%"=="4" (
    echo.
    echo Spoustim ukazku odhalene vady BUG-002...
    call npm run demo:bug002
    goto end
)
if "%choice%"=="5" (
    echo.
    echo Spoustim zpomalene Live Demo vsech testu...
    call npm run demo
    goto end
)
if "%choice%"=="6" (
    echo.
    echo Oteviram interaktivni Playwright UI se zapnutym Slow-Mo...
    call npm run demo:ui
    goto end
)
if "%choice%"=="7" (
    echo.
    echo Oteviram HTML report...
    call npm run report
    goto end
)

:end
echo.
pause
