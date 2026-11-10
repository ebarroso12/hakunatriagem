# Triagem Hakunas

Aplicativo web local para cadastro de participantes e apoio à revisão profissional nas atividades Legendários Hakunas. Interface responsiva em português, com marca extraída do manual fornecido pelo responsável.

## Abrir o aplicativo

Baixe [`app/triagem-hakunas.htm`](app/triagem-hakunas.htm) usando **Download raw file** no GitHub e abra em um navegador atualizado. O HTML contém estilos, código, marca e biblioteca de planilhas. Não usa CDN em execução.

Para hospedagem HTTPS/PWA, execute `npm ci` e `npm run build`, depois sirva a pasta `dist/`. Não há publicação externa automática. O workflow de CI oferece um artefato de build para download.

## Funcionalidades

- Cadastro, edição, exclusão, busca, filtros e paginação (50 por página; até 5.000 registros).
- Importação local de Excel, ODS, CSV/TSV e tabelas HTML, com aba/cabeçalho selecionáveis, mapeamento e confirmação de prévia. Valores inválidos bloqueiam o conjunto antes de inserir registros.
- Preservação de textos clínicos, sem inferência automática de diagnósticos; revisão explícita por seção.
- Score do manual Hakunas separado das cores operacionais provisórias; exclusões independentes; faixa final interna bloqueada por pendências. Não autoriza participação.
- Registro de idades 16–17 sem classificação ou IMC adultos; normalização de altura em metros/centímetros.
- Calculadoras independentes de IMC e TFGe CKD-EPI 2021.
- Impressão/PDF, CSV com neutralização de fórmulas e confirmação antes de gerar arquivo legível.
- Backup .LGND AES-GCM-256 / PBKDF2-SHA256 (310.000 iterações), com validação antes de restaurar e confirmação antes de substituir a sessão.
- Configurações da operação e registro de referências com responsável, preservados no backup.

## Dados e segurança operacional

Os participantes ficam **apenas na memória da aba**. Atualizar ou fechar pode apagar os dados. **Salvar avaliação** grava na sessão; **Salvar backup** gera o arquivo para retenção. Não há login, banco, sincronização, telemetria ou envio automático. O backup tem senha com no mínimo 10 caracteres; não há recuperação de senha. Confirme o download antes de sair.

Planilhas e documentos com dados pessoais fornecidos na conversa não estão neste repositório. Nenhum participante real está pré-carregado.

## Critérios e limites

O score foi transcrito do manual Hakunas, versão 1.0, com data de 07/12/2025. As cores vêm do relatório consolidado de 10/11/2026 e são exibidas como provisórias. O app mantém a divergência de critério para implantes como pendência e não inventa regra de cor baseada apenas em menoridade.

Esta implementação foi criada a partir das referências; não é uma recuperação do código ou dos 169 testes citados no relatório anterior. Nesta entrega: **28 testes unitários aprovados**, build aprovado e ensaio Chromium via HTTP local em 320/390 px e desktop. Testados cadastro, normalização, menoridade, backup/restauração, calculadora e prévia da planilha fornecida (16 colunas reconhecidas). O acesso `file://` está bloqueado pela política do ambiente de teste; a abertura direta do HTM precisa ser conferida no dispositivo de destino. Não houve teste em telefone físico ou impressora.

Não há nesta versão: interface em inglês, Framingham, KFRE, rastreio ACSM, extração PDF/DOCX/OCR, anexação de documentos, critérios clínicos editáveis ou integração Drive/OneDrive. O registro de referências não arquiva documentos nem modifica o motor. O PAR-Q+ não foi reproduzido.

Não houve homologação clínica ou regulatória. O sistema não diagnostica, prescreve ou libera esforço físico. Critérios de exclusão exigem avaliação profissional mesmo com pontuação baixa.

Limites: arquivo de importação até 10 MiB; ZIP até 30 MiB declarados e 20.000 entradas; 10.001 linhas, 256 colunas; texto de ficha até 2.000 caracteres por campo; backup até 32 MiB antes de criptografar. CSV é resumo e não substitui o backup.

## Desenvolvimento

Requer Node.js 22+.

```sh
npm ci
npm test
npm run build
npm run dev
```

Ensaio de navegador (requer Chromium):

```sh
CHROMIUM_PATH=/usr/bin/chromium node tests/browser.mjs
```

Opcionalmente defina `HAKUNAS_TEST_WORKBOOK` para testar uma planilha local. A suíte registra somente contagens; não confirma a importação de dados reais nem salva capturas com esses registros. Resultados e backups sintéticos ficam em `test-results/` (ignorado pelo Git).

## Estrutura

`src/core.js`: validação e regras. `src/importer.js`: leitura e mapeamento. `src/vault.js`: criptografia. `src/app.js`: interface e sessão. `scripts/build.mjs`: HTML autocontido e PWA. `tests/`: testes.
