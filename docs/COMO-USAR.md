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
