# 🍅 Pomodoro Timer

Um aplicativo moderno de Pomodoro construído com React 19, TypeScript 5, Vite e Tailwind CSS.

![Pomodoro Timer](https://img.shields.io/badge/version-2.0.0-blue)
![React](https://img.shields.io/badge/react-19-61dafb)
![TypeScript](https://img.shields.io/badge/typescript-5-3178c6)
![Vite](https://img.shields.io/badge/vite-7-646cff)

## ✨ Características

- ⚡ **Vite** - Build tool ultrarrápido
- 🎨 **Tailwind CSS v4** - Design system moderno e responsivo
- 🌙 **Modo Escuro** - Troca automática entre temas claro e escuro
- 💾 **Persistência** - Estatísticas salvas no LocalStorage
- 🔔 **Notificações** - Alertas do navegador quando o timer termina
- 🎭 **Animações** - Transições suaves com Framer Motion
- 📱 **Responsivo** - Funciona perfeitamente em mobile e desktop
- 🎵 **Sons** - Feedback sonoro para início e fim dos timers
- 📊 **Estatísticas** - Acompanhe ciclos, pomodoros e tempo trabalhado

## 🚀 Técnica Pomodoro

A técnica Pomodoro é um método de gerenciamento de tempo que usa um timer para dividir o trabalho em intervalos:

- **25 minutos** de trabalho focado 💼
- **5 minutos** de descanso curto ☕
- Após 4 pomodoros: **15 minutos** de descanso longo 🌴

## 🛠️ Stack Tecnológico

- **React 19** - Biblioteca UI
- **TypeScript 5** - Tipagem estática
- **Vite 7** - Build tool e dev server
- **Tailwind CSS 4** - Framework CSS utilitário
- **Zustand** - Gerenciamento de estado
- **Framer Motion** - Animações
- **LocalStorage API** - Persistência de dados
- **Notification API** - Notificações do navegador

## 📦 Instalação

```bash
# Clone o repositório
git clone https://github.com/seu-usuario/pomodoro.git

# Entre na pasta
cd pomodoro

# Instale as dependências
npm install

# Rode em modo desenvolvimento
npm run dev
```

## 🎯 Scripts Disponíveis

```bash
npm run dev      # Inicia o servidor de desenvolvimento
npm run build    # Cria build de produção
npm run preview  # Preview do build de produção
npm run lint     # Roda o linter
```

## 🎨 Personalização

As configurações padrão são:
- **Tempo de trabalho**: 25 minutos
- **Descanso curto**: 5 minutos
- **Descanso longo**: 15 minutos
- **Ciclos até descanso longo**: 4

Para alterar, edite `src/store/pomodoro.ts`.

## 📱 Suporte de Navegadores

- Chrome/Edge (últimas 2 versões)
- Firefox (últimas 2 versões)
- Safari (últimas 2 versões)

## 📄 Licença

Este projeto está sob a licença MIT.

## 🙏 Créditos

Sons de sino: [Freesound](https://freesound.org/)

---

Feito com ❤️ e ☕
