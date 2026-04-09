"use client"

import { useEffect, useRef, useState, useCallback } from "react"
import { motion, AnimatePresence } from "framer-motion"

interface Node {
  id: string
  x: number
  y: number
  vx: number
  vy: number
  radius: number
  label: string
  color: string
}

interface Edge {
  from: string
  to: string
}

interface DataPacket {
  id: string
  fromX: number
  fromY: number
  toX: number
  toY: number
  progress: number
}

const NODE_LABELS = [
  "API Gateway",
  "Auth Service",
  "User DB",
  "Cache",
  "Queue",
  "Worker",
  "CDN",
  "Storage",
  "Analytics",
  "Logs",
]

const COLORS = [
  "rgba(45, 212, 191, 0.85)",
  "rgba(45, 212, 191, 0.7)",
  "rgba(94, 234, 212, 0.8)",
  "rgba(45, 212, 191, 0.65)",
  "rgba(20, 184, 166, 0.8)",
]

export function NodeGraph() {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const containerRef = useRef<HTMLDivElement>(null)
  const animationRef = useRef<number | null>(null)
  const nodesRef = useRef<Node[]>([])
  const edgesRef = useRef<Edge[]>([])
  const packetsRef = useRef<DataPacket[]>([])
  const mouseRef = useRef({ x: 0, y: 0 })
  const [dimensions, setDimensions] = useState({ width: 0, height: 0 })
  const [hoveredNode, setHoveredNode] = useState<Node | null>(null)

  // Initialize nodes
  const initializeNodes = useCallback((width: number, height: number) => {
    const nodes: Node[] = []
    const nodeCount = Math.min(10, Math.floor((width * height) / 40000))
    
    for (let i = 0; i < nodeCount; i++) {
      nodes.push({
        id: `node-${i}`,
        x: Math.random() * (width - 100) + 50,
        y: Math.random() * (height - 100) + 50,
        vx: (Math.random() - 0.5) * 0.5,
        vy: (Math.random() - 0.5) * 0.5,
        radius: Math.random() * 8 + 6,
        label: NODE_LABELS[i % NODE_LABELS.length],
        color: COLORS[i % COLORS.length],
      })
    }

    // Create edges between nearby nodes
    const edges: Edge[] = []
    for (let i = 0; i < nodes.length; i++) {
      for (let j = i + 1; j < nodes.length; j++) {
        const dx = nodes[i].x - nodes[j].x
        const dy = nodes[i].y - nodes[j].y
        const dist = Math.sqrt(dx * dx + dy * dy)
        if (dist < 200) {
          edges.push({ from: nodes[i].id, to: nodes[j].id })
        }
      }
    }

    nodesRef.current = nodes
    edgesRef.current = edges
  }, [])

  // Handle click to send data packet
  const handleClick = useCallback((e: MouseEvent) => {
    const rect = canvasRef.current?.getBoundingClientRect()
    if (!rect) return

    const clickX = e.clientX - rect.left
    const clickY = e.clientY - rect.top

    // Find closest node to click
    let closestNode: Node | null = null
    let closestDist = Infinity

    for (const node of nodesRef.current) {
      const dx = node.x - clickX
      const dy = node.y - clickY
      const dist = Math.sqrt(dx * dx + dy * dy)
      if (dist < closestDist && dist < 100) {
        closestDist = dist
        closestNode = node
      }
    }

    if (closestNode && edgesRef.current.length > 0) {
      // Send packet along random edges
      const relevantEdges = edgesRef.current.filter(
        (e) => e.from === closestNode!.id || e.to === closestNode!.id
      )
      
      if (relevantEdges.length > 0) {
        const edge = relevantEdges[Math.floor(Math.random() * relevantEdges.length)]
        const fromNode = nodesRef.current.find((n) => n.id === edge.from)
        const toNode = nodesRef.current.find((n) => n.id === edge.to)
        
        if (fromNode && toNode) {
          packetsRef.current.push({
            id: `packet-${Date.now()}-${Math.random()}`,
            fromX: fromNode.x,
            fromY: fromNode.y,
            toX: toNode.x,
            toY: toNode.y,
            progress: 0,
          })
        }
      }
    }
  }, [])

  // Animation loop
  const animate = useCallback(() => {
    const canvas = canvasRef.current
    const ctx = canvas?.getContext("2d")
    if (!canvas || !ctx) return

    const { width, height } = dimensions
    ctx.clearRect(0, 0, width, height)

    const nodes = nodesRef.current
    const edges = edgesRef.current
    const packets = packetsRef.current

    // Update node positions with mouse repulsion
    for (const node of nodes) {
      // Mouse repulsion
      const dx = node.x - mouseRef.current.x
      const dy = node.y - mouseRef.current.y
      const dist = Math.sqrt(dx * dx + dy * dy)
      
      if (dist < 150 && dist > 0) {
        const force = (150 - dist) / 150
        node.vx += (dx / dist) * force * 0.3
        node.vy += (dy / dist) * force * 0.3
      }

      // Apply velocity with damping
      node.x += node.vx
      node.y += node.vy
      node.vx *= 0.98
      node.vy *= 0.98

      // Boundary collision
      if (node.x < node.radius || node.x > width - node.radius) {
        node.vx *= -0.8
        node.x = Math.max(node.radius, Math.min(width - node.radius, node.x))
      }
      if (node.y < node.radius || node.y > height - node.radius) {
        node.vy *= -0.8
        node.y = Math.max(node.radius, Math.min(height - node.radius, node.y))
      }

      // Gentle random movement
      node.vx += (Math.random() - 0.5) * 0.02
      node.vy += (Math.random() - 0.5) * 0.02
    }

    // Draw edges
    ctx.strokeStyle = "rgba(45, 212, 191, 0.12)"
    ctx.lineWidth = 1

    for (const edge of edges) {
      const fromNode = nodes.find((n) => n.id === edge.from)
      const toNode = nodes.find((n) => n.id === edge.to)
      
      if (fromNode && toNode) {
        const dx = fromNode.x - toNode.x
        const dy = fromNode.y - toNode.y
        const dist = Math.sqrt(dx * dx + dy * dy)
        
        if (dist < 250) {
          const opacity = Math.max(0, (250 - dist) / 250) * 0.25
          ctx.strokeStyle = `rgba(45, 212, 191, ${opacity})`
          ctx.beginPath()
          ctx.moveTo(fromNode.x, fromNode.y)
          ctx.lineTo(toNode.x, toNode.y)
          ctx.stroke()
        }
      }
    }

    // Draw and update packets
    for (let i = packets.length - 1; i >= 0; i--) {
      const packet = packets[i]
      packet.progress += 0.02

      if (packet.progress >= 1) {
        packets.splice(i, 1)
        continue
      }

      const x = packet.fromX + (packet.toX - packet.fromX) * packet.progress
      const y = packet.fromY + (packet.toY - packet.fromY) * packet.progress
      
      // Glowing packet
      const gradient = ctx.createRadialGradient(x, y, 0, x, y, 10)
      gradient.addColorStop(0, "rgba(45, 212, 191, 1)")
      gradient.addColorStop(0.5, "rgba(45, 212, 191, 0.4)")
      gradient.addColorStop(1, "rgba(45, 212, 191, 0)")
      
      ctx.fillStyle = gradient
      ctx.beginPath()
      ctx.arc(x, y, 10, 0, Math.PI * 2)
      ctx.fill()

      // Trail
      ctx.strokeStyle = "rgba(45, 212, 191, 0.5)"
      ctx.lineWidth = 2
      ctx.setLineDash([4, 4])
      ctx.beginPath()
      ctx.moveTo(packet.fromX, packet.fromY)
      ctx.lineTo(x, y)
      ctx.stroke()
      ctx.setLineDash([])
    }

    // Draw nodes
    for (const node of nodes) {
      // Outer glow
      const gradient = ctx.createRadialGradient(
        node.x,
        node.y,
        0,
        node.x,
        node.y,
        node.radius * 3
      )
      gradient.addColorStop(0, node.color.replace("0.9", "0.4"))
      gradient.addColorStop(1, "rgba(45, 212, 191, 0)")
      ctx.fillStyle = gradient
      ctx.beginPath()
      ctx.arc(node.x, node.y, node.radius * 3, 0, Math.PI * 2)
      ctx.fill()

      // Core
      ctx.fillStyle = node.color
      ctx.beginPath()
      ctx.arc(node.x, node.y, node.radius, 0, Math.PI * 2)
      ctx.fill()

      // Inner highlight
      ctx.fillStyle = "rgba(255, 255, 255, 0.3)"
      ctx.beginPath()
      ctx.arc(node.x - node.radius * 0.3, node.y - node.radius * 0.3, node.radius * 0.4, 0, Math.PI * 2)
      ctx.fill()
    }

    animationRef.current = requestAnimationFrame(animate)
  }, [dimensions])

  // Handle mouse move
  const handleMouseMove = useCallback((e: MouseEvent) => {
    const rect = canvasRef.current?.getBoundingClientRect()
    if (!rect) return
    
    mouseRef.current = {
      x: e.clientX - rect.left,
      y: e.clientY - rect.top,
    }

    // Check if hovering over a node
    let foundNode: Node | null = null
    for (const node of nodesRef.current) {
      const dx = node.x - mouseRef.current.x
      const dy = node.y - mouseRef.current.y
      const dist = Math.sqrt(dx * dx + dy * dy)
      if (dist < node.radius * 2) {
        foundNode = node
        break
      }
    }
    setHoveredNode(foundNode)
  }, [])

  // Setup and cleanup
  useEffect(() => {
    const container = containerRef.current
    if (!container) return

    const updateDimensions = () => {
      const rect = container.getBoundingClientRect()
      setDimensions({ width: rect.width, height: rect.height })
      initializeNodes(rect.width, rect.height)
    }

    updateDimensions()
    window.addEventListener("resize", updateDimensions)

    return () => {
      window.removeEventListener("resize", updateDimensions)
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current)
      }
    }
  }, [initializeNodes])

  // Start animation
  useEffect(() => {
    if (dimensions.width > 0 && dimensions.height > 0) {
      animate()
    }

    return () => {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current)
      }
    }
  }, [dimensions, animate])

  // Event listeners
  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    canvas.addEventListener("mousemove", handleMouseMove)
    canvas.addEventListener("click", handleClick)

    return () => {
      canvas.removeEventListener("mousemove", handleMouseMove)
      canvas.removeEventListener("click", handleClick)
    }
  }, [handleMouseMove, handleClick])

  return (
    <div ref={containerRef} className="absolute inset-0 overflow-hidden">
      <canvas
        ref={canvasRef}
        width={dimensions.width}
        height={dimensions.height}
        className="h-full w-full"
        style={{ cursor: "none" }}
      />
      
      {/* Node label tooltip */}
      <AnimatePresence>
        {hoveredNode && (
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9 }}
            className="pointer-events-none absolute z-10 rounded-lg bg-card/90 px-3 py-1.5 text-sm font-medium text-card-foreground backdrop-blur-sm"
            style={{
              left: hoveredNode.x + 20,
              top: hoveredNode.y - 10,
            }}
          >
            {hoveredNode.label}
          </motion.div>
        )}
      </AnimatePresence>

      {/* Click hint */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2 }}
        className="absolute bottom-4 left-4 text-xs text-muted-foreground"
      >
        Click near nodes to simulate data flow
      </motion.div>
    </div>
  )
}
