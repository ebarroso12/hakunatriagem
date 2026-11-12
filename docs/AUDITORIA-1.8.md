# Auditoria funcional — base 1.7, correções 1.8

Data: 12/11/2026 — America/Sao_Paulo. Somente dados sintéticos.

**Estado final: v1.8 publicada. 189 testes e E2E Chromium offline/hospedado aprovados; download conferido por hash; site privado atualizado. Registros de pendência ao fim são históricos, seguidos de seu fechamento.**

## Conclusão e alcance

A revisão encontrou falhas reais apesar dos testes anteriores. A evidência anterior de impressão era insuficiente: observava a chamada de print e parte dos arquivos, não a disponibilidade no aparelho nem a saída física. Esta revisão acrescenta conteúdo, identidade, emblemas sem fundos e posição do botão, além de corrigir validação e importação. Não se declara ausência universal de erros.

Foram identificadas 490 funções/callbacks próprios em 21 módulos JavaScript. O inventário abaixo aponta cada item e a evidência do respectivo fluxo. Foi feita leitura estática; testes executam fluxos/casos, não todos os caminhos possíveis de cada função. Código gerado de terceiros, fontes e imagem de marca não foi auditado linha a linha; dependências foram verificadas pelo npm audit e regressões.

## Falhas reproduzidas e correções

| Área | Falha confirmada | Correção / prova |
| --- | --- | --- |
| Impressão: acesso | Botão só aparecia abaixo do cabeçalho, apresentação e indicadores. | Botão fixo na barra superior, versão visível e prévia na primeira parte do diálogo; geometria 320/390 px incluída no teste de browser; resultado no fechamento. |
| Impressão: conteúdo | Componentes podiam ficar recolhidos; respostas/revisões e ID da pessoa não estavam explícitos na ficha impressa. | Componentes abertos, preparação/revisões/ID incluídos e rascunho identificado; leitura de PDF real incluída no teste de browser; resultado no fechamento. |
| Impressão: emblemas | Relatório usava emblemas como fundos CSS, sujeitos à opção de imprimir fundos. | SVG de primeiro plano com referência compartilhada e contraste também vetorial; operações de imagem do PDF sem fundos incluídas no teste de browser; resultado no fechamento. |
| Impressão: erro | Falha de print dizia que o salvamento não foi confirmado e sugeria seletor/Drive. | Mensagem específica de impressão com prévia/PDF como alternativa. |
| IMC | 86,7 kg/170 cm gerava 30,000000000000004 e pontuava como >30; caso equivalente também afetava exclusão >40 e categorias da calculadora. | Comparação com tolerância limitada ao ruído IEEE-754, sem arredondar medidas clínicas. Casos exatos e ±0,000001 kg testados. |
| Preparo | false, espaços e formas não canônicas podiam virar zero e permitir faixa final. | Só respostas canônicas oferecidas na ficha são válidas; ausência segue ausência. |
| Calculadoras | Texto inválido podia produzir NaN e classificação indevida. | Validação de finitude; resultados conhecidos e limites de idade testados. |
| CSV/TXT | Texto decodificado era ignorado ao passar os bytes ao leitor: acentos corrompidos e zeros iniciais perdidos. | Tabela lida do texto decodificado e sem coerção de células; UTF-8, UTF-16 LE/BE e Windows-1252 testados. |
| DOCX/ODT | gridSpan e repetições/mesclagens deslocavam as colunas. | Expansão limitada e alinhamento lógico; nome/idade/origem conferidos com ZIPs sintéticos reais. |
| ZIP | Duplicatas não retidas não eram rejeitadas. | Nomes verificados para todas as entradas, antes da leitura. |
| Limites | JSON e outros formatos podiam contornar limites totais de abas e linhas. | Limites de 200 tabelas e 50.000 linhas aplicados a todos os formatos. |
| Emblema PNG | Assinatura/dimensão bastavam para aceitar imagem truncada ou corrompida, podendo quebrar PDF. | Estrutura/CRC/deflate/Adler/scanlines/tamanho verificados, com cache limitado. Uma fixture antiga tinha CRC e Adler inválidos; foi substituída por PNG genuíno de canvas. |
| Backup/restore | Conclusão assíncrona podia fechar outra ficha, limpar aviso de mudanças posteriores ou aplicar restore depois de fechar a janela. | Referências e revisão de sessão capturadas; ações duplicadas bloqueadas; restore cancelado ao fechar; testes com WebCrypto real. |
| Proveniência | Reanalisar texto corrigido perdia o nome do arquivo. | Nome conservado e origem rotulada como Texto conferido, sem fingir coordenada original após edição. |
| Dependências | npm audit apontava 2 alertas altos e 1 moderado. | fast-xml-parser 5.12.0, fflate 0.8.3, Vite 6.4.6; scanner posterior com zero alertas conhecidos. Isso não é certificação de segurança. |

## Matriz de saídas

XLSX, ODS, CSV, HTML e PDF foram confrontados com resultados literais de cinco fichas sintéticas: hipertensão com regra original, anticoagulante/exclusão, menor com critério preto explícito, pessoa sem nome/dados essenciais e hipertensão em versão adaptada. Conferidos ID, score, cor, faixa, exclusão, fonte e versão; acentos/aspas e origem final também foram lidos nos arquivos. Não se calculou o esperado usando o próprio avaliador.

Impressão da ficha pode incluir alterações ainda não salvas e agora informa isso. Relatórios da sessão usam apenas avaliações salvas e incluem a sessão inteira, não somente o filtro da lista. Preto, faixa interna e exclusão são conceitos separados; faixa baixa não libera participação nem cancela exclusões.

## Limites honestos

- Chromium de CI não homologa Android físico, content://, WebView, Safari, seletor nativo de pasta, Drive ou impressora. PDF headless verifica documento/CSS, não o diálogo físico.
- Seletor e compartilhamento têm testes de contrato com dublês de APIs; o app não confirma envio à conta/pasta do Drive. O fluxo de download real do Chromium salva/lê arquivos no runner; resultado final no fechamento.
- OCR pode errar nomes/números e páginas mistas; o teste usa imagem legível sintética. Não houve homologação de todos os layouts ou imagens reais.
- PDF e fontes não garantem todo Unicode/emoji; HTML/planilhas devem ser conferidos quando houver caracteres incomuns. Relatório integral pode gerar muitas páginas e arquivos grandes; não foi feito stress exaustivo de 5.000 fichas com todos os campos no limite.
- Critérios guardam catálogo e versão atual por ficha, não um histórico completo de alterações de prontuário. Faça backup antes de aplicar outra versão.
- Relatórios não restauram integralmente a sessão; para isso use LGND. O app não diagnostica de texto livre nem aplica automaticamente instrumentos externos/sinais vitais à classificação.
- Npm audit cobre o catálogo conhecido consultado; não houve revisão linha a linha de todo código de terceiros nem fuzzing exaustivo.

## Execuções

Verificação local e CI: resultados finais serão registrados no fechamento abaixo. Logs de reprodução antes/depois foram conservados no workspace; somente nomes de testes e dados fictícios são registrados.

## Inventário de funções e callbacks

### app.js

Evidência do módulo: DOM: audit-calculators, audit-print-ui, audit-session, audit-provenance; fluxos criteria-ui/event-header-ui/reports-ui/participant-list-ui. Browser: browser-file e browser-hosted-audit.

| Função/callback | Linha | Verificação |
| --- | --- | --- |
| $ | [18](../src/app.js#L18) | Inspeção do fluxo; testes do módulo indicados acima. Não equivale a cobertura individual de todos os ramos. |
| esc | [18](../src/app.js#L18) | Inspeção do fluxo; testes do módulo indicados acima. Não equivale a cobertura individual de todos os ramos. |
| callback de esc | [18](../src/app.js#L18) | Inspeção do fluxo; testes do módulo indicados acima. Não equivale a cobertura individual de todos os ramos. |
| icon | [20](../src/app.js#L20) | Inspeção do fluxo; testes do módulo indicados acima. Não equivale a cobertura individual de todos os ramos. |
| changed | [22](../src/app.js#L22) | Inspeção do fluxo; testes do módulo indicados acima. Não equivale a cobertura individual de todos os ramos. |
| evaluateRecord | [23](../src/app.js#L23) | Inspeção do fluxo; testes do módulo indicados acima. Não equivale a cobertura individual de todos os ramos. |
| toast | [25](../src/app.js#L25) | Inspeção do fluxo; testes do módulo indicados acima. Não equivale a cobertura individual de todos os ramos. |
| callback de toast | [25](../src/app.js#L25) | Inspeção do fluxo; testes do módulo indicados acima. Não equivale a cobertura individual de todos os ramos. |
| render | [26](../src/app.js#L26) | Inspeção do fluxo; testes do módulo indicados acima. Não equivale a cobertura individual de todos os ramos. |
| callback de render | [26](../src/app.js#L26) | Inspeção do fluxo; testes do módulo indicados acima. Não equivale a cobertura individual de todos os ramos. |
| callback de render | [26](../src/app.js#L26) | Inspeção do fluxo; testes do módulo indicados acima. Não equivale a cobertura individual de todos os ramos. |
| heading | [27](../src/app.js#L27) | Inspeção do fluxo; testes do módulo indicados acima. Não equivale a cobertura individual de todos os ramos. |
| people | [28](../src/app.js#L28) | Inspeção do fluxo; testes do módulo indicados acima. Não equivale a cobertura individual de todos os ramos. |
| callback de people | [28](../src/app.js#L28) | Inspeção do fluxo; testes do módulo indicados acima. Não equivale a cobertura individual de todos os ramos. |
| callback de people | [28](../src/app.js#L28) | Inspeção do fluxo; testes do módulo indicados acima. Não equivale a cobertura individual de todos os ramos. |
| callback de people | [28](../src/app.js#L28) | Inspeção do fluxo; testes do módulo indicados acima. Não equivale a cobertura individual de todos os ramos. |
| callback de people | [28](../src/app.js#L28) | Inspeção do fluxo; testes do módulo indicados acima. Não equivale a cobertura individual de todos os ramos. |
| callback de people | [28](../src/app.js#L28) | Inspeção do fluxo; testes do módulo indicados acima. Não equivale a cobertura individual de todos os ramos. |
| callback de people | [28](../src/app.js#L28) | Inspeção do fluxo; testes do módulo indicados acima. Não equivale a cobertura individual de todos os ramos. |
| callback de people | [28](../src/app.js#L28) | Inspeção do fluxo; testes do módulo indicados acima. Não equivale a cobertura individual de todos os ramos. |
| callback de people | [28](../src/app.js#L28) | Inspeção do fluxo; testes do módulo indicados acima. Não equivale a cobertura individual de todos os ramos. |
| bind | [29](../src/app.js#L29) | Inspeção do fluxo; testes do módulo indicados acima. Não equivale a cobertura individual de todos os ramos. |
| callback de bind | [29](../src/app.js#L29) | Inspeção do fluxo; testes do módulo indicados acima. Não equivale a cobertura individual de todos os ramos. |
| b.onclick | [29](../src/app.js#L29) | Inspeção do fluxo; testes do módulo indicados acima. Não equivale a cobertura individual de todos os ramos. |
| on | [29](../src/app.js#L29) | Inspeção do fluxo; testes do módulo indicados acima. Não equivale a cobertura individual de todos os ramos. |
| callback de bind | [29](../src/app.js#L29) | Inspeção do fluxo; testes do módulo indicados acima. Não equivale a cobertura individual de todos os ramos. |
| callback de bind | [29](../src/app.js#L29) | Inspeção do fluxo; testes do módulo indicados acima. Não equivale a cobertura individual de todos os ramos. |
| callback de bind | [29](../src/app.js#L29) | Inspeção do fluxo; testes do módulo indicados acima. Não equivale a cobertura individual de todos os ramos. |
| callback de bind | [29](../src/app.js#L29) | Inspeção do fluxo; testes do módulo indicados acima. Não equivale a cobertura individual de todos os ramos. |
| callback de bind | [29](../src/app.js#L29) | Inspeção do fluxo; testes do módulo indicados acima. Não equivale a cobertura individual de todos os ramos. |
| callback de bind | [29](../src/app.js#L29) | Inspeção do fluxo; testes do módulo indicados acima. Não equivale a cobertura individual de todos os ramos. |
| callback de bind | [29](../src/app.js#L29) | Inspeção do fluxo; testes do módulo indicados acima. Não equivale a cobertura individual de todos os ramos. |
| callback de bind | [29](../src/app.js#L29) | Inspeção do fluxo; testes do módulo indicados acima. Não equivale a cobertura individual de todos os ramos. |
| callback de bind | [29](../src/app.js#L29) | Inspeção do fluxo; testes do módulo indicados acima. Não equivale a cobertura individual de todos os ramos. |
| callback de bind | [29](../src/app.js#L29) | Inspeção do fluxo; testes do módulo indicados acima. Não equivale a cobertura individual de todos os ramos. |
| $('#search').oninput | [29](../src/app.js#L29) | Inspeção do fluxo; testes do módulo indicados acima. Não equivale a cobertura individual de todos os ramos. |
| $('#filter').onchange | [29](../src/app.js#L29) | Inspeção do fluxo; testes do módulo indicados acima. Não equivale a cobertura individual de todos os ramos. |
| $('#color-filter').onchange | [29](../src/app.js#L29) | Inspeção do fluxo; testes do módulo indicados acima. Não equivale a cobertura individual de todos os ramos. |
| $('#list-order').onchange | [29](../src/app.js#L29) | Inspeção do fluxo; testes do módulo indicados acima. Não equivale a cobertura individual de todos os ramos. |
| callback de bind | [29](../src/app.js#L29) | Inspeção do fluxo; testes do módulo indicados acima. Não equivale a cobertura individual de todos os ramos. |
| callback de bind | [29](../src/app.js#L29) | Inspeção do fluxo; testes do módulo indicados acima. Não equivale a cobertura individual de todos os ramos. |
| b.onclick | [29](../src/app.js#L29) | Inspeção do fluxo; testes do módulo indicados acima. Não equivale a cobertura individual de todos os ramos. |
| callback de b.onclick | [29](../src/app.js#L29) | Inspeção do fluxo; testes do módulo indicados acima. Não equivale a cobertura individual de todos os ramos. |
| callback de bind | [29](../src/app.js#L29) | Inspeção do fluxo; testes do módulo indicados acima. Não equivale a cobertura individual de todos os ramos. |
| callback de bind | [29](../src/app.js#L29) | Inspeção do fluxo; testes do módulo indicados acima. Não equivale a cobertura individual de todos os ramos. |
| modal | [30](../src/app.js#L30) | Inspeção do fluxo; testes do módulo indicados acima. Não equivale a cobertura individual de todos os ramos. |
| $('#close-modal').onclick | [30](../src/app.js#L30) | Inspeção do fluxo; testes do módulo indicados acima. Não equivale a cobertura individual de todos os ramos. |
| field | [31](../src/app.js#L31) | Inspeção do fluxo; testes do módulo indicados acima. Não equivale a cobertura individual de todos os ramos. |
| select | [32](../src/app.js#L32) | Inspeção do fluxo; testes do módulo indicados acima. Não equivale a cobertura individual de todos os ramos. |
| callback de select | [32](../src/app.js#L32) | Inspeção do fluxo; testes do módulo indicados acima. Não equivale a cobertura individual de todos os ramos. |
| edit | [33](../src/app.js#L33) | Inspeção do fluxo; testes do módulo indicados acima. Não equivale a cobertura individual de todos os ramos. |
| callback de edit | [33](../src/app.js#L33) | Inspeção do fluxo; testes do módulo indicados acima. Não equivale a cobertura individual de todos os ramos. |
| callback de edit | [33](../src/app.js#L33) | Inspeção do fluxo; testes do módulo indicados acima. Não equivale a cobertura individual de todos os ramos. |
| callback de edit | [33](../src/app.js#L33) | Inspeção do fluxo; testes do módulo indicados acima. Não equivale a cobertura individual de todos os ramos. |
| callback de edit | [33](../src/app.js#L33) | Inspeção do fluxo; testes do módulo indicados acima. Não equivale a cobertura individual de todos os ramos. |
| callback de edit | [33](../src/app.js#L33) | Inspeção do fluxo; testes do módulo indicados acima. Não equivale a cobertura individual de todos os ramos. |
| get | [33](../src/app.js#L33) | Inspeção do fluxo; testes do módulo indicados acima. Não equivale a cobertura individual de todos os ramos. |
| callback de get | [33](../src/app.js#L33) | Inspeção do fluxo; testes do módulo indicados acima. Não equivale a cobertura individual de todos os ramos. |
| preview | [33](../src/app.js#L33) | Inspeção do fluxo; testes do módulo indicados acima. Não equivale a cobertura individual de todos os ramos. |
| f.onsubmit | [33](../src/app.js#L33) | Inspeção do fluxo; testes do módulo indicados acima. Não equivale a cobertura individual de todos os ramos. |
| callback de f.onsubmit | [33](../src/app.js#L33) | Inspeção do fluxo; testes do módulo indicados acima. Não equivale a cobertura individual de todos os ramos. |
| $('#print-record').onclick | [33](../src/app.js#L33) | Inspeção do fluxo; testes do módulo indicados acima. Não equivale a cobertura individual de todos os ramos. |
| callback de $('#print-record').onclick | [33](../src/app.js#L33) | Inspeção do fluxo; testes do módulo indicados acima. Não equivale a cobertura individual de todos os ramos. |
| callback de $('#print-record').onclick | [33](../src/app.js#L33) | Inspeção do fluxo; testes do módulo indicados acima. Não equivale a cobertura individual de todos os ramos. |
| callback de $('#print-record').onclick | [33](../src/app.js#L33) | Inspeção do fluxo; testes do módulo indicados acima. Não equivale a cobertura individual de todos os ramos. |
| callback de $('#print-record').onclick | [33](../src/app.js#L33) | Inspeção do fluxo; testes do módulo indicados acima. Não equivale a cobertura individual de todos os ramos. |
| callback de $('#print-record').onclick | [33](../src/app.js#L33) | Inspeção do fluxo; testes do módulo indicados acima. Não equivale a cobertura individual de todos os ramos. |
| callback de $('#print-record').onclick | [33](../src/app.js#L33) | Inspeção do fluxo; testes do módulo indicados acima. Não equivale a cobertura individual de todos os ramos. |
| callback de $('#print-record').onclick | [33](../src/app.js#L33) | Inspeção do fluxo; testes do módulo indicados acima. Não equivale a cobertura individual de todos os ramos. |
| $('#delete-record').onclick | [33](../src/app.js#L33) | Inspeção do fluxo; testes do módulo indicados acima. Não equivale a cobertura individual de todos os ramos. |
| callback de $('#delete-record').onclick | [33](../src/app.js#L33) | Inspeção do fluxo; testes do módulo indicados acima. Não equivale a cobertura individual de todos os ramos. |
| resultHTML | [34](../src/app.js#L34) | Inspeção do fluxo; testes do módulo indicados acima. Não equivale a cobertura individual de todos os ramos. |
| callback de resultHTML | [34](../src/app.js#L34) | Inspeção do fluxo; testes do módulo indicados acima. Não equivale a cobertura individual de todos os ramos. |
| callback de resultHTML | [34](../src/app.js#L34) | Inspeção do fluxo; testes do módulo indicados acima. Não equivale a cobertura individual de todos os ramos. |
| importDialog | [35](../src/app.js#L35) | Inspeção do fluxo; testes do módulo indicados acima. Não equivale a cobertura individual de todos os ramos. |
| error | [35](../src/app.js#L35) | Inspeção do fluxo; testes do módulo indicados acima. Não equivale a cobertura individual de todos os ramos. |
| invalidate | [35](../src/app.js#L35) | Inspeção do fluxo; testes do módulo indicados acima. Não equivale a cobertura individual de todos os ramos. |
| clearError | [35](../src/app.js#L35) | Inspeção do fluxo; testes do módulo indicados acima. Não equivale a cobertura individual de todos os ramos. |
| callback de importDialog | [35](../src/app.js#L35) | Inspeção do fluxo; testes do módulo indicados acima. Não equivale a cobertura individual de todos os ramos. |
| callback de importDialog | [35](../src/app.js#L35) | Inspeção do fluxo; testes do módulo indicados acima. Não equivale a cobertura individual de todos os ramos. |
| callback de importDialog | [35](../src/app.js#L35) | Inspeção do fluxo; testes do módulo indicados acima. Não equivale a cobertura individual de todos os ramos. |
| showPreview | [36](../src/app.js#L36) | Inspeção do fluxo; testes do módulo indicados acima. Não equivale a cobertura individual de todos os ramos. |
| callback de showPreview | [36](../src/app.js#L36) | Inspeção do fluxo; testes do módulo indicados acima. Não equivale a cobertura individual de todos os ramos. |
| callback de showPreview | [36](../src/app.js#L36) | Inspeção do fluxo; testes do módulo indicados acima. Não equivale a cobertura individual de todos os ramos. |
| callback de showPreview | [36](../src/app.js#L36) | Inspeção do fluxo; testes do módulo indicados acima. Não equivale a cobertura individual de todos os ramos. |
| callback de showPreview | [36](../src/app.js#L36) | Inspeção do fluxo; testes do módulo indicados acima. Não equivale a cobertura individual de todos os ramos. |
| callback de showPreview | [36](../src/app.js#L36) | Inspeção do fluxo; testes do módulo indicados acima. Não equivale a cobertura individual de todos os ramos. |
| $('#confirm-import').onclick | [36](../src/app.js#L36) | Inspeção do fluxo; testes do módulo indicados acima. Não equivale a cobertura individual de todos os ramos. |
| callback de $('#confirm-import').onclick | [36](../src/app.js#L36) | Inspeção do fluxo; testes do módulo indicados acima. Não equivale a cobertura individual de todos os ramos. |
| drawManual | [37](../src/app.js#L37) | Inspeção do fluxo; testes do módulo indicados acima. Não equivale a cobertura individual de todos os ramos. |
| callback de drawManual | [37](../src/app.js#L37) | Inspeção do fluxo; testes do módulo indicados acima. Não equivale a cobertura individual de todos os ramos. |
| callback de drawManual | [37](../src/app.js#L37) | Inspeção do fluxo; testes do módulo indicados acima. Não equivale a cobertura individual de todos os ramos. |
| callback de drawManual | [37](../src/app.js#L37) | Inspeção do fluxo; testes do módulo indicados acima. Não equivale a cobertura individual de todos os ramos. |
| callback de drawManual | [37](../src/app.js#L37) | Inspeção do fluxo; testes do módulo indicados acima. Não equivale a cobertura individual de todos os ramos. |
| $('#sheet').onchange | [37](../src/app.js#L37) | Inspeção do fluxo; testes do módulo indicados acima. Não equivale a cobertura individual de todos os ramos. |
| $('#header-row').onchange | [37](../src/app.js#L37) | Inspeção do fluxo; testes do módulo indicados acima. Não equivale a cobertura individual de todos os ramos. |
| callback de drawManual | [37](../src/app.js#L37) | Inspeção do fluxo; testes do módulo indicados acima. Não equivale a cobertura individual de todos os ramos. |
| $('#make-preview').onclick | [37](../src/app.js#L37) | Inspeção do fluxo; testes do módulo indicados acima. Não equivale a cobertura individual de todos os ramos. |
| callback de $('#make-preview').onclick | [37](../src/app.js#L37) | Inspeção do fluxo; testes do módulo indicados acima. Não equivale a cobertura individual de todos os ramos. |
| callback de $('#make-preview').onclick | [37](../src/app.js#L37) | Inspeção do fluxo; testes do módulo indicados acima. Não equivale a cobertura individual de todos os ramos. |
| callback de $('#make-preview').onclick | [37](../src/app.js#L37) | Inspeção do fluxo; testes do módulo indicados acima. Não equivale a cobertura individual de todos os ramos. |
| drawAuto | [38](../src/app.js#L38) | Inspeção do fluxo; testes do módulo indicados acima. Não equivale a cobertura individual de todos os ramos. |
| callback de drawAuto | [38](../src/app.js#L38) | Inspeção do fluxo; testes do módulo indicados acima. Não equivale a cobertura individual de todos os ramos. |
| callback de drawAuto | [38](../src/app.js#L38) | Inspeção do fluxo; testes do módulo indicados acima. Não equivale a cobertura individual de todos os ramos. |
| $('#make-preview').onclick | [38](../src/app.js#L38) | Inspeção do fluxo; testes do módulo indicados acima. Não equivale a cobertura individual de todos os ramos. |
| callback de $('#make-preview').onclick | [38](../src/app.js#L38) | Inspeção do fluxo; testes do módulo indicados acima. Não equivale a cobertura individual de todos os ramos. |
| callback de $('#make-preview').onclick | [38](../src/app.js#L38) | Inspeção do fluxo; testes do módulo indicados acima. Não equivale a cobertura individual de todos os ramos. |
| callback de $('#make-preview').onclick | [38](../src/app.js#L38) | Inspeção do fluxo; testes do módulo indicados acima. Não equivale a cobertura individual de todos os ramos. |
| callback de $('#make-preview').onclick | [38](../src/app.js#L38) | Inspeção do fluxo; testes do módulo indicados acima. Não equivale a cobertura individual de todos os ramos. |
| callback de $('#make-preview').onclick | [38](../src/app.js#L38) | Inspeção do fluxo; testes do módulo indicados acima. Não equivale a cobertura individual de todos os ramos. |
| controls | [39](../src/app.js#L39) | Inspeção do fluxo; testes do módulo indicados acima. Não equivale a cobertura individual de todos os ramos. |
| callback de controls | [39](../src/app.js#L39) | Inspeção do fluxo; testes do módulo indicados acima. Não equivale a cobertura individual de todos os ramos. |
| $('#reanalyze-text').onclick | [39](../src/app.js#L39) | Inspeção do fluxo; testes do módulo indicados acima. Não equivale a cobertura individual de todos os ramos. |
| callback de $('#reanalyze-text').onclick | [39](../src/app.js#L39) | Inspeção do fluxo; testes do módulo indicados acima. Não equivale a cobertura individual de todos os ramos. |
| $('#import-file').onchange | [40](../src/app.js#L40) | Inspeção do fluxo; testes do módulo indicados acima. Não equivale a cobertura individual de todos os ramos. |
| callback de $('#import-file').onchange | [40](../src/app.js#L40) | Inspeção do fluxo; testes do módulo indicados acima. Não equivale a cobertura individual de todos os ramos. |
| download | [43](../src/app.js#L43) | Inspeção do fluxo; testes do módulo indicados acima. Não equivale a cobertura individual de todos os ramos. |
| callback de download | [43](../src/app.js#L43) | Inspeção do fluxo; testes do módulo indicados acima. Não equivale a cobertura individual de todos os ramos. |
| backupDialog | [44](../src/app.js#L44) | Inspeção do fluxo; testes do módulo indicados acima. Não equivale a cobertura individual de todos os ramos. |
| form.onsubmit | [47](../src/app.js#L47) | Inspeção do fluxo; testes do módulo indicados acima. Não equivale a cobertura individual de todos os ramos. |
| restoreDialog | [51](../src/app.js#L51) | Inspeção do fluxo; testes do módulo indicados acima. Não equivale a cobertura individual de todos os ramos. |
| form.onsubmit | [54](../src/app.js#L54) | Inspeção do fluxo; testes do módulo indicados acima. Não equivale a cobertura individual de todos os ramos. |
| security | [58](../src/app.js#L58) | Inspeção do fluxo; testes do módulo indicados acima. Não equivale a cobertura individual de todos os ramos. |
| sources | [59](../src/app.js#L59) | Inspeção do fluxo; testes do módulo indicados acima. Não equivale a cobertura individual de todos os ramos. |
| calculators | [60](../src/app.js#L60) | Inspeção do fluxo; testes do módulo indicados acima. Não equivale a cobertura individual de todos os ramos. |
| calcSubmit | [61](../src/app.js#L61) | Inspeção do fluxo; testes do módulo indicados acima. Não equivale a cobertura individual de todos os ramos. |
| n | [61](../src/app.js#L61) | Inspeção do fluxo; testes do módulo indicados acima. Não equivale a cobertura individual de todos os ramos. |
| configuration | [62](../src/app.js#L62) | Inspeção do fluxo; testes do módulo indicados acima. Não equivale a cobertura individual de todos os ramos. |
| callback de configuration | [62](../src/app.js#L62) | Inspeção do fluxo; testes do módulo indicados acima. Não equivale a cobertura individual de todos os ramos. |
| bindEventSettings | [63](../src/app.js#L63) | Inspeção do fluxo; testes do módulo indicados acima. Não equivale a cobertura individual de todos os ramos. |
| getDraft | [63](../src/app.js#L63) | Inspeção do fluxo; testes do módulo indicados acima. Não equivale a cobertura individual de todos os ramos. |
| preview | [63](../src/app.js#L63) | Inspeção do fluxo; testes do módulo indicados acima. Não equivale a cobertura individual de todos os ramos. |
| callback de bindEventSettings | [63](../src/app.js#L63) | Inspeção do fluxo; testes do módulo indicados acima. Não equivale a cobertura individual de todos os ramos. |
| input.onchange | [63](../src/app.js#L63) | Inspeção do fluxo; testes do módulo indicados acima. Não equivale a cobertura individual de todos os ramos. |
| $('#'+id).onclick | [63](../src/app.js#L63) | Inspeção do fluxo; testes do módulo indicados acima. Não equivale a cobertura individual de todos os ramos. |
| form.onsubmit | [63](../src/app.js#L63) | Inspeção do fluxo; testes do módulo indicados acima. Não equivale a cobertura individual de todos os ramos. |
| newTopDialog | [64](../src/app.js#L64) | Inspeção do fluxo; testes do módulo indicados acima. Não equivale a cobertura individual de todos os ramos. |
| $('#start-new-top').onclick | [64](../src/app.js#L64) | Inspeção do fluxo; testes do módulo indicados acima. Não equivale a cobertura individual de todos os ramos. |
| callback de módulo | [66](../src/app.js#L66) | Inspeção do fluxo; testes do módulo indicados acima. Não equivale a cobertura individual de todos os ramos. |
| callback de módulo | [67](../src/app.js#L67) | Inspeção do fluxo; testes do módulo indicados acima. Não equivale a cobertura individual de todos os ramos. |
| callback de módulo | [70](../src/app.js#L70) | Inspeção do fluxo; testes do módulo indicados acima. Não equivale a cobertura individual de todos os ramos. |
| callback de módulo | [70](../src/app.js#L70) | Inspeção do fluxo; testes do módulo indicados acima. Não equivale a cobertura individual de todos os ramos. |
| reportDialog | [72](../src/app.js#L72) | Inspeção do fluxo; testes do módulo indicados acima. Não equivale a cobertura individual de todos os ramos. |
| callback de reportDialog | [75](../src/app.js#L75) | Inspeção do fluxo; testes do módulo indicados acima. Não equivale a cobertura individual de todos os ramos. |
| callback de reportDialog | [77](../src/app.js#L77) | Inspeção do fluxo; testes do módulo indicados acima. Não equivale a cobertura individual de todos os ramos. |
| callback de reportDialog | [77](../src/app.js#L77) | Inspeção do fluxo; testes do módulo indicados acima. Não equivale a cobertura individual de todos os ramos. |
| callback de reportDialog | [78](../src/app.js#L78) | Inspeção do fluxo; testes do módulo indicados acima. Não equivale a cobertura individual de todos os ramos. |
| callback de reportDialog | [86](../src/app.js#L86) | Inspeção do fluxo; testes do módulo indicados acima. Não equivale a cobertura individual de todos os ramos. |
| execute | [88](../src/app.js#L88) | Inspeção do fluxo; testes do módulo indicados acima. Não equivale a cobertura individual de todos os ramos. |
| setBusy | [90](../src/app.js#L90) | Inspeção do fluxo; testes do módulo indicados acima. Não equivale a cobertura individual de todos os ramos. |
| callback de setBusy | [90](../src/app.js#L90) | Inspeção do fluxo; testes do módulo indicados acima. Não equivale a cobertura individual de todos os ramos. |
| callback de execute | [97](../src/app.js#L97) | Inspeção do fluxo; testes do módulo indicados acima. Não equivale a cobertura individual de todos os ramos. |
| $('#report-preview').onclick | [103](../src/app.js#L103) | Inspeção do fluxo; testes do módulo indicados acima. Não equivale a cobertura individual de todos os ramos. |
| callback de $('#report-preview').onclick | [103](../src/app.js#L103) | Inspeção do fluxo; testes do módulo indicados acima. Não equivale a cobertura individual de todos os ramos. |
| $('#report-complete').onclick | [104](../src/app.js#L104) | Inspeção do fluxo; testes do módulo indicados acima. Não equivale a cobertura individual de todos os ramos. |
| $('#report-missing').onclick | [104](../src/app.js#L104) | Inspeção do fluxo; testes do módulo indicados acima. Não equivale a cobertura individual de todos os ramos. |
| $('#report-print').onclick | [104](../src/app.js#L104) | Inspeção do fluxo; testes do módulo indicados acima. Não equivale a cobertura individual de todos os ramos. |
| $('#report-print-missing').onclick | [104](../src/app.js#L104) | Inspeção do fluxo; testes do módulo indicados acima. Não equivale a cobertura individual de todos os ramos. |
| applyCriteriaDialog | [108](../src/app.js#L108) | Inspeção do fluxo; testes do módulo indicados acima. Não equivale a cobertura individual de todos os ramos. |
| callback de applyCriteriaDialog | [109](../src/app.js#L109) | Inspeção do fluxo; testes do módulo indicados acima. Não equivale a cobertura individual de todos os ramos. |
| $('#apply-criteria-confirm').onclick | [112](../src/app.js#L112) | Inspeção do fluxo; testes do módulo indicados acima. Não equivale a cobertura individual de todos os ramos. |
| callback de $('#apply-criteria-confirm').onclick | [112](../src/app.js#L112) | Inspeção do fluxo; testes do módulo indicados acima. Não equivale a cobertura individual de todos os ramos. |

### core.js

Evidência do módulo: Unitários: core, criteria, audit-core, missing-inputs, reports; associação de saída: audit-export.

| Função/callback | Linha | Verificação |
| --- | --- | --- |
| normalize | [7](../src/core.js#L7) | Inspeção do fluxo; testes do módulo indicados acima. Não equivale a cobertura individual de todos os ramos. |
| height | [8](../src/core.js#L8) | Inspeção do fluxo; testes do módulo indicados acima. Não equivale a cobertura individual de todos os ramos. |
| validate | [9](../src/core.js#L9) | Inspeção do fluxo; testes do módulo indicados acima. Não equivale a cobertura individual de todos os ramos. |
| callback de validate | [9](../src/core.js#L9) | Inspeção do fluxo; testes do módulo indicados acima. Não equivale a cobertura individual de todos os ramos. |
| callback de validate | [9](../src/core.js#L9) | Inspeção do fluxo; testes do módulo indicados acima. Não equivale a cobertura individual de todos os ramos. |
| callback de validate | [9](../src/core.js#L9) | Inspeção do fluxo; testes do módulo indicados acima. Não equivale a cobertura individual de todos os ramos. |
| callback de validate | [9](../src/core.js#L9) | Inspeção do fluxo; testes do módulo indicados acima. Não equivale a cobertura individual de todos os ramos. |
| callback de validate | [9](../src/core.js#L9) | Inspeção do fluxo; testes do módulo indicados acima. Não equivale a cobertura individual de todos os ramos. |
| callback de validate | [9](../src/core.js#L9) | Inspeção do fluxo; testes do módulo indicados acima. Não equivale a cobertura individual de todos os ramos. |
| callback de validate | [9](../src/core.js#L9) | Inspeção do fluxo; testes do módulo indicados acima. Não equivale a cobertura individual de todos os ramos. |
| callback de validate | [9](../src/core.js#L9) | Inspeção do fluxo; testes do módulo indicados acima. Não equivale a cobertura individual de todos os ramos. |
| callback de validate | [9](../src/core.js#L9) | Inspeção do fluxo; testes do módulo indicados acima. Não equivale a cobertura individual de todos os ramos. |
| evaluate | [10](../src/core.js#L10) | Inspeção do fluxo; testes do módulo indicados acima. Não equivale a cobertura individual de todos os ramos. |
| callback de evaluate | [14](../src/core.js#L14) | Inspeção do fluxo; testes do módulo indicados acima. Não equivale a cobertura individual de todos os ramos. |
| callback de evaluate | [14](../src/core.js#L14) | Inspeção do fluxo; testes do módulo indicados acima. Não equivale a cobertura individual de todos os ramos. |
| callback de evaluate | [14](../src/core.js#L14) | Inspeção do fluxo; testes do módulo indicados acima. Não equivale a cobertura individual de todos os ramos. |
| callback de evaluate | [14](../src/core.js#L14) | Inspeção do fluxo; testes do módulo indicados acima. Não equivale a cobertura individual de todos os ramos. |
| callback de evaluate | [14](../src/core.js#L14) | Inspeção do fluxo; testes do módulo indicados acima. Não equivale a cobertura individual de todos os ramos. |
| callback de evaluate | [15](../src/core.js#L15) | Inspeção do fluxo; testes do módulo indicados acima. Não equivale a cobertura individual de todos os ramos. |
| callback de evaluate | [15](../src/core.js#L15) | Inspeção do fluxo; testes do módulo indicados acima. Não equivale a cobertura individual de todos os ramos. |
| callback de evaluate | [18](../src/core.js#L18) | Inspeção do fluxo; testes do módulo indicados acima. Não equivale a cobertura individual de todos os ramos. |
| callback de evaluate | [20](../src/core.js#L20) | Inspeção do fluxo; testes do módulo indicados acima. Não equivale a cobertura individual de todos os ramos. |
| callback de evaluate | [25](../src/core.js#L25) | Inspeção do fluxo; testes do módulo indicados acima. Não equivale a cobertura individual de todos os ramos. |
| csvCell | [28](../src/core.js#L28) | Inspeção do fluxo; testes do módulo indicados acima. Não equivale a cobertura individual de todos os ramos. |
| validateBackup | [29](../src/core.js#L29) | Inspeção do fluxo; testes do módulo indicados acima. Não equivale a cobertura individual de todos os ramos. |

### criteria-editor.js

Evidência do módulo: DOM: criteria-ui; edição, adição, reset/limites inspecionados. Fluxo principal também no browser-file.

| Função/callback | Linha | Verificação |
| --- | --- | --- |
| esc | [2](../src/criteria-editor.js#L2) | Inspeção do fluxo; testes do módulo indicados acima. Não equivale a cobertura individual de todos os ramos. |
| callback de esc | [2](../src/criteria-editor.js#L2) | Inspeção do fluxo; testes do módulo indicados acima. Não equivale a cobertura individual de todos os ramos. |
| copy | [3](../src/criteria-editor.js#L3) | Inspeção do fluxo; testes do módulo indicados acima. Não equivale a cobertura individual de todos os ramos. |
| options | [6](../src/criteria-editor.js#L6) | Inspeção do fluxo; testes do módulo indicados acima. Não equivale a cobertura individual de todos os ramos. |
| callback de options | [6](../src/criteria-editor.js#L6) | Inspeção do fluxo; testes do módulo indicados acima. Não equivale a cobertura individual de todos os ramos. |
| criteriaPage | [7](../src/criteria-editor.js#L7) | Inspeção do fluxo; testes do módulo indicados acima. Não equivale a cobertura individual de todos os ramos. |
| callback de criteriaPage | [7](../src/criteria-editor.js#L7) | Inspeção do fluxo; testes do módulo indicados acima. Não equivale a cobertura individual de todos os ramos. |
| callback de criteriaPage | [7](../src/criteria-editor.js#L7) | Inspeção do fluxo; testes do módulo indicados acima. Não equivale a cobertura individual de todos os ramos. |
| callback de criteriaPage | [7](../src/criteria-editor.js#L7) | Inspeção do fluxo; testes do módulo indicados acima. Não equivale a cobertura individual de todos os ramos. |
| callback de criteriaPage | [7](../src/criteria-editor.js#L7) | Inspeção do fluxo; testes do módulo indicados acima. Não equivale a cobertura individual de todos os ramos. |
| callback de criteriaPage | [7](../src/criteria-editor.js#L7) | Inspeção do fluxo; testes do módulo indicados acima. Não equivale a cobertura individual de todos os ramos. |
| openCriteriaEditor | [8](../src/criteria-editor.js#L8) | Inspeção do fluxo; testes do módulo indicados acima. Não equivale a cobertura individual de todos os ramos. |
| $ | [10](../src/criteria-editor.js#L10) | Inspeção do fluxo; testes do módulo indicados acima. Não equivale a cobertura individual de todos os ramos. |
| num | [10](../src/criteria-editor.js#L10) | Inspeção do fluxo; testes do módulo indicados acima. Não equivale a cobertura individual de todos os ramos. |
| collect | [11](../src/criteria-editor.js#L11) | Inspeção do fluxo; testes do módulo indicados acima. Não equivale a cobertura individual de todos os ramos. |
| callback de collect | [14](../src/criteria-editor.js#L14) | Inspeção do fluxo; testes do módulo indicados acima. Não equivale a cobertura individual de todos os ramos. |
| callback de collect | [14](../src/criteria-editor.js#L14) | Inspeção do fluxo; testes do módulo indicados acima. Não equivale a cobertura individual de todos os ramos. |
| callback de collect | [15](../src/criteria-editor.js#L15) | Inspeção do fluxo; testes do módulo indicados acima. Não equivale a cobertura individual de todos os ramos. |
| draw | [17](../src/criteria-editor.js#L17) | Inspeção do fluxo; testes do módulo indicados acima. Não equivale a cobertura individual de todos os ramos. |
| callback de draw | [19](../src/criteria-editor.js#L19) | Inspeção do fluxo; testes do módulo indicados acima. Não equivale a cobertura individual de todos os ramos. |
| callback de draw | [19](../src/criteria-editor.js#L19) | Inspeção do fluxo; testes do módulo indicados acima. Não equivale a cobertura individual de todos os ramos. |
| callback de draw | [19](../src/criteria-editor.js#L19) | Inspeção do fluxo; testes do módulo indicados acima. Não equivale a cobertura individual de todos os ramos. |
| callback de draw | [19](../src/criteria-editor.js#L19) | Inspeção do fluxo; testes do módulo indicados acima. Não equivale a cobertura individual de todos os ramos. |
| callback de draw | [19](../src/criteria-editor.js#L19) | Inspeção do fluxo; testes do módulo indicados acima. Não equivale a cobertura individual de todos os ramos. |
| callback de draw | [19](../src/criteria-editor.js#L19) | Inspeção do fluxo; testes do módulo indicados acima. Não equivale a cobertura individual de todos os ramos. |
| $('#criteria-search').oninput | [21](../src/criteria-editor.js#L21) | Inspeção do fluxo; testes do módulo indicados acima. Não equivale a cobertura individual de todos os ramos. |
| callback de $('#criteria-search').oninput | [21](../src/criteria-editor.js#L21) | Inspeção do fluxo; testes do módulo indicados acima. Não equivale a cobertura individual de todos os ramos. |
| $('#add-criterion').onclick | [22](../src/criteria-editor.js#L22) | Inspeção do fluxo; testes do módulo indicados acima. Não equivale a cobertura individual de todos os ramos. |
| $('#add-criteria-band').onclick | [23](../src/criteria-editor.js#L23) | Inspeção do fluxo; testes do módulo indicados acima. Não equivale a cobertura individual de todos os ramos. |
| callback de draw | [24](../src/criteria-editor.js#L24) | Inspeção do fluxo; testes do módulo indicados acima. Não equivale a cobertura individual de todos os ramos. |
| button.onclick | [24](../src/criteria-editor.js#L24) | Inspeção do fluxo; testes do módulo indicados acima. Não equivale a cobertura individual de todos os ramos. |
| $('#reset-criteria-draft').onclick | [25](../src/criteria-editor.js#L25) | Inspeção do fluxo; testes do módulo indicados acima. Não equivale a cobertura individual de todos os ramos. |
| callback de $('#reset-criteria-draft').onclick | [25](../src/criteria-editor.js#L25) | Inspeção do fluxo; testes do módulo indicados acima. Não equivale a cobertura individual de todos os ramos. |
| callback de $('#reset-criteria-draft').onclick | [25](../src/criteria-editor.js#L25) | Inspeção do fluxo; testes do módulo indicados acima. Não equivale a cobertura individual de todos os ramos. |
| callback de $('#reset-criteria-draft').onclick | [25](../src/criteria-editor.js#L25) | Inspeção do fluxo; testes do módulo indicados acima. Não equivale a cobertura individual de todos os ramos. |
| $('#criteria-profile-form').onsubmit | [26](../src/criteria-editor.js#L26) | Inspeção do fluxo; testes do módulo indicados acima. Não equivale a cobertura individual de todos os ramos. |

### criteria.js

Evidência do módulo: Unitários: criteria/audit-core; DOM: criteria-ui; versões/exportação: criteria-reports/audit-export.

| Função/callback | Linha | Verificação |
| --- | --- | --- |
| callback de módulo | [7](../src/criteria.js#L7) | Inspeção do fluxo; testes do módulo indicados acima. Não equivale a cobertura individual de todos os ramos. |
| freeze | [8](../src/criteria.js#L8) | Inspeção do fluxo; testes do módulo indicados acima. Não equivale a cobertura individual de todos os ramos. |
| text | [9](../src/criteria.js#L9) | Inspeção do fluxo; testes do módulo indicados acima. Não equivale a cobertura individual de todos os ramos. |
| int | [10](../src/criteria.js#L10) | Inspeção do fluxo; testes do módulo indicados acima. Não equivale a cobertura individual de todos os ramos. |
| keys | [11](../src/criteria.js#L11) | Inspeção do fluxo; testes do módulo indicados acima. Não equivale a cobertura individual de todos os ramos. |
| callback de keys | [11](../src/criteria.js#L11) | Inspeção do fluxo; testes do módulo indicados acima. Não equivale a cobertura individual de todos os ramos. |
| normalizeCriteriaProfile | [12](../src/criteria.js#L12) | Inspeção do fluxo; testes do módulo indicados acima. Não equivale a cobertura individual de todos os ramos. |
| callback de normalizeCriteriaProfile | [24](../src/criteria.js#L24) | Inspeção do fluxo; testes do módulo indicados acima. Não equivale a cobertura individual de todos os ramos. |
| callback de normalizeCriteriaProfile | [33](../src/criteria.js#L33) | Inspeção do fluxo; testes do módulo indicados acima. Não equivale a cobertura individual de todos os ramos. |
| callback de normalizeCriteriaProfile | [33](../src/criteria.js#L33) | Inspeção do fluxo; testes do módulo indicados acima. Não equivale a cobertura individual de todos os ramos. |
| callback de normalizeCriteriaProfile | [33](../src/criteria.js#L33) | Inspeção do fluxo; testes do módulo indicados acima. Não equivale a cobertura individual de todos os ramos. |
| callback de normalizeCriteriaProfile | [34](../src/criteria.js#L34) | Inspeção do fluxo; testes do módulo indicados acima. Não equivale a cobertura individual de todos os ramos. |
| callback de normalizeCriteriaProfile | [35](../src/criteria.js#L35) | Inspeção do fluxo; testes do módulo indicados acima. Não equivale a cobertura individual de todos os ramos. |
| callback de normalizeCriteriaProfile | [35](../src/criteria.js#L35) | Inspeção do fluxo; testes do módulo indicados acima. Não equivale a cobertura individual de todos os ramos. |
| callback de módulo | [40](../src/criteria.js#L40) | Inspeção do fluxo; testes do módulo indicados acima. Não equivale a cobertura individual de todos os ramos. |
| callback de módulo | [40](../src/criteria.js#L40) | Inspeção do fluxo; testes do módulo indicados acima. Não equivale a cobertura individual de todos os ramos. |
| normalizeCriteriaRegistry | [45](../src/criteria.js#L45) | Inspeção do fluxo; testes do módulo indicados acima. Não equivale a cobertura individual de todos os ramos. |
| callback de normalizeCriteriaRegistry | [48](../src/criteria.js#L48) | Inspeção do fluxo; testes do módulo indicados acima. Não equivale a cobertura individual de todos os ramos. |
| callback de normalizeCriteriaRegistry | [48](../src/criteria.js#L48) | Inspeção do fluxo; testes do módulo indicados acima. Não equivale a cobertura individual de todos os ramos. |
| callback de normalizeCriteriaRegistry | [50](../src/criteria.js#L50) | Inspeção do fluxo; testes do módulo indicados acima. Não equivale a cobertura individual de todos os ramos. |
| defaultRegistry | [54](../src/criteria.js#L54) | Inspeção do fluxo; testes do módulo indicados acima. Não equivale a cobertura individual de todos os ramos. |
| activeCriteria | [55](../src/criteria.js#L55) | Inspeção do fluxo; testes do módulo indicados acima. Não equivale a cobertura individual de todos os ramos. |
| callback de activeCriteria | [55](../src/criteria.js#L55) | Inspeção do fluxo; testes do módulo indicados acima. Não equivale a cobertura individual de todos os ramos. |
| criteriaForRecord | [56](../src/criteria.js#L56) | Inspeção do fluxo; testes do módulo indicados acima. Não equivale a cobertura individual de todos os ramos. |
| callback de criteriaForRecord | [56](../src/criteria.js#L56) | Inspeção do fluxo; testes do módulo indicados acima. Não equivale a cobertura individual de todos os ramos. |
| createCriteriaVersion | [57](../src/criteria.js#L57) | Inspeção do fluxo; testes do módulo indicados acima. Não equivale a cobertura individual de todos os ramos. |
| callback de createCriteriaVersion | [59](../src/criteria.js#L59) | Inspeção do fluxo; testes do módulo indicados acima. Não equivale a cobertura individual de todos os ramos. |
| callback de createCriteriaVersion | [60](../src/criteria.js#L60) | Inspeção do fluxo; testes do módulo indicados acima. Não equivale a cobertura individual de todos os ramos. |
| callback de createCriteriaVersion | [60](../src/criteria.js#L60) | Inspeção do fluxo; testes do módulo indicados acima. Não equivale a cobertura individual de todos os ramos. |
| profileGroups | [63](../src/criteria.js#L63) | Inspeção do fluxo; testes do módulo indicados acima. Não equivale a cobertura individual de todos os ramos. |
| callback de profileGroups | [63](../src/criteria.js#L63) | Inspeção do fluxo; testes do módulo indicados acima. Não equivale a cobertura individual de todos os ramos. |
| callback de profileGroups | [63](../src/criteria.js#L63) | Inspeção do fluxo; testes do módulo indicados acima. Não equivale a cobertura individual de todos os ramos. |
| callback de profileGroups | [63](../src/criteria.js#L63) | Inspeção do fluxo; testes do módulo indicados acima. Não equivale a cobertura individual de todos os ramos. |
| ruleCondition | [64](../src/criteria.js#L64) | Inspeção do fluxo; testes do módulo indicados acima. Não equivale a cobertura individual de todos os ramos. |
| matchingRules | [65](../src/criteria.js#L65) | Inspeção do fluxo; testes do módulo indicados acima. Não equivale a cobertura individual de todos os ramos. |
| callback de matchingRules | [65](../src/criteria.js#L65) | Inspeção do fluxo; testes do módulo indicados acima. Não equivale a cobertura individual de todos os ramos. |
| callback de matchingRules | [65](../src/criteria.js#L65) | Inspeção do fluxo; testes do módulo indicados acima. Não equivale a cobertura individual de todos os ramos. |

### default-groups.js

Evidência do módulo: Dados de referência; regressões do núcleo e perfil original imutável.

| Função/callback | Linha | Verificação |
| --- | --- | --- |


### documents.js

Evidência do módulo: Unitários: layouts, html-document, audit-office, audit-files; leitura: audit-import-formats.

| Função/callback | Linha | Verificação |
| --- | --- | --- |
| safeZip | [5](../src/documents.js#L5) | Inspeção do fluxo; testes do módulo indicados acima. Não equivale a cobertura individual de todos os ramos. |
| callback de safeZip | [5](../src/documents.js#L5) | Inspeção do fluxo; testes do módulo indicados acima. Não equivale a cobertura individual de todos os ramos. |
| callback de safeZip | [5](../src/documents.js#L5) | Inspeção do fluxo; testes do módulo indicados acima. Não equivale a cobertura individual de todos os ramos. |
| file.ondata | [5](../src/documents.js#L5) | Inspeção do fluxo; testes do módulo indicados acima. Não equivale a cobertura individual de todos os ramos. |
| checkedText | [6](../src/documents.js#L6) | Inspeção do fluxo; testes do módulo indicados acima. Não equivale a cobertura individual de todos os ramos. |
| escapeRegex | [8](../src/documents.js#L8) | Inspeção do fluxo; testes do módulo indicados acima. Não equivale a cobertura individual de todos os ramos. |
| callback de módulo | [9](../src/documents.js#L9) | Inspeção do fluxo; testes do módulo indicados acima. Não equivale a cobertura individual de todos os ramos. |
| textToSheets | [10](../src/documents.js#L10) | Inspeção do fluxo; testes do módulo indicados acima. Não equivale a cobertura individual de todos os ramos. |
| callback de textToSheets | [10](../src/documents.js#L10) | Inspeção do fluxo; testes do módulo indicados acima. Não equivale a cobertura individual de todos os ramos. |
| callback de textToSheets | [10](../src/documents.js#L10) | Inspeção do fluxo; testes do módulo indicados acima. Não equivale a cobertura individual de todos os ramos. |
| parseXML | [11](../src/documents.js#L11) | Inspeção do fluxo; testes do módulo indicados acima. Não equivale a cobertura individual de todos os ramos. |
| findNodes | [12](../src/documents.js#L12) | Inspeção do fluxo; testes do módulo indicados acima. Não equivale a cobertura individual de todos os ramos. |
| nodeText | [13](../src/documents.js#L13) | Inspeção do fluxo; testes do módulo indicados acima. Não equivale a cobertura individual de todos os ramos. |
| richNodes | [14](../src/documents.js#L14) | Inspeção do fluxo; testes do módulo indicados acima. Não equivale a cobertura individual de todos os ramos. |
| repeatCount | [15](../src/documents.js#L15) | Inspeção do fluxo; testes do módulo indicados acima. Não equivale a cobertura individual de todos os ramos. |
| officeDocument | [16](../src/documents.js#L16) | Inspeção do fluxo; testes do módulo indicados acima. Não equivale a cobertura individual de todos os ramos. |
| callback de officeDocument | [17](../src/documents.js#L17) | Inspeção do fluxo; testes do módulo indicados acima. Não equivale a cobertura individual de todos os ramos. |
| callback de officeDocument | [24](../src/documents.js#L24) | Inspeção do fluxo; testes do módulo indicados acima. Não equivale a cobertura individual de todos os ramos. |
| callback de officeDocument | [30](../src/documents.js#L30) | Inspeção do fluxo; testes do módulo indicados acima. Não equivale a cobertura individual de todos os ramos. |
| paragraphsOutsideTables | [32](../src/documents.js#L32) | Inspeção do fluxo; testes do módulo indicados acima. Não equivale a cobertura individual de todos os ramos. |
| structuredDocument | [35](../src/documents.js#L35) | Inspeção do fluxo; testes do módulo indicados acima. Não equivale a cobertura individual de todos os ramos. |
| looksLikeRecord | [35](../src/documents.js#L35) | Inspeção do fluxo; testes do módulo indicados acima. Não equivale a cobertura individual de todos os ramos. |
| walk | [35](../src/documents.js#L35) | Inspeção do fluxo; testes do módulo indicados acima. Não equivale a cobertura individual de todos os ramos. |
| callback de walk | [35](../src/documents.js#L35) | Inspeção do fluxo; testes do módulo indicados acima. Não equivale a cobertura individual de todos os ramos. |
| callback de structuredDocument | [35](../src/documents.js#L35) | Inspeção do fluxo; testes do módulo indicados acima. Não equivale a cobertura individual de todos os ramos. |
| callback de structuredDocument | [35](../src/documents.js#L35) | Inspeção do fluxo; testes do módulo indicados acima. Não equivale a cobertura individual de todos os ramos. |
| callback de structuredDocument | [35](../src/documents.js#L35) | Inspeção do fluxo; testes do módulo indicados acima. Não equivale a cobertura individual de todos os ramos. |
| xmlDocument | [36](../src/documents.js#L36) | Inspeção do fluxo; testes do módulo indicados acima. Não equivale a cobertura individual de todos os ramos. |
| htmlDocument | [37](../src/documents.js#L37) | Inspeção do fluxo; testes do módulo indicados acima. Não equivale a cobertura individual de todos os ramos. |
| callback de htmlDocument | [37](../src/documents.js#L37) | Inspeção do fluxo; testes do módulo indicados acima. Não equivale a cobertura individual de todos os ramos. |
| callback de htmlDocument | [37](../src/documents.js#L37) | Inspeção do fluxo; testes do módulo indicados acima. Não equivale a cobertura individual de todos os ramos. |
| callback de htmlDocument | [37](../src/documents.js#L37) | Inspeção do fluxo; testes do módulo indicados acima. Não equivale a cobertura individual de todos os ramos. |
| callback de htmlDocument | [37](../src/documents.js#L37) | Inspeção do fluxo; testes do módulo indicados acima. Não equivale a cobertura individual de todos os ramos. |
| callback de htmlDocument | [37](../src/documents.js#L37) | Inspeção do fluxo; testes do módulo indicados acima. Não equivale a cobertura individual de todos os ramos. |
| callback de htmlDocument | [37](../src/documents.js#L37) | Inspeção do fluxo; testes do módulo indicados acima. Não equivale a cobertura individual de todos os ramos. |
| callback de htmlDocument | [37](../src/documents.js#L37) | Inspeção do fluxo; testes do módulo indicados acima. Não equivale a cobertura individual de todos os ramos. |
| decodeText | [38](../src/documents.js#L38) | Inspeção do fluxo; testes do módulo indicados acima. Não equivale a cobertura individual de todos os ramos. |
| pdfVisualRows | [39](../src/documents.js#L39) | Inspeção do fluxo; testes do módulo indicados acima. Não equivale a cobertura individual de todos os ramos. |
| callback de pdfVisualRows | [39](../src/documents.js#L39) | Inspeção do fluxo; testes do módulo indicados acima. Não equivale a cobertura individual de todos os ramos. |
| callback de pdfVisualRows | [39](../src/documents.js#L39) | Inspeção do fluxo; testes do módulo indicados acima. Não equivale a cobertura individual de todos os ramos. |
| callback de pdfVisualRows | [39](../src/documents.js#L39) | Inspeção do fluxo; testes do módulo indicados acima. Não equivale a cobertura individual de todos os ramos. |
| callback de pdfVisualRows | [40](../src/documents.js#L40) | Inspeção do fluxo; testes do módulo indicados acima. Não equivale a cobertura individual de todos os ramos. |
| callback de pdfVisualRows | [40](../src/documents.js#L40) | Inspeção do fluxo; testes do módulo indicados acima. Não equivale a cobertura individual de todos os ramos. |
| callback de pdfVisualRows | [40](../src/documents.js#L40) | Inspeção do fluxo; testes do módulo indicados acima. Não equivale a cobertura individual de todos os ramos. |
| callback de pdfVisualRows | [41](../src/documents.js#L41) | Inspeção do fluxo; testes do módulo indicados acima. Não equivale a cobertura individual de todos os ramos. |
| callback de pdfVisualRows | [41](../src/documents.js#L41) | Inspeção do fluxo; testes do módulo indicados acima. Não equivale a cobertura individual de todos os ramos. |
| callback de pdfVisualRows | [41](../src/documents.js#L41) | Inspeção do fluxo; testes do módulo indicados acima. Não equivale a cobertura individual de todos os ramos. |

### empty.js

Evidência do módulo: Unitários: missing-inputs/reports; nome vazio no DOM e relatórios.

| Função/callback | Linha | Verificação |
| --- | --- | --- |
| isMissing | [2](../src/empty.js#L2) | Inspeção do fluxo; testes do módulo indicados acima. Não equivale a cobertura individual de todos os ramos. |
| participantLabel | [3](../src/empty.js#L3) | Inspeção do fluxo; testes do módulo indicados acima. Não equivale a cobertura individual de todos os ramos. |

### event-header.js

Evidência do módulo: Unitários/DOM: event-header, event-header-ui, audit-files, audit-print-logos; imagens válidas também em browser-file.

| Função/callback | Linha | Verificação |
| --- | --- | --- |
| esc | [4](../src/event-header.js#L4) | Inspeção do fluxo; testes do módulo indicados acima. Não equivale a cobertura individual de todos os ramos. |
| callback de esc | [4](../src/event-header.js#L4) | Inspeção do fluxo; testes do módulo indicados acima. Não equivale a cobertura individual de todos os ramos. |
| validateHeaderLogo | [7](../src/event-header.js#L7) | Inspeção do fluxo; testes do módulo indicados acima. Não equivale a cobertura individual de todos os ramos. |
| callback de validateHeaderLogo | [7](../src/event-header.js#L7) | Inspeção do fluxo; testes do módulo indicados acima. Não equivale a cobertura individual de todos os ramos. |
| normalizeEventHeader | [9](../src/event-header.js#L9) | Inspeção do fluxo; testes do módulo indicados acima. Não equivale a cobertura individual de todos os ramos. |
| callback de normalizeEventHeader | [9](../src/event-header.js#L9) | Inspeção do fluxo; testes do módulo indicados acima. Não equivale a cobertura individual de todos os ramos. |
| headerPending | [10](../src/event-header.js#L10) | Inspeção do fluxo; testes do módulo indicados acima. Não equivale a cobertura individual de todos os ramos. |
| callback de headerPending | [10](../src/event-header.js#L10) | Inspeção do fluxo; testes do módulo indicados acima. Não equivale a cobertura individual de todos os ramos. |
| callback de headerPending | [10](../src/event-header.js#L10) | Inspeção do fluxo; testes do módulo indicados acima. Não equivale a cobertura individual de todos os ramos. |
| eventHeaderHTML | [19](../src/event-header.js#L19) | Inspeção do fluxo; testes do módulo indicados acima. Não equivale a cobertura individual de todos os ramos. |
| logo | [19](../src/event-header.js#L19) | Inspeção do fluxo; testes do módulo indicados acima. Não equivale a cobertura individual de todos os ramos. |
| normalizeAppSettings | [20](../src/event-header.js#L20) | Inspeção do fluxo; testes do módulo indicados acima. Não equivale a cobertura individual de todos os ramos. |
| callback de normalizeAppSettings | [20](../src/event-header.js#L20) | Inspeção do fluxo; testes do módulo indicados acima. Não equivale a cobertura individual de todos os ramos. |
| logoFileToDataURL | [21](../src/event-header.js#L21) | Inspeção do fluxo; testes do módulo indicados acima. Não equivale a cobertura individual de todos os ramos. |
| callback de logoFileToDataURL | [21](../src/event-header.js#L21) | Inspeção do fluxo; testes do módulo indicados acima. Não equivale a cobertura individual de todos os ramos. |
| callback de logoFileToDataURL | [21](../src/event-header.js#L21) | Inspeção do fluxo; testes do módulo indicados acima. Não equivale a cobertura individual de todos os ramos. |
| img.onload | [21](../src/event-header.js#L21) | Inspeção do fluxo; testes do módulo indicados acima. Não equivale a cobertura individual de todos os ramos. |
| img.onerror | [21](../src/event-header.js#L21) | Inspeção do fluxo; testes do módulo indicados acima. Não equivale a cobertura individual de todos os ramos. |
| sharedLogoCSS | [23](../src/event-header.js#L23) | Inspeção do fluxo; testes do módulo indicados acima. Não equivale a cobertura individual de todos os ramos. |
| eventFileTag | [24](../src/event-header.js#L24) | Inspeção do fluxo; testes do módulo indicados acima. Não equivale a cobertura individual de todos os ramos. |
| sharedLogoDefinitions | [26](../src/event-header.js#L26) | Inspeção do fluxo; testes do módulo indicados acima. Não equivale a cobertura individual de todos os ramos. |
| callback de sharedLogoDefinitions | [26](../src/event-header.js#L26) | Inspeção do fluxo; testes do módulo indicados acima. Não equivale a cobertura individual de todos os ramos. |
| callback de sharedLogoDefinitions | [26](../src/event-header.js#L26) | Inspeção do fluxo; testes do módulo indicados acima. Não equivale a cobertura individual de todos os ramos. |

### file-save.js

Evidência do módulo: Unitários com dublês necessários de seletor/compartilhamento: file-save; DOM: reports-ui. Download real em browser-file; diálogo nativo/Drive não homologados.

| Função/callback | Linha | Verificação |
| --- | --- | --- |
| validateSaveName | [2](../src/file-save.js#L2) | Inspeção do fluxo; testes do módulo indicados acima. Não equivale a cobertura individual de todos os ramos. |
| downloadBlob | [10](../src/file-save.js#L10) | Inspeção do fluxo; testes do módulo indicados acima. Não equivale a cobertura individual de todos os ramos. |
| callback de downloadBlob | [10](../src/file-save.js#L10) | Inspeção do fluxo; testes do módulo indicados acima. Não equivale a cobertura individual de todos os ramos. |
| saveExport | [11](../src/file-save.js#L11) | Inspeção do fluxo; testes do módulo indicados acima. Não equivale a cobertura individual de todos os ramos. |

### identifiers.js

Evidência do módulo: Unitários: identifiers; campos mascarados/números e avisos; leitura real de formatos e codificações.

| Função/callback | Linha | Verificação |
| --- | --- | --- |
| cpfChecksum | [3](../src/identifiers.js#L3) | Inspeção do fluxo; testes do módulo indicados acima. Não equivale a cobertura individual de todos os ramos. |
| inspectIdentifier | [4](../src/identifiers.js#L4) | Inspeção do fluxo; testes do módulo indicados acima. Não equivale a cobertura individual de todos os ramos. |
| review | [4](../src/identifiers.js#L4) | Inspeção do fluxo; testes do módulo indicados acima. Não equivale a cobertura individual de todos os ramos. |
| sourceCellMetadata | [26](../src/identifiers.js#L26) | Inspeção do fluxo; testes do módulo indicados acima. Não equivale a cobertura individual de todos os ramos. |
| warningGroups | [27](../src/identifiers.js#L27) | Inspeção do fluxo; testes do módulo indicados acima. Não equivale a cobertura individual de todos os ramos. |

### importer.js

Evidência do módulo: Unitários: layouts, audit-import-formats, audit-text-encoding, audit-input-limits; browser-file para XLSX/CSV/PDF/PNG OCR.

| Função/callback | Linha | Verificação |
| --- | --- | --- |
| spreadsheets | [6](../src/importer.js#L6) | Inspeção do fluxo; testes do módulo indicados acima. Não equivale a cobertura individual de todos os ramos. |
| callback de spreadsheets | [6](../src/importer.js#L6) | Inspeção do fluxo; testes do módulo indicados acima. Não equivale a cobertura individual de todos os ramos. |
| readFile | [7](../src/importer.js#L7) | Inspeção do fluxo; testes do módulo indicados acima. Não equivale a cobertura individual de todos os ramos. |
| callback de readFile | [10](../src/importer.js#L10) | Inspeção do fluxo; testes do módulo indicados acima. Não equivale a cobertura individual de todos os ramos. |
| callback de readFile | [10](../src/importer.js#L10) | Inspeção do fluxo; testes do módulo indicados acima. Não equivale a cobertura individual de todos os ramos. |
| callback de readFile | [11](../src/importer.js#L11) | Inspeção do fluxo; testes do módulo indicados acima. Não equivale a cobertura individual de todos os ramos. |
| callback de readFile | [11](../src/importer.js#L11) | Inspeção do fluxo; testes do módulo indicados acima. Não equivale a cobertura individual de todos os ramos. |
| callback de readFile | [11](../src/importer.js#L11) | Inspeção do fluxo; testes do módulo indicados acima. Não equivale a cobertura individual de todos os ramos. |
| callback de readFile | [11](../src/importer.js#L11) | Inspeção do fluxo; testes do módulo indicados acima. Não equivale a cobertura individual de todos os ramos. |
| callback de readFile | [11](../src/importer.js#L11) | Inspeção do fluxo; testes do módulo indicados acima. Não equivale a cobertura individual de todos os ramos. |

### layouts.js

Evidência do módulo: Unitários: layouts, missing-inputs, identifiers, audit-office; DOM: import-automatic-ui/reports-ui; browser-file.

| Função/callback | Linha | Verificação |
| --- | --- | --- |
| callback de módulo | [6](../src/layouts.js#L6) | Inspeção do fluxo; testes do módulo indicados acima. Não equivale a cobertura individual de todos os ramos. |
| matchField | [7](../src/layouts.js#L7) | Inspeção do fluxo; testes do módulo indicados acima. Não equivale a cobertura individual de todos os ramos. |
| mapping | [8](../src/layouts.js#L8) | Inspeção do fluxo; testes do módulo indicados acima. Não equivale a cobertura individual de todos os ramos. |
| columnName | [9](../src/layouts.js#L9) | Inspeção do fluxo; testes do módulo indicados acima. Não equivale a cobertura individual de todos os ramos. |
| widthOf | [10](../src/layouts.js#L10) | Inspeção do fluxo; testes do módulo indicados acima. Não equivale a cobertura individual de todos os ramos. |
| callback de widthOf | [10](../src/layouts.js#L10) | Inspeção do fluxo; testes do módulo indicados acima. Não equivale a cobertura individual de todos os ramos. |
| nonempty | [11](../src/layouts.js#L11) | Inspeção do fluxo; testes do módulo indicados acima. Não equivale a cobertura individual de todos os ramos. |
| label | [12](../src/layouts.js#L12) | Inspeção do fluxo; testes do módulo indicados acima. Não equivale a cobertura individual de todos os ramos. |
| checkRows | [14](../src/layouts.js#L14) | Inspeção do fluxo; testes do módulo indicados acima. Não equivale a cobertura individual de todos os ramos. |
| callback de checkRows | [14](../src/layouts.js#L14) | Inspeção do fluxo; testes do módulo indicados acima. Não equivale a cobertura individual de todos os ramos. |
| sourceAddress | [15](../src/layouts.js#L15) | Inspeção do fluxo; testes do módulo indicados acima. Não equivale a cobertura individual de todos os ramos. |
| rawRecord | [17](../src/layouts.js#L17) | Inspeção do fluxo; testes do módulo indicados acima. Não equivale a cobertura individual de todos os ramos. |
| callback de rawRecord | [17](../src/layouts.js#L17) | Inspeção do fluxo; testes do módulo indicados acima. Não equivale a cobertura individual de todos os ramos. |
| uniqueMap | [18](../src/layouts.js#L18) | Inspeção do fluxo; testes do módulo indicados acima. Não equivale a cobertura individual de todos os ramos. |
| callback de uniqueMap | [18](../src/layouts.js#L18) | Inspeção do fluxo; testes do módulo indicados acima. Não equivale a cobertura individual de todos os ramos. |
| detectLayouts | [19](../src/layouts.js#L19) | Inspeção do fluxo; testes do módulo indicados acima. Não equivale a cobertura individual de todos os ramos. |
| callback de detectLayouts | [21](../src/layouts.js#L21) | Inspeção do fluxo; testes do módulo indicados acima. Não equivale a cobertura individual de todos os ramos. |
| callback de detectLayouts | [21](../src/layouts.js#L21) | Inspeção do fluxo; testes do módulo indicados acima. Não equivale a cobertura individual de todos os ramos. |
| callback de detectLayouts | [21](../src/layouts.js#L21) | Inspeção do fluxo; testes do módulo indicados acima. Não equivale a cobertura individual de todos os ramos. |
| callback de detectLayouts | [22](../src/layouts.js#L22) | Inspeção do fluxo; testes do módulo indicados acima. Não equivale a cobertura individual de todos os ramos. |
| callback de detectLayouts | [24](../src/layouts.js#L24) | Inspeção do fluxo; testes do módulo indicados acima. Não equivale a cobertura individual de todos os ramos. |
| callback de detectLayouts | [24](../src/layouts.js#L24) | Inspeção do fluxo; testes do módulo indicados acima. Não equivale a cobertura individual de todos os ramos. |
| callback de detectLayouts | [25](../src/layouts.js#L25) | Inspeção do fluxo; testes do módulo indicados acima. Não equivale a cobertura individual de todos os ramos. |
| callback de detectLayouts | [25](../src/layouts.js#L25) | Inspeção do fluxo; testes do módulo indicados acima. Não equivale a cobertura individual de todos os ramos. |
| callback de detectLayouts | [26](../src/layouts.js#L26) | Inspeção do fluxo; testes do módulo indicados acima. Não equivale a cobertura individual de todos os ramos. |
| callback de detectLayouts | [26](../src/layouts.js#L26) | Inspeção do fluxo; testes do módulo indicados acima. Não equivale a cobertura individual de todos os ramos. |
| callback de detectLayouts | [26](../src/layouts.js#L26) | Inspeção do fluxo; testes do módulo indicados acima. Não equivale a cobertura individual de todos os ramos. |
| callback de detectLayouts | [26](../src/layouts.js#L26) | Inspeção do fluxo; testes do módulo indicados acima. Não equivale a cobertura individual de todos os ramos. |
| recordsToPreview | [30](../src/layouts.js#L30) | Inspeção do fluxo; testes do módulo indicados acima. Não equivale a cobertura individual de todos os ramos. |
| callback de recordsToPreview | [30](../src/layouts.js#L30) | Inspeção do fluxo; testes do módulo indicados acima. Não equivale a cobertura individual de todos os ramos. |
| callback de recordsToPreview | [30](../src/layouts.js#L30) | Inspeção do fluxo; testes do módulo indicados acima. Não equivale a cobertura individual de todos os ramos. |
| callback de recordsToPreview | [32](../src/layouts.js#L32) | Inspeção do fluxo; testes do módulo indicados acima. Não equivale a cobertura individual de todos os ramos. |
| parseRows | [39](../src/layouts.js#L39) | Inspeção do fluxo; testes do módulo indicados acima. Não equivale a cobertura individual de todos os ramos. |
| callback de parseRows | [39](../src/layouts.js#L39) | Inspeção do fluxo; testes do módulo indicados acima. Não equivale a cobertura individual de todos os ramos. |
| callback de parseRows | [39](../src/layouts.js#L39) | Inspeção do fluxo; testes do módulo indicados acima. Não equivale a cobertura individual de todos os ramos. |
| callback de parseRows | [39](../src/layouts.js#L39) | Inspeção do fluxo; testes do módulo indicados acima. Não equivale a cobertura individual de todos os ramos. |
| callback de parseRows | [39](../src/layouts.js#L39) | Inspeção do fluxo; testes do módulo indicados acima. Não equivale a cobertura individual de todos os ramos. |

### measurement-compare.js

Evidência do módulo: Casos de limite independentes em audit-core/audit-calculators; valores realmente acima/abaixo preservados.

| Função/callback | Linha | Verificação |
| --- | --- | --- |
| compareMeasurement | [2](../src/measurement-compare.js#L2) | Inspeção do fluxo; testes do módulo indicados acima. Não equivale a cobertura individual de todos os ramos. |

### ocr.js

Evidência do módulo: Worker WASM real/idiomas no teste ocr-runtime; orquestração no browser-file. Reconhecimento não garante precisão universal.

| Função/callback | Linha | Verificação |
| --- | --- | --- |
| progressCallback | [3](../src/ocr.js#L3) | Inspeção do fluxo; testes do módulo indicados acima. Não equivale a cobertura individual de todos os ramos. |
| recognizeImage | [4](../src/ocr.js#L4) | Inspeção do fluxo; testes do módulo indicados acima. Não equivale a cobertura individual de todos os ramos. |
| callback de recognizeImage | [4](../src/ocr.js#L4) | Inspeção do fluxo; testes do módulo indicados acima. Não equivale a cobertura individual de todos os ramos. |
| callback de recognizeImage | [4](../src/ocr.js#L4) | Inspeção do fluxo; testes do módulo indicados acima. Não equivale a cobertura individual de todos os ramos. |
| callback de recognizeImage | [4](../src/ocr.js#L4) | Inspeção do fluxo; testes do módulo indicados acima. Não equivale a cobertura individual de todos os ramos. |
| stopOCR | [5](../src/ocr.js#L5) | Inspeção do fluxo; testes do módulo indicados acima. Não equivale a cobertura individual de todos os ramos. |

### participant-list.js

Evidência do módulo: Unitários/DOM: participant-list e participant-list-ui; nome/acentos/cores/ordem/paginação; browser-file.

| Função/callback | Linha | Verificação |
| --- | --- | --- |
| folded | [2](../src/participant-list.js#L2) | Inspeção do fluxo; testes do módulo indicados acima. Não equivale a cobertura individual de todos os ramos. |
| locateParticipants | [5](../src/participant-list.js#L5) | Inspeção do fluxo; testes do módulo indicados acima. Não equivale a cobertura individual de todos os ramos. |
| callback de locateParticipants | [7](../src/participant-list.js#L7) | Inspeção do fluxo; testes do módulo indicados acima. Não equivale a cobertura individual de todos os ramos. |
| callback de locateParticipants | [7](../src/participant-list.js#L7) | Inspeção do fluxo; testes do módulo indicados acima. Não equivale a cobertura individual de todos os ramos. |

### pdf.js

Evidência do módulo: PDF real sintético em pdf.test; importação no browser-file. Páginas mistas e OCR continuam exigindo conferência.

| Função/callback | Linha | Verificação |
| --- | --- | --- |
| readPDF | [6](../src/pdf.js#L6) | Inspeção do fluxo; testes do módulo indicados acima. Não equivale a cobertura individual de todos os ramos. |
| callback de readPDF | [6](../src/pdf.js#L6) | Inspeção do fluxo; testes do módulo indicados acima. Não equivale a cobertura individual de todos os ramos. |

### png-logo.js

Evidência do módulo: Unitários: audit-files/event-header; CRC, dimensões, deflate/Adler, limites; PNG de canvas real em browser-file.

| Função/callback | Linha | Verificação |
| --- | --- | --- |
| callback de módulo | [3](../src/png-logo.js#L3) | Inspeção do fluxo; testes do módulo indicados acima. Não equivale a cobertura individual de todos os ramos. |
| crc32 | [4](../src/png-logo.js#L4) | Inspeção do fluxo; testes do módulo indicados acima. Não equivale a cobertura individual de todos os ramos. |
| fail | [5](../src/png-logo.js#L5) | Inspeção do fluxo; testes do módulo indicados acima. Não equivale a cobertura individual de todos os ramos. |
| inspectPNG | [6](../src/png-logo.js#L6) | Inspeção do fluxo; testes do módulo indicados acima. Não equivale a cobertura individual de todos os ramos. |
| callback de inspectPNG | [7](../src/png-logo.js#L7) | Inspeção do fluxo; testes do módulo indicados acima. Não equivale a cobertura individual de todos os ramos. |
| callback de inspectPNG | [21](../src/png-logo.js#L21) | Inspeção do fluxo; testes do módulo indicados acima. Não equivale a cobertura individual de todos os ramos. |

### print-report.js

Evidência do módulo: Mensagem autenticada em print-report.test e falha no audit-print-ui; documento real/preview/PDF no browser-file. Não comprova diálogo nativo ou papel físico.

| Função/callback | Linha | Verificação |
| --- | --- | --- |
| printReportHTML | [3](../src/print-report.js#L3) | Inspeção do fluxo; testes do módulo indicados acima. Não equivale a cobertura individual de todos os ramos. |
| callback de printReportHTML | [9](../src/print-report.js#L9) | Inspeção do fluxo; testes do módulo indicados acima. Não equivale a cobertura individual de todos os ramos. |
| cleanup | [10](../src/print-report.js#L10) | Inspeção do fluxo; testes do módulo indicados acima. Não equivale a cobertura individual de todos os ramos. |
| message | [11](../src/print-report.js#L11) | Inspeção do fluxo; testes do módulo indicados acima. Não equivale a cobertura individual de todos os ramos. |
| callback de printReportHTML | [17](../src/print-report.js#L17) | Inspeção do fluxo; testes do módulo indicados acima. Não equivale a cobertura individual de todos os ramos. |
| frame.onerror | [19](../src/print-report.js#L19) | Inspeção do fluxo; testes do módulo indicados acima. Não equivale a cobertura individual de todos os ramos. |

### report-exports.js

Evidência do módulo: Cinco formatos reais e leitura de PDF/planilhas: report-exports, criteria-reports, audit-export; downloads reais em browser-file.

| Função/callback | Linha | Verificação |
| --- | --- | --- |
| esc | [18](../src/report-exports.js#L18) | Inspeção do fluxo; testes do módulo indicados acima. Não equivale a cobertura individual de todos os ramos. |
| callback de esc | [18](../src/report-exports.js#L18) | Inspeção do fluxo; testes do módulo indicados acima. Não equivale a cobertura individual de todos os ramos. |
| shown | [19](../src/report-exports.js#L19) | Inspeção do fluxo; testes do módulo indicados acima. Não equivale a cobertura individual de todos os ramos. |
| reportFileInfo | [21](../src/report-exports.js#L21) | Inspeção do fluxo; testes do módulo indicados acima. Não equivale a cobertura individual de todos os ramos. |
| exportSheets | [27](../src/report-exports.js#L27) | Inspeção do fluxo; testes do módulo indicados acima. Não equivale a cobertura individual de todos os ramos. |
| callback de exportSheets | [28](../src/report-exports.js#L28) | Inspeção do fluxo; testes do módulo indicados acima. Não equivale a cobertura individual de todos os ramos. |
| callback de exportSheets | [30](../src/report-exports.js#L30) | Inspeção do fluxo; testes do módulo indicados acima. Não equivale a cobertura individual de todos os ramos. |
| callback de exportSheets | [30](../src/report-exports.js#L30) | Inspeção do fluxo; testes do módulo indicados acima. Não equivale a cobertura individual de todos os ramos. |
| callback de exportSheets | [33](../src/report-exports.js#L33) | Inspeção do fluxo; testes do módulo indicados acima. Não equivale a cobertura individual de todos os ramos. |
| callback de exportSheets | [33](../src/report-exports.js#L33) | Inspeção do fluxo; testes do módulo indicados acima. Não equivale a cobertura individual de todos os ramos. |
| callback de exportSheets | [34](../src/report-exports.js#L34) | Inspeção do fluxo; testes do módulo indicados acima. Não equivale a cobertura individual de todos os ramos. |
| callback de exportSheets | [38](../src/report-exports.js#L38) | Inspeção do fluxo; testes do módulo indicados acima. Não equivale a cobertura individual de todos os ramos. |
| callback de exportSheets | [39](../src/report-exports.js#L39) | Inspeção do fluxo; testes do módulo indicados acima. Não equivale a cobertura individual de todos os ramos. |
| callback de exportSheets | [39](../src/report-exports.js#L39) | Inspeção do fluxo; testes do módulo indicados acima. Não equivale a cobertura individual de todos os ramos. |
| workbook | [41](../src/report-exports.js#L41) | Inspeção do fluxo; testes do módulo indicados acima. Não equivale a cobertura individual de todos os ramos. |
| callback de workbook | [41](../src/report-exports.js#L41) | Inspeção do fluxo; testes do módulo indicados acima. Não equivale a cobertura individual de todos os ramos. |
| csv | [42](../src/report-exports.js#L42) | Inspeção do fluxo; testes do módulo indicados acima. Não equivale a cobertura individual de todos os ramos. |
| callback de csv | [45](../src/report-exports.js#L45) | Inspeção do fluxo; testes do módulo indicados acima. Não equivale a cobertura individual de todos os ramos. |
| missingReportHTML | [47](../src/report-exports.js#L47) | Inspeção do fluxo; testes do módulo indicados acima. Não equivale a cobertura individual de todos os ramos. |
| callback de missingReportHTML | [47](../src/report-exports.js#L47) | Inspeção do fluxo; testes do módulo indicados acima. Não equivale a cobertura individual de todos os ramos. |
| callback de missingReportHTML | [47](../src/report-exports.js#L47) | Inspeção do fluxo; testes do módulo indicados acima. Não equivale a cobertura individual de todos os ramos. |
| callback de missingReportHTML | [47](../src/report-exports.js#L47) | Inspeção do fluxo; testes do módulo indicados acima. Não equivale a cobertura individual de todos os ramos. |
| callback de missingReportHTML | [47](../src/report-exports.js#L47) | Inspeção do fluxo; testes do módulo indicados acima. Não equivale a cobertura individual de todos os ramos. |
| pdf | [48](../src/report-exports.js#L48) | Inspeção do fluxo; testes do módulo indicados acima. Não equivale a cobertura individual de todos os ramos. |
| line | [56](../src/report-exports.js#L56) | Inspeção do fluxo; testes do módulo indicados acima. Não equivale a cobertura individual de todos os ramos. |
| header | [57](../src/report-exports.js#L57) | Inspeção do fluxo; testes do módulo indicados acima. Não equivale a cobertura individual de todos os ramos. |
| art | [57](../src/report-exports.js#L57) | Inspeção do fluxo; testes do módulo indicados acima. Não equivale a cobertura individual de todos os ramos. |
| exportReport | [68](../src/report-exports.js#L68) | Inspeção do fluxo; testes do módulo indicados acima. Não equivale a cobertura individual de todos os ramos. |

### reports.js

Evidência do módulo: Unitários: reports, criteria-reports, audit-export; DOM: reports-ui; versão por ficha e origem sem truncar a sessão.

| Função/callback | Linha | Verificação |
| --- | --- | --- |
| esc | [7](../src/reports.js#L7) | Inspeção do fluxo; testes do módulo indicados acima. Não equivale a cobertura individual de todos os ramos. |
| callback de esc | [7](../src/reports.js#L7) | Inspeção do fluxo; testes do módulo indicados acima. Não equivale a cobertura individual de todos os ramos. |
| shown | [11](../src/reports.js#L11) | Inspeção do fluxo; testes do módulo indicados acima. Não equivale a cobertura individual de todos os ramos. |
| origin | [12](../src/reports.js#L12) | Inspeção do fluxo; testes do módulo indicados acima. Não equivale a cobertura individual de todos os ramos. |
| callback de origin | [12](../src/reports.js#L12) | Inspeção do fluxo; testes do módulo indicados acima. Não equivale a cobertura individual de todos os ramos. |
| callback de origin | [12](../src/reports.js#L12) | Inspeção do fluxo; testes do módulo indicados acima. Não equivale a cobertura individual de todos os ramos. |
| missingFields | [13](../src/reports.js#L13) | Inspeção do fluxo; testes do módulo indicados acima. Não equivale a cobertura individual de todos os ramos. |
| callback de missingFields | [13](../src/reports.js#L13) | Inspeção do fluxo; testes do módulo indicados acima. Não equivale a cobertura individual de todos os ramos. |
| callback de missingFields | [13](../src/reports.js#L13) | Inspeção do fluxo; testes do módulo indicados acima. Não equivale a cobertura individual de todos os ramos. |
| callback de missingFields | [14](../src/reports.js#L14) | Inspeção do fluxo; testes do módulo indicados acima. Não equivale a cobertura individual de todos os ramos. |
| reportModel | [19](../src/reports.js#L19) | Inspeção do fluxo; testes do módulo indicados acima. Não equivale a cobertura individual de todos os ramos. |
| callback de reportModel | [19](../src/reports.js#L19) | Inspeção do fluxo; testes do módulo indicados acima. Não equivale a cobertura individual de todos os ramos. |
| callback de reportModel | [25](../src/reports.js#L25) | Inspeção do fluxo; testes do módulo indicados acima. Não equivale a cobertura individual de todos os ramos. |
| callback de reportModel | [27](../src/reports.js#L27) | Inspeção do fluxo; testes do módulo indicados acima. Não equivale a cobertura individual de todos os ramos. |
| callback de reportModel | [27](../src/reports.js#L27) | Inspeção do fluxo; testes do módulo indicados acima. Não equivale a cobertura individual de todos os ramos. |
| callback de reportModel | [27](../src/reports.js#L27) | Inspeção do fluxo; testes do módulo indicados acima. Não equivale a cobertura individual de todos os ramos. |
| callback de reportModel | [27](../src/reports.js#L27) | Inspeção do fluxo; testes do módulo indicados acima. Não equivale a cobertura individual de todos os ramos. |
| dateText | [29](../src/reports.js#L29) | Inspeção do fluxo; testes do módulo indicados acima. Não equivale a cobertura individual de todos os ramos. |
| stamp | [30](../src/reports.js#L30) | Inspeção do fluxo; testes do módulo indicados acima. Não equivale a cobertura individual de todos os ramos. |
| fullReportHTML | [31](../src/reports.js#L31) | Inspeção do fluxo; testes do módulo indicados acima. Não equivale a cobertura individual de todos os ramos. |
| renderRow | [31](../src/reports.js#L31) | Inspeção do fluxo; testes do módulo indicados acima. Não equivale a cobertura individual de todos os ramos. |
| callback de fullReportHTML | [32](../src/reports.js#L32) | Inspeção do fluxo; testes do módulo indicados acima. Não equivale a cobertura individual de todos os ramos. |
| callback de fullReportHTML | [32](../src/reports.js#L32) | Inspeção do fluxo; testes do módulo indicados acima. Não equivale a cobertura individual de todos os ramos. |
| callback de fullReportHTML | [32](../src/reports.js#L32) | Inspeção do fluxo; testes do módulo indicados acima. Não equivale a cobertura individual de todos os ramos. |
| callback de fullReportHTML | [32](../src/reports.js#L32) | Inspeção do fluxo; testes do módulo indicados acima. Não equivale a cobertura individual de todos os ramos. |
| callback de fullReportHTML | [32](../src/reports.js#L32) | Inspeção do fluxo; testes do módulo indicados acima. Não equivale a cobertura individual de todos os ramos. |
| callback de fullReportHTML | [32](../src/reports.js#L32) | Inspeção do fluxo; testes do módulo indicados acima. Não equivale a cobertura individual de todos os ramos. |
| callback de fullReportHTML | [32](../src/reports.js#L32) | Inspeção do fluxo; testes do módulo indicados acima. Não equivale a cobertura individual de todos os ramos. |
| callback de fullReportHTML | [32](../src/reports.js#L32) | Inspeção do fluxo; testes do módulo indicados acima. Não equivale a cobertura individual de todos os ramos. |
| callback de fullReportHTML | [32](../src/reports.js#L32) | Inspeção do fluxo; testes do módulo indicados acima. Não equivale a cobertura individual de todos os ramos. |
| callback de fullReportHTML | [32](../src/reports.js#L32) | Inspeção do fluxo; testes do módulo indicados acima. Não equivale a cobertura individual de todos os ramos. |
| callback de fullReportHTML | [32](../src/reports.js#L32) | Inspeção do fluxo; testes do módulo indicados acima. Não equivale a cobertura individual de todos os ramos. |
| callback de fullReportHTML | [32](../src/reports.js#L32) | Inspeção do fluxo; testes do módulo indicados acima. Não equivale a cobertura individual de todos os ramos. |
| callback de fullReportHTML | [32](../src/reports.js#L32) | Inspeção do fluxo; testes do módulo indicados acima. Não equivale a cobertura individual de todos os ramos. |
| callback de fullReportHTML | [32](../src/reports.js#L32) | Inspeção do fluxo; testes do módulo indicados acima. Não equivale a cobertura individual de todos os ramos. |
| callback de fullReportHTML | [32](../src/reports.js#L32) | Inspeção do fluxo; testes do módulo indicados acima. Não equivale a cobertura individual de todos os ramos. |
| callback de fullReportHTML | [32](../src/reports.js#L32) | Inspeção do fluxo; testes do módulo indicados acima. Não equivale a cobertura individual de todos os ramos. |
| callback de fullReportHTML | [32](../src/reports.js#L32) | Inspeção do fluxo; testes do módulo indicados acima. Não equivale a cobertura individual de todos os ramos. |
| missingWorkbook | [34](../src/reports.js#L34) | Inspeção do fluxo; testes do módulo indicados acima. Não equivale a cobertura individual de todos os ramos. |
| callback de missingWorkbook | [34](../src/reports.js#L34) | Inspeção do fluxo; testes do módulo indicados acima. Não equivale a cobertura individual de todos os ramos. |
| callback de missingWorkbook | [34](../src/reports.js#L34) | Inspeção do fluxo; testes do módulo indicados acima. Não equivale a cobertura individual de todos os ramos. |
| callback de missingWorkbook | [34](../src/reports.js#L34) | Inspeção do fluxo; testes do módulo indicados acima. Não equivale a cobertura individual de todos os ramos. |
| buildReports | [35](../src/reports.js#L35) | Inspeção do fluxo; testes do módulo indicados acima. Não equivale a cobertura individual de todos os ramos. |

### vault.js

Evidência do módulo: WebCrypto real: core/criteria-ui/audit-session; roundtrip e adulteração/senha errada. Não recupera senha e não confirma download no aparelho.

| Função/callback | Linha | Verificação |
| --- | --- | --- |
| b64 | [2](../src/vault.js#L2) | Inspeção do fluxo; testes do módulo indicados acima. Não equivale a cobertura individual de todos os ramos. |
| bytes | [3](../src/vault.js#L3) | Inspeção do fluxo; testes do módulo indicados acima. Não equivale a cobertura individual de todos os ramos. |
| callback de bytes | [3](../src/vault.js#L3) | Inspeção do fluxo; testes do módulo indicados acima. Não equivale a cobertura individual de todos os ramos. |
| key | [4](../src/vault.js#L4) | Inspeção do fluxo; testes do módulo indicados acima. Não equivale a cobertura individual de todos os ramos. |
| encrypt | [5](../src/vault.js#L5) | Inspeção do fluxo; testes do módulo indicados acima. Não equivale a cobertura individual de todos os ramos. |
| decrypt | [6](../src/vault.js#L6) | Inspeção do fluxo; testes do módulo indicados acima. Não equivale a cobertura individual de todos os ramos. |

## Fechamento local da auditoria 1.8

Base examinada: versão pública 1.7, código c7556341f9ed49775d627cc38e35f496fbfb7d39, com metadados públicos posteriores 5721103a166d1c38aeadfe24107593b2b1741080. As alterações existentes em TODO/STATUS/EVIDENCIAS foram preservadas.

Execução final local: pnpm --config.verify-deps-before-run=false --config.enable-pre-post-scripts=true test — 189 testes, 189 aprovados, zero falhas (hakunas-audit-full-final.log). Há aviso informativo de PDF.js sobre build Node; não é teste falhando e não comprova problema no navegador. npm audit após atualizações: 0 alertas conhecidos. Sintaxe JS e git diff --check aprovados.

Os casos com falha foram executados antes da alteração, com logs audit-*-before; após cada correção os focados foram repetidos. O inventário usa AST dos módulos próprios e distingue funções de callbacks. Não é uma medição de cobertura de ramos.

E2E 1.8 ainda pendente nesta etapa: browser-file testa impressão superior em 320/390 px, prévia real, leitura do PDF de impressão/emblemas sem fundos, dez formatos de saída, critérios, backup, PDF importado e PNG/OCR. browser-hosted-audit testa build HTTP em loopback, cache offline e HTML inerte; isso não homologa o gateway do site ou o aparelho do usuário. Nenhum teste usa participantes reais.

## Histórico — bloqueio de distribuição 1.8 (resolvido)

A revisão automática rejeitou github_create_tree para 1.8: considerou as autorizações anteriores específicas por versão e não autorizou a árvore nova com o workflow de publicação de releases. Não contornar por outro canal. Foi solicitada autorização específica para publicar/testar o app vazio 1.8 e atualizar o site privado. Nenhuma árvore/commit 1.8 foi criada por essa tentativa. A publicação/download/site atuais continuam na 1.7.

Verificações concretas concluídas: 189 testes locais, build explícito, sintaxe e diff aprovados; npm audit com zero alertas conhecidos. HTML com nome genérico e Triagem-Hakunas-v1.8.0.html têm SHA-256 idêntico 7dab87af95ddc01b4e4cb525158d8e4ae55ab74eae66df84380e65d913f0756a. Inventário: 490 funções/callbacks em 21 módulos próprios, sem alegar execução de todos os ramos.

Pendentes por esse bloqueio: novos E2E file:// e hosted-audit no Chromium de CI; leitura do PDF de impressão e operações de imagem/emblemas sem fundos no browser; download público 1.8 e atualização do site. Hardware Android/Drive/pasta/impressora continuam sem homologação mesmo quando CI passar.

Ao receber autorização, renovar payload do estado local final (não reutilizar snapshot que antecede este registro), verificar branch/origem/diff, publicar, executar CI, resolver falhas reais e conferir download/hash; só então atualizar o site privado e o fechamento desta auditoria.

Autorização específica recebida: “Sim, publicar e testar a versão 1.8”, incluindo GitHub/CI, download e site privado, somente app vazio e dados fictícios. Bloqueio anterior de envio resolvido; executar e registrar a verificação remota antes da entrega.

## Verificação remota 1.8 concluída

Autorização específica recebida e publicação realizada. GitHub: commit 7dc9804fefff2f1578251e440d027c142a202769; execução 43325453926, job 131556654472, concluídos com sucesso. 189/189 testes; E2E Chromium file:// e hospedado em loopback aprovados, incluindo prévia, leitura do PDF e emblemas com fundos desligados. Uma primeira execução falhou por seletor de teste ambíguo; o seletor foi delimitado antes da execução aprovada.

Download v1.8.0 confirmado HTTP 200 e attachment, 13.897.081 bytes. SHA-256 remoto e local: 7dab87af95ddc01b4e4cb525158d8e4ae55ab74eae66df84380e65d913f0756a. URL: https://github.com/ebarroso12/hakunatriagem/releases/download/html-7dc9804fefff/Triagem-Hakunas-v1.8.0.html

Os registros anteriores de bloqueio/pendência são históricos e foram resolvidos quanto a GitHub, CI e download. Publicação privada Sites concluída; evidência abaixo. Permanecem sem homologação Android físico/content://, Drive, seletor nativo de pasta e impressora física. Próximo item: homologação nesses destinos com dados sintéticos.

## Fechamento da publicação privada 1.8

Sites retornou succeeded para deployment appgdep_6af646f3927481918a6acf576306b41d, versão appgprj_6af3885f25548191af99e68bff13d230~appgver_ffa2fdcd260c8191ae4695ac4d4b6b60. Fonte exata: eefb68f70f932e26e21813630c020f1d29a37ce3, enviada sem força; archive audit-v18.tar.gz contém manifest e dist do build. Audiência privada preservada. URL: https://triagem-hakunas.ebarroso12.chatgpt.site

Publicação, CI e download 1.8 concluídos. O sucesso de implantação não acrescenta homologação do gateway em aparelho, Android, Drive ou impressora. Nenhum dado de participante foi enviado. Próximo item aberto: homologação física com dados sintéticos.
