import { ComponentFactoryResolver, Injectable, ViewContainerRef } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class DynamicLoadComponentService {

  constructor(private componentFactoryResolver : ComponentFactoryResolver) { }

 async loadComponent(component:DynamicComponent,viewContainerRef: ViewContainerRef){
    let _component: any = null;

    switch(component){
      case DynamicComponent.BasketsComponent:
        _component = (await import("../../ui/components/baskets/baskets.component")).BasketsComponent;
        break;
    }

    viewContainerRef.clear();
    return viewContainerRef.createComponent(this.componentFactoryResolver.resolveComponentFactory(_component))

  }
}

export enum DynamicComponent{
  BasketsComponent
}
