# Uso local e manutenção

O build gera `dist/triagem-hakunas.htm` e `dist/triagem-hakunas-offline.html`, arquivos autocontidos. Abra o arquivo salvo em navegador compatível. As alterações desta manutenção só estão no checkout e no build local; o download hospedado não foi atualizado.

1. Cadastre manualmente ou selecione um arquivo de entrada.
2. Confira estruturas, campos, posições, unidades e avisos. Se houver dúvida, use mapeamento manual. Confirmar inclusão mantém fichas na sessão; não as salva em disco automaticamente.
3. Revise cada seção e os documentos. Idades de 16–17 anos recebem vermelho pela regra operacional do responsável, sem IMC/faixa adulta final; preto exige outro critério preto explícito. Implante ambíguo continua pendente.
4. `Salvar avaliação` conserva a ficha na aba. Fechar/atualizar pode apagar os participantes.
5. `Salvar backup` gera `.LGND` protegido. Guarde arquivo e senha separadamente; a senha não tem recuperação. A restauração só substitui a sessão após validação e confirmação.
6. Impressão/PDF depende do navegador; CSV é legível e não substitui backup. Resultados são provisórios e não autorizam esforço físico.

Para manutenção com as dependências existentes:

```sh
node --test tests/core.test.mjs
pnpm --config.verify-deps-before-run=false --config.enable-pre-post-scripts=true test
pnpm --config.verify-deps-before-run=false build
git diff --check
node tests/browser-file.mjs
```

As opções do pnpm evitam tentativa automática de reinstalar dependências preparadas por npm e habilitam o pretest de build. Não houve migração de gerenciador nem alteração de lockfile nesta manutenção. A invocação simples de `pnpm test` falhou no ambiente por tentativa de criar armazenamento em `/home/agent/.local/share/pnpm`.

O E2E file:// usa apenas dados fictícios e não abre servidor. Se o navegador bloquear a navegação por política, registre o bloqueio; não contorne a política nem declare aprovação. O runner observa a chamada de impressão e gera PDF headless quando consegue iniciar o fluxo; isso não valida impressora ou diálogo nativo. Não confirma Android/content://.

## Relatórios completos e dados faltantes — 1.3

Em Participantes, clique “Gerar relatórios”. Confirme que entende que os arquivos são legíveis. Baixe o HTML completo e o Excel de faltantes usando os dois botões; não há download múltiplo automático. As saídas são geradas localmente do mesmo snapshot da sessão inteira, sem enviar dados ao servidor.

É permitido salvar/importar dados incompletos, incluindo nome vazio. O relatório identifica o registro por ID e origem; não cria nome, telefone, CPF, medida ou diagnóstico. Campos essenciais ainda ausentes mantêm avaliação parcial. Guarde o backup antes de trocar de versão. Backups novos com nome vazio exigem versão compatível; esta versão também lê backups anteriores válidos.

## Cabeçalho por TOP — 1.4

Em Configuração, informe número do TOP, local e nome da base. Escolha o emblema da base (esquerda) e o logo Legendários (direita). São aceitos PNG, JPEG e WebP de até 5 MiB; a imagem é normalizada localmente em PNG, sem upload. Ajuste o fundo de cada emblema para claro ou escuro e confira a prévia antes de salvar. Sem preenchimento, o app mostra a ausência; não assume TOP 1782 ou Três Colinas.

A fonte Anton está incorporada com licença SIL OFL 1.1 e funciona sem buscar fontes na internet. Ela se aproxima do estilo condensado da referência, sem reproduzir exatamente sua textura. O cabeçalho acompanha tela, impressão, relatório completo e backup. O Excel de faltantes inclui a identificação do TOP no resumo.

Para outro evento, faça backup e use “Novo TOP”; a sessão só é limpa após confirmação explícita. A base e os emblemas são preservados; número e local precisam ser informados novamente. Mudar o número com participantes presentes exige confirmar a correção da identidade da sessão. Backups antigos sem cabeçalho são restaurados com TOP não informado.

## Salvar e imprimir — versão 1.5

Em Participantes, use “Salvar relatórios”. Escolha XLSX, CSV, ODS, PDF ou HTML e o destino; os botões de relatório completo e dados faltantes usam o formato escolhido. PDF é gerado diretamente no dispositivo; não é um HTML renomeado. O botão visível “Imprimir relatório” abre as opções de impressão, sem imprimir a página do aplicativo. O cabeçalho de TOP/base/emblemas aparece no PDF e HTML e no documento de impressão. Planilhas e CSV contêm TOP, local e base como dados; não têm composição gráfica de emblemas.

Campos vazios aparecem como não informados e geram um alerta com participante e lista de campos. Não impedem salvar ou imprimir. Avaliação clínica parcial permanece parcial, sem completar dados por suposição. Erros de valores preenchidos continuam sujeitos à validação existente. O arquivo de faltantes é independente do relatório completo e também pode usar qualquer um dos cinco formatos.

“Escolher pasta e nome” usa showSaveFilePicker quando disponível. Se o navegador não oferecer esse recurso, o app solicita download conforme as configurações do navegador e avisa que não controla a pasta. Ative “Perguntar onde salvar” no navegador, se existir. Erro ou cancelamento do seletor não dispara download escondido. Nome com extensão diferente da escolhida é recusado antes da escrita.

No celular, “Compartilhar arquivo / escolher Drive” abre o compartilhamento do sistema quando suportado. Escolha o Drive, a conta e a pasta no próprio Drive; se ele não estiver disponível, baixe e use “Novo / Enviar arquivo” no aplicativo Drive. O app não autentica no Drive, não faz upload automático e não confirma sincronização. Sem internet, salvar localmente continua disponível; enviar/sincronizar no Drive depende dele e de conexão posterior. Compartilhar implica sua decisão de enviar o documento legível ao serviço escolhido.

O backup criptografado .LGND continua separado e opcional para restauração; não é o formato dos relatórios. Os cinco formatos exportam dados para leitura e não restauram integralmente a sessão criptografada.

## Lista de localização — 1.6

Na aba Participantes, a Lista de localização permite buscar pelo nome (com ou sem acentos), CPF, telefone ou ID e escolher Verde, Amarelo, Vermelho ou Preto. Pode combinar nome, cor e estado da avaliação. Ordene por nome A–Z ou por cor (preto, vermelho, amarelo, verde), com nomes em ordem alfabética dentro do grupo. Use Limpar filtros para voltar à lista inteira. Registros sem nome continuam identificados pelo ID.

Abrir ficha permite conferir/editar a avaliação; ao salvar, a lista recalcula a cor pelas regras existentes. Verde significa sem fator de cor assinalado, e não liberação médica; pendências continuam visíveis. Os filtros afetam a lista inteira antes da paginação. Os relatórios completos permanecem da sessão inteira, como indicado na tela.

## Critérios e fontes editáveis — 1.7

Abra Critérios e fontes e toque “Editar critérios / adicionar”. Cada regra permite ajustar descrição, grupo, pontos, cor adicional, exclusão, necessidade de revisão e estado ativo. Limites de idade/IMC, respostas de preparo e associação de idade com fatores têm condições estruturadas; não há execução de fórmulas/código livre. Adicionar critério permite criar uma resposta explícita ou outra regra automática dos tipos suportados. Faixas podem ser editadas/adicionadas. Desative em vez de apagar regras antigas; desativar retira somente os efeitos daquela regra, e outras podem consultar a mesma resposta.

Informe nome do protocolo, fonte, responsável/registro e motivo antes de salvar. Isso cria uma versão imutável nova e a torna ativa para novas fichas/importações. Fichas existentes conservam a versão original. Para recalculá-las, use “Aplicar versão ativa às fichas existentes” e confirme a mudança: os dados/fatores são preservados e as seções de revisão são desmarcadas. Faça backup antes se precisar do estado anterior. O catálogo mantém até 50 versões e cada versão aceita até 256 critérios e 12 faixas.

A ficha, impressão e relatórios informam a versão usada. HTML e planilhas/CSV/PDF completos incluem catálogo das versões utilizadas e autoria; o backup contém também versões antigas não utilizadas. Backups 1.7 com critérios/IDs novos exigem app compatível 1.7 ou posterior. A versão 1.7 continua lendo backups anteriores válidos.

Salvaguardas mantidas: menor de 18 sem IMC/faixa adulta; 16–17 = vermelho e preto exige outro critério explícito. Não se resolve implante por suposição: a base mantém revisão, e alterá-la exige uma regra nova explicitamente editada com autoria/motivo. Cores/pontos não são diagnóstico nem liberação. Alterações locais não herdam validação clínica do manual.

Novos critérios de resposta são marcados na ficha. O importador continua reconhecendo os rótulos originais, preserva os demais dados como origem e não deduz critérios novos/renomeados de texto livre. Confira marcações importadas quando adaptar descrições. Salvar critérios mantém na sessão; guarde backup para conservar as versões após fechar.

## Impressão e correções — 1.8

O botão 🖨 Imprimir fica fixo na barra superior. Ele abre as opções de impressão; “Abrir prévia para conferir e imprimir” abre o relatório em outra aba, com seu próprio botão Imprimir / salvar PDF. Se o navegador/WebView não oferecer impressão, escolha PDF e salve/abra no leitor do aparelho. A solicitação não comprova impressão física. O número da versão aparece no topo para diferenciar arquivos antigos.

Na ficha, Imprimir / PDF usa o conteúdo aberto, inclusive alterações ainda não salvas, e deixa isso explícito. Mostra ID da pessoa, respostas de preparação, estado das revisões e componentes abertos. Para exportar a sessão, salve a avaliação antes; o relatório da sessão usa só dados salvos e inclui todos os registros, independentemente da busca. Emblemas do relatório são elementos gráficos de primeiro plano para não depender da opção de imprimir fundos.

Foram corrigidos limites numéricos de IMC (erro IEEE-754 em 30/40 e nas categorias), dados de preparo inválidos, calculadoras com NaN, acentos/zeros na leitura de texto, alinhamento de DOCX/ODT, limites gerais de importação, pacotes ZIP duplicados, PNGs inválidos e operações assíncronas de backup/restore. Textos corrigidos preservam o arquivo de origem e indicam a representação conferida. Restauração é cancelada ao fechar seu formulário.

CSV UTF-8 sem BOM, UTF-16 LE/BE e Windows-1252 passam pela decodificação antes da tabela, sem converter identificadores textuais em números. As verificações estruturais de CPF/telefone continuam sem consulta a cadastro e sem reconstruir dígitos por suposição.

Veja AUDITORIA-1.8.md para o inventário, evidências e limites. Nenhuma versão é uma promessa de ler todo layout/arquivo, de reconhecer todo OCR ou de homologação em qualquer celular/Drive/impressora. Salve backup antes de trocar de arquivo; critérios originais, versões e salvaguardas etárias permanecem.

## 1.8.1 — Salvar pelo Windows ou iOS

Configurações → **Salvar arquivos · Google Drive e OneDrive** oferece formato e destino preferidos. XLSX, CSV, ODS, PDF e HTML valem tanto para relatório completo como para dados faltantes. A preferência não envia arquivos; fica no navegador quando permitido, sem fichas, contas ou tokens. Não integra o backup nem é garantia de persistência entre HTMLs/navegadores.

- **Windows:** instale e configure Google Drive para computador ou OneDrive. Escolha o serviço e “Escolher pasta sincronizada no computador”. Ao salvar, selecione a pasta desejada dele no seletor. O app escreve o arquivo local; o serviço faz a sincronização.
- **iPhone/iPad:** instale o serviço e entre na sua conta nele. Escolha o serviço e “Compartilhar com o aplicativo no celular”. No compartilhamento, escolha a conta/pasta no serviço. Se o navegador não compartilhar o formato, baixe para Arquivos e use o serviço para enviar. A disponibilidade varia entre Safari, outros navegadores e visualizadores de arquivos.
- **Offline:** triagem e geração/salvamento local continuam disponíveis. Upload/sincronização requerem internet. O app não conecta contas Google/Microsoft internamente e não afirma upload concluído; confira no próprio serviço.

Cancelar não baixa outro arquivo escondido. Se o destino em nuvem exigir um seletor ausente, o app avisa e permite que você escolha Compartilhar ou Baixar. A escolha de Google Drive/OneDrive orienta o usuário, mas o seletor/compartilhamento é do sistema: ele não pode ser forçado nem a pasta validada como pertencente ao serviço. LGND continua sendo o backup restaurável, separado dos relatórios legíveis.

## Tela branca no visualizador do iPhone/Android

O arquivo HTML é código de aplicativo. Visualizar um anexo pode mostrar apenas o documento sem executar JavaScript. No iPhone, Quick Look/Arquivos não deve ser apresentado como navegador compatível; no Android, visualizadores do Drive/WhatsApp e content:// variam. Esta versão exibe orientação estática quando a interface não inicia, mas não transforma o visualizador em navegador.

Para abrir pelo link, use Safari/Chrome com internet e autorização no site restrito. Para preparar um atalho/instalação, use Adicionar à Tela de Início quando disponível. Isso exige uma primeira abertura online e não garante offline: teste no aparelho com dados fictícios e modo avião antes de depender dele. O cache não guarda suas fichas; guarde backup antes de fechar. Não houve homologação física iOS/Android ou do cache através do gateway privado.

Em **Abrir no celular → Verificar preparo offline neste navegador**, o app consulta os recursos estáticos guardados da versão atual. Cache antigo, incompleto ou com tela de login no lugar do app não confirma preparo. Se informar recursos conferidos, ainda faça o teste real em modo avião por meio do ícone, com sessão vazia e backup anterior. Essa consulta não salva participantes nem habilita JavaScript no visualizador do iPhone.

## 1.8.2 — Ouvir louvores

No alto do cabeçalho, toque em **Ouvir louvores**, ao lado das ações de impressão/exportação. O link abre a playlist indicada no Spotify em nova aba ou no aplicativo, conforme o aparelho. O som é controlado pelo Spotify; não há player embutido, reprodução automática ou envio de informações da triagem. O link usa a URL canônica da playlist, sem parâmetros de rastreamento e sem referência da página. O acesso à música depende do Spotify, da conta e da disponibilidade da playlist.
