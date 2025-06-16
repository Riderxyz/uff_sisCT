// src/app/services/cnae.service.ts
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, of } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';
import { Cnae, CnaeDetalhado } from '../interfaces_crud/cnae.interface';
import { EnvironmentService } from './environment.service';

@Injectable({
    providedIn: 'root'
})
export class CnaeService {
    private apiUrl: string;

    // BehaviorSubject to store and share the CNAE list
    private cnaeListSubject = new BehaviorSubject<Cnae[]>([]);

    // Observable to expose the CNAE list
    public cnaeList$ = this.cnaeListSubject.asObservable();

    // Cache for CNAE data
    private cnaeCache: Cnae[] = [];

    constructor(
        private http: HttpClient,
        private environmentService: EnvironmentService
    ) {
        // Initialize API URL from environment service
        this.apiUrl = this.environmentService.cnaeApiUrl;

        // Load CNAE data when service is initialized
        this.getCnaes().subscribe();
    }

    // Get CNAEs from the API
    getCnaes(): Observable<Cnae[]> {
        // Return cached data if available
        if (this.cnaeCache.length > 0) {
            return of(this.cnaeCache);
        }

        return this.http.get<CnaeDetalhado[]>(this.apiUrl)
            .pipe(
                map(response => {
                    // Extract only id and descricao from each CNAE
                    return response.map(item => ({
                        id: item.id,
                        descricao: item.descricao
                    }));
                }),
                tap(cnaes => {
                    // Update the cache and the subject
                    this.cnaeCache = cnaes;
                    this.cnaeListSubject.next(cnaes);
                }),
                catchError(this.handleError<Cnae[]>('getCnaes', []))
            );
    }

    // Get detailed CNAE by ID
    getCnaeDetalhado(id: string): Observable<CnaeDetalhado> {
        const url = `${this.apiUrl}/${id}`;
        return this.http.get<CnaeDetalhado>(url)
            .pipe(
                catchError(this.handleError<CnaeDetalhado>(`getCnaeDetalhado id=${id}`))
            );
    }

    // Get CNAE by ID from cache or API
    getCnaeById(id: string): Observable<Cnae | undefined> {
        // Check cache first
        const cachedCnae = this.cnaeCache.find(cnae => cnae.id === id);
        if (cachedCnae) {
            return of(cachedCnae);
        }

        // If not in cache, get from API
        return this.getCnaeDetalhado(id).pipe(
            map(detalhado => ({
                id: detalhado.id,
                descricao: detalhado.descricao
            }))
        );
    }

    // Search CNAEs by description
    searchCnaes(term: string): Observable<Cnae[]> {
        if (!term.trim()) {
            return of([]);
        }

        // Search in cache first
        const termLower = term.toLowerCase();
        const results = this.cnaeCache.filter(cnae =>
            cnae.descricao.toLowerCase().includes(termLower) ||
            cnae.id.includes(term)
        );

        if (results.length > 0) {
            return of(results);
        }

        // If no results in cache, try API
        return this.http.get<CnaeDetalhado[]>(`${this.apiUrl}?filter=descricao:${term}`)
            .pipe(
                map(response => response.map(item => ({
                    id: item.id,
                    descricao: item.descricao
                }))),
                catchError(this.handleError<Cnae[]>('searchCnaes', []))
            );
    }

    // Get current CNAE list
    getCurrentCnaeList(): Cnae[] {
        return this.cnaeListSubject.getValue();
    }

    private handleError<T>(operation = 'operation', result?: T) {
        return (error: any): Observable<T> => {
            console.error(`${operation} failed: ${error.message}`);
            return of(result as T);
        };
    }
}
