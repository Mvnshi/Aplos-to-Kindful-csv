function modifySheetAndDeleteChars() {
  var sheet = SpreadsheetApp.getActiveSpreadsheet().getActiveSheet();

  // Delete the first 5 rows
  sheet.deleteRows(1, 5);

  // Delete columns D and I (after D is deleted, column I becomes column H)
  sheet.deleteColumn(4);
  sheet.deleteColumn(8);

  // Delete rows containing "stripe" in column D
  var lastRow = sheet.getLastRow();
  var rangeD = sheet.getRange("D1:D" + lastRow);
  var valuesD = rangeD.getValues();
  for (var i = valuesD.length - 1; i >= 0; i--) {
    if (valuesD[i][0].toString().toLowerCase().includes("stripe")) {
      sheet.deleteRow(i+1);  // i+1 because array index is 0-based, but sheet row is 1-based
    }
  }

  // Set cell values
  sheet.getRange("B1").setValue("Organization");
  sheet.getRange("E1").setValue("Check Number");
  sheet.getRange("D1").setValue("Transaction Type");
  sheet.getRange("G1").setValue("Campaign");
  sheet.getRange("F1").setValue("Fund");

  // Replace "General Fund" with "General Operating" in column G
  var rangeG = sheet.getRange("G2:G" + sheet.getLastRow());
  var valuesG = rangeG.getValues();
  for (var i = 0; i < valuesG.length; i++) {
    if (valuesG[i][0] === "General Fund") {
      valuesG[i][0] = "General Operating";
    }
  }
  rangeG.setValues(valuesG);

  // Delete first 7 characters from each cell in column F
  var rangeF = sheet.getRange("F2:F" + sheet.getLastRow());
  var valuesF = rangeF.getValues();
  
  for (var i = 0; i < valuesF.length; i++) 
  {
    // Get the current cell value
    var cellValue = valuesF[i][0];

    // Check that the cell is not empty
    if (cellValue !== '') {
      // Remove the first 7 characters from the cell value
      var updatedCellValue = cellValue.toString().substring(7);

      // Set the new cell value
      valuesF[i][0] = updatedCellValue;
    }
  }
  // Update the column with the new values
  rangeF.setValues(valuesF);
  
  // Move Emails colum N to be next to column B (as new column C)
  var columnBData = sheet.getRange("N1:N" + sheet.getLastRow()).getValues();
  sheet.insertColumnsBefore(3, 1);
  sheet.getRange("C1:C" + sheet.getLastRow()).setValues(columnBData);
  
  sheet.deleteColumn(15);
  sheet.deleteColumn(16);
  sheet.deleteColumn(16);

  sheet.getRange("I1").setValue("Address");
  sheet.getRange("J1").setValue("Address2");
  sheet.getRange("P1").setValue("Amount");

  var rangeM = sheet.getRange("M1:M" + sheet.getLastRow());
  var valuesM = rangeM.getValues();

  // Update to correct zip code format
  for (var i = 0; i < valuesM.length; i++) 
  {
    // Get current cell value
    var cellValue = valuesM[i][0];

    // Check if the value is a 4-digit number
    if (/^\d{4}$/.test(cellValue)) 
    {
      // Add '0' to the beginning of the number
      var updatedCellValue = '0' + cellValue;

      // Update the cell value
      valuesM[i][0] = updatedCellValue;
    }
  }
  
  // Update column M with new values
  rangeM.setValues(valuesM);
  if (!verifyColumnHeaders(sheet)) 
  {
    throw new Error("Column headers verification failed. Please check the logs.");
  }

  //Delete Empty Columns
  var firstColRange = sheet.getRange("A1:A" + sheet.getLastRow());
  var firstColValues = firstColRange.getValues();
  for (var i = firstColValues.length - 1; i >= 0; i--) 
  {
    if (!firstColValues[i][0]) 
    {
        sheet.deleteRow(i + 1);
    }
  }
  
  // Calculate Correct Total
  var lastRowInP = sheet.getLastRow();
  var cellP = sheet.getRange("P" + (lastRowInP + 0));
  cellP.setFormula("=SUM(P1:P" + (lastRowInP - 1) + ")");
}

// Verify column headers
function verifyColumnHeaders(sheet) 
{
  var expectedHeaders = ["Name", "Organization", "Email", "Date", "Transaction Type", "Check Number", "Fund", "Campaign", "Address", "Address2", "City", "State", "Postal Code", "Country", "Phone", "Amount"];
  var actualHeaders = sheet.getRange("A1:P1").getValues()[0]; // Get the first row, which is the header

  for (var i = 0; i < expectedHeaders.length; i++) {
    if (actualHeaders[i] !== expectedHeaders[i]) {
      Logger.log("Error: Expected header for column " + (i + 1) + " to be '" + expectedHeaders[i] + "' but found '" + actualHeaders[i] + "'.");
      return false; // Or throw an exception if you prefer
    }
  }
  return true;
}
