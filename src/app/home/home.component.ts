import { Component } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { AuthService } from '@app/shared/services';

@Component({
	selector: 'app-home',
	templateUrl: './home.component.html',
	styleUrls: ['./home.component.scss'],
	providers: [AuthService],
})

export class HomeComponent {

	TaskForm = new FormGroup({
		title: new FormControl(""),
		content: new FormControl(""),
	});

	tasks: any[] = [];

	constructor(private authService: AuthService) { }

	addTask(): void {
		this.authService.addTask({
			title: this.TaskForm.get("title")!.value,
			content: this.TaskForm.get("content")!.value,
		}).subscribe((response) => {
			console.log("Task added succesfully: ", response);
		});
		window.location.reload();
	}
	editTask(): void {
		this.authService.editTask({
			title: this.TaskForm.get("title")!.value,
			content: this.TaskForm.get("content")!.value,
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
