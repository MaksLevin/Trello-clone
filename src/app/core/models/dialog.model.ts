import { ComponentType } from '@angular/cdk/portal';

export interface DialogModel<T> {
  typeDialog: ComponentType<T>;
  message: string;
  enterAnimationDuration?: string;
  exitAnimationDuration?: string;
}
