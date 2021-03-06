import { Component, OnInit } from '@angular/core';
import { MatStepper } from '@angular/material/stepper';

@Component({
  selector: 'app-step',
  templateUrl: './step.component.html',
  styleUrls: ['./step.component.scss']
})
export class StepComponent implements OnInit {

  ngOnInit(): void {
    
  }

  load(stepper: MatStepper) {
    let selectedIndex = localStorage.getItem("selectedIndex")
    if (selectedIndex) {
      stepper.selectedIndex = Number.parseInt(selectedIndex)
    }
  }

  goForward(stepper: MatStepper) {
    stepper.next();
  }
}
