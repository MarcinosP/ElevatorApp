export interface Elevator {
  id: number;
  currentFloor: number;
  targetFloor: number;
  status: ElevatorStatus;
  direction: number;
  queue: number[];
  moving: boolean;
}

export enum AlgorithmType {
  FCFS = 'FCFS',
  ELEVATOR_ALGORITHM = 'ELEVATOR_ALGORITHM',
}

export enum ElevatorStatus {
  IDLE = 'IDLE',
  MOVING = 'MOVING',
}
