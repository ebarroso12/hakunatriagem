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
