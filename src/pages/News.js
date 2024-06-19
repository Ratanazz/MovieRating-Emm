import React from 'react';
import NewsCard from '../components/NewsCard'; // Import the NewsCard component

const newsData = [
    {
      id: 1,
    title: 'Avatar Sequel Release Date Announced',
    description: 'The highly anticipated sequel to James Cameron\'s groundbreaking film "Avatar" has finally received a confirmed release date. After years of speculation and delays, fans can rejoice as "Avatar 2" is set to hit theaters on December 16, 2022. Director James Cameron has promised an even more immersive experience, with groundbreaking visual effects and an expansion of the vibrant world of Pandora. The original "Avatar" film, released in 2009, became the highest-grossing film of all time, and expectations are high for its sequel. Stay tuned for more updates as the release date approaches!',
    imageUrl: 'https://www.sakshipost.com/sites/default/files/article_images/2022/04/27/avatar.jpg',
    imagePosition: 'left'
    },
    {
      id: 1,
    title: 'Avatar Sequel Release Date Announced',
    description: 'The highly anticipated sequel to James Cameron\'s groundbreaking film "Avatar" has finally received a confirmed release date. After years of speculation and delays, fans can rejoice as "Avatar 2" is set to hit theaters on December 16, 2022. Director James Cameron has promised an even more immersive experience, with groundbreaking visual effects and an expansion of the vibrant world of Pandora. The original "Avatar" film, released in 2009, became the highest-grossing film of all time, and expectations are high for its sequel. Stay tuned for more updates as the release date approaches!',
    imageUrl: 'https://www.sakshipost.com/sites/default/files/article_images/2022/04/27/avatar.jpg',
    imagePosition: 'left'
    },
    {
      id: 1,
    title: 'Avatar Sequel Release Date Announced',
    description: 'The highly anticipated sequel to James Cameron\'s groundbreaking film "Avatar" has finally received a confirmed release date. After years of speculation and delays, fans can rejoice as "Avatar 2" is set to hit theaters on December 16, 2022. Director James Cameron has promised an even more immersive experience, with groundbreaking visual effects and an expansion of the vibrant world of Pandora. The original "Avatar" film, released in 2009, became the highest-grossing film of all time, and expectations are high for its sequel. Stay tuned for more updates as the release date approaches!',
    imageUrl: 'https://www.sakshipost.com/sites/default/files/article_images/2022/04/27/avatar.jpg',
    imagePosition: 'left'
    },
    {
      id: 1,
    title: 'Avatar Sequel Release Date Announced',
    description: 'The highly anticipated sequel to James Cameron\'s groundbreaking film "Avatar" has finally received a confirmed release date. After years of speculation and delays, fans can rejoice as "Avatar 2" is set to hit theaters on December 16, 2022. Director James Cameron has promised an even more immersive experience, with groundbreaking visual effects and an expansion of the vibrant world of Pandora. The original "Avatar" film, released in 2009, became the highest-grossing film of all time, and expectations are high for its sequel. Stay tuned for more updates as the release date approaches!',
    imageUrl: 'https://www.sakshipost.com/sites/default/files/article_images/2022/04/27/avatar.jpg',
    imagePosition: 'left'
    },
    {
      id: 1,
    title: 'Avatar Sequel Release Date Announced',
    description: 'The highly anticipated sequel to James Cameron\'s groundbreaking film "Avatar" has finally received a confirmed release date. After years of speculation and delays, fans can rejoice as "Avatar 2" is set to hit theaters on December 16, 2022. Director James Cameron has promised an even more immersive experience, with groundbreaking visual effects and an expansion of the vibrant world of Pandora. The original "Avatar" film, released in 2009, became the highest-grossing film of all time, and expectations are high for its sequel. Stay tuned for more updates as the release date approaches!',
    imageUrl: 'https://www.sakshipost.com/sites/default/files/article_images/2022/04/27/avatar.jpg',
    imagePosition: 'left'
    },
    {
      id: 1,
    title: 'Avatar Sequel Release Date Announced',
    description: 'The highly anticipated sequel to James Cameron\'s groundbreaking film "Avatar" has finally received a confirmed release date. After years of speculation and delays, fans can rejoice as "Avatar 2" is set to hit theaters on December 16, 2022. Director James Cameron has promised an even more immersive experience, with groundbreaking visual effects and an expansion of the vibrant world of Pandora. The original "Avatar" film, released in 2009, became the highest-grossing film of all time, and expectations are high for its sequel. Stay tuned for more updates as the release date approaches!',
    imageUrl: 'https://www.sakshipost.com/sites/default/files/article_images/2022/04/27/avatar.jpg',
    imagePosition: 'left'
    },
    {
      id: 1,
    title: 'Avatar Sequel Release Date Announced',
    description: 'The highly anticipated sequel to James Cameron\'s groundbreaking film "Avatar" has finally received a confirmed release date. After years of speculation and delays, fans can rejoice as "Avatar 2" is set to hit theaters on December 16, 2022. Director James Cameron has promised an even more immersive experience, with groundbreaking visual effects and an expansion of the vibrant world of Pandora. The original "Avatar" film, released in 2009, became the highest-grossing film of all time, and expectations are high for its sequel. Stay tuned for more updates as the release date approaches!',
    imageUrl: 'https://www.sakshipost.com/sites/default/files/article_images/2022/04/27/avatar.jpg',
    imagePosition: 'left'
    },
  ];
  

function News() {
  return (
    <div className="container mt-4">
      <h1 className="mb-4">Movie News</h1>
      <div className="row">
        {newsData.map(news => (
          <div key={news.id} className="col-md-12">
            <NewsCard
              title={news.title}
              description={news.description}
              imageUrl={news.imageUrl}
              imagePosition={news.imagePosition}
            />
          </div>
        ))}
      </div>
    </div>
  );
}

export default News;
