(function () {
  "use strict";
  var D = window.LIGA;
  var $ = function (s, r) { return (r || document).querySelector(s); };
  var el = function (tag, cls, html) {
    var n = document.createElement(tag);
    if (cls) n.className = cls;
    if (html != null) n.innerHTML = html;
    return n;
  };
  var esc = function (s) {
    return String(s).replace(/[&<>"']/g, function (c) {
      return { "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c];
    });
  };
  var brl = function (v) {
    return v.toLocaleString("pt-BR", { style: "currency", currency: "BRL" });
  };
  var PEND = '<span class="pend">Em atualização</span>';
  var fmtDate = function (iso) {
    if (!iso) return "";
    var p = iso.split("-");
    return p[2] + "/" + p[1] + "/" + p[0];
  };
  var byId = function (id) {
    return D.parcerias.filter(function (p) { return p.id === id; })[0];
  };

  /* ---------- menu mobile ---------- */
  var burger = $(".burger"), menu = $("#menu");
  burger.addEventListener("click", function () {
    var open = menu.classList.toggle("open");
    burger.setAttribute("aria-expanded", open);
  });
  menu.addEventListener("click", function (e) {
    if (e.target.tagName === "A") {
      menu.classList.remove("open");
      burger.setAttribute("aria-expanded", "false");
    }
  });

  /* ---------- destaques do hero (só esporte) ---------- */
  var st = $("#stats");
  [
    ["16", "times confirmados na Super Copa da Várzea — Região Sudeste"],
    ["3+", "modalidades: futebol, judô e surf"],
    ["ES", "esporte amador do Espírito Santo, de Vila Velha a Guarapari"]
  ].forEach(function (s) {
    st.appendChild(el("li", "", "<b>" + esc(s[0]) + "</b><span>" + esc(s[1]) + "</span>"));
  });
  $("#atualizado").textContent = D.atualizadoEm;

  /* ---------- modalidades ---------- */
  var mg = $("#mod-grid");
  D.modalidades.forEach(function (m) {
    mg.appendChild(el("article", "mod", '<div class="mod__ico" aria-hidden="true">' + m.icone + "</div><h3>" + esc(m.nome) + "</h3><p>" + esc(m.texto) + "</p>"));
  });

  /* ---------- fatos da liga ---------- */
  var facts = $("#facts");
  [["Razão social", D.nome], ["CNPJ", D.cnpj], ["Sede", D.cidade], ["Presidente", D.presidente]].forEach(function (f) {
    if (!f[1]) return;
    facts.appendChild(el("dt", "", esc(f[0])));
    facts.appendChild(el("dd", "", esc(f[1])));
  });

  /* ---------- projetos e eventos ---------- */
  var STATUS = { todos: "Todos", andamento: "Em andamento", realizado: "Realizados", futuro: "Próximos", apoio: "Apoio ao atleta" };
  var BADGE = { andamento: "Em andamento", realizado: "Realizado", futuro: "Em breve", apoio: "Apoio ao atleta" };
  var pf = $("#proj-filters"), pg = $("#proj-grid"), pcur = "todos";
  var ICON = { Futebol: "⚽", Futsal: "⚽", "Futebol Society": "⚽", "Judô": "🥋", Surf: "🏄" };
  function renderProjetos() {
    pg.innerHTML = "";
    var list = D.projetos.filter(function (p) { return pcur === "todos" || p.status === pcur; })
      .sort(function (a, b) { return (b.ano || 0) - (a.ano || 0); });
    list.forEach(function (p) {
      var foto = p.foto
        ? '<img src="' + esc(p.foto) + '" alt="" loading="lazy">'
        : '<div class="proj__ph" aria-hidden="true">' + (ICON[p.modalidade] || "🏅") + "</div>";
      pg.appendChild(el("article", "proj",
        '<div class="proj__img">' + foto + '<span class="badge badge--' + esc(p.status) + '">' + esc(BADGE[p.status] || p.status) + "</span></div>" +
        '<div class="proj__body"><small>' + esc(p.modalidade || "") + (p.ano ? " · " + esc(p.ano) : "") + (p.local ? " · " + esc(p.local) : "") +
        "</small><h3>" + esc(p.titulo) + "</h3><p>" + esc(p.resumo || "") + "</p></div>"));
    });
    pg.appendChild(el("article", "proj proj--soon", '<div class="proj__body"><h3>Mais histórias a caminho</h3><p>Estamos reunindo o histórico de eventos e projetos já realizados pela Liga para compartilhar aqui, com fotos e resultados.</p></div>'));
  }
  function renderProjFilters() {
    pf.innerHTML = "";
    Object.keys(STATUS).forEach(function (k) {
      var b = el("button", "", esc(STATUS[k]));
      b.type = "button";
      b.setAttribute("aria-pressed", k === pcur);
      b.addEventListener("click", function () { pcur = k; renderProjFilters(); renderProjetos(); });
      pf.appendChild(b);
    });
  }
  renderProjFilters(); renderProjetos();

  /* ---------- Super Copa: link e linha do tempo ---------- */
  if (D.linkTabelas) $("#btn-tabelas").href = D.linkTabelas;
  var tl = $("#timeline"), sc = byId("super-copa");
  (sc ? sc.marcos : []).forEach(function (m) {
    tl.appendChild(el("li", "", "<time>" + esc(m.data) + "</time><h4>" + esc(m.titulo) + "</h4><p>" + esc(m.texto) + "</p>"));
  });
  tl.appendChild(el("li", "", "<time>Próximas fases</time><h4>Datas em divulgação</h4><p>Acompanhe esta página e as redes da Liga para os próximos jogos e resultados.</p>"));

  /* ---------- transparência (discreta) ---------- */
  var pills = $("#pills"), box = $("#parceria"), curId = "_federais";

  function docsHtml(docs) {
    return '<ul class="docs">' + docs.map(function (d) {
      var on = !!d.arquivo;
      var act = on
        ? '<a class="btn btn--blue" href="' + esc(d.arquivo) + '" target="_blank" rel="noopener">Abrir PDF</a>'
        : '<span class="pend">Em breve</span>';
      return '<li class="doc' + (on ? "" : " doc--off") + '"><div class="doc__ico" aria-hidden="true">PDF</div><div class="doc__t"><strong>' +
        esc(d.titulo) + "</strong>" + (d.data ? "<small>" + fmtDate(d.data) + "</small>" : "") + "</div>" + act + "</li>";
    }).join("") + "</ul>";
  }
  function aplicacaoHtml(p) {
    if (!p.aplicacao || !p.aplicacao.length) {
      return '<p class="note">O plano de aplicação será publicado aqui assim que estiver aprovado. ' + PEND + "</p>";
    }
    var totalAp = 0, out = "";
    p.aplicacao.forEach(function (g) {
      var sub = 0;
      var rows = g.itens.map(function (i) { sub += i.valor; return "<tr><td>" + esc(i.rubrica) + '</td><td class="r">' + brl(i.valor) + "</td></tr>"; }).join("");
      totalAp += sub;
      out += "<h4>" + esc(g.grupo) + '</h4><table class="tbl"><thead><tr><th>Rubrica</th><th class="r">Valor</th></tr></thead><tbody>' + rows + '</tbody><tfoot><tr><td>Subtotal</td><td class="r">' + brl(sub) + "</td></tr></tfoot></table>";
    });
    if (D.premiacaoSudeste && p.extra === "premiacao") {
      out += "<h4>Premiação — Região Sudeste</h4><ul class=\"plain\">" + D.premiacaoSudeste.map(function (x) { return "<li>" + esc(x.lugar) + ": <strong>" + brl(x.valor) + "</strong></li>"; }).join("") + "</ul>";
    }
    return out;
  }
  function premiacaoHtml() {
    return "<p>Times sem CNPJ formalizam um <strong>representante legal</strong> por meio de ata, para receber a premiação com segurança e transparência.</p>" +
      "<h4>A ata deve conter</h4><ul class=\"plain\"><li>Assinatura de, no mínimo, 3 membros do time</li><li>Nome e CPF do representante legal nomeado</li><li>Dados bancários completos (banco, agência, conta e tipo)</li><li>Assinatura e aceite do representante nomeado</li><li>Data e registro formal</li></ul>" +
      "<h4>Documentos necessários</h4><ul class=\"plain\"><li>Cópia da ata assinada</li><li>Cópia do CPF do representante legal</li><li>Comprovante da conta bancária</li></ul>" +
      '<p class="note">O representante responde legal e financeiramente pelo recebimento. Por segurança e pela LGPD, os dados pessoais entregues à Liga <u>não são publicados</u>: aqui aparecem apenas nome do time, valor e comprovante de pagamento.</p>';
  }

  function federaisHtml() {
    var out = '<div class="panel panel--flat"><div class="phead"><span class="ptag">Transferegov</span><h3>Emendas federais</h3>' +
      '<p>Emendas parlamentares recebidas pela Liga, com o n\u00famero do Termo de Fomento, o painel do Transferegov e os documentos publicados.</p></div>';
    D.emendasFederais.forEach(function (e, idx) {
      var rows = [
        ["Projeto", e.projeto], ["Munic\u00edpio", e.municipio], ["Ano", e.ano],
        ["Termo de Fomento", e.termo], ["Concess\u00e3o de Emenda Parlamentar", [e.emenda, e.deputado].filter(Boolean).join(" \u2014 ") || null],
        ["Valor", e.valor], ["Vig\u00eancia", e.vigencia], ["\u00d3rg\u00e3o concedente", e.concedente],
        ["Objeto", e.objeto], ["Publica\u00e7\u00e3o oficial", e.dou]
      ];
      var body = '<dl class="ficha">' + rows.map(function (r) {
        return "<dt>" + esc(r[0]) + "</dt><dd>" + (r[1] ? esc(r[1]) : PEND) + "</dd>";
      }).join("") + "</dl>";
      if (e.midias && e.midias.length) {
        body += '<div class="figs">' + e.midias.map(function (m) {
          return '<figure class="fig"><a href="' + esc(m.arquivo) + '" target="_blank" rel="noopener" aria-label="Abrir: ' + esc(m.titulo) + '"><img src="' + esc(m.thumb) + '" alt="' + esc(m.titulo) + '" loading="lazy"></a><figcaption>' + esc(m.legenda) + "</figcaption></figure>";
        }).join("") + "</div>";
        body += '<p class="note">Vers\u00e3o p\u00fablica: por prote\u00e7\u00e3o de dados pessoais (LGPD), CPF, RG, endere\u00e7os residenciais e dados banc\u00e1rios foram tarjados. O documento original est\u00e1 na Plataforma +Brasil e com o \u00f3rg\u00e3o concedente.</p>';
      } else {
        body += '<p class="note">Documentos desta emenda ser\u00e3o publicados aqui assim que estiverem dispon\u00edveis. ' + PEND + "</p>";
      }
      out += '<details class="emenda" id="e-' + esc(e.id) + '"' + (idx === 0 ? " open" : "") + "><summary>Projeto: " + esc(e.projeto) + "</summary><div>" + body + "</div></details>";
    });
    if (D.painelUrl) out += '<p class="note">Consulta p\u00fablica oficial: <a href="' + esc(D.painelUrl) + '" target="_blank" rel="noopener">Painel de Transfer\u00eancias Discricion\u00e1rias e Legais (gov.br) \u2197</a> \u2014 filtrar pelo CNPJ da Liga: ' + esc(D.cnpj) + ".</p>";
    return out + "</div>";
  }

  function renderParceria(id) {
    curId = id;
    Array.prototype.forEach.call(pills.children, function (b) { b.setAttribute("aria-selected", b.dataset.id === id); });
    if (id === "_federais") { box.innerHTML = federaisHtml(); return; }
    if (id === "_liga") {
      box.innerHTML = '<div class="panel panel--flat"><h3>Documentos institucionais</h3>' + docsHtml(D.institucional) + "</div>";
      return;
    }
    var p = byId(id);
    var html = '<div class="panel panel--flat"><div class="phead"><span class="ptag">' + esc(p.tag) + "</span><h3>" + esc(p.nome) + "</h3><p>" + esc(p.resumo) + "</p></div>";
    html += p.aviso ? '<div class="alertbox">' + esc(p.aviso) + "</div>" : "";
    html += '<dl class="ficha">' + p.ficha.map(function (r) {
      return "<dt>" + esc(r[0]) + "</dt><dd>" + (r[1] ? esc(r[1]) : PEND) + "</dd>";
    }).join("") + "</dl>";
    html += '<details class="dt"><summary>Aplicação dos recursos</summary><div>' + aplicacaoHtml(p) + "</div></details>";
    if (p.extra === "premiacao") html += '<details class="dt"><summary>Como os times recebem a premiação</summary><div>' + premiacaoHtml() + "</div></details>";
    html += '<details class="dt" open><summary>Documentos</summary><div>' + docsHtml(p.docs) + "</div></details></div>";
    box.innerHTML = html;
  }
  [{ id: "_federais", nome: "Emendas federais" }].concat(D.parcerias, [{ id: "_liga", nome: "Documentos da Liga" }]).forEach(function (p) {
    var b = el("button", "", esc(p.nome));
    b.type = "button"; b.setAttribute("role", "tab"); b.dataset.id = p.id;
    b.addEventListener("click", function () { renderParceria(p.id); });
    pills.appendChild(b);
  });
  renderParceria(curId);

  /* ---------- contato ---------- */
  var c = D.contato, cbox = $("#contact"), any = false;
  function ci(href, label, value) {
    any = true;
    var a = el("a", "ci", "<small>" + esc(label) + "</small>" + esc(value));
    a.href = href;
    if (/^https?:/.test(href)) { a.target = "_blank"; a.rel = "noopener"; }
    cbox.appendChild(a);
  }
  if (c.whatsapp) ci("https://wa.me/" + c.whatsapp.replace(/\D/g, ""), "WhatsApp", "Falar com a Liga");
  if (c.email) ci("mailto:" + c.email, "E-mail", c.email);
  if (c.instagram) ci(c.instagram, "Instagram", c.instagram.replace(/^https?:\/\/(www\.)?/, ""));
  if (c.endereco) { any = true; cbox.appendChild(el("div", "ci", "<small>Endereço</small>" + esc(c.endereco))); }
  if (!any) cbox.appendChild(el("div", "ci soon", "<small>Canais de atendimento</small>Em breve neste espaço."));

  /* ---------- links diretos: #transparencia, #p-federais, #p-surf, #p-guarapari, #p-super-copa ---------- */
  function goHash() {
    var h = location.hash, target = null;
    if (h.indexOf("#p-") === 0) {
      var pid = h.slice(3);
      if (pid === "federais") pid = "_federais";
      if (pid === "_federais" || byId(pid)) { renderParceria(pid); target = document.getElementById("transparencia"); }
    } else if (h.length > 1) {
      target = document.getElementById(h.slice(1));
    }
    if (target) { target.scrollIntoView(); }
  }
  goHash();
  window.addEventListener("load", function () { setTimeout(goHash, 250); });
})();
