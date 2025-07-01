export interface MapaDeVagas {
    pkMapaDeVagas?: number;
    stDisponibilidade: number; // NUMBER(1,0) - 0 para false, 1 para true
    dsIdentificacaoAcolhido: string;
    nuCpf: number | null;
    dtNascimento: string; // Tipo string para input type="date"
    dtIngresso: string;
    dtSaida: string | null; // Pode ser nulo
    stPublico: number;
    stGratuidade: number;
    stFinanciamento: number;
    stAtivo: number;
    dtUltimaAtualizacao?: string; // TIMESTAMP(6) - tipo string para display
    pkCadastroNacional: number;
}