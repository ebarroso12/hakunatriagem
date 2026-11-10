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
