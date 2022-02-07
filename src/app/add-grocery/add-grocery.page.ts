import { Component, OnInit} from '@angular/core';
// import { groceryService } from './../shared/grocery.service';
import { Router } from '@angular/router';
import { ModalController } from '@ionic/angular';
import { FormGroup, FormBuilder } from '@angular/forms';
import { BarcodeScanner } from '@ionic-native/barcode-scanner/ngx';

@Component({
  selector: 'app-add-grocery',
  templateUrl: './add-grocery.page.html',
  styleUrls: ['./add-grocery.page.scss'],
})

export class AddGroceryPage implements OnInit {

  groceryForm: FormGroup;
  qrformat: any;
  qrvalue: any;
  constructor(
    public modalController: ModalController,
   // private groceryAPI: groceryService,
    private router: Router,
    public fb: FormBuilder,
    public barcodeScanner: BarcodeScanner,
  ) {
    this.groceryForm = this.fb.group({
      item_name: [''],
      manufacture: [''],
      qrformat: [''],
      qrvalue: ['']
    })
  }

  ngOnInit() { }

  onFormSubmit() {
    let params;
    if (!this.groceryForm.valid) {
      return false;
    } else {
      params = {
        ...this.groceryForm.value
      };

      this.modalController.dismiss(params);
    }
  }
  dismiss() {
    this.modalController.dismiss();
  }

  scanQRCode() {
    this.qrformat = null;
    this.qrvalue = null; 
    this.barcodeScanner.scan().then(barcodeData => {
      console.log('Barcode data', barcodeData);
      this.qrformat = barcodeData.format;
      this.qrvalue =  barcodeData.text; 
    }).catch(err => {
      console.log('Error', err);
    });
  }

}
