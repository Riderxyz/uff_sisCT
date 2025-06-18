import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Status } from '../interfaces_crud/status.interface';
import { CadastroNacionalService } from './cadastro-nacional.service';

@Injectable({
  providedIn: 'root'
})
export class StatusService {
  // Array of Status objects shared across the application
  private statusArray: Status[] = [];

  // BehaviorSubject to make the array observable
  private statusSubject = new BehaviorSubject<Status[]>(this.statusArray);

  // Public observable for components to subscribe to
  public status$ = this.statusSubject.asObservable();

  constructor(private cadastroNacionalService: CadastroNacionalService) {
  }

  // Initialize status array with predefined values
  initializeStatusArray(statusItems: Status[]): void {
    this.statusArray = [...statusItems];
    this.notifyChanges();
  }

  // Get all status items
  getAll(): Status[] {
    return [...this.statusArray];
  }

  // Get status by ID (using index as ID)
  getById(index: number): Status | undefined {
    if (index >= 0 && index < this.statusArray.length) {
      return { ...this.statusArray[index] };
    }
    return undefined;
  }

  // Get status by specific criteria
  getBySecao(secao: number): Status[] {
    return this.statusArray.filter(item => item.secao === secao);
  }

  // Create new status
  create(status: Status): void {
    this.statusArray.push({ ...status });
    this.notifyChanges();
  }

  // Update status by secao and campo, add if not exists
  update(status: Status): void {
    // Find the index of the status item with matching secao and campo
    const index = this.statusArray.findIndex(
      item => item.secao === status.secao && item.campo === status.campo
    );

    if (index >= 0) {
      // Item exists, update it
      this.statusArray[index] = { ...status };
    } else {
      // Item doesn't exist, add it
      this.statusArray.push({ ...status });
    }

    this.notifyChanges();
  }

  // Delete status at specific index
  delete(index: number): boolean {
    if (index >= 0 && index < this.statusArray.length) {
      this.statusArray.splice(index, 1);
      this.notifyChanges();
      return true;
    }
    return false;
  }

  // Clear all status items
  clear(): void {
    this.statusArray = [];
    this.notifyChanges();
  }

  // Check if all items in a section are approved (status 0)
  isSecaoApproved(secao: number): boolean {
    const secaoItems = this.getBySecao(secao);

    // If no items found for this section, return false
    if (secaoItems.length === 0) {
      return false;
    }

    // Check if all items have situacao === 0 (approved)
    return secaoItems.every(item => item.situacao);
  }

  // Verify and update status based on cadastro nacional data
  verificarCamposPreenchidos(): void {
    const cadastro = this.cadastroNacionalService.getCurrentCadastro();

    // Process each status item
    for (let i = 0; i < this.statusArray.length; i++) {
      const status = this.statusArray[i];

      // Get the field value from cadastro using the campo property
      // This uses a dynamic property access approach
      const fieldValue = this.getNestedProperty(cadastro, status.campo);

      // Update status.situacao based on field value
      if (fieldValue === null || fieldValue === undefined || fieldValue === '') {
        // Field is empty or null, set status to 2
        this.statusArray[i] = { ...status, situacao: false };
      }
    }

    // Notify subscribers of the changes
    this.notifyChanges();
  }

  // Helper method to access nested properties using a string path
  private getNestedProperty(obj: any, path: string): any {
    if (!path) return undefined;

    const properties = path.split('.');
    let value = obj;

    for (const prop of properties) {
      if (value === null || value === undefined) {
        return undefined;
      }
      value = value[prop];
    }

    return value;
  }

  // Notify subscribers of changes
  private notifyChanges(): void {
    this.statusSubject.next([...this.statusArray]);
  }
}