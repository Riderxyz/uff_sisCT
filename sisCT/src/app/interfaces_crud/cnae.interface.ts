// src/app/interfaces_crud/cnae.interface.ts
export interface Cnae {
    id: string;
    descricao: string;
}

export interface CnaeDetalhado {
    id: string;
    descricao: string;
    classe: {
        id: string;
        descricao: string;
        grupo: {
            id: string;
            descricao: string;
            divisao: {
                id: string;
                descricao: string;
                secao: {
                    id: string;
                    descricao: string;
                }
            }
        };
        observacoes: string[];
    };
    atividades: string[];
    observacoes: string[];
}
