# Salvamento 1.8.1 — Windows e iOS

Pedido: cinco extensões de relatórios e oportunidade de configurar Google Drive/OneDrive no aparelho/computador. Responsável confirmou uso de Windows e iOS e contas no próprio aparelho. Implementação não usa OAuth, API de nuvem ou servidor; não envia dados de participantes nesta manutenção.

Causa da lacuna: a 1.8 oferecia seletor e compartilhamento genéricos, sem painel de preferências e sem orientação para OneDrive. Acrescentados painel, preferência validada local sem dados pessoais, destinos nomeados nos dois relatórios e método explícito pasta/compartilhamento. Preferências inválidas/storage bloqueado não impedem uso offline. Links oficiais só abrem por iniciativa do usuário; não levam dados no URL.

Teste antes: quatro casos falharam pelo destino desconhecido/painel ausente. Depois: testes dos cinco formatos/MIME/bytes, dois provedores e dois métodos, cancelamento/indisponibilidade sem fallback oculto; UI configura PDF/OneDrive e realmente gera dois PDFs legíveis. Dublês apenas na fronteira de seletor e compartilhamento. Uma fixture DOM misturava Blob Node/File jsdom e foi alinhada ao mesmo runtime; não era falha do browser. Nome esperado de dados-faltantes foi corrigido para não depender de maiúscula inexistente.

Chromium local por file:// voltou a retornar ERR_BLOCKED_BY_ADMINISTRATOR. Não contornado; DOM não é homologação de Windows/iOS. E2E CI ampliado para painel e métodos, mantendo a regressão prévia. Evidência final de suite/build/publicação será registrada ao concluir.

Limites: o app não sabe qual aplicativo/conta/pasta o usuário escolheu; API share resolvida não prova upload. Não armazena tokens ou handles permanentes. iOS/file:// pode não disponibilizar share, exigindo Arquivos/upload manual. Offline permite gerar arquivo; nuvem depende de conexão posterior. Backup LGND não foi convertido para outro formato e continua separado.

## Salvamento 1.8.1 — verificação local

196/196 testes aprovados em pnpm test (build automático), incluindo sete testes novos de destinos/preferências e dois PDFs reais. Testes focados de salvamento: 15/15. Sintaxe e git diff --check aprovados. Chromium local file:// bloqueado por ERR_BLOCKED_BY_ADMINISTRATOR, sem contorno. E2E CI ampliado; resultados remotos/publicação ainda não confirmados nesta etapa. Windows/iOS e contas reais não homologados. Ver SALVAMENTO-1.8.1.md.

## Abertura em celulares — relato e alcance

O responsável enviou captura do iPhone mostrando prévia de arquivo com fundo vazio, sem barra do Safari. Compatível com visualizador que não executa JavaScript; não foi coletado log do aparelho. O corpo HTML anterior era vazio até o script renderizar: isso foi reproduzido com JS desabilitado. Agora há orientação estática visível antes do script, link privado e ajuda no app. Isso evita silêncio, mas não habilita execução no Quick Look nem resolve por si só offline iOS. A causa no Android ainda não foi reproduzida em aparelho.

Build inclui alvo ES2020 e ícones PNG 192/512 mais metadados Apple para melhorar a preparação pelo navegador. Teste CI novo verifica Chromium e WebKit em viewport móvel: execução hospedada e file:// offline, ajuda, cadastro e PDF; JavaScript desabilitado deve exibir orientação. WebKit em Linux não é Safari/iOS físico nem homologação de Quick Look.

Acesso escolhido pelo responsável: restrito. Não tornar site público nem adicionar terceiros sem identificá-los. Hoje a audiência conhecida é somente o proprietário. Uso pelo link exige internet inicial; uso offline instalado depende de preparo e teste real, incluindo o gateway privado. Não declarar equivalência entre link e HTML nem prometer primeira abertura offline em iPhone.

## Preparação offline verificável

Ajuda “Abrir no celular” inclui “Verificar preparo offline neste navegador”. O worker verifica cache dos recursos estáticos e identidade da versão nos dois HTMLs; login privado em cache ou recursos ausentes não são anunciados prontos. Mensagem por MessageChannel com versão comparada à tela, timeout e cancelamento tardio; arquivo local não é confundido com instalação iOS. Não persiste participantes. Uma falha de sintaxe na primeira geração do worker novo foi detectada por node --check e corrigida antes de publicação; o script gerado agora tem teste executável, incluindo login e ícone ausente.

Essa verificação comprova apenas recursos presentes no navegador onde foi executada. Não comprova instalação pela Tela de Início, execução no Quick Look, conta do usuário, gateway offline ou modo avião em iPhone físico. O responsável perguntou como usar offline no iPhone; explicada a necessidade de primeira preparação online e teste real por ícone.

Verificação final local ampliada: 205/205 testes aprovados, build e sintaxe do worker gerado aprovados, git diff --check limpo. Chromium/WebKit reais em CI ainda pendentes neste ponto; não confundir essa contagem com homologação iOS.

CI inicial df4bedf, execução 43330522235: 205 testes e regressão Chromium aprovados; hosted-audit com cache consultado aprovado; mobile Chromium aprovado. WebKit completou o fluxo hospedado, mas a navegação subsequente ao file:// expirou. Release não publicada. Próximo ensaio isola cada modo em contexto novo e intercepta somente HTTP(S), eliminando interferência entre sessão web e arquivo; a causa exata ainda não é afirmada.

Revisão adicional reproduziu getter serviceWorker que lança SecurityError e rejeitava a checagem antes do tratamento. Corrigido sem anunciar preparo: aviso unsupported. 206/206 testes locais aprovados após essa correção.

Segundo ensaio 10b5e75, execução 43331339387: 206 testes aprovados; Chromium file:// completo, hosted/cache e mobile contextos novos aprovados. WebKit file:// em contexto novo retornou erro interno, mesmo sem interceptação de arquivos. Não afirmar que isolamento resolveu. Esse caminho passa a limitação explícita, sem contá-lo como aprovado; não há terceira tentativa de mascarar o arquivo como suportado. O teste de aceitação agora exerce a alternativa proposta ao responsável: app hospedado preparado, fecha aba, desliga rede, reabre mesma origem e verifica recursos/cadastro/PDF em Chromium e WebKit. Ainda não é instalação iOS nem gateway privado.

Terceiro ensaio 5e5cd5f, execução 43331978129: 206 testes, E2E file:// Chromium, hosted/cache e reabertura de aba offline Chromium aprovados. Alternativa preparada também não concluiu no WebKit (page.goto erro interno). Não afirmar offline iPhone pronto.

Escopo de liberação explicitado: testes Chromium são obrigatórios; diagnóstico WebKit passa a etapa separada continue-on-error, com resultado preservado em logs e sem contá-lo como aprovação iOS. Isto não corrige nem apaga as falhas WebKit: permite entregar os destinos de relatório e correções já verificadas enquanto o caminho iOS continua pendente. Script ganhou fases para localizar carga/preparo/reabertura, sem novas alterações de produção por suposição. O responsável foi informado expressamente do insucesso. Sem aparelho iOS e sem verificar gateway, a meta offline iPhone não pode ser encerrada como concluída.
