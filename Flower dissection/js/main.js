// Your code here!
var numCorrect = 0;
var totalMatches;


$(function () {
    totalMatches = $("ul#allLabels li").length;

    $('.label').draggable({
        revert: 'invalid', //if not dropped, moves back to original position
    });

    $('.dropzone').droppable({
        accept: '.label',
        hoverClass: 'hover',

        drop(event, ui) {
            ui.draggable.position({ of: $(this), my: 'center', at: 'center' }); //"snaps" label to a position once dropped
            $(this).addClass('dropped');
            $(this).droppable({ disabled: false }); //fixes unable to drag bug

            var dragID = ui.draggable.attr("drag-id");
            var dropID = $(this).attr("drop-id");

            if (dragID == dropID) {
                ui.draggable.correct = 'true'; //used for resetting label
                numCorrect++;
                document.getElementById('numCorrect').innerHTML = "Number Correct " + numCorrect; //correct answer counter, remove later
            } else if (ui.draggable.correct == 'true' && dragID != dropID) { //if a correct label is moved to a different spot, subtract from numCorrect
                ui.draggable.correct = 'false';
                numCorrect--;
                document.getElementById('numCorrect').innerHTML = "Number Correct " + numCorrect;
            }

        }
    });

    /*
     * Allows labels to be dragged back to original spot
     */
    $('#allLabels').droppable({
        accept: '.label',

        drop(event, ui) {
            ui.draggable.animate({ //resets draggable
                top: "0px",
                left: "0px"
            });

            $('.dropzone').removeClass('dropped');
            $('.dropzone').droppable({ disabled: false });

            if (ui.draggable.correct == 'true') {
                ui.draggable.correct = 'false'; //resets 

                if (numCorrect > 0) {
                    numCorrect--;
                    document.getElementById('numCorrect').innerHTML = "Number Correct " + numCorrect;
                }
            }
        }
    })

    /*
     * Resets ALL labels
    */
    $('#reset').click(function () {
        numCorrect = 0;
        document.getElementById('numCorrect').innerHTML = "Number Correct " + numCorrect;

        $('.dropzone').removeClass('dropped');
        $('.dropzone').droppable({ disabled: false }); //resets drop zone

        $('.label').animate({ //resets label position
            top: "0px",
            left: "0px"
        });
    });


    $('#submit').click(function (event) {
        event.preventDefault();
        if (numCorrect != totalMatches) {
            $(".dialogIncorrect").dialog({
                height: 100,
                width: 300,
                position: { my: "center", at: "center", of: "img" }
            }).prev(".ui-dialog-titlebar").css("color", "red");
        }
        else if (numCorrect == totalMatches) {
            $(".dialogCorrect").dialog({
                height: 100,
                width: 300,
                position: { my: "center", at: "center", of: "img" }
            }).prev(".ui-dialog-titlebar").css("color", "limegreen");

        }
    });
})
