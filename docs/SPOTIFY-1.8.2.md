# Botão Ouvir louvores — 1.8.2

Link no cabeçalho em todas as telas, com ícone SVG local e texto acessível. Abre a playlist solicitada em nova aba, sem fechar a triagem. Usa URL canônica, noopener/noreferrer e referrerpolicy no-referrer. Não incorpora player, não reproduz automaticamente nem faz chamadas Spotify no carregamento.

Arquivos: src/app.js, src/styles.css, package/lock, scripts/build.mjs, testes Spotify e browser-file, workflow e documentação. Teste UI observado falhando antes e passando depois.

## Entrega Spotify 1.8.2 concluída

Código público b21806cbbec51051825f956ebfda63e09240d3f7; execução 43520313399/job 132212625244. 207 testes e E2E obrigatórios Chromium aprovados, incluindo link no cabeçalho, destino e atributos, layouts 390/320 e fluxos existentes. Diagnóstico WebKit continua falhando na reabertura sem rede (exit 1 em etapa continue-on-error); não foi contado como aprovação iOS. Reprodução real/conta Spotify não testada.

Site privado retornou succeeded: deployment appgdep_6af790bec2e881918a051d67b55e61bc, versão appgprj_6af3885f25548191af99e68bff13d230~appgver_985ceee683b08191becdb99d1682cd95. Fonte enviada sem força: e96344542f67534f4f3d8ad211e4bc1940bf1f32; archive spotify-v182.tar.gz, manifest e dist do build. URL: https://triagem-hakunas.ebarroso12.chatgpt.site . Audiência privada preservada. Nenhum participante enviado.

Release html-b21806cbbec5, download HTTP 200/attachment, 13.945.353 bytes; SHA-256 local e remoto: 2619df09f3afcc1a6206eedfd6b7bc6bec0f2609416f0c858beec63b5f92c8a9. URL: https://github.com/ebarroso12/hakunatriagem/releases/download/html-b21806cbbec5/Triagem-Hakunas-v1.8.2.html .

Próximo item permanece o offline iPhone e homologação física. Esta entrega só adiciona o link Spotify e não resolve essa limitação.
