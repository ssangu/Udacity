/* This file contains the jQuery code for pixel art maker. */

/* List of variables needed to draw the grid after receiving the input from the user. */
let nCols, nRows, iColor; // no. of columns and rows for the table and input color
let addRow, addCol, rowId; // html string of dom elements for row and column addition along with row id to 

/* Invoke this funtion when the user submits the form. */
$("form").on('submit', function(e) {

    /* Delete the pixel table on resubmitting the form with different input. */
    $('#pixel_canvas').children().remove();

    /* Call makeGrid() function to draw grid for pixel art. */
    makeGrid();

    /* Fill the pixel grids with user input color. */
    $("#pixel_canvas").on( 'click', 'td', function() {
        iColor = $('#colorPicker').val();
        $(this).css('background-color', iColor);
    });

    /* Prevents resubmitting form when user presses submit button without giving any new form input.  */
    e.preventDefault();
});

/* Draw the grid after the user enters the number of rows and columns and presses the submit button. */ 
function makeGrid() {

    /* Store the user's input number of rows and columns for drawing the grid. */
    nRows = $('#input_height').val();
    nCols = $('#input_width').val();

    /* Add grid row with row id and to that row DOM add column. */
    for (let r = 1; r <= nRows; r++) {
        addRow = "<tr class=\'row" + r + "\'></tr>";
        $('#pixel_canvas').append(addRow);
        rowId = ".row" + r;
        for (let c = 1; c <= nCols; c++) {
            addCol = "<td id=\'row" + r + "col" + c + "\'></td>";
            $(rowId).append(addCol);
        }
    }
}