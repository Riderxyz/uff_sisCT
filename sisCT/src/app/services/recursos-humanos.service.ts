import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, map } from 'rxjs';
import { RecursoHumano } from '../interfaces_crud/recursos-humanos.interface';


@Injectable({
    providedIn: 'root'
})
export class RecursosHumanosService {
    private recursosSubject = new BehaviorSubject<RecursoHumano[]>([]);
    recursos$ = this.recursosSubject.asObservable();
    idAtual = 0;
    private editModeSubject = new BehaviorSubject<boolean>(false);
    editMode$: Observable<boolean> = this.editModeSubject.asObservable();
    constructor() { }
    entrarModoEdicao(): void {
        this.editModeSubject.next(true);
    }

    // Método para desativar o modo de edição
    sairModoEdicao(): void {
        this.editModeSubject.next(false);
    }

    // (Opcional) Método para alternar o estado atual
    toggleModoEdicao(): void {
        this.editModeSubject.next(!this.editModeSubject.value);
    }

    // Cria um novo recurso
    criar(recurso: Omit<RecursoHumano, 'pkRecursosHumanos'>): void {
        const recursos = this.recursosSubject.value;
        const novoId = recursos.length > 0
            ? Math.max(...recursos.map(r => r.pkRecursosHumanos)) + 1
            : 1;

        const novoRecurso: RecursoHumano = {
            ...recurso,
            pkRecursosHumanos: novoId,
            stAtivo: 1,
            dtUltimaAtualizacao: new Date()
        };

        this.recursosSubject.next([...recursos, novoRecurso]);
    }

    // Lê recursos (com filtro de ativos)
    listar(mostrarInativos: boolean = false): Observable<RecursoHumano[]> {
        return this.recursos$.pipe(
            map(recursos =>
                mostrarInativos
                    ? recursos
                    : recursos.filter(r => r.stAtivo === 1 || mostrarInativos)
            )
        );
    }

    // Atualiza um recurso
    atualizar(id: number, atualizacao: Partial<RecursoHumano>): void {
        const recursos = this.recursosSubject.value;
        const index = recursos.findIndex(r => r.pkRecursosHumanos === id);

        if (index !== -1) {
            const recursoAtualizado = {
                ...recursos[index],
                ...atualizacao,
                dtUltimaAtualizacao: new Date()
            };

            const novosRecursos = [...recursos];
            novosRecursos[index] = recursoAtualizado;
            this.recursosSubject.next(novosRecursos);
        }
    }

    // Exclusão lógica (marca como inativo)
    deletar(id: number): void {
        this.atualizar(id, { stAtivo: 0 });
    }

    // Busca por ID
    obterPorId(id: number): Observable<RecursoHumano | undefined> {
        return this.recursos$.pipe(
            map(recursos => recursos.find(r => r.pkRecursosHumanos === id))
        );
    }


}