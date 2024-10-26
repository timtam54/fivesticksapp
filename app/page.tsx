'use client'

import { useState, useEffect } from 'react'
import { Search } from 'lucide-react'
import Header from '@/components/header'

// Define types for our data
type Location = string
type Equipment = {
  id: number
  name: string
  location: Location
  status: 'Available' | 'In Use' | 'Maintenance'
}

// Sample data
const locations: Location[] = ['Office', 'Warehouse', 'Factory', 'Laboratory']
const equipmentData: Equipment[] = [
  { id: 1, name: 'Laptop', location: 'Office', status: 'Available' },
  { id: 2, name: 'Forklift', location: 'Warehouse', status: 'In Use' },
  { id: 3, name: 'Microscope', location: 'Laboratory', status: 'Maintenance' },
  { id: 4, name: 'Drill Press', location: 'Factory', status: 'Available' },
  { id: 5, name: 'Projector', location: 'Office', status: 'In Use' },
  { id: 6, name: 'Pallet Jack', location: 'Warehouse', status: 'Available' },
  { id: 7, name: 'Centrifuge', location: 'Laboratory', status: 'Available' },
  { id: 8, name: 'CNC Machine', location: 'Factory', status: 'Maintenance' },
]

export default function EquipmentManagement() {
  const [selectedLocation, setSelectedLocation] = useState<Location | 'All'>('All')
  const [searchTerm, setSearchTerm] = useState('')
  const [filteredEquipment, setFilteredEquipment] = useState(equipmentData)

  useEffect(() => {
    const filtered = equipmentData.filter((item) => {
      const locationMatch = selectedLocation === 'All' || item.location === selectedLocation
      const searchMatch = item.name.toLowerCase().includes(searchTerm.toLowerCase())
      return locationMatch && searchMatch
    })
    setFilteredEquipment(filtered)
  }, [selectedLocation, searchTerm])

  return (
    <>
    <Header activePage={'Home'}/>
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6">Equipment Management System</h1>
      
      <div className="flex flex-col sm:flex-row gap-4 mb-6">
        <div className="w-full sm:w-1/3">
          <label htmlFor="location" className="block text-sm font-medium text-gray-700 mb-1">
            Select Location
          </label>
          <select
            id="location"
            className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            value={selectedLocation}
            onChange={(e) => setSelectedLocation(e.target.value as Location | 'All')}
          >
            <option value="All">All Locations</option>
            {locations.map((location) => (
              <option key={location} value={location}>
                {location}
              </option>
            ))}
          </select>
        </div>
        
        <div className="w-full sm:w-2/3">
          <label htmlFor="search" className="block text-sm font-medium text-gray-700 mb-1">
            Search Equipment
          </label>
          <div className="relative">
            <input
              type="text"
              id="search"
              className="w-full p-2 pl-10 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              placeholder="Search by equipment name..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
          </div>
        </div>
      </div>

      <div className="bg-white shadow-md rounded-lg overflow-hidden">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Name</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Location</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {filteredEquipment.map((item) => (
              <tr key={item.id}>
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{item.name}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{item.location}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full 
                    ${item.status === 'Available' ? 'bg-green-100 text-green-800' : 
                      item.status === 'In Use' ? 'bg-yellow-100 text-yellow-800' : 
                      'bg-red-100 text-red-800'}`}>
                    {item.status}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      
      {filteredEquipment.length === 0 && (
        <p className="text-center text-gray-500 mt-4">No equipment found matching the current filters.</p>
      )}
    </div>
    </>
  )
}