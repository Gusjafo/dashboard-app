import { Component, inject } from "@angular/core";
import { Breakpoints, BreakpointObserver } from "@angular/cdk/layout";
import { map } from "rxjs/operators";
import { AsyncPipe } from "@angular/common";
import { MatGridListModule } from "@angular/material/grid-list";
import { MatMenuModule } from "@angular/material/menu";
import { MatIconModule } from "@angular/material/icon";
import { MatButtonModule } from "@angular/material/button";
import { MatCardModule } from "@angular/material/card";
import { MatSlideToggleModule } from "@angular/material/slide-toggle";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { CommonModule } from "@angular/common";

@Component({
  selector: "app-dashboard",
  template: `
    <div [ngClass]="{ 'dark-theme': isDarkMode, 'light-theme': !isDarkMode }">
      <div class="grid-container">
        <h1 class="mat-h1">
          Dashboard <mat-slide-toggle [(ngModel)]="isDarkMode"></mat-slide-toggle>
        </h1>
        <mat-grid-list cols="2" rowHeight="350px">
          @for (card of cards | async; track card) {
          <mat-grid-tile [colspan]="card.cols" [rowspan]="card.rows">
            <mat-card class="dashboard-card">
              <mat-card-header>
                <mat-card-title>
                  {{ card.title }}
                  <button
                    mat-icon-button
                    class="more-button"
                    [matMenuTriggerFor]="menu"
                    aria-label="Toggle menu">
                    <mat-icon>more_vert</mat-icon>
                  </button>
                  <mat-menu #menu="matMenu" xPosition="before">
                    <button mat-menu-item>Expand</button>
                    <button mat-menu-item>Remove</button>
                  </mat-menu>
                </mat-card-title>
                <mat-card-subtitle>pedro</mat-card-subtitle>
              </mat-card-header>
              <mat-card-content class="dashboard-card-content">
                <div>Card Content Here</div>
              </mat-card-content>
            </mat-card>
          </mat-grid-tile>
          }
        </mat-grid-list>
      </div>
    </div>
  `,
  styles: `
    .grid-container {
      margin: 20px;
    }
    
    .dashboard-card {
      position: absolute;
      top: 15px;
      left: 15px;
      right: 15px;
      bottom: 15px;
    }
    
    .more-button {
      position: absolute;
      top: 5px;
      right: 10px;
    }
    
    .dashboard-card-content {
      text-align: center;
    }
    
  `,
  standalone: true,
  imports: [
    AsyncPipe,
    MatGridListModule,
    MatMenuModule,
    MatIconModule,
    MatButtonModule,
    MatCardModule,
    MatSlideToggleModule,
    FormsModule,
    ReactiveFormsModule,
    CommonModule
  ],
})
export class DashboardComponent {
  private breakpointObserver = inject(BreakpointObserver);

  isDarkMode: boolean = false;

  /** Based on the screen size, switch from standard to one column per row */
  cards = this.breakpointObserver.observe(Breakpoints.Handset).pipe(
    map(({ matches }) => {
      if (matches) {
        return [
          { title: "Card 1", cols: 1, rows: 1 },
          { title: "Card 2", cols: 1, rows: 1 },
          { title: "Card 3", cols: 1, rows: 1 },
          { title: "Card 4", cols: 1, rows: 1 },
        ];
      }

      return [
        { title: "Card 1", cols: 2, rows: 1 },
        { title: "Card 2", cols: 1, rows: 1 },
        { title: "Card 3", cols: 1, rows: 2 },
        { title: "Card 4", cols: 1, rows: 1 },
      ];
    })
  );
}
