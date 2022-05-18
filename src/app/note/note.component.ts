import { Component } from "@angular/core";

@Component({
    selector: 'note',
    templateUrl: './note.component.html',
    styleUrls: ['./note.component.scss']
})

export class NoteComponent {
    title: String;
    tasks: Array<any>;

    constructor() {
        this.title = "";
        this.tasks = [];
    }
}