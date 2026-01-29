import React from 'react';
const trainers = [
{
  name: 'Dr. James Wilson',
  role: 'Math Specialist',
  image:
  'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80',
  color: 'bg-yellow-100'
},
{
  name: 'Sarah Palmer',
  role: 'Verbal Expert',
  image:
  'https://images.unsplash.com/photo-1580489944761-15a19d654956?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80',
  color: 'bg-green-100'
},
{
  name: 'Marcus Thompson',
  role: 'Strategy Coach',
  image:
  'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80',
  color: 'bg-orange-100'
},
{
  name: 'Elena Rodriguez',
  role: 'Writing Specialist',
  image:
  'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80',
  color: 'bg-blue-100'
}];

export function Trainers() {
  return (
    <section className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-[var(--color-text-dark)] mb-4">
            Courses trainers at Edufy.
          </h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Learn from the best. Our instructors are top scorers and experienced
            educators dedicated to your success.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {trainers.map((trainer, index) =>
          <div key={index} className="group text-center">
              <div
              className={`relative mb-6 rounded-2xl overflow-hidden aspect-square ${trainer.color}`}>

                <img
                src={trainer.image}
                alt={trainer.name}
                className="w-full h-full object-cover mix-blend-multiply filter grayscale group-hover:grayscale-0 transition-all duration-500" />

              </div>
              <h3 className="text-xl font-bold text-[var(--color-text-dark)] mb-1">
                {trainer.name}
              </h3>
              <p className="text-gray-500">{trainer.role}</p>
            </div>
          )}
        </div>
      </div>
    </section>);

}