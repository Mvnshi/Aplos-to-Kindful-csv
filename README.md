# Aplos to Kindful CRM csv Converter 

This script is designed to modify a CSV document exported from Aplos and make it acceptable for uploads into the Kindful CRM software. The script is written in Google Apps Script and automates several data transformations to ensure compatibility with Kindful's data requirements.

## How the Script Works

1. **Deleting and Rearranging Data**:
   - The script first deletes the first 5 rows of the CSV document, assuming they contain irrelevant information for Kindful CRM.
   - It then removes columns "D" and "I" (where "I" is the column that comes after deleting "D") since these are not needed in Kindful.
   - Additionally, rows containing the term "stripe" in column "D" are removed, as Kindful already includes data from PayPal.

2. **Editing Headers**:
   - The script modifies the headers to match Kindful CRM's requirements. The header changes are as follows:
     - "B1": Renamed to "Organization"
     - "E1": Renamed to "Check Number"
     - "D1": Renamed to "Transaction Type"
     - "G1": Renamed to "Campaign"
     - "F1": Renamed to "Fund"
     - "I1": Renamed to "Address"
     - "J1": Renamed to "Address2"
     - "P1": Renamed to "Amount"

3. **Updating Values**:
   - The script replaces occurrences of "General Fund" in column "G" with "General Operating" to match Kindful's terminology.
   - The script removes the first 7 characters from each cell in column "F" to adjust the Fund names as needed.

4. **Number Formatting**:
   - The script sets the number format of column "M" to text format "@". This is done to preserve any leading zeros in the numbers, ensuring data consistency.

5. **Additional Data Movement**:
   - The script moves the data from column "N" (Emails) to a new column next to column "B" (as new column "C") to align the data correctly.

6. **Data Validation**:
   - The script validates the data in column "M" (Amount). If any value is a 4-digit number, it prefixes it with a "0" to maintain data integrity.

## How to Use the Script

1. **Preparing the CSV**:
   - Before running the script, ensure that you have the CSV document exported from Aplos and saved in a Google Sheets file.

2. **Running the Script**:
   - Open the Google Sheets file containing the Aplos CSV data.
   - Go to "Extensions" in the menu bar and select "Apps Script."
   - Paste the provided script into the script editor.
   - Save the script and close the editor.
   - In the Google Sheets file, go to "Extensions" again, select "Apps Script," and click on "modifySheetAndDeleteChars" to run the script.

3. **Reviewing the Changes**:
   - After running the script, review the modifications made to the CSV document to ensure everything appears as expected.

## Important Notes

- Always take a backup of your original CSV file before running the script to avoid data loss in case of unexpected issues.

- The script assumes specific patterns and header names in the original CSV file. Make sure your Aplos export follows the expected structure for the script to work correctly.

- The script is provided as-is and might need adjustments based on your specific data and Kindful's requirements.

## Disclaimer

This script is provided for informational purposes only. Use it at your own risk. The author is not responsible for any data loss, damages, or issues arising from the use of this script.

For any questions or assistance related to the script, feel free to open an issue in the repository or contact the author.
