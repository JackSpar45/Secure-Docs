import React from 'react';

function Card({ image, name, description }) {
  return (
    <div className='w-full bg-white rounded-lg overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300 ease-in-out hover:-translate-y-2 group h-full flex flex-col'>
      <div className='aspect-video overflow-hidden flex-shrink-0'>
        <img 
          src={image} 
          alt={name} 
          className='w-full h-full object-cover group-hover:scale-105 transition-transform duration-300'
        />
      </div>
      <div className='p-4 md:p-6 flex flex-col flex-grow'>
        <h2 className='text-lg md:text-xl font-bold text-gray-800 mb-2'>{name}</h2>
        <p className='text-sm md:text-base text-gray-600 leading-snug line-clamp-4'>
          {description}
        </p>
      </div>
    </div>
  );
}

function CardContainer() {
  const cards = [ 
    { image: '/images/card1.jpg', name: 'Data Encryption', description: 'Enhanced data security through encryption.Ensures secure data encryption before sharing. Only authorized parties with the decryption keys can access the data.' },

     { image: '/images/card2.jpg', name: 'Decentralized Storage', description: 'Decentralized storage ensures security and scalability by distributing encrypted data across a network of nodes, leveraging blockchain technology.' },

     { image: '/images/card3.jpg', name: 'Secure File Sharing', description: 'Our platform now supports secure file sharing, leveraging blockchain technology for transparency and security without intermediaries.' },

     { image: '/images/card4.jpg', name: 'Multi-Factor Authentication ', description: 'Multi-Factor Authentication (MFA) enhances security by requiring multiple verification methods before granting access, combining something you know, have, and are.' },

     { image: '/images/card5.jpg', name: 'Audit Trails', description: 'Audit trails provide a chronological record of system activities, enhancing accountability and security by tracking user actions and system events.' },
    
     { image: '/images/card6.jpg', name: 'Incentivized Storage', description: 'Incentivized storage rewards participants with tokens for providing storage space, ensuring a scalable and cost-effective decentralized storage network.' },
   ];

  return (
    <div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12'>
      <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 xl:gap-8'>
        {cards.map((card, index) => (
          <Card 
            key={index} 
            image={card.image} 
            name={card.name} 
            description={card.description} 
          />
        ))}
      </div>
    </div>
  );
}
export default CardContainer;
