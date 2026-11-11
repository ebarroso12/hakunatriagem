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
