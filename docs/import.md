# Contrato de importação — implementação existente

Processamento local, formatos explícitos, origem preservada e prévia antes de incluir participantes. Importação não persiste nem compartilha registros automaticamente.

## Matriz de entrada

- Planilhas: XLSX, XLS, XLSM, XLSB, ODS.
- Texto/tabelas: CSV, TSV, TXT, HTML/HTM, XML, JSON com registros identificáveis.
- Documentos: DOCX, DOCM, DOTX, ODT.
- PDF com texto: extração local, ordenação por coordenadas quando possível.
- Estado já existente no checkout: OCR local para páginas PDF sem texto mediante opção; PNG, JPEG, WebP, BMP e GIF por OCR local. Idiomas e núcleo já estão incorporados. O escopo de OCR descrito pelo novo prompt diverge desta implementação; nenhuma expansão está autorizada nesta fila.
- Não há cobertura universal: DOC binário, HEIC, TIFF, arquivos protegidos, codificações e layouts incompatíveis podem exigir conversão local ou entrada manual. Não enviar dados a serviço remoto.

## Layouts e conferência

Detecção de cabeçalhos deslocados, ordem variável, múltiplas abas, tabelas transpostas, blocos repetidos e tabelas lado a lado nos casos reconhecidos. Estruturas incertas exigem escolha/mapeamento humano. Texto livre não vira diagnóstico. Respostas clínicas estruturadas só alimentam fatores quando a pergunta é explícita e a resposta é reconhecida; grupos continuam pendentes de revisão.

Guardar rótulo, valor e posição de origem quando disponíveis. Posições de PDF/texto se referem à representação extraída. Campos extras não vazios são preservados nos limites do schema. Exibir unidades inferidas, ambiguidades e valores inválidos; não corrigir silenciosamente nem inserir somente a parte válida de um conjunto bloqueado.

A revisão de falhas de ambiguidade/rejeição atômica está na fila como item próprio; esta manutenção de idade não altera o parser nem constitui auditoria completa de formatos.

## Limites existentes

10 MiB por arquivo; ZIP até 30 MiB efetivamente expandidos e 20.000 entradas; até 200 abas e 50.000 linhas totais; 10.001 linhas/256 colunas por tabela; 5.000 participantes; 2.000 caracteres por campo. PDF até 50 páginas, OCR PDF até 10, texto extraído até 2 MiB, imagem até 25 megapixels. Backup até 32 MiB antes de criptografar.

Verificar limites com fixtures sintéticas. Não incluir documentos pessoais, nomes, telefones ou condições clínicas reais em capturas, logs, fixtures ou commits.

## Atualização 1.2 — identificadores e prévia automática

Conferência de CPF/telefone roda no próprio JavaScript do HTML, sem consulta externa. CPF com 11 dígitos e checksum correto e telefone estruturalmente íntegro não recebem aviso genérico apenas por tipo numérico. Isso não comprova titularidade/existência. Dígitos ausentes/invalidade de checksum/DDD e precisão numérica incerta geram aviso específico; nada é completado por suposição.

O leitor conserva metadados de valor numérico e máscara. A exibição científica pode ser normalizada a partir do valor inteiro exato e seguro armazenado; o texto exibido original continua na origem da ficha. Uma máscara explícita pode preservar zeros que ainda existem na formatação. Zeros realmente perdidos sem evidência não são reconstruídos.

Uma estrutura detectada abre a prévia automaticamente, sem incluir registros. Múltiplas estruturas mantêm seleção explícita. A confirmação continua necessária; alertas de dados e revisão clínica não se tornam conferidos automaticamente. Avisos são agrupados/recolhidos e detalhes completos permanecem nas fichas. A tabela de prévia e o botão de confirmação têm layout móvel próprio.
