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
- [x] Relatórios completos e faltantes em XLSX, CSV, ODS, PDF real e HTML.
- [x] Imprimir relatório em botão visível; ausências somente alertam por participante.
- [x] Seletor nativo de arquivo quando disponível; download/compartilhamento honesto no celular, sem upload clínico automático.
- [x] Testar formatos, escrita/cancelamento/erros, regressões e E2E offline; atualizar entrega autorizada.

- [x] Implementação 1.5 dos cinco formatos/destinos/alertas e impressão concluída localmente; 124 testes, build e diff aprovados.
- [x] Publicação 1.5 autorizada; E2E remoto aprovado no job 130807111338 e download/hash conferidos. Link 1.5 publicado; bloqueio anterior resolvido.

- [x] Entrega 1.5: 125 testes e E2E Chromium offline; release html-431cb85fadc6, hash em EVIDENCIAS.
- [ ] Próximo: homologação no aparelho/destino reais (Android/content://, seletor nativo, Drive e impressora), com dados sintéticos; revisão de avisos de dependências permanece separada.

## Item 06 — lista de localização após triagem

- [x] Reproduzir ausência de filtros de cor com testes sintéticos antes de implementar.
- [x] Busca por nome sem acentos, quatro cores, combinação com estado, ordem por nome/cor e limpar filtros.
- [x] Abrir ficha e recomputar lista após alteração da triagem, preservando regras clínicas.
- [ ] Concluir suíte/build, E2E real offline e entrega do HTML atualizado.

- [x] Versão 1.6: 130 testes, build e diff aprovados localmente.
- [ ] Distribuição 1.6/E2E real bloqueados pela revisão automática até autorização específica do usuário. Não confundir com a versão 1.5 já publicada.

## Item 07 — critérios editáveis e adicionais (publicação solicitada)

- [x] Critérios individuais: editar descrição/grupo/pontos/cor/exclusão/revisão/ativo; adicionar regra explícita, idade, IMC ou associação.
- [x] Faixas e preparo configuráveis; listas completas visíveis, sem itens vazios.
- [x] Base original imutável, versões com fonte/responsável/motivo, por ficha e em backup.
- [x] Nova versão não recalcula fichas antigas silenciosamente; aplicar explicitamente reabre revisões.
- [x] Relatórios seguem versões individuais, incluem catálogo, autoria e condições.
- [x] 142 testes locais aprovados; regressões de menoridade, parser e exportação preservadas.
- [x] E2E real offline e entrega da versão 1.7 com a lista 1.6 incluída. Publicação expressamente pedida pelo usuário em “MODIFIQUE E PUBLIQUE ATUALIZE TUDO”.

- [x] Entrega conjunta 1.7/1.6 publicada e conferida: 142 testes e E2E offline aprovados; download/hash em EVIDENCIAS. Bloqueios de publicação anteriores resolvidos.
- [x] Site privado atualizado para 1.7, deployment appgdep_6af519c4dd28819180e2e7318c7bcd00 succeeded; pendências de aparelhos/destinos reais continuam separadas.

- [x] Entrega conjunta 1.7 concluída também no site, preservando acesso privado e sem dados pessoais.

## Item 08 — auditoria sistemática da última versão

- [ ] Inventariar funções, ler fluxos e executar regressões, distinguindo inspeção/teste/simulação/aparelho real.
- [ ] Reproduzir e corrigir validação de preparo e calculadoras, impressão/exportação, imagens/pacotes e operações assíncronas.
- [ ] Verificar legibilidade/visibilidade dos botões no celular e conteúdo dos documentos de impressão e cinco formatos.
- [ ] Verificar versão dos critérios e identidade do TOP nos arquivos; manter limitações explícitas.
- [ ] Entregar correções verificadas e relatório de auditoria com evidências, sem prometer ausência universal de erros.

- [x] Auditoria 1.8 local: 189 testes; inventário e correções em docs/AUDITORIA-1.8.md.
- [ ] Executar E2E 1.8, verificar download/hash, atualizar site e registrar resultado, sem dados pessoais.

- [x] Verificação local 1.8: 189 testes e build; auditoria de dependências sem alertas conhecidos; inventário em AUDITORIA-1.8.md.
- [ ] Publicação e E2E remotos 1.8 dependem de autorização específica após rejeição automática. Não apresentar o link 1.7 como correção 1.8.

## Verificação remota 1.8 concluída

Autorização específica recebida e publicação realizada. GitHub: commit 7dc9804fefff2f1578251e440d027c142a202769; execução 43325453926, job 131556654472, concluídos com sucesso. 189/189 testes; E2E Chromium file:// e hospedado em loopback aprovados, incluindo prévia, leitura do PDF e emblemas com fundos desligados. Uma primeira execução falhou por seletor de teste ambíguo; o seletor foi delimitado antes da execução aprovada.

Download v1.8.0 confirmado HTTP 200 e attachment, 13.897.081 bytes. SHA-256 remoto e local: 7dab87af95ddc01b4e4cb525158d8e4ae55ab74eae66df84380e65d913f0756a. URL: https://github.com/ebarroso12/hakunatriagem/releases/download/html-7dc9804fefff/Triagem-Hakunas-v1.8.0.html

Os registros anteriores de bloqueio/pendência são históricos e foram resolvidos quanto a GitHub, CI e download. Publicação privada Sites concluída; evidência abaixo. Permanecem sem homologação Android físico/content://, Drive, seletor nativo de pasta e impressora física. Próximo item: homologação nesses destinos com dados sintéticos.

## Fechamento da publicação privada 1.8

Sites retornou succeeded para deployment appgdep_6af646f3927481918a6acf576306b41d, versão appgprj_6af3885f25548191af99e68bff13d230~appgver_ffa2fdcd260c8191ae4695ac4d4b6b60. Fonte exata: eefb68f70f932e26e21813630c020f1d29a37ce3, enviada sem força; archive audit-v18.tar.gz contém manifest e dist do build. Audiência privada preservada. URL: https://triagem-hakunas.ebarroso12.chatgpt.site

Publicação, CI e download 1.8 concluídos. O sucesso de implantação não acrescenta homologação do gateway em aparelho, Android, Drive ou impressora. Nenhum dado de participante foi enviado. Próximo item aberto: homologação física com dados sintéticos.

## Salvamento 1.8.1 — item atual

- [x] Configuração opcional de destino Google Drive/OneDrive pelo aparelho, conforme resposta Windows/iOS; cinco formatos nos dois relatórios.
- [x] Cancelamento/indisponibilidade sem download oculto; sem autenticação/upload automático ou confirmação falsa.
- [x] Encerrar 206 testes/build e Chromium, conferir download e atualizar site privado mantendo audiência; diagnóstico WebKit falhou e não foi contado como homologação.
- [ ] Homologação com contas/aparelhos reais Windows e iOS; sem dados reais nos testes de desenvolvimento.

- [x] Reproduzir corpo vazio sem JavaScript; acrescentar orientação estática e ajuda de abertura, sem alegar correção de Quick Look.
- [x] Preparar ícones PNG/metadados Apple e regressão Chromium/WebKit mobile; resultado CI ainda pendente.
- [ ] Confirmar abertura/instalação e modo avião em iPhone/Android físicos; screenshot não comprova execução de código nem identifica causa Android.

- [ ] Offline iPhone: WebKit carrega e confere cache, mas reabertura sem rede falhou (job 131582530000). Validar aparelho/gateway e distribuição; não encerrar como concluído.

## Item — botão Spotify 1.8.2

- [x] Link com ícone no cabeçalho em todas as páginas; playlist solicitada e nova aba sem referência.
- [x] Teste sintético falhou antes da implementação e passou depois; ficha preservada ao navegar entre telas.
- [x] 207 testes/build/E2E Chromium aprovados; site privado e download atualizados e conferidos. Diagnóstico WebKit continua não aprovado.
- [ ] Reprodução no aplicativo Spotify/aparelhos reais não homologada; offline iPhone permanece pendente do item anterior.

## Item — botão Ver tênis 1.8.3

- [x] Botão com ícone de calçado e link exato informado, ao lado do Spotify no cabeçalho das cinco telas.
- [x] Teste UI observado falhando antes e passando depois; nova aba, sem referência de origem e ficha preservada.
- [x] 208 testes/build/E2E Chromium aprovados; site privado atualizado e download conferido. Diagnóstico WebKit continua sem aprovação.
- [ ] Disponibilidade do produto, redirecionamento/app Shopee e compra não homologados; offline iPhone permanece pendente.
