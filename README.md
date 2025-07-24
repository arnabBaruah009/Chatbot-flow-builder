# Chatbot Flow Builder

A modern, interactive chatbot flow builder built with React, TypeScript, and React Flow. This application allows users to create and visualize chatbot conversation flows through an intuitive drag-and-drop interface.

## 🌟 Live Demo

**Try it out:** [https://chatflowbuilderbitespeed.netlify.app/](https://chatflowbuilderbitespeed.netlify.app/)

## 📋 Table of Contents

- [Features](#-features)
- [Tech Stack](#-tech-stack)
- [Getting Started](#-getting-started)
- [Project Structure](#-project-structure)
- [Usage](#-usage)
- [API Documentation](#-api-documentation)
- [Contributing](#-contributing)

## ✨ Features

- **Drag & Drop Interface**: Intuitive node-based flow creation
- **Real-time Flow Visualization**: See your chatbot flow in real-time
- **Node Customization**: Edit text content for each conversation node
- **Flow Validation**: Ensures proper flow structure with single outgoing connections
- **Responsive Design**: Works seamlessly across desktop and mobile devices
- **Modern UI**: Clean, professional interface built with Tailwind CSS
- **TypeScript Support**: Full type safety and better development experience
- **Error Handling**: User-friendly error notifications and validation

## 🛠 Tech Stack

### Frontend

- **React 18.3.1** - Modern React with hooks and functional components
- **TypeScript 5.5.3** - Type-safe JavaScript development
- **Vite 5.4.2** - Fast build tool and development server
- **Tailwind CSS 3.4.1** - Utility-first CSS framework
- **React Flow (@xyflow/react 12.8.2)** - Interactive node-based flow builder
- **Lucide React 0.344.0** - Beautiful, customizable icons

### Development Tools

- **ESLint 9.9.1** - Code linting and quality assurance
- **PostCSS 8.4.35** - CSS processing
- **Autoprefixer 10.4.18** - CSS vendor prefixing

## 🚀 Getting Started

### Prerequisites

- Node.js (version 16 or higher)
- npm or yarn package manager

### Installation

1. **Clone the repository**

   ```bash
   git clone https://github.com/arnabBaruah009/Chatbot-flow-builder.git
   cd Chatbot-flow-builder
   ```

2. **Install dependencies**

   ```bash
   npm install
   # or
   yarn install
   ```

3. **Start the development server**

   ```bash
   npm run dev
   # or
   yarn dev
   ```

4. **Open your browser**
   Navigate to `http://localhost:5173` to view the application

### Building for Production

```bash
npm run build
# or
yarn build
```

### Preview Production Build

```bash
npm run preview
# or
yarn preview
```

## 📁 Project Structure

```
src/
├── components/           # React components
│   ├── ErrorNotification.tsx  # Error display component
│   ├── NodesPanel.tsx         # Available nodes sidebar
│   ├── SaveButton.tsx         # Flow save functionality
│   ├── SettingsPanel.tsx      # Node settings panel
│   └── TextNode.tsx           # Custom text node component
├── App.tsx              # Main application component
├── main.tsx             # Application entry point
├── index.css            # Global styles
└── vite-env.d.ts        # Vite type definitions
```

## 💡 Usage

### Creating a Flow

1. **Add Nodes**: Drag nodes from the left panel onto the canvas
2. **Connect Nodes**: Click and drag from one node's handle to another to create connections
3. **Edit Content**: Click on any node to edit its text content in the settings panel
4. **Validate Flow**: The system automatically validates flow structure
5. **Save Flow**: Use the save button to export your flow configuration

### Flow Rules

- Each node can have only one outgoing connection
- Nodes can have multiple incoming connections
- Text content is customizable for each node
- Flow validation ensures proper structure

## 🔧 API Documentation

### Node Types

Currently supported node types:

- **Text Node**: Basic conversation node with customizable text content

### Flow Data Structure

```typescript
interface Node {
  id: string;
  type: string;
  position: { x: number; y: number };
  data: {
    label: string;
    onTextChange: (id: string, text: string) => void;
  };
}

interface Edge {
  id: string;
  source: string;
  target: string;
  type: string;
}
```

### Key Functions

- `onConnect`: Handles new connections between nodes
- `onNodeClick`: Manages node selection
- `onDrop`: Handles node creation via drag and drop
- `updateNodeText`: Updates node text content

## 🤝 Contributing

We welcome contributions! Please follow these steps:

1. **Fork the repository**
2. **Create a feature branch**
   ```bash
   git checkout -b feature/your-feature-name
   ```
3. **Make your changes**
4. **Run tests and linting**
   ```bash
   npm run lint
   ```
5. **Commit your changes**
   ```bash
   git commit -m "Add: your feature description"
   ```
6. **Push to your branch**
   ```bash
   git push origin feature/your-feature-name
   ```
7. **Create a Pull Request**

### Development Guidelines

- Follow TypeScript best practices
- Use functional components with hooks
- Maintain consistent code formatting
- Add proper error handling
- Write meaningful commit messages

## 🙏 Acknowledgments

- [React Flow](https://reactflow.dev/) for the excellent flow builder library
- [Tailwind CSS](https://tailwindcss.com/) for the utility-first CSS framework
- [Vite](https://vitejs.dev/) for the fast build tool
- [Lucide](https://lucide.dev/) for the beautiful icons

## 📞 Contact

- **GitHub**: [@arnabBaruah009](https://github.com/arnabBaruah009)
- **Live Demo**: [https://chatflowbuilderbitespeed.netlify.app/](https://chatflowbuilderbitespeed.netlify.app/)
- **Repository**: [https://github.com/arnabBaruah009/Chatbot-flow-builder](https://github.com/arnabBaruah009/Chatbot-flow-builder)

---

**Made with ❤️ by Arnab Baruah**
