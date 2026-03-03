@echo off
echo ========================================
echo   8-Puzzle Solver - Quick Start
echo ========================================
echo.
echo Installing dependencies...
pip install -r requirements.txt
echo.
echo Starting Flask server...
echo.
echo ========================================
echo   Server will start on:
echo   http://127.0.0.1:5000
echo ========================================
echo.
echo Press Ctrl+C to stop the server
echo.
python app.py
