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

  /* ---------- números do hero ---------- */
  var stats = [
    [brl(D.emenda.valorTotal).replace(",00", ""), "em emenda parlamentar"],
    ["16", "times confirmados na Região Sudeste"],
    [brl(D.premiacaoSudeste.reduce(function (a, b) { return a + b.valor; }, 0)).replace(",00", ""), "em premiação na Região Sudeste"],
    [D.atualizadoEm, "última atualização das contas"]
  ];
  var st = $("#stats");
  stats.forEach(function (s) { st.appendChild(el("li", "", "<b>" + esc(s[0]) + "</b><span>" + esc(s[1]) + "</span>")); });
  $("#atualizado").textContent = D.atualizadoEm;

  /* ---------- fatos da liga ---------- */
  var facts = $("#facts");
  [["Razão social", D.nome], ["CNPJ", D.cnpj], ["Sede", D.cidade], ["Presidente", D.presidente]].forEach(function (f) {
    if (!f[1]) return;
    facts.appendChild(el("dt", "", esc(f[0])));
    facts.appendChild(el("dd", "", esc(f[1])));
  });

  /* ---------- premiação ---------- */
  var tb = $("#tbl-premio tbody"), tf = $("#tbl-premio tfoot"), tot = 0;
  D.premiacaoSudeste.forEach(function (p) {
    tot += p.valor;
    tb.appendChild(el("tr", "", "<td>" + esc(p.lugar) + '</td><td class="r">' + brl(p.valor) + "</td>"));
  });
  tf.appendChild(el("tr", "", '<td>Total em premiação</td><td class="r">' + brl(tot) + "</td>"));
  if (D.linkTabelas) $("#btn-tabelas").href = D.linkTabelas;

  /* ---------- linha do tempo ---------- */
  var tl = $("#timeline");
  D.marcos.forEach(function (m) {
    tl.appendChild(el("li", "", "<time>" + esc(m.data) + "</time><h4>" + esc(m.titulo) + "</h4><p>" + esc(m.texto) + "</p>"));
  });
  tl.appendChild(el("li", "", "<time>Próximas fases</time><h4>Datas em divulgação</h4><p>Acompanhe esta página e as redes da Liga para os próximos jogos e resultados.</p>"));

  /* ---------- painel financeiro ---------- */
  var money = $("#money"), E = D.emenda;
  function moneyCard(label, val, pct) {
    var h = "<small>" + esc(label) + "</small>";
    if (val == null) return el("div", "m m--pend", h + "<b>Em atualização</b>");
    h += "<b>" + brl(val) + "</b>";
    if (pct != null) h += '<div class="bar" aria-hidden="true"><i style="width:' + Math.min(100, pct) + '%"></i></div>';
    return el("div", "m", h);
  }
  money.appendChild(moneyCard("Valor da emenda", E.valorTotal));
  money.appendChild(moneyCard("Recebido pela Liga", E.recebido, E.recebido != null ? E.recebido / E.valorTotal * 100 : null));
  money.appendChild(moneyCard("Já executado", E.executado, E.executado != null ? E.executado / E.valorTotal * 100 : null));

  var ficha = $("#ficha");
  E.ficha.forEach(function (r) {
    ficha.appendChild(el("dt", "", esc(r[0])));
    ficha.appendChild(el("dd", "", r[1] ? esc(r[1]) : PEND));
  });

  /* ---------- plano de aplicação ---------- */
  var ap = $("#aplicacao"), totalAp = 0;
  D.aplicacao.forEach(function (g) {
    var sub = 0;
    var rows = g.itens.map(function (i) { sub += i.valor; return "<tr><td>" + esc(i.rubrica) + '</td><td class="r">' + brl(i.valor) + "</td></tr>"; }).join("");
    totalAp += sub;
    ap.appendChild(el("div", "", "<h4>" + esc(g.grupo) + '</h4><table class="tbl"><thead><tr><th>Rubrica</th><th class="r">Valor</th></tr></thead><tbody>' + rows + '</tbody><tfoot><tr><td>Subtotal</td><td class="r">' + brl(sub) + "</td></tr></tfoot></table>"));
  });
  var rest = E.valorTotal - totalAp;
  ap.appendChild(el("p", "note", "Valor da emenda: <strong>" + brl(E.valorTotal) + "</strong> · Detalhado até aqui: <strong>" + brl(totalAp) + "</strong> · Demais rubricas e regiões: <strong>" + brl(rest) + "</strong> " + PEND));

  /* ---------- documentos ---------- */
  var filters = $("#filters"), list = $("#docs"), current = "todos";
  function renderDocs() {
    list.innerHTML = "";
    var docs = D.documentos.filter(function (d) { return current === "todos" || d.cat === current; });
    if (!docs.length) { list.appendChild(el("li", "empty", "Nenhum documento nesta categoria.")); return; }
    docs.forEach(function (d) {
      var on = !!d.arquivo;
      var cat = D.categorias.filter(function (c) { return c.id === d.cat; })[0];
      var meta = [cat ? cat.name || cat.nome : "", d.data ? fmtDate(d.data) : ""].filter(Boolean).join(" · ");
      var act = on
        ? '<a class="btn btn--blue" href="' + esc(d.arquivo) + '" target="_blank" rel="noopener">Abrir PDF</a>'
        : '<span class="pend">Em breve</span>';
      list.appendChild(el("li", "doc" + (on ? "" : " doc--off"),
        '<div class="doc__ico" aria-hidden="true">PDF</div><div class="doc__t"><strong>' + esc(d.titulo) + "</strong><small>" + esc(meta) + "</small></div>" + act));
    });
  }
  function renderFilters() {
    filters.innerHTML = "";
    [{ id: "todos", nome: "Todos" }].concat(D.categorias).forEach(function (c) {
      var b = el("button", "", esc(c.nome));
      b.type = "button";
      b.setAttribute("aria-pressed", c.id === current);
      b.addEventListener("click", function () { current = c.id; renderFilters(); renderDocs(); });
      filters.appendChild(b);
    });
  }
  renderFilters(); renderDocs();

  /* ---------- abas ---------- */
  var tabs = document.querySelectorAll(".tabs button");
  function openTab(id) {
    tabs.forEach(function (t) { t.setAttribute("aria-selected", t.dataset.tab === id); });
    document.querySelectorAll(".tabpanel").forEach(function (p) { p.hidden = p.id !== "tab-" + id; });
  }
  tabs.forEach(function (t) { t.addEventListener("click", function () { openTab(t.dataset.tab); }); });
  document.addEventListener("click", function (e) {
    var g = e.target.closest && e.target.closest("[data-goto]");
    if (g) { e.preventDefault(); openTab(g.dataset.goto); }
  });

  /* ---------- contato ---------- */
  var c = D.contato, box = $("#contact"), any = false;
  function ci(href, label, value, cls) {
    any = true;
    var a = el("a", "ci", "<small>" + esc(label) + "</small>" + esc(value));
    a.href = href; if (cls) a.className += " " + cls;
    if (/^https?:/.test(href)) { a.target = "_blank"; a.rel = "noopener"; }
    box.appendChild(a);
  }
  if (c.whatsapp) ci("https://wa.me/" + c.whatsapp.replace(/\D/g, ""), "WhatsApp", "Falar com a Liga");
  if (c.email) ci("mailto:" + c.email, "E-mail", c.email);
  if (c.instagram) ci(c.instagram, "Instagram", c.instagram.replace(/^https?:\/\/(www\.)?/, ""));
  if (c.endereco) { any = true; box.appendChild(el("div", "ci", "<small>Endereço</small>" + esc(c.endereco))); }
  if (!any) box.appendChild(el("div", "ci soon", "<small>Canais de atendimento</small>Em breve neste espaço."));

  /* ---------- abre a aba certa se vier com #documentos etc ---------- */
  var h = location.hash.replace("#", "");
  if (["resumo", "aplicacao", "documentos", "premiacao"].indexOf(h) > -1) {
    openTab(h);
    document.getElementById("transparencia").scrollIntoView();
  }
})();
