# Medflow - Electron Desktop App Setup

Este documento descreve como usar o Medflow como um aplicativo desktop nativo do Windows usando Electron.

## Instalação de Dependências

```bash
npm install
```

## Desenvolvimento

Para executar o app em modo de desenvolvimento com Electron:

```bash
npm run dev:electron
```

Este comando irá:
1. Compilar o processo principal do Electron
2. Iniciar o servidor Vite de desenvolvimento
3. Abrir a janela do Electron

## Build para Produção

Para criar um instalador Windows (.exe):

```bash
npm run build
```

Isso irá:
1. Compilar o processo principal do Electron
2. Fazer build da aplicação React
3. Criar um instalador NSIS e versão portável

Os arquivos de saída estarão em `release/`

## Estrutura de Arquivos

```
medflow/
├── electron/
│   ├── main.ts          # Processo principal do Electron
│   ├── preload.ts       # Script de preload para segurança
│   └── preload.js       # Versão compilada do preload
├── dist/                # Build da aplicação React
├── dist-electron/       # Build do processo principal
├── src/                 # Código-fonte da aplicação React
├── build-electron.js    # Script de build do Electron
├── electron-builder.yml # Configuração do electron-builder
└── package.json         # Dependências e scripts
```

## Scripts Disponíveis

- `npm run dev` - Executa apenas o servidor Vite (web)
- `npm run dev:electron` - Executa o app como desktop com Electron
- `npm run build` - Cria o instalador Windows
- `npm run build:web` - Faz build apenas da web
- `npm run build:electron` - Compila apenas o processo principal
- `npm run electron` - Executa o app desktop já compilado
- `npm run preview` - Preview do build web

## Configuração do Electron Builder

O arquivo `electron-builder.yml` configura:
- **Targets**: NSIS (instalador) e Portable (executável único)
- **Diretórios**: Assets e output de release
- **Arquivos**: Inclui dist, dist-electron e node_modules

## Notas Importantes

1. **Variáveis de Ambiente**: O arquivo `.env.local` é carregado automaticamente
2. **API Key**: Certifique-se de que `GEMINI_API_KEY` está definida em `.env.local`
3. **Desenvolvimento**: O DevTools abre automaticamente em modo dev
4. **Segurança**: O preload.js isola o contexto para segurança

## Troubleshooting

### Erro: "electron not found"
```bash
npm install
```

### Erro ao compilar Electron
Certifique-se de que tem Node.js 18+ instalado:
```bash
node --version
```

### Porta 5173 em uso
Mude a porta em `vite.config.ts` ou feche a aplicação que está usando a porta.

## Próximos Passos

1. Adicione um ícone em `assets/icon.png` (256x256 ou maior)
2. Customize o menu em `electron/main.ts`
3. Adicione handlers IPC conforme necessário
4. Teste o build com `npm run build`
