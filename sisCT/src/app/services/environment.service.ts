import { Injectable } from '@angular/core';
import { DOCUMENT } from '@angular/common';
import { Inject } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class EnvironmentService {
  // API URL configuration with environment variable fallback
  public apiUrl: string;
  
  // CNAE API URL
  public cnaeApiUrl: string;
  
  // Other environment configurations can be added here
  public production = false;
  public version = '1.0.0';
  
  constructor(@Inject(DOCUMENT) private document: Document) {
    // Try to get API URL from environment variable, fallback to default if not available
    const envApiUrl = this.getEnvironmentVariable('API_URL');
    this.apiUrl = envApiUrl || 'http://localhost:3000/api';
    
    // Try to get CNAE API URL from environment variable, fallback to default if not available
    const envCnaeApiUrl = this.getEnvironmentVariable('CNAE_API_URL');
    this.cnaeApiUrl = envCnaeApiUrl || 'https://servicodados.ibge.gov.br/api/v2/cnae/subclasses/';
  }
  
  private getEnvironmentVariable(name: string): string | null {
    // For browser environment, try to access from window.env
    interface EnvWindow extends Window {
      env?: { [key: string]: string };
    }
    const win = window as EnvWindow;
    if (typeof window !== 'undefined' && win.env && win.env[name]) {
      return win.env[name];
    }
    
    // For server-side rendering or other environments
    // In a real app, this would access process.env in Node.js
    return null;
  }
}