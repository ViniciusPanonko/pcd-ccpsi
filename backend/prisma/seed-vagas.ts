import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
    console.log("Iniciando seed de vagas...");

    // 1. Criar Empresas
    const empresas = [
        { nome: "Tech Solutions", cnpj: "12345678000101", email: "rh@techsolutions.com" },
        { nome: "Inclusiva Serviços", cnpj: "98765432000199", email: "contato@inclusiva.com.br" },
        { nome: "Banco do Futuro", cnpj: "11222333000144", email: "vagas@bancofuturo.com" },
        { nome: "Varejo Super", cnpj: "55666777000188", email: "recrutamento@varejosuper.com" },
    ];

    const empresasCriadas = [];
    for (const emp of empresas) {
        const created = await prisma.empresa.upsert({
            where: { email: emp.email },
            update: {},
            create: {
                nome: emp.nome,
                cnpj: emp.cnpj,
                email: emp.email,
                senha: "123", // Senha padrão
            },
        });
        empresasCriadas.push(created);
        console.log(`Empresa criada/encontrada: ${created.nome}`);
    }

    // Buscar IDs de Subtipos e Acessibilidades para vincular
    const subtipos = await prisma.subtipoDeficiencia.findMany();
    const acessibilidades = await prisma.acessibilidade.findMany();

    if (subtipos.length === 0 || acessibilidades.length === 0) {
        console.error("ERRO: Execute o seed principal primeiro para criar tipos e acessibilidades!");
        return;
    }

    // Helpers para encontrar IDs
    const findSubtipo = (nomePart: string) => subtipos.find(s => s.nome.toLowerCase().includes(nomePart.toLowerCase()));
    const findAcess = (nomePart: string) => acessibilidades.find(a => a.descricao.toLowerCase().includes(nomePart.toLowerCase()));

    // 2. Criar Vagas
    const vagasData = [
        {
            empresaIdx: 0, // Tech Solutions
            descricao: "Desenvolvedor Frontend Júnior (Remoto)",
            escolaridade: "Ensino Superior Incompleto",
            subtiposAlvo: ["Paraplegia", "Auditiva", "Visual"],
            acessibilidades: ["Leitor de tela", "Libras", "Horário flexível"],
        },
        {
            empresaIdx: 0, // Tech Solutions
            descricao: "Analista de Dados Pleno",
            escolaridade: "Ensino Superior Completo",
            subtiposAlvo: ["Autismo", "Intelectual"],
            acessibilidades: ["Comunicação clara", "Ambiente calmo"],
        },
        {
            empresaIdx: 1, // Inclusiva Serviços
            descricao: "Auxiliar Administrativo",
            escolaridade: "Ensino Médio Completo",
            subtiposAlvo: ["Surdez", "Baixa Audição"],
            acessibilidades: ["Libras", "Sinalização visual"],
        },
        {
            empresaIdx: 1, // Inclusiva Serviços
            descricao: "Recepcionista Bilíngue (Libras)",
            escolaridade: "Ensino Médio Completo",
            subtiposAlvo: ["Surdez", "Motora"],
            acessibilidades: ["Rampas", "Banheiro adaptado"],
        },
        {
            empresaIdx: 2, // Banco do Futuro
            descricao: "Gerente de Contas",
            escolaridade: "Pós-graduação",
            subtiposAlvo: ["Baixa Visão", "Monocular"],
            acessibilidades: ["Fonte ampliada", "Leitor de tela"],
        },
        {
            empresaIdx: 3, // Varejo Super
            descricao: "Repositor de Estoque",
            escolaridade: "Ensino Fundamental Completo",
            subtiposAlvo: ["Intelectual", "Down"],
            acessibilidades: ["Comunicação clara", "Instruções simples"],
        },
        {
            empresaIdx: 3, // Varejo Super
            descricao: "Operador de Caixa",
            escolaridade: "Ensino Médio Completo",
            subtiposAlvo: ["Motora", "Nanismo"],
            acessibilidades: ["Mobiliário adaptado", "Banheiro adaptado"],
        },
    ];

    for (const v of vagasData) {
        const empresa = empresasCriadas[v.empresaIdx];

        const vaga = await prisma.vaga.create({
            data: {
                descricao: v.descricao,
                escolaridade: v.escolaridade,
                empresaId: empresa.id,
            },
        });

        // Vincular Subtipos
        const subtiposIds = v.subtiposAlvo
            .map(nome => findSubtipo(nome)?.id)
            .filter(id => id !== undefined) as number[];

        if (subtiposIds.length > 0) {
            await prisma.vagaSubtipo.createMany({
                data: subtiposIds.map(sid => ({ vagaId: vaga.id, subtipoId: sid })),
            });
        }

        // Vincular Acessibilidades
        const acessIds = v.acessibilidades
            .map(nome => findAcess(nome)?.id)
            .filter(id => id !== undefined) as number[];

        if (acessIds.length > 0) {
            await prisma.vagaAcessibilidade.createMany({
                data: acessIds.map(aid => ({ vagaId: vaga.id, acessibilidadeId: aid })),
            });
        }

        console.log(`Vaga criada: ${v.descricao} (Empresa: ${empresa.nome})`);
    }

    console.log("Seed de vagas concluído! 🚀");
}

main()
    .catch((e) => {
        console.error(e);
        process.exit(1);
    })
    .finally(async () => prisma.$disconnect());
