import { Component, OnInit, NgZone} from '@angular/core';
import { BarcodeScanner } from '@ionic-native/barcode-scanner/ngx';
import { GroceryService } from '../shared/grocery.service';
import {Grocery} from '../shared/grocery';
import { ModalController, PopoverController } from '@ionic/angular';
import { AddGroceryPage } from '../add-grocery/add-grocery.page';
import { EditGroceryPage } from '../edit-grocery/edit-grocery.page';
import { Router } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { Storage } from '@ionic/storage';
import { ToastController } from '@ionic/angular';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})

export class HomePage implements OnInit {
  Grocerys: any = [];
  data:any; 
  authdata = '';

  constructor(
    private authService: AuthService, 
    private storage: Storage, 
    private toastController: ToastController,
    private GroceryService: GroceryService,
    private zone: NgZone,
    private router: Router,
    private barcodeScanner: BarcodeScanner,
    public modalController: ModalController,
    public popoverController: PopoverController
  ) {
  }

  ngOnInit() { }

  ionViewDidEnter() {
    this.GroceryService.getGroceryList().subscribe((res) => {
      console.log(res);
      this.Grocerys = res;
    })
  }

  scan() {
    this.data = null;
    this.barcodeScanner.scan().then(barcodeData => {
      console.log('Barcode data', barcodeData);
      this.data = barcodeData;
    }).catch(err => {
      console.log('Error', err);
    });
  }

  deleteGrocery(GroceryItem: Grocery) {
    if (window.confirm('Do you want to delete Grocery?')) {
      this.GroceryService.deleteGrocery(GroceryItem._id)
        .subscribe(() => {
          this.Grocerys.forEach((element,index) => {
            if ( element._id === GroceryItem._id) this.Grocerys.splice(index,1);
            }
          );
          console.log('Grocery deleted!');
          }
        )
    }
  }

  async addGrocery() {
    const modal = await this.modalController.create({
      component: AddGroceryPage,
      componentProps: {
        item_name: '',
        manufacture: '',
        qrformat: '',
        qrvalue: ''
      }
    });
    await modal.present();
    const response = await modal.onDidDismiss();
    const Grocery = response.data as Grocery;
    if (Grocery) {
      this.GroceryService.addGrocery(Grocery)
      .subscribe((res) => {
        this.zone.run(() => {
          console.log(res);
          this.Grocerys.push(res);
         // this.router.navigateByUrl('/');
        })
      });
    }
  }
  async editGrocery(GroceryItem: Grocery) {
    const modal = await this.modalController.create({
      component: EditGroceryPage,
      componentProps: {
        Grocery: GroceryItem
      }
    });
    await modal.present();
    const response = await modal.onDidDismiss();
    const Grocery = response.data as Grocery;
    console.log('edited Grocery: ' + Grocery);
    if (Grocery) {
      this.GroceryService.updateGrocery(GroceryItem._id, Grocery)
      .subscribe((res) => {
        this.zone.run(() => {
          console.log(res);
          const index = this.Grocerys.indexOf(GroceryItem);
          this.Grocerys[index] = res;
        })
      });
    }
  }

  logout() {
    this.authService.logout();
  }

  clearToken() {
    // ONLY FOR TESTING!
    this.storage.remove('access_token');

    let toast = this.toastController.create({
      message: 'JWT removed',
      duration: 3000
    });
    toast.then(toast => toast.present());
  }  
}