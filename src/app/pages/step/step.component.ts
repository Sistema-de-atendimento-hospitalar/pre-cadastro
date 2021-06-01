import { Component, OnInit } from '@angular/core';
import { MatStepper } from '@angular/material/stepper';

@Component({
  selector: 'app-step',
  templateUrl: './step.component.html',
  styleUrls: ['./step.component.scss']
})
export class StepComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

  load(stepper: MatStepper) {
    let selectedIndex = localStorage.getItem("selectedIndex")
    if (selectedIndex) {
      stepper.selectedIndex = Number.parseInt(selectedIndex)
    }
    console.log(`mudar para ${localStorage.getItem("selectedIndex")}`)
  }

  goForward(stepper: MatStepper) {
    stepper.next();
  }

  changeToStep(stepper: MatStepper, selectedIndex: number) {
    console.log(`mudar para ${selectedIndex}`)
  }
}
