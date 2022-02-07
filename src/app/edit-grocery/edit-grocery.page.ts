import { Component, OnInit } from '@angular/core';
// import { groceryService } from './../shared/grocery.service';
import { Grocery } from '../shared/grocery';
import { ActivatedRoute, Router } from '@angular/router';
import { FormGroup, FormBuilder } from '@angular/forms';
import { ModalController } from '@ionic/angular';
import { BarcodeScanner } from '@ionic-native/barcode-scanner/ngx';

@Component({
  selector: 'app-edit-grocery',
  templateUrl: './edit-grocery.page.html',
  styleUrls: ['./edit-grocery.page.scss'],
})
export class EditGroceryPage implements OnInit {

  updateGroceryForm: FormGroup;
  id: any;
  grocery: Grocery;
  qrformat: any;
  qrvalue: any;

  constructor(
    public modalController: ModalController,
   // private groceryAPI: groceryService,
    private actRoute: ActivatedRoute,
    private router: Router,
    public fb: FormBuilder,
    public barcodeScanner: BarcodeScanner
  ) {
    // <!-- this.id = this.actRoute.snapshot.paramMap.get('id'); -->
   // this.id = this.grocery ? this.grocery._id : this.actRoute.snapshot.paramMap.get('id');
     this.updateGroceryForm = this.fb.group({
      item_name: this.grocery ? this.grocery.item_name : '',
      manufacture: this.grocery ? this.grocery.manufacture : '',
      qrformat: this.grocery ? this.grocery.qrformat : '',
      qrvalue: this.grocery ? this.grocery.qrvalue : ''
   })
  }

  ngOnInit() {
    // this.getgroceryData(this.id);
    this.updateGroceryForm = this.fb.group({
     item_name: [''],
     manufacture: [''],
     qrformat: [''],
     qrvalue: ['']
   })

    this.updateGroceryForm.get('item_name').setValue(this.grocery.item_name);
    this.updateGroceryForm.get('manufacture').setValue(this.grocery.manufacture);
    this.updateGroceryForm.get('qrformat').setValue(this.grocery.qrformat);
    this.updateGroceryForm.get('qrvalue').setValue(this.grocery.qrvalue);
    console.log(this.grocery);
  }

/*   getgroceryData(id) {
    this.groceryAPI.getgrocery(id).subscribe(res => {
      this.updategroceryForm.setValue({
        item_name: res['item_name'],
        manufacture: res['manufature']
      });
    });
  } */

  updateForm() {
    let params;
    if (!this.updateGroceryForm.valid) {
      return false;
    } else {
      params = {
        ...this.updateGroceryForm.value
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
