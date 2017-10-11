import {Component} from '@angular/core';
import {AlertController, IonicPage, NavController, Platform} from 'ionic-angular';
import {ChecklistModel} from "../../models/Checklist-model";
import {DataProvider} from "../../providers/data/data";
import {Keyboard} from "@ionic-native/keyboard";


@IonicPage()
@Component({
    selector: 'page-home',
    templateUrl: 'home.html',
    providers: [Keyboard]
})
export class HomePage {


    checkLists: ChecklistModel[] = [];

    constructor(public navCtrl: NavController, public dataService: DataProvider, public alertCtrl: AlertController, public platform: Platform, public keyboard: Keyboard) {

    }

    ionViewDidLoad() {
        this.platform.ready().then(() => {

            this.dataService.getData().then((checklists) => {

                let savedChecklists: any = false;

                if (typeof(checklists) != "undefined") {
                    savedChecklists = JSON.parse(checklists)
                }

                if (savedChecklists) {

                    savedChecklists.forEach((savedChecklists) => {
                        let loadChecklist = new ChecklistModel(savedChecklists.title, savedChecklists.items);

                        this.checkLists.push((loadChecklist));

                        loadChecklist.checkListUpdate().subscribe(update => {
                            this.save();
                        })
                    })
                }
            })
        })

    }


    addChecklist(): void {

        let prompt = this.alertCtrl.create({
            title: "New CheckList",
            message: "Enter the name of your new Checklist Below",
            inputs: [{
                name: 'name'
            }
            ], buttons: [{
                text: 'cancel'
            }, {
                text: 'save',
                handler: data => {
                    let newCheckList = new ChecklistModel(data.name, []);
                    this.checkLists.push(newCheckList);

                    newCheckList.checkListUpdate().subscribe(update => {
                        this.save();
                    })
                }
            }
            ]
        });

        prompt.present();
    }

    renameCheckList(checklist): void {
        let prompt = this.alertCtrl.create({
            title: "Rename CheckList",
            message: "Rename your CheckList down below",
            inputs: [{
                name: 'name'
            }
            ], buttons: [{
                text: 'cancel'
            }, {
                text: 'save',
                handler: data => {

                    let index = this.checkLists.indexOf(checklist);
                    if (index > -1) {
                        this.checkLists[index].setTitle(data.name);
                        this.save();
                    }


                }
            }
            ]
        });

        prompt.present();
    }

    viewCheckList(checklist): void {
        this.navCtrl.push('ChecklistPage', {
            checklist: checklist
        })
    }

    removeCheckList(checklist): void {
        let index = this.checkLists.indexOf(checklist);

        if (index > -1) {
            this.checkLists.splice(index, 1);
        }

    }

    save(): void {
        this.keyboard.close();
        this.dataService.save(this.checkLists)
    }


}
