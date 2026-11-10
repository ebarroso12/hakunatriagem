# Fila — Triagem Hakunas

Um item de implementação por execução. Não instalar skills, commitar, enviar, publicar ou fazer upload automaticamente.

## Item 01 — idade 16–17 isoladamente vermelha

- [x] Examinar Git, contratos e testes existentes; árvore de trabalho inicialmente limpa.
- [x] Identificar causa: vermelho dependia de idade >60 ou de fator marcado; teste de menor usava hipertensão.
- [x] Reproduzir falha com dados sintéticos e idade isolada.
- [x] Corrigir somente o critério etário e a explicação pública.
- [x] Executar regressões, teste completo, build e diff --check.
- [ ] Concluir E2E do HTM real por file:// em viewport móvel. Tentativa executada: bloqueada por ERR_BLOCKED_BY_ADMINISTRATOR; sem homologação.
- [x] Registrar resultado e limitações sem declarar homologação Android/impressora.

## Próximos itens — ainda não executar

02. Revisão dirigida do importador: ambiguidade de blocos/colunas e rejeição atômica, com reprodução sintética antes de alterar parser.
03. Resolver discrepância de escopo sobre OCR: o código 1.1 já o contém, mas o prompt fornecido descreve versão sem OCR. Não adicionar/expandir/remover OCR silenciosamente.
04. Completar ensaio em navegador real, Android físico/content:// e impressão conforme disponibilidade e autorização; não confundir com DOM simulado.
05. Conferir separadamente o estado remoto de auto-publicação antes de qualquer checkpoint/push futuro.
