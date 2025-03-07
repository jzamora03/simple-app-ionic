import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule, NavController, AlertController } from '@ionic/angular';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-menu',
  standalone: true,
  imports: [CommonModule, IonicModule],
  templateUrl: './menu.page.html',
  styleUrls: ['./menu.page.scss'],
})
export class MenuPage implements OnInit {
  userName: string = 'Usuario';
  title: string = 'Cargando...';
  todos: any[] = [];

  constructor(private navCtrl: NavController, private http: HttpClient, private alertCtrl: AlertController) {}

  ngOnInit() {
 
    this.userName = localStorage.getItem('userName') || 'Usuario';
    this.fetchData();
  }

  async fetchData() {
    this.http.get<any[]>('https://jsonplaceholder.typicode.com/todos').subscribe(
      response => {
        this.todos = response.slice(0, 5);
        this.title = this.todos[0]?.title || 'Sin datos';
      },
      error => {
        this.title = 'Error al cargar datos';
      }
    );
  }

  async createRequest() {
    const alert = await this.alertCtrl.create({
      header: 'Crear Solicitud',
      inputs: [
        { name: 'title', type: 'text', placeholder: 'Título de la solicitud' }
      ],
      buttons: [
        { text: 'Cancelar', role: 'cancel' },
        {
          text: 'Guardar',
          handler: (data) => {
            if (data.title) {
              this.todos.push({ id: this.todos.length + 1, title: data.title, completed: false });
            }
          }
        }
      ]
    });
    await alert.present();
  }

  async editRequest() {
    const alert = await this.alertCtrl.create({
      header: 'Editar Solicitud',
      inputs: this.todos.map(todo => ({
        name: `todo_${todo.id}`,
        type: 'text',
        value: todo.title,
        placeholder: `Editar ${todo.title}`
      })),
      buttons: [
        { text: 'Cancelar', role: 'cancel' },
        {
          text: 'Guardar Cambios',
          handler: (data) => {
            this.todos.forEach(todo => {
              if (data[`todo_${todo.id}`]) {
                todo.title = data[`todo_${todo.id}`];
              }
            });
          }
        }
      ]
    });
    await alert.present();
  }

  async consultRequest() {
    const alert = await this.alertCtrl.create({
      header: 'Consultas',
      message: this.todos.map(todo => `<p>${todo.id}: ${todo.title} - ${todo.completed ? '✅ Completado' : '❌ Pendiente'}</p>`).join(''),
      buttons: ['OK']
    });
    await alert.present();
  }

  async syncRequest() {
    this.title = 'Sincronizando...';
    setTimeout(() => {
      this.fetchData();
      this.title = 'Datos sincronizados';
    }, 2000);
  }

  logout() {
    localStorage.removeItem('userName');
    this.navCtrl.navigateBack('/login');
  }
}
