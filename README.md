# Triagem Hakunas — HTML offline

Versão 1.1.0. Aplicativo local para organizar participantes e apoiar a revisão profissional nas atividades Legendários Hakunas.

## Baixar e usar sem internet

**[Baixar o HTML corrigido](https://triagem-hakunas.ebarroso12.chatgpt.site/baixar-corrigida.html)**

Na página, clique em **Baixar HTML completo**. Guarde `Triagem-Hakunas-Offline.html` e abra o arquivo em um navegador atualizado. Depois de salvo, o aplicativo não depende do site, de login, servidor, CDN ou internet para operar. O HTML contém interface, marca, leitores, worker PDF, núcleo WASM e idiomas português/inglês do OCR. Tamanho aproximado: 12 MB.

O site serve como canal de distribuição. A execução local é a entrega principal. O HTML standalone inclui uma política CSP que impede conexões HTTP(S) e não registra service worker. Links externos de fontes são opcionais e exigem conexão se forem abertos.

## Importação e localização dos campos

- Excel `.xlsx`, `.xls`, `.xlsm`, `.xlsb` e OpenDocument `.ods`.
- CSV, TSV, TXT, tabelas HTML, XML e JSON com registros identificáveis.
- Word OOXML `.docx`, `.docm`, `.dotx`, OpenDocument `.odt`: tabelas e parágrafos com rótulos.
- PDF com texto: extração local e ordenação por coordenadas; páginas sem texto exigem a opção **OCR local**.
- Imagens `.png`, `.jpg`, `.jpeg`, `.webp`, `.bmp`, `.gif`: OCR local português/inglês, sem download de idiomas ou núcleo durante o uso. GIF usa a imagem decodificada pelo navegador.

A detecção examina as abas e linhas para localizar cabeçalhos deslocados, ordens de colunas diferentes, tabelas transpostas, tabelas lado a lado e blocos repetidos de campos/valores. A prévia mostra estruturas, posições, contagens e os primeiros registros. A pessoa seleciona os blocos, confere a prévia e confirma a inclusão.

Há mapeamento manual de aba, cabeçalho, intervalo e colunas, além de edição do texto extraído antes de reanalisar. Valores conflitantes ou inválidos bloqueiam o conjunto. Campos não vazios sem correspondência também ficam preservados na ficha, com rótulo, valor e posição de origem. As posições em PDF/texto são as da representação extraída, não coordenadas físicas de Excel.

Respostas explícitas Sim/Não a fatores clínicos identificados podem alimentar alertas. Texto livre não vira diagnóstico; seções não se tornam revisadas automaticamente. Avisos de OCR, unidades ou respostas ambíguas precisam de conferência no original. Não há deduplicação automática de pessoas em blocos ou abas diferentes.

**Não existe garantia de reconhecimento de qualquer arquivo ou de exatidão do OCR.** DOC binário antigo, HEIC, TIFF, formatos proprietários, arquivos protegidos e certas estruturas complexas exigem conversão local ou entrada manual. Alguns PDFs com codificações/fontes/imagens especiais podem não ser legíveis. Arquivos muito grandes são recusados com mensagem. Não há interpretação clínica de texto livre nem liberação automática de participantes.

## Fichas, triagem e retenção

Cadastro, edição, exclusão, busca e filtros; páginas de 50 e até 5.000 participantes. A ficha inclui medidas, contato, condições informadas, fatores estruturados, seções revisadas, documentação e responsável. Campos de origem e avisos são preservados na edição, impressão e backup.

O score vem do manual Hakunas, versão 1.0, datado de 07/12/2025. As cores operacionais vêm do relatório consolidado de 10/11/2026 e são provisórias, separadas da pontuação. Exclusões são independentes da soma. A faixa interna final exige dados válidos, seções revisadas, preparo informado, documentos conferidos, responsável e avisos de importação conferidos. Menores de 18 não recebem IMC/faixa adulta. Conforme instrução operacional explícita do responsável nesta manutenção, idades inteiras de 16–17 anos recebem vermelho; preto exige outro critério preto explícito. Esta regra etária vem da instrução do responsável, não de validação clínica externa. Implantes mantêm a divergência de critério como pendência.

Calculadoras independentes: IMC e TFGe CKD-EPI 2021. Não alteram fichas automaticamente. Esta versão não inclui Framingham, KFRE, rastreio ACSM, interface em inglês ou critérios clínicos editáveis. O registro de referências não arquiva documentos nem modifica o motor. PAR-Q+ não foi reproduzido.

**Salvar avaliação** mantém dados apenas na memória da aba. Atualizar/fechar pode apagá-los. **Salvar backup** gera `.LGND` AES-GCM-256 / PBKDF2-SHA256, 310.000 iterações, salt/IV aleatórios. A senha precisa de 10 caracteres, não é armazenada e não pode ser recuperada. Confira o download antes de sair. Restauração valida schema, IDs, tipos, campos e limites antes de pedir confirmação para substituir a sessão.

Impressão/PDF usa o navegador; CSV é resumo legível, neutraliza fórmulas e pede confirmação. Não há banco, login clínico, sincronização, telemetria, OAuth ou envio automático. Nenhum dado pessoal dos anexos foi incluído no repositório ou no HTML.

## Verificação desta entrega

**64 testes aprovados**, build concluído. A entrega desta correção foi solicitada após a manutenção local; veja `docs/STATUS.md`, `TODO.md`, `docs/EVIDENCIAS.md` e `docs/ENTREGA.md`. Incluem regras, exclusões, dados intermediários inválidos, menores, unidades, layout em diversas posições, múltiplas abas/blocos, DOCX/ODT/HTML/XML/JSON, coordenadas PDF, proveniência, ZIP, backup, XSS e CSV.

O worker OCR incorporado foi executado em contexto JS isolado, com WASM e idiomas embutidos, e reconheceu uma imagem sintética sem acesso à rede. PDF real sintético foi lido pelo motor incluído. O HTML final foi executado em DOM simulado (`file:`), com rede proibida, verificando cadastro, impressão, importação, campos extras e backup.

A planilha fornecida foi lida localmente: 100 registros em uma estrutura, 16 campos reconhecidos. Somente contagens foram registradas; dados reais não foram inseridos em testes versionados.

**Limite de verificação:** nesta atualização não houve ensaio em navegador real, telefone físico, modo avião de um dispositivo ou impressora. O ambiente gerenciado não oferece a rota de navegador prevista para essa verificação; a execução DOM simulada não equivale à homologação em Safari/Chrome ou em todos os aparelhos. A versão anterior teve ensaio Chromium em 320/390 px. Abra o HTML salvo e confira a operação no navegador de destino antes do uso real.

O sistema não foi homologado clínica ou regulatoriamente, não diagnostica, prescreve ou libera esforço físico. Julgamento profissional e validação do protocolo continuam necessários.

## Limites

Arquivo até 10 MiB; ZIP até 30 MiB realmente expandidos e 20.000 entradas; até 200 abas/50.000 linhas totais; 10.001 linhas e 256 colunas por tabela; 5.000 participantes; 2.000 caracteres por campo. PDF até 50 páginas; OCR de PDF até 10 páginas; texto extraído até 2 MiB; imagem até 25 megapixels. Backup até 32 MiB antes da criptografia. CSV não substitui backup.

## Desenvolvimento

Node.js 22+. A instalação das dependências requer rede apenas na preparação do projeto.

```sh
npm ci
npm test
npm run dev
```

`npm test` prepara os runtimes, gera os HTMLs e executa os testes. Para gerar novamente sem testes: `npm run build`.

Arquivos gerados: `dist/triagem-hakunas-offline.html` e `dist/triagem-hakunas.htm` (autocontidos), `dist/index.html` (versão hospedável), `dist/baixar.html` (página de download). `src/generated-runtimes.js` é gerado a partir das dependências e ignorado pelo Git.

A CI oferece `dist/` como artefato de build. O HTML é um arquivo único dentro da saída; nenhum ZIP é necessário para executá-lo. Os antigos artefatos `app/` da versão 1.0 foram retirados para evitar download da versão desatualizada.

`tests/browser.mjs` permanece disponível para ambientes com Chromium e autorização para execução do ensaio. Use `CHROMIUM_PATH` e, opcionalmente, `HAKUNAS_TEST_WORKBOOK` (planilha local); não publica dados. `test-results/` é ignorado.

Módulos: `core.js` (validação/regras), `layouts.js` (detecção e proveniência), `documents.js` (documentos/texto), `importer.js` (formatos), `pdf.js`, `ocr.js`, `vault.js`, `app.js`. O build incorpora bibliotecas; não depende de CDNs em execução.
