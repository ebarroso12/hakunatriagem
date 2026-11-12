# Evidências — item 01, 10/11/2026

## Teste antes da correção

Comando:

```sh
node --test --test-name-pattern='Menor isolado|Menor com fator amarelo|Menor e doença vermelha|Menor com critério preto|Menor e implante|Regra etária' tests/core.test.mjs
```

Resultado: 11 casos, 5 aprovados, 6 falhas; código de saída 1. Para cada idade 16/17, os casos isolado e implante retornavam green e o caso com medicamento retornava yellow. Os casos com hipertensão já retornavam red, explicando por que a regressão antiga não detectava a falta da regra etária.

## Testes após a correção

```sh
node --test tests/core.test.mjs
```

40 testes aprovados, zero falhas; código de saída 0.

```sh
pnpm --config.verify-deps-before-run=false --config.enable-pre-post-scripts=true test
```

64 testes aprovados, zero falhas; código de saída 0. O pretest gerou o HTML antes da suíte. Inclui verificação DOM simulada de vermelho pela idade isolada, lógica clínica operacional, documentos, OCR local, ZIP, backup/restore e proteção de saídas. Não representa auditoria externa de segurança ou homologação clínica.

A invocação inicial `pnpm test` não chegou a executar a suíte: o pnpm tentou verificar/reinstalar dependências e falhou ao criar `/home/agent/.local/share/pnpm` (ENOENT). As opções acima desabilitaram essa instalação automática e habilitaram os scripts pre/post. Não foram instaladas skills ou novas dependências, nem modificados package.json/lockfile.

## Build

```sh
pnpm --config.verify-deps-before-run=false build
```

Concluído, saída 0. Arquivos locais gerados em `dist/` (ignorados pelo Git).

SHA-256 de `dist/triagem-hakunas.htm` e `dist/triagem-hakunas-offline.html`:

```text
caa6cc5197139c4e860f3cdaece7b6368a2bf0ccf468345bc97888e89cf850ba
```

O hash identifica o build local. Não é SHA de commit nem recibo de upload/publicação.

## E2E em navegador real

```sh
node tests/browser-file.mjs
```

Tentativa real em Chromium, `file://`, viewport 390×844, contexto offline. Código de saída 1 na navegação inicial:

```text
page.goto: net::ERR_BLOCKED_BY_ADMINISTRATOR
```

O runner fecha o navegador mesmo em falha e não usa servidor ou fallback HTTP. Os passos posteriores não foram executados: cadastro, menor vermelho, mapeamento, rejeição atômica, impressão/PDF headless, backup/restore e viewport 320. Não marcar esses passos como aprovados em navegador. O teste DOM simulado da suíte completa passou e permanece registrado separadamente.

Sem ensaio Android físico, content://, impressora/diálogo nativo, Drive/OneDrive ou upload remoto. Não houve contorno de política do ambiente nem tentativa de acesso privilegiado.

## Git e revisão de escopo

`git diff --check`: aprovado, saída 0. Inspeção do diff confirmou mudança limitada ao critério etário, explicação pública, regressões e registros de execução. Regras de score/exclusão, parser, criptografia e OCR não foram alterados.

Arquivos alterados: README.md, src/core.js, src/app.js, tests/core.test.mjs, tests/offline-ui.test.mjs.

Arquivos criados: AGENTS.md, TODO.md, docs/STATUS.md, docs/COMO-USAR.md, docs/import.md, docs/EVIDENCIAS.md, tests/browser-file.mjs.

Não houve commit/checkpoint, push, fetch, publicação, upload ou mudança de branch. HEAD permanece e93489bad80b6ad2faa599d9f455d8e2508a10ab; não identifica as modificações ainda não commitadas. Conteúdo hospedado e GitHub não foram atualizados nesta execução.

## Atualização 1.2 — conferência automática offline

Reprodução: `node --test tests/identifiers.test.mjs`, 9 casos, 1 aprovação e 8 falhas antes da correção. Após: 9/9 aprovados. Fixture XLSX sintética verifica tipo numérico, valor bruto, máscara e origem; zero inicial preservado quando explícito; zero ausente não inventado; notação científica recuperada do inteiro armazenado.

Suíte completa com `pnpm --config.verify-deps-before-run=false --config.enable-pre-post-scripts=true test`: 75/75 aprovados, sem falhas. Inclui DOM simulado com rede proibida para prévia automática, avisos recolhidos, dois identificadores conferidos, confirmação humana obrigatória e campos importados corretos. `git diff --check` aprovado. Não foram utilizadas capturas, nomes ou documentos reais como fixtures.

Runner E2E `tests/browser-file.mjs` ampliado com XLSX sintético, verificação automática e geometria de modal/tabela em 320px; workflow de entrega prepara Chromium e executa o HTM real por file:// com contexto offline antes de publicar o anexo. O resultado desse runner precisa ser lido antes de afirmar aprovação em navegador real. Android físico, content:// e impressora continuam fora da evidência.

Não houve alteração de score, regras etárias, criptografia ou escopo de OCR. A finalidade é a conferência de estrutura dos identificadores e a experiência de importação local.

### Resultado confirmado da entrega 1.2

A primeira preparação de navegador falhou por incompatibilidade de Playwright 1.56.1 com ubuntu-latest (Ubuntu 26.04). Runner fixado em ubuntu-24.04, sem alterar o aplicativo.

GitHub run 42920141632, job 130192616968: todos os passos aprovados, incluindo 75 testes e E2E do HTML real por file://, contexto com rede desativada, viewport 320/390. O log confirma cadastro, menor vermelho, CPF/telefone e prévia automática móvel, mapeamento, rejeição atômica, chamada de impressão/PDF headless e backup/restore. Impressora física, Android e content:// não foram testados.

Download verificado sem credenciais: HTTP 200, application/octet-stream e Content-Disposition attachment; filename=Triagem-Hakunas-Corrigida.html; 11.833.066 bytes. SHA-256: 91fbf5ca9908d670f7f5ddc8c90fa4f4291b0da06518b9dad516e3a953f77a80, idêntico ao build local.

URL: https://github.com/ebarroso12/hakunatriagem/releases/download/html-8a01bb0d4c54/Triagem-Hakunas-Corrigida.html

Commit público: 8a01bb0d4c54f134633ab308655d52712a59353a. Commit de origem do Site: 0f4ca0e6566ffa0b1de39f1a63f555f99b909c99. Deployment appgdep_6af3a354cac08191b3d18878f3e2424d, status succeeded. Nenhum dado de participante foi enviado; somente código, build vazio e fixtures sintéticas.

## Atualização 1.3 — faltantes e relatórios

Reprodução inicial em tests/missing-inputs.test.mjs: 9 casos, 8 falhas e 1 aprovação antes da alteração. Detectou descarte de linha sem nome, rejeição de nome vazio, descarte de registro com só um campo, idade desconhecida declarada menor e origem de vazio perdida.

Suíte local atual: 100/100 aprovados por pnpm --config.verify-deps-before-run=false --config.enable-pre-post-scripts=true test. Inclui preservação de dados, marcadores explícitos, dois arquivos do mesmo snapshot, todos os registros além da página 50, máscara contra XSS/fórmulas, distinção entre lacunas e conferências e nenhuma mutação de dados para completar ausência. Build gerado no pretest; git diff --check aprovado.

E2E real estendido para importar três registros incompletos, manter sem nome, exportar duas saídas de seis registros enquanto a lista está filtrada para um, abrir o relatório HTML offline e restaurar backup com incompletos. O resultado do runner deve ser confirmado antes de declarar esse E2E aprovado. Fixtures e logs não contêm dados reais de participantes.

Não houve instalação de nova biblioteca, uso de IA remota ou ampliação de OCR. Relatórios de dados reais são gerados no dispositivo e não fazem parte do build/release.

### Fechamento local da versão 1.3

Build explícito concluído: pnpm --config.verify-deps-before-run=false build. SHA-256 do HTML: 4c9c51687dacf6f66dcb4a3043aa4d0f4d50e320e75305515744aec4b54f919d.

Tentativa E2E local atual com tests/browser-file.mjs: bloqueada na navegação por net::ERR_BLOCKED_BY_ADMINISTRATOR. Os passos de relatórios não foram exercitados em navegador real desta versão. O teste DOM e testes de conteúdo dos dois formatos passaram na suíte de 100 casos.

Verificação adicional materializou dois arquivos exclusivamente sintéticos em work/: 3 registros no modelo e 3 artigos no HTML, 78 campos ausentes no conjunto de teste e as quatro abas esperadas no XLSX. Não foram apresentados como relatórios de participantes reais.

Checkpoint local da implementação: 4281f665878f44c1b6d6ec4bf3110c40f76f5f90. A tentativa de criar árvore remota GitHub foi rejeitada pela revisão automática, por faltar autorização explícita para upload/publicação conforme instrução retida. Nenhum código 1.3 foi enviado por essa ação; nenhum dado pessoal foi enviado. Foi solicitada autorização específica para distribuir somente código/HTML vazio e testar no runner de CI. Aguardar resposta antes de retomar qualquer operação remota.

### Versão 1.4 — cabeçalho por TOP, 11/11/2026

Teste UI de cabeçalho criado antes da implementação falhou pela ausência de data-event-header (log local hakunas-header-before.log). Implementação em src/event-header.js, src/app.js, src/reports.js; ativos Anton/OFL em src/assets; geração incorporada em scripts/prepare-runtimes.mjs; versão e build atualizados. Casos sintéticos em tests/event-header.test.mjs e tests/event-header-ui.test.mjs; runner real atualizado em tests/browser-file.mjs.

pnpm --config.verify-deps-before-run=false --config.enable-pre-post-scripts=true test: 112 testes, 112 aprovados, 0 falhas (hakunas-header-test.log). Inclui perfis, escape HTML, rejeição de URL/SVG/PNG inválido, backup com cabeçalho, restauração atômica, troca de TOP, origem e relatórios sem duplicação de imagens por participante.

pnpm --config.verify-deps-before-run=false build: aprovado. node --check tests/browser-file.mjs e git diff --check: aprovados. SHA-256 do HTML: f755d8833df14f28d7ca391054b898276bd58014e8211a7f4332316a424fc891.

node tests/browser-file.mjs: saída 1, navegação inicial file:// bloqueada por ERR_BLOCKED_BY_ADMINISTRATOR (hakunas-header-browser.log). Nenhuma etapa de UI foi validada nesse ensaio; JSDOM não equivale a navegador real. Sem homologação Android/content:///impressora. Nenhum commit, upload, publicação ou CI desta versão. Revisão automática anterior continua bloqueando distribuição sem autorização explícita.

## Entrega autorizada da versão 1.4

Usuário respondeu “Sim” à autorização de disponibilizar HTML vazio no GitHub. Commit remoto 0112c850ea4ed9407ba3f1532e1035ba880f2cc7 em main, atualização fast-forward com lease; nenhum dado pessoal ou emblema fornecido pelo usuário enviado. Workflow 42940087758, job 130259540027: npm test 112/112 e E2E Chromium real file:// offline aprovado, 320/390 px, incluindo imagens/fontes, relatórios, backup/restore e PDF headless. Não comprova Android físico/content:///impressora.

Download verificado: HTTP 200, Content-Disposition attachment; 12223879 bytes. SHA-256 5423ed87884cb966c2d7ae9e5ae74c9040593547e71b9db895c19c77c0d99d40. Build local reproduz esse hash após normalizar CRLF da licença OFL para LF, como o upload textual fez. URL: https://github.com/ebarroso12/hakunatriagem/releases/download/html-0112c850ea4e/Triagem-Hakunas-Corrigida.html

O bloqueio de distribuição registrado anteriormente foi resolvido pela autorização explícita; os registros antigos são históricos. Não houve atualização do site hospedado. Log npm ci apontou 3 vulnerabilidades (1 moderada, 2 altas); revisão de dependências permanece item separado, sem correção automática destrutiva nesta entrega.

### Versão 1.5 — cinco formatos e destino

Reprodução antes: tests/report-exports.test.mjs e tests/file-save.test.mjs falharam por ausência dos módulos, log hakunas-export-before.log. Oito testes focados passaram após implementar formatos, MIME/extensões, seletor/escrita/fechamento, cancelamento sem gerar arquivo, erro sem sucesso falso e compartilhamento somente por ação. Teste adicional usa PDF.js para ler PDF real multipágina: acentos, nome ausente, origem longa com marcador final e cabeçalho TOP em todas as páginas preservados.

Testes UI offline verificam cinco opções, botão de impressão, alerta por participante e os dois downloads mesmo com lacunas. E2E atualizado para baixar ambos os relatórios nos cinco formatos, ler planilhas, identificar PDF real e testar impressão do documento completo. Seletor nativo e cancelamento em E2E são simulados e serão descritos assim; não equivalem a homologação do diálogo do sistema nem Drive.

Execução local de file:// continua bloqueada na navegação por ERR_BLOCKED_BY_ADMINISTRATOR. Sem contorno de política. Drive real, Android físico/content://, diálogo nativo de salvar e impressora não testados. Documentação deixa clara a diferença entre gravação pelo seletor, solicitação de download, compartilhamento e confirmação de upload.

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

### Lista de localização 1.6

Reprodução sintética antes da implementação em hakunas-location-before.log: faltavam o módulo de localização e o seletor de cor. Após implementação: 6 testes focados aprovados, incluindo regressão de importação. A primeira suíte revelou teste antigo dependente de posição de linha; corrigido para abrir pelo nome explícito da fixture após a nova ordenação alfabética.

Suíte final: 130 testes, 130 aprovados, 0 falhas (hakunas-location-full.log). pnpm --config.verify-deps-before-run=false build e git diff --check aprovados. Módulo/UI testam cada cor, combinações com nome/estado, acentos, ID sem nome, 120 registros antes de paginação e recálculo após editar a ficha. E2E atualizado para conferir as quatro cores, busca sem acentos e ordenação no HTM offline, mantendo a regressão de relatórios/backup. Nenhuma regra clínica foi alterada. Evidência real do navegador desta versão ainda depende da entrega CI.

### Distribuição 1.6 pendente de autorização

HTML local pronto: SHA-256 0bfb29289af400a71957c86aee2c861142c41d0ddc2f75d07a716993ae608d55. A revisão automática rejeitou github_create_tree: a autorização explícita existente cobria somente a versão 1.5; instruções retidas proíbem uploads posteriores sem autorização específica. Pedido enviado ao usuário para publicar somente o app vazio 1.6. Nenhuma árvore/commit 1.6 criada por essa tentativa e nenhum dado pessoal enviado. Não tentar outro canal para contornar a rejeição. E2E real da 1.6 ainda não executado; o link público permanece 1.5.

Próximo passo após autorização: renovar payload com estado local final, publicar na origem canônica com lease, executar CI offline e verificar download/attachment/hash. Android físico, seletor nativo, Drive e impressora continuam sem homologação.

### Critérios 1.7

Reprodução antes: testes de critérios falharam por ausência do módulo; UI falhou pela ausência do editor. Logs hakunas-criteria-before.log e hakunas-criteria-ui-before.log. Após implementação: 142/142 testes locais aprovados, 0 falhas (hakunas-criteria-full.log). Cobertura: regra nova, pontos/cor/exclusão, desativação, limites/faixas/preparo, histórico por ficha, catálogo inválido/versão inexistente/base adulterada, autoria obrigatória, aplicação explícita com revisão reaberta, backup personalizado, relatórios mistos por versão e texto HTML malicioso tratado como literal.

A regra de menoridade não pode virar preto apenas pela idade; segue sem IMC/faixa adulta. Implante pode mudar somente por edição explícita registrada, conservando a versão original. As 40 regressões do núcleo original continuam passando.

Arquivos novos: default-groups.js, criteria.js, criteria-editor.js e testes criteria*. Módulos afetados: core, app, event-header, reports, report-exports, estilos, build/versão e browser-file. Nenhuma ampliação de OCR nem inferência de texto clínico. O E2E inclui versionamento, aplicação, relatórios e backup/restore, além do fluxo 1.6/1.5. Android/content://, Drive, seletor nativo e impressão física permanecem sem homologação.

## Entrega 1.7 verificada — lista 1.6 incluída

Código público no commit c7556341f9ed49775d627cc38e35f496fbfb7d39. Workflow 43136040535, job 130911507786: 142 testes aprovados, build e E2E real file:// com rede desativada em Chromium aprovados. Inclui editar/adicionar critérios, preservar resultado antigo, aplicar com confirmação, exportar catálogo, backup/restore personalizado, filtros das quatro cores, dez downloads de relatórios e impressão por documento isolado. Dados somente sintéticos.

Download direto verificado HTTP 200 e Content-Disposition attachment; 13.850.846 bytes. SHA-256 público/local idênticos: 01a652b7215292a8c38624030294766d7173d4a74456d83b7981f8f53821aa66. URL: https://github.com/ebarroso12/hakunatriagem/releases/download/html-c7556341f9ed/Triagem-Hakunas-Corrigida.html

Pedido de publicação 1.7 explícito no turno e autorização 1.6 também recebida. Bloqueios anteriores de distribuição 1.6 resolvidos por esta entrega conjunta; registros anteriores são históricos. Sem dados clínicos reais publicados. Android físico/content://, Drive real, seletor nativo real e impressora continuam sem homologação; os testes de seletor usam simulação e impressão não comprova papel físico. Atualização do site privado selecionado em preparação, mantendo acesso existente. O helper Sites não está presente no executor; sincronização Git usará credencial efêmera exclusivamente por stdin/ambiente do subprocesso, sem token em arquivo/argumentos/logs, e archive de dist + manifest do commit enviado.

### Publicação do site 1.7 concluída

Sites atualizado com acesso owner-private preservado. Fonte exata enviada em fast-forward ao repositório Sites: 327d8476ed841d6830e8945c5ba0ab323e59cee9, descendente do antigo 0f4ca0e. Manifest .openai/hosting.json e dist foram empacotados em criteria-v17.tar.gz sem dados pessoais. Deploy appgdep_6af519c4dd28819180e2e7318c7bcd00 retornou succeeded; versão appgprj_6af3885f25548191af99e68bff13d230~appgver_0b4a03f0e17c819185447591fd5a61bc. URL literal: https://triagem-hakunas.ebarroso12.chatgpt.site

A publicação foi efetuada pela skill Sites, com credencial transitória apenas em stdin/memória do subprocesso. O helper de origem padrão não estava instalado; Git ordinário sem força foi usado e a proveniência do archive foi conferida. O resultado nativo succeeded comprova implantação, não testes adicionais de Android ou Drive. Download público GitHub c7556341f9ed continua a entrega offline conferida. Sem alteração de audiência, banco clínico ou envio de registros.

Estado final: critérios editáveis/adicionais e faixas, controle de versão por ficha, aplicação explícita, relatórios auditáveis e lista por nome/cores concluídos. 142 testes e E2E Chromium offline aprovados. Próximos itens: revisão de dependências e homologação em aparelho/destinos reais com dados sintéticos.
