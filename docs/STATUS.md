# Estado local — manutenção de 10/11/2026

## Escopo desta execução

Aplicar as salvaguardas fornecidas como instruções locais e corrigir somente a cor operacional para idades de 16–17 anos. Nenhuma skill foi instalada. Git Guardrails, Planning With Files, Webapp Testing, Trail of Bits Security e Document Skills não foram encontrados com esses nomes no catálogo consultado; não foram carregados. Não foi verificada a classificação editorial do PDF, que não veio anexado a esta mensagem.

## Origem e Git

- Checkout efetivo: `/workspace/work/hakunatriagem`; não `/home/ubuntu/legendtriage`.
- Branch local: `main`; HEAD inicial e final da implementação: `e93489bad80b6ad2faa599d9f455d8e2508a10ab`.
- Origem canônica configurada: `https://github.com/ebarroso12/hakunatriagem.git`.
- Referência remota já disponível localmente: `origin/main` em `4ad5feda168f30141f67939381ca57e5808b0cac`. Não houve fetch nesta manutenção.
- Histórico local inicialmente quatro commits à frente e um atrás; árvores dos dois commits idênticas: `5f590040206acbcc2b429661d73f0d10212df5b4`. A divergência de histórico não foi alterada.
- Árvore de trabalho inicialmente limpa. Mudanças desta execução permanecem locais, sem commit, push, upload ou publicação.
- `.openai/hosting.json` aponta para um Site existente; CI contém upload de artefato após push. Estado remoto atual de auto-publicação não foi consultado; não presumir que esteja desligado.

## Causa e correção

A condição vermelha só verificava idade >60 ou fatores clínicos marcados. O teste antigo de menor também marcava hipertensão; por isso passava sem cobrir a idade isolada. Novos testes reproduziram seis falhas antes da correção.

Agora idades válidas inteiras de 16–17 produzem vermelho, com motivo explícito, antes de verificar critérios pretos existentes. Convulsão explicitamente marcada continua podendo produzir preto. Doença vermelha ou implante não se tornam pretos só por associação com menoridade. Score, IMC/faixa adulta nulos para menores e pendência de implante foram preservados.

Origem da nova regra: instrução operacional explícita do usuário nesta manutenção. Não atribuir essa decisão à tabela original do manual nem tratá-la como validação clínica externa.

## Validação

- TDD: 11 novos casos focados; antes, 6 falhas e 5 aprovações.
- Após correção: `node --test tests/core.test.mjs` — 40/40 aprovados.
- Suíte: 64/64 aprovados com `pnpm --config.verify-deps-before-run=false --config.enable-pre-post-scripts=true test`.
- Build: `pnpm --config.verify-deps-before-run=false build` concluído.
- `git diff --check`: aprovado, código de saída 0; registro em `docs/EVIDENCIAS.md`.
- E2E real: `node tests/browser-file.mjs` tentou o HTM por `file://` a 390×844, com rede desativada; bloqueado na navegação por `net::ERR_BLOCKED_BY_ADMINISTRATOR`. Não houve exercício de UI nesse ensaio.
- DOM simulado, PDF sintético e worker OCR continuam sendo evidências distintas de navegador real. A suíte simulada agora verifica vermelho para menor isolado.

## Divergências e pendências

O prompt recebido descreve uma versão sem OCR, mas o código 1.1 existente já contém OCR local e idiomas incorporados, com testes. Não houve instalação, expansão, remoção nem upload de OCR nesta execução. Resolver o escopo em item próprio antes de modificar esse recurso.

Próximo item de implementação: revisão dirigida de ambiguidade/rejeição atômica no importador, com reprodução sintética. A execução E2E real do HTM permanece bloqueante para declarar verificação de navegador concluída. Android físico, content://, impressora e armazenamento remoto não foram testados.

## Atualização de entrega 1.2

Conferência automática local de CPF/telefone, metadados de número/máscara preservados, prévia automática para estrutura única, avisos agrupados e confirmação móvel. 75 testes aprovados; E2E real offline por file:// em Chromium Ubuntu 24.04, 320/390 px, aprovado no job 130192616968. Download em GitHub Releases verificado como anexo público, com hash idêntico ao build. Site atualizado, deployment appgdep_6af3a354cac08191b3d18878f3e2424d succeeded. Evidências e hashes em docs/EVIDENCIAS.md. Os registros anteriores acima são históricos da manutenção local. Android físico, content:// e impressora permanecem pendentes.

## Versão 1.3 — pronta localmente, distribuição pendente

Campos vazios não interrompem o processamento; registros com dados e nome ausente são preservados. Dois relatórios locais implementados: completo HTML e faltantes/revisões XLSX, da sessão inteira e do mesmo snapshot. 100 testes aprovados; build e diff --check concluídos. E2E local bloqueado por política; E2E remoto desta versão ainda não executado.

A revisão automática rejeitou o envio de código ao GitHub por falta de autorização explícita. Autorização para distribuir código/HTML sem dados pessoais foi solicitada ao usuário. Não confundir o link 1.2 já publicado com esta versão 1.3 local. Detalhes e hash em docs/EVIDENCIAS.md.

## Versão 1.4 — cabeçalho configurável, somente local

Número do TOP, local, nome da base e emblemas locais configuráveis. Cabeçalho na tela, impressão e relatório; perfil incluído em backup validado antes da restauração. Fonte Anton incorporada e licenciada, independente de rede. Sem logotipos ou metadados de evento inventados.

112/112 testes locais aprovados, build explícito e git diff --check aprovados. E2E real da versão 1.4 não concluído: Chromium bloqueia file:// com ERR_BLOCKED_BY_ADMINISTRATOR. Android, content:// e impressora não testados. As evidências Chromium da versão 1.2 não homologam a 1.4.

HTML gerado em dist/Triagem-Hakunas-Corrigida.html; não enviado nem publicado. Permanece a rejeição automática anterior ao upload por falta de autorização explícita. Próximo passo: obter autorização específica para distribuir apenas código/HTML vazio e executar CI, depois verificar o download.

## Entrega autorizada da versão 1.4

Usuário respondeu “Sim” à autorização de disponibilizar HTML vazio no GitHub. Commit remoto 0112c850ea4ed9407ba3f1532e1035ba880f2cc7 em main, atualização fast-forward com lease; nenhum dado pessoal ou emblema fornecido pelo usuário enviado. Workflow 42940087758, job 130259540027: npm test 112/112 e E2E Chromium real file:// offline aprovado, 320/390 px, incluindo imagens/fontes, relatórios, backup/restore e PDF headless. Não comprova Android físico/content:///impressora.

Download verificado: HTTP 200, Content-Disposition attachment; 12223879 bytes. SHA-256 5423ed87884cb966c2d7ae9e5ae74c9040593547e71b9db895c19c77c0d99d40. Build local reproduz esse hash após normalizar CRLF da licença OFL para LF, como o upload textual fez. URL: https://github.com/ebarroso12/hakunatriagem/releases/download/html-0112c850ea4e/Triagem-Hakunas-Corrigida.html

O bloqueio de distribuição registrado anteriormente foi resolvido pela autorização explícita; os registros antigos são históricos. Não houve atualização do site hospedado. Log npm ci apontou 3 vulnerabilidades (1 moderada, 2 altas); revisão de dependências permanece item separado, sem correção automática destrutiva nesta entrega.

## Versão 1.5 — exportação e destino

Causa: interface 1.4 fixava relatório completo em HTML e faltantes em XLSX, usava download sem escolher destino, e só oferecia impressão dentro da ficha/HTML. Implementados dois relatórios em cinco formatos reais, botão de imprimir relatório na lista, alertas de campos vazios por participante sem bloqueio, seletor nativo com cancelamento/erros/validação de extensão, download e compartilhamento opcional de arquivos. Nenhuma integração automática de Drive ou envio clínico via ferramenta.

Arquivos: src/report-exports.js, src/file-save.js, src/print-report.js, src/app.js, fontes licenciadas NotoSans e gerador, package/lock, script de build, testes de formatos/escrita/UI/E2E e documentação. Fonte NotoSans/OFL incorporada para PDF offline, jsPDF 4.2.1 fixado. Validação detalhada em EVIDENCIAS. O download público será atualizado somente após CI com dados sintéticos. Autorizações anteriores de distribuição do app vazio permanecem aplicáveis a esta correção.

### Fechamento local 1.5

124/124 testes aprovados (hakunas-export-full.log), build explícito pnpm --config.verify-deps-before-run=false build aprovado; git diff --check e sintaxe JS aprovados. HTML SHA-256 c13fd7ebf7384e324b3069212c88c50de44a6216c0f7aed907f0a1236be45833. Os testes de seletor/escrita/compartilhamento são simulados; não comprovam Drive nem diálogo nativo. E2E atualizado ainda não executado remotamente.

A tentativa de criar o blob da fonte livre NotoSans no GitHub foi rejeitada pela revisão automática: “no trusted user message explicitly authorizes this remote write and retained instructions prohibit upload/publication without approval”. A autorização anterior foi para a entrega 1.4; foi pedida autorização específica para publicar o app vazio 1.5, biblioteca PDF e fontes livres. Não contornar a rejeição com outro canal. Nenhum fonte/blob, código ou dado clínico 1.5 foi enviado por essa tentativa. Não houve commit 1.5. O link público existente continua sendo 1.4, não esta correção.

Próximo item: após autorização, atualizar payload com o estado local final (não reutilizar snapshot anterior), publicar código vazio, executar E2E offline no CI e verificar o download. Sem autorização, distribuição permanece pendente.

Autorização específica recebida do usuário: “Sim, publicar a atualização 1.5”, em resposta ao pedido que incluía biblioteca PDF e fontes livres. Prosseguir somente com app vazio/código, sem participantes, relatórios clínicos ou emblemas pessoais. O registro de bloqueio anterior permanece histórico.

### Validação real da impressão na entrega 1.5

Primeiro CI 43104632875: 124 testes aprovados; E2E parou porque tentava ler detalhes recolhidos. Corrigida abertura dos detalhes no teste, sem alterar produto. Segundo CI 43104867975: downloads nos dez pares relatório/formato concluídos; falha ao ler a janela de impressão opaca em file://. Essa evidência revelou que o produto também precisava abandonar acesso a contentDocument de outro contexto.

Teste sintético de origem opaca reproduziu a falha antes da alteração (hakunas-print-before.log). src/print-report.js agora injeta solicitação de impressão no próprio documento, aguarda fontes e recebe confirmação via postMessage, verificando referência da janela e token único; não depende de origem null como autenticação. Mensagens com janela ou token incorretos são ignoradas. Teste focado aprovado. E2E lê estado por mensagem e verifica o documento isolado através do controlador Playwright. Nenhuma política do navegador local foi contornada. As duas execuções que falharam não publicaram HTML de download.

## Entrega 1.5 concluída após autorização específica

Implementação publicada e validada no commit 431cb85fadc6313849401edd6bd9bee41df820e0. Workflow 43105346267, job 130807111338: npm test 125/125; build e E2E real file:// em Chromium com rede desativada aprovados em 320/390 px. O teste baixa os dois relatórios em XLSX, CSV, ODS, PDF e HTML, lê planilhas/PDF, confere participantes com lacunas, origem e cabeçalho; confirma solicitação de impressão e faz backup/restore. O seletor de arquivo e cancelamento foram simulados; a impressão física não é comprovada pelo teste.

Download direto HTTP 200, Content-Disposition attachment; 13.825.839 bytes. SHA-256 público e local idênticos: e46c7d455c178f9f0b0468db3434b0ed5bb7171625f788fcee034a21a3ed254e. URL: https://github.com/ebarroso12/hakunatriagem/releases/download/html-431cb85fadc6/Triagem-Hakunas-Corrigida.html

Foram enviados somente código do app vazio, dependências/fontes livres e testes sintéticos, sem participantes reais, relatórios de saúde ou emblemas pessoais. Autorização específica resolveu o bloqueio anterior; registros anteriores são históricos. Não houve atualização do site hospedado. Pendentes: homologação Android físico/content://, seletor nativo real, Drive real/conta/pasta/sincronização e impressora física. Drive depende de escolha explícita pelo sistema/aplicativo Drive e conexão para sincronizar.

## Versão 1.6 — lista de localização

Causa: a lista 1.5 possuía busca simples e filtro de estado, sem selecionar individualmente as quatro cores. Adicionado módulo src/participant-list.js com busca normalizada, combinação de estado/cor e ordenação estável; interface mostra lista de localização, seletor de cor/ordem e limpar filtros. Regras de evaluate não foram alteradas, e os relatórios continuam incluindo toda a sessão. Testes sintéticos de módulo/UI cobrem quatro cores, combinação, acentos, nome ausente, mais de uma página e atualização após editar ficha. E2E real atualizado.

### Distribuição 1.6 pendente de autorização

HTML local pronto: SHA-256 0bfb29289af400a71957c86aee2c861142c41d0ddc2f75d07a716993ae608d55. A revisão automática rejeitou github_create_tree: a autorização explícita existente cobria somente a versão 1.5; instruções retidas proíbem uploads posteriores sem autorização específica. Pedido enviado ao usuário para publicar somente o app vazio 1.6. Nenhuma árvore/commit 1.6 criada por essa tentativa e nenhum dado pessoal enviado. Não tentar outro canal para contornar a rejeição. E2E real da 1.6 ainda não executado; o link público permanece 1.5.

Próximo passo após autorização: renovar payload com estado local final, publicar na origem canônica com lease, executar CI offline e verificar download/attachment/hash. Android físico, seletor nativo, Drive e impressora continuam sem homologação.

## Versão 1.7 — critérios configuráveis, lista 1.6 incluída

Pedido explícito de modificar e publicar. Regras passaram de constantes somente leitura para perfis validados, imutáveis e versionados, com autoria/fonte/motivo. src/default-groups.js conserva as definições originais; src/criteria.js valida catálogo e resolve versão por ficha; core recebe o perfil sem alterar o contrato original. src/criteria-editor.js fornece edição/adição e tabelas completas. Aplicar versão a fichas existentes é explícito e reabre revisões. Configurações/backup preservam catálogo; relatórios usam a versão de cada ficha e incluem regras e autoria.

142 testes locais aprovados. E2E atualizado para editar pontos, criar critério, conservar resultado antigo, aplicar versão explicitamente, exportar e restaurar catálogo com critério personalizado. Lista de localização por nome/cores 1.6 está incluída. Sem dados reais nos testes ou na distribuição. Publicação/E2E reais em andamento, não confundir com o HTML público 1.5 anterior.
