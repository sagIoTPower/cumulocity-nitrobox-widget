import { Component, OnInit, Input } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { filter, first, flatMap, map } from 'rxjs/operators';
import { DatePipe } from '@angular/common';
import { IManagedObject, InventoryService } from '@c8y/client';
import { NxDeviceDetailsWidgetService } from './nx-device-details-widget.service';

@Component({
  selector: 'lib-nx-device-details-widget',
  templateUrl: './nx-device-details-wiget.html',
  styleUrls: ['card-fancy-example.css']
})
export class NxDeviceDetailsWidgetComponent implements OnInit {

  @Input() config;
  deviceDetails: any;
  subscription: any;
  debtors$: Observable<Debtor[]>;
  address$: Observable<Address[]>;
  selectedDebtor: string = '';
  selectedAddress: string = '';

  constructor(
    public nxDetailService: NxDeviceDetailsWidgetService,
    public inventory: InventoryService,
  ) { }

  async ngOnInit() {
    //console.log(this.config);

    this.nxDetailService.fetchManagedObject(this.config.device.id).then(
      (data) => {
        this.deviceDetails = data.c8y_Billing;
        this.selectedDebtor = data.c8y_Billing.debtorId;
        this.selectedAddress = data.c8y_Billing.addressId;
        this.address$ = this.debtors$.pipe(
          map(x => x.filter(deb => deb.debtorId == this.selectedDebtor)[0]),
          map(x => x.addresses)
        )
        console.log(this.deviceDetails);
      }
    );

    console.log("Start subscription ...", this.config);
    this.subscription = this.nxDetailService.subscribeToMOChannel(
      this.config.device.id,
      this.updateMO.bind(this)  //bind the component to update
    );
    this.debtors$ = this.nxDetailService.getDebtors()
  }

  ngOnDestroy(): void {
    console.log("Stop subscription");
    this.nxDetailService.unsubscribeFromMOChannel(this.subscription);
  }

  createContract(): void {
    console.log("Create contract");
    //    "date": "2021-04-20T12:23:34.389Z",
    let d = new Date();
    let contract= new Contract(null, this.deviceDetails.debtorId,d.toISOString() ,this.deviceDetails.planId,"contract for:" + this.deviceDetails.planId + d.toISOString(),this.deviceDetails.addressId)
    console.log("Create contract", contract);
    this.nxDetailService.createContract(contract).subscribe (contract =>
      {
        const partialUpdateObject: Partial<IManagedObject> = {
          c8y_Billing: {
            ...this.deviceDetails,
            ...{ contractId: contract.contractId + '' }
          },
          id: this.config.device.id
        };
    
        (async () => {
          const { data, res } = await this.inventory.update(partialUpdateObject);
        })();
      })

  }

  updateMO(d: object): void {
    let o = d['data']['data'];
    //console.log("Changed MO:", o)
    this.deviceDetails = o['c8y_Billing'];
  }

  debtorChanged(debtor: string): void {
    console.log("Debtor changed", debtor)
    this.address$ = this.debtors$.pipe(
      map(x => x.filter(deb => deb.debtorId == debtor)[0]),
      map(x => x.addresses)
    )

    //console.log("onChangeGeneric:", event.target.checked, event.target.id)

    const partialUpdateObject: Partial<IManagedObject> = {
      c8y_Billing: {
        ...this.deviceDetails,
        ...{ debtorId: debtor + '' }
      },
      id: this.config.device.id
    };

    (async () => {
      const { data, res } = await this.inventory.update(partialUpdateObject);
    })();
  }

  addressChanged(address: string): void {
    console.log("Address changed", address)

    const partialUpdateObject: Partial<IManagedObject> = {
      c8y_Billing: {
        ...this.deviceDetails,
        ...{ addressId: address + '' }
      },
      id: this.config.device.id
    };

    (async () => {
      const { data, res } = await this.inventory.update(partialUpdateObject);
    })();
  }
}

export class Debtor {
  constructor(debtorId: string, debtorIdent: string, addresses: Address[]) {
    this.debtorId = debtorId
    this.debtorIdent = debtorIdent
    this.addresses = addresses
  }
  debtorId: string
  debtorIdent: string
  addresses: Address[]
}

export class Address {
  constructor(addressId: string, addressType: string, city: string) {
    this.addressId = addressId
    this.addressType = addressType
    this.city = city
  }
  addressId: string
  addressType: string
  city: string
}

export class Contract {
  constructor(contractId: string, debtorId: string, date: string, planId: string, contractIdent: string, invoiceAddressId: string) {
    this.contractId = contractId
    this.debtorId = debtorId
    this.date = date
    this.planId = planId
    this.contractIdent = contractIdent
    this.invoiceAddressId = invoiceAddressId
  }
  contractId: string
  debtorId: string
  date: string
  planId: string
  contractIdent: string
  invoiceAddressId: string
}