import React from 'react';
import { Check } from 'lucide-react';

const SuccessStories = () => {
  const stories = [
    {
      image: 'https://images.unsplash.com/photo-1488521787991-ed7bbaae773c?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80',
      title: 'New School in Rural Tanzania',
      description: 'Thanks to generous donors, we built a new school that now serves 500 children in a remote village.',
      impact: ['500 students enrolled', 'Computer lab established', '20 teachers employed', 'Graduation rate increased by 45%']
    },
    {
      image: 'https://images.unsplash.com/photo-1542810634-71277d95dcbb?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80',
      title: 'Medical Clinic in Honduras',
      description: 'A new medical facility providing healthcare to thousands who previously had no access to medical services.',
      impact: ['12,000 patients treated annually', 'Maternal mortality reduced by 60%', 'Vaccination rates increased to 95%', '24/7 emergency services']
    },
    {
      image: 'https://images.unsplash.com/photo-1469571486292-b53601010b89?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80',
      title: 'Clean Water Initiative in India',
      description: 'Installed water purification systems in 15 villages, providing clean drinking water to communities.',
      impact: ['30,000 people now have clean water', 'Waterborne diseases reduced by 80%', '15 local jobs created', 'Sustainable maintenance program established']
    }
  ];

  return (
    <section id="stories" className="py-16 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4">Success Stories</h2>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto">
            See how your donations have transformed lives and communities around the world.
          </p>
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {stories.map((story, index) => (
            <div key={index} className="bg-white rounded-lg shadow-lg overflow-hidden">
              <div 
                className="h-48 bg-cover bg-center" 
                style={{ backgroundImage: `url(${story.image})` }}
              ></div>
              <div className="p-6">
                <h3 className="text-xl font-bold text-gray-800 mb-3">{story.title}</h3>
                <p className="text-gray-600 mb-4">{story.description}</p>
                <h4 className="font-semibold text-gray-800 mb-2">Impact:</h4>
                <ul className="space-y-2">
                  {story.impact.map((item, i) => (
                    <li key={i} className="flex items-start">
                      <Check className="h-5 w-5 text-green-500 mr-2 flex-shrink-0 mt-0.5" />
                      <span className="text-gray-600">{item}</span>
                    </li>
                  ))}
                </ul>
                <button className="mt-6 w-full bg-indigo-600 hover:bg-indigo-700 text-white py-2 rounded-md font-medium transition duration-300">
                  Read Full Story
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default SuccessStories;