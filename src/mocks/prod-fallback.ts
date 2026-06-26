import {
  residentes, cuotas, pagos, solicitudes, visitantes,
  trabajadores, horarios, tareas, gastos, alertas,
} from "./data"

let nextId = {
  residente: 11, cuota: 14, pago: 6, solicitud: 6,
  visitante: 6, trabajador: 6, horario: 13, tarea: 4,
}

function seq(k: keyof typeof nextId) {
  return nextId[k]++
}

function match(pattern: string, path: string) {
  const pa = pattern.split("/")
  const pb = path.split("/")
  if (pa.length !== pb.length) return null
  const params: Record<string, string> = {}
  for (let i = 0; i < pa.length; i++) {
    if (pa[i].startsWith(":")) params[pa[i].slice(1)] = pb[i]
    else if (pa[i] !== pb[i]) return null
  }
  return params
}

function json(data: unknown, status = 200) {
  return new Response(JSON.stringify(data), {
    status,
    headers: { "Content-Type": "application/json" },
  })
}

const origFetch = window.fetch.bind(window)

window.fetch = async (input, init) => {
  const req = input instanceof Request ? input : new Request(input, init)
  const url = new URL(req.url)
  const path = url.pathname
  const method = req.method
  let body: unknown
  try { body = await req.clone().json() } catch { /* ignore */ }

  const res = route(method, path, body, url)
  if (res) return res

  return origFetch(input, init)
}

function route(method: string, path: string, body: unknown, url: URL): Response | null {
  const g = <T>(arr: T[]) => json(arr)

  // Login
  if (path === "/api/login" && method === "POST") {
    const { email, password } = (body || {}) as Record<string, string>
    if (email === "admin@edificio.com" && password === "admin123") {
      return json({ id: 0, email, nombre: "Administrador", rol: "admin" })
    }
    return json({ error: "Credenciales inválidas" }, 401)
  }

  // Residentes
  if (path === "/api/residentes" && method === "GET") return g(residentes)
  if (path === "/api/residentes" && method === "POST") {
    const nuevo = { ...(body as object), id: seq("residente"), activo: true } as typeof residentes[0]
    residentes.push(nuevo)
    return json(nuevo, 201)
  }
  const rId = match("/api/residentes/:id", path)
  if (rId) {
    const id = Number(rId.id)
    const idx = residentes.findIndex((x) => x.id === id)
    if (idx === -1) return json({ error: "No encontrado" }, 404)
    if (method === "GET") return json(residentes[idx])
    if (method === "PUT") {
      residentes[idx] = { ...residentes[idx], ...(body as object) }
      return json(residentes[idx])
    }
    if (method === "DELETE") {
      residentes.splice(idx, 1)
      return json({ success: true })
    }
  }

  // Cuotas
  if (path === "/api/cuotas" && method === "GET") {
    const residenteId = url.searchParams.get("residenteId")
    const result = residenteId ? cuotas.filter((c) => c.residenteId === Number(residenteId)) : cuotas
    return json(result)
  }

  // Pagos
  if (path === "/api/pagos" && method === "GET") return g(pagos)
  if (path === "/api/pagos" && method === "POST") {
    const p = body as Partial<typeof pagos[0]>
    const nuevo = { ...p, id: seq("pago"), validado: true } as typeof pagos[0]
    pagos.push(nuevo)
    const cuota = cuotas.find((c) => c.id === p.cuotaId)
    if (cuota) cuota.estado = "pagado"
    return json(nuevo, 201)
  }

  // Solicitudes
  if (path === "/api/solicitudes" && method === "GET") return g(solicitudes)
  if (path === "/api/solicitudes" && method === "POST") {
    const s = body as Partial<typeof solicitudes[0]>
    const nuevo = { ...s, id: seq("solicitud"), estado: "pendiente" } as typeof solicitudes[0]
    solicitudes.push(nuevo)
    return json(nuevo, 201)
  }
  const sId = match("/api/solicitudes/:id", path)
  if (sId && method === "PUT") {
    const idx = solicitudes.findIndex((x) => x.id === Number(sId.id))
    if (idx === -1) return json({ error: "No encontrado" }, 404)
    solicitudes[idx] = { ...solicitudes[idx], ...(body as object) }
    return json(solicitudes[idx])
  }

  // Visitantes
  if (path === "/api/visitantes" && method === "GET") return g(visitantes)
  if (path === "/api/visitantes" && method === "POST") {
    const v = body as Partial<typeof visitantes[0]>
    const nuevo = { ...v, id: seq("visitante"), activo: true } as typeof visitantes[0]
    visitantes.push(nuevo)
    return json(nuevo, 201)
  }
  const vId = match("/api/visitantes/:id", path)
  if (vId && method === "PUT") {
    const idx = visitantes.findIndex((x) => x.id === Number(vId.id))
    if (idx === -1) return json({ error: "No encontrado" }, 404)
    visitantes[idx] = { ...visitantes[idx], ...(body as object) }
    return json(visitantes[idx])
  }

  // Trabajadores
  if (path === "/api/trabajadores" && method === "GET") return g(trabajadores)
  if (path === "/api/trabajadores" && method === "POST") {
    const t = body as Partial<typeof trabajadores[0]>
    const nuevo = { ...t, id: seq("trabajador"), activo: true } as typeof trabajadores[0]
    trabajadores.push(nuevo)
    return json(nuevo, 201)
  }

  // Horarios
  if (path === "/api/horarios" && method === "GET") {
    const trabajadorId = url.searchParams.get("trabajadorId")
    const result = trabajadorId ? horarios.filter((h) => h.trabajadorId === Number(trabajadorId)) : horarios
    return json(result)
  }
  if (path === "/api/horarios" && method === "POST") {
    const h = body as Partial<typeof horarios[0]>
    const nuevo = { ...h, id: seq("horario") } as typeof horarios[0]
    horarios.push(nuevo)
    return json(nuevo, 201)
  }

  // Tareas
  if (path === "/api/tareas" && method === "GET") return g(tareas)
  const tId = match("/api/tareas/:id", path)
  if (tId && method === "PUT") {
    const idx = tareas.findIndex((x) => x.id === Number(tId.id))
    if (idx === -1) return json({ error: "No encontrado" }, 404)
    tareas[idx] = { ...tareas[idx], ...(body as object) }
    return json(tareas[idx])
  }

  // Gastos
  if (path === "/api/gastos" && method === "GET") return g(gastos)

  // Alertas
  if (path === "/api/alertas" && method === "GET") {
    const residenteId = url.searchParams.get("residenteId")
    const result = residenteId ? alertas.filter((a) => a.residenteId === Number(residenteId)) : alertas
    return json(result)
  }
  const aId = match("/api/alertas/:id", path)
  if (aId && method === "PUT") {
    const idx = alertas.findIndex((x) => x.id === Number(aId.id))
    if (idx === -1) return json({ error: "No encontrado" }, 404)
    alertas[idx] = { ...alertas[idx], leida: true }
    return json(alertas[idx])
  }

  // Reportes
  if (path === "/api/reportes/morosidad" && method === "GET") {
    const morosos = cuotas.filter((c) => c.estado === "moroso")
    const grouped = new Map<number, { total: number; meses: string[] }>()
    morosos.forEach((c) => {
      const g = grouped.get(c.residenteId) || { total: 0, meses: [] }
      g.total += c.montoTotal
      g.meses.push(c.periodo)
      grouped.set(c.residenteId, g)
    })
    const result = Array.from(grouped.entries()).map(([residenteId, data]) => {
      const res = residentes.find((r) => r.id === residenteId)
      return {
        residenteId,
        nombre: res?.nombre ?? "Desconocido",
        unidad: res?.unidad ?? "",
        deudaTotal: data.total,
        diasMora: 45,
        mesesAdeudados: data.meses,
      }
    })
    return json(result)
  }

  return null
}
