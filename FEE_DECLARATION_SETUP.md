# Parent Fee Declaration System Setup

## 1. Architecture

The system deliberately separates public and private responsibilities.

```text
GitHub Pages
  fee-payment.html
      |
      | opens public Apps Script /exec URL
      v
Google Apps Script Web App
  validates parent mobile + roll number
  validates UTR, date, totals, and allocations
  generates PAY-YYYYMM-NNNN acknowledgement
      |
      v
Private Google Sheet
  Students
  Submissions
  Allocations
  AuditLog

Administrator computer
  exported private Sheet + exported bank CSV/XLSX
      |
      v
Python reconciliation tool -> private Excel report
```

The GitHub website never receives form data and contains no student list, Sheet ID, API key, access token, or bank credentials. The public Apps Script deployment URL is an endpoint, not a secret.

## 2. Create the Private Google Sheet

1. Sign in to the Google account that will own the payment records.
2. Create a blank Google Sheet named, for example, `Thulir Fee Declarations`.
3. Keep **General access** set to `Restricted`.
4. Under **File > Settings**, select the India locale and `GMT+05:30` time zone.
5. Copy the spreadsheet ID from the URL. It is the value between `/d/` and `/edit`.
6. Do not place the ID in this repository.

The Apps Script initializer creates and validates these tabs and exact columns:

### Students

```text
roll_number, student_name, batch, parent_mobile, monthly_fee, active
```

### Submissions

```text
submission_id, submitted_at, parent_mobile, payment_date, utr_original,
utr_normalized, total_amount, verification_status, reconciliation_notes, verified_at
```

### Allocations

```text
submission_id, roll_number, student_name_snapshot, fee_month, allocation_amount
```

### AuditLog

```text
timestamp, action, submission_id, details
```

## 3. Populate the Students Tab

Add one row per student. Do not upload this data to GitHub.

| Column | Rule |
| --- | --- |
| `roll_number` | Unique, stable identifier such as `TNF001`; letters, numbers, `/`, `_`, and `-` are supported |
| `student_name` | Full registered name; shown publicly only as the first name after mobile/roll validation |
| `batch` | Limited batch description that can be shown after validation |
| `parent_mobile` | Registered 10-digit Indian mobile number; format the column as Plain text |
| `monthly_fee` | Positive amount, for example `1200.00` |
| `active` | `TRUE` for active students; use `FALSE` immediately after a student leaves |

Do not reuse a roll number for a different student.

## 4. Create and Configure Google Apps Script

1. Open [script.google.com](https://script.google.com/) and create a **New project**.
2. Name it `Thulir Fee Declaration`.
3. Replace `Code.gs` with the repository file `apps-script/Code.gs`.
4. Add three HTML files named exactly:
   - `Index`
   - `Stylesheet`
   - `JavaScript`
5. Copy the matching repository HTML file contents into each Apps Script file.
6. In **Project Settings**, enable showing the `appsscript.json` manifest and replace it with `apps-script/appsscript.json`.
7. In **Project Settings > Script Properties**, add:

```text
SPREADSHEET_ID = your private spreadsheet ID
TIME_ZONE = Asia/Kolkata
MAX_PAYMENT_AGE_DAYS = 180
```

Only `SPREADSHEET_ID` is mandatory. The other values have safe defaults.

## 5. Initialize the Sheet

1. In the Apps Script editor, select `initializeSpreadsheet` from the function list.
2. Select **Run**.
3. Review and approve the Google authorization prompt for your own project.
4. Return to the private Sheet and confirm all four tabs and header rows.
5. Populate `Students` only after initialization.

The initializer never inserts sample students or payment records.

## 6. Deploy the Web App

1. In Apps Script, select **Deploy > New deployment**.
2. Select deployment type **Web app**.
3. Enter a description such as `Parent fee declaration v1`.
4. Set **Execute as** to `Me`.
5. Set **Who has access** to `Anyone`.
6. Select **Deploy** and complete authorization if requested.
7. Copy the URL ending in `/exec`.

Parents need `Anyone` access so they do not need a Google account. They do not gain access to the private Sheet. Apps Script executes as the owner and returns only limited validation and acknowledgement data.

Do not use the `/dev` test URL on the public website. It works only for project editors.

## 7. Connect GitHub Pages

Open `assets/js/fee-payment-config.js` and set only the public `/exec` URL:

```javascript
window.THULIR_FEE_APP_URL = "https://script.google.com/macros/s/YOUR_DEPLOYMENT_ID/exec";
```

This URL is not a credential. Never add the spreadsheet ID, Google access tokens, GitHub tokens, or private data to this file.

Upload the updated repository files to the root of the `main` branch. Preserve these GitHub Pages files on every update:

```text
CNAME
.nojekyll
index.html
fee-payment.html
assets/
```

Confirm the GitHub Pages workflow succeeds, then open:

```text
https://thulirnrithyalaya.org/fee-payment.html
```

## 8. Test a Sample Submission Privately

Before sharing the link:

1. Add a temporary test student to the private `Students` tab using fictional details that you control.
2. Open the `/exec` web-app URL in a private browser window.
3. Enter the registered test mobile and roll number.
4. Confirm that only the first name and batch appear.
5. Test one student/month allocation.
6. Test multiple months under one UTR.
7. Test two students under one UTR.
8. Confirm submission is disabled while totals differ.
9. Submit and verify:
   - acknowledgement matches `PAY-YYYYMM-NNNN`;
   - `Submissions` contains one pending row;
   - `Allocations` contains every allocation row;
   - `AuditLog` contains `SUBMISSION_ACCEPTED`;
   - no record says the payment is confirmed.
10. Submit the same UTR again and confirm it is rejected.
11. Remove the fictional test records before production use.

## 9. Download Payment Data

Recommended method:

1. Open the private Google Sheet.
2. Select **File > Download > Microsoft Excel (.xlsx)**.
3. Save the workbook in a private folder outside this repository.

The workbook must retain the `Students`, `Submissions`, and `Allocations` sheet names.

Alternative CSV method:

1. Export each required tab separately as CSV.
2. Store the three files in a private folder.
3. Pass them through `--students`, `--submissions`, and `--allocations`.

## 10. Export the Bank Statement

1. Sign in directly to the bank's official website or application.
2. Export transactions as CSV or XLSX.
3. Do not use PDF statements with this tool.
4. Do not provide bank login credentials to the website, Apps Script, or Python utility.
5. Keep the exported statement in the administrator's private local folder.

The tool reads only rows with a positive value in the configured credit amount column.

## 11. Install Python Dependencies

From the website repository root in PowerShell:

```powershell
python -m venv .venv
.\.venv\Scripts\Activate.ps1
python -m pip install --upgrade pip
python -m pip install -r .\reconciliation\requirements.txt
```

If PowerShell prevents virtual-environment activation, the commands can be run directly with:

```powershell
.\.venv\Scripts\python.exe -m pip install -r .\reconciliation\requirements.txt
```

## 12. Configure Bank Columns

Copy `reconciliation/bank-mapping.example.json` into the private data folder and rename it, for example, `my-bank-mapping.json`.

```json
{
  "sheet_name": "Transactions",
  "transaction_date_column": "Transaction Date",
  "narration_column": "Narration",
  "credit_amount_column": "Credit Amount",
  "debit_amount_column": "Debit Amount"
}
```

Use the exact column labels from the bank export. `debit_amount_column` is optional. For CSV files, `sheet_name` is ignored.

Mappings can also be overridden on the command line:

```powershell
--transaction-date-column "Txn Date" `
--narration-column "Description" `
--credit-amount-column "Deposit"
```

## 13. Run Reconciliation

### Complete Google Sheet workbook

```powershell
python .\reconciliation\reconcile.py `
  --payments "D:\Private Fee Data\fee-declarations.xlsx" `
  --bank "D:\Private Fee Data\bank-statement.xlsx" `
  --month 2026-08 `
  --config "D:\Private Fee Data\my-bank-mapping.json" `
  --output "D:\Private Fee Data\reconciliation-2026-08.xlsx"
```

### Separate CSV exports

```powershell
python .\reconciliation\reconcile.py `
  --students "D:\Private Fee Data\Students.csv" `
  --submissions "D:\Private Fee Data\Submissions.csv" `
  --allocations "D:\Private Fee Data\Allocations.csv" `
  --bank "D:\Private Fee Data\bank-statement.csv" `
  --month 2026-08 `
  --config "D:\Private Fee Data\my-bank-mapping.json" `
  --output "D:\Private Fee Data\reconciliation-2026-08.xlsx"
```

The month selects the fee allocations and active-student pending list. A UTR covering multiple months is still compared against its complete declared transaction amount.

## 14. Reconciliation Statuses

| Status | Meaning | Administrator action |
| --- | --- | --- |
| `VERIFIED` | Normalized UTR is contained in one bank credit reference and the amount matches exactly | Update the private `Submissions` row to `VERIFIED`, add a note, and set `verified_at` |
| `NOT_FOUND` | No bank credit contains the submitted UTR | Recheck later or contact the parent; never verify using amount alone |
| `AMOUNT_MISMATCH` | UTR matches one bank credit but the amount differs | Compare the declaration, allocation, and bank entry manually |
| `DUPLICATE` | The normalized UTR appears in multiple parent submissions | Investigate all duplicated submissions before changing any status |
| `MANUAL_REVIEW` | Input is invalid, a header is missing, or one UTR matches multiple bank credits | Resolve the ambiguity manually |

The tool never considers amount-only matches verified.

`Paid Students` includes active students whose verified allocations for the selected month meet or exceed `monthly_fee`. `Pending Students` includes active students with no verified allocation or a partial amount. Inactive students are excluded.

## 15. Apply Verified Results

The Python utility does not write to Google Sheets. This prevents an incorrect bank mapping from changing the live records.

For every reviewed row in the report's `Verified` sheet:

1. Open the matching private `Submissions` row.
2. Change `verification_status` from `SUBMITTED - PENDING BANK VERIFICATION` to `VERIFIED`.
3. Enter a short `reconciliation_notes` value, such as `Matched in Aug 2026 bank export`.
4. Enter the verification date/time in `verified_at`.

Do not change `Submissions` for unresolved statuses.

## 16. Run Automated Tests

```powershell
python -m unittest discover -s .\reconciliation\tests -v
```

The tests use only the anonymized files under `reconciliation/samples/` and verify all required reconciliation outcomes and report sheets.

## 17. Update Apps Script Safely

After modifying Apps Script source:

1. Copy the changed files into the Apps Script editor.
2. Select **Deploy > Manage deployments**.
3. Edit the existing deployment.
4. Select **New version** and deploy.
5. Keep the same `/exec` URL unless Google explicitly issues a replacement.
6. Repeat the private sample submission test.

## 18. Update GitHub Pages Safely

Before each upload:

1. Confirm no real student CSV, Google Sheet export, bank statement, reconciliation report, token, or credential is included.
2. Preserve `CNAME` and `.nojekyll` in the repository root.
3. Keep private files under a folder outside the repository or under the ignored `reconciliation/private/` path.
4. Upload only website, Apps Script source, reconciliation program, anonymized samples, tests, and documentation.
5. Confirm both URLs after the Pages deployment:

```text
https://thulirnrithyalaya.org/
https://thulirnrithyalaya.org/fee-payment.html
```

## Security Notes

- Google Sheet sharing must remain `Restricted`.
- Apps Script performs all authoritative validation again at submission time.
- The acknowledgement ID is created under a script lock and checked against existing IDs.
- A UTR is normalized, checked under the same lock, and cannot be reused.
- The status is always pending at initial submission.
- The browser receives only first name, batch, acknowledgement, roll numbers, fee months, UTR, and declared total required for the parent workflow.
- Displayed values are assigned using text-safe DOM operations, not inserted as HTML.
- Real exports and generated reports are intentionally excluded by `.gitignore`.
- Bank statements remain local and are never uploaded by the reconciliation tool.
