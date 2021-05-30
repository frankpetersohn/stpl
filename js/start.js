//const { TouchBarOtherItemsProxy } = require("electron/main");

//var data;
var lehrer = [];
var klassen = [];
var faecher = [];
var raeume = [];
var stundenraster = [];
var wochentage = [];
var stplTable;
//var stundenplan;
var gesamtplan = [];
var anzeigeplan;

function aktuellerPlan(typ, von, eintraege) {
    this.typ = typ;
    this.von = von;
    this.eintraege = [new stplEintrag];

}

function Raum(raumbez) {
    this.raumbez = raumbez;

}
function Klasse(klassenbez) {
    this.klassenbez = klassenbez;

}


/**
 * 
 * @param {*} tag 
 * @param {*} stunde_von 
 * @param {*} stunde_bis 
 * @param {*} lehrer 
 * @param {*} raum 
 * @param {*} klasse 
 * @param {*} fach 
 */
function stplEintrag(tag, stunde_von, stunde_bis, lehrer, raeume, klassen, fach) {
    this.tag = tag;
    this.stunde_von = stunde_von;
    this.stunde_bis = stunde_bis;
    this.lehrer = lehrer;
    this.raeume = raeume;
    this.klassen = klassen;
    this.fach = fach;

    this.html = function (typ) {
        let htmlstring;
        let strRaum = '';
        let strLehrer = '';
        let strKlassen = '';
        let rooms = JSON.parse(this.raeume);
        let teachers = JSON.parse(this.lehrer);
        let classes = JSON.parse(this.klassen);

        for (let i = 0; i < rooms.length; i++) {
            strRaum += rooms[i].raumbez;
            if (i < rooms.length - 1) strRaum += ', ';
        };
        for (let i = 0; i < teachers.length; i++) {
            strLehrer += teachers[i].kuerzel;
            if (i < teachers.length - 1) strLehrer += ', ';
        };
        for (let i = 0; i < classes.length; i++) {
            strKlassen += classes[i].klassenbez;
            if (i < classes.length - 1) strKlassen += ', ';
        };

        switch (typ) {
            case 'lehrer':
                htmlstring = '<span class="text-center">' + strKlassen + '<br>' + this.fach + '<br>' + strRaum + '</span>';
                break;
            case 'raum':
                htmlstring = '<span class="text-center">' + strLehrer + '<br>' + strKlassen + '<br>' + this.fach + '</span>';
                break;
            case 'klasse':
                htmlstring = '<span class="text-center">' + strLehrer + '<br>' + this.fach + '<br>' + strRaum + '</span>';
                break;

            default:
                break;
        }

        return htmlstring;
    };

}


function showPlan(plan) {

    $('#plancontent').html(createStplTable());
    setupdataTable('stplTable');

    let header = '<span class="text-center"><h2>Plan von ' + plan.von + '</h2></span>';
    $('#planheader').html(header);

    $.each(plan.eintraege, function () {
        let zelle = '#cell' + this.tag + '-' + this.stunde_von;
        $(zelle).addClass('bg-light text-center');

        let diff = 0;
        if (this.stunde_von != this.stunde_bis) {
            diff = this.stunde_bis - this.stunde_von;
        }
        if (diff > 0) {

            for (let i = this.stunde_von + 1; i <= this.stunde_bis; i++) {
                $('#cell' + this.tag + '-' + i).remove();
            }
            $('#cell' + this.tag + '-' + this.stunde_von).attr("rowspan", diff + 1);
        }
        $('#cell' + this.tag + '-' + this.stunde_von).html(this.html(plan.typ));

    });


}
function test() {
   // addEintrag();

    $('#sidebar').toggleClass('visible');



}

function addEintrag() {
    //stplEintrag(tag, stunde_von, stunde_bis, lehrer, raeume, klassen, fach)
    switch (anzeigeplan.typ) {
        case 'lehrer':

            break;
        case 'raum':

            break;
        case 'klasse':

            break;

        default:
            break;
    }
    let times = new Array();

    $.each(getSelectedCells().sort(), function () {
        time = this.split(':')
        times.push(time);
    });
    var eintraege = new Array();
    var tag = 0;
    var stunde_von = 0;
    var stunde_bis = 0;


    for (let i = 1; i < times.length; i++) {
        let makeNew = false;
        if (time[i][0] > tag){
            tag = time[i][0];
            stunde_von=time[i][1];
            stunde_bis=time[i][1];
        } 
        let diff = time[i+1][1]-time[i][1];
        if(diff > 1){
            makeNew=true;
        }else{

        }
       
        

        let eintr = new stplEintrag(tag, stunde_von);

    }



    console.log(times);

}



$(document).ready(function () {
    
        $('#sidebar-btn').on('click', function() {
          $('#sidebar').toggleClass('visible');
        });
      
    
    //  myHTMLInclude();
    // $('.dropdown-item').click(function(){
    $("#lehrerauswahl").on("click", ".dropdown-item", function (event) {
        createAnzeigeplan('lehrer', $(this).data('kuerzel'));
        /*anzeigeplan = new aktuellerPlan();
        anzeigeplan.typ = 'lehrer';
        var slehrer = $(this).data('kuerzel');
        anzeigeplan.von = slehrer;

        anzeigeplan.eintraege = [];
        $.each(gesamtplan, function () {
            lArray = JSON.parse(this.lehrer);
            console.log(lArray);
            // $.each(eintrag.lehrer, function(){
            for (let i = 0; i < lArray.length; i++) {
                console.log(lArray[i]);
                if (lArray[i].kuerzel == slehrer) {
                    anzeigeplan.eintraege.push(this);
                }
            }



        });

        console.log(anzeigeplan);
        showPlan(anzeigeplan);*/


    });
    $("#raumauswahl").on("click", ".dropdown-item", function (event) {
        createAnzeigeplan('raum', $(this).data('raumbez'));
        /*
        anzeigeplan = new aktuellerPlan();
        anzeigeplan.typ = 'raum';
        var sRaum = $(this).data('raumbez');
        anzeigeplan.von = sRaum;

        anzeigeplan.eintraege = [];
        $.each(gesamtplan, function () {
            lArray = JSON.parse(this.raeume);
            console.log(lArray);
            // $.each(eintrag.lehrer, function(){
            for (let i = 0; i < lArray.length; i++) {

                if (lArray[i].raumbez == sRaum) {
                    anzeigeplan.eintraege.push(this);
                }
            }
        });
        console.log(anzeigeplan);
        showPlan(anzeigeplan);*/
    });
    $("#klassenauswahl").on("click", ".dropdown-item", function (event) {
        /*
                anzeigeplan = new aktuellerPlan();
                anzeigeplan.typ = 'klasse';
                var sKlasse = $(this).data('klassenbez');
                anzeigeplan.von = sKlasse;
        
                anzeigeplan.eintraege = [];
                $.each(gesamtplan, function () {
                    lArray = JSON.parse(this.klassen);
                    console.log(lArray);
                    // $.each(eintrag.lehrer, function(){
                    for (let i = 0; i < lArray.length; i++) {
        
                        if (lArray[i].klassenbez == sKlasse) {
                            anzeigeplan.eintraege.push(this);
                        }
                    }
                });
                console.log(anzeigeplan);
                showPlan(anzeigeplan);*/
        createAnzeigeplan('klasse', $(this).data('klassenbez'));
    });
    /**
     * 
     * @param {*} typ klasse, raum, lehrer Plan
     * @param {*} fuer 
     */
    function createAnzeigeplan(typ, fuer) {
        anzeigeplan = new aktuellerPlan();
        anzeigeplan.eintraege = [];
        anzeigeplan.von = fuer;
        anzeigeplan.typ = typ;
        $.each(gesamtplan, function () {
            switch (typ) {
                case "klasse":
                    lArray = JSON.parse(this.klassen);
                    for (let i = 0; i < lArray.length; i++) {
                        if (lArray[i].klassenbez == fuer) {
                            anzeigeplan.eintraege.push(this);
                        }
                    }

                    break;
                case "raum":
                    lArray = JSON.parse(this.raeume);
                    for (let i = 0; i < lArray.length; i++) {
                        if (lArray[i].raumbez == fuer) {
                            anzeigeplan.eintraege.push(this);
                        }
                    }
                    break;
                case "lehrer":
                    lArray = JSON.parse(this.lehrer);
                    for (let i = 0; i < lArray.length; i++) {
                        if (lArray[i].kuerzel == fuer) {
                            anzeigeplan.eintraege.push(this);
                        }
                    }
                    break;

                default:
                    break;
            }




        });
        console.log(anzeigeplan);
        showPlan(anzeigeplan);

    }


    /**
     * Click events
     */

    $('#raumliste').dblclick(function () {
        var selcetedRooms = $('#raumliste').val();
        console.log(selcetedRooms);

        $.each(getSelectedCells(), function (ck, cv) {

            let t = cv.split(':')[0];
            let s = cv.split(':')[1];
            console.log(t + '--' + s);

            $.each(anzeigeplan, function () {

                $.each(this.eintraege, function () {

                    if (this.tag == t && this.stunde_von == s) {
                        this.raum = selcetedRooms;
                    }



                    //S  if (this.stunde_von == )
                });

            });


            //Neuen Eintrag erstellen


            let bez = '#cell' + cv.replace(':', '-');
            //  console.log(bez);
            //  $(bez).html(rv);
        })
        showPlan(anzeigeplan);

    });







    $('#save_btn').click(function () {


        saveInFile(JSON.stringify(data), 'stpl.json', 'json');

    });
    $('#lehrerlink').click(function () {
        localStorage.setItem('lehrer', JSON.stringify(lehrer));
        window.location.href = 'lehrerverwaltung.html';
    });

    $('#file_submit_btn').click(function () {
        openFile();


    });

    $('#import_room_btn').click(function () {
        $('#fileInputModal_title').html('Import Räume')
        $('#file_submit_btn').html('Räume importieren')
        $('#fileInputModal').modal('show');
        $('#fileinput_txt').data('datatyp', 'raumimport')

    });
    /**
     * Icon Raum hinzufügen geklickt
     */
    $('#add_room_btn').click(function () {
        bootbox.prompt({
            size: "small",
            title: "Raumbezeichnung",
            callback: function (result) {
                if (result != null) {
                    addRoom(result);
                }
            }
        });

    });

    /**
     * Icon Raum löschen geklickt
     */
    $('#del_room_btn').click(function () {
        $('#raumliste option:selected').each(function () {
            // console.log($(this).val());
            delRoom($(this).val());
            // entferneElement('#raumliste', $(this).val());
        });

    });





    $('#del_subject_btn').click(function () {
        $('#faecherliste option:selected').each(function () {
            entferneElement('#faecherliste', $(this).val());
        });
    });


});


/**
 * Speicher in eine JSONDatei
 * @param {*} data 
 * @param {*} filename 
 * @param {*} type 
 */
function saveInFile(data, filename, type) {
    var file = new Blob([data], { type: type });
    if (window.navigator.msSaveOrOpenBlob) // IE10+
        window.navigator.msSaveOrOpenBlob(file, filename);
    else { // Others
        var a = document.createElement("a"),
            url = URL.createObjectURL(file);
        a.href = url;
        a.download = filename;
        document.body.appendChild(a);
        a.click();
        setTimeout(function () {
            document.body.removeChild(a);
            window.URL.revokeObjectURL(url);
        }, 0);
    }
}




/**
 * Raumauswahl und Raumliste aktualisieren
 */
function refreshRaumAuswahl() {
    $('#raumauswahl').html('');
    $('#raumliste').html('');
    $.each(raeume, function (lk, lv) {
        // console.log("raum: "+this.raumbez);
        $('#raumauswahl').append('<li><a class="dropdown-item" href="#">' + this.raumbez + '</a></li>');
        $('#raumliste').append('<option value="' + this.raumbez + '">' + this.raumbez + '</option>');
    });
}
/**
 * Eine Raum hinzufügen
 * @param {*} room 
 */
function addRoom(room) {
    var roomexists = false;
    $.each(raeume, function () {
        if (this.raumbez == room) {
            roomexists = true;
            return false;
        }
    });
    if (!roomexists) {
        raeume.push(new Raum(room));
        raeume.sort(compareValues('raumbez'));
        localStorage.removeItem('raeume');
        localStorage.setItem('raeume', JSON.stringify(raeume));
        refreshRaumAuswahl();
    }
}
function delRoom(room) {
    console.log(raeume);
    var tmp = [];

    $.each(raeume, function (k, v) {
        $.each(v, function (key, val) {
            if (val != room) {
                tmp.push(v);
            }
        });
    });

    raeume = tmp;
    localStorage.removeItem('raeume');
    localStorage.setItem('raeume', raeume);
    refreshRaumAuswahl();
}
/**
 * Ermittelt die markierten Zellen der Stundeplantabelle
 * @returns Die markierten Zellen der Stundenplantabelle im Format Tag:Stunde
 */
function getSelectedCells() {

    var cells = [];

    $('#stplTable td.selected').each(function (cell) {

        cells.push($(this).data('cell'));

    });
    return cells;
}

function openFile(event) {
    console.log(event.target.attributes['data-datatyp'].value);
    var input = event.target;
    var data;
    var reader = new FileReader();
    reader.onload = function () {
        var text = reader.result;


        datatype = event.target.attributes['data-datatyp'].value;
        switch (datatype) {
            case "AllData":
                data = $.parseJSON(text);
                loadData(data);
                $('#plancontent').html(createStplTable());
                setupdataTable('stplTable');

                break;
            case "roomimport":
                let raumarray = $.csv.toArrays(text, { separator: ';' })
                $.each(raumarray, function () {
                    addRoom(this[0]);
                });

                break;

        }


    };

    reader.readAsText(input.files[0]);
    $('#fileInputModal').modal('hide');
    event.target.value = '';

};


/**
 * Daten aus einer Datei laden
 */
function loadData(data) {
    $.each(data, function (k, v) {
        if (k == "Lehrer") {
            $('#lehrerauswahl').html('');

            $.each(this, function (lk, lv) {
                console.log(this);
                Litem = this.nachname + ', ' + this.vorname + ' (' + this.kuerzel + ')'
                $('#lehrerauswahl').append('<li data-kuerzel="' + this.kuerzel + '" class="dropdown-item">' + Litem + '</li>');
                $('#lehrerliste').append('<option value="' + this.kuerzel + '">' + Litem + '</option>');
                var select = $('#lehrerliste');
                select.html(select.find('option').sort(function (x, y) {
                    // to change to descending order switch "<" for ">"
                    return $(x).text() > $(y).text() ? 1 : -1;
                }));


            });
            localStorage.setItem('lehrer', JSON.stringify(this));
            lehrer = this;
        }
        if (k == "Raeume") {
            $('#raumliste').html('');
            $('#raumauswahl').html('');
            $.each(this, function (lk, lv) {
                $('#raumauswahl').append('<li data-raumbez="' + this.raumbez + '" class="dropdown-item">' + this.raumbez + '</li>');
                $('#raumliste').append('<option value="' + this.raumbez + '">' + this.raumbez + '</option>');
            });
            localStorage.setItem('raeume', JSON.stringify(this));
            raeume = this;
        }
        if (k == "Klassen") {
            $('#klassenauswahl').html('');
            $.each(this, function (lk, lv) {
                $('#klassenauswahl').append('<li data-klassenbez="' + this.klassenbez + '" class="dropdown-item">' + this.klassenbez + '</a></li>');
                $('#klassenliste').append('<option value="' + this.klassenbez + '">' + this.klassenbez + '</option>');
            });
            localStorage.setItem('klassen', JSON.stringify(this));
            klassen = this;
        }
        if (k == "Faecher") {

            $.each(this, function (lk, lv) {
                $('#faecherliste').append('<option value="' + this.fachbez + '">' + this.fachbez + '</option>');

            });
            localStorage.setItem('faecher', JSON.stringify(this));
            faecher = this;
            var select = $('#faecherliste');
            select.html(select.find('option').sort(function (x, y) {
                // to change to descending order switch "<" for ">"
                return $(x).text() > $(y).text() ? 1 : -1;
            }));
        }
        if (k == "Planeigenschaften") {

            $.each(this, function (lk, lv) {


                if (lk == "stundenraster") {
                    stundenraster = lv;
                    localStorage.setItem('stundenraster', JSON.stringify(this))
                }
                if (lk == "wochentage") {
                    wochentage = lv;
                    localStorage.setItem('wochentage', JSON.stringify(this))
                }
            });

        }
        if (k == "Planeintraege") {
            stundenplan = this;
            gesamtplan = [];
            $.each(stundenplan, function () {
                let p = new stplEintrag(this.tag, this.stunde_von, this.stunde_bis, JSON.stringify(this.lehrer), JSON.stringify(this.raeume), JSON.stringify(this.klassen), this.fach);
                gesamtplan.push(p);
            });
            //  console.log(gesamtplan);
            localStorage.setItem('gesamtplan', JSON.stringify(gesamtplan));

        }




    });
    //console.log(data);
}
/**
 * Formatiert die Plantabelle 
 * @param {*} tab 
 */
function setupdataTable(tab) {
    if (tab == 'stplTable') {
        stplTable = $('#stplTable').DataTable({
            "searching": false,
            "paging": false,
            "ordering": false,
            stripeClasses: [],
            "info": false,
            select: {
                style: 'os',
                items: 'cell'
            }
        });
    }
}
function createStplTable() {
    var stplTable = '<table id="stplTable" class="cell-border compact stripe">';
    var spalte = 0;
    var zeile = 0;
    stplTable += '<thead><tr>';
    stplTable += ' <th id="tab_z0s0" class=""> Stunde </th>';

    $.each(wochentage, function () {
        stplTable += '<th id="cell_' + zeile + 't' + spalte + '" class="text-center">' + this + '</th>';
        spalte++;


    });
    stplTable += '</tr></thead><tbody>';//Ende Kopfzeile
    zeile++;
    $.each(stundenraster, function (sk, sv) {
        spalte = 0;

        if (this.art == "stunde") {
            //  console.log(this);
            stplTable += '<tr>';
            stplTable += '<td id="cell_' + spalte + ':' + zeile + '" class="">' + this.bez + '</td>';
            spalte++;
            for (let i = 0; i < wochentage.length; i++) {
                stplTable += '<td data-cell="' + spalte + ':' + zeile + '" data-tag="' + spalte + '" data-stunde="' + zeile + '" id="cell' + spalte + '-' + zeile + '" class="stplEintrag"></td>';
                spalte++;
            }

            stplTable += '</tr>';//Ende Stundezeile
            zeile++;

        }

    });


    stplTable += '</tbody></table>';
    //  console.log(stplTable);
    return stplTable;
}



/**
 * sortiert einen Array von Objekten
 * @param {*} a 
 * @param {*} b 
 * @returns 
 */
function compareValues(key, order = 'asc') {
    return function innerSort(a, b) {
        if (!a.hasOwnProperty(key) || !b.hasOwnProperty(key)) {
            // property doesn't exist on either object
            return 0;
        }

        const varA = (typeof a[key] === 'string')
            ? a[key].toUpperCase() : a[key];
        const varB = (typeof b[key] === 'string')
            ? b[key].toUpperCase() : b[key];

        let comparison = 0;
        if (varA > varB) {
            comparison = 1;
        } else if (varA < varB) {
            comparison = -1;
        }
        return (
            (order === 'desc') ? (comparison * -1) : comparison
        );
    };
}






