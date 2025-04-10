import { useState, useEffect } from 'react';
import StudentForm from './components/StudentForm';
import IDCard from './components/IDCard';
import { StudentData, Template } from './types';
import { Layout } from 'lucide-react';

const TEMPLATES: Template[] = [
  { id: 'modern', name: 'Modern' },
  { id: 'classic', name: 'Classic' }
];

function App() {
  const [studentData, setStudentData] = useState<StudentData | null>(null);
  const [selectedTemplate, setSelectedTemplate] = useState<Template>(TEMPLATES[0]);
  const [savedCards, setSavedCards] = useState<StudentData[]>([]);

  useEffect(() => {
    const saved = localStorage.getItem('savedCards');
    if (saved) {
      setSavedCards(JSON.parse(saved));
    }
  }, []);

  const handleSubmit = (data: StudentData) => {
    setStudentData(data);
    const newSavedCards = [...savedCards, data];
    setSavedCards(newSavedCards);
    localStorage.setItem('savedCards', JSON.stringify(newSavedCards));
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex items-center justify-center gap-2 mb-8">
          <Layout className="w-8 h-8 text-indigo-600" />
          <h1 className="text-3xl font-bold text-gray-900">Smart Student ID Generator</h1>
        </div>

        {!studentData ? (
          <StudentForm onSubmit={handleSubmit} />
        ) : (
          <div>
            <div className="mb-6 flex justify-between items-center">
              <select
                value={selectedTemplate.id}
                onChange={(e) => setSelectedTemplate(TEMPLATES.find(t => t.id === e.target.value) || TEMPLATES[0])}
                className="rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
              >
                {TEMPLATES.map(template => (
                  <option key={template.id} value={template.id}>
                    {template.name} Template
                  </option>
                ))}
              </select>
              <button
                onClick={() => setStudentData(null)}
                className="text-indigo-600 hover:text-indigo-800"
              >
                Create New Card
              </button>
            </div>
            <IDCard student={studentData} template={selectedTemplate} />
          </div>
        )}

        {savedCards.length > 0 && !studentData && (
          <div className="mt-12">
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">Previously Generated Cards</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {savedCards.map((card, index) => (
                <div
                  key={index}
                  className="bg-white p-4 rounded-lg shadow cursor-pointer hover:shadow-lg transition-shadow"
                  onClick={() => setStudentData(card)}
                >
                  <div className="flex items-center gap-4">
                    <img
                      src={card.photo}
                      alt={card.name}
                      className="w-16 h-16 rounded-full object-cover"
                    />
                    <div>
                      <h3 className="font-semibold">{card.name}</h3>
                      <p className="text-sm text-gray-600">Class {card.class}-{card.division}</p>
                      <p className="text-sm text-gray-600">Roll No: {card.rollNumber}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default App;