import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { AppState } from '../../app.reducer';
import { EntradaSortida } from 'src/app/models/entrada-sortida.model';

// Grafiques
 // import { ChartType } from 'chart.js';
import { MultiDataSet, Label } from 'ng2-charts';


@Component({
  selector: 'app-estadistica',
  templateUrl: './estadistica.component.html',
  styles: [
  ]
})
export class EstadisticaComponent implements OnInit {

  entrades = 0;
  sortides = 0;

  totalEntrades = 0;
  totalSortides = 0;

  public doughnutChartLabels: Label[] = ['Entrades', 'Sortides'];
  public doughnutChartData: MultiDataSet = [];



  constructor( private store: Store<AppState>) { }

  ngOnInit(): void {
    this.store.select('entradesSortides').subscribe( ({ items }) => this.generarEstadistica(items));
  }

  generarEstadistica( items: EntradaSortida[]) {

      this.totalEntrades = 0;
      this.totalSortides = 0;
      this.entrades = 0;
      this.sortides = 0;

      for (const item of items) {
        if (item.tipus === 'ingres') {
          this.totalEntrades += item.quantitat;
          this.entrades ++;
        } else {
          this.totalSortides += item.quantitat;
          this.sortides ++;
        }

      }
      this.doughnutChartData = [[ this.totalEntrades, this.totalSortides]];
  }
  

}
