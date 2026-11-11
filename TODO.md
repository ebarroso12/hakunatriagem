# Fila — Triagem Hakunas

Um item de implementação por execução. Não instalar skills, commitar, enviar, publicar ou fazer upload automaticamente.

## Item 01 — idade 16–17 isoladamente vermelha

- [x] Examinar Git, contratos e testes existentes; árvore de trabalho inicialmente limpa.
- [x] Identificar causa: vermelho dependia de idade >60 ou de fator marcado; teste de menor usava hipertensão.
- [x] Reproduzir falha com dados sintéticos e idade isolada.
- [x] Corrigir somente o critério etário e a explicação pública.
- [x] Executar regressões, teste completo, build e diff --check.
- [x] E2E real concluído em Chromium no runner GitHub Ubuntu 24.04, file:// offline e 320/390 px. A tentativa local continuou bloqueada; sem homologação física.
- [x] Registrar resultado e limitações sem declarar homologação Android/impressora.

## Próximos itens — ainda não executar

02. Revisão dirigida do importador: ambiguidade de blocos/colunas e rejeição atômica, com reprodução sintética antes de alterar parser.
03. Resolver discrepância de escopo sobre OCR: o código 1.1 já o contém, mas o prompt fornecido descreve versão sem OCR. Não adicionar/expandir/remover OCR silenciosamente.
04. Completar ensaio em navegador real, Android físico/content:// e impressão conforme disponibilidade e autorização; não confundir com DOM simulado.
05. Conferir separadamente o estado remoto de auto-publicação antes de qualquer checkpoint/push futuro.

## Item 02 — detecção automática local de identificadores e prévia móvel (pedido da captura)

- [x] Reproduzir avisos falsos com fixtures sintéticas: 9 casos, 8 falhas antes.
- [x] CPF/telefone numéricos íntegros sem aviso genérico; máscara/valor armazenado preservados.
- [x] Casos realmente suspeitos mantidos com aviso, sem inventar dados.
- [x] Uma estrutura: prévia automática; múltiplas estruturas: seleção preservada.
- [x] Avisos agrupados/recolhidos e confirmação adaptada à tela estreita.
- [x] Suíte local: 75 testes aprovados. Confirmação humana e revisão clínica preservadas.
- [x] E2E real offline em Chromium no runner GitHub aprovado; job 130192616968, somente fixtures sintéticas.
- [x] HTML 1.2 entregue por GitHub Releases; download público 200, attachment e SHA-256 iguais ao build. Site atualizado com status succeeded.

## Item 03 — campos ausentes e dois relatórios integrais (pedido de 10/11/2026)

- [x] Reproduzir falhas de nome/idade/medidas vazios; 9 casos iniciais, 8 falhas antes.
- [x] Continuar com campos ausentes, mantendo registros sem nome e ignorando somente linhas sem dados.
- [x] Preservar origem de campos vazios; não confundir vazio com negativo/zero/normal.
- [x] Não classificar idade desconhecida como menor nem concluir faixa com essenciais ausentes.
- [x] Gerar relatório integral HTML e Excel separado de faltantes/revisões, sem truncar pela tela.
- [x] Testar snapshot, XSS/fórmulas, origem e preservação de dados: 100 testes locais aprovados.
- [ ] E2E real offline e download dos dois relatórios no Chromium de CI.
- [ ] Entregar HTML 1.3 e verificar download/checksum, sem incluir dados pessoais no pacote.

## Item 04 — cabeçalho por TOP (11/11/2026)

- [x] Configurar número do TOP, local, base e dois emblemas locais, com prévia.
- [x] Base à esquerda, Legendários à direita; TOP central, local e nome da base abaixo.
- [x] Incorporar fonte Anton e licença OFL para uso offline, sem prometer fonte idêntica à referência.
- [x] Incluir cabeçalho na tela, impressão, relatório completo e backup; identificar arquivos pelo TOP.
- [x] Proteger troca de TOP e restauração inválida; iniciar sessão nova somente por ação explícita.
- [x] 112 testes locais aprovados; build e diff --check aprovados.
- [ ] E2E real da versão 1.4: navegação local bloqueada por política; execução remota depende de autorização.
- [ ] Distribuir HTML 1.4 sem dados pessoais, após autorização de upload. Nenhum commit desta versão.

- [x] Distribuição 1.4 autorizada, E2E remoto aprovado e download 200/attachment/hash conferidos (commit 0112c850ea4e). Itens de distribuição/E2E acima estão resolvidos por esta evidência posterior.
- [ ] Revisar os avisos de dependências reportados por npm ci; homologar Android físico/content:// e impressão real.

## Item 05 — exportar nos cinco formatos e escolher destino

- [x] Reproduzir ausência de exportação e seletor com testes sintéticos antes da implementação.
- [ ] Relatórios completos e faltantes em XLSX, CSV, ODS, PDF real e HTML.
- [ ] Imprimir relatório em botão visível; ausências somente alertam por participante.
- [ ] Seletor nativo de arquivo quando disponível; download/compartilhamento honesto no celular, sem upload clínico automático.
- [ ] Testar formatos, escrita/cancelamento/erros, regressões e E2E offline; atualizar entrega autorizada.

- [x] Implementação 1.5 dos cinco formatos/destinos/alertas e impressão concluída localmente; 124 testes, build e diff aprovados.
- [ ] Publicação 1.5 e E2E remoto aguardam autorização específica após rejeição automática do upload da fonte livre. Link 1.4 não contém esta correção.
