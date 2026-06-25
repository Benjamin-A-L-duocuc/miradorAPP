import { http, HttpResponse } from "msw"
import { residentes, cuotas, pagos, solicitudes, visitantes, trabajadores, horarios, tareas, gastos, alertas } from "./data"

let nextId = { residente: 11, cuota: 14, pago: 6, solicitud: 6, visitante: 6, trabajador: 6, horario: 13, tarea: 4, gasto: 6, alerta: 4 }

function getNext(seq: keyof typeof nextId) {
  return nextId[seq]++
}

export const handlers = [
  http.post("/api/login", async ({ request }) => {
    const { email, password } = (await request.json()) as { email: string; password: string }
    if (email === "admin@edificio.com" && password === "admin123") {
      return HttpResponse.json({ id: 0, email, nombre: "Administrador", rol: "admin" })
    }
    return HttpResponse.json({ error: "Credenciales inválidas" }, { status: 401 })
  }),

  http.get("/api/residentes", () => HttpResponse.json(residentes)),
  http.get("/api/residentes/:id", ({ params }) => {
    const r = residentes.find((x) => x.id === Number(params.id))
    return r ? HttpResponse.json(r) : HttpResponse.json({ error: "No encontrado" }, { status: 404 })
  }),
  http.post("/api/residentes", async ({ request }) => {
    const body = (await request.json()) as Partial<typeof residentes[0]>
    const nuevo = { ...body, id: getNext("residente"), activo: true } as typeof residentes[0]
    residentes.push(nuevo)
    return HttpResponse.json(nuevo, { status: 201 })
  }),
  http.put("/api/residentes/:id", async ({ params, request }) => {
    const idx = residentes.findIndex((x) => x.id === Number(params.id))
    if (idx === -1) return HttpResponse.json({ error: "No encontrado" }, { status: 404 })
    const body = (await request.json()) as Partial<typeof residentes[0]>
    residentes[idx] = { ...residentes[idx], ...body }
    return HttpResponse.json(residentes[idx])
  }),
  http.delete("/api/residentes/:id", ({ params }) => {
    const idx = residentes.findIndex((x) => x.id === Number(params.id))
    if (idx === -1) return HttpResponse.json({ error: "No encontrado" }, { status: 404 })
    residentes.splice(idx, 1)
    return HttpResponse.json({ success: true })
  }),

  http.get("/api/cuotas", ({ request }) => {
    const url = new URL(request.url)
    const residenteId = url.searchParams.get("residenteId")
    let result = cuotas
    if (residenteId) result = cuotas.filter((c) => c.residenteId === Number(residenteId))
    return HttpResponse.json(result)
  }),

  http.get("/api/pagos", () => HttpResponse.json(pagos)),
  http.post("/api/pagos", async ({ request }) => {
    const body = (await request.json()) as Partial<typeof pagos[0]>
    const nuevo = { ...body, id: getNext("pago"), validado: true } as typeof pagos[0]
    pagos.push(nuevo)
    const cuota = cuotas.find((c) => c.id === body.cuotaId)
    if (cuota) cuota.estado = "pagado"
    return HttpResponse.json(nuevo, { status: 201 })
  }),

  http.get("/api/solicitudes", () => HttpResponse.json(solicitudes)),
  http.post("/api/solicitudes", async ({ request }) => {
    const body = (await request.json()) as Partial<typeof solicitudes[0]>
    const nuevo = { ...body, id: getNext("solicitud"), estado: "pendiente" } as typeof solicitudes[0]
    solicitudes.push(nuevo)
    return HttpResponse.json(nuevo, { status: 201 })
  }),
  http.put("/api/solicitudes/:id", async ({ params, request }) => {
    const idx = solicitudes.findIndex((x) => x.id === Number(params.id))
    if (idx === -1) return HttpResponse.json({ error: "No encontrado" }, { status: 404 })
    const body = (await request.json()) as Partial<typeof solicitudes[0]>
    solicitudes[idx] = { ...solicitudes[idx], ...body }
    return HttpResponse.json(solicitudes[idx])
  }),

  http.get("/api/visitantes", () => HttpResponse.json(visitantes)),
  http.post("/api/visitantes", async ({ request }) => {
    const body = (await request.json()) as Partial<typeof visitantes[0]>
    const nuevo = { ...body, id: getNext("visitante"), activo: true } as typeof visitantes[0]
    visitantes.push(nuevo)
    return HttpResponse.json(nuevo, { status: 201 })
  }),
  http.put("/api/visitantes/:id", async ({ params, request }) => {
    const idx = visitantes.findIndex((x) => x.id === Number(params.id))
    if (idx === -1) return HttpResponse.json({ error: "No encontrado" }, { status: 404 })
    const body = (await request.json()) as Partial<typeof visitantes[0]>
    visitantes[idx] = { ...visitantes[idx], ...body }
    return HttpResponse.json(visitantes[idx])
  }),

  http.get("/api/trabajadores", () => HttpResponse.json(trabajadores)),
  http.post("/api/trabajadores", async ({ request }) => {
    const body = (await request.json()) as Partial<typeof trabajadores[0]>
    const nuevo = { ...body, id: getNext("trabajador"), activo: true } as typeof trabajadores[0]
    trabajadores.push(nuevo)
    return HttpResponse.json(nuevo, { status: 201 })
  }),

  http.get("/api/horarios", ({ request }) => {
    const url = new URL(request.url)
    const trabajadorId = url.searchParams.get("trabajadorId")
    let result = horarios
    if (trabajadorId) result = horarios.filter((h) => h.trabajadorId === Number(trabajadorId))
    return HttpResponse.json(result)
  }),
  http.post("/api/horarios", async ({ request }) => {
    const body = (await request.json()) as Partial<typeof horarios[0]>
    const nuevo = { ...body, id: getNext("horario") } as typeof horarios[0]
    horarios.push(nuevo)
    return HttpResponse.json(nuevo, { status: 201 })
  }),

  http.get("/api/tareas", () => HttpResponse.json(tareas)),
  http.put("/api/tareas/:id", async ({ params, request }) => {
    const idx = tareas.findIndex((x) => x.id === Number(params.id))
    if (idx === -1) return HttpResponse.json({ error: "No encontrado" }, { status: 404 })
    const body = (await request.json()) as Partial<typeof tareas[0]>
    tareas[idx] = { ...tareas[idx], ...body }
    return HttpResponse.json(tareas[idx])
  }),

  http.get("/api/gastos", () => HttpResponse.json(gastos)),

  http.get("/api/alertas", ({ request }) => {
    const url = new URL(request.url)
    const residenteId = url.searchParams.get("residenteId")
    let result = alertas
    if (residenteId) result = alertas.filter((a) => a.residenteId === Number(residenteId))
    return HttpResponse.json(result)
  }),
  http.put("/api/alertas/:id", async ({ params }) => {
    const idx = alertas.findIndex((x) => x.id === Number(params.id))
    if (idx === -1) return HttpResponse.json({ error: "No encontrado" }, { status: 404 })
    alertas[idx] = { ...alertas[idx], leida: true }
    return HttpResponse.json(alertas[idx])
  }),

  http.get("/api/reportes/morosidad", () => {
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
    return HttpResponse.json(result)
  }),
]
