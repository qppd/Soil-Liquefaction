import React, { useEffect } from 'react';
// import moment from '../assets/plugins/moment/moment.min.js';
//import CodeMirror from '../assets/plugins/codemirror/codemirror.js';
// import moment from '../assets/plugins/moment/codemirror.min.js';
function Scripts() {
    useEffect(() => {
        // Code for document ready
        //$('#datetime').val(moment().hour(8).minute(0).format('yyyy/MM/DD hh:mm'));
        // $('#datetime').datetimepicker({
        //     icons: {
        //         time: 'far fa-clock'
        //     },
        //     format: 'yyyy/MM/DD HH:mm', // 12-hour time format
        //     stepping: 5,
        //     minDate: moment(), // Disable past dates
        //     disabledTimeIntervals: [
        //         [moment({ h: 0, m: 0 }), moment({ h: 6, m: 59, s: 59 })], // Disable midnight to 6:59 AM
        //         [moment({ h: 17, m: 0 }), moment({ h: 23, m: 59, s: 59 })] // Disable 5:00 PM onward
        //     ],
        //     enabledHours: [8, 9, 10, 11, 12, 13, 14, 15, 16], // Enable 7 AM to 5 PM
        //     daysOfWeekDisabled: [0] // Disable Sunday (0) and Saturday (6)
        // });

        //$('#summernote').summernote();

        // CodeMirror.fromTextArea(document.getElementById("codeMirrorDemo"), {
        //     mode: "htmlmixed",
        //     theme: "monokai"
        // });

        // DataTables initialization

        if ($.fn.DataTable.isDataTable('#example31')) {
            $('#example1').DataTable().destroy();
        }

        $("#example1").DataTable({
            "responsive": true,
            "lengthChange": true,
            "autoWidth": false,
            "buttons": ["csv", "excel", "pdf", "print"]
        }).buttons().container().appendTo('#example1_wrapper .col-md-6:eq(0)');

        if ($.fn.DataTable.isDataTable('#example2')) {
            $('#example2').DataTable().destroy();
        }

        $('#example2').DataTable({
            "paging": true,
            "lengthChange": true,
            "searching": true,
            "ordering": true,
            "info": true,
            "autoWidth": true,
            "responsive": false
        });

        if ($.fn.DataTable.isDataTable('#example3')) {
            $('#example3').DataTable().destroy();
        }

        $('#example3').DataTable({
            "paging": true,
            "lengthChange": true,
            "searching": true,
            "ordering": true,
            "info": true,
            "autoWidth": true,
            "responsive": false,
            "buttons": ["csv", "excel", "pdf", "print"]
        }).buttons().container().appendTo('#example3_wrapper .col-md-6:eq(0)');

        // Adding active class and staying opened when selected for sidebar menu
        var url = window.location;

        $('ul.sidebar-menu a').filter(function() {
            return this.href == url;
        }).parent().addClass('active');

        $('ul.treeview-menu a').filter(function() {
            return this.href == url;
        }).parentsUntil(".sidebar-menu > .treeview-menu").addClass('active');

        // Datepicker initialization
        $('#datepicker_add').datepicker({
            autoclose: true,
            format: 'yyyy-mm-dd'
        });
        $('#datepicker_edit').datepicker({
            autoclose: true,
            format: 'yyyy-mm-dd'
        });

        $('#daterange-btn').daterangepicker({
            ranges: {
                'Today': [moment(), moment()],
                'Yesterday': [moment().subtract(1, 'days'), moment().subtract(1, 'days')],
                'Last 7 Days': [moment().subtract(6, 'days'), moment()],
                'Last 30 Days': [moment().subtract(29, 'days'), moment()],
                'This Month': [moment().startOf('month'), moment().endOf('month')],
                'Last Month': [moment().subtract(1, 'month').startOf('month'), moment().subtract(1, 'month').endOf('month')]
            },
            startDate: moment().subtract(29, 'days'),
            endDate: moment()
        }, function(start, end) {
            $('#daterange-btn span').html(start.format('MMMM D, YYYY') + ' - ' + end.format('MMMM D, YYYY'))
        });
    }, []); // Empty dependency array to run only once after component mount

    return null; // Since this component doesn't render any UI, return null
}

export default Scripts;