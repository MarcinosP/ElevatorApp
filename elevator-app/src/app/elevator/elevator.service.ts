import { Injectable } from '@angular/core';
import { AlgorithmType, Elevator, ElevatorStatus } from './elevator.model';

@Injectable({
  providedIn: 'root',
})
export class ElevatorService {
  private elevators: Elevator[] = Array.from({ length: 16 }, (_, i) => ({
    id: i + 1,
    currentFloor: 0,
    targetFloor: 0,
    status: ElevatorStatus.IDLE,
    direction: 0,
    queue: [],
    moving: true,
  }));

  private currentAlgorithm: AlgorithmType = AlgorithmType.FCFS;

  private handleFcfs(elevator: Elevator): void {
    if (elevator.queue.length > 0) {
      elevator.targetFloor = elevator.queue.shift()!;
      elevator.direction =
        elevator.currentFloor < elevator.targetFloor ? 1 : -1;
    } else {
      elevator.status = ElevatorStatus.IDLE;
      elevator.direction = 0;
    }
  }

  private handleElevator(elevator: Elevator): void {
    if (elevator.queue.length > 0) {
      if (elevator.direction === 1) {
        elevator.queue.sort((a, b) => a - b);
      } else {
        elevator.queue.sort((a, b) => b - a);
      }

      elevator.targetFloor = elevator.queue.shift()!;
    } else {
      elevator.status = ElevatorStatus.IDLE;
      elevator.direction = 0;
    }
  }

  getElevators(): Elevator[] {
    return this.elevators;
  }

  setAlgorithm(algorithm: AlgorithmType): void {
    this.currentAlgorithm = algorithm;
  }

  step(): void {
    this.elevators.forEach((elevator) => {
      if (elevator.moving && ElevatorStatus.MOVING) {
        if (elevator.currentFloor < elevator.targetFloor) {
          elevator.currentFloor++;
        } else if (elevator.currentFloor > elevator.targetFloor) {
          elevator.currentFloor--;
        }

        if (elevator.currentFloor === elevator.targetFloor) {
          if (this.currentAlgorithm === AlgorithmType.FCFS) {
            this.handleFcfs(elevator);
          } else if (
            this.currentAlgorithm === AlgorithmType.ELEVATOR_ALGORITHM
          ) {
            this.handleElevator(elevator);
          }
        }
      }
    });
  }

  initiatePickup(
    elevatorId: number,
    startFloor: number,
    targetFloor: number
  ): void {
    const elevator = this.elevators.find((e) => e.id === elevatorId);

    if (elevator) {
      if (elevator.status === ElevatorStatus.IDLE) {
        elevator.targetFloor = startFloor;
        elevator.direction = elevator.currentFloor < startFloor ? 1 : -1;
        elevator.status = ElevatorStatus.MOVING;
      } else {
        elevator.queue.push(startFloor);
      }
      elevator.queue.push(targetFloor);
    } else {
      console.error(`Elevator ${elevatorId} not found`);
    }
  }

  stopAll(): void {
    this.elevators.forEach((elevator) => (elevator.moving = false));
  }

  continueAll(): void {
    this.elevators.forEach((elevator) => (elevator.moving = true));
  }

  status(): [number, number, number][] {
    return this.elevators.map((elevator) => [
      elevator.id,
      elevator.currentFloor,
      elevator.targetFloor,
    ]);
  }
}
