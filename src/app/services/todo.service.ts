import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Todo } from '../models/Todo';
import { Observable } from 'rxjs';
import { ThrowStmt } from '@angular/compiler';
//import { TodoService } from '../services/Todo.service'

const httpOptions = { 
  headers: new HttpHeaders({
    'Content-Type': 'application/jason'
  })
}

@Injectable({
  providedIn: 'root'
})
export class TodoService {
  todosUrl: string = 'https://jsonplaceholder.typicode.com/todos';
  todosLimit: string = '?_limit=5';

  constructor(private http: HttpClient) { }

  // get Todos
  getTodos(): Observable<Todo[]>{

    return this.http.get<Todo[]>(`${this.todosUrl}${this.todosLimit}`);
    
  }

  // Delete Todo
  deleteTodo(todo:Todo):Observable<Todo> {
    // remove from UI
    const url = `${this.todosUrl}/${todo.id}`;
    // remove from server
    return this.http.delete<Todo>(url, httpOptions)
  }

  // toggleCompleted
  toggleCompleted(todo: Todo):Observable<any> {
    const url = `${this.todosUrl}/${todo.id}`;
    return this.http.put (url, todo, httpOptions);
  }
}