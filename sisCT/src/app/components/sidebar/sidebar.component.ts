import { Component, OnInit } from '@angular/core';
import { UsuarioService } from '../../services/usuario.service';

@Component({
  selector: 'app-sidebar',
  standalone: false,
  templateUrl: './sidebar.component.html',
  styleUrl: './sidebar.component.scss'
})
export class SidebarComponent implements OnInit {
  constructor(private usuarioService: UsuarioService) {}
  
  ngOnInit(): void {
    // Initialize user data if needed
  }
}
