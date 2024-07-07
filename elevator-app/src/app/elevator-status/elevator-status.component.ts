import { Component, OnInit, inject } from '@angular/core';
import { ElevatorService } from '../elevator/elevator.service';
import { AlgorithmType, Elevator } from '../elevator/elevator.model';
import { MatSnackBar, MatSnackBarConfig } from '@angular/material/snack-bar';

@Component({
  selector: 'app-elevator-status',
  templateUrl: './elevator-status.component.html',
  styleUrls: ['./elevator-status.component.scss'],
})
export class ElevatorStatusComponent implements OnInit {
  readonly AlgorithmType = AlgorithmType;

  private snackBar = inject(MatSnackBar);

  private elevatorService = inject(ElevatorService);

  elevators: Elevator[] = [];

  selectedElevatorId: number | null = null;

  startFloor: number | null = null;

  targetFloor: number | null = null;

  algorithm: AlgorithmType = AlgorithmType.FCFS;

  ngOnInit(): void {
    this.elevators = this.elevatorService.getElevators();
    setInterval(() => this.step(), 1000);
  }

  step(): void {
    this.elevatorService.step();
    this.elevators = this.elevatorService.getElevators();
  }

  initiatePickup(
    elevatorId: number | null,
    startFloor: number | null,
    targetFloor: number | null
  ): void {
    if (!this.isValidInput(elevatorId, startFloor, targetFloor)) {
      this.showErrorMessage(
        'Building floors range between -1 and 20, choose valid floor numbers'
      );
      return;
    }

    if (elevatorId !== null && startFloor !== null && targetFloor !== null) {
      const numericElevatorId = Number(elevatorId);
      try {
        this.elevatorService.initiatePickup(
          numericElevatorId,
          startFloor,
          targetFloor
        );
        this.elevators = this.elevatorService.getElevators();
      } catch (error) {
        this.showErrorMessage((error as Error).message);
      }
    } else {
      this.showErrorMessage('Please fill in all fields.');
    }
  }

  isValidInput(
    elevatorId: number | null,
    startFloor: number | null,
    targetFloor: number | null
  ): boolean {
    if (elevatorId === null || startFloor === null || targetFloor === null) {
      return false;
    }

    if (
      startFloor < -1 ||
      startFloor > 20 ||
      targetFloor < -1 ||
      targetFloor > 20
    ) {
      return false;
    }

    return true;
  }

  stopAllElevators(): void {
    this.elevatorService.stopAll();
  }

  continueAllElevators(): void {
    this.elevatorService.continueAll();
  }

  changeAlgorithm(): void {
    this.elevatorService.setAlgorithm(this.algorithm);
  }

  showErrorMessage(message: string): void {
    const config = new MatSnackBarConfig();
    config.panelClass = 'error-snackbar';
    config.verticalPosition = 'top';
    config.horizontalPosition = 'end';
    config.duration = 4000;

    this.snackBar.open(message, 'Close', config);
  }
}
