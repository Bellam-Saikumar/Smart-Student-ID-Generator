import React, { useState } from 'react';
import Select from 'react-select';
import { StudentData } from '../types';

const CLASS_OPTIONS = Array.from({ length: 12 }, (_, i) => ({ value: `${i + 1}`, label: `Class ${i + 1}` }));
const DIVISION_OPTIONS = ['A', 'B', 'C', 'D'].map(div => ({ value: div, label: div }));
const ALLERGY_OPTIONS = [
  { value: 'peanuts', label: 'Peanuts' },
  { value: 'dairy', label: 'Dairy' },
  { value: 'eggs', label: 'Eggs' },
  { value: 'gluten', label: 'Gluten' },
  { value: 'shellfish', label: 'Shellfish' }
];
const BUS_ROUTES = Array.from({ length: 10 }, (_, i) => ({ value: `${i + 1}`, label: `Route ${i + 1}` }));

interface Props {
  onSubmit: (data: StudentData) => void;
}

export default function StudentForm({ onSubmit }: Props) {
  const [formData, setFormData] = useState<StudentData>({
    name: '',
    rollNumber: '',
    class: '',
    division: '',
    allergies: [],
    photo: '',
    rackNumber: '',
    busRoute: ''
  });

  const handlePhotoUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setFormData(prev => ({ ...prev, photo: reader.result as string }));
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(formData);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6 max-w-2xl mx-auto p-6 bg-white rounded-lg shadow">
      <div>
        <label className="block text-sm font-medium text-gray-700">Name</label>
        <input
          type="text"
          required
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
          value={formData.name}
          onChange={e => setFormData(prev => ({ ...prev, name: e.target.value }))}
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700">Roll Number</label>
        <input
          type="text"
          required
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
          value={formData.rollNumber}
          onChange={e => setFormData(prev => ({ ...prev, rollNumber: e.target.value }))}
        />
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-700">Class</label>
          <Select
            options={CLASS_OPTIONS}
            value={CLASS_OPTIONS.find(opt => opt.value === formData.class)}
            onChange={option => setFormData(prev => ({ ...prev, class: option?.value || '' }))}
            className="mt-1"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">Division</label>
          <Select
            options={DIVISION_OPTIONS}
            value={DIVISION_OPTIONS.find(opt => opt.value === formData.division)}
            onChange={option => setFormData(prev => ({ ...prev, division: option?.value || '' }))}
            className="mt-1"
          />
        </div>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700">Allergies</label>
        <Select
          isMulti
          options={ALLERGY_OPTIONS}
          value={ALLERGY_OPTIONS.filter(opt => formData.allergies.includes(opt.value))}
          onChange={options => setFormData(prev => ({ ...prev, allergies: options.map(opt => opt.value) }))}
          className="mt-1"
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700">Photo</label>
        <input
          type="file"
          accept="image/*"
          required
          className="mt-1 block w-full"
          onChange={handlePhotoUpload}
        />
        {formData.photo && (
          <img src={formData.photo} alt="Preview" className="mt-2 h-32 w-32 object-cover rounded" />
        )}
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700">Rack Number</label>
        <input
          type="text"
          required
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
          value={formData.rackNumber}
          onChange={e => setFormData(prev => ({ ...prev, rackNumber: e.target.value }))}
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700">Bus Route</label>
        <Select
          options={BUS_ROUTES}
          value={BUS_ROUTES.find(opt => opt.value === formData.busRoute)}
          onChange={option => setFormData(prev => ({ ...prev, busRoute: option?.value || '' }))}
          className="mt-1"
        />
      </div>

      <button
        type="submit"
        className="w-full bg-indigo-600 text-white py-2 px-4 rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
      >
        Generate ID Card
      </button>
    </form>
  );
}