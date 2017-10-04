import {Observable} from "rxjs/Observable";

export class ChecklistModel {

    checklist: any;
    checkListObserver: any;


    constructor(public title: string, public items: any[]) {
        this.items = items;


        this.checklist=Observable.create(observer =>{
            this.checkListObserver= observer;
        })
    }

    addItem(item): void {
        this.items.push({
            title: item,
            checked: false
        });

        this.checkListObserver.next(true);
    }

    removeItem(item): void {
        let index = this.items.indexOf(item);

        if (index > -1) {
            this.items.splice(index, 1);
        }

        this.checkListObserver.next(true);
    }

    renameItem(item, title): void {
        let index = this.items.indexOf(item);

        if (index > -1) {
            this.items[index].title = title;
        }
        this.checkListObserver.next(true);
    }

    setTitle(title): void {
        this.title = title;
        this.checkListObserver.next(true);
    }

    toggleItem(item): void {
        item.checked = item.checked;
        this.checkListObserver.next(true);
    }


    checkListUpdate():Observable<any>{
        return this.checklist;
    }


}