import {Component} from '@angular/core';
import {AlertController, IonicPage, Keyboard, NavController, NavParams, Platform} from 'ionic-angular';

/**
 * Generated class for the ChecklistPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
    selector: 'page-checklist',
    templateUrl: 'checklist.html',
    providers: [Keyboard]
})
export class ChecklistPage {

    checklist: any;


    constructor(public navCtrl: NavController, public navParams: NavParams, public alertCtrl: AlertController,) {

        this.checklist = this.navParams.get('checklist');

    }

    addItem(): void {
        let prompt = this.alertCtrl.create({
            title: "Add Item",
            message: "Enter the name of your new Item Below",
            inputs: [{
                name: 'name'
            }
            ], buttons: [{
                text: 'cancel'
            }, {
                text: 'save',
                handler: data => {
                    this.checklist.addItem(data.name)

                }
            }
            ]
        });

        prompt.present();
    }


    removeItem(item): void {
        this.checklist.removeItem(item);
    }

    renameItem(item): void {
        let prompt = this.alertCtrl.create({
            title: "Rename Item",
            message: "Rename your Item down below",
            inputs: [{
                name: 'name'
            }
            ], buttons: [{
                text: 'cancel'
            }, {
                text: 'save',
                handler: data => {
                    this.checklist.renameItem(item, data.name);
                }
            }
            ]
        });

        prompt.present();
    }


    toggleItem(item): void {
        this.checklist.toggleItem(item);
    }

    uncheckItem(): void {
        this.checklist.items.forEach((item) => {
            if (item.checked) {
                this.checklist.toggleItem(item);
            }
        })
    }

}
