/*
  ============================================================
  DADOS DO SITE — É AQUI QUE VOCÊ ATUALIZA TUDO
  ============================================================
  - Campo com null  -> o site mostra "Em atualização" (nada quebra).
  - Documento com arquivo: null -> aparece como "Em breve".
  - Para publicar um documento: coloque o PDF na pasta /docs e
    troque  arquivo: null  por  arquivo: "docs/nome-do-arquivo.pdf".
  - Para incluir uma nova parceria/emenda: copie um bloco de
    "parcerias" e ajuste. O site cria o botão e a página sozinho.
  - NUNCA publique CPF, RG, conta bancária, endereço de pessoa
    física nem dados/fotos de crianças sem autorização por escrito.
    Use versão pública (tarjada) dos documentos.
*/
window.LIGA = {
  nome: "Liga Independente de Esporte Amador de Vila Velha",
  sigla: "LIEAV",
  cnpj: "04.451.439/0001-91",
  cidade: "Vila Velha – ES",
  presidente: "Fabrício",            // acrescente o sobrenome
  atualizadoEm: "24/09/2026",

  // Preencha o que quiser exibir. Vazio ("") = o botão some.
  contato: {
    whatsapp: "",                    // só números com DDI: 5527999999999
    email: "",
    instagram: "",                   // ex.: "https://instagram.com/ligav"
    endereco: ""
  },

  // Onde o torcedor acompanha tabela, jogos e ranking
  linkTabelas: "https://varzapp.com",

  /* ---------------------------------------------------------
     MODALIDADES em destaque na página inicial
     --------------------------------------------------------- */
  modalidades: [
    { icone: "⚽", nome: "Futebol", texto: "Do campo de terra à Super Copa da Várzea: campeonatos de futebol amador com times de bairro de várias regiões do Espírito Santo." },
    { icone: "🥋", nome: "Judô", texto: "Apoio à equipe de judô, com transporte e estrutura para disputar campeonatos fora do estado, como o do Rio de Janeiro." },
    { icone: "🏄", nome: "Surf", texto: "Surf Para Todos: aulas gratuitas e inclusão pelo esporte para crianças e adolescentes, na Praia D'Ulé, em Guarapari." },
    { icone: "➕", nome: "E muito mais", texto: "A Liga apoia e realiza eventos esportivos em várias modalidades. Tem um esporte, um time ou um projeto para levar ao calendário? Fale com a gente." }
  ],

  /* ---------------------------------------------------------
     PARCERIAS E EMENDAS (aparecem só na aba Transparência)
     --------------------------------------------------------- */
  parcerias: [
    {
      id: "super-copa",
      nome: "Super Copa da Várzea 2026",
      tag: "Emenda parlamentar",
      valorTotal: 200000,
      recebido: null,                // valor já repassado (número)
      executado: null,               // valor já pago/gasto (número)
      resumo: "Recursos de emenda parlamentar aplicados na realização da Super Copa da Várzea 2026: premiação em dinheiro aos times, estrutura operacional, arbitragem, comunicação e logística.",
      ficha: [
        ["Entidade beneficiária", "Liga Independente de Esporte Amador de Vila Velha — CNPJ 04.451.439/0001-91"],
        ["Ação / Projeto", "Super Copa da Várzea 2026"],
        ["Valor da emenda", "R$ 200.000,00"],
        ["Autor da emenda", null],
        ["Nº da emenda / proposta", null],
        ["Instrumento", null],
        ["Órgão concedente", null],
        ["Vigência", null],
        ["Situação da prestação de contas", null]
      ],
      aplicacao: [
        { grupo: "Região Sudeste", itens: [
          { rubrica: "Premiação em dinheiro aos times", valor: 20000 },
          { rubrica: "Estrutura operacional (comunicação, coordenação, logística e transporte)", valor: 10000 }
        ]}
      ],
      marcos: [
        { data: "17/09/2026", titulo: "Reunião de confirmação em Guarapari",
          texto: "16 times da Região Sudeste confirmaram participação e assinaram a lista oficial de presença. Representantes legais nomeados para o recebimento da premiação." }
      ],
      docs: [
        { titulo: "Termo de Fomento / instrumento de repasse", data: null, arquivo: null },
        { titulo: "Plano de Trabalho aprovado", data: null, arquivo: null },
        { titulo: "Declaração de publicidade da parceria", data: null, arquivo: null },
        { titulo: "Consulta pública da emenda no Transferegov", data: null, arquivo: null },
        { titulo: "Regulamento oficial da Super Copa da Várzea 2026", data: null, arquivo: null },
        { titulo: "Lista de presença — reunião de confirmação (17/09/2026)", data: "2026-09-17", arquivo: null },
        { titulo: "Relação dos times participantes e representantes (versão pública)", data: null, arquivo: null },
        { titulo: "Extrato da conta específica da emenda — mês a mês", data: null, arquivo: null },
        { titulo: "Relação de pagamentos (fornecedor, valor, data, nota fiscal)", data: null, arquivo: null },
        { titulo: "Comprovantes de pagamento da premiação", data: null, arquivo: null },
        { titulo: "Relatório de execução do objeto", data: null, arquivo: null }
      ],
      extra: "premiacao"              // mostra o bloco "Como receber a premiação"
    },

    {
      id: "surf",
      nome: "Surf Para Todos — Inclusão e Cidadania",
      tag: "Emenda parlamentar estadual",
      valorTotal: 60000,
      recebido: null,
      executado: null,
      resumo: "Ação social de esporte e inclusão na Praia D'Ulé, em Guarapari, com aula de surf gratuita para crianças e adolescentes de 6 a 17 anos. Meta de atendimento: 60 participantes.",
      ficha: [
        ["Entidade responsável", null],
        ["Ação / Projeto", "Surf Para Todos — Inclusão e Cidadania"],
        ["Valor da emenda", "R$ 60.000,00"],
        ["Local", "Praia D'Ulé — Guarapari/ES"],
        ["Público atendido", "Crianças e adolescentes de 6 a 17 anos (meta: 60 participantes)"],
        ["Órgão concedente", "SESPORT — Governo do Estado do Espírito Santo"],
        ["Autor da emenda", null],
        ["Nº da emenda / proposta", null],
        ["Instrumento", null],
        ["Data do evento", null],
        ["Vigência", null],
        ["Situação da prestação de contas", null]
      ],
      aplicacao: [],                 // preencher quando o plano de trabalho for publicado
      marcos: [],
      docs: [
        { titulo: "Plano de Trabalho aprovado", data: null, arquivo: null },
        { titulo: "Instrumento de repasse / termo com a SESPORT", data: null, arquivo: null },
        { titulo: "Declaração de publicidade da parceria", data: null, arquivo: null },
        { titulo: "Relação de despesas e notas fiscais", data: null, arquivo: null },
        { titulo: "Relatório de execução com fotos autorizadas", data: null, arquivo: null },
        { titulo: "Prestação de contas final", data: null, arquivo: null }
      ],
      aviso: "Por proteção de crianças e adolescentes (LGPD e ECA), este portal publica apenas números, valores e comprovantes. Nomes, documentos e imagens de participantes só aparecem com autorização escrita dos responsáveis."
    },

    {
      id: "guarapari",
      nome: "Parceria com a Prefeitura de Guarapari",
      tag: "Parceria com o município",
      valorTotal: null,
      recebido: null,
      executado: null,
      resumo: "Recursos da parceria com a Prefeitura Municipal de Guarapari destinados ao apoio dos times de Guarapari.",
      ficha: [
        ["Entidade beneficiária", "Liga Independente de Esporte Amador de Vila Velha — CNPJ 04.451.439/0001-91"],
        ["Órgão concedente", "Prefeitura Municipal de Guarapari"],
        ["Finalidade", "Apoio aos times de Guarapari"],
        ["Valor da parceria", null],
        ["Instrumento", null],
        ["Nº do processo / termo", null],
        ["Vigência", null],
        ["Times beneficiados", null],
        ["Situação da prestação de contas", null]
      ],
      aplicacao: [],
      marcos: [],
      docs: [
        { titulo: "Termo da parceria com a Prefeitura de Guarapari", data: null, arquivo: null },
        { titulo: "Plano de Trabalho", data: null, arquivo: null },
        { titulo: "Relação dos times de Guarapari beneficiados (versão pública)", data: null, arquivo: null },
        { titulo: "Comprovantes de repasse aos times", data: null, arquivo: null },
        { titulo: "Relatório de execução e prestação de contas", data: null, arquivo: null }
      ]
    }
  ],

  premiacaoSudeste: [
    { lugar: "1º lugar", valor: 10000 },
    { lugar: "2º lugar", valor: 5000 },
    { lugar: "3º lugar", valor: 3000 },
    { lugar: "4º lugar", valor: 2000 }
  ],

  /* Documentos institucionais da Liga */
  institucional: [
    { titulo: "Estatuto social da Liga", data: null, arquivo: null },
    { titulo: "Cartão CNPJ", data: null, arquivo: null },
    { titulo: "Ata de eleição e posse da diretoria", data: null, arquivo: null },
    { titulo: "Certidões negativas (federal, estadual, municipal, FGTS, trabalhista)", data: null, arquivo: null }
  ],

  /* ---------------------------------------------------------
     PROJETOS (realizados, em andamento e futuros)
     status: "realizado" | "andamento" | "futuro"
     foto: "assets/projetos/nome.jpg" (opcional)
     --------------------------------------------------------- */
  projetos: [
    { ano: 2026, status: "andamento", titulo: "Super Copa da Várzea 2026",
      modalidade: "Futebol", local: "Espírito Santo",
      resumo: "Competição de futebol amador com times de várias regiões, fase classificatória, mata-mata e muita resenha. Tabela e resultados em tempo real.",
      foto: "" },
    { ano: 2026, status: "andamento", titulo: "Surf Para Todos — Inclusão e Cidadania",
      modalidade: "Surf", local: "Praia D'Ulé, Guarapari",
      resumo: "Aula de surf gratuita e ação de inclusão para crianças e adolescentes de 6 a 17 anos, com foco em esporte, natureza e cidadania.",
      foto: "" },
    { ano: 2026, status: "apoio", titulo: "Judô rumo ao campeonato no Rio de Janeiro",
      modalidade: "Judô", local: "Espírito Santo → Rio de Janeiro",
      resumo: "A Liga viabilizou o transporte para a equipe de judô viajar e competir no campeonato no Rio de Janeiro.",
      foto: "" }
  ]
};
