"use client"

import { useState, useEffect } from "react"
import { supabase } from "@/lib/supabase"

export default function Clients() {
  type ClientForm = {
  name: string
  age: string
  height: string
  start_weight: string
  goal: string
  notes: string
}

  const [clients, setClients] = useState<any[]>([])

  async function fetchClients() {
    const { data, error } = await supabase
      .from("clients")
      .select("*")

    if (error) {
      console.error(error)
      return
    }

    setClients(data)
  }

  useEffect(() => {
  fetchClients()
  }, [])

  

  const [form, setForm] = useState<ClientForm>({
    name: "",
    age: "",
    height:"",
    start_weight:"",
    goal: "",
    notes: ""
    })

  function handleChange(e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) {
    setForm({
      ...form,
      [e.target.name]: e.target.value
    })
  }

  async function addClient() {
    console.log(form,"form")
    const { error } = await supabase.from("clients").insert(form)

    if (error) {
      console.error(error)
      return
    }

    await fetchClients()

    setForm({
    name: "",
    age: "",
    height:"",
    start_weight:"",
    goal: "",
    notes: ""
    })
  }

  return (
    <div className="max-w-3xl mx-auto">

      <div className="bg-white shadow-lg rounded-lg p-8">

        <h1 className="text-2xl font-semibold mb-6 text-gray-800">
          Add New Client
        </h1>

        <div className="grid grid-cols-2 gap-6">

          {/* Name */}
          <div className="flex flex-col">
            <label className="text-sm font-medium text-gray-600 mb-1">
              Client Name
            </label>
            <input
              name="name"
              value={form.name}
              onChange={handleChange}
              placeholder="Name"
              className="border rounded-md p-2 focus:ring-2 focus:ring-blue-400 outline-none"
            />
          </div>

          {/* Age */}
          <div className="flex flex-col">
            <label className="text-sm font-medium text-gray-600 mb-1">
              Age
            </label>
            <input
              type="number"
              name="age"
              value={form.age}
              onChange={handleChange}
              placeholder="Age"
              className="border rounded-md p-2 focus:ring-2 focus:ring-blue-400 outline-none"
            />
          </div>

          {/* Height */}
          <div className="flex flex-col">
            <label className="text-sm font-medium text-gray-600 mb-1">
              Height (cm)
            </label>
            <input
              type="number"
              name="height"
              value={form.height}
              onChange={handleChange}
              placeholder="Height(cm)"
              className="border rounded-md p-2 focus:ring-2 focus:ring-blue-400 outline-none"
            />
          </div>

          {/* Start Weight */}
          <div className="flex flex-col">
            <label className="text-sm font-medium text-gray-600 mb-1">
              Starting Weight (kg)
            </label>
            <input
              type="number"
              name="start_weight"
              value={form.start_weight}
              onChange={handleChange}
              placeholder="Current Weight"
              className="border rounded-md p-2 focus:ring-2 focus:ring-blue-400 outline-none"
            />
          </div>

          {/* Goal */}
          <div className="flex flex-col col-span-2">
            <label className="text-sm font-medium text-gray-600 mb-1">
              Goal
            </label>
            <input
              name="goal"
              value={form.goal}
              onChange={handleChange}
              placeholder="Fat loss / Muscle gain"
              className="border rounded-md p-2 focus:ring-2 focus:ring-blue-400 outline-none"
            />
          </div>

          {/* Notes */}
          <div className="flex flex-col col-span-2">
            <label className="text-sm font-medium text-gray-600 mb-1">
              Notes
            </label>
            <textarea
              name="notes"
              value={form.notes}
              onChange={handleChange}
              placeholder="Lifestyle, injuries, diet notes..."
              rows={4}
              className="border rounded-md p-2 focus:ring-2 focus:ring-blue-400 outline-none"
            />
          </div>

        </div>

        {/* Button */}
        <div className="mt-6">
          <button
            onClick={addClient}
            className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-md font-medium transition"
          >
            Save Client
          </button>
        </div>

      </div>
      <div className="mt-10">

    <h2 className="text-xl text-black font-semibold mb-4">Clients</h2>

    <div className="space-y-3">

    {clients.map((client) => (

      <div
        key={client.id}
        className="p-4 border rounded-md flex justify-between"
      >

        <div>
          <p className="font-medium text-black">{client.name}</p>
          <p className="text-sm text-gray-500">{client.goal}</p>
        </div>

      </div>

    ))}

    </div>
    </div>
    </div>
  )
}