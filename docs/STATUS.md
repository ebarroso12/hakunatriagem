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
