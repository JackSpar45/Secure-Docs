import React from 'react';

function Card({ image, name, description }) {
  return (
    <div className='w-1/4 bg-zinc-100 rounded-md overflow-hidden shadow-lg transform transition-transform duration-300 hover:scale-105'>
      <img src={image} alt={name} className='w-full h-64 object-cover' />
      <div className='p-8'>
        <h2 className='text-xl font-semibold'>{name}</h2>
        <p className='text-gray-700'>{description}</p>
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
    <div className='w-full h-screen flex flex-wrap items-center justify-center gap-20'>
      {cards.map((card, index) => (
        <Card key={index} image={card.image} name={card.name} description={card.description} />
      ))}
    </div>
  );
}

export default CardContainer;
