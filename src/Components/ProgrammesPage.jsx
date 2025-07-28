import React from 'react';

const programData = [
  {
    title: 'Education',
    description: 'We offer comprehensive educational programs, tutoring, and academic support for all ages.',
    points: [
      'Academic tutoring',
      'Life skills training',
      'Vocational programs',
      'College preparation',
    ],
    icon: '🎓',
    image: 'https://cdn.pixabay.com/photo/2017/02/14/11/07/comic-book-2065075_1280.jpg',
    bgColor: 'bg-indigo-100',
  },
  {
    title: 'Nutrition & Health',
    description: 'We provide meals, health checkups, and hygiene education to ensure every child thrives.',
    points: [
      'Nutritious meals daily',
      'Regular health checkups',
      'Hygiene education',
    ],
    icon: '🥗',
    image: 'https://cdn.pixabay.com/photo/2017/05/15/08/28/ultrasound-2319943_1280.jpg',
    bgColor: 'bg-purple-100',
  },
  {
    title: 'Family Reunification',
    description: 'Supporting families to safely reunite when possible, with ongoing support services.',
    points: [
      'Family counseling',
      'Parenting classes',
      'Transition support',
      'Follow-up services',
    ],
    icon: '👨‍👩‍👧‍👦',
    image: 'https://cdn.pixabay.com/photo/2016/11/21/15/46/sunset-1846227_1280.jpg',
    bgColor: 'bg-orange-100',
  },
  {
    title: 'Counseling & Guiding',
    description: 'Licensed counselors helping kids heal from trauma, build confidence, and plan for the future.',
    points: [
      'One-on-one therapy',
      'Group sessions',
      'Mental health workshops',
    ],
    icon: '🧠',
    image: 'https://cdn.pixabay.com/photo/2020/05/22/12/47/psychology-5201487_1280.jpg',
    bgColor: 'bg-violet-200',
  },
];

function ProgrammesPage() {
  return (
    <div className="py-10 px-4 md:px-16 bg-gray-50">
      <div className="text-center mb-12">
        <h2 className="text-3xl font-semibold text-gray-800">Our Programs</h2>
        <p className="mt-2 text-gray-600 max-w-2xl mx-auto">
          We offer tailored programs to help children grow emotionally, mentally, and socially.
        </p>
      </div>

      <div className="space-y-10">
        {programData.map((program, index) => (
          <div
            key={index}
            className={`rounded-xl flex flex-col md:flex-row justify-between items-center p-6 shadow-md ${program.bgColor}`}
          >
            <div className="md:w-2/3 w-full">
              <h3 className="text-xl font-bold mb-2 flex items-center gap-2 text-gray-800">
                <span className="text-2xl">{program.icon}</span> {program.title}
              </h3>
              <p className="text-gray-700 mb-2">{program.description}</p>
              <ul className="list-disc list-inside text-gray-700 space-y-1 pl-2">
                {program.points.map((point, i) => (
                  <li key={i}>{point}</li>
                ))}
              </ul>
            </div>

            <div className="md:w-1/3 w-full mt-6 md:mt-0 md:pl-6">
              <img
                src={program.image}
                alt={program.title}
                className="w-full h-56 object-cover rounded-md"
              />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default ProgrammesPage;
