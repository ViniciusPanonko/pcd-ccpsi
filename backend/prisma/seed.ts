import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

async function main() {
  // limpa dados (apenas para desenvolvimento)
  await prisma.subtipoBarreira.deleteMany();
  await prisma.barreiraAcessibilidade.deleteMany();
  await prisma.acessibilidade.deleteMany();
  await prisma.barreira.deleteMany();
  await prisma.subtipoDeficiencia.deleteMany();
  await prisma.tipoDeficiencia.deleteMany();

  // --- 1. TIPOS ---
  const motora = await prisma.tipoDeficiencia.create({ data: { nome: "Física / Motora" } });
  const auditiva = await prisma.tipoDeficiencia.create({ data: { nome: "Auditiva" } });
  const visual = await prisma.tipoDeficiencia.create({ data: { nome: "Visual" } });
  const intelectual = await prisma.tipoDeficiencia.create({ data: { nome: "Intelectual / Mental" } });
  const tea = await prisma.tipoDeficiencia.create({ data: { nome: "Transtorno do Espectro Autista (TEA)" } });

  // --- 2. SUBTIPOS ---
  // Motora
  const paraplegia = await prisma.subtipoDeficiencia.create({ data: { nome: "Paraplegia", tipoId: motora.id } });
  const tetraplegia = await prisma.subtipoDeficiencia.create({ data: { nome: "Tetraplegia", tipoId: motora.id } });
  const amputacaoMMII = await prisma.subtipoDeficiencia.create({ data: { nome: "Amputação Membros Inferiores", tipoId: motora.id } });
  const amputacaoMMSS = await prisma.subtipoDeficiencia.create({ data: { nome: "Amputação Membros Superiores", tipoId: motora.id } });
  const nanismo = await prisma.subtipoDeficiencia.create({ data: { nome: "Nanismo", tipoId: motora.id } });

  // Auditiva
  const surdezTotal = await prisma.subtipoDeficiencia.create({ data: { nome: "Surdez Total", tipoId: auditiva.id } });
  const baixaAudicao = await prisma.subtipoDeficiencia.create({ data: { nome: "Baixa Audição", tipoId: auditiva.id } });

  // Visual
  const cegueira = await prisma.subtipoDeficiencia.create({ data: { nome: "Cegueira", tipoId: visual.id } });
  const baixaVisao = await prisma.subtipoDeficiencia.create({ data: { nome: "Baixa Visão", tipoId: visual.id } });
  const daltonismo = await prisma.subtipoDeficiencia.create({ data: { nome: "Daltonismo", tipoId: visual.id } });

  // Intelectual
  const sindromeDown = await prisma.subtipoDeficiencia.create({ data: { nome: "Síndrome de Down", tipoId: intelectual.id } });
  const deficienciaIntelectual = await prisma.subtipoDeficiencia.create({ data: { nome: "Deficiência Intelectual Leve", tipoId: intelectual.id } });

  // TEA
  const autismoNivel1 = await prisma.subtipoDeficiencia.create({ data: { nome: "Autismo Nível 1 (Leve)", tipoId: tea.id } });
  const autismoNivel2 = await prisma.subtipoDeficiencia.create({ data: { nome: "Autismo Nível 2 (Moderado)", tipoId: tea.id } });

  // --- 3. BARREIRAS ---
  const b_escadas = await prisma.barreira.create({ data: { descricao: "Escadas ou degraus" } });
  const b_portasEstreitas = await prisma.barreira.create({ data: { descricao: "Portas estreitas (< 80cm)" } });
  const b_banheiroInadequado = await prisma.barreira.create({ data: { descricao: "Banheiro sem adaptação" } });
  const b_objetosAltos = await prisma.barreira.create({ data: { descricao: "Objetos/Bancadas altas" } });

  const b_comunicacaoOral = await prisma.barreira.create({ data: { descricao: "Comunicação exclusivamente oral" } });
  const b_alertasSonoros = await prisma.barreira.create({ data: { descricao: "Alertas apenas sonoros" } });

  const b_leituraVisual = await prisma.barreira.create({ data: { descricao: "Informação apenas visual/escrita" } });
  const b_sistemasNaoLeitor = await prisma.barreira.create({ data: { descricao: "Sistemas incompatíveis com leitores de tela" } });
  const b_iluminacaoRuim = await prisma.barreira.create({ data: { descricao: "Iluminação inadequada" } });

  const b_excessoEstimulos = await prisma.barreira.create({ data: { descricao: "Excesso de estímulos sensoriais (som/luz)" } });
  const b_instrucoesComplexas = await prisma.barreira.create({ data: { descricao: "Instruções complexas ou ambíguas" } });

  // --- 4. ACESSIBILIDADES ---
  const a_rampa = await prisma.acessibilidade.create({ data: { descricao: "Rampas de acesso" } });
  const a_elevador = await prisma.acessibilidade.create({ data: { descricao: "Elevadores acessíveis" } });
  const a_banheiroAdaptado = await prisma.acessibilidade.create({ data: { descricao: "Banheiro adaptado (barras, espaço)" } });
  const a_portasLargas = await prisma.acessibilidade.create({ data: { descricao: "Portas largas (> 80cm)" } });
  const a_mobiliarioAdaptado = await prisma.acessibilidade.create({ data: { descricao: "Mobiliário com altura ajustável" } });

  const a_libras = await prisma.acessibilidade.create({ data: { descricao: "Intérprete de Libras" } });
  const a_legendas = await prisma.acessibilidade.create({ data: { descricao: "Legendas em vídeos/reuniões" } });
  const a_sinalizacaoVisual = await prisma.acessibilidade.create({ data: { descricao: "Sinalização visual de alertas" } });

  const a_leitorTela = await prisma.acessibilidade.create({ data: { descricao: "Compatibilidade com leitores de tela" } });
  const a_pisoTatil = await prisma.acessibilidade.create({ data: { descricao: "Piso tátil" } });
  const a_braille = await prisma.acessibilidade.create({ data: { descricao: "Sinalização em Braille" } });
  const a_fonteAmpliada = await prisma.acessibilidade.create({ data: { descricao: "Materiais com fonte ampliada" } });

  const a_ambienteCalmo = await prisma.acessibilidade.create({ data: { descricao: "Ambiente de trabalho silencioso" } });
  const a_comunicacaoClara = await prisma.acessibilidade.create({ data: { descricao: "Comunicação direta e objetiva" } });
  const a_horarioFlexivel = await prisma.acessibilidade.create({ data: { descricao: "Horário flexível" } });

  // --- 5. VÍNCULOS: SUBTIPO -> BARREIRA ---
  const vinculosSubtipoBarreira = [
    // Motora
    { s: paraplegia, b: [b_escadas, b_portasEstreitas, b_banheiroInadequado] },
    { s: tetraplegia, b: [b_escadas, b_portasEstreitas, b_banheiroInadequado, b_objetosAltos] },
    { s: nanismo, b: [b_objetosAltos] },

    // Auditiva
    { s: surdezTotal, b: [b_comunicacaoOral, b_alertasSonoros] },
    { s: baixaAudicao, b: [b_comunicacaoOral] },

    // Visual
    { s: cegueira, b: [b_leituraVisual, b_sistemasNaoLeitor] },
    { s: baixaVisao, b: [b_leituraVisual, b_iluminacaoRuim] },

    // TEA / Intelectual
    { s: autismoNivel1, b: [b_excessoEstimulos, b_instrucoesComplexas] },
    { s: sindromeDown, b: [b_instrucoesComplexas] },
  ];

  for (const item of vinculosSubtipoBarreira) {
    for (const barreira of item.b) {
      await prisma.subtipoBarreira.create({
        data: { subtipoId: item.s.id, barreiraId: barreira.id }
      });
    }
  }

  // --- 6. VÍNCULOS: BARREIRA -> ACESSIBILIDADE ---
  const vinculosBarreiraAcessibilidade = [
    { b: b_escadas, a: [a_rampa, a_elevador] },
    { b: b_portasEstreitas, a: [a_portasLargas] },
    { b: b_banheiroInadequado, a: [a_banheiroAdaptado] },
    { b: b_objetosAltos, a: [a_mobiliarioAdaptado] },

    { b: b_comunicacaoOral, a: [a_libras, a_legendas] },
    { b: b_alertasSonoros, a: [a_sinalizacaoVisual] },

    { b: b_leituraVisual, a: [a_leitorTela, a_braille, a_fonteAmpliada] },
    { b: b_sistemasNaoLeitor, a: [a_leitorTela] },

    { b: b_excessoEstimulos, a: [a_ambienteCalmo] },
    { b: b_instrucoesComplexas, a: [a_comunicacaoClara] },
  ];

  for (const item of vinculosBarreiraAcessibilidade) {
    for (const acess of item.a) {
      await prisma.barreiraAcessibilidade.create({
        data: { barreiraId: item.b.id, acessibilidadeId: acess.id }
      });
    }
  }

  console.log("Seed completo com sucesso! ✅");
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => prisma.$disconnect());
