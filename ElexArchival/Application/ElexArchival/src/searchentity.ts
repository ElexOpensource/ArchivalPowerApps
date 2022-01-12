class searchEntity {

    searchEntityList() {
        let input, filter, table, tr, td, i;
        input = <HTMLInputElement>document.getElementById("entitySearch");
        filter = input.value.toUpperCase();
        table = <HTMLTableElement>document.getElementById("popUpTable");
        tr = table.getElementsByTagName("tr");
        for (i = 0; i < tr.length; i++) {
          td = tr[i].getElementsByTagName("td")[0];
          if (td) {
            if (td.innerHTML.toUpperCase().indexOf(filter) > -1) {
              tr[i].style.display = "";
            } else {
              tr[i].style.display = "none";
            }
          }       
        }
      }
    }
    export{searchEntity}