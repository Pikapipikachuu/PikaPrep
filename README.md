# PikaPrep — cozy NEET study companion (frontend foundation)

## Run
Open `index.html` in a modern browser. No build step is required.

## Included
- Responsive cozy dashboard and mobile navigation
- Whole-interface English / Hindi toggle with Hindi copy
- Study planner based on exam date, available hours, study days and subject weights
- A daily checklist; progress changes only when a task is checked
- Question practice with clearly marked demo questions, explanations, save and notes
- Local browser persistence for planner, notes, saved questions and practice counts

## Important: what is not connected yet
This is a functional frontend foundation, not a complete AI product. PDF/image OCR, real document analysis, source-page extraction and AI question generation need a secure backend. The app intentionally does not pretend that a selected file has been analysed or show fake AI progress. Do not put AI provider API keys in `script.js` or any browser code.

## Next production steps
1. Build a secure upload/API service (file validation, storage, PDF text extraction, OCR/vision, page references).
2. Add schema-validated AI analysis and user-controlled chapter/topic selection.
3. Generate and verify NEET-pattern questions from only the selected scope.
4. Add real performance history, spaced revision and planner adaptation from completed work.
5. Add accounts/sync, privacy controls, accessibility and device testing.
