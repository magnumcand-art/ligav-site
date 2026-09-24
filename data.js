/*
  ============================================================
  DADOS DO SITE — É AQUI QUE VOCÊ ATUALIZA TUDO
  ============================================================
  - Campo com null  -> o site mostra "Em atualização" (nada quebra).
  - Documento com arquivo: null -> aparece como "Em breve".
  - Para publicar um documento: coloque o PDF na pasta /docs e
    troque  arquivo: null  por  arquivo: "docs/nome-do-arquivo.pdf".
  - NUNCA publique CPF, RG, conta bancária ou endereço de pessoa
    física. Use versão pública (tarjada) dos documentos.
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

  emenda: {
    valorTotal: 200000,
    recebido: null,                  // valor já repassado à Liga (número)
    executado: null,                 // valor já pago/gasto (número)
    ficha: [
      ["Entidade beneficiária", "Liga Independente de Esporte Amador de Vila Velha — CNPJ 04.451.439/0001-91"],
      ["Ação / Projeto", "Super Copa da Várzea 2026"],
      ["Valor da emenda", "R$ 200.000,00"],
      ["Autor da emenda", null],
      ["Nº da emenda / proposta", null],
      ["Instrumento", null],           // ex.: Termo de Fomento nº ...
      ["Órgão concedente", null],
      ["Vigência", null],
      ["Situação da prestação de contas", null]
    ]
  },

  // Plano de aplicação — só o que já está confirmado
  aplicacao: [
    { grupo: "Região Sudeste", itens: [
      { rubrica: "Premiação em dinheiro aos times", valor: 20000 },
      { rubrica: "Estrutura operacional (comunicação, coordenação, logística e transporte)", valor: 10000 }
    ]}
  ],

  premiacaoSudeste: [
    { lugar: "1º lugar", valor: 10000 },
    { lugar: "2º lugar", valor: 5000 },
    { lugar: "3º lugar", valor: 3000 },
    { lugar: "4º lugar", valor: 2000 }
  ],

  // Marcos já realizados (adicione novos no topo)
  marcos: [
    { data: "17/09/2026", titulo: "Reunião de confirmação em Guarapari",
      texto: "16 times da Região Sudeste confirmaram participação e assinaram a lista oficial de presença. Representantes legais nomeados para o recebimento da premiação." }
  ],

  // Categorias e documentos
  categorias: [
    { id: "institucional", nome: "Institucional" },
    { id: "emenda", nome: "Emenda parlamentar" },
    { id: "competicao", nome: "Super Copa da Várzea" },
    { id: "contas", nome: "Prestação de contas" }
  ],
  documentos: [
    { cat: "institucional", titulo: "Estatuto social da Liga", data: null, arquivo: null },
    { cat: "institucional", titulo: "Cartão CNPJ", data: null, arquivo: null },
    { cat: "institucional", titulo: "Ata de eleição e posse da diretoria", data: null, arquivo: null },
    { cat: "institucional", titulo: "Certidões negativas (federal, estadual, municipal, FGTS, trabalhista)", data: null, arquivo: null },

    { cat: "emenda", titulo: "Termo de Fomento / instrumento de repasse", data: null, arquivo: null },
    { cat: "emenda", titulo: "Plano de Trabalho aprovado", data: null, arquivo: null },
    { cat: "emenda", titulo: "Declaração de publicidade da parceria", data: null, arquivo: null },
    { cat: "emenda", titulo: "Consulta pública da emenda no Transferegov", data: null, arquivo: null },

    { cat: "competicao", titulo: "Regulamento oficial da Super Copa da Várzea 2026", data: null, arquivo: null },
    { cat: "competicao", titulo: "Lista de presença — reunião de confirmação (17/09/2026)", data: "2026-09-17", arquivo: null },
    { cat: "competicao", titulo: "Modelo de ata de nomeação de representante legal", data: null, arquivo: null },
    { cat: "competicao", titulo: "Relação dos times participantes e representantes (versão pública)", data: null, arquivo: null },

    { cat: "contas", titulo: "Extrato da conta específica da emenda — mês a mês", data: null, arquivo: null },
    { cat: "contas", titulo: "Relação de pagamentos (fornecedor, valor, data, nota fiscal)", data: null, arquivo: null },
    { cat: "contas", titulo: "Comprovantes de pagamento da premiação", data: null, arquivo: null },
    { cat: "contas", titulo: "Relatório de execução do objeto", data: null, arquivo: null }
  ]
};
