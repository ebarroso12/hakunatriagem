# Salvamento opcional em nuvem — plano

Objetivo: manter XLSX, CSV, ODS, PDF e HTML e oferecer configuração explícita de Google Drive/OneDrive pelo sistema. Escolha técnica provisória comunicada: contas instaladas, sem OAuth direto; pergunta opcional aberta ao usuário. Não inventar conexão nem confirmação de upload.

Arquitetura: preferência local sem dados pessoais; controles em Configurações e Exportar; file-save usa seletor ou compartilhamento, sem fallback silencioso em destinos de nuvem. Conta e pasta são escolhidas no sistema/serviço, não armazenadas pelo HTML. Nuvem requer conexão para sincronizar. Backup LGND permanece separado dos relatórios.

- [x] Reproduzir ausência da configuração com teste DOM e destinos Google/Microsoft em teste do salvamento.
- [x] Implementar preferências validadas com falha de storage não bloqueante, painel e ajuda por serviço.
- [x] Preservar bytes/MIME/extensão nos cinco formatos e cancelamento sem download oculto.
- [x] Executar testes focados, suite, build, diff; registrar limite do Chromium local e contas físicas não homologadas.
- [ ] Entregar artefato revisável sem afirmar publicação antes de ela ocorrer.

Casos críticos: seletor ausente; compartilhamento incompatível; cancelamento; conta/pasta errada escolhida fora do app; storage file:// indisponível. Não guardar tokens, contas ou dados clínicos nesta preferência.

Resposta do responsável: Windows e iOS; usar o aparelho/computador em que está o app. Não solicitou OAuth direto.
