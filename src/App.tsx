import React, { useState, useCallback, useRef } from "react";
import {
  ReactFlow,
  Background,
  Controls,
  MiniMap,
  addEdge,
  useNodesState,
  useEdgesState,
  Connection,
  Edge,
  Node,
  ReactFlowProvider,
  OnConnect,
  OnNodesDelete,
  OnEdgesDelete,
} from "@xyflow/react";
import "@xyflow/react/dist/style.css";

import TextNode from "./components/TextNode";
import NodesPanel from "./components/NodesPanel";
import SettingsPanel from "./components/SettingsPanel";
import SaveButton from "./components/SaveButton";
import ErrorNotification from "./components/ErrorNotification";

// Define custom node types
const nodeTypes = {
  textNode: TextNode,
};

// Initial nodes and edges
const initialNodes: Node[] = [];
const initialEdges: Edge[] = [];

function App() {
  const [nodes, setNodes, onNodesChange] = useNodesState(initialNodes);
  const [edges, setEdges, onEdgesChange] = useEdgesState(initialEdges);
  const [selectedNodeId, setSelectedNodeId] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const reactFlowWrapper = useRef<HTMLDivElement>(null);
  const [reactFlowInstance, setReactFlowInstance] = useState<any>(null);

  // Handle new connections between nodes
  const onConnect: OnConnect = useCallback(
    (params: Connection) => {
      // Check if source already has an edge (enforce single outgoing edge rule)
      const sourceHasEdge = edges.some((edge) => edge.source === params.source);
      if (sourceHasEdge) {
        setError("Each node can only have one outgoing connection");
        setTimeout(() => setError(null), 3000);
        return;
      }

      setEdges((eds) => addEdge(params, eds));
    },
    [edges, setEdges]
  );

  // Handle node selection
  const onNodeClick = useCallback((_: React.MouseEvent, node: Node) => {
    setSelectedNodeId(node.id);
  }, []);

  // Handle clicks on empty canvas (deselect nodes)
  const onPaneClick = useCallback(() => {
    setSelectedNodeId(null);
  }, []);

  // Handle drag over for drop functionality
  const onDragOver = useCallback((event: React.DragEvent) => {
    event.preventDefault();
    event.dataTransfer.dropEffect = "move";
  }, []);

  // Handle drop for adding new nodes
  const onDrop = useCallback(
    (event: React.DragEvent) => {
      event.preventDefault();

      const type = event.dataTransfer.getData("application/reactflow");
      if (typeof type === "undefined" || !type || !reactFlowInstance) {
        return;
      }

      const position = reactFlowInstance.screenToFlowPosition({
        x: event.clientX,
        y: event.clientY,
      });

      const newNode: Node = {
        id: `${type}-${Date.now()}`,
        type,
        position,
        data: {
          label: "Enter your message here...",
          onTextChange: updateNodeText,
        },
      };

      setNodes((nds) => nds.concat(newNode));
    },
    [reactFlowInstance, setNodes]
  );

  // Update node text from settings panel
  const updateNodeText = useCallback(
    (nodeId: string, newText: string) => {
      setNodes((nds) =>
        nds.map((node) => {
          if (node.id === nodeId) {
            return {
              ...node,
              data: {
                ...node.data,
                label: newText,
              },
            };
          }
          return node;
        })
      );
    },
    [setNodes]
  );

  // Handle node deletion
  const onNodesDelete: OnNodesDelete = useCallback(
    (deletedNodes) => {
      // If the selected node is being deleted, clear selection
      const deletedNodeIds = deletedNodes.map((node) => node.id);
      if (selectedNodeId && deletedNodeIds.includes(selectedNodeId)) {
        setSelectedNodeId(null);
      }
    },
    [selectedNodeId]
  );

  // Handle edge deletion
  const onEdgesDelete: OnEdgesDelete = useCallback(() => {
    // Clear any existing errors when edges are deleted
    setError(null);
  }, []);

  // Validate and save the flow
  const handleSave = useCallback(() => {
    // Clear existing errors
    setError(null);

    // If there's only one node or no nodes, save is always valid
    if (nodes.length <= 1) {
      alert("Flow saved successfully!");
      return;
    }

    // Count nodes without incoming edges (target handles)
    const nodeIds = nodes.map((node) => node.id);
    const nodesWithIncomingEdges = new Set(edges.map((edge) => edge.target));
    const nodesWithoutIncomingEdges = nodeIds.filter(
      (id) => !nodesWithIncomingEdges.has(id)
    );

    // If more than one node has no incoming edges, show error
    if (nodesWithoutIncomingEdges.length > 1) {
      setError("Cannot save Flow: More than one node has empty target handles");
      setTimeout(() => setError(null), 5000);
      return;
    }

    alert("Flow saved successfully!");
  }, [nodes, edges]);

  // Get selected node data for settings panel
  const selectedNode = nodes.find((node) => node.id === selectedNodeId);

  return (
    <div className="h-screen bg-gray-100 flex">
      {/* Error notification */}
      {error && <ErrorNotification message={error} />}

      {/* Main flow canvas */}
      <div className="flex-1" ref={reactFlowWrapper}>
        <ReactFlow
          nodes={nodes}
          edges={edges}
          onNodesChange={onNodesChange}
          onEdgesChange={onEdgesChange}
          onConnect={onConnect}
          onInit={setReactFlowInstance}
          onNodeClick={onNodeClick}
          onPaneClick={onPaneClick}
          onDrop={onDrop}
          onDragOver={onDragOver}
          onNodesDelete={onNodesDelete}
          onEdgesDelete={onEdgesDelete}
          nodeTypes={nodeTypes}
          fitView
          className="bg-gray-50"
        >
          <Background />
          <Controls />
          <MiniMap />
        </ReactFlow>
      </div>

      {/* Right sidebar - Nodes Panel or Settings Panel */}
      <div className="w-80 bg-white border-l border-gray-200 flex flex-col pt-3">
        {/* Save button */}
        <SaveButton onSave={handleSave} />
        {selectedNode ? (
          <SettingsPanel
            node={selectedNode}
            onBack={() => setSelectedNodeId(null)}
            onTextChange={updateNodeText}
          />
        ) : (
          <NodesPanel />
        )}
      </div>
    </div>
  );
}

// Wrap App with ReactFlowProvider
export default function AppWrapper() {
  return (
    <ReactFlowProvider>
      <App />
    </ReactFlowProvider>
  );
}
