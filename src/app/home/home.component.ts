import { Component } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { AuthService } from '@app/shared/services';
import { NoteComponent } from '@app/note/note.component';
import { boolean } from 'joi';

@Component({
	selector: 'app-home',
	templateUrl: './home.component.html',
	styleUrls: ['./home.component.scss'],
	providers: [AuthService],
	viewProviders: [NoteComponent]
})

export class HomeComponent {

	TaskForm = new FormGroup({
		title: new FormControl(""),
		content: new FormControl(""),
		done: new FormControl(""),
		assignee: new FormControl(""),
	});

	tasks: any[] = [];

	constructor(private authService: AuthService) { }

	addTask(): void {
		this.authService.addTask({
			title: this.TaskForm.get("title")!.value,
			content: this.TaskForm.get("content")!.value,
			done: this.TaskForm.get("done")!.value,
			assignee: this.TaskForm.get("assignee")!.value,
		}).subscribe((response) => {
			console.log("Task added succesfully: ", response);
		});
		window.location.reload();
	}
	editTask(): void {
		this.authService.editTask({
			title: this.TaskForm.get("title")!.value,
			content: this.TaskForm.get("content")!.value,
			done: this.TaskForm.get("done")!.value,
			assignee: this.TaskForm.get("assignee")!.value,
		}).subscribe((response) => {
			console.log("Task edited succesfully: ", response);
		});
		window.location.reload();
	}

	getTasks(): void {
		this.authService.getTasks().subscribe((response) => {
			this.tasks = response['taskList'];
		});
	}
}
