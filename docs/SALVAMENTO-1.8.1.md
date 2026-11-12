# Salvamento 1.8.1 — Windows e iOS

Pedido: cinco extensões de relatórios e oportunidade de configurar Google Drive/OneDrive no aparelho/computador. Responsável confirmou uso de Windows e iOS e contas no próprio aparelho. Implementação não usa OAuth, API de nuvem ou servidor; não envia dados de participantes nesta manutenção.

Causa da lacuna: a 1.8 oferecia seletor e compartilhamento genéricos, sem painel de preferências e sem orientação para OneDrive. Acrescentados painel, preferência validada local sem dados pessoais, destinos nomeados nos dois relatórios e método explícito pasta/compartilhamento. Preferências inválidas/storage bloqueado não impedem uso offline. Links oficiais só abrem por iniciativa do usuário; não levam dados no URL.

Teste antes: quatro casos falharam pelo destino desconhecido/painel ausente. Depois: testes dos cinco formatos/MIME/bytes, dois provedores e dois métodos, cancelamento/indisponibilidade sem fallback oculto; UI configura PDF/OneDrive e realmente gera dois PDFs legíveis. Dublês apenas na fronteira de seletor e compartilhamento. Uma fixture DOM misturava Blob Node/File jsdom e foi alinhada ao mesmo runtime; não era falha do browser. Nome esperado de dados-faltantes foi corrigido para não depender de maiúscula inexistente.

Chromium local por file:// voltou a retornar ERR_BLOCKED_BY_ADMINISTRATOR. Não contornado; DOM não é homologação de Windows/iOS. E2E CI ampliado para painel e métodos, mantendo a regressão prévia. Evidência final de suite/build/publicação será registrada ao concluir.

Limites: o app não sabe qual aplicativo/conta/pasta o usuário escolheu; API share resolvida não prova upload. Não armazena tokens ou handles permanentes. iOS/file:// pode não disponibilizar share, exigindo Arquivos/upload manual. Offline permite gerar arquivo; nuvem depende de conexão posterior. Backup LGND não foi convertido para outro formato e continua separado.

## Salvamento 1.8.1 — verificação local

196/196 testes aprovados em pnpm test (build automático), incluindo sete testes novos de destinos/preferências e dois PDFs reais. Testes focados de salvamento: 15/15. Sintaxe e git diff --check aprovados. Chromium local file:// bloqueado por ERR_BLOCKED_BY_ADMINISTRATOR, sem contorno. E2E CI ampliado; resultados remotos/publicação ainda não confirmados nesta etapa. Windows/iOS e contas reais não homologados. Ver SALVAMENTO-1.8.1.md.
